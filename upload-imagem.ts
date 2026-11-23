// ============================================================================
// BibVânia Online — Edge Function "upload-imagem"
// Envia uma imagem (capa, verso ou foto do bibliotecário) ao ImgBB SEM expor a
// chave do ImgBB no navegador.
//
// SECRET NECESSÁRIO (Supabase → Edge Functions → Secrets):
//   IMGBB_API_KEY   chave da API do ImgBB (https://api.imgbb.com)
//
// COMO FUNCIONA
//   1. O painel (admin.html) envia um FormData com o campo "image" (base64) e o
//      token da sessão do bibliotecário no cabeçalho Authorization.
//   2. A função confere, no Supabase Auth, que o token é de um usuário logado.
//      Cadastro público é desativado, então só o bibliotecário passa.
//   3. Repassa APENAS o campo "image" ao ImgBB, com a chave guardada no Secret,
//      e devolve a resposta do ImgBB (mesmo formato que o painel já entende).
//
// DEPLOY: no painel do Supabase, Edge Functions → Deploy a new function → via
// Editor, nome "upload-imagem", cole este arquivo. Deixe DESLIGADA a opção
// "Verify JWT" (a própria função valida o login abaixo, e isso funciona com as
// chaves novas do Supabase).
// ============================================================================

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Limite do corpo: 10 MB de imagem em base64 ocupam cerca de 13,4 MB.
const LIMITE_BYTES = 15 * 1024 * 1024;

function json(corpo: unknown, status = 200): Response {
  return new Response(JSON.stringify(corpo), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

// Formato de erro igual ao do ImgBB ({ error: { message } }), que o painel já sabe exibir.
function erro(mensagem: string, status: number): Response {
  return json({ success: false, status_code: status, error: { message: mensagem } }, status);
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

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return erro("Método não permitido.", 405);

  if (!(await usuarioLogado(req))) return erro("Não autorizado: entre no painel novamente.", 401);

  const chave = Deno.env.get("IMGBB_API_KEY");
  if (!chave) return erro("Secret IMGBB_API_KEY não configurado nas Edge Functions.", 500);

  const tamanho = Number(req.headers.get("content-length") ?? "0");
  if (tamanho > LIMITE_BYTES) return erro("Imagem grande demais.", 413);

  let imagem: string | null = null;
  try {
    const formulario = await req.formData();
    const campo = formulario.get("image");
    imagem = typeof campo === "string" ? campo : null;
  } catch (_) {
    return erro("Envie um formulário (FormData) com o campo \"image\".", 400);
  }
  if (!imagem || imagem.length < 100) return erro("Imagem vazia ou inválida.", 400);
  if (imagem.length > LIMITE_BYTES) return erro("Imagem grande demais.", 413);

  // Só o campo "image" segue para o ImgBB; a chave nunca sai desta função.
  const corpo = new FormData();
  corpo.append("key", chave);
  corpo.append("image", imagem);

  try {
    const resposta = await fetch("https://api.imgbb.com/1/upload", { method: "POST", body: corpo });
    const texto = await resposta.text();
    return new Response(texto, {
      status: resposta.status,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  } catch (_) {
    return erro("Não foi possível falar com o ImgBB. Tente novamente.", 502);
  }
});
