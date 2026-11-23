# BibVânia Online v3.1

**Sistema de Biblioteca Escolar Digital**
da EMTI Professora Maria Vânia Farias Linhares

> 🌐 **[Acessar o acervo público](https://limaoruan.github.io/bibvania/)** · Desenvolvido por [Ruan Oliveira Lima](https://www.instagram.com/ruanoliveiralima_/) · Licença <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.pt-br" target="_blank" rel="license noopener noreferrer">CC-BY-SA-4.0</a>

---

## Sobre


O projeto nasceu na **EMTI Professora Maria Vânia Farias Linhares** (Mucambo, CE) e foi construído por **Ruan Oliveira Lima** para atender às necessidades reais de uma biblioteca escolar pública. Mais tarde, foi projetado para ser replicável: qualquer escola ou biblioteca comunitária pode gerar sua própria instância personalizada usando o **bibmaker.claude**, o arquivo construtor de bibliotecas incluso no projeto, sem precisar de conhecimento técnico — basta abri-lo em uma conversa com o Claude.

O sistema é composto por múltiplas páginas com funções distintas: um catálogo público acessível a todos os alunos, uma Área do Bibliotecário completa e o `bibmaker.claude` para geração de novas instâncias prontas para publicação no GitHub Pages.

---

## Sumário

- [Sobre](#sobre)
- [Tecnologias](#tecnologias)
- [Funcionalidades](#funcionalidades)
- [Estrutura de arquivos](#estrutura-de-arquivos)
- [Licença](#licença)
- [Como Criar uma Biblioteca](#como-criar-uma-biblioteca)
  - [Mantendo o Supabase sempre ativo](#mantendo-o-supabase-sempre-ativo-recomendado)
- [Como Atualizar uma Biblioteca](#como-atualizar-uma-biblioteca)
- [Como Usar o Sistema](#como-usar-o-sistema)
  - [Para Leitores](#para-leitores)
  - [Para Bibliotecários e Auxiliares](#para-bibliotecários-e-auxiliares)
  - [Para Desenvolvedores](#para-desenvolvedores) *(referência técnica expansível)*

---

## Tecnologias

- **Frontend:** HTML5, CSS3, JavaScript vanilla (sem frameworks, sem build tools)
- **Banco de dados / Auth / Realtime:** [Supabase](https://supabase.com) (PostgreSQL com RLS)
- **Upload de capas:** [ImgBB](https://imgbb.com) (serviço externo; consulte os limites e termos vigentes)
- **PDF do acervo e leitura de código de barras:** [pdfmake](https://pdfmake.github.io/docs/) e [@zxing/library](https://github.com/zxing-js/library) (jsDelivr, versões fixas); o `BarcodeDetector` nativo do navegador é usado quando existe
- **Análise de capa com IA (botão Vânia):** API da [Mistral AI / Admin Panel](https://admin.mistral.ai/), modelo padrão `ministral-14b-2512`; disponibilidade, limites e cobrança dependem do plano e da organização
- **Ferramenta de desenvolvimento:** Claude (Anthropic; não é dependência de execução do site)
- **Hospedagem sugerida:** GitHub Pages (gratuito)

---

## Funcionalidades

### Acervo público (`index.html`)
- Busca por título, ISBN e autor
- Na busca, `#00`, `#06`, `#10`, `#12`, `#14`, `#16` e `#18` filtram pela classificação indicativa; é possível combinar a hashtag com título, ISBN ou autor
- Capas dos livros com lightbox
- Indicação visual de disponibilidade em tempo real
- Solicitação de reserva pública por pessoa cadastrada, com confirmação posterior do bibliotecário
- Acessibilidade: busca por voz, modo escuro, ajuste do tamanho da fonte
- Download do acervo completo em PDF
- Instalável como aplicativo (PWA)

### Painel administrativo (`admin.html`)
- Busca do acervo por título, ISBN e autor, com as mesmas hashtags para filtrar a classificação indicativa
- Cadastro, edição e exclusão de livros com upload de capa via ImgBB
- Botão **Vânia**: analisa a capa do livro com IA (Mistral AI) e preenche automaticamente título, autor, ISBN (se visível), classificação indicativa e descrição de acessibilidade
- Controle de empréstimos: registrar, editar, renovar, devolver, excluir
- Fila de reservas: emprestar ou cancelar; a conclusão e criação do empréstimo ocorrem na mesma transação do banco
- Cadastro de alunos, visitantes e funcionários, com lista de pessoas e total de livros pegos por cada uma
- Relatório de acervo e empréstimos, com download em HTML ou TXT
- Realtime: atualiza automaticamente sem recarregar

### Login administrativo (`admin.html`)
- Autenticação por e-mail e senha via Supabase Auth, exibida no próprio painel

---

## Estrutura de arquivos

> **Regra obrigatória de manutenção:** toda alteração no projeto — incluindo correções, adições, remoções, mudanças de comportamento, ajustes de interface, migrações ou correções no Supabase — deve ser registrada no [`CHANGELOG.md`](CHANGELOG.md). Essa regra vale para qualquer pessoa ou IA que modificar a biblioteca. Cada biblioteca derivada gerada pelo BibMaker recebe o seu próprio `CHANGELOG.md`, que começa só com a entrada `#1` (versão inicial do projeto), não copia nenhuma entrada deste changelog e registra as alterações da própria biblioteca, com numeração própria. Ao alterar `index.html` ou `admin.html`, atualizar também o respectivo metadado `revised` para a data e hora reais da revisão em ISO 8601, com fuso explícito (neste projeto, `-03:00`). Registrar cada alteração no changelog com a data e hora locais reais; o timestamp de modificação dos arquivos é atualizado pelo sistema ao salvar, sem ajuste manual ou horário inventado.

```
BibVânia Online/
├── index.html               — Acervo público
├── admin.html               — Painel do bibliotecário (login em overlay)
├── bibcore.js               — Banco de dados, utilitários e transições
├── van-ia.prompt            — Prompt de catalogação usado pelo botão Vânia
├── bibconfig.js             — Configuração pública do Supabase (URL e chave publishable)
├── style.css                — Estilos globais
├── service-worker.js        — PWA: casca estática e cache GET da mesma origem (nunca intercepta o Supabase)
├── manifest.webmanifest     — Manifesto da aplicação web
├── bibmaker.claude          — Construtor de bibliotecas (uso com o Claude)
├── supabase_setup.sql       — Configuração inicial do banco
├── upload-imagem.ts         — Fonte da Edge Function de upload ao ImgBB
├── vania-ia.ts              — Fonte da Edge Function da Vân-IA (Mistral AI)
├── VERSION.json             — Versão do sistema
├── bibhash.sig              — SHA-256 dos arquivos distribuídos (exceto o próprio arquivo)
├── CHANGELOG.md             — Histórico de mudanças
├── LICENCE.md               — Licença CC-BY-SA 4.0 e dependências de terceiros
├── README.md                — Este arquivo
├── robots.txt               — Regras para crawlers
├── sitemap.xml              — Sitemap da página pública
├── logo.png                 — Logo do sistema
├── van-ia.png               — Imagem do botão Vânia (admin)
├── bibmaker-logo.png        — Logo do BibMaker
├── favicon.ico, favicon.png, favicon-16.png, favicon-32.png, favicon-48.png
├── apple-touch-icon.png, icon-192.png, icon-512.png — Ícones do navegador e do PWA
├── og-image.png             — Imagem Open Graph
├── .gitignore               — Impede o envio de bibconfig.claude
└── .nojekyll                — Desativa o Jekyll no GitHub Pages
```

`bibconfig.claude` não faz parte desta pasta-base. O BibMaker gera esse arquivo privado para cada biblioteca derivada; ele deve ser guardado fora do repositório e não publicado.

📄 Descrição detalhada de cada arquivo (para desenvolvedores): veja [Para Desenvolvedores](#para-desenvolvedores), seção expansível "Arquivos do projeto".

---

## Licença

Projeto licenciado sob <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.pt-br" target="_blank" rel="license noopener noreferrer"><strong>CC-BY-SA-4.0</strong></a>. Você pode usar, copiar, modificar e distribuir livremente, desde que mantenha a atribuição ao autor original e distribua adaptações sob a mesma licença CC BY-SA 4.0: **Ruan Oliveira Lima** — <a href="https://github.com/limaoruan/bibvania" target="_blank" rel="noopener noreferrer">github.com/limaoruan/bibvania</a>.

Atribuição sugerida:

> Derivado do projeto BibVânia Online por [Ruan Oliveira Lima](https://www.instagram.com/ruanoliveiralima_/) © 2026 — <a href="https://github.com/limaoruan/bibvania" target="_blank" rel="noopener noreferrer">https://github.com/limaoruan/bibvania</a> — <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.pt-br" target="_blank" rel="license noopener noreferrer">CC-BY-SA 4.0</a>

O escopo declarado e a lista única de serviços, bibliotecas e respectivos termos estão em [`LICENCE.md`](LICENCE.md). A licença deste projeto não substitui as licenças de software de terceiros nem os termos dos serviços hospedados.

---


## Como Criar uma Biblioteca

O **bibmaker.claude** gera automaticamente uma instância personalizada do BibVânia Online, pronta para publicar no GitHub Pages. Não é necessário editar nenhum arquivo manualmente — a entrevista acontece numa conversa com o Claude.

⚠️ As chaves do ImgBB e da Mistral AI não ficam em nenhum arquivo: você as cadastra nos **Secrets** das Edge Functions do seu Supabase (veja a seção "Edge Functions" abaixo). O `bibconfig.claude` gerado é privado: não o publique no GitHub.

1. **Baixe e anexe os arquivos completos.** Para criar, anexe `bibmaker.claude` e o ZIP/pasta completo dos arquivos-base da versão desejada; o construtor sozinho não contém a aplicação. Digite **`BibMaker create`**. Para atualizar, anexe também o ZIP/pasta completo da biblioteca derivada atual e o `bibconfig.claude` mais recente, além dos arquivos-base completos novos, e digite **`BibMaker update`**. O pacote atual deve incluir `VERSION.json`, `CHANGELOG.md`, `bibhash.sig` e as imagens personalizadas, para validar integridade e preservar alterações. O comando `BibMaker` sozinho escolhe criação/atualização pelo conteúdo real do `bibconfig.claude`; comentários e exemplos do modelo não contam como respostas. Use somente os comandos `BibMaker`, `BibMaker create` ou `BibMaker update`; argumentos desconhecidos exigem correção, não são ignorados.
2. **Escolha o tipo e informe o nome do projeto.** Responda se é *Escolar* ou *Comunitária* e informe o Nome do Projeto diretamente; o BibMaker não o gera automaticamente a partir do tipo. O BibMaker também permite informar, opcionalmente, uma descrição personalizada para compartilhamento/Open Graph; se ficar vazia, usa a descrição padrão adaptada ao tipo e nome.
3. **Informe os dados do projeto.** Nome da biblioteca, autor, site, versão e licença. Esses dados aparecem no rodapé e nas metatags de todas as páginas geradas.
4. **Informe a URL e a Publishable Key do mesmo projeto Supabase.** Ao BibMaker você informa só a URL e a chave `sb_publishable_` do Supabase. Nunca cole chaves `secret` ou `service_role` na conversa nem as use no frontend. As chaves do ImgBB e da Mistral AI também são necessárias, mas **não são informadas ao BibMaker**: você as cadastra depois nos Secrets das Edge Functions. Se enviar acidentalmente uma chave privada na conversa, revogue-a/rotacione-a no painel correspondente. Antes de configurar a API, entre no [Admin Panel da Mistral](https://admin.mistral.ai/) e confira o plano, a franquia incluída, as regras de compartilhamento e o estado do Pay-as-you-go da sua organização. A franquia mensal pode ser compartilhada entre Vibe, Studio e API; se ela acabar com Pay-as-you-go desativado, as chamadas podem parar. Pay-as-you-go é uma opção pré-paga: confira as condições, compre créditos ou resgate um código antes de ativá-la.
5. **Informe as imagens (obrigatório).** Logo, favicon e imagem Open Graph são obrigatórios; o BibMaker não usa imagens padrão e só avança quando as três forem fornecidas (ou geradas por ele a seu pedido).
6. **Informe URLs válidas do GitHub.** A URL do repositório público e a URL da Página GitHub Pages precisam corresponder à mesma biblioteca e são necessárias antes da geração final, pois são usadas em metadados e no modelo Checkly. Se ainda não as tiver, pause antes da geração, sem usar URLs fictícias.
7. **Aguarde a aplicação das edições.** O Claude confirma um resumo e trabalha em uma cópia dos arquivos-base. Na atualização, use o pacote atual para preservar código, imagens e personalizações. O BibMaker compara `supabase_setup.sql` e os fontes das Edge Functions, gera `bibconfig.claude` privado para próximas atualizações e não executa SQL nem publica funções por você.
8. **Configure o Supabase correto.** Na criação, abra o projeto Supabase informado e execute o conteúdo completo de `supabase_setup.sql` pelo *SQL Editor → New query*. Em atualização, não execute esse arquivo às cegas num banco existente: faça backup do banco pelo método disponível no plano Supabase, revise a comparação/migração indicada pelo BibMaker e aplique somente o necessário depois de autorizar. Se não houver mudança SQL, não execute SQL. Depois, siga a seção "Edge Functions" abaixo: cadastre os Secrets e publique as funções na primeira instalação; em atualização, republique cada função cujo fonte mudou, preservando os Secrets existentes.
9. **Confira `bibconfig.js`.** Na pasta do projeto, confirme que `SUPABASE_URL` e `SUPABASE_PUBLISHABLE_KEY` correspondem ao mesmo projeto Supabase configurado acima. A URL e a chave `sb_publishable_` são usadas pelo site para conectar ao banco; não use chave `secret` ou `service_role` no frontend.
10. **Crie o usuário bibliotecário e o username (nome exibido).** No mesmo projeto Supabase, vá a *Authentication → Users → Add user → Create new user*, informe o e-mail e uma senha forte e clique em **Create User**. Copie o **User UID** do usuário criado. O username é opcional: ele é exibido no painel ("OI, nome!", só o primeiro nome) e fica no `user_metadata` do usuário, sem tabela própria; sem username, o painel mostra "OLÁ, ADMIN!". O login continua sendo feito com e-mail e senha, e a foto de perfil é enviada pelo próprio painel. Para colocar, trocar ou excluir o username, use o *SQL Editor*:

   Para cada ação abaixo, substitua `UUID_DO_USUARIO` pelo valor da coluna **User UID** (*Authentication → Users*) e execute **uma por vez**:

   **Colocar o username** (quando ainda não há nome definido):

   ```sql
   UPDATE auth.users SET raw_user_meta_data = coalesce(raw_user_meta_data, '{}'::jsonb) || '{"nome":"Nome"}' WHERE id = 'UUID_DO_USUARIO';
   ```

   **Trocar o username** (quando já há um nome definido):

   ```sql
   UPDATE auth.users SET raw_user_meta_data = coalesce(raw_user_meta_data, '{}'::jsonb) || '{"nome":"Novo Nome"}' WHERE id = 'UUID_DO_USUARIO';
   ```

   **Excluir o username** (o painel volta a mostrar "OLÁ, ADMIN!"; foto e login não mudam):

   ```sql
   UPDATE auth.users SET raw_user_meta_data = raw_user_meta_data - 'nome' WHERE id = 'UUID_DO_USUARIO';
   ```

   **Conferir o resultado:**

   ```sql
   SELECT id, email, raw_user_meta_data->>'nome' AS nome FROM auth.users WHERE id = 'UUID_DO_USUARIO';
   ```

11. **Publique no GitHub Pages.** Crie ou use um repositório público e envie para a raiz do branch `main` o conteúdo da pasta do projeto dentro do `.zip` (incluindo `index.html`, `admin.html`, `bibconfig.js` e `bibcore.js`, mas não o próprio arquivo `.zip`). Não envie o `bibconfig.claude`: ele fica fora da pasta pública por guardar as respostas da entrevista. Os arquivos-fonte `upload-imagem.ts` e `vania-ia.ts` podem ir ao GitHub, pois não contêm segredos. No GitHub, abra *Settings → Pages → Build and deployment*, selecione **Deploy from a branch**, branch `main` e pasta `/ (root)`, e salve. Aguarde a publicação e teste a URL: primeiro o catálogo e depois o login em `admin.html`.

> **Proteção adicional do Auth (plano Pro ou superior):** nas configurações do Auth do Supabase, procure a opção **Prevent the use of leaked passwords** (também descrita como *Leaked password protection*) e ative-a. Dependendo da versão do painel, ela pode aparecer em *Authentication → Settings* ou dentro das configurações de senha. Esse recurso não está disponível no plano gratuito; nesse caso, o alerta correspondente do Security Advisor pode permanecer. A opção é administrada pelo painel do Auth e não pelo SQL da aplicação.

> 🚨 **IMPORTANTE — nunca perca o `bibconfig.claude`.** Esse arquivo é a única cópia das respostas da sua entrevista — não fica salvo em nenhum outro lugar (nem no GitHub, de propósito). Se você o perder, a única forma de atualizar a biblioteca no futuro é refazendo a entrevista completa do zero. As chaves do ImgBB e da Mistral AI não dependem dele: ficam nos Secrets do seu Supabase. Guarde-o em um lugar seguro fora do GitHub — um gerenciador de senhas, um drive privado, qualquer local com backup que não seja público.

### Como obter cada chave de API

#### 🗄️ Supabase (obrigatório)

1. Acesse [supabase.com](https://supabase.com) e clique em **Start your project**.
2. Crie uma conta gratuita com e-mail ou pelo GitHub.
3. Clique em **New Project**, dê um nome ao projeto, defina uma senha forte e escolha a região mais próxima (ex: *South America — São Paulo*). Aguarde a criação — isso pode levar alguns minutos. As tabelas criadas pelo BibVânia Online já têm RLS (Row Level Security) ativado por padrão via `supabase_setup.sql`; não desative essa opção no painel.
4. Abra o diálogo **Connect** do projeto para copiar a **Project URL** e a chave **Publishable** (`sb_publishable_...`), ou localize as chaves em **Settings → API Keys**. A página atual do painel não usa o caminho antigo **Project Settings → API**.
5. Confira se a URL e a chave pertencem ao mesmo projeto.
6. Use no frontend somente a chave `sb_publishable_`; nunca coloque chaves `secret` ou `service_role` no site. Consulte o [guia oficial de API keys](https://supabase.com/docs/guides/getting-started/api-keys) se os rótulos do painel forem diferentes.

#### 🖼️ ImgBB (upload de capas)

1. Acesse [imgbb.com](https://imgbb.com) e crie ou acesse sua conta.
2. Vá em **About → API** ou acesse [api.imgbb.com](https://api.imgbb.com) e obtenha uma chave. Consulte os limites e os [termos de uso](https://imgbb.com/tos) vigentes para sua conta.

#### 🤖 Mistral AI (botão Vânia)

Para configurar e testar o botão Vânia, siga estes passos:

1. **Confira o modelo e os limites.** O projeto usa `ministral-14b-2512`. Consulte a [página de limites da API](https://admin.mistral.ai/plateforme/limits), acessível após entrar no Admin Panel, para verificar os limites atuais da sua organização. Se trocar o modelo, escolha um compatível com imagens e configure `MISTRAL_MODEL` nos Secrets da Edge Function.
2. **Crie uma chave da API.** No Admin Panel (https://admin.mistral.ai/), abra **API Keys**, escolha o workspace usado pelo BibVânia e crie uma API key. Copie e guarde a chave em local seguro; não a coloque em HTML, JavaScript ou no repositório.
3. **Cadastre a chave no Supabase.** No projeto Supabase da biblioteca, abra **Edge Functions → Secrets** e crie o Secret `MISTRAL_API_KEY` com a chave copiada. Ela fica no servidor e não é enviada ao navegador.
4. **Publique e teste.** Publique a Edge Function `vania-ia` seguindo as instruções da seção [Edge Functions](#edge-functions-publicar-as-funções-e-guardar-as-chaves). Depois, abra no painel administrativo o cadastro de um livro com capa ou verso e teste o botão **Vânia**. Se a API retornar erro de limite (429), consulte os limites da organização e tente novamente mais tarde.

#### 🐙 GitHub (obrigatório para publicação)

1. Acesse [github.com](https://github.com) e crie uma conta gratuita.
2. Clique em **New repository**, dê um nome, marque como **Public** e clique em **Create repository**.
3. Para ativar o GitHub Pages: vá em **Settings → Pages → Source**, selecione o branch `main` e a pasta `/ (root)` e clique em **Save**.

---


### Edge Functions: publicar as funções e guardar as chaves

As chaves do ImgBB e da Mistral AI não ficam no navegador, no GitHub nem no banco: são **Secrets** de duas Edge Functions do seu projeto Supabase, que o painel chama estando logado. Os fontes estão na raiz do projeto: `upload-imagem.ts` e `vania-ia.ts`. O procedimento deste guia usa o Editor do painel; para deploy por CLI, veja a observação sobre a estrutura convencional na referência técnica abaixo.

1. **Cadastre os Secrets.** No Supabase, abra *Edge Functions → Secrets* e crie `IMGBB_API_KEY` (chave do ImgBB) e `MISTRAL_API_KEY` (chave da Mistral AI). Opcional: `MISTRAL_MODEL` para trocar o modelo (padrão `ministral-14b-2512`). Não crie Secrets com o prefixo `SUPABASE_`: o Supabase já injeta os dele.
2. **Publique `upload-imagem`.** Em *Edge Functions → Deploy a new function → Via Editor*, use exatamente o nome `upload-imagem`, cole o conteúdo do arquivo raiz `upload-imagem.ts` e faça o deploy. Nas configurações da função, deixe **Verify JWT desligado** (a função valida o login por conta própria).
3. **Publique `vania-ia`.** Mesmo caminho, nome `vania-ia`, conteúdo do arquivo raiz `vania-ia.ts`, Verify JWT desligado.
4. **Teste no painel.** Cadastre um livro com capa e use o botão Vânia. Se aparecer "A EDGE FUNCTION ... NÃO FOI ENCONTRADA", o nome da função está diferente ou ela não foi publicada; se a mensagem citar "Secret ... não configurado", falta o passo 1.
5. **Bancos de versões anteriores:** só remova `public.config_privada` se confirmar que é a tabela legada, que os Secrets necessários já estão configurados e que nenhum dado ainda precisa ser migrado. Faça backup do banco antes; como a operação apaga dados, revise e autorize explicitamente antes de executar `DROP TABLE IF EXISTS public.config_privada;` no SQL Editor. Se a origem ou o conteúdo da tabela forem incertos, não execute o comando. Para deploy via linha de comando, primeiro prepare a estrutura convencional descrita na referência técnica abaixo.

Cada função confere no Supabase Auth, pelo token da sessão, que quem chama é um usuário logado — por isso o cadastro público de usuários deve ficar desativado. A `vania-ia` ainda fixa o modelo e os limites, então o navegador não consegue trocá-los.
### Mantendo o Supabase sempre ativo

O plano gratuito do Supabase pausa o projeto após cerca de 7 dias com pouca atividade no banco de dados. Para evitar isso, um monitor gratuito no Checkly abre o site em um navegador de verdade a cada 6 horas; a abertura executa o JavaScript do catálogo e lê a tabela pública `livros`, contando como atividade. O monitor usa somente a chave pública `publishable` já presente em `bibconfig.js`; nenhuma chave secreta ou `service_role` é utilizada.

A URL que o monitor deve abrir é:

```text
https://limaoruan.github.io/bibvania/
```

A resposta esperada é uma requisição `GET` com URL contendo:

```text
/rest/v1/livros?select=
```

Configure uma vez:

1. Confirme que o `supabase_setup.sql` já foi executado no SQL Editor e que o site está publicado.
2. Crie uma conta gratuita (plano Hobby) em [app.checklyhq.com/signup](https://app.checklyhq.com/signup) e crie um **Browser Check**.
3. **Use o modelo copiável abaixo.** Cole o bloco completo no Browser Check do Checkly. Ele serve tanto como exemplo quanto como modelo; não é necessário manter uma pasta `checkly/` no repositório:

```typescript
import { test, expect } from '@playwright/test'

test('Site consulta o Supabase', async ({ page }) => {
  const resposta = page.waitForResponse(r =>
    r.request().method() === 'GET' &&
    r.url().includes('/rest/v1/livros?select=')
  )

  await page.goto('https://limaoruan.github.io/bibvania/', {
    waitUntil: 'domcontentloaded',
  })

  const r = await resposta
  expect(r.status()).toBe(200)
  console.log('Status: ' + r.status())
})
```

4. Frequência: **a cada 6 horas**. Localizações: **Round-robin**. Deixe **Parallel runs** desligado, resultando em cerca de 120 execuções por mês, dentro das 1.000 gratuitas. Ative o alerta por e-mail com seu endereço.
5. Use **Run test** (o resultado esperado é verde), clique em **Save** e confirme que o check está ativado e não silenciado (**muted**). Executar o teste sozinho não ativa o agendamento.
6. Depois de 6 a 12 horas, confira o histórico: devem aparecer execuções agendadas a cada 6 horas, todas verdes.

Se o check falhar, o projeto provavelmente pausou: abra-o no painel do Supabase e clique em **Resume project**. Se aparecer erro de DNS, o endereço do Supabase ainda não voltou; espere alguns minutos.

---

## Como Atualizar uma Biblioteca


💡 Ao abrir o admin.html da sua biblioteca, um banner "⚠️ Atualização disponível" aparece automaticamente quando há uma versão mais nova do BibVânia Online — o botão leva ao repositório oficial.

1. **Faça backups antes de começar.** Baixe/guarde o repositório ou ZIP atual da biblioteca. Se a atualização exigir alteração de banco, faça também um backup do Supabase pelo método disponível no seu plano antes de aplicar qualquer SQL.
2. **Baixe os arquivos-base completos da nova versão** a partir do repositório oficial.
3. **Anexe os materiais certos ao Claude.** Envie `bibmaker.claude`, os arquivos-base completos novos, o ZIP/pasta completo da biblioteca derivada atual e o `bibconfig.claude` mais recente, que deve ficar privado e fora do GitHub. O pacote atual precisa conter `VERSION.json`, `CHANGELOG.md`, `bibhash.sig` e as imagens personalizadas. O `VERSION.json` da biblioteca informa a versão atual do projeto; o `VERSION.json` da nova base informa somente a versão-base. Não confunda os dois.
4. **Confirme os dados e as imagens.** Para cada campo salvo, confirme se quer manter ou trocar; campos vazios são perguntados. "Manter" uma imagem exige que o arquivo real esteja no pacote atual e seja copiado/validado na nova biblioteca; caminho salvo no `bibconfig.claude` não substitui o arquivo.
5. **Revise o relatório de compatibilidade antes de publicar.** O BibMaker compara `supabase_setup.sql` e `upload-imagem.ts`/`vania-ia.ts`, indica migrações SQL e funções que precisam de redeploy e informa os testes. Ele não executa SQL nem publica funções. Preserve os Secrets existentes; aplique uma migração apenas depois de revisar, fazer backup e autorizar. Se não houver alteração, não rode SQL e não republique função desnecessariamente.
6. **Publique a biblioteca atualizada e valide.** Substitua os arquivos na raiz do repositório público, sem enviar o `bibconfig.claude`; republique somente as Edge Functions que mudaram. Teste o catálogo, o login do admin, o upload de uma imagem e o botão Vânia na URL pública. Mantenha o backup até todos os testes passarem.
7. **Guarde a configuração nova com segurança.** O `bibconfig.claude` é regenerado. Mantenha a cópia antiga até conferir a nova configuração e o ZIP; depois atualize a cópia principal e mantenha um backup privado da nova versão. Nunca publique esse arquivo.

---

## Como Usar o Sistema

### Para Leitores

O catálogo público (`index.html`) não exige cadastro nem login. Qualquer visitante pode pesquisar e consultar o acervo diretamente pelo navegador.

* Use o **menu de atalhos** (☰, à esquerda dentro da barra de acessibilidade no topo) para navegar para a Área do Bibliotecário (se autenticado) ou o repositório da biblioteca (o botão 📁 Repositório lê o endereço da metatag `source`; em bibliotecas derivadas, é a URL do Repositório informada ao BibMaker).
* Clique em **📥 BAIXAR ACERVO COMPLETO** para gerar e baixar um PDF em formato de tabela.

#### Pesquisando livros

* Use a barra de busca para pesquisar por **título**, **autor** ou **ISBN**.
* Use o filtro de classificação indicativa para restringir a busca a um tipo de livro específico.
* Clique em **✕ limpar busca** para apagar o termo digitado; o filtro de classificação selecionado permanece ativo.

#### Busca por voz

* Clique no ícone de microfone na barra de busca para ativar a busca por voz.
* Fale o termo desejado — o sistema preenche a busca automaticamente.
* A disponibilidade da Web Speech API varia conforme o navegador, a versão e o dispositivo. Se o botão de voz não aparecer ou não funcionar, use a busca textual.

#### Visualizando um livro

* Clique na capa de um livro para abrir o lightbox com a imagem em tamanho maior.
* A disponibilidade do livro é exibida em tempo real no card.
* Quando houver exemplar disponível, clique em **Reservar**. Primeiro, leia as regras de reserva e empréstimo por perfil; depois, continue ao formulário. O formulário mostra a capa e os metadados públicos do livro (volume, edição, autor, ISBN, classificação e estoque). Digite ao menos um caractere para iniciar a busca; ela encontra trechos do nome e prioriza nomes que começam pelo termo digitado. Sem marcar opções de perfil, a busca é por alunos; marque **Funcionário** e/ou **Visitante** para pesquisar esses cadastros. A solicitação fica pendente até a equipe da biblioteca agir; enquanto isso, um exemplar é descontado da quantidade disponível.
* **Alunos e visitantes** podem manter uma reserva pendente por vez. Para reservar outro livro, precisam confirmar a substituição da reserva atual. Pela regra de reservas, ambos só podem concluir uma reserva em empréstimo depois de devolver eventual empréstimo ativo (mais restritivo que o fluxo manual de visitantes).
* **Funcionários** não têm limite numérico de reservas pendentes nem de empréstimos ativos, desde que haja exemplares disponíveis para reservar.
* Ao cancelar, o exemplar volta à quantidade disponível; ao confirmar, a reserva vira empréstimo sem descontar o mesmo exemplar duas vezes. Outros exemplares livres podem ser emprestados normalmente enquanto a reserva aguarda.
* O sistema não envia notificações automáticas — o leitor deve acompanhar pessoalmente ou ser informado pelo bibliotecário.

#### Acessibilidade

* O modo escuro pode ser ativado pelo botão 🌙 na barra de acessibilidade.

#### Dica de uso

* Use a busca e os filtros do catálogo para encontrar o livro desejado e verifique sua disponibilidade antes de se deslocar até a biblioteca — o índice mostra em tempo real quantos exemplares estão disponíveis.
* Use um navegador moderno e atualizado. O suporte a recursos específicos, como busca por voz, pode variar por navegador, versão e dispositivo; a busca textual permanece disponível.

### Para Bibliotecários e Auxiliares

O Área do Bibliotecário (`admin.html`) centraliza todas as operações da biblioteca. O acesso é restrito e exige login com e-mail e senha cadastrados no Supabase.

#### Entrando no painel

1. Abra `admin.html` ou clique em *Área do Bibliotecário* no catálogo público.
2. Informe e-mail e senha cadastrados no Supabase. O formulário de login aparece no próprio painel.

#### Faixa etária de referência do acervo

O acervo usa faixas etárias como orientação interna, inspiradas nos critérios do [Guia Prático ClassInd 2025](https://www.gov.br/mj/pt-br/assuntos/seus-direitos/classificacao-1/paginas-classificacao-indicativa/guia-de-classificacao) para audiovisual, aplicativos e RPG e adaptadas com cautela a livros impressos. O [serviço oficial do ClassInd](https://www.gov.br/pt-br/servicos/obter-classificacao-indicativa) não inclui livros impressos em seu escopo; portanto, o valor do sistema não é uma classificação oficial do Ministério da Justiça. A Vân-IA considera somente as informações legíveis na capa e no verso, não o livro completo, e deve deixar a faixa em branco quando a sinopse não permitir uma avaliação responsável. A equipe da biblioteca deve revisar a sugestão. As cores dos cards são identificadores locais:

| Faixa etária de referência | Cor local |
| --- | --- |
| Livre | Verde |
| 6 anos | Verde-azulado |
| 10 anos | Azul |
| 12 anos | Amarelo |
| 14 anos | Laranja |
| 16 anos | Vermelho |
| 18 anos | Preto |

Como referência, a análise considera tendências de violência, sexo e nudez e drogas, além de intensidade, frequência, relevância, contexto e fatores agravantes ou atenuantes descritos no guia. Materiais didáticos, de referência e poesia não recebem classificação automaticamente: o conteúdo deve ser considerado.

#### Abas do painel

| Aba | Função |
| --- | --- |
| **Cadastro** | Cadastro manual de livros via formulário. No topo, o campo "Pesquisar livro cadastrado" (título, autor, ISBN ou ID) carrega os dados do livro escolhido no próprio formulário; o botão passa a "Editar livro" e o botão "✕ Novo livro" volta ao modo de cadastro. |
| **Empréstimo** | Registra a saída de um livro para um aluno, visitante ou funcionário. Alunos podem ter um empréstimo ativo por vez; visitantes e funcionários podem ter vários pelo fluxo manual. Informe o livro, o leitor e a data prevista de devolução. |
| **Reservas** | Lista solicitações pendentes. Permite emprestar (com validação atualizada do estoque e das regras por perfil) ou cancelar, mantendo histórico. |
| **Devoluções** | Lista os empréstimos ativos agrupados por urgência (🔴 atrasado, 🟡 devolver hoje, 🟢 em aberto, ⚫ sem data). Permite registrar devolução, renovar prazo ou consultar histórico. |
| **Acervo** | Visualização completa do acervo em carrossel. Permite busca, filtragem, edição rápida e exclusão. |
| **Pessoas** | Cadastro de alunos (nome, sexo, nível, ano e turma), visitantes e funcionários. Os perfis permitem marcar PcD. |
| **Lista de Pessoas** | Lista paginada de todos os cadastros com busca por nome e o total de livros pegos emprestados por pessoa. |
| **Relatório** | Indicadores de acervo e circulação; agora inclui reservas do período por status (pendentes, concluídas e canceladas). |

#### Registrando uma devolução

1. Na aba **Devoluções**, localize o empréstimo pelo nome do leitor ou pelo título do livro.
2. Clique no card para expandir os detalhes.
3. Clique em **Registrar Devolução**. O modal sugere a data de hoje, que pode ser editada; confirme para registrar ou cancele sem alterar o empréstimo.
4. Para renovar, clique em **Renovar** e informe quantos dias adicionais serão somados ao prazo atual. Na aba Devoluções, empréstimos sem data definida não podem ser renovados; no card do Acervo, a renovação usa a data do empréstimo como base.

#### Atendendo uma reserva

1. Na aba **Reservas**, localize a solicitação pendente e escolha **Confirmar** para iniciar a conversão em empréstimo.
2. No modal, confira o livro e o leitor, informe a data de início e o prazo de 1 a 31 dias (7 por padrão) ou marque **SEM DATA DEFINIDA**; confirme para registrar o empréstimo. A reserva só é concluída se as validações e o estoque permitirem.
3. Para cancelar, use a ação de cancelamento na solicitação e confirme. O exemplar volta a ficar disponível. O leitor não recebe notificação automática; a comunicação deve ser feita pela biblioteca.

#### Gerando relatórios

Na aba **Relatório**, escolha o período **Anual** (intervalo de anos) ou **Mensal** (intervalo de meses no formato ano-mês). Os filtros ficam guardados em `sessionStorage` durante a sessão atual da aba, não entre sessões do navegador.

As seções e os subtópicos que têm controle de expansão podem ser abertos ou recolhidos pelo título; abrir uma seção recolhe as demais no mesmo nível. O resumo geral permanece visível.

* O painel atualiza as informações em tempo real via Supabase Realtime — não é necessário recarregar a página.
* Ao cadastrar um livro com IA, revise os campos antes de salvar — a IA pode ocasionalmente errar a classificação indicativa.
* Para cadastrar múltiplos exemplares, aumente o campo **Quantidade total** ao invés de cadastrar o livro mais de uma vez.
* Registre devoluções imediatamente ao receber o livro físico — o sistema atualiza a disponibilidade em tempo real para todos os leitores no catálogo público.
* Para excluir um livro, ele precisa estar sem empréstimos ativos e sem reservas pendentes; cancele as reservas pendentes antes de tentar excluí-lo.

### Para Desenvolvedores

<details>
<summary><strong>📁 Arquivos do projeto — referência técnica completa (clique para expandir)</strong></summary>

Esta seção é voltada para quem deseja entender, modificar ou manter o código-fonte do BibVânia Online. O frontend é estático (HTML, CSS e JavaScript vanilla, sem etapa de build); o backend usa Supabase (PostgreSQL, Realtime e Auth) e duas Edge Functions em TypeScript. As capas ficam no ImgBB e a análise por IA usa a API da Mistral AI.

#### Arquivos do projeto

##### `index.html`

- Catálogo público, sem autenticação: qualquer visitante pesquisa o acervo, filtra por classificação indicativa, vê as capas em lightbox e pode solicitar uma reserva.
- *Inicialização:* scripts inline no `<head>` aplicam o tema (`theme`) e o tamanho da fonte (`fontSize`) antes do CSS externo carregar e leem o `VERSION.json` de forma síncrona. `bibconfig.js` define `window.BIBVANIA_CONFIG`, e `bibcore.js` é carregado como ES Module (`import DB`) e como script UMD no final do `<body>`. Todo o estado da lista (livros, filtros, paginação) fica em variáveis locais do bloco `<script type="module">`; funções chamadas por `onclick` são expostas em `window.*`. A página tem metatags Open Graph, JSON-LD do tipo `Library`, uma CSP em `<meta>` e um bloco anti-iframe (`#bv-antiframe`) que oculta a página quando ela é aberta dentro de um `iframe`; no evento `load`, registra o `service-worker.js`.
- *Busca e filtro:* o campo `#buscaLivros` pesquisa por título, ISBN e autor, sem diferenciar acentos nem maiúsculas (`normalizar`), com botão para limpar o termo de busca e busca por voz (`iniciarBuscaVoz`, de `bibcore.js`). O filtro `#filtroCategoriaPublico` é preenchido por `_popularCategoriasFiltro()` com as classificações indicativas (LIVRE a 18 anos), e `normalizarCategoriaAcervo()` converte categorias antigas do banco para a faixa equivalente.
- *Lista e capas:* `carregarLivros()` busca os livros com `DB.getLivros()` e `renderAcervo()` os mostra em carrossel paginado (`_irParaPagina`, `_criarNavCarrossel` e `_bindSwipe` para gestos de toque), com `aria-live="polite"` para anunciar as mudanças. As capas vêm de `imagem_url` (`_resolverCapas`, `_injetarCapas`) com pré-carregamento das páginas vizinhas (`_prefetchCapasVizinhas`); livro sem capa mostra o rótulo "SEM CAPA" sobre o logo (`_setLabelSemCapa`). Clicar em uma capa abre o lightbox `#capLightbox` (focus trap; `Esc` e clique no fundo fecham, via `fecharLightbox()`).
- *Disponibilidade em tempo real:* cada card mostra a disponibilidade a partir de `quantidade_disponivel`. A atualização vem de `DB.onLivrosChange` (Realtime) e de um intervalo de 60 s como alternativa; os dois chamam `_buscarEAtualizar(false)`, que preserva as capas já resolvidas em memória. A página não assina `onEmprestimosChange`: o trigger do banco já reflete os empréstimos em `livros.quantidade_disponivel`.
- *Reserva pública:* `abrirReservaPublica()` abre o modal de regras (`#reservaRegrasModal`) e, ao continuar, o formulário (`#reservaPublicaModal`). A pessoa é buscada pela RPC `bv_buscar_pessoas_reserva` (`DB.buscarPessoasParaReserva`), com os filtros FUNCIONÁRIO e VISITANTE exclusivos entre si (`_tiposBuscaReserva`), e a reserva é criada por `bv_criar_reserva` (`DB.criarReservaPublica`); o catálogo não acessa diretamente as tabelas `pessoas` e `reservas`. Alunos e visitantes têm uma reserva pendente por vez, e o sistema pede confirmação para substituir a anterior.
- *Baixar acervo completo (PDF):* o botão "📥 BAIXAR ACERVO COMPLETO" chama `baixarAcervoPdf()`, que carrega `pdfmake@0.2.9` e `vfs_fonts` do jsDelivr por tags `<script>` (versão fixa; a CSP não permite `unsafe-eval` nem requisições XHR/fetch a CDNs), mostra o progresso em `#downloadOverlay` e monta o documento em blocos (`_montarLinhasChunks`).
- *Acessibilidade:* skip link (WCAG 2.4.1), `role` e `aria-label` nos controles, botões de modo escuro (`toggleDarkMode()`) e de tamanho da fonte na barra de acessibilidade, e o menu `#menuAtalhos`, que oferece o atalho `irParaAdmin()` para o painel.

##### `admin.html`

- Área do Bibliotecário completo. Acesso restrito: sem sessão ativa, exibe o formulário de login em overlay dentro da própria página (não existe `login.html`).
- *Barra de acessibilidade — item exclusivo do admin:* botão "Verificar Versão" no menu de atalhos compara o `VERSION.json` local com o remoto (`raw.githubusercontent.com` do BibVânia Online) via comparação semver; se desatualizado, exibe o banner "⚠️ Atualização disponível" com botão que abre o repositório da BibVânia Online em nova aba; se já atualizado, mostra "✅ ATUALIZADO"; sem conexão, "📡 SEM CONEXÃO" (ambos clicáveis para nova tentativa).
- *Modal de perfil do bibliotecário:* acessível pelo botão "OI, [NOME]!" no menu de atalhos — o nome é lido do cache `bibvania_admin_nome` no `localStorage` antes do módulo carregar (evita flash mostrando "Sair" por engano); exibe foto de perfil (círculo com inicial como fallback) com upload/exclusão via `processarFotoPerfil()`/`excluirFotoPerfil()`/`abrirFotoPerfil()` (aceita JPG/PNG/WebP/HEIC/HEIF), e-mail, nome e botão Sair.
- *Aba Cadastro — pesquisa e edição de livro (`window._cadEdit`, `window._cadSairEdicao`, `window._cadLabelBtn`):* o campo `#cadBuscaLivro` (acima das capas) busca no cache de `DB.getLivros()` (renovado a cada 30s) por título, autor, ISBN ou ID, sem acento e sem diferenciar maiúsculas; as sugestões são montadas via DOM (`textContent`), sem `innerHTML` com dados do banco. Ao selecionar, o formulário é preenchido (incluindo Volume, Edição, quantidade total, descrição da capa, capa e verso) e `window._cadEdit.id` guarda o ID em edição; o botão de envio vira "EDITAR LIVRO" e o título do card vira "EDITAR LIVRO". No submit, se houver ID, salva com `DB.atualizarLivro` (recalcula `quantidade_disponivel`), recusa quantidade total menor que os empréstimos ativos, preserva capa/verso existentes quando não há novo envio e limpa no banco só o que foi excluído com "EXCLUIR CAPA/VERSO". O botão da IA (Vânia) habilita quando há capa ou verso disponível, inclusive imagem já salva ao editar. `window._cadEditarLivro(id)` (chamada pelo botão "✏️ EDITAR" dos cards do ACERVO) busca o livro atualizado com `DB.getLivroPorId`, troca para a aba CADASTRO (`switchTab`) e chama a mesma função interna `selecionar()` usada pela pesquisa, deixando o livro em modo edição.
- *Aba Cadastrar Pessoas:* checkbox "Funcionário" oculta os campos de nível/ano/turma; "Nível de Ensino" oferece Ensino Fundamental (Ano 1–9 + Turma de uma letra), Ensino Médio ou EJA (sub-nível Fundamental/Médio + número da Sala); checkbox "Pessoa com Deficiência (PcD)" disponível em qualquer cadastro.
- *Início do módulo ES:* `_popularCatSelects()` preenche automaticamente os `<select>` de categoria (`categoria`, `editCategoria`, `iaCampoCategoria`, `iaEditCategoria`) a partir de `DB.CATEGORIAS` (ou lista fixa de fallback); tamanho de fonte ajustável em 5 níveis (10/12/14/16/18px) persistido em `localStorage` (nível 18 antigo é normalizado para 16).
- *Aba Acervo — botões de ação do card:* cada card do acervo admin tem "✏️ EDITAR" (abre o livro na aba CADASTRO em modo edição via `window._cadEditarLivro(id)`) e "🗑️ EXCLUIR" (`window.delLivro`).
- *Aba Acervo — renderizadores e empréstimos ativos por livro:* o renderer UMD (`cardLivro`) mostra capa, ID, título, autor, ISBN, categoria, disponibilidade e ações de edição (`window._cadEditarLivro(id)`) e exclusão. Nele, o acordeão "EMPRÉSTIMOS" lista empréstimos ativos com "DEVOLVER", "RENOVAR" e "EXCLUIR". O renderer ES (`renderLivro`) não monta esse mesmo acordeão; as saídas não são idênticas. Excluir um empréstimo ativo aciona o recálculo da disponibilidade pelo trigger do banco.
- *Modal Editar Empréstimo (`modalEditEmp`):* permite trocar o livro pelo campo de busca com sugestões, trocar a pessoa do empréstimo (com preenchimento dos dados disponíveis), ajustar "DIAS DE EMPRÉSTIMO" e a data, ou marcar "SEM DATA DEFINIDA" — a data prevista de devolução é recalculada (data base + dias).
- *Renovar empréstimo (`modalRenovarEmp`):* pede apenas "DIAS ADICIONAIS" — soma esses dias à data prevista de devolução atual (ou à data do empréstimo, se ainda sem prazo definido) e acumula em `dias_emprestimo`; no card do Acervo o botão Renovar fica sempre habilitado, mas na aba Devoluções é desabilitado para empréstimos "sem data definida".
- *Detecção de livro parecido no cadastro manual:* antes de enviar imagens e inserir um livro novo (não na edição), `_confirmarLivroParecido()` consulta o acervo e considera parecido o livro que tiver o **mesmo título e autor** (comparação sem acentos, caixa ou espaços extras) **ou o mesmo ISBN** (só dígitos e X; ignorado se o ISBN não foi informado). Em caso positivo, abre `modalLivroParecido` comparando "LIVRO QUE SERÁ CADASTRADO" e "LIVRO JÁ EXISTENTE" (miniaturas 4:5 iguais às do acervo, com a frase do motivo: mesmo título e autor, mesmo ISBN ou ambos) e três opções — "CANCELAR", "NOVO" (cadastra com novo ID mesmo assim, útil para edições ou capas diferentes da mesma obra) e "EDITAR EXISTENTE" (abre a edição do livro já cadastrado).
- *Aba Lista de Pessoas:* agrupa por turma (Fundamental/Médio/EJA) e por "Funcionários"; cada pessoa exibe o badge de turma/PcD e um selo verde com o total de livros pegos emprestados ("📚 N LIVROS", "📚 0 LIVROS" quando nunca pegou), somando empréstimos ativos e devolvidos; o mesmo livro pego mais de uma vez conta mais de uma vez. A contagem (`_carregarContagemEmprestimos()`) busca os empréstimos em páginas de 1.000 e soma por `pessoa_id`; empréstimos antigos sem `pessoa_id` entram pelo nome, somente se o nome for único na lista. Se a contagem falhar, o selo não é exibido. Botões "EDITAR" (`modalEditPessoa`, com verificação de nome duplicado na mesma turma) e "EXCLUIR" (`excluirPessoa`).
- *Aba Devoluções — sub-abas:* grade 2×2 com 4 botões — "⚠️ Atrasado", "📅 Devolver Hoje", "✅ Em Aberto" e "🕐 Sem Data Definida" — cada um com a contagem de itens; a busca textual navega automaticamente para a primeira sub-aba com resultado. Empréstimos do mesmo leitor são agrupados em um único acordeão (todos os livros emprestados a ele) com badges de urgência por pessoa, e o botão "DEVOLUÇÕES" do menu principal recebe cor de fundo (vermelho/amarelo/verde/cinza) conforme a urgência mais crítica entre todos os empréstimos ativos.
- *Seletores de capa e verso (cadastro manual e edição):* em dispositivos móveis e navegadores touch abre um bottom-sheet para escolher Câmera ou Galeria; no desktop abre a galeria diretamente. Os inputs ficam invisíveis, mas renderizados no DOM para compatibilidade com WebViews móveis. A imagem é redimensionada por canvas para no máximo 1080×1350px (4:5) em JPEG 92% antes do upload ao ImgBB. Antes disso, `_validarArquivoImagem` confere só o essencial: formato JPG, PNG, WebP ou HEIC/HEIF, até 10 MB e imagem legível pelo navegador; não há exigência de dimensão mínima nem de proporção.
- *Upload ImgBB (`_iaUploadImgbb`):* aceita data URL ou base64 puro, valida tamanho mínimo (100 chars), faz POST para a Edge Function `upload-imagem` (que repassa a imagem a `api.imgbb.com/1/upload` com a chave do Secret `IMGBB_API_KEY`) com backoff — até 3 tentativas com espera de 1200ms e 2400ms entre elas (resolve rate limit e instabilidade de rede em dispositivos móveis).
- *Botão Vânia — análise de capa com IA (`window.abrirVanIA`):* disponível no cadastro novo e no modo EDITAR LIVRO; fica habilitado assim que há uma capa OU um verso (`window._capaBase64`/`window._versoBase64` recém-selecionados ou, na edição, os salvos `_cadEdit.livro.imagem_url`/`verso_url`, via `_vanIACapaAtual()` e `_vanIAVersoAtual()`, respeitando `capaRemovida`/`versoRemovido`). Na edição, como o formulário já vem preenchido, a análise pede confirmação e substitui título, autor, ISBN, classificação, Volume, Edição e descrição da capa (a quantidade não muda); nada é gravado até "EDITAR LIVRO". Envia a imagem (base64 ou URL) para a Mistral AI — só as imagens que existem: a capa ("Primeira imagem: CAPA do livro.") e/ou o verso ("Segunda imagem: VERSO do livro."), cada uma avisando quando a outra não foi enviada — pela Edge Function `vania-ia`, que chama `https://api.mistral.ai/v1/chat/completions` com a chave do Secret `MISTRAL_API_KEY` e fixa no servidor o modelo `ministral-14b-2512` (ou o do Secret opcional `MISTRAL_MODEL`), temperatura 0, limite de 700 tokens e `response_format: json_object` com o prompt de catalogação no arquivo raiz `van-ia.prompt`, carregado sob demanda pelo painel e enviado com as imagens; ele pede título, autor (pessoa, incluindo assinatura manuscrita ou logotipo com nome de pessoa, transcrita letra por letra, sem completar o nome pela memória, preferindo a grafia impressa do verso e, em dúvida real, usando a editora; se não houver, a editora impressa na capa ou no verso, mesmo pequena ou como logotipo com nome, no rodapé ou nos cantos, ou, por último, o órgão responsável; a flag `autor_identificado` só vira `false` quando nenhum dos três aparece), ISBN, categoria (uma das 7 faixas fixas: LIVRE, 6, 10, 12, 14, 16 e 18 anos; a sinopse do verso é a principal evidência para a classificação indicativa e, sem sinopse, a IA usa título, ilustrações, gênero (com apoio de um guia de gêneros por faixa etária no prompt) e demais elementos da capa e do verso) e descrição de acessibilidade da capa. Antes da resposta da IA, o navegador tenta ler o ISBN das barras da capa e do verso (`_lerIsbnDaImagem()`, com `BarcodeDetector` nativo ou `@zxing/library@0.21.3`; na edição, com imagens já salvas, `_lerIsbnDaUrl()` baixa a imagem do ImgBB em até 8 s), e a IA só vale para o ISBN quando as barras não puderem ser lidas. `_vanIAPreencherFormulario()` aplica o resultado sem sobrescrever campos já preenchidos manualmente (o ISBN só é preenchido se estiver completo, com 10 ou 13 caracteres e dígito verificador correto, validado por `_vanIAIsbnValido()`), usando `_sincAutorNaoId()` quando o autor não é identificado. Após cada chamada (sucesso ou erro), `_vanIAIniciarCooldown()` bloqueia o botão por `VANIA_COOLDOWN_S` (30s) com contagem regressiva no próprio rótulo; esse intervalo local não garante que o limite do provedor será respeitado. Se a Mistral responder 429 (limite de uso atingido), a pausa local sobe para 60s; consulte a página de limites da API e aguarde antes de tentar novamente. A chave fica no Secret `MISTRAL_API_KEY` da Edge Function `vania-ia`; se a função não estiver publicada ou o Secret faltar, o botão exibe o erro ao ser clicado.
- *Validações no envio do formulário de livro (`formLivro`):* título, autor e classificação indicativa são obrigatórios (erros "❌ INFORME O TÍTULO", "❌ INFORME O AUTOR" e "❌ SELECIONE A CLASSIFICAÇÃO INDICATIVA."); após salvar, chama `window._atualizarAcervoImediato()` para atualizar o card em memória sem aguardar reload.
- *Bloco UMD — Aba Empréstimo:* IIFE síncrono completo com elementos DOM cacheados em `_refs()`; busca de livros por título/autor/ID com debounce 250ms e cache local `_livrosCache`; busca de pessoas com fonte primária `window._pessoasCache` com filtro por tipo (aluno/funcionário via checkbox que muda label); campo de dias (1–31, padrão 7) + data + checkbox "Sem data definida" (campo vira "SEM PRAZO" desabilitado); preview de data prevista de devolução (`empAtualizarPreviewDevolucao`); ao confirmar: valida livro, pessoa e disponibilidade; para alunos, checa empréstimo ativo via `pessoa_id` (fallback nome) antes de salvar; payload inclui `pessoa_id`, `nome_aluno`, `sexo`, `ano_aluno`, `turma_aluno`, `sem_data_definida`, `dias_emprestimo`, `data_emprestimo`, `data_prevista_devolucao`; após salvar: invalida `_livrosCache` e `window._empsComLivroCache`, recarrega devoluções, acervo e relatório, reseta formulário via `_resetForm()`; expõe `window._invalidarCacheLivrosEmp()` para uso após cadastro de livro.
- *Bloco UMD — Aba Acervo (`carregarAcervoUMD` / `renderAcervoFiltrado` / `cardLivro`):* busca paralela (`Promise.all`) de livros e empréstimos ativos; popula o select de categorias dinamicamente com contagem; render incremental em blocos de 20 cards por `requestAnimationFrame`; `cardLivro()` gera cards com capa, ID, título, autor, ISBN, categoria e disponibilidade, além dos botões ✏️ EDITAR (`window._cadEditarLivro(id)`) e 🗑️ EXCLUIR. O acordeão de empréstimos do renderer UMD tem DEVOLVER / RENOVAR / EXCLUIR; livros atrasados são rastreados em `_idsAtrasados` e `_toggleAccervo` alterna o acordeão.
- *Bloco UMD — Aba Devoluções (`carregarDevolucoes` / `_renderDevPaginaUMD`):* 4 sub-abas em grade 2×2 (⚠️ Atrasado / 📅 Devolver Hoje / ✅ Em Aberto / 🕐 Sem Data Definida) criadas por `_criarNavDevUMD()`; contadores nos botões refletem a busca ativa; ao buscar, navega automaticamente para a sub-aba com resultado; cada grupo é um acordeão (`_toggleDev13`) com badge de urgência por pessoa e lista de livros com DEVOLVER / EDITAR / RENOVAR / EXCLUIR; `_atualizarBolinhaDev()` colore o botão "DEVOLUÇÕES" conforme urgência mais crítica (vermelho = atrasado, amarelo = hoje, verde = em aberto, cinza = sem prazo); sincroniza página ativa entre UMD e módulo ES via `window._paginaDevAtualES` / `window._setPaginaDevUMD(idx)`; `window._renderDevUMD()` exposta para o módulo ES chamar após optimistic updates.
- *switchTab / inicialização da aba ativa:* `switchTab(e, id)` persiste a aba ativa no `sessionStorage` (`bibvania_tab`), sincroniza o `<select id="tab-select">` e dispara a inicialização específica de cada aba (`_renderAcervoOnTab`, `carregarDevolucoes`, `carregarListaPessoas`; para `tab-relatorio`, aguarda `_dbReady` e chama `_initFiltrosRel()` + `relGerar()`); ao trocar de aba, `_relLimparClock()` interrompe o relógio do relatório. A IIFE de inicialização (`_onReady`, em `DOMContentLoaded` ou imediata) repete essa lógica para restaurar a aba salva (padrão `tab-cadastro`) e também chama `_colorirBotaoDevolucoes()` — um fetch leve e independente do módulo ES que busca apenas empréstimos com `status='emprestado'` (`sem_data_definida`, `data_prevista_devolucao`) e colore o botão "DEVOLUÇÕES" (vermelho/amarelo/verde/cinza) antes mesmo do módulo ES terminar de carregar; só aplica a cor se o botão ainda não tiver `backgroundColor` definido (evita piscar).
- *Devoluções/exclusão de empréstimo — atualização otimista:* `window.devolverEAtualizar(id)` e `window.delEmpEAtualizar(id)` removem o item de `_empsComLivroCache`/`_empsDevCache` e re-renderizam (`_renderDevUMD`) antes da resposta do banco, depois confirmam via `update status='devolvido'` ou `delete`, re-buscam em segundo plano com `DB.getEmprestimosAtivosComLivro()` para garantir consistência e recarregam acervo/relatório (e lista de pessoas, na exclusão); em erro, limpam os caches e recarregam a aba do zero. `_modalDataDevolucao()` é o modal que pede a data da devolução (padrão hoje, editável) com botões "✓ CONFIRMAR"/"✕ CANCELAR", usado por `devolverEAtualizar()`; resolve com a data escolhida (meio-dia local) ou `null` se cancelado.
- *Lightbox de capa do acervo admin:* `#capLightbox`/`abrirLightboxAdmin(src, titulo)`/`fecharLightboxAdmin()` seguem o mesmo padrão visual do lightbox do `index.html` — overlay com imagem ampliada, título e botão "← VOLTAR"; salvam o elemento com foco anterior (`lb._opener`) para restaurá-lo ao fechar; Esc fecha.
- *Overlays de transição:* `#sairOverlay`/`window.sairComTransicao()` — ao clicar em "Sair", exibe overlay full-screen (logo + 3 bolinhas saltitantes + barra que encolhe em 2s) antes de chamar `DB.signOut()`. `#navTransicaoOverlay`/`window.navegarComTransicao(url, logo)` — overlay equivalente (logo + bolinhas) exibido por 600ms antes de navegar para `url`; ambos são definidos localmente em `admin.html`, independentes do overlay de `bibcore.js`. A rotina de `pagehide`/`pageshow` limpa o overlay de navegação; o overlay de saída não está nessa lista de limpeza.
- *Checkbox "Autor Não Identificado":* aplicado por delegação a 5 pares campo/checkbox — cadastro manual (`autor`/`autorNaoId`), edição com IA (`iaEditAutor`/`iaEditAutorNaoId`), campo de IA (`iaCampoAutor`/`iaCampoAutorNaoId`), edição manual (`editAutor`/`editAutorNaoId`) e edição por duplicidade (`dupEditAutor`/`dupEditAutorNaoId`); ao marcar, o campo recebe `N/A`, é desabilitado e perde `required`; `_sincAutorNaoId()` sincroniza o checkbox quando o valor `N/A` já vem preenchido (ex.: ao abrir a edição de um livro sem autor identificado).

##### Autenticação do painel (`admin.html`)

O formulário de login (`#adminLoginForm`, tratado por `_autenticarNoAdmin`) é exibido em um overlay dentro de `admin.html`; não existe `login.html`. Em `init()`, o painel verifica a sessão do Supabase Auth com `DB.getSession()`: sem sessão, mostra o formulário; com sessão, oculta o formulário e carrega o painel. `DB.onAuthStateChange` trata o `SIGNED_OUT`: se o logout foi intencional (botão SAIR, marcado em `bibvania_signout_intencional`), volta ao formulário; se não foi, espera 2 s e só volta ao formulário se a sessão não tiver sido restaurada. A sessão fica em `localStorage` e expira após 8 dias sem interação (`INATIVIDADE_LIMITE_MS`; a última atividade fica em `bibvania_ultima_atividade`). Quem está logado já é administrador: as políticas RLS exigem apenas `authenticated`, sem tabela de administradores. O nome (`nome`) e a foto (`foto_url`) do bibliotecário ficam no `user_metadata` do Supabase Auth; as consultas para colocar, trocar e excluir o nome estão em "Como Criar uma Biblioteca".

##### `bibmaker.claude`

Arquivo construtor de bibliotecas — não é uma página web, e sim um arquivo lido pelo Claude numa conversa. Contém: ativação com arquivos-base completos; `BibMaker create` para criar ou `BibMaker update` para atualizar; no modo update, exige o pacote/pasta completo da biblioteca atual, o `bibconfig.claude` e os novos arquivos-base. `BibMaker` sozinho escolhe pelo conteúdo real do config, ignorando comentários e exemplos. O cabeçalho identifica o construtor; a versão segue a convenção de base menos 0,3. Há pré-requisitos, guias para Supabase/ImgBB/Mistral/GitHub, entrevista condicional, imagens obrigatórias, chave publishable do Supabase e separação de chaves privadas. A licença padrão CC BY-SA 4.0 só é proposta quando o tipo é `com` e o nome está vazio; opções `sem`/`dominio` registram o escopo e preservam a licença/atribuição da base e os termos de terceiros. A descrição Open Graph é opcional, com fallback. O pós-processamento inclui validação de metadados, comparação de SQL e Edge Functions na atualização, backup e autorização antes de migrações, README/LICENCE alinhados, changelog, hash e ZIP. `bibconfig.claude` guarda as respostas e é regenerado após confirmação, sem chaves privadas. Os campos de versão usam `X.Y`. Regra de autoria: em toda biblioteca derivada, criada ou atualizada, o autor, o site do autor e o ano informados na entrevista prevalecem nos metadados, no JSON-LD, nos rodapés e nos documentos da biblioteca; a atribuição ao autor da BibVânia Online permanece para o material derivado da base.

##### `bibconfig.claude`

Arquivo privado de configuração de uma biblioteca derivada, gerado (e regenerado a cada atualização) pelo `bibmaker.claude` ao final da entrevista. Contém as respostas dadas e permite continuar atualizações futuras sem repetir toda a entrevista. Não é distribuído nesta pasta-base: deve ser guardado fora do repositório e do ZIP publicado, nunca no GitHub. Em uma atualização, anexe-o junto com o pacote/pasta completo da biblioteca derivada atual e os novos arquivos-base: o pacote é necessário para conferir hash/versão e preservar alterações e imagens; o config sozinho não contém esses arquivos. Confirme os dados salvos; somente campos vazios ou alterados precisam de nova resposta. Serve tanto para atualizar a biblioteca com novos arquivos-base da BibVânia Online quanto para alterar a própria biblioteca derivada.

##### `bibcore.js`

Módulo central do sistema, importado como ES Module por `index.html` e `admin.html` e carregado também como script UMD no final de cada página, para os scripts inline que chamam suas funções de forma síncrona. Reúne três responsabilidades:

- *Transição de página:* uma IIFE injeta o overlay `#_bv-transition` (logo de 80 px com pulso e três bolinhas de 10 px) e define `window.navegarCom(url)`; o overlay entra, aguarda 140 ms, redireciona e é removido no evento `pageshow` (inclui bfcache).
- *Acessibilidade e utilitários exportados:* `iniciarBuscaVoz(inputEl, onResult)` insere o botão 🎤 ao lado do campo e inicia o reconhecimento em `pt-BR` (Web Speech API; sem suporte, o botão não aparece), e `_anunciar()` atualiza uma live region para leitores de tela. `spanCategoria(categoria)` devolve o `<span>` da classificação indicativa com a cor da faixa e converte categorias antigas do banco para a faixa equivalente. `fmtAutor()` esconde o autor "N/A", `fmtVolumeEdicao()` formata Volume e Edição e `escapeHtml()` escapa texto antes de montar HTML.
- *Banco de dados (Supabase):* cria o cliente com `@supabase/supabase-js@2.89.0` (versão fixa, jsDelivr) a partir de `window.BIBVANIA_CONFIG` (`bibconfig.js`: só a URL e a chave `sb_publishable_`), com a sessão em `localStorage` (`persistSession` e `autoRefreshToken`). O objeto `DB` (export default e `window.DB`) agrupa:
  - autenticação: `signIn`, `signOut`, `getSession`, `checkAuth`, `redirectIfLoggedIn` e `onAuthStateChange`;
  - livros: `getLivros`, `getLivroPorId`, `getCapa`, `getIdsComCapa`, `getCapas`, `getCapaUnica`, `getProximoIdDisponivel`, `salvarLivro`, `atualizarLivro` e `excluirLivro`;
  - empréstimos: `registrarEmprestimo`, `atualizarEmprestimo`, `excluirEmprestimo`, `registrarDevolucao`, `getEmprestimos`, `getHistoricoPessoa`, `getEmprestimosAtivosComLivro`, `getEmprestimosAtivos` e `getStatusEmprestimosPublico`;
  - reservas: `buscarPessoasParaReserva`, `criarReservaPublica`, `getReservasPendentes`, `getReservas`, `cancelarReserva` e `concluirReserva`;
  - pessoas: `getPessoas`, `salvarPessoa`, `atualizarPessoa` e `excluirPessoa`;
  - Realtime: `onLivrosChange`, `onEmprestimosChange`, `onPessoasChange` e `onReservasChange`, que compartilham um canal por tabela com vários callbacks;
  - `DB.CATEGORIAS`: as 7 classificações indicativas (LIVRE, 6, 10, 12, 14, 16 e 18 anos).
- *Padronização e paginação:* `padronizarObjeto()` grava os textos em maiúsculas, exceto `imagem_url`, `verso_url`, `alt_text` e `foto_url`, e `DB._fetchAll()` pagina os resultados para contornar o limite de 1.000 registros por requisição. O upload de capas ao ImgBB não fica aqui, e sim no `admin.html` (`_iaUploadImgbb`).

##### `style.css`

Folha de estilos global compartilhada por todas as páginas. Define os tokens de design em `:root`: `--primary`, `--primary-dark`, `--success`, `--danger`, `--warning`, `--bg`, `--card`, `--text`, `--text-light`, `--border`, `--radius`, `--shadow`, `--font-size`, `--cover-h` (altura do card do acervo público), `--cover-h-admin` (altura do card admin) e `--execuções-h` (altura dos botões de ação). Tema escuro via `[data-theme=dark]`; fallback automático via `prefers-color-scheme: dark` para quem não tem preferência salva. A classe `.no-theme-transition` suprime todas as transitions durante a troca de tema. Respeita `prefers-reduced-motion` (desativa animações) e `forced-colors` (alto contraste — adiciona bordas em botões e badges).

##### `bibconfig.js`

Configuração pública do frontend: define `window.BIBVANIA_CONFIG` (objeto congelado com `Object.freeze`) com `SUPABASE_URL` e `SUPABASE_PUBLISHABLE_KEY` (chave `sb_publishable_`). É carregado antes de `bibcore.js` em `index.html` e `admin.html` e pode ficar no repositório público, porque a proteção dos dados vem do RLS e das RPCs do banco. Nunca coloque aqui chaves `secret`, `service_role`, ImgBB ou Mistral AI. O catálogo aberto pelo monitor Checkly usa esta configuração para consultar o Supabase; o teste Playwright documentado acima apenas espera a resposta da consulta e não recebe nem lê chaves diretamente.

##### `service-worker.js` e `manifest.webmanifest`

PWA do catálogo e do painel. O `service-worker.js` (cache `bibvania-shell-v0.7@<escopo do site>`, separado por biblioteca) guarda a casca do site (`index.html`, `admin.html`, `bibconfig.js`, `bibcore.js`, `style.css`, `van-ia.prompt`, o manifesto, favicons, ícones, `logo.png` e `og-image.png`) e **nunca intercepta o Supabase nem outras origens**: só trata requisições GET da mesma origem, buscando na rede primeiro e usando o cache como reserva; caches de versões antigas são apagados ao ativar. A versão do cache segue sempre a regra **versão do projeto-base − 2,4** (atualmente `3.1 − 2,4 = 0.7`); ao mudar a versão-base, ajuste o número do cache conforme essa conta. O `manifest.webmanifest` define nome e `short_name`, `display: standalone`, cores (`#0f172a` de fundo e `#2563eb` de tema), orientação e os ícones `icon-192.png` e `icon-512.png`.

##### Imagens e ícones

`logo.png` (logo do sistema, usado no cabeçalho e nas transições), `favicon.ico`, `favicon.png`, `favicon-16.png`, `favicon-32.png`, `favicon-48.png`, `apple-touch-icon.png`, `icon-192.png` e `icon-512.png` (ícones do navegador e do PWA), `og-image.png` (imagem de compartilhamento Open Graph), `van-ia.png` (imagem do botão Vânia no `admin.html`) e `bibmaker-logo.png` (logo do BibMaker).

##### `robots.txt` e `sitemap.xml`

O `robots.txt` libera o site para buscadores, mas bloqueia `/admin.html` e `/bibconfig.claude`, e aponta para o sitemap. O `sitemap.xml` lista apenas a página pública (a raiz do site). Em bibliotecas derivadas, os endereços são os da própria biblioteca.

##### Monitor do Supabase (Checkly)

O Checkly é configurado e executado externamente ao repositório. O teste Playwright completo fica como modelo copiável na seção "Mantendo o Supabase sempre ativo" deste README; a pasta `checkly/` e um arquivo de teste separado não são necessários. Remover a cópia do repositório não altera um monitor que já esteja configurado no Checkly.

##### `CHANGELOG.md`

Histórico de mudanças do projeto, com a entrada mais recente no topo. Cada entrada tem um ID crescente (`#N`), data e hora, os arquivos alterados e a descrição, com um resumo em termos simples no final. Toda alteração deve ser registrada (ver a regra obrigatória em "Estrutura de arquivos"). Cada biblioteca derivada tem o próprio `CHANGELOG.md`, que começa na `#1`.

##### `.gitignore` e `.nojekyll`

O `.gitignore` impede o envio de `bibconfig.claude` e arquivos `.env` ao GitHub. O `.nojekyll` (arquivo vazio) desativa o processamento Jekyll do GitHub Pages, para que os arquivos sejam servidos como estão.

##### `supabase_setup.sql`

Script SQL completo para criação das tabelas, triggers, RLS, políticas e RPCs. Em um projeto novo, execute-o no SQL Editor do Supabase. Em uma instalação existente, não reaplique o arquivo completo às cegas: consulte a comparação do BibMaker, faça backup, revise a migração indicada e aplique somente o necessário, após autorização. O script contém blocos idempotentes de migração de colunas, mas isso não substitui a revisão do impacto; ele não apaga a tabela de reservas. No final, solicita a recarga do cache de funções do PostgREST. Cria/configura `livros`, `emprestimos`, `pessoas`, `reservas` e `livros_excluidos` (histórico de exclusão de livros). Não há tabela de administradores: quem está autenticado é administrador, e o nome e a foto de perfil ficam no `user_metadata` do Supabase Auth. Os triggers recalculam `quantidade_disponivel`, validam o estoque de reservas e empréstimos, sincronizam a disponibilidade ao editar `quantidade_total` e protegem livros com reservas pendentes; as RPCs `bv_buscar_pessoas_reserva`, `bv_criar_reserva` e `bv_concluir_reserva` atendem às reservas. Inclui migração automática de `pessoa_id` em empréstimos existentes.

##### `van-ia.prompt`

Arquivo de texto na raiz do projeto com as instruções completas de catalogação usadas pelo botão Vânia. O painel o carrega sob demanda na mesma origem e envia seu conteúdo à Edge Function `vania-ia` junto com as imagens. A separação facilita manter e revisar o prompt sem misturá-lo ao HTML; não o torna secreto, pois o navegador precisa lê-lo.

##### Fontes das Edge Functions

Os arquivos TypeScript `upload-imagem.ts` e `vania-ia.ts` ficam na raiz do projeto e podem ser copiados integralmente para o Editor do Supabase. `upload-imagem` recebe um `FormData` com o campo `image` e o repassa ao ImgBB usando o Secret `IMGBB_API_KEY`; `vania-ia` recebe `{ messages }` do botão Vânia e chama a Mistral AI usando `MISTRAL_API_KEY`, com modelo, temperatura, limite de saída e formato JSON fixados no servidor. As duas conferem no Supabase Auth que quem chama está logado, respondem ao pré-voo CORS e devolvem a resposta do serviço (inclusive o 429 da Mistral). Publique com **Verify JWT desligado**, pois cada função valida a sessão internamente. Não há chave privada nos arquivos.

**Uso pelo Supabase CLI:** a raiz deste projeto não contém a estrutura de deploy da CLI. Dentro de um projeto Supabase CLI, recrie a estrutura esperada e copie os fontes antes do deploy:

```sh
mkdir -p supabase/functions/upload-imagem supabase/functions/vania-ia
cp upload-imagem.ts supabase/functions/upload-imagem/index.ts
cp vania-ia.ts supabase/functions/vania-ia/index.ts
supabase functions deploy upload-imagem --no-verify-jwt
supabase functions deploy vania-ia --no-verify-jwt
```

Para o procedimento sem CLI, basta colar o conteúdo dos arquivos raiz no Editor do painel.

##### `bibhash.sig`

Assinatura SHA-256 de integridade dos arquivos da pasta do projeto (da BibVânia Online ou de uma biblioteca derivada), não do contêiner ZIP. Formato: SHA-256 hex puro (64 caracteres), sem prefixo, sem newline. Método exato: extraia o ZIP e entre na pasta da biblioteca — não na raiz do ZIP quando o `bibconfig.claude` estiver ao lado —; exclua/remova `bibhash.sig` e execute `LC_ALL=C find . -type f | sort | xargs sha256sum | sha256sum`; grave o resultado com `echo -n`. Paths incluem prefixo `./`; sort é byte-order (`LC_ALL=C`). O `bibconfig.claude` fica fora da pasta pública e não entra no cálculo. Recalcule após qualquer modificação aos arquivos do projeto. Em caso de divergência ao receber o ZIP, compare o hash calculado dentro da pasta da biblioteca com o armazenado e não prossiga com a atualização até confirmação explícita. Cada biblioteca gerada pelo `bibmaker.claude` tem o seu próprio `bibhash.sig`, calculado pelo mesmo método e gerado por último, depois de todos os arquivos finais, em toda criação ou atualização; após compactar, extraia o ZIP e valide novamente dentro da pasta do projeto. O `bibhash.sig` da BibVânia Online não vale para a biblioteca derivada.

##### `VERSION.json`

Fonte de verdade das versões. Na pasta-base, informa a versão da BibVânia Online no formato `{"bibvania":"X.Y"}`. Em uma biblioteca derivada, `bibvania` identifica a versão da base e `projeto` guarda a versão própria; não confundir nem substituir uma pela outra. O BibMaker ajusta os carregadores inline dos dois HTMLs para manter `window.BIBVANIA_VERSAO` e a metatag `versaobase` ligados a `bibvania`, enquanto a metatag `version` recebe `projeto`. O botão "Verificar Versão" do `admin.html` compara o campo `bibvania` local com o `VERSION.json` publicado pela BibVânia Online.

##### `LICENCE.md`

Contém o texto CC BY-SA 4.0, o escopo declarado do material do projeto e o inventário centralizado de dependências, serviços externos e respectivos termos. A licença não substitui direitos de terceiros nem os termos dos serviços hospedados.

##### `README.md`

Documentação de instalação e uso voltada ao GitHub. Inclui pré-requisitos, o passo a passo para criar e para atualizar uma biblioteca, as funcionalidades e esta referência técnica. O histórico de mudanças fica no `CHANGELOG.md`, e não no README. Na biblioteca derivada, é gerado pelo `bibmaker.claude` como cópia deste README: o nome da biblioteca entra só onde identifica a biblioteca (título e apresentação), junto com os links dela e a linha "Desenvolvido por" (autor da biblioteca); as referências à BibVânia Online como projeto base (versão nova, atualização, arquivos-base, repositório oficial, licença) permanecem.

#### Arquitetura técnica resumida

* **Rodapé por modalidade:** os três rodapés (`index.html`, login e painel) montam sua descrição a partir das metatags comuns `tipobib`, `denominacaoescola`, `nomeescola` e `nomebiblioteca`. Bibliotecas escolares exibem a denominação da escola e o nome oficial; comunitárias exibem "biblioteca comunitária" seguido do nome, sem duplicar esse prefixo quando já estiver preenchido no cadastro.
* **Nome do projeto no cabeçalho:** o título abaixo da logo (`<h1 data-nome-projeto>` no `index.html` e duas vezes no `admin.html`), o cabeçalho e o rodapé do PDF do acervo e o cabeçalho dos relatórios leem a metatag `nomeprojeto`, que existe nos dois HTMLs com o mesmo valor (na base, "BibVânia Online"). Se a meta estiver vazia, vale o texto escrito no `<h1>`. Em bibliotecas derivadas, o BibMaker preenche a meta e o texto inicial do `<h1>` com o Nome do Projeto, na geração e em toda atualização.
* **Identidade da biblioteca no cabeçalho:** o bloco de duas linhas com o nome da biblioteca (ex.: "BIBLIOTECA ESCOLAR DA EMTI" / "PROFESSORA MARIA VÂNIA FARIAS LINHARES"), o aria-label desse bloco e os cabeçalhos dos relatórios e do PDF são montados por um script na `<head>` do `index.html` e do `admin.html` a partir das metatags de identidade (`tipobib`, `tipolabel`, `denominacaoescola`, `nomeescola` e `nomebiblioteca`), que gravam o resultado em `nomeesc1` e `nomeesc2`. O mesmo script preenche o nome do projeto em negrito dos rodapés (`data-nome-projeto-rodape`) com a metatag `nomeprojeto`. Assim os dados vêm de um único lugar, o mesmo que o texto do rodapé já usa.
* **Nada da base fica na biblioteca derivada:** o endereço do banco existe só no `bibconfig.js`, que também cria o `preconnect` ao Supabase e fornece `BIBVANIA_CHAVE`, usada para nomear as chaves de `localStorage` do painel (nome do bibliotecário, última atividade) com o identificador do projeto Supabase; assim, bibliotecas publicadas na mesma origem do GitHub Pages não leem os dados umas das outras. O nome do PDF do acervo e os textos alternativos das logos usam a metatag `nomeprojeto`. Continuam apontando para a base, de propósito, a verificação de versão, o botão do modal de atualização e a atribuição e licença.

* **Dois sistemas de script por página:** cada HTML carrega `bibcore.js` como ES Module (`<script type="module">`) e um bloco UMD síncrono logo após. Funções acessadas via `onclick` devem ser expostas em `window.*` pelo módulo.
* **Transição de página:** função `window.navegarCom(url)` exibe um overlay fixo com logo (80×auto, animação de escala 0.6s), 3 bolinhas (10×10px, animação de salto 0.9s com delays escalonados de 0.3s), fundo com cor `var(--bg)`, opacity 0, pointer-events none. Ao chamar `navegarCom()`, a classe `ativo` liga opacity/pointer-events, aguarda 140ms e redireciona. No evento `pageshow` (inclui bfcache do navegador), remove a classe para fade-out 0.1s.
* **Inicialização sem flash:** scripts inline no `<head>` aplicam o tema e o tamanho da fonte e leem o `VERSION.json` de forma síncrona antes do CSS externo carregar, evitando o flash claro→escuro e deixando `window.BIBVANIA_VERSAO` disponível de imediato; a interface só é revelada depois de pronta, para evitar o flash de layout sem estilo.
* **Trigger automático:** o PostgreSQL recalcula `quantidade_disponivel` após mudanças em `emprestimos` ou `reservas`: `quantidade_total − empréstimos ativos − reservas pendentes` (mínimo zero). Nunca atualizar esse campo manualmente; a reserva concluída troca a alocação pendente por um empréstimo sem contagem dupla.
* **Reservas públicas:** o papel `anon` não recebe acesso direto às tabelas `pessoas`, `emprestimos` ou `reservas`. O catálogo pode chamar somente `bv_buscar_pessoas_reserva` (trecho do nome, perfil selecionado e campos cadastrais mínimos) e `bv_criar_reserva`; políticas administrativas e leitura de fila exigem `authenticated`.
* **Conclusão atômica de reserva:** `bv_concluir_reserva` valida os limites de empréstimo, atualiza a reserva e cria o empréstimo dentro da mesma transação. O exemplar já foi descontado quando a reserva foi criada; ao converter, essa alocação passa de reserva para empréstimo sem ser descontada duas vezes. Se uma validação falhar, a reserva permanece pendente.
* **Limites de circulação:** alunos e visitantes podem ter uma reserva pendente; ambos precisam devolver empréstimo ativo antes de concluir reserva. No fluxo manual, alunos têm limite de um empréstimo ativo, enquanto visitantes e funcionários podem ter vários. Funcionários não têm limite numérico de reservas, respeitado o estoque.
* **Paginação automática:** `DB._fetchAll()` contorna o limite nativo de 1000 registros por requisição do Supabase, paginando automaticamente em lotes para exibir o acervo completo.
* **Realtime:** `bibcore.js` mantém um canal por tabela (`livros`, `emprestimos`, `pessoas`, `reservas`) e reutiliza o mesmo canal para todos os callbacks registrados. O catálogo público só assina `livros`; o painel assina as quatro tabelas.
* **PWA e cache:** o `service-worker.js` pré-carrega a casca estática e usa rede primeiro; além disso, grava no cache respostas bem-sucedidas a requisições GET da mesma origem. Não intercepta o Supabase nem outras origens. O cache é versionado e separado por escopo (`bibvania-shell-v0.7@<escopo do site>`); sua versão segue sempre a versão do projeto-base menos 2,4.
* **Padronização de texto:** `padronizarObjeto()` (em `bibcore.js`) grava os campos de texto em maiúsculas, exceto os de URL e texto alternativo.

#### Convenções e padrões internos

* **Autenticação do painel:** `admin.html` usa `DB.getSession()` em `init()` e `DB.onAuthStateChange` para reagir a logout e expiração, mostrando o formulário de login em overlay (ver "Autenticação do painel"). O `supabase-js` renova o token sozinho (`autoRefreshToken`). `DB.checkAuth()` (devolve a sessão, tentando renovar o token, ou `null`, sem redirecionar) e `DB.redirectIfLoggedIn()` (leva ao `admin.html` quando há sessão) continuam em `bibcore.js` por compatibilidade com o modelo antigo de várias páginas, mas o painel não as usa.
* **Sistema de abas:** a aba ativa do painel é salva em `sessionStorage` (chave `bibvania_tab`; padrão `tab-cadastro`). Um script inline no `<head>` restaura a aba correta antes do `DOMContentLoaded`, evitando o "flash" da aba padrão. As abas são Cadastro de Livro (`tab-cadastro`), Acervo (`tab-registro`), Empréstimo (`tab-emprestimo`), Reservas (`tab-reservas`), Devoluções (`tab-devolucoes`), Cadastrar Pessoas (`tab-pessoas`), Lista de Pessoas (`tab-listapessoas`) e Relatório (`tab-relatorio`).
* **Chaves de armazenamento do navegador:** em `localStorage`, `theme` (claro/escuro), `fontSize`, `bibvania_<projeto>_admin_nome`, `bibvania_<projeto>_admin_semnome`, `bibvania_<projeto>_ultima_atividade` (nomes montados por `BIBVANIA_CHAVE`, com o identificador do projeto Supabase) e o token do Supabase Auth, que o `supabase-js` grava sozinho (`sb-<projeto>-auth-token`). Em `sessionStorage`, ficam `bibvania_tab`, `bibvania_signout_intencional` e os filtros de relatório `rel_v2_*`, que duram a sessão atual da aba. Novas chaves não devem ser criadas sem necessidade.
* **Navegação com transição:** links e botões que mudam de página usam `window.navegarCom(url)` em vez de `window.location`. A função exibe uma sobreposição com a logo animada durante a troca de página, dando uma sensação de SPA. Não deve ser usada para navegações internas (abas) — apenas para mudanças de página.
* **Carregamento de imagens com nova tentativa:** o logo do cabeçalho usa um `onerror` inline que tenta recarregar a imagem até 3 vezes (acrescentando `?r=N` ao endereço); se todas falharem, o elemento é ocultado em vez de deixar um ícone quebrado.
* **Upload de capas e verso:** o `admin.html` redimensiona a imagem e a envia ao ImgBB por `_iaUploadImgbb()` (pela Edge Function `upload-imagem`, que guarda a chave no Secret `IMGBB_API_KEY`), gravando a URL em `imagem_url` (capa) ou `verso_url` (verso). Remover a capa ou o verso apenas limpa a URL no banco; o arquivo não é apagado no ImgBB.
* **Badges de categorias:** `spanCategoria(categoria)` (em `bibcore.js`) retorna um `<span>` em negrito com a cor da classificação indicativa, definida no mapa interno `_CAT_CORES` (LIVRE verde, 6 anos verde-azulado, 10 anos azul, 12 anos amarelo, 14 anos laranja, 16 anos vermelho e 18 anos preto). Categorias antigas do banco são exibidas pela faixa equivalente, um valor desconhecido aparece sem cor, e o texto passa por `escapeHtml()`.
* **Acessibilidade (WCAG 2.1):** listas que mudam dinamicamente (ex: livros adicionados/removidos no catálogo) usam `aria-live="polite"` para anunciar a mudança a leitores de tela. Modais e o lightbox de capas implementam *focus trap* (o foco do teclado não escapa do modal) e podem ser fechados com `Esc`. Busca por voz via `iniciarBuscaVoz(inputEl, onResult)` (Web Speech API, idioma `pt-BR`; o botão só aparece em navegadores com suporte).

#### Backup do Supabase

Para criar uma cópia lógica do banco, use `supabase db dump` seguindo o [guia oficial do Supabase CLI](https://supabase.com/docs/reference/cli/supabase-db-dump). Guarde o dump fora do repositório público e em outro local seguro. Exportações em CSV pelo Table Editor podem ajudar com tabelas específicas, mas não substituem um backup lógico completo.

O Supabase informa que backups diários gerenciados são oferecidos nos planos Pro, Team e Enterprise. Para projetos Free, a documentação recomenda exportar regularmente com a CLI e manter cópias externas. A área **Database → Backups** permite restaurar conforme o plano e a configuração do projeto; backups físicos não ficam necessariamente disponíveis para download. O backup do banco também não inclui os arquivos de imagem armazenados separadamente no ImgBB. Consulte a [documentação oficial de backups](https://supabase.com/docs/guides/platform/backups) para ver retenção, restauração e condições vigentes.

**Importante:** projetos Free com pouca atividade de banco ao longo de uma semana podem ser pausados. O Supabase diz que algumas consultas de usuários por dia costumam bastar, mas o limiar não é garantido; um monitor Checkly pode gerar atividade, mas não substitui backups nem garante que o projeto não será pausado. Um projeto pausado pode ser retomado pelo painel por até um ano após a pausa; confirme o procedimento e a janela atuais na [documentação de pausa](https://supabase.com/docs/guides/platform/free-project-pausing).
#### Configuração e segurança

A configuração pública do Supabase fica em `bibconfig.js` e usa exclusivamente a
chave `sb_publishable_`. Nenhuma chave `anon`, `secret` ou `service_role` deve ser colocada
no site. A proteção dos dados depende das políticas RLS e das RPCs do
`supabase_setup.sql`.

Medidas adicionais de segurança do painel e do catálogo:

- O `supabase-js` é carregado com **versão fixa** (`@2.89.0`) no `admin.html` e no `bibcore.js`; ao atualizar, troque nos dois lugares.
- O ISBN do verso é lido das barras no navegador (`BarcodeDetector` nativo; se não existir, `@zxing/library@0.21.3` do jsDelivr, versão fixa, em `admin.html`). A leitura vale para a capa e para o verso, e a IA só entra como alternativa quando as barras não puderem ser lidas. O botão da Vân-IA funciona com a capa, com o verso ou com os dois. Na edição, com imagens já salvas, o navegador tenta baixar a imagem do ImgBB (`https://*.ibb.co` no `connect-src`) para ler as barras; se não conseguir, vale só a leitura da IA.
- A sessão do bibliotecário fica em `localStorage` e continua ativa ao fechar a aba ou o navegador. Ela é encerrada após **8 dias sem nenhuma interação** com o painel (`INATIVIDADE_LIMITE_MS` no `admin.html`) ou ao tocar em SAIR. Como todos os sites de `usuario.github.io` compartilham a mesma origem, não publique outros sites nela.
- As chaves ImgBB e Mistral AI ficam nos Secrets das Edge Functions `upload-imagem` e `vania-ia` e nunca chegam ao navegador; cada função confere o login do bibliotecário no Supabase Auth antes de usar a chave.
- Páginas abertas dentro de um `iframe` ficam ocultas (proteção contra clickjacking; `frame-ancestors` não funciona em `<meta>`).

#### Segurança das chaves de API

O BibVânia Online utiliza chaves de API para integrar serviços externos (ImgBB e Mistral AI). Siga estas boas práticas:

* No Supabase Auth, desative o cadastro público de novos usuários; crie os administradores manualmente em Authentication → Users (quem está logado já é administrador).
* Nunca adicione chaves de API diretamente em arquivos HTML ou JS que vão para o repositório público. As chaves do ImgBB e da Mistral AI ficam apenas nos Secrets das Edge Functions do Supabase (`IMGBB_API_KEY` e `MISTRAL_API_KEY`).
* Rotacione as chaves periodicamente ou sempre que suspeitar de uso indevido.
* No painel de cada serviço, configure limites de uso (rate limits) para evitar cobranças inesperadas.

#### Cuidados com a conta GitHub

* Use uma senha forte e ative a autenticação em dois fatores (2FA) na sua conta GitHub.
* Mantenha um e-mail de recuperação atualizado.
* Evite tornar o repositório privado sem antes verificar se o GitHub Pages ainda funcionará (Pages gratuito exige repositório público ou plano pago).
* Faça um clone local do repositório periodicamente para ter uma cópia de segurança dos arquivos HTML, JS e CSS.
* Verifique periodicamente em **Settings → Pages** se o site continua ativo — o status deve aparecer como *Your site is live*.

#### Monitoramento

* Verifique mensalmente o uso do banco de dados no painel do Supabase. No plano gratuito (valores de 2026; confirme em supabase.com/pricing), cada projeto tem 500 MB de banco de dados, 5 GB de tráfego e 50.000 usuários ativos por mês, sem limite fixo de requisições à API.
* Ative notificações por e-mail no Supabase para ser avisado sobre pausas automáticas do projeto.
* Antes de aplicar qualquer alteração em produção, teste em uma instância separada do BibVânia Online (criada com o bibmaker.claude usando outro projeto Supabase). Nunca execute scripts SQL em produção sem antes validar em ambiente de teste.

</details>
