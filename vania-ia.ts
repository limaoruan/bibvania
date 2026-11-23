// ============================================================================
// BibVânia Online — Edge Function "vania-ia"
// Faz a análise de capa/verso (botão Vânia) na Mistral AI SEM expor a chave da
// Mistral no navegador.
//
// SECRET NECESSÁRIO (Supabase → Edge Functions → Secrets):
//   MISTRAL_API_KEY   chave da Mistral AI (Admin Panel: https://admin.mistral.ai/)
// SECRET OPCIONAL:
//   MISTRAL_MODEL     modelo a usar (padrão: ministral-14b-2512)
//
// COMO FUNCIONA
//   1. O painel (admin.html) envia { messages: [...] } com o prompt e as imagens
//      e o token da sessão do bibliotecário no cabeçalho Authorization.
//   2. A função confere, no Supabase Auth, que o token é de um usuário logado.
//   3. O modelo, a temperatura, o limite de saída e o formato JSON são FIXADOS
//      aqui; o navegador não consegue trocá-los. Só "messages" vem do painel, e
//      só em formato de uma mensagem de usuário com textos e imagens.
//   4. A resposta da Mistral (inclusive o status 429 de limite de uso) é
//      devolvida como veio.
//
// DEPLOY: no painel do Supabase, Edge Functions → Deploy a new function → via
// Editor, nome "vania-ia", cole este arquivo. Deixe DESLIGADA a opção
// "Verify JWT" (a própria função valida o login abaixo).
// ============================================================================

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const MODELO_PADRAO = "ministral-14b-2512";
// Capa + verso em base64 ficam bem abaixo disso (o painel reduz as imagens antes).
const LIMITE_BYTES = 20 * 1024 * 1024;
// Uma mensagem com 1 texto de prompt + até 2 imagens e 2 legendas.
const MAX_PARTES = 8;

function json(corpo: unknown, status = 200): Response {
  return new Response(JSON.stringify(corpo), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

function erro(mensagem: string, status: number): Response {
  return json({ error: { message: mensagem } }, status);
}

// Confere no Supabase Auth se o token pertence a um usuário logado.
async function usuarioLogado(req: Request): Promise<boolean> {
  const autorizacao = req.headers.get("Authorization") ?? "";
  if (!/^Bearer\s+\S+/i.test(autorizacao)) return false;
  const url = Deno.env.get("SUPABASE_URL");
  const apikey = Deno.env.get("SUPABASE_ANON_KEY") ?? req.headers.get("apikey") ?? "";
  if (!url || !apikey) return false;
  try {
    const r = await fetch(`${url}/auth/v1/user`, {
      headers: { Authorization: autorizacao, apikey },
    });
    if (!r.ok) return false;
    const usuario = await r.json();
    return Boolean(usuario?.id);
  } catch (_) {
    return false;
  }
}

// Aceita só: [{ role: "user", content: [ {type:"text",text}, {type:"image_url",image_url} ... ] }]
// (image_url pode ser a URL ou { url }). Devolve a mensagem limpa ou null se algo estiver fora do padrão.
function mensagemValida(mensagens: unknown): unknown[] | null {
  if (!Array.isArray(mensagens) || mensagens.length !== 1) return null;
  const mensagem = mensagens[0] as { role?: string; content?: unknown };
  if (mensagem?.role !== "user" || !Array.isArray(mensagem.content)) return null;
  if (mensagem.content.length < 1 || mensagem.content.length > MAX_PARTES) return null;
  const partes: unknown[] = [];
  for (const parte of mensagem.content as Array<Record<string, unknown>>) {
    if (parte?.type === "text" && typeof parte.text === "string") {
      partes.push({ type: "text", text: parte.text });
    } else if (parte?.type === "image_url") {
      const origem = parte.image_url;
      const url = typeof origem === "string" ? origem : (origem as { url?: string })?.url;
      if (typeof url !== "string" || !/^(data:image\/|https:\/\/)/i.test(url)) return null;
      partes.push({ type: "image_url", image_url: origem });
    } else {
      return null;
    }
  }
  return [{ role: "user", content: partes }];
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return erro("Método não permitido.", 405);

  if (!(await usuarioLogado(req))) return erro("Não autorizado: entre no painel novamente.", 401);

  const chave = Deno.env.get("MISTRAL_API_KEY");
  if (!chave) return erro("Secret MISTRAL_API_KEY não configurado nas Edge Functions.", 500);

  const tamanho = Number(req.headers.get("content-length") ?? "0");
  if (tamanho > LIMITE_BYTES) return erro("Imagens grandes demais.", 413);

  let mensagens: unknown[] | null = null;
  try {
    const corpo = await req.json();
    mensagens = mensagemValida(corpo?.messages);
  } catch (_) {
    return erro("Corpo inválido: envie JSON com \"messages\".", 400);
  }
  if (!mensagens) return erro("Formato de mensagem não aceito.", 400);

  try {
    const resposta = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${chave}` },
      body: JSON.stringify({
        model: Deno.env.get("MISTRAL_MODEL") || MODELO_PADRAO,
        temperature: 0,
        max_tokens: 700,
        response_format: { type: "json_object" },
        messages: mensagens,
      }),
    });
    const texto = await resposta.text();
    return new Response(texto, {
      status: resposta.status,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  } catch (_) {
    return erro("Não foi possível falar com a Mistral AI. Tente novamente.", 502);
  }
});
