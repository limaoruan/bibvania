# BibVânia Online v3.0

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
- **Upload de capas:** [ImgBB](https://imgbb.com) (chave gratuita)
- **PDF do acervo e leitura de código de barras:** [pdfmake](https://pdfmake.github.io/docs/) e [@zxing/library](https://github.com/zxing-js/library) (jsDelivr, versões fixas); o `BarcodeDetector` nativo do navegador é usado quando existe
- **Análise de capa com IA (botão Vânia):** [Mistral AI](https://console.mistral.ai) · Ministral 3 14B (`ministral-14b-2512`; há plano gratuito)
- **Assistência com IA no desenvolvimento:** Claude (Anthropic)
- **Hospedagem sugerida:** GitHub Pages (gratuito)

---

## Funcionalidades

### Acervo público (`index.html`)
- Busca por título, ISBN e autor
- Capas dos livros com lightbox
- Indicação visual de disponibilidade em tempo real
- Solicitação de reserva pública por pessoa cadastrada, com confirmação posterior do bibliotecário
- Acessibilidade: busca por voz, modo escuro, ajuste do tamanho da fonte
- Download do acervo completo em PDF
- Instalável como aplicativo (PWA)

### Painel administrativo (`admin.html`)
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

> **Regra obrigatória de manutenção:** toda alteração no projeto — incluindo correções, adições, remoções, mudanças de comportamento, ajustes de interface, migrações ou correções no Supabase — deve ser registrada no [`CHANGELOG.md`](CHANGELOG.md). Essa regra vale para qualquer pessoa ou IA que modificar a biblioteca. Cada biblioteca derivada gerada pelo BibMaker recebe o seu próprio `CHANGELOG.md`, que começa só com a entrada `#1` (versão inicial do projeto), não copia nenhuma entrada deste changelog e registra as alterações da própria biblioteca, com numeração própria.

```
BibVânia Online/
├── index.html               — Acervo público
├── admin.html               — Painel do bibliotecário (login em overlay)
├── bibcore.js               — Banco de dados, utilitários e transições
├── bibconfig.js             — Configuração pública do Supabase (URL e chave publishable)
├── style.css                — Estilos globais
├── service-worker.js        — PWA: cache da casca do site (nunca intercepta o Supabase)
├── manifest.webmanifest     — Manifesto da aplicação web
├── bibmaker.claude          — Construtor de bibliotecas (uso com o Claude)
├── bibconfig.claude         — Template em branco de configuração salva (ver bibmaker.claude)
├── supabase_setup.sql       — Configuração inicial do banco
├── setup_private.sql        — Chaves de API (ImgBB, Mistral AI) — NÃO subir ao GitHub
├── VERSION.json             — Versão do sistema
├── bibhash.sig              — Assinatura SHA-256 de integridade do .zip
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
├── .github/workflows/       — Workflow periódico para manter o Supabase ativo
├── .gitignore               — Impede o envio de setup_private.sql e bibconfig.claude
└── .nojekyll                — Desativa o Jekyll no GitHub Pages
```

📄 Descrição detalhada de cada arquivo (para desenvolvedores): veja [Para Desenvolvedores](#para-desenvolvedores), seção expansível "Arquivos do projeto".

---

## Licença

Projeto licenciado sob <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.pt-br" target="_blank" rel="license noopener noreferrer"><strong>CC-BY-SA-4.0</strong></a>. Você pode usar, copiar, modificar e distribuir livremente, desde que mantenha a atribuição ao autor original e distribua adaptações sob a mesma licença CC BY-SA 4.0: **Ruan Oliveira Lima** — <a href="https://github.com/limaoruan/bibvania" target="_blank" rel="noopener noreferrer">github.com/limaoruan/bibvania</a>.

Atribuição sugerida:

> Derivado do projeto BibVânia Online por [Ruan Oliveira Lima](https://www.instagram.com/ruanoliveiralima_/) © 2026 — <a href="https://github.com/limaoruan/bibvania" target="_blank" rel="noopener noreferrer">https://github.com/limaoruan/bibvania</a> — <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.pt-br" target="_blank" rel="license noopener noreferrer">CC-BY-SA 4.0</a>

A licença cobre o código-fonte, scripts SQL, assets visuais originais e documentação. Dependências de terceiros têm suas próprias licenças:

| Serviço / Biblioteca | Uso | Licença / Termos |
| --- | --- | --- |
| [Supabase](https://supabase.com) | Banco de dados, autenticação e realtime | [Apache 2.0](https://github.com/supabase/supabase/blob/master/LICENSE) |
| [ImgBB](https://imgbb.com) | Armazenamento de capas de livros | [Termos de uso ImgBB](https://imgbb.com/tos) |
| [Mistral AI](https://console.mistral.ai) | Análise de capa com IA (botão Vânia) | [Termos de uso Mistral AI](https://mistral.ai/terms) |
| [Claude (Anthropic)](https://www.anthropic.com) | Assistência com IA no desenvolvimento | [Política de Uso Anthropic](https://www.anthropic.com/legal/aup) |
| [Supabase JS](https://cdn.jsdelivr.net/npm/@supabase/supabase-js) | Cliente JavaScript do Supabase | [MIT](https://github.com/supabase/supabase-js/blob/master/LICENSE) |
| [Web Speech API](https://wicg.github.io/speech-api/) | Reconhecimento e síntese de voz no navegador | [W3C Community License](https://www.w3.org/community/about/agreements/cla/) |
| [pdfmake](https://github.com/bpampuch/pdfmake) | Geração do PDF do acervo no navegador (`pdfmake@0.2.9`, jsDelivr) | [MIT](https://spdx.org/licenses/MIT.html) |
| [@zxing/library](https://github.com/zxing-js/library) | Leitura do código de barras (ISBN) quando o navegador não tem `BarcodeDetector` (`@0.21.3`, jsDelivr) | [MIT](https://spdx.org/licenses/MIT.html) |
| [Mistral AI](https://mistral.ai) | Análise de capa e verso com IA (botão Vânia) | [Termos legais da Mistral AI](https://legal.mistral.ai/terms) |

---


## Como Criar uma Biblioteca

O **bibmaker.claude** gera automaticamente uma instância personalizada do BibVânia Online, pronta para publicar no GitHub Pages. Não é necessário editar nenhum arquivo manualmente — a entrevista acontece numa conversa com o Claude.

⚠️ O arquivo `setup_private.sql` gerado contém suas chaves de API. Nunca publique esse arquivo no GitHub.

1. **Baixe os arquivos originais da BibVânia Online**, abra o arquivo `bibmaker.claude` numa conversa com o Claude e digite o comando **`BibMaker`** (não diferencia maiúsculas/minúsculas) para começar.
2. **Escolha o tipo de biblioteca.** Responda se é *Escolar* ou *Comunitária*. O nome do projeto será gerado automaticamente com base nessa classificação. O BibMaker também permite informar, opcionalmente, uma descrição personalizada para compartilhamento/Open Graph; se ficar vazia, usa a descrição padrão do BibMaker.
3. **Informe os dados do projeto.** Nome da biblioteca, autor, site, versão e licença. Esses dados aparecem no rodapé e nas metatags de todas as páginas geradas.
4. **Informe as chaves de API.** Supabase URL e Publishable Key, ImgBB API (upload de capas) e Mistral AI API (análise de capa com IA, botão Vânia) — todas obrigatórias. O ImgBB e a Mistral AI oferecem plano gratuito. Veja abaixo como criar conta e obter cada chave.
5. **Informe as imagens (obrigatório).** Logo, favicon e imagem Open Graph são obrigatórios; o BibMaker não usa imagens padrão e só avança quando as três forem fornecidas (ou geradas por ele a seu pedido).
6. **Informe o repositório GitHub.** URL do repositório e da página GitHub Pages onde o sistema será publicado.
7. **Aguarde a aplicação das edições.** O Claude confirma um resumo com você e então edita os arquivos-base diretamente, gerando também `setup_private.sql` e `bibconfig.claude` (configuração salva, para facilitar futuras atualizações) com suas chaves.
8. **Configure o Supabase correto.** Abra o projeto Supabase cuja URL foi informada ao BibMaker. No *SQL Editor → New query*, cole e execute primeiro o conteúdo completo de `supabase_setup.sql` e confirme que terminou sem erros. Depois, execute o `setup_private.sql` gerado para gravar as chaves privadas do ImgBB e da Mistral AI. Não publique nem compartilhe esse arquivo.
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

11. **Publique no GitHub Pages.** Crie ou use um repositório público e envie para a raiz do branch `main` o conteúdo da pasta do projeto dentro do `.zip` (incluindo `index.html`, `admin.html`, `bibconfig.js` e `bibcore.js`, mas não o próprio arquivo `.zip`). Não envie `setup_private.sql` nem `bibconfig.claude`: eles ficam fora da pasta pública por conterem chaves privadas. No GitHub, abra *Settings → Pages → Build and deployment*, selecione **Deploy from a branch**, branch `main` e pasta `/ (root)`, e salve. Aguarde a publicação e teste a URL: primeiro o catálogo e depois o login em `admin.html`.

> **Proteção adicional do Auth (plano Pro ou superior):** nas configurações do Auth do Supabase, procure a opção **Prevent the use of leaked passwords** (também descrita como *Leaked password protection*) e ative-a. Dependendo da versão do painel, ela pode aparecer em *Authentication → Settings* ou dentro das configurações de senha. Esse recurso não está disponível no plano gratuito; nesse caso, o alerta correspondente do Security Advisor pode permanecer. A opção é administrada pelo painel do Auth e não pelo SQL da aplicação.

> 🚨 **IMPORTANTE — nunca perca o `bibconfig.claude`.** Esse arquivo é a única cópia das suas configurações e chaves de API — não fica salvo em nenhum outro lugar (nem no GitHub, de propósito, para não expor as chaves). Se você o perder, a única forma de atualizar a biblioteca no futuro é refazendo a entrevista completa do zero, com todos os dados e chaves em mãos de novo — e algumas chaves não são reexibidas pelo provedor depois de criadas, só é possível gerar uma nova. Guarde-o (junto com o `setup_private.sql`) em um lugar seguro fora do GitHub — um gerenciador de senhas, um drive privado, qualquer local com backup que não seja público.

### Como obter cada chave de API

#### 🗄️ Supabase (obrigatório)

1. Acesse [supabase.com](https://supabase.com) e clique em **Start your project**.
2. Crie uma conta gratuita com e-mail ou pelo GitHub.
3. Clique em **New Project**, dê um nome ao projeto, defina uma senha forte e escolha a região mais próxima (ex: *South America — São Paulo*). Aguarde a criação — isso pode levar alguns minutos. As tabelas criadas pelo BibVânia Online já têm RLS (Row Level Security) ativado por padrão via `supabase_setup.sql`; não desative essa opção no painel.
4. No painel do projeto, vá em **Project Settings → API**.
5. Copie a **Project URL** — esse é o seu *Supabase URL*.
6. Copie a chave **publishable** (`sb_publishable_...`). Essa é a única chave do Supabase usada pelo frontend.

#### 🖼️ ImgBB (gratuito)

1. Acesse [imgbb.com](https://imgbb.com) e crie uma conta gratuita.
2. Vá em **About → API** ou acesse [api.imgbb.com](https://api.imgbb.com) e copie a chave exibida.

#### 🤖 Mistral AI (plano gratuito — botão Vânia)

1. Acesse [console.mistral.ai](https://console.mistral.ai) e crie uma conta.
2. Ative o plano gratuito, senão a chave não funciona (aparece "nenhum plano ativo"): abra [admin.mistral.ai/organization/billing](https://admin.mistral.ai/organization/billing) (no celular, ative "Site para computador" se a tela ficar espremida), escolha **Experiment for free**, aceite os termos e toque em **Subscribe**. Pode pedir verificação de telefone; não pede cartão.
3. Vá em [API Keys](https://console.mistral.ai/api-keys), com o **Default Workspace** selecionado, clique em **Create new key** e copie a chave exibida (letras e números, sem prefixo fixo).
4. O plano gratuito tem limites de uso e não libera os modelos maiores (erro 403 "not available in your subscription tier"); o botão Vânia usa o `ministral-14b-2512`, liberado nele. Confira os termos do plano em [mistral.ai/terms](https://mistral.ai/terms).

#### 🐙 GitHub (obrigatório para publicação)

1. Acesse [github.com](https://github.com) e crie uma conta gratuita.
2. Clique em **New repository**, dê um nome, marque como **Public** e clique em **Create repository**.
3. Para ativar o GitHub Pages: vá em **Settings → Pages → Source**, selecione o branch `main` e a pasta `/ (root)` e clique em **Save**.

---

### Mantendo o Supabase sempre ativo

O repositório inclui um único workflow em `.github/workflows/manter-supabase-ativo.yml`. Ele faz uma consulta pública leve ao Supabase duas vezes por semana (segundas e quintas, 00:00 no horário de Brasília), usando a URL e a chave `publishable` já públicas no `bibconfig.js`. Não são usadas chaves secretas.

Depois de publicar o repositório, o workflow pode ser conferido em **Actions → Manter Supabase ativo**. Também é possível acioná-lo manualmente com **Run workflow**.

O workflow substitui o uso do cron-job.org para este projeto. O cron-job.org fica apenas como alternativa opcional caso o GitHub Actions seja desativado, falhe ou o repositório passe muito tempo sem atividade. O agendamento do GitHub pode sofrer atraso e pode ser desativado pelo GitHub após um longo período sem atividade no repositório; por isso, verifique ocasionalmente a aba **Actions**.

---

## Como Atualizar uma Biblioteca


💡 Ao abrir o admin.html da sua biblioteca, um banner "⚠️ Atualização disponível" aparece automaticamente quando há uma versão mais nova do BibVânia Online — o botão leva ao repositório oficial.

1. **Baixe os arquivos-base da nova versão da BibVânia Online** a partir do repositório oficial.
2. **Abra o `bibmaker.claude` numa conversa com o Claude**, junto com o `bibconfig.claude` da sua biblioteca (gerado na criação, guardado fora do GitHub) — suas configurações são lidas automaticamente, sem precisar reenviar os arquivos da biblioteca inteira.
3. **Para cada campo já preenchido, confirme se quer manter ou trocar.** O Claude mostra o valor salvo de cada dado (nome, autor, chaves de API, imagens, licença, repositório) e pergunta se continua o mesmo ou se você quer alterá-lo; campos que ainda estiverem vazios no seu `bibconfig.claude` são perguntados normalmente.
4. **Aguarde a aplicação das edições.** O Claude aplica os arquivos-base atualizados mantendo suas configurações e, se a nova versão exigir scripts SQL adicionais, indica quais executar no Supabase. O `bibconfig.claude` é regenerado com os dados mais atuais.
5. **Publique os arquivos atualizados.** Substitua os arquivos antigos no repositório GitHub pelos novos (exceto `setup_private.sql` e `bibconfig.claude`).

---

## Como Usar o Sistema

### Para Leitores

O catálogo público (`index.html`) não exige cadastro nem login. Qualquer visitante pode pesquisar e consultar o acervo diretamente pelo navegador.

* Use o **menu de atalhos** (canto superior esquerdo, ☰) para navegar para a Área do Bibliotecário (se autenticado) ou o repositório do projeto.
* Clique em **↗ VER ACERVO COMPLETO** para abrir a visualização em tabela de todos os livros (abre em nova aba).

#### Pesquisando livros

* Use a barra de busca para pesquisar por **título**, **autor** ou **ISBN**.
* Use o filtro de classificação indicativa para restringir a busca a um tipo de livro específico.
* Clique em **✕ limpar busca** para resetar todos os filtros.

#### Busca por voz

* Clique no ícone de microfone na barra de busca para ativar a busca por voz.
* Fale o termo desejado — o sistema preenche a busca automaticamente.
* Funciona em navegadores compatíveis com a Web Speech API (Chrome, Edge).

#### Visualizando um livro

* Clique na capa de um livro para abrir o lightbox com a imagem em tamanho maior.
* A disponibilidade do livro é exibida em tempo real no card.
* Se o livro tiver um arquivo vinculado, um botão de download ficará disponível no card.
* Quando houver exemplar disponível, clique em **Reservar**. Primeiro, leia as regras de reserva e empréstimo por perfil; depois, continue ao formulário. O formulário mostra a capa e os metadados públicos do livro (volume, edição, autor, ISBN, classificação e estoque). Digite ao menos uma letra para iniciar a busca; ela encontra trechos do nome e prioriza nomes que começam pelo termo digitado. Sem marcar opções de perfil, a busca é por alunos; marque **Funcionário** e/ou **Visitante** para pesquisar esses cadastros. A solicitação fica pendente até a equipe da biblioteca agir; enquanto isso, um exemplar é descontado da quantidade disponível.
* **Alunos e visitantes** podem manter uma reserva pendente por vez. Para reservar outro livro, precisam confirmar a substituição da reserva atual. Pela regra de reservas, ambos só podem concluir uma reserva em empréstimo depois de devolver eventual empréstimo ativo (mais restritivo que o fluxo manual de visitantes).
* **Funcionários** não têm limite numérico de reservas pendentes nem de empréstimos ativos, desde que haja exemplares disponíveis para reservar.
* Ao cancelar, o exemplar volta à quantidade disponível; ao confirmar, a reserva vira empréstimo sem descontar o mesmo exemplar duas vezes. Outros exemplares livres podem ser emprestados normalmente enquanto a reserva aguarda.
* O sistema não envia notificações automáticas — o leitor deve acompanhar pessoalmente ou ser informado pelo bibliotecário.

#### Acessibilidade

* O modo escuro pode ser ativado pelo botão 🌙 na barra de acessibilidade.

#### Dica de uso

* Use a busca e os filtros do catálogo para encontrar o livro desejado e verifique sua disponibilidade antes de se deslocar até a biblioteca — o índice mostra em tempo real quantos exemplares estão disponíveis.
* Use navegadores modernos e atualizados — Chrome e Edge são os mais compatíveis com todas as funcionalidades do BibVânia Online.

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
3. Clique em **Registrar Devolução**. Um modal pede a data da devolução (preenchida com a data de hoje por padrão, mas editável); confirme para concluir ou cancele para voltar sem alterar nada. A quantidade disponível é atualizada automaticamente.
4. Para renovar o prazo, clique em **Renovar** e informe quantos dias adicionais devem ser somados ao prazo atual. Na aba Devoluções, empréstimos sem data definida não podem ser renovados (no card do Acervo o botão fica habilitado e usa a data do empréstimo como base).


2. Clique em **Confirmar** para converter em empréstimo — abre um modal com os dados do livro e do leitor já preenchidos, onde você informa os dias de empréstimo (padrão 7) e a data de início (ou marca "SEM DATA DEFINIDA"); o modal mostra uma prévia da data prevista de devolução antes de confirmar.



* **Professores e funcionários:** seguem o mesmo fluxo dos alunos. Devem ter cadastro como *funcionário* no sistema.
* Ao cancelar, o livro volta a aparecer disponível para outros leitores.


* Não há notificação automática ao leitor — a comunicação é feita pelo bibliotecário (pessoalmente, por mensagem ou outro canal da escola).

#### Gerando relatórios

1. Na aba **Relatório**, escolha o tipo de período: **Anual** (intervalo de anos) ou **Mensal** (intervalo de meses no formato ano-mês). A última escolha é lembrada entre visitas.
4. Cada seção e subtópico pode ser expandido/recolhido clicando em seu título; abrir uma seção recolhe as demais no mesmo nível, mantendo o relatório organizado.

* O painel atualiza as informações em tempo real via Supabase Realtime — não é necessário recarregar a página.
* Ao cadastrar um livro com IA, revise os campos antes de salvar — a IA pode ocasionalmente errar a classificação indicativa.
* Para cadastrar múltiplos exemplares, aumente o campo **Quantidade total** ao invés de cadastrar o livro mais de uma vez.
* Registre devoluções imediatamente ao receber o livro físico — o sistema atualiza a disponibilidade em tempo real para todos os leitores no catálogo público.
* Para excluir um livro, ele precisa estar sem empréstimos ativos.

### Para Desenvolvedores

<details>
<summary><strong>📁 Arquivos do projeto — referência técnica completa (clique para expandir)</strong></summary>

Esta seção é voltada para quem deseja entender, modificar ou manter o código-fonte do BibVânia Online. O projeto é 100% frontend (HTML + CSS + JavaScript vanilla) com backend via Supabase (PostgreSQL + Realtime + Auth); as capas ficam no ImgBB e a análise de capa por IA usa a Mistral AI.

#### Arquivos do projeto

##### `index.html`

- Catálogo público, sem autenticação: qualquer visitante pesquisa o acervo, filtra por classificação indicativa, vê as capas em lightbox e pode solicitar uma reserva.
- *Inicialização:* scripts inline no `<head>` aplicam o tema (`theme`) e o tamanho da fonte (`fontSize`) antes do CSS externo carregar e leem o `VERSION.json` de forma síncrona. `bibconfig.js` define `window.BIBVANIA_CONFIG`, e `bibcore.js` é carregado como ES Module (`import DB`) e como script UMD no final do `<body>`. Todo o estado da lista (livros, filtros, paginação) fica em variáveis locais do bloco `<script type="module">`; funções chamadas por `onclick` são expostas em `window.*`. A página tem metatags Open Graph, JSON-LD do tipo `Library`, uma CSP em `<meta>` e um bloco anti-iframe (`#bv-antiframe`) que oculta a página quando ela é aberta dentro de um `iframe`; no evento `load`, registra o `service-worker.js`.
- *Busca e filtro:* o campo `#buscaLivros` pesquisa por título, ISBN, autor e palavras-chave (sintaxe `#tag`), sem diferenciar acentos nem maiúsculas (`normalizar`), com botão para limpar a busca e busca por voz (`iniciarBuscaVoz`, de `bibcore.js`). O filtro `#filtroCategoriaPublico` é preenchido por `_popularCategoriasFiltro()` com as classificações indicativas (LIVRE a 18 anos), e `normalizarCategoriaAcervo()` converte categorias antigas do banco para a faixa equivalente.
- *Lista e capas:* `carregarLivros()` busca os livros com `DB.getLivros()` e `renderAcervo()` os mostra em carrossel paginado (`_irParaPagina`, `_criarNavCarrossel` e `_bindSwipe` para gestos de toque), com `aria-live="polite"` para anunciar as mudanças. As capas vêm de `imagem_url` (`_resolverCapas`, `_injetarCapas`) com pré-carregamento das páginas vizinhas (`_prefetchCapasVizinhas`); livro sem capa mostra o rótulo "SEM CAPA" sobre o logo (`_setLabelSemCapa`). Clicar em uma capa abre o lightbox `#capLightbox` (focus trap; `Esc` e clique no fundo fecham, via `fecharLightbox()`).
- *Disponibilidade em tempo real:* cada card mostra a disponibilidade a partir de `quantidade_disponivel`. A atualização vem de `DB.onLivrosChange` (Realtime) e de um intervalo de 60 s como alternativa; os dois chamam `_buscarEAtualizar(false)`, que preserva as capas já resolvidas em memória. A página não assina `onEmprestimosChange`: o trigger do banco já reflete os empréstimos em `livros.quantidade_disponivel`.
- *Reserva pública:* `abrirReservaPublica()` abre o modal de regras (`#reservaRegrasModal`) e, ao continuar, o formulário (`#reservaPublicaModal`). A pessoa é buscada pela RPC `bv_buscar_pessoas_reserva` (`DB.buscarPessoasParaReserva`), com os filtros FUNCIONÁRIO e VISITANTE exclusivos entre si (`_tiposBuscaReserva`), e a reserva é criada por `bv_criar_reserva` (`DB.criarReservaPublica`); o catálogo não acessa diretamente as tabelas `pessoas` e `reservas`. Alunos e visitantes têm uma reserva pendente por vez, e o sistema pede confirmação para substituir a anterior.
- *Baixar acervo completo (PDF):* o botão "📥 BAIXAR ACERVO COMPLETO" chama `baixarAcervoPdf()`, que carrega `pdfmake@0.2.9` e `vfs_fonts` do jsDelivr por tags `<script>` (versão fixa; a CSP não permite `unsafe-eval` nem requisições XHR/fetch a CDNs), mostra o progresso em `#downloadOverlay` e monta o documento em blocos (`_montarLinhasChunks`).
- *Acessibilidade:* skip link (WCAG 2.4.1), `role` e `aria-label` nos controles, botões de modo escuro (`toggleDarkMode()`) e de tamanho da fonte na barra de acessibilidade, e o menu `#menuAtalhos`, que oferece o atalho `irParaAdmin()` para o painel.

##### `admin.html`

- Área do Bibliotecário completo. Acesso restrito: sem sessão ativa, exibe o formulário de login em overlay dentro da própria página (não existe `login.html`).
- *Barra de acessibilidade — item exclusivo do admin:* botão "Verificar Versão" no menu de atalhos compara o `VERSION.json` local com o remoto (`raw.githubusercontent.com` do BibVânia Online) via comparação semver; se desatualizado, exibe o banner "⚠️ Atualização disponível" com botão que abre o repositório da BibVânia Online em nova aba; se já atualizado, mostra "✅ ATUALIZADO"; sem conexão, "📡 SEM CONEXÃO" (ambos clicáveis para nova tentativa).
- *Modal de perfil do bibliotecário:* acessível pelo botão "OI, [NOME]!" no menu de atalhos — o nome é lido do cache `bibvania_admin_nome` no `localStorage` antes do módulo carregar (evita flash mostrando "Sair" por engano); exibe foto de perfil (círculo com inicial como fallback) com upload/exclusão via `processarFotoPerfil()`/`excluirFotoPerfil()`/`abrirFotoPerfil()` (aceita JPG/PNG/WebP/HEIC/HEIF), e-mail, nome e botão Sair. *Formatos aceitos no campo "URL do Livro"* (cadastro manual e edição): `.pdf`, `.epub`, `.epub3`, `.mp3`, `.m4b`, `.cbz` — além de PDFs, o acervo também pode vincular audiolivros e quadrinhos digitais.
- *Aba Cadastro — pesquisa e edição de livro (`window._cadEdit`, `window._cadSairEdicao`, `window._cadLabelBtn`):* o campo `#cadBuscaLivro` (acima das capas) busca no cache de `DB.getLivros()` (renovado a cada 30s) por título, autor, ISBN ou ID, sem acento e sem diferenciar maiúsculas; as sugestões são montadas via DOM (`textContent`), sem `innerHTML` com dados do banco. Ao selecionar, o formulário é preenchido (incluindo Volume, Edição, quantidade total, descrição da capa, capa e verso) e `window._cadEdit.id` guarda o ID em edição; o botão de envio vira "EDITAR LIVRO" e o título do card vira "EDITAR LIVRO". No submit, se houver ID, salva com `DB.atualizarLivro` (recalcula `quantidade_disponivel`), recusa quantidade total menor que os empréstimos ativos, preserva capa/verso existentes quando não há novo envio e limpa no banco só o que foi excluído com "EXCLUIR CAPA/VERSO". O botão da IA (Vânia) só habilita após escolher uma nova capa. `window._cadEditarLivro(id)` (chamada pelo botão "✏️ EDITAR" dos cards do ACERVO, nos dois renderizadores) busca o livro atualizado com `DB.getLivroPorId`, troca para a aba CADASTRO (`switchTab`) e chama a mesma função interna `selecionar()` usada pela pesquisa, deixando o livro em modo edição.
- *Aba Cadastrar Pessoas:* checkbox "Funcionário" oculta os campos de nível/ano/turma; "Nível de Ensino" oferece Ensino Fundamental (Ano 1–9 + Turma de uma letra), Ensino Médio ou EJA (sub-nível Fundamental/Médio + número da Sala); checkbox "Pessoa com Deficiência (PcD)" disponível em qualquer cadastro.
- *Início do módulo ES:* `_popularCatSelects()` preenche automaticamente os `<select>` de categoria (`categoria`, `editCategoria`, `iaCampoCategoria`, `iaEditCategoria`) a partir de `DB.CATEGORIAS` (ou lista fixa de fallback); tamanho de fonte ajustável em 5 níveis (10/12/14/16/18px) persistido em `localStorage` (nível 18 antigo é normalizado para 16).
- *Aba Acervo — botões de ação do card:* cada card do acervo admin tem "✏️ EDITAR" (abre o livro na aba CADASTRO em modo edição via `window._cadEditarLivro(id)`) e "🗑️ EXCLUIR" (`window.delLivro`).
- *Aba Acervo — empréstimos ativos por livro:* cada card do acervo tem uma seção colapsável "EMPRÉSTIMOS" listando os empréstimos ativos daquele livro, cada um com 4 ações: "DEVOLVER" (pede a data de devolução e chama `devolver()`), "EDITAR" (abre `modalEditEmp`), "RENOVAR" (abre `modalRenovarEmp`) e "EXCLUIR" (`delEmp()` remove o registro sem alterar a quantidade disponível).
- *Modal Editar Empréstimo (`modalEditEmp`):* permite trocar a pessoa do empréstimo (busca com sugestões filtradas por aluno/funcionário, preenchendo automaticamente sexo/ano/turma), ajustar "DIAS DE EMPRÉSTIMO" e a data, ou marcar "SEM DATA DEFINIDA" — a data prevista de devolução é recalculada (data base + dias); o livro do empréstimo é somente leitura, com aviso de que para trocá-lo é preciso excluir e criar um novo empréstimo.
- *Renovar empréstimo (`modalRenovarEmp`):* pede apenas "DIAS ADICIONAIS" — soma esses dias à data prevista de devolução atual (ou à data do empréstimo, se ainda sem prazo definido) e acumula em `dias_emprestimo`; no card do Acervo o botão Renovar fica sempre habilitado, mas na aba Devoluções é desabilitado para empréstimos "sem data definida".
- *Detecção de livro parecido no cadastro manual:* antes de enviar imagens e inserir um livro novo (não na edição), `_confirmarLivroParecido()` consulta o acervo e considera parecido o livro que tiver o **mesmo título e autor** (comparação sem acentos, caixa ou espaços extras) **ou o mesmo ISBN** (só dígitos e X; ignorado se o ISBN não foi informado). Em caso positivo, abre `modalLivroParecido` comparando "LIVRO QUE SERÁ CADASTRADO" e "LIVRO JÁ EXISTENTE" (miniaturas 4:5 iguais às do acervo, com a frase do motivo: mesmo título e autor, mesmo ISBN ou ambos) e três opções — "CANCELAR", "NOVO" (cadastra com novo ID mesmo assim, útil para edições ou capas diferentes da mesma obra) e "EDITAR EXISTENTE" (abre a edição do livro já cadastrado).
- *Aba Lista de Pessoas:* agrupa por turma (Fundamental/Médio/EJA) e por "Funcionários"; cada pessoa exibe o badge de turma/PcD e um selo verde com o total de livros pegos emprestados ("📚 N LIVROS", "📚 0 LIVROS" quando nunca pegou), somando empréstimos ativos e devolvidos; o mesmo livro pego mais de uma vez conta mais de uma vez. A contagem (`_carregarContagemEmprestimos()`) busca os empréstimos em páginas de 1.000 e soma por `pessoa_id`; empréstimos antigos sem `pessoa_id` entram pelo nome, somente se o nome for único na lista. Se a contagem falhar, o selo não é exibido. Botões "EDITAR" (`modalEditPessoa`, com verificação de nome duplicado na mesma turma) e "EXCLUIR" (`excluirPessoa`).
- *Aba Devoluções — sub-abas:* grade 2×2 com 4 botões — "⚠️ Atrasado", "📅 Devolver Hoje", "✅ Em Aberto" e "🕐 Sem Data Definida" — cada um com a contagem de itens; a busca textual navega automaticamente para a primeira sub-aba com resultado. Empréstimos do mesmo leitor são agrupados em um único acordeão (todos os livros emprestados a ele) com badges de urgência por pessoa, e o botão "DEVOLUÇÕES" do menu principal recebe cor de fundo (vermelho/amarelo/verde/cinza) conforme a urgência mais crítica entre todos os empréstimos ativos.
- *Seletor de capa (cadastro manual e edição):* em dispositivos móveis abre um bottom-sheet para escolher Câmera ou Galeria; no desktop abre a galeria diretamente. A imagem é redimensionada por canvas para no máximo 1080×1350px (4:5) em JPEG 92% antes do upload ao ImgBB. Antes disso, `_validarArquivoImagem` confere só o essencial: formato JPG, PNG, WebP ou HEIC/HEIF, até 10 MB e imagem legível pelo navegador; não há exigência de dimensão mínima nem de proporção.
- *Upload ImgBB (`_iaUploadImgbb`):* aceita data URL ou base64 puro, valida tamanho mínimo (100 chars), faz POST para `api.imgbb.com/1/upload` com backoff — até 3 tentativas com espera de 1200ms e 2400ms entre elas (resolve rate limit e instabilidade de rede em dispositivos móveis).
- *Botão Vânia — análise de capa com IA (`window.abrirVanIA`):* disponível no cadastro novo e no modo EDITAR LIVRO; fica habilitado assim que há uma capa OU um verso (`window._capaBase64`/`window._versoBase64` recém-selecionados ou, na edição, os salvos `_cadEdit.livro.imagem_url`/`verso_url`, via `_vanIACapaAtual()` e `_vanIAVersoAtual()`, respeitando `capaRemovida`/`versoRemovido`). Na edição, como o formulário já vem preenchido, a análise pede confirmação e substitui título, autor, ISBN, classificação, Volume, Edição e descrição da capa (a quantidade não muda); nada é gravado até "EDITAR LIVRO". Envia a imagem (base64 ou URL) para a Mistral AI — só as imagens que existem: a capa ("Primeira imagem: CAPA do livro.") e/ou o verso ("Segunda imagem: VERSO do livro."), cada uma avisando quando a outra não foi enviada — (`https://api.mistral.ai/v1/chat/completions`, modelo da constante `VANIA_MODELO` = `ministral-14b-2512`, `response_format: json_object`) com um prompt fixo (`VANIA_PROMPT`) pedindo título, autor (pessoa, incluindo assinatura manuscrita ou logotipo com nome de pessoa, transcrita letra por letra, sem completar o nome pela memória, preferindo a grafia impressa do verso e, em dúvida real, usando a editora; se não houver, a editora impressa na capa ou no verso, mesmo pequena ou como logotipo com nome, no rodapé ou nos cantos, ou, por último, o órgão responsável; a flag `autor_identificado` só vira `false` quando nenhum dos três aparece), ISBN, categoria (uma das 7 faixas fixas: LIVRE, 6, 10, 12, 14, 16 e 18 anos; a sinopse do verso é a principal evidência para a classificação indicativa e, sem sinopse, a IA usa título, ilustrações, gênero (com apoio de um guia de gêneros por faixa etária no prompt) e demais elementos da capa e do verso) e descrição de acessibilidade da capa. Antes da resposta da IA, o navegador tenta ler o ISBN das barras da capa e do verso (`_lerIsbnDaImagem()`, com `BarcodeDetector` nativo ou `@zxing/library@0.21.3`; na edição, com imagens já salvas, `_lerIsbnDaUrl()` baixa a imagem do ImgBB em até 8 s), e a IA só vale para o ISBN quando as barras não puderem ser lidas. `_vanIAPreencherFormulario()` aplica o resultado sem sobrescrever campos já preenchidos manualmente (o ISBN só é preenchido se estiver completo, com 10 ou 13 caracteres e dígito verificador correto, validado por `_vanIAIsbnValido()`), usando `_sincAutorNaoId()` quando o autor não é identificado. Após cada chamada (sucesso ou erro), `_vanIAIniciarCooldown()` bloqueia o botão por `VANIA_COOLDOWN_S` (1s) com contagem regressiva no próprio rótulo, evitando estourar os limites de uso da Mistral AI; se a Mistral responder 429 (limite atingido), a pausa sobe para 60s. A chave é lida de `window.BibChaves.obter('mistral')` (tabela `config_privada`, chave `mistral_api_key`); sem ela, o botão exibe erro ao ser clicado.
- *Validações no envio do formulário de livro (`formLivro`):* título, autor e classificação indicativa são obrigatórios (erros "❌ INFORME O TÍTULO", "❌ INFORME O AUTOR" e "❌ SELECIONE A CLASSIFICAÇÃO INDICATIVA."); após salvar, chama `window._atualizarAcervoImediato()` para atualizar o card em memória sem aguardar reload.
- *Bloco UMD — Aba Empréstimo:* IIFE síncrono completo com elementos DOM cacheados em `_refs()`; busca de livros por título/autor/ID com debounce 250ms e cache local `_livrosCache`; busca de pessoas com fonte primária `window._pessoasCache` com filtro por tipo (aluno/funcionário via checkbox que muda label); campo de dias (1–31, padrão 7) + data + checkbox "Sem data definida" (campo vira "SEM PRAZO" desabilitado); preview de data prevista de devolução (`empAtualizarPreviewDevolucao`); ao confirmar: valida livro, pessoa e disponibilidade; para alunos, checa empréstimo ativo via `pessoa_id` (fallback nome) antes de salvar; payload inclui `pessoa_id`, `nome_aluno`, `sexo`, `ano_aluno`, `turma_aluno`, `sem_data_definida`, `dias_emprestimo`, `data_emprestimo`, `data_prevista_devolucao`; após salvar: invalida `_livrosCache` e `window._empsComLivroCache`, recarrega devoluções, acervo e relatório, reseta formulário via `_resetForm()`; expõe `window._invalidarCacheLivrosEmp()` para uso após cadastro de livro.
- *Bloco UMD — Aba Acervo (`carregarAcervoUMD` / `renderAcervoFiltrado` / `cardLivro`):* busca paralela (`Promise.all`) de livros e empréstimos ativos; popula select de categorias dinamicamente com contagem; render incremental de chunks de 20 cards por `requestAnimationFrame`; `cardLivro()` gera card com capa, ID, título, autor, ISBN, categoria, link PDF, tags, badge de disponibilidade, botões ✏️ EDITAR (`openEdit`) / 🗑️ EXCLUIR e sub-acordeão de empréstimos ativos com DEVOLVER / RENOVAR / EXCLUIR; livros atrasados rastreados em `_idsAtrasados`; `_toggleAccervo` alterna o acordeão do card.
- *Bloco UMD — Aba Devoluções (`carregarDevolucoes` / `_renderDevPaginaUMD`):* 4 sub-abas em grade 2×2 (⚠️ Atrasado / 📅 Devolver Hoje / ✅ Em Aberto / 🕐 Sem Data Definida) criadas por `_criarNavDevUMD()`; contadores nos botões refletem a busca ativa; ao buscar, navega automaticamente para a sub-aba com resultado; cada grupo é um acordeão (`_toggleDev13`) com badge de urgência por pessoa e lista de livros com DEVOLVER / EDITAR / RENOVAR / EXCLUIR; `_atualizarBolinhaDev()` colore o botão "DEVOLUÇÕES" conforme urgência mais crítica (vermelho = atrasado, amarelo = hoje, verde = em aberto, cinza = sem prazo); sincroniza página ativa entre UMD e módulo ES via `window._paginaDevAtualES` / `window._setPaginaDevUMD(idx)`; `window._renderDevUMD()` exposta para o módulo ES chamar após optimistic updates.
- *switchTab / inicialização da aba ativa:* `switchTab(e, id)` persiste a aba ativa no `sessionStorage` (`bibvania_tab`), sincroniza o `<select id="tab-select">` e dispara a inicialização específica de cada aba (`_renderAcervoOnTab`, `carregarDevolucoes`, `carregarListaPessoas`; para `tab-relatorio`, aguarda `_dbReady` e chama `_initFiltrosRel()` + `relGerar()`); ao trocar de aba, `_relLimparClock()` interrompe o relógio do relatório. A IIFE de inicialização (`_onReady`, em `DOMContentLoaded` ou imediata) repete essa lógica para restaurar a aba salva (padrão `tab-cadastro`) e também chama `_colorirBotaoDevolucoes()` — um fetch leve e independente do módulo ES que busca apenas empréstimos com `status='emprestado'` (`sem_data_definida`, `data_prevista_devolucao`) e colore o botão "DEVOLUÇÕES" (vermelho/amarelo/verde/cinza) antes mesmo do módulo ES terminar de carregar; só aplica a cor se o botão ainda não tiver `backgroundColor` definido (evita piscar).
- *Devoluções/exclusão de empréstimo — atualização otimista:* `window.devolverEAtualizar(id)` e `window.delEmpEAtualizar(id)` removem o item de `_empsComLivroCache`/`_empsDevCache` e re-renderizam (`_renderDevUMD`) antes da resposta do banco, depois confirmam via `update status='devolvido'` ou `delete`, re-buscam em segundo plano com `DB.getEmprestimosAtivosComLivro()` para garantir consistência e recarregam acervo/relatório (e lista de pessoas, na exclusão); em erro, limpam os caches e recarregam a aba do zero. `_modalDataDevolucao()` é o modal que pede a data da devolução (padrão hoje, editável) com botões "✓ CONFIRMAR"/"✕ CANCELAR", usado por `devolverEAtualizar()`; resolve com a data escolhida (meio-dia local) ou `null` se cancelado.
- *Lightbox de capa do acervo admin:* `#capLightbox`/`abrirLightboxAdmin(src, titulo)`/`fecharLightboxAdmin()` seguem o mesmo padrão visual do lightbox do `index.html` — overlay com imagem ampliada, título e botão "← VOLTAR"; salvam o elemento com foco anterior (`lb._opener`) para restaurá-lo ao fechar; Esc fecha.
- *Overlays de transição:* `#sairOverlay`/`window.sairComTransicao()` — ao clicar em "Sair", exibe overlay full-screen (logo + 3 bolinhas saltitantes + barra que encolhe em 2s) antes de chamar `DB.signOut()`. `#navTransicaoOverlay`/`window.navegarComTransicao(url, logo)` — overlay equivalente (logo + bolinhas) exibido por 600ms antes de navegar para `url`; ambos definidos localmente em `admin.html` (independentes do overlay de `bibcore.js`) e ocultados automaticamente em `pagehide`/`pageshow` (bfcache).
- *Checkbox "Autor Não Identificado":* aplicado por delegação a 5 pares campo/checkbox — cadastro manual (`autor`/`autorNaoId`), edição com IA (`iaEditAutor`/`iaEditAutorNaoId`), campo de IA (`iaCampoAutor`/`iaCampoAutorNaoId`), edição manual (`editAutor`/`editAutorNaoId`) e edição por duplicidade (`dupEditAutor`/`dupEditAutorNaoId`); ao marcar, o campo recebe `N/A`, é desabilitado e perde `required`; `_sincAutorNaoId()` sincroniza o checkbox quando o valor `N/A` já vem preenchido (ex.: ao abrir a edição de um livro sem autor identificado).

##### Autenticação do painel (`admin.html`)

O formulário de login (`#adminLoginForm`, tratado por `_autenticarNoAdmin`) é exibido em um overlay dentro de `admin.html`; não existe `login.html`. Em `init()`, o painel verifica a sessão do Supabase Auth com `DB.getSession()`: sem sessão, mostra o formulário; com sessão, oculta o formulário e carrega o painel. `DB.onAuthStateChange` trata o `SIGNED_OUT`: se o logout foi intencional (botão SAIR, marcado em `bibvania_signout_intencional`), volta ao formulário; se não foi, espera 2 s e só volta ao formulário se a sessão não tiver sido restaurada. A sessão fica em `localStorage` e expira após 8 dias sem interação (`INATIVIDADE_LIMITE_MS`; a última atividade fica em `bibvania_ultima_atividade`). Quem está logado já é administrador: as políticas RLS exigem apenas `authenticated`, sem tabela de administradores. O nome (`nome`) e a foto (`foto_url`) do bibliotecário ficam no `user_metadata` do Supabase Auth; as consultas para colocar, trocar e excluir o nome estão em "Como Criar uma Biblioteca".

##### `bibmaker.claude`

Arquivo construtor de bibliotecas — não é uma página web, e sim um arquivo lido pelo Claude numa conversa. Contém: seção "Como ativar" (baixar os arquivos-base, anexar o arquivo, digitar o comando `BibMaker` — case-insensitive); cabeçalho com identificação do projeto (nome, versão calculada automaticamente como versão base menos 0.3, descrição, repositório, licença); seção "Antes de Começar" com pré-requisitos; guia de como obter cada chave de API (Supabase, ImgBB, Mistral AI, GitHub); protocolo de preenchimento (regras internas seguidas pelo Claude); seção "Durante o Preenchimento" com os 5 blocos de cadastro (dados da biblioteca com campos condicionais por tipo escolar/comunitária, imagens obrigatórias (logo, favicon e OG Image), sem imagens padrão, chaves de API todas obrigatórias, dados do projeto e licença com herança automática de CC-BY-SA 4.0 quando o nome da licença fica vazio, descrição opcional para compartilhamento/Open Graph com fallback para a descrição padrão, GitHub); seção "Depois do Preenchimento" com os passos de configuração do Supabase, criação do usuário bibliotecário, publicação no GitHub Pages e geração do `bibconfig.claude` (configuração salva, com todas as respostas incluindo chaves de API, para permitir atualizações futuras sem repetir a entrevista — se um `bibconfig.claude` já for enviado junto na conversa, a entrevista é pulada e só os dados que mudaram são confirmados). Os campos "Versão do Projeto" e "Versão da Licença" seguem o formato `X.Y`, validado pelo próprio Claude durante a conversa. Regra de autoria: em toda biblioteca derivada, criada ou atualizada, o autor, o site do autor e o ano informados na entrevista prevalecem sobre os da BibVânia Online nos metadados, no JSON-LD, nos rodapés, no `LICENCE.md` e no cabeçalho do `README.md`; o autor da BibVânia Online permanece apenas na linha de atribuição "Derivado do Projeto BibVânia" e na seção "Derivado da BibVânia Online" do `LICENCE.md`.

##### `bibconfig.claude`

Arquivo de configuração salva de uma biblioteca derivada — gerado (e regenerado a cada atualização) pelo `bibmaker.claude` ao final da entrevista. Contém todas as respostas dadas, inclusive as chaves de API. Fica fora da pasta principal do `.zip`, junto com o `setup_private.sql`, pelo mesmo motivo: nunca deve ser publicado no GitHub. Ao reabrir o `bibmaker.claude` junto com este arquivo numa conversa futura, a entrevista completa é dispensada — só os dados que mudaram (nova versão, nova chave, etc.) precisam ser confirmados. Serve tanto para atualizar a biblioteca com uma nova versão da BibVânia Online (arquivos-base) quanto para alterar a própria biblioteca derivada. Neste repositório-base, existe apenas como **modelo em branco** (todos os campos vazios) dentro da pasta principal — serve de referência/template; não é preenchido nem usado diretamente aqui. Nas bibliotecas derivadas, sai preenchido e vai para fora da pasta principal, ao lado do `setup_private.sql`.

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
- *Padronização e paginação:* `padronizarObjeto()` grava os textos em maiúsculas, exceto `imagem_url`, `verso_url`, `pdf_url`, `alt_text` e `foto_url`, e `DB._fetchAll()` pagina os resultados para contornar o limite de 1.000 registros por requisição. O upload de capas ao ImgBB não fica aqui, e sim no `admin.html` (`_iaUploadImgbb`).

##### `style.css`

Folha de estilos global compartilhada por todas as páginas. Define os tokens de design em `:root`: `--primary`, `--primary-dark`, `--success`, `--danger`, `--warning`, `--bg`, `--card`, `--text`, `--text-light`, `--border`, `--radius`, `--shadow`, `--font-size`, `--cover-h` (altura do card do acervo público), `--cover-h-admin` (altura do card admin) e `--actions-h` (altura dos botões de ação). Tema escuro via `[data-theme=dark]`; fallback automático via `prefers-color-scheme: dark` para quem não tem preferência salva. A classe `.no-theme-transition` suprime todas as transitions durante a troca de tema. Respeita `prefers-reduced-motion` (desativa animações) e `forced-colors` (alto contraste — adiciona bordas em botões e badges).

##### `bibconfig.js`

Configuração pública do frontend: define `window.BIBVANIA_CONFIG` (objeto congelado com `Object.freeze`) com `SUPABASE_URL` e `SUPABASE_PUBLISHABLE_KEY` (chave `sb_publishable_`). É carregado antes de `bibcore.js` em `index.html` e `admin.html` e pode ficar no repositório público, porque a proteção dos dados vem do RLS e das RPCs do banco. Nunca coloque aqui chaves `secret`, `service_role`, ImgBB ou Mistral AI. O workflow `manter-supabase-ativo.yml` também lê a URL e a chave deste arquivo.

##### `service-worker.js` e `manifest.webmanifest`

PWA do catálogo e do painel. O `service-worker.js` (cache `bibvania-shell-v4`) guarda a casca do site (`index.html`, `admin.html`, `bibconfig.js`, `bibcore.js`, `style.css`, o manifesto, favicons, ícones, `logo.png` e `og-image.png`) e **nunca intercepta o Supabase nem outras origens**: só trata requisições GET da mesma origem, buscando na rede primeiro e usando o cache como reserva; caches de versões antigas são apagados ao ativar. O `manifest.webmanifest` define nome e `short_name`, `display: standalone`, cores (`#0f172a` de fundo e `#2563eb` de tema), orientação e os ícones `icon-192.png` e `icon-512.png`.

##### Imagens e ícones

`logo.png` (logo do sistema, usado no cabeçalho e nas transições), `favicon.ico`, `favicon.png`, `favicon-16.png`, `favicon-32.png`, `favicon-48.png`, `apple-touch-icon.png`, `icon-192.png` e `icon-512.png` (ícones do navegador e do PWA), `og-image.png` (imagem de compartilhamento Open Graph), `van-ia.png` (imagem do botão Vânia no `admin.html`) e `bibmaker-logo.png` (logo do BibMaker).

##### `robots.txt` e `sitemap.xml`

O `robots.txt` libera o site para buscadores, mas bloqueia `/admin.html`, `/setup_private.sql` e `/bibconfig.claude`, e aponta para o sitemap. O `sitemap.xml` lista apenas a página pública (a raiz do site). Em bibliotecas derivadas, os endereços são os da própria biblioteca.

##### `.github/workflows/manter-supabase-ativo.yml`

Workflow do GitHub Actions "Manter Supabase ativo", executado às segundas e quintas-feiras às 00:00 no horário de Brasília (cron `0 3 * * 1,4`, em UTC) e também manualmente (`workflow_dispatch`). Lê a URL e a chave publishable de `bibconfig.js` e faz uma consulta pública leve (`livros?select=id&limit=1`) para evitar a pausa do projeto por 7 dias de inatividade no plano gratuito do Supabase. Usa `actions/checkout@v5` e `ubuntu-24.04`, com permissão somente de leitura.

##### `CHANGELOG.md`

Histórico de mudanças do projeto, com a entrada mais recente no topo. Cada entrada tem um ID crescente (`#N`), data e hora, os arquivos alterados e a descrição, com um resumo em termos simples no final. Toda alteração deve ser registrada (ver a regra obrigatória em "Estrutura de arquivos"). Cada biblioteca derivada tem o próprio `CHANGELOG.md`, que começa na `#1`.

##### `.gitignore` e `.nojekyll`

O `.gitignore` impede o envio de `setup_private.sql`, `bibconfig.claude` e arquivos `.env` ao GitHub. O `.nojekyll` (arquivo vazio) desativa o processamento Jekyll do GitHub Pages, para que os arquivos sejam servidos como estão.

##### `supabase_setup.sql`

Script SQL completo para criação das tabelas, triggers, RLS, políticas e RPCs. Deve ser executado no SQL Editor do Supabase em um projeto novo; em instalações existentes, reaplique a versão atualizada para ativar reservas, recalcular o estoque das solicitações pendentes e publicar a busca por perfil. No final, o script solicita a recarga do cache de funções do PostgREST. Cria/configura `livros`, `emprestimos`, `pessoas`, `reservas`, `config_privada` e `livros_excluidos` (histórico de exclusão de livros). Não há tabela de administradores: quem está autenticado é administrador, e o nome e a foto de perfil ficam no `user_metadata` do Supabase Auth. Os triggers recalculam `quantidade_disponivel`, validam o estoque de reservas e empréstimos, sincronizam a disponibilidade ao editar `quantidade_total` e protegem livros com reservas pendentes; as RPCs `bv_buscar_pessoas_reserva`, `bv_criar_reserva` e `bv_concluir_reserva` atendem às reservas. Inclui migração automática de `pessoa_id` em empréstimos existentes e blocos idempotentes de migração de colunas. Não apaga a tabela de reservas ao reaplicar o arquivo.

##### `setup_private.sql`

Script SQL para inserção das chaves de API privadas (`imgbb_api_key`, `mistral_api_key`) na tabela `config_privada`. Usa `ON CONFLICT … DO UPDATE` — pode ser re-executado para rotacionar chaves sem duplicatas. Inclui query de verificação opcional que exibe os valores mascarados com indicador de status. Neste repositório-base, fica na pasta principal (uso direto). Nas bibliotecas geradas pelo `bibmaker.claude`, fica fora da pasta principal do `.zip`, ao lado do `bibconfig.claude`. **Nunca commitar no GitHub nem compartilhar de nenhuma forma** — contém chaves privadas de API.

##### `bibhash.sig`

Assinatura SHA-256 de integridade do ZIP do projeto (da BibVânia Online ou de uma biblioteca derivada). Formato: SHA-256 hex puro (64 caracteres), sem prefixo, sem newline. Calculada sobre todos os arquivos do ZIP em ordem alfabética; único arquivo excluído do cálculo: `bibhash.sig` (evita referência circular). Método exato: extrair ZIP, remover `bibhash.sig`, executar `LC_ALL=C find . -type f | sort | xargs sha256sum | sha256sum`; gravar resultado com `echo -n`. Paths incluem prefixo `./`; sort é byte-order (LC\_ALL=C). Regenerada pela IA após qualquer modificação ao ZIP. Em caso de divergência ao receber o ZIP, a IA exibe o hash calculado vs. o armazenado e não prossegue com nenhuma ação até confirmação explícita. Cada biblioteca gerada pelo `bibmaker.claude` tem o seu próprio `bibhash.sig`, calculado pelo mesmo método sobre a pasta do projeto da biblioteca (o `setup_private.sql` e o `bibconfig.claude` ficam fora da pasta e, portanto, fora do cálculo) e gerado por último, depois de todos os arquivos finais, em toda criação ou atualização. O `bibhash.sig` da BibVânia Online não vale para a biblioteca derivada.

##### `VERSION.json`

Fonte de verdade da versão do projeto. Formato: `{"bibvania":"X.Y"}`. Lido de forma síncrona (XHR) por um script inline no `<head>` de `index.html` e `admin.html`, antes do CSS externo carregar: preenche `window.BIBVANIA_VERSAO`, atualiza as metatags `version` e `versaobase` e dispara o evento `bibvania:versao`. O botão "Verificar Versão" do `admin.html` compara este arquivo com o `VERSION.json` publicado pela BibVânia Online.

##### `LICENCE.md`

Licença CC-BY-SA-4.0. Cobre todo o código, assets originais e documentação. Dependências de terceiros listadas com suas próprias licenças.

##### `README.md`

Documentação de instalação e uso voltada ao GitHub. Inclui pré-requisitos, o passo a passo para criar e para atualizar uma biblioteca, as funcionalidades e esta referência técnica. O histórico de mudanças fica no `CHANGELOG.md`, e não no README. Na biblioteca derivada, é gerado pelo `bibmaker.claude` como cópia deste README: o nome da biblioteca entra só onde identifica a biblioteca (título e apresentação), junto com os links dela e a linha "Desenvolvido por" (autor da biblioteca); as referências à BibVânia Online como projeto base (versão nova, atualização, arquivos-base, repositório oficial, licença) permanecem.

#### Arquitetura técnica resumida

* **Rodapé por modalidade:** os três rodapés (`index.html`, login e painel) montam sua descrição a partir das metatags comuns `tipobib`, `denominacaoescola`, `nomeescola` e `nomebiblioteca`. Bibliotecas escolares exibem a denominação da escola e o nome oficial; comunitárias exibem "biblioteca comunitária" seguido do nome, sem duplicar esse prefixo quando já estiver preenchido no cadastro.

* **Dois sistemas de script por página:** cada HTML carrega `bibcore.js` como ES Module (`<script type="module">`) e um bloco UMD síncrono logo após. Funções acessadas via `onclick` devem ser expostas em `window.*` pelo módulo.
* **Transição de página:** função `window.navegarCom(url)` exibe um overlay fixo com logo (80×auto, animação de escala 0.6s), 3 bolinhas (10×10px, animação de salto 0.9s com delays escalonados de 0.3s), fundo com cor `var(--bg)`, opacity 0, pointer-events none. Ao chamar `navegarCom()`, a classe `ativo` liga opacity/pointer-events, aguarda 140ms e redireciona. No evento `pageshow` (inclui bfcache do navegador), remove a classe para fade-out 0.1s.
* **Inicialização sem flash:** scripts inline no `<head>` aplicam o tema e o tamanho da fonte e leem o `VERSION.json` de forma síncrona antes do CSS externo carregar, evitando o flash claro→escuro e deixando `window.BIBVANIA_VERSAO` disponível de imediato; a interface só é revelada depois de pronta, para evitar o flash de layout sem estilo.
* **Trigger automático:** o PostgreSQL recalcula `quantidade_disponivel` após mudanças em `emprestimos` ou `reservas`: `quantidade_total − empréstimos ativos − reservas pendentes` (mínimo zero). Nunca atualizar esse campo manualmente; a reserva concluída troca a alocação pendente por um empréstimo sem contagem dupla.
* **Reservas públicas:** o papel `anon` não recebe acesso direto às tabelas `pessoas`, `emprestimos` ou `reservas`. O catálogo pode chamar somente `bv_buscar_pessoas_reserva` (trecho do nome, perfil selecionado e campos cadastrais mínimos) e `bv_criar_reserva`; políticas administrativas e leitura de fila exigem `authenticated`.
* **Conclusão atômica de reserva:** `bv_concluir_reserva` valida os limites de empréstimo, atualiza a reserva e cria o empréstimo dentro da mesma transação. O exemplar já foi descontado quando a reserva foi criada; ao converter, essa alocação passa de reserva para empréstimo sem ser descontada duas vezes. Se uma validação falhar, a reserva permanece pendente.
* **Limites de circulação:** alunos e visitantes podem ter uma reserva pendente; ambos precisam devolver empréstimo ativo antes de concluir reserva. No fluxo manual, alunos têm limite de um empréstimo ativo, enquanto visitantes e funcionários podem ter vários. Funcionários não têm limite numérico de reservas, respeitado o estoque.
* **Paginação automática:** `DB._fetchAll()` contorna o limite nativo de 1000 registros por requisição do Supabase, paginando automaticamente em lotes para exibir o acervo completo.
* **Realtime:** `bibcore.js` mantém um canal por tabela (`livros`, `emprestimos`, `pessoas`, `reservas`) e reutiliza o mesmo canal para todos os callbacks registrados. O catálogo público só assina `livros`; o painel assina as quatro tabelas.
* **PWA e cache:** o `service-worker.js` guarda só a casca estática do site (rede primeiro, cache como reserva) e nunca intercepta o Supabase nem outras origens; o nome do cache é versionado (`bibvania-shell-v4`).
* **Padronização de texto:** `padronizarObjeto()` (em `bibcore.js`) grava os campos de texto em maiúsculas, exceto os de URL e texto alternativo.

#### Convenções e padrões internos

* **Autenticação do painel:** `admin.html` usa `DB.getSession()` em `init()` e `DB.onAuthStateChange` para reagir a logout e expiração, mostrando o formulário de login em overlay (ver "Autenticação do painel"). O `supabase-js` renova o token sozinho (`autoRefreshToken`). `DB.checkAuth()` (devolve a sessão, tentando renovar o token, ou `null`, sem redirecionar) e `DB.redirectIfLoggedIn()` (leva ao `admin.html` quando há sessão) continuam em `bibcore.js` por compatibilidade com o modelo antigo de várias páginas, mas o painel não as usa.
* **Sistema de abas:** a aba ativa do painel é salva em `sessionStorage` (chave `bibvania_tab`; padrão `tab-cadastro`). Um script inline no `<head>` restaura a aba correta antes do `DOMContentLoaded`, evitando o "flash" da aba padrão. As abas são Cadastro de Livro (`tab-cadastro`), Acervo (`tab-registro`), Empréstimo (`tab-emprestimo`), Reservas (`tab-reservas`), Devoluções (`tab-devolucoes`), Cadastrar Pessoas (`tab-pessoas`), Lista de Pessoas (`tab-listapessoas`) e Relatório (`tab-relatorio`).
* **Chaves de armazenamento do navegador:** em `localStorage`, `theme` (claro/escuro), `fontSize`, `bibvania_admin_nome`, `bibvania_admin_semnome`, `bibvania_ultima_atividade` e os filtros do relatório (`rel_v2_*`), além do token do Supabase Auth, que o `supabase-js` grava sozinho (`sb-<projeto>-auth-token`); em `sessionStorage`, `bibvania_tab` e `bibvania_signout_intencional`. Novas chaves não devem ser criadas sem necessidade — isso pode quebrar a persistência entre sessões.
* **Navegação com transição:** links e botões que mudam de página usam `window.navegarCom(url)` em vez de `window.location`. A função exibe uma sobreposição com a logo animada durante a troca de página, dando uma sensação de SPA. Não deve ser usada para navegações internas (abas) — apenas para mudanças de página.
* **Carregamento de imagens com nova tentativa:** o logo do cabeçalho usa um `onerror` inline que tenta recarregar a imagem até 3 vezes (acrescentando `?r=N` ao endereço); se todas falharem, o elemento é ocultado em vez de deixar um ícone quebrado.
* **Upload de capas e verso:** o `admin.html` redimensiona a imagem e a envia ao ImgBB por `_iaUploadImgbb()` (chave obtida de `window.BibChaves`, que a lê de `config_privada.imgbb_api_key`), gravando a URL em `imagem_url` (capa) ou `verso_url` (verso). O PDF do livro (`pdf_url`) é uma URL colada manualmente pelo bibliotecário, sem upload automático. Remover a capa ou o verso apenas limpa a URL no banco; o arquivo não é apagado no ImgBB.
* **Badges de categorias:** `spanCategoria(categoria)` (em `bibcore.js`) retorna um `<span>` em negrito com a cor da classificação indicativa, definida no mapa interno `_CAT_CORES` (LIVRE verde, 6 anos verde-azulado, 10 anos azul, 12 anos amarelo, 14 anos laranja, 16 anos vermelho e 18 anos preto). Categorias antigas do banco são exibidas pela faixa equivalente, um valor desconhecido aparece sem cor, e o texto passa por `escapeHtml()`.
* **Acessibilidade (WCAG 2.1):** listas que mudam dinamicamente (ex: livros adicionados/removidos no catálogo) usam `aria-live="polite"` para anunciar a mudança a leitores de tela. Modais e o lightbox de capas implementam *focus trap* (o foco do teclado não escapa do modal) e podem ser fechados com `Esc`. Busca por voz via `iniciarBuscaVoz(inputEl, onResult)` (Web Speech API, idioma `pt-BR`; o botão só aparece em navegadores com suporte).

#### Backup do Supabase


1. Acesse o painel do seu projeto em [supabase.com/dashboard](https://supabase.com/dashboard).
2. No menu lateral, vá em **Table Editor** e exporte cada tabela importante (`livros`, `pessoas`, `emprestimos`) clicando em **Export CSV**.
3. Alternativamente, use o **SQL Editor** para exportar via `COPY` ou acesse **Database → Backups** (disponível nos planos pagos) para fazer download de um dump completo.
4. Guarde os arquivos exportados em local seguro (nuvem pessoal, HD externo) e repita o processo ao menos uma vez por semana, ou sempre antes de grandes alterações no sistema.

**Importante:** o plano gratuito do Supabase não inclui backups automáticos com restore por interface. Projetos inativos por mais de 7 dias são pausados automaticamente: os dados são mantidos, mas o site fica fora do ar até você restaurar o projeto no painel. O workflow `manter-supabase-ativo.yml` existe justamente para evitar essa pausa.

#### Configuração e segurança

A configuração pública do Supabase fica em `bibconfig.js` e usa exclusivamente a
chave `sb_publishable_`. Nenhuma chave `anon`, `secret` ou `service_role` deve ser colocada
no site. A proteção dos dados depende das políticas RLS e das RPCs do
`supabase_setup.sql`.

Medidas adicionais de segurança do painel e do catálogo:

- O `supabase-js` é carregado com **versão fixa** (`@2.89.0`) no `admin.html` e no `bibcore.js`; ao atualizar, troque nos dois lugares.
- O ISBN do verso é lido das barras no navegador (`BarcodeDetector` nativo; se não existir, `@zxing/library@0.21.3` do jsDelivr, versão fixa, em `admin.html`). A leitura vale para a capa e para o verso, e a IA só entra como alternativa quando as barras não puderem ser lidas. O botão da Vân-IA funciona com a capa, com o verso ou com os dois. Na edição, com imagens já salvas, o navegador tenta baixar a imagem do ImgBB (`https://*.ibb.co` no `connect-src`) para ler as barras; se não conseguir, vale só a leitura da IA.
- A sessão do bibliotecário fica em `localStorage` e continua ativa ao fechar a aba ou o navegador. Ela é encerrada após **8 dias sem nenhuma interação** com o painel (`INATIVIDADE_LIMITE_MS` no `admin.html`) ou ao tocar em SAIR. Como todos os sites de `usuario.github.io` compartilham a mesma origem, não publique outros sites nela.
- As chaves ImgBB e Mistral AI ficam em `window.BibChaves` (privado) e são apagadas ao sair. Para isolamento total, use um proxy (Supabase Edge Function).
- Páginas abertas dentro de um `iframe` ficam ocultas (proteção contra clickjacking; `frame-ancestors` não funciona em `<meta>`).

#### Segurança das chaves de API

O BibVânia Online utiliza chaves de API para integrar serviços externos (ImgBB e Mistral AI). Siga estas boas práticas:

* No Supabase Auth, desative o cadastro público de novos usuários; crie os administradores manualmente em Authentication → Users (quem está logado já é administrador).
* Nunca adicione chaves de API diretamente em arquivos HTML ou JS que vão para o repositório público. Use a tabela `config_privada` no Supabase para armazená-las com segurança (conforme o arquivo `setup_private.sql`).
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
