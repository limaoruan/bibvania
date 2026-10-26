# CHANGELOG — BibVânia Online

Histórico de mudanças, remoções e adições do projeto BibVânia Online.

## Formatação

Cada entrada segue esta estrutura fixa:

```
#ID Data e Hora
[Remoção/Adição] no(a) [ONDE]
Descrição: Descrição detalhada da mudança.
```

- **ID**: número inteiro precedido de `#` (ex.: `#1`). O próximo ID é sempre o seguinte ao maior ID já usado (nunca reutilizar ou pular números).
- **Ordem**: crescente na numeração, mas decrescente na posição do arquivo — cada nova entrada é adicionada **acima** da anterior, ou seja, o ID mais alto fica sempre no topo do documento e o `#1` permanece no final.
- **Data e Hora**: data no formato `DD/MM/AAAA` e hora no formato `HH:MM:ss`, no momento em que a mudança foi feita.
- **[Remoção/Adição]**: indicar se a mudança foi uma remoção ou uma adição. Para casos que não são estritamente um dos dois (uma correção de bug, uma decisão, uma mudança de comportamento), usar o termo que mais se aproxima (ex.: "Correção", "Mudança") mantendo a mesma estrutura de linha.
- **[ONDE]**: o local da mudança — pode ser um arquivo específico (ex.: `admin.html`), o banco de dados/Supabase, um prompt de IA, ou um site/serviço externo.
- **Descrição**: detalhada o suficiente para servir a três propósitos ao mesmo tempo: (1) funcionar como backup/registro da própria mudança para a pessoa responsável pelo BibVania (ou uma IA como o Claude, atuando por ela), permitindo reconstruí-la se necessário; (2) permitir que a pessoa responsável por uma biblioteca derivada (ou uma IA como o Claude, atuando por ela) aplique a mudança no próprio projeto; e (3) trazer uma explicação em linguagem simples, fácil de entender para quem lê — seja um(a) desenvolvedor(a), bibliotecário(a) ou qualquer outro leitor —, do que realmente mudou na prática.

---

#255 24/10/2026 23:59:00
Correção no arquivo `admin.html` e atualização do `bibhash.sig`
Descrição: Corrigido o cálculo de "data de hoje" em UTC, que depois das 21h no horário de Brasília (UTC-3) devolvia o dia seguinte. Três pontos passaram a usar a data no fuso do aparelho (descontando `getTimezoneOffset()` antes de `toISOString()`): `_dataHoje()`, que preenche a data do empréstimo no formulário de novo empréstimo e na edição; o campo de data do modal de confirmação de devolução (`_modalDataDevolucao`); e a data calculada na renovação de empréstimo, que também podia sair um dia adiantada quando o horário guardado era à noite. O restante do `admin.html` já estava correto (os cálculos baseados em `T12:00:00` e o modal de concluir reserva já tratavam o fuso). Na prática, o formulário deixa de sugerir a data de amanhã quando o bibliotecário trabalha à noite. O comentário de `_dataHoje()` foi atualizado e o `bibhash.sig` foi recalculado.

#254 24/10/2026 23:38:22
Mudança nos arquivos `admin.html`, `index.html`, `bibcore.js`, `style.css`, `supabase_setup.sql`, `service-worker.js`, `bibconfig.js`, `robots.txt`, `sitemap.xml`, `.gitignore`, `.github/workflows/manter-supabase-ativo.yml` e `bibhash.sig`
Descrição: Documentação interna. Foram adicionados comentários onde faltavam, sem alterar nenhuma linha de código. `admin.html`: comentários nas funções que não tinham (login, inatividade, verificação de versão, upload ao ImgBB, edição de empréstimo, livro parecido, Vânia (IA), leitura de ISBN, relatório, reservas e menu de atalhos) e nos blocos `<script>`/`<style>` soltos. `index.html`: funções de reserva pública, capas, PDF, lightbox e blocos soltos. `bibcore.js`: padronização em maiúsculas, canais Realtime e trava de estoque em `atualizarLivro`. `style.css`: títulos nos blocos do catálogo, de atrasados e de reservas. `supabase_setup.sql`: políticas RLS, triggers, RPCs de reserva e permissões. `service-worker.js`, `robots.txt`, `sitemap.xml`, `.gitignore` e o workflow: cabeçalhos e explicações de cada regra. `bibconfig.js`: aviso de que o workflow lê a URL e a chave com `sed`, então cada uma deve ficar em uma linha própria. Na função `_dataHoje()` do `admin.html` foi registrado que a data é calculada em UTC (depois das 21h em Brasília devolve o dia seguinte); o comportamento não foi alterado. Na prática, nada muda para o usuário; o `bibhash.sig` foi recalculado sobre os arquivos finais.

#253 22/10/2026 09:33:23
Mudança nos arquivos `bibconfig.js`, `admin.html`, `index.html` e `bibhash.sig`
Descrição: O projeto passou a usar um novo projeto Supabase. No `bibconfig.js`, `SUPABASE_URL` e `SUPABASE_PUBLISHABLE_KEY` foram trocadas pela URL e pela chave publishable do novo projeto. No `admin.html` (1 ocorrência) e no `index.html` (2 ocorrências), os `<link rel="preconnect">` que apontavam para o endereço do Supabase antigo passaram a apontar para o novo. O novo banco foi preparado com `supabase_setup.sql` e `setup_private.sql` (chaves do ImgBB e da Mistral AI), o usuário admin foi criado e o cadastro público do Supabase Auth foi desativado. Os dados do banco antigo não foram migrados: a biblioteca começa vazia. Na prática, o site passa a ler e gravar no banco novo. O `bibhash.sig` foi recalculado sobre os arquivos finais.

#252 22/10/2026 07:52:16
Correção nos arquivos `LICENCE.md`, `README.md`, `bibcore.js`, `style.css`, `bibmaker.claude` e `bibhash.sig`
Descrição: Corrigidas três pendências apontadas na revisão do `README.md` (#251). (1) No `LICENCE.md`, a seção "O que está coberto" citava arquivos que não existem (`login.html` e `og-image.jpg`) e não listava vários que existem; agora lista os arquivos reais: código-fonte (incluindo `bibconfig.js` e `service-worker.js`), ativos visuais (`og-image.png`, `van-ia.png`, favicons e ícones do PWA), configuração e publicação (`manifest.webmanifest`, `robots.txt`, `sitemap.xml` e o workflow) e documentação (incluindo o `CHANGELOG.md`). (2) A tabela "Dependências de terceiros", no `LICENCE.md` e no `README.md`, passou a incluir `pdfmake` 0.2.9 (MIT), `@zxing/library` 0.21.3 (MIT) e a Mistral AI (termos legais), que o projeto já usava; as licenças foram conferidas no registro do npm para as versões em uso. (3) Removidas as menções a `login.html` no código: o comentário de abertura do `bibcore.js` e o do `style.css` agora citam só `index.html` e `admin.html`, e `DB.checkAuth()` deixou de redirecionar para o `login.html`, que não existe (agora devolve a sessão ou `null`; o painel não usa essa função, então o comportamento do sistema não muda). No `bibmaker.claude`, a regra de geração do `LICENCE.md` das bibliotecas derivadas passou a exigir a lista de arquivos que realmente existem na pasta e a tabela de dependências completa. O `README.md` foi ajustado para descrever o novo comportamento de `checkAuth()`. O `bibhash.sig` foi recalculado sobre os arquivos finais. Em termos simples: a licença e a documentação agora batem com os arquivos e as bibliotecas que o projeto realmente usa, e não sobrou referência a uma página de login que não existe.

#251 22/10/2026 07:42:43
Alteração nos arquivos `README.md` e `bibhash.sig`
Descrição: Revisão do `README.md` contra o código atual, principalmente em "Para Desenvolvedores". (1) Preenchidas as seções `index.html` e `bibcore.js`, que estavam vazias. (2) Corrigidas informações desatualizadas: o painel não redireciona para `login.html` (o login é um overlay no `admin.html`, e `DB.checkAuth()`/`redirectIfLoggedIn()` são legados); o `DB.refreshSession()`, o `DB.uploadCapaLivro()`, o `DB.removerCapa()`/`removerPdf()`, o `loadImageWithRetry()`, o `startVoiceSearch()` (agora `iniciarBuscaVoz()`) e a tabela `categoria_cores` não existem mais; o parâmetro `?aba=` não existe; a chave `supabaseSession` não é usada (o token fica em `sb-<projeto>-auth-token`); as classificações indicativas são 7 (LIVRE, 6, 10, 12, 14, 16 e 18 anos) e não 6; a tabela `admins` não existe (nome e foto ficam no `user_metadata`); o Supabase Storage não é usado (capas no ImgBB). (3) Removidos os itens das funções que não existem mais (`iaCadastrarLivro`, `iaSalvarEdicao`, histórico "Últimos cadastrados com IA" e `iaSalvarQuantidadeRapida`), com a validação atual do formulário de livro (`formLivro`) no lugar. (4) Documentada a leitura do ISBN pelas barras (`BarcodeDetector`/ZXing) na descrição do botão Vânia. (5) Adicionadas as seções de `bibconfig.js`, `service-worker.js` e `manifest.webmanifest`, imagens e ícones, `robots.txt` e `sitemap.xml`, workflow `manter-supabase-ativo.yml`, `CHANGELOG.md`, `.gitignore` e `.nojekyll`, além de detalhes de autenticação do painel, Realtime, PWA, abas e chaves de armazenamento. (6) A árvore de "Estrutura de arquivos" passou a listar todos os arquivos do projeto, e "Tecnologias" e "Funcionalidades" citam o PDF do acervo, a leitura de código de barras, o PWA e o relatório. (7) Os limites do plano gratuito do Supabase foram corrigidos (500 MB de banco, 5 GB de tráfego e 50.000 usuários ativos por mês, sem limite fixo de requisições; projeto pausado após 7 dias sem uso, com os dados mantidos). (8) A descrição do `README.md` das bibliotecas derivadas passou a refletir as regras atuais do BibMaker (nome só na identidade da biblioteca, autor da biblioteca na linha "Desenvolvido por" e referências à BibVânia Online mantidas). O `bibhash.sig` foi recalculado sobre os arquivos finais. Em termos simples: o README agora descreve o sistema como ele está hoje.

#250 21/10/2026 07:36:45
Correção nos arquivos `bibmaker.claude` e `bibhash.sig`
Descrição: Corrigido o README das bibliotecas derivadas, que dizia, por exemplo, "há uma versão mais nova do Geladeiroteca Online" e "baixe os arquivos-base da nova versão da Geladeiroteca Online", quando a versão nova a que isso se refere é a da BibVânia Online, que é a base. A regra de geração dizia apenas para trocar o nome, e o nome da biblioteca acabava substituindo todas as ocorrências de "BibVânia Online". No `bibmaker.claude`, o Contrato de metadados ganhou a seção "Nome da biblioteca × referências à BibVânia Online base": o Nome do Projeto vale só para a identidade da biblioteca (título e apresentação do `README.md`, título do `LICENCE.md` e do `CHANGELOG.md`, rodapés e metadados, links da própria biblioteca), enquanto as referências à base (versão nova, atualização, arquivos-base, repositório oficial, licença e atribuição, e a URL do `VERSION.json` remoto usada pela verificação de versão do `admin.html`) permanecem como BibVânia Online. Em atualizações, trechos que já tenham o nome da biblioteca no lugar da base são devolvidos a "BibVânia Online", e a auditoria final confere isso. As duas regras de geração do `README.md` e a regra de atualização passaram a apontar para essa seção. O `bibhash.sig` foi recalculado sobre os arquivos finais. Em termos simples: nas bibliotecas derivadas, o aviso de atualização e o passo de baixar os arquivos-base falam da BibVânia Online, que é de onde vêm as versões novas, e não da própria biblioteca.

#249 21/10/2026 07:34:24
Remoção nos arquivos `README.md`, `bibmaker.claude` e `bibhash.sig`
Descrição: Removida do `README.md` a seção "BibTools" (com a subseção "🔧 BibMaker", que repetia o uso do `bibmaker.claude`, o conteúdo do `.zip` entregue e o aviso sobre o `setup_private.sql`) e as duas entradas dela no sumário; esses passos já estão em "Como Criar uma Biblioteca" e "Como Atualizar uma Biblioteca", e o `bibmaker.claude` continua descrito em "Para Desenvolvedores". No `bibmaker.claude`, a regra de geração do `README.md` deixou de citar a seção BibTools ("o restante do conteúdo é mantido"), para não apontar para uma seção que não existe mais. O `bibhash.sig` foi recalculado sobre os arquivos finais. Em termos simples: o README não tem mais o tópico BibTools, e as instruções de uso do BibMaker ficam só nas seções de criar e atualizar uma biblioteca.

#248 21/10/2026 07:33:02
Mudança nos arquivos `README.md` e `bibhash.sig`
Descrição: No `README.md`, a seção "Sobre" passou a aparecer antes do Sumário, logo depois da linha de abertura com o link do acervo público, do autor e da licença. O texto das duas seções foi mantido sem alterações; o Sumário continua listando "Sobre" como primeiro item. O `bibhash.sig` foi recalculado sobre os arquivos finais. Em termos simples: o README apresenta o projeto primeiro e só depois mostra o índice.

#247 21/10/2026 07:31:44
Mudança nos arquivos `README.md` e `bibhash.sig`
Descrição: O tópico "Configuração e segurança" saiu do topo do `README.md`, antes do Sumário, e passou a ser a subseção "Configuração e segurança" de "Para Desenvolvedores" (dentro da área expansível), logo antes de "Segurança das chaves de API", junto dos demais temas de segurança. O texto foi mantido sem alterações. O `bibhash.sig` foi recalculado sobre os arquivos finais. Em termos simples: o README abre direto com o Sumário, e as orientações técnicas de configuração e segurança ficam na parte para desenvolvedores.

#246 21/10/2026 07:30:34
Remoção nos arquivos `README.md` e `bibhash.sig`
Descrição: Removida do `README.md` a seção "Configuração inicial (instalação direta deste repositório)" (criação do projeto no Supabase, execução do `supabase_setup.sql` e do `setup_private.sql`, credenciais em `bibconfig.js`, criação do usuário bibliotecário e do username, publicação no GitHub Pages e manutenção do Supabase ativo) e a entrada correspondente do sumário, porque esses passos já fazem parte de "Como Criar uma Biblioteca". O `bibhash.sig` foi recalculado sobre os arquivos finais. Em termos simples: o README tem um único caminho de instalação, o de "Como Criar uma Biblioteca", sem a seção duplicada no final.

#245 21/10/2026 07:28:43
Correção nos arquivos `README.md` e `bibhash.sig`
Descrição: A frase que introduz o exemplo de atribuição na seção Licença do `README.md` mudou de "Atribuição sugerida para projetos derivados:" para "Atribuição sugerida:", igual à do `LICENCE.md`. O `bibhash.sig` foi recalculado sobre os arquivos finais. Em termos simples: a atribuição de exemplo, com sua frase de abertura, é a mesma no README e no LICENCE.

#244 21/10/2026 07:27:51
Correção nos arquivos `README.md` e `bibhash.sig`
Descrição: O exemplo de atribuição sugerida da seção Licença do `README.md` passou a ser idêntico ao do `LICENCE.md`: o texto do link do repositório mudou de `github.com/limaoruan/bibvania` para `https://github.com/limaoruan/bibvania`, mantendo o mesmo destino do link. O `bibhash.sig` foi recalculado sobre os arquivos finais. Em termos simples: a atribuição de exemplo é a mesma nos dois arquivos.

#243 21/10/2026 07:25:45
Adição nos arquivos `README.md`, `LICENCE.md` e `bibhash.sig`
Descrição: Restaurada, como última linha da tabela "Dependências de terceiros" do `README.md` e do `LICENCE.md`, a linha da Web Speech API (https://wicg.github.io/speech-api/, licença W3C Community), que havia sido removida na entrada #242. A remoção foi desfeita porque a Web Speech API (`SpeechRecognition`) é o recurso do navegador usado pela busca por voz do catálogo, portanto continua sendo uma dependência em uso. O `bibhash.sig` foi recalculado sobre os arquivos finais. Em termos simples: a Web Speech API voltou a ser listada como dependência da busca por voz.

#242 21/10/2026 07:24:24
Remoção nos arquivos `README.md`, `LICENCE.md` e `bibhash.sig`
Descrição: Removida a linha da Web Speech API (https://wicg.github.io/speech-api/, licença W3C Community) da tabela "Dependências de terceiros" do `README.md` e do `LICENCE.md`, por se tratar de uma especificação que não é mais atualizada. As menções técnicas à Web Speech API que descrevem o funcionamento da busca por voz (comentários do código e texto de compatibilidade de navegadores) foram mantidas. O `bibhash.sig` foi recalculado sobre os arquivos finais. Em termos simples: a Web Speech API deixou de aparecer como dependência de terceiros na documentação e na licença.

#241 21/10/2026 07:20:15
Correção nos arquivos `bibmaker.claude`, `README.md` e `bibhash.sig`
Descrição: Corrigido o comportamento em que, ao criar ou atualizar uma biblioteca derivada, o autor da BibVânia Online (Ruan Oliveira Lima) prevalecia sobre o autor da própria biblioteca. No `bibmaker.claude`, o Contrato de metadados ganhou a seção "Autoria: biblioteca derivada × projeto base", com duas listas: a lista A (metas `author`, `creator`, `copyright` e `publisher`, `link rel="author"`/`rel="me"`, JSON-LD, linha de versão, lançamento e licença dos três rodapés, título e copyright do `LICENCE.md` e linha "Desenvolvido por" do `README.md`) sempre recebe Autor do Projeto, Site do Autor e Ano de Lançamento da biblioteca; a lista B (linha de atribuição "Derivado do Projeto BibVânia" nos rodapés e seção "Derivado da BibVânia Online" do `LICENCE.md`) mantém o autor da base. Em atualizações, os valores de autoria que chegam nos arquivos-base novos nunca são preservados como "personalização válida" e são sempre regravados com os dados confirmados da biblioteca; campos de autoria vazios são perguntados, sem usar o autor da base como padrão; a regra de corrigir referências à BibVânia-base não vale para a lista B; e uma auditoria final busca `Ruan Oliveira Lima` e `ruanoliveiralima_` para garantir que só restem ocorrências permitidas. Os exemplos de Autor do Projeto e Site do Autor na entrevista e no modelo do `bibconfig.claude` deixaram de usar os dados da BibVânia e passaram a ser fictícios, para não induzir o uso do autor da base. As regras de geração do `README.md` passaram a incluir a linha "Desenvolvido por" do cabeçalho, e o `README.md` documenta a regra. O `bibhash.sig` foi recalculado sobre os arquivos finais (a assinatura anterior conferia com os arquivos antes desta alteração). Em termos simples: ao atualizar uma biblioteca, o nome e o site do autor da biblioteca não são mais trocados pelos do autor da BibVânia, que continua creditado só na linha de "Derivado do Projeto BibVânia" e na licença.

#240 20/10/2026 10:39:08
Mudança nos arquivos `index.html`, `admin.html`, `bibmaker.claude`, `bibconfig.claude`, `README.md`, `service-worker.js` e `bibhash.sig`
Descrição: Atualizada a descrição nos três rodapés (catálogo, login e painel) para "Sistema de gerenciamento de biblioteca para pesquisa do acervo, empréstimos e reservas", com identificação dinâmica por modalidade. Bibliotecas escolares acrescentam a denominação da escola e o nome oficial; bibliotecas comunitárias acrescentam "biblioteca comunitária" e o nome informado, evitando repetir esse prefixo caso ele já esteja no valor cadastrado. Os metadados de identidade agora são mantidos em ambas as páginas e o BibMaker recebeu regras para gerar e atualizar a mesma lógica nas bibliotecas derivadas; o `bibconfig.claude` e o README documentam esses campos. O HTML mantém uma frase inicial compatível com a instância escolar atual e usa `textContent` para inserir os nomes com segurança. O cache do service worker mudou de `bibvania-shell-v3` para `bibvania-shell-v4` para que os navegadores busquem as páginas atualizadas. A assinatura recebida não correspondia aos arquivos do ZIP; após autorização, `bibhash.sig` foi recalculado sobre os arquivos finais pelo procedimento documentado no README. Em termos simples: o rodapé identifica corretamente a escola ou biblioteca comunitária, e as próximas bibliotecas geradas também herdarão o comportamento.

#239 20/10/2026 07:54:15
Correção nos arquivos `bibmaker.claude` e `README.md`
Descrição: A regra da versão do BibMaker mudou de "versão da BibVânia Online instalada − 0.1" para "versão da BibVânia Online instalada − 0.3". No cabeçalho do `bibmaker.claude`, a linha Versão passou de 1.9 para 2.7 (BibVânia 3.0 − 0.3) e o comentário ao lado foi atualizado; no `README.md`, a descrição do `bibmaker.claude` (seção BibTools) agora diz "versão base menos 0.3". Em termos simples: o BibMaker acompanha a versão da BibVânia com uma diferença fixa de 0.3, e hoje está na 2.7. Ao subir a versão da BibVânia, o BibMaker deve ser ajustado pela mesma conta.

#238 20/10/2026 07:53:05
Mudança no arquivo `bibmaker.claude`
Descrição: As melhorias da Vânia (botão ativo com capa OU verso, ISBN lido da capa e do verso, leitura local das barras também na edição) passam a valer para as bibliotecas geradas. O código em si já chega a elas sem mudança no BibMaker, porque ele aplica edições cirúrgicas sobre os arquivos-base (`admin.html`, `README.md` etc.); por isso, o `admin.html` atualizado precisa estar no repositório-base usado na geração ou na atualização. O que mudou no `bibmaker.claude` foi só a proteção da CSP: na seção "Painel (`admin.html`)" ele agora manda preservar `https://*.ibb.co` no `connect-src` e `https://cdn.jsdelivr.net` no `script-src` (ZXing e supabase-js), e a validação final das atualizações passou a conferir esses dois itens, para a regeneração da CSP não desativar a leitura de barras. Para atualizar uma biblioteca já criada: baixar o repositório-base atual, abrir o `bibmaker.claude` numa conversa junto com o `bibconfig.claude` da biblioteca e seguir o fluxo de atualização; o `CHANGELOG.md` da biblioteca é preservado e recebe a entrada da atualização.

#237 20/10/2026 07:49:49
Adição nos arquivos `admin.html` e `README.md`
Descrição: Na edição de um livro cuja capa e/ou verso já estão salvos (só existe a URL do ImgBB), a Vânia agora também tenta ler o código de barras. Nova função `_lerIsbnDaUrl()`: baixa a imagem com `fetch` (modo CORS, limite de 8 segundos), converte para data URL e passa por `_lerIsbnDaImagem()`. Ela é chamada em `abrirVanIA`, antes de enviar para a IA, só quando a imagem é uma URL e ainda não há ISBN lido localmente; o resultado vai para `window._versoIsbn` / `window._capaIsbn` (e só vale se a imagem ainda for a mesma). Para isso, a CSP (`connect-src`) do `admin.html` ganhou `https://*.ibb.co`. Se o ImgBB não responder com CORS, o domínio for outro ou o download falhar, o erro é ignorado e a IA segue tentando ler o ISBN sozinha, como antes. Em bibliotecas derivadas, aplique também a alteração da CSP.

#236 20/10/2026 07:47:34
Mudança nos arquivos `admin.html` e `README.md`
Descrição: A Vânia passa a usar a capa e o verso em conjunto, e cada um deles já basta para a análise. (1) O botão "Analisar com a Vân-IA" agora fica ativo quando existe capa OU verso (novos ou, na edição, os já salvos), e não só com a capa; ele também é atualizado ao escolher ou remover o verso. (2) O envio para a IA inclui só as imagens que existem, cada uma identificada ("Primeira imagem: CAPA", "Segunda imagem: VERSO", ou aviso de que a outra NÃO foi enviada). (3) O `VANIA_PROMPT` pede para usar as duas imagens juntas, procurando em uma o que faltar na outra: o título vem da capa e, sem capa, do verso; o ISBN é procurado no código de barras e no texto "ISBN" impresso, tanto na capa quanto no verso; `descricao_capa` fica vazia quando a capa não foi enviada, e o campo de descrição de acessibilidade só é preenchido se houver capa. (4) A leitura local do código de barras (`_lerIsbnDaImagem`, antes `_lerIsbnDoVerso`) agora também roda na CAPA e guarda o resultado em `window._capaIsbn`, limpo ao trocar/remover a capa. Ordem de prioridade do ISBN: barras do verso, barras da capa, texto lido pela IA (validado por dígito verificador). (5) A mensagem de sucesso informa o que foi analisado (capa, verso ou os dois). Na prática: dá para cadastrar só com o verso, e o ISBN é encontrado onde estiver.

#235 20/10/2026 07:50:00
Correção no arquivo `admin.html`
Descrição: Mesmo depois da correção #234, a Vânia seguia sem preencher o ISBN de alguns versos. A causa: a foto do verso é reduzida para no máximo 1080×1350 px antes de ir para a IA, e com isso os números impressos sob o código de barras ficam pequenos demais; se a IA errasse um único dígito, o dígito verificador falhava e o campo ficava vazio sem aviso. Agora o ISBN é lido direto das barras, no próprio navegador e na imagem original (antes da compressão), sem depender da IA: `_lerIsbnDoVerso()` usa o `BarcodeDetector` nativo (Chrome/Android) e, se ele não existir, a biblioteca ZXing (`@zxing/library@0.21.3`, carregada do jsDelivr, que já estava liberado na CSP). O resultado só é aceito se for EAN-13 começando por 978/979 com dígito verificador correto e fica em `window._versoIsbn`, que é limpo ao remover/trocar o verso ou limpar o formulário. Em `_vanIAPreencherFormulario`, o ISBN lido das barras tem prioridade sobre o devolvido pela IA, que continua como alternativa quando as barras não puderem ser lidas. Também foi trocado o exemplo do `VANIA_PROMPT` ("9 789893 751183", que era o ISBN de um livro real) por um número fictício ("9 781234 567897"), para a IA não repetir o exemplo. Na prática: ao enviar o verso, o ISBN passa a vir das barras e não depende mais de a IA enxergar os números pequenos.

#234 20/10/2026 07:31:13
Correção nos arquivos `admin.html` e `README.md`
Descrição: Ao analisar o verso de um livro, a Vânia preencheu o ISBN só com o último grupo do código de barras ("751183"), porque os números impressos sob as barras vêm separados em grupos ("9 789893 751183"). Duas correções. (1) No `VANIA_PROMPT`, a regra do campo `isbn` agora orienta a procurar o ISBN no código de barras do verso, juntar todos os grupos sem espaços (ISBN-13 com 13 dígitos começando por 978 ou 979, ou ISBN-10 com 10 caracteres, podendo terminar em X), escrever só números e nunca registrar apenas um pedaço, usando string vazia se não conseguir ler todos os dígitos. (2) No código, a nova função `_vanIAIsbnValido()` confere o ISBN devolvido pela IA antes de preencher o formulário: só é aceito se estiver completo (13 dígitos com prefixo 978/979 ou 10 caracteres) e com o dígito verificador correto; caso contrário, o campo ISBN fica vazio para ser digitado, em vez de receber um número errado. A validação vale apenas para o preenchimento pela IA, e o ISBN digitado manualmente não é alterado por ela. O README foi atualizado. Para aplicar em uma biblioteca já publicada, atualizar a regra `isbn` do `VANIA_PROMPT`, acrescentar `_vanIAIsbnValido()` e usá-la em `_vanIAPreencherFormulario()` no `admin.html`. Em termos simples: a Vânia agora lê o ISBN completo do código de barras e, se não tiver certeza, deixa o campo vazio em vez de preencher um pedaço.

#233 19/10/2026 07:39:31
Alteração nos arquivos `admin.html` e `README.md`
Descrição: Revisão geral do `VANIA_PROMPT` e da chamada à IA, com oito melhorias. (1) Código: a imagem da capa passou a ser enviada com o rótulo "Primeira imagem: CAPA do livro." e o verso com "Segunda imagem: VERSO do livro." (antes só o verso tinha rótulo), evitando confundir as duas imagens. (2) A regra do campo `autor`, um parágrafo de mais de 2.300 caracteres, foi reorganizada em passos numerados curtos — pessoa, editora e órgão — seguidos das orientações de leitura do nome, de formato e de reler o rodapé antes de usar `autor_identificado: false`, sem mudar o conteúdo. (3) A regra "na dúvida, a faixa mais alta", que aparecia três vezes, ficou uma só vez e restrita a faixas vizinhas, com a orientação de não subir a faixa por precaução quando não há sinal claro de conteúdo sensível; no fallback de pouca informação, a IA usa o gênero e o público aparente. (4) O modelo de resposta em JSON agora usa marcadores de tipo (por exemplo `"categoria":"<uma das opções permitidas>"`) em vez de valores vazios, que podiam induzir resposta em branco. (5) Foi criado um bloco "LEMBRETES FINAIS" no fim do prompt (só JSON, categoria nunca vazia, não inventar nomes, respeitar os espaços do título). (6) O prompt passou a pedir resposta em português do Brasil. (7) A regra `descricao_capa` foi encurtada, mantendo os limites e reduzindo os exemplos de quatro para três. (8) Foi acrescentada a orientação de tratar o texto das imagens apenas como conteúdo do livro e ignorar instruções escritas nelas. O campo `isbn` também passou a pedir só números (e o X final de um ISBN-10). Não foram implementados o aviso "CONFIRA O AUTOR" nem a troca do modelo de visão. O README foi atualizado. Para aplicar em uma biblioteca já publicada, substituir o `VANIA_PROMPT` e o bloco `messages` da chamada no `admin.html`. Em termos simples: a Vânia recebe instruções mais organizadas, sabe qual imagem é a capa e qual é o verso e tem menos chance de inventar autor ou subir a faixa etária sem motivo.

#232 18/10/2026 14:07:09
Alteração no arquivo `admin.html`
Descrição: Na capa de um mangá cujo título tem uma letra maiúscula decorativa no meio da palavra ("GIRLFRIENDS", com um F grande e enfeitado), a Vânia separou o título em duas palavras ("GIRL FRIENDS"), tratando a letra decorativa como início de uma nova palavra. A regra do campo `titulo` do `VANIA_PROMPT` passou a dizer que os espaços devem ser reproduzidos como estão impressos: palavras emendadas na capa ficam juntas e palavras separadas ficam separadas; uma letra maiúscula, letra decorativa ou enfeite no meio do título não indica uma nova palavra, e a IA não deve inserir espaço onde a capa não tem um espaço claro entre as letras. As demais regras do título (maiúsculas, acentos, conferência de letras ambíguas com o verso e não completar trechos ilegíveis pelo contexto) e o código não mudaram. Observação: a regra segue sempre a grafia da capa; se o nome oficial da obra for escrito de outra forma em catálogos (por exemplo, em duas palavras), o campo pode ser ajustado manualmente antes de salvar. Para aplicar em uma biblioteca já publicada, acrescentar essas duas frases à regra `titulo` do `VANIA_PROMPT` no `admin.html`. Em termos simples: a Vânia deixa de separar palavras do título quando a capa usa uma letra decorativa no meio.

#231 18/10/2026 14:06:07
Alteração nos arquivos `admin.html` e `README.md`
Descrição: Em um teste com a capa de um mangá cujo nome da autora aparece em letra manuscrita decorativa ("Milk Morinaga"), a Vânia respondeu nomes parecidos de autores conhecidos (Yoshinaga ou Yoshimura): em vez de ler as letras, o modelo completou o nome pela memória. A regra do campo `autor` do `VANIA_PROMPT` ganhou quatro orientações. (1) Transcrever o nome da pessoa letra por letra, usando só o que for legível; em assinatura manuscrita, nome estilizado ou fonte decorativa, não completar, corrigir nem trocar por um autor famoso ou parecido. (2) Se o nome também aparecer no verso, na ficha técnica ou no expediente em letra impressa, usar essa grafia, mais legível que a da capa. (3) Havendo dúvida real sobre as letras do nome, não registrar um palpite: passar para a editora (opção 2) ou, sem ela, para o órgão (opção 3), pois um autor errado é pior que a editora correta. (4) Ordem de leitura: antes de decidir, ler o texto ao lado do título e nos cantos da capa, depois o verso, e só então escolher. A ordem de preferência (pessoa, editora, órgão) e as demais regras do prompt não mudaram, e o código não foi alterado. O README foi atualizado. Observação: a regra evita nomes inventados, mas não garante que a IA consiga ler uma assinatura muito decorativa; nesses casos o campo pode vir com a editora e deve ser conferido antes de salvar. Para aplicar em uma biblioteca já publicada, acrescentar essas orientações à regra `autor` do `VANIA_PROMPT` no `admin.html`. Em termos simples: a Vânia deixa de chutar nomes de autores em assinaturas difíceis e usa a editora quando não conseguir ler.

#230 18/10/2026 14:00:58
Correção no arquivo `admin.html`
Descrição: Ao colar um ISBN com traços no campo ISBN (por exemplo, 978-85-359-0277-5), o texto era cortado depois do "02" (ficava 9788535902). A causa era o atributo `maxlength="13"` adicionado no #229: o navegador corta o texto colado em 13 caracteres, contando os traços, antes de a função `_sanitizarIsbn()` limpar o valor, então os últimos dígitos se perdiam. O `maxlength` foi removido do `<input id="isbn">`; o limite de 13 caracteres continua sendo aplicado por `_sanitizarIsbn()`, mas só depois de remover traços, espaços e outros caracteres, de modo que 978-85-359-0277-5 vira 9788535902775 completo. As demais regras (apenas números, X somente como último caractere de um ISBN-10) não mudaram. Para aplicar em uma biblioteca já publicada, remover o `maxlength` do campo ISBN no `admin.html`. Em termos simples: colar o ISBN com traços agora funciona e o número fica completo.

#229 18/10/2026 13:56:28
Alteração no arquivo `admin.html`
Descrição: O campo ISBN do formulário de livro (cadastro e edição) passou a aceitar apenas números, sem traços, espaços ou outros caracteres. A função `_sanitizarIsbn()` limpa o valor enquanto o usuário digita ou cola (e ao sair do campo) e também antes de salvar, de modo que "978-85-359-0277-5" vira "9788535902775", inclusive para ISBN com hífens já cadastrado e aberto para edição. A única exceção é a letra X, aceita somente como último caractere de um ISBN-10: nesse formato antigo (10 caracteres), o dígito verificador pode valer 10 e é impresso como X, e remover a letra alteraria o número do livro; em qualquer outra posição ou tamanho a letra é descartada. O limite é de 13 caracteres (o ISBN-13 atual, formado só por números), definido com `maxlength` e na própria função, e o campo ganhou o texto de ajuda "SOMENTE NÚMEROS, SEM TRAÇOS". A comparação de ISBN do aviso de livro parecido (`_normalizarIsbnDuplicidade()`) não mudou. Para aplicar em uma biblioteca já publicada, acrescentar `_sanitizarIsbn()` e o ouvinte do campo no `admin.html`, usar a função no `payload` de salvar e ajustar o `<input id="isbn">`. Em termos simples: o ISBN só aceita números (e o X final de ISBNs antigos), sem traços.

#228 18/10/2026 13:52:33
Alteração nos arquivos `admin.html` e `README.md`
Descrição: A detecção de "livro parecido" no cadastro manual passou a considerar também o ISBN. Antes, só era parecido o livro com o mesmo título e autor. Agora é parecido o livro que tiver o mesmo título e autor OU o mesmo ISBN. O ISBN é comparado só pelos dígitos e pela letra X (hífens e espaços são ignorados) por `_normalizarIsbnDuplicidade()`, e um ISBN não informado nunca gera coincidência. Se mais de um livro for parecido, o aviso mostra o que bate nos dois critérios e, não havendo, o primeiro encontrado. A frase do aviso agora informa o motivo: "Já existe um livro cadastrado com o mesmo título e autor.", "...com o mesmo ISBN." ou "...com o mesmo título e autor e com o mesmo ISBN.". A verificação continua ocorrendo apenas no cadastro de livro novo (não na edição), antes do envio das imagens, e os botões CANCELAR, NOVO e EDITAR EXISTENTE não mudaram. O README, que ainda descrevia um mecanismo antigo de duplicidade (`_detectarDuplicata`, "Juntar Quantidade"), foi atualizado para descrever o aviso atual. Para aplicar em uma biblioteca já publicada, repetir a mudança em `_confirmarLivroParecido()` e acrescentar `_normalizarIsbnDuplicidade()` no `admin.html`. Em termos simples: se o ISBN do livro novo já existir no acervo, o sistema avisa como faz quando título e autor se repetem.

#227 18/10/2026 13:49:23
Alteração nos arquivos `admin.html` e `style.css`
Descrição: No aviso "Livro parecido encontrado" (quando o cadastro detecta um livro com o mesmo título e autor), o botão "EDITAR" passou a se chamar "EDITAR EXISTENTE", deixando claro que abre a edição do livro já cadastrado. As miniaturas de capa e verso dos dois painéis, "LIVRO QUE SERÁ CADASTRADO" e "LIVRO JÁ EXISTENTE", agora usam o mesmo componente do acervo e do cadastro de livros (`.book-cover-wrap`, com logo de fundo e rótulo "SEM CAPA" ou "SEM VERSO" embaixo) na proporção 4:5, com 116 px de altura e 92,8 px de largura, centralizadas na coluna. Antes eram caixas largas de 112 px de altura, com apenas o texto "SEM CAPA", sem o logo e fora da proporção. A função `_criarMidiaLivroParecido()` foi reescrita para montar esse componente (a imagem aparece com `has-image` ao carregar e, se a imagem falhar, volta ao estado `sem-capa`) e deixou de receber a classe de estado vazio; no `style.css`, as regras antigas `.livro-parecido-capa` e `.livro-parecido-sem-imagem` foram substituídas por `.livro-parecido-midia .book-cover-wrap`. O restante do aviso (campos, botões CANCELAR e NOVO, abertura da edição) não mudou. Para aplicar em uma biblioteca já publicada, repetir essas mudanças nos dois arquivos. Em termos simples: no aviso de livro parecido, as capas ficam iguais às do acervo, em 4:5, e o botão agora é EDITAR EXISTENTE.

#226 18/10/2026 08:50:22
Alteração no arquivo `style.css`
Descrição: A miniatura da capa na reserva do site público (modal "Reservar livro") e nas reservas pendentes do painel admin passou a seguir a proporção 4:5, a mesma do acervo e do cadastro de livros. A regra `.reserva-livro-capa-wrap` media 96×148 px (proporção de cerca de 0,65) e agora usa a variável `--reserva-capa-h: 150px`, com largura `calc(var(--reserva-capa-h) * 4 / 5)` (120 px), altura 150 px e `aspect-ratio: 4 / 5`, no mesmo padrão de cálculo das miniaturas do acervo. O `flex-shrink: 0` evita que a miniatura seja espremida em telas estreitas. O logo de fundo, o rótulo "SEM CAPA", o corte da imagem (`object-fit: cover`) e a centralização não mudaram. Como as duas telas usam a mesma classe, a alteração vale para ambas. Para aplicar em uma biblioteca já publicada, trocar a regra `.reserva-livro-capa-wrap` no `style.css`. Em termos simples: a capa na reserva agora tem o mesmo formato 4:5 do acervo.

#225 18/10/2026 08:47:25
Alteração nos arquivos `index.html`, `admin.html` e `style.css`
Descrição: Padronizado o visual da reserva no site público (modal "Reservar livro") e no painel (aba Reservas pendentes). No `index.html`, o título e o autor deixaram de aparecer ao lado da miniatura e passaram a ser blocos, como as demais informações do livro: "NOME DO LIVRO" e "AUTOR" ocupam a largura toda, seguidos de VOLUME, EDIÇÃO, ISBN, CLASSIFICAÇÃO INDICATIVA e EXEMPLARES, nos mesmos rótulos usados na aba Reservas do admin. Foram removidos o bloco `reserva-livro-identificacao` e o preenchimento dos campos `reservaLivroTitulo` e `reservaLivroInfo`; a função `_preencherDetalhesLivroReserva()` passou a incluir título e autor na lista de campos (com a classe `reserva-livro-meta-item--largo` para largura total). A miniatura da capa ficou centralizada no topo (`.reserva-livro-resumo` agora é `display: flex` com `justify-content: center`). No `admin.html`, cada cartão de reserva pendente passou a exibir a miniatura da capa, centralizada, logo abaixo do título "LIVRO" e acima dos campos, usando a capa e o texto alternativo já carregados por `DB.getReservasPendentes()` e, quando o livro não tem capa, o mesmo visual "SEM CAPA" do site público, reaproveitando as classes de `style.css`. No `style.css`, foram removidas as regras `.reserva-livro-titulo` e `.reserva-livro-info`, que não são mais usadas. Para aplicar em uma biblioteca já publicada, repetir essas mudanças nos três arquivos. Em termos simples: a reserva do index e a do admin agora têm a mesma organização, com a capa centralizada e as informações em bloquinhos.

#224 18/10/2026 00:21:10
Correção nos arquivos `style.css` e `index.html`
Descrição: No modal "Reservar livro" do site público, a miniatura de um livro sem capa ficava estranha: o rótulo "SEM CAPA" era centralizado na vertical e se sobrepunha ao logo exibido como fundo, em cor cinza-clara pouco legível, diferente do cartão da lista de livros. O rótulo `.reserva-livro-sem-capa` agora usa o mesmo visual do `.book-cover-label` dos cartões: posicionado de forma absoluta na parte de baixo da miniatura (`inset: 0`, `justify-content: flex-end`, 10px de espaço inferior), em branco, com 9px, negrito, espaçamento entre letras e sombra de texto, sem capturar cliques. Para isso o contêiner `.reserva-livro-capa-wrap` passou a ser `position: relative`, e o texto no `index.html` passou a ser `SEM<br>CAPA` (duas linhas, como na lista). O logo de fundo, o tamanho da miniatura (96×148) e o comportamento quando há capa real não mudaram, e o tema escuro continua usando o mesmo fundo. Para aplicar em uma biblioteca já publicada, repetir essas mudanças no `style.css` e no `index.html`. Em termos simples: no reservar livro, a miniatura sem capa mostra o logo com o texto SEM CAPA embaixo, igual ao cartão da lista.

#223 17/10/2026 23:58:51
Correção no arquivo `index.html`
Descrição: No modal de reserva pública, as caixas FUNCIONÁRIO e VISITANTE ("TIPO DE CADASTRO") podiam ser marcadas ao mesmo tempo, e a busca passava a considerar funcionários e visitantes juntos ("BUSCANDO: FUNCIONÁRIOS E VISITANTES."). Agora elas são exclusivas: ao marcar uma, a outra é desmarcada automaticamente pelo ouvinte `change` das duas caixas, antes de atualizar o texto de ajuda e refazer a busca. Se nenhuma estiver marcada, a busca continua sendo por alunos (comportamento de `_tiposBuscaReserva()`, que não mudou). O restante da reserva (regras, seleção da pessoa e confirmação) não mudou. Para aplicar em uma biblioteca já publicada, acrescentar esse bloco de desmarcação no ouvinte `change` das caixas `reservaFiltroFuncionario` e `reservaFiltroVisitante` do `index.html`. Em termos simples: na reserva só dá para marcar funcionário ou visitante, nunca os dois, e sem nenhum marcado a busca é por alunos.

#222 17/10/2026 23:51:02
Adição nos arquivos `admin.html` e `README.md`
Descrição: Cada cartão da aba Lista de Pessoas passou a exibir um selo verde com o total de livros que a pessoa já pegou emprestados, somando empréstimos devolvidos e ativos ("📚 12 LIVROS", "📚 1 LIVRO" no singular e "📚 0 LIVROS" quando nunca pegou). O mesmo livro pego mais de uma vez conta mais de uma vez, pois cada empréstimo é uma retirada. O selo é lido por leitores de tela como "N livros emprestados no total". A contagem é feita por `_carregarContagemEmprestimos()`, chamada sempre que a lista é carregada: busca a tabela `emprestimos` em páginas de 1.000 linhas (antes, o código já somava o histórico, mas buscava só as primeiras 1.000 linhas, limite padrão do Supabase, e o resultado nem era exibido) e soma por `pessoa_id`. Empréstimos antigos sem `pessoa_id` são somados pelo nome, mas somente quando o nome é único na lista de pessoas, para não misturar homônimos. `_totalLivrosPessoa(p)` devolve o total de cada pessoa e, se a contagem falhar, o selo simplesmente não é exibido (nunca mostra um zero falso). O bloco antigo que montava essa soma em `empsAtivosNomeCache` foi substituído pela nova variável `contagemEmprestimos`. Não há alteração no banco, no `supabase_setup.sql` nem no `bibmaker.claude`: basta substituir o `admin.html`. O README foi atualizado (tabela de abas e descrição da aba Lista de Pessoas). Para aplicar em uma biblioteca já publicada, substituir o `admin.html` ou repetir essas mudanças. Em termos simples: na Lista de Pessoas, cada pessoa mostra quantos livros já pegou emprestados.

#221 17/10/2026 23:44:57
Alteração nos arquivos `VERSION.json`, `index.html`, `admin.html`, `bibcore.js`, `README.md` e `LICENCE.md`
Descrição: A versão do projeto base BibVânia Online passou de 2.0 para 3.0. O campo `bibvania` do `VERSION.json` agora é `3.0`, e o mesmo número foi atualizado nos três rodapés (um no `index.html` e dois no `admin.html`, na tela de login e no painel), no comentário `@version` do `bibcore.js` e nos títulos do `README.md` e do `LICENCE.md`. As metatags `version` e `versaobase` do `index.html` e do `admin.html` não precisaram mudar, pois são preenchidas na abertura da página a partir do `VERSION.json`. A versão que o painel exibe e o aviso de atualização, que compara o `VERSION.json` local com o do projeto base publicado, passam a refletir a 3.0; bibliotecas derivadas que ainda estão na versão base 2.0 passarão a ver o aviso de que há uma versão nova. O histórico deste CHANGELOG e as menções a "Apache 2.0" (licença do Supabase) não foram alterados. Para aplicar em uma biblioteca derivada, atualizar pelo `bibmaker.claude` com o `bibconfig.claude`, que registra a nova versão base no `VERSION.json` dela. Em termos simples: o projeto BibVânia agora está na versão 3.0 em todos os sites e arquivos.

#220 17/10/2026 23:28:38
Alteração no arquivo `bibmaker.claude`
Descrição: Incluída no `bibmaker.claude` a regra do rodapé das bibliotecas derivadas. Em todo rodapé `site-footer` (um no `index.html`, um na tela de login e um no painel do `admin.html`), logo abaixo da linha que descreve o site e acima da linha de versão, lançamento e licença, deve haver a linha de atribuição: "Derivado do Projeto BibVânia", com hiperlink para o repositório `https://github.com/limaoruan/bibvania`, seguida de "© 2026 Ruan Oliveira Lima", com hiperlink para o Instagram do autor `https://www.instagram.com/ruanoliveiralima_/`, ambos abrindo em nova aba e reaproveitando o estilo dos links já existentes (classe `license-link`). O ano 2026 é o do projeto BibVânia e não é substituído pelos dados da biblioteca derivada. A regra vale na geração e em toda atualização (o Claude confere os três rodapés, adiciona a linha se faltar e consolida se estiver duplicada ou alterada) e não se aplica ao projeto original, cujo rodapé não muda. Para aplicar em uma biblioteca já publicada, acrescentar essa linha nos três rodapés do `index.html` e do `admin.html`. Em termos simples: as bibliotecas derivadas passam a creditar o projeto BibVânia e seu autor no rodapé, com links.

#219 17/10/2026 17:31:30
Alteração no arquivo `admin.html`
Descrição: Reescrita a regra do campo `descricao_capa` do `VANIA_PROMPT` e ampliado o limite da descrição da capa (texto alternativo para leitores de tela) de 125 para 200 caracteres. Mudanças no prompt: (1) a descrição não repete mais o título nem o autor, que já estão em outros campos, e não começa com "Capa de"; (2) passa a descrever o que se vê, em ordem de prioridade: cena ou elemento principal (quem ou o que aparece e o que faz), cores dominantes e estilo visual (ilustração, desenho animado, fotografia, colagem, letras grandes) e, se sobrar espaço, um elemento secundário; (3) proíbe interpretação subjetiva (emoções, tom, significado) e invenção de detalhes; (4) para capas só de texto, orienta a descrever o fundo e as letras; (5) os dois exemplos anteriores, de mesmo formato, foram trocados por quatro exemplos de estilos diferentes (ilustração, fotografia, só texto e quadrinhos); (6) a descrição pode ter uma ou duas frases curtas, com alvo de 110 a 170 caracteres e limite de 200. No código: a função `_ajustarDescricaoCapa()`, que já cortava o texto no fim de uma palavra completa como rede de segurança, passou a usar 200 caracteres (corte em 199, mínimo de 100 antes do último espaço), e o campo `capaAltText` passou a `maxlength="200"`, com 3 linhas e altura de 5,5rem para caber o texto maior. A coluna `alt_text` do banco é `TEXT`, sem limite, então não exige mudança no SQL. A regra de autor, a classificação e o restante do prompt não mudaram. Para aplicar em uma biblioteca já publicada, substituir a regra `descricao_capa` do `VANIA_PROMPT`, trocar 125 por 200 em `_ajustarDescricaoCapa()` e ajustar o `<textarea id="capaAltText">`. Em termos simples: a descrição da capa fica mais útil, mais longa e sem repetir título e autor.

#218 17/10/2026 17:29:19
Alteração nos arquivos `admin.html` e `README.md`
Descrição: Adicionado ao `VANIA_PROMPT` um guia amplo de gêneros e faixas etárias, "GÊNEROS — PONTO DE PARTIDA", para apoiar a sugestão de classificação indicativa, principalmente quando não há sinopse legível. O guia lista, para cada faixa (LIVRE, 6, 10, 12, 14, 16 e 18 anos), os gêneros que tendem a ela: livros de imagens, cantigas, alfabetização, colorir e didáticos na faixa livre; infantil ilustrado e quadrinhos infantis aos 6 anos; infantojuvenil, fantasia leve e mangás de aventura aos 10; juvenil, distopia e terror juvenis aos 12; romance com sexualidade sugerida e suspense intenso aos 14; romance adulto com cenas de sexo e terror psicológico aos 16; e erótico, gore e violência ou sexo explícitos aos 18. O texto deixa claro que são tendências, que a sinopse e os temas visíveis sempre prevalecem sobre o gênero e que, se o gênero couber em duas faixas, vale a mais alta. A regra do campo `categoria` agora remete a esse guia no item (2) da ordem de evidência. A lista de critérios do ClassInd e as demais regras do prompt não mudaram. O README foi atualizado. Para aplicar em uma biblioteca já publicada, acrescentar a referência ao guia no item (2) da regra `categoria` e inserir o bloco "GÊNEROS — PONTO DE PARTIDA" antes da frase sobre dúvida entre duas classificações. Em termos simples: a Vânia agora tem uma tabela de gêneros para ajudar a escolher a faixa quando o livro não traz sinopse.

#217 17/10/2026 17:21:30
Alteração no arquivo `admin.html`
Descrição: A regra do campo `categoria` do `VANIA_PROMPT` deixou de permitir resposta vazia. No item (3) da ordem de evidência definida no #216, antes a IA deixava a categoria vazia quando as informações visíveis não permitiam avaliar o conteúdo com segurança. Agora, quando as informações forem escassas, a IA deve escolher sempre a faixa etária mais provável com base no que for visível (título, ilustração, gênero, público aparente) e, havendo dúvida entre duas faixas, a mais alta (mais restritiva), mantendo o aviso de não inventar temas. A ordem sinopse, depois demais elementos da capa e do verso, a lista de critérios por faixa e o código de preenchimento do formulário não mudaram. Para aplicar em uma biblioteca já publicada, substituir o item (3) da regra do campo `categoria` no `VANIA_PROMPT` do `admin.html`. Em termos simples: a Vânia sempre sugere uma classificação, mesmo com poucas informações na capa.

#216 17/10/2026 17:20:01
Alteração nos arquivos `admin.html` e `README.md`
Descrição: A regra do campo `categoria` no `VANIA_PROMPT` agora define uma ordem de evidência para sugerir a classificação indicativa: (1) a sinopse (texto de apresentação da obra no verso, quando legível) é a principal forma de verificação — a IA avalia os temas, conflitos e situações descritos (violência, sexo e nudez, drogas), usa o tema mais forte, e a capa apenas complementa; (2) se não houver sinopse legível, ou se o verso não tiver sido enviado, a IA usa os demais elementos da capa e do verso (título, ilustrações, frases de chamada, indicações de público ou faixa etária, coleção, gênero e outros textos visíveis); (3) se mesmo assim não for possível avaliar com segurança, a categoria fica vazia. Foi acrescentado que a IA não deve inventar temas que não estejam visíveis nem informados. Permanecem inalteradas a lista de critérios por faixa etária e a regra de escolher a faixa mais alta em caso de dúvida. O README foi atualizado. Para aplicar em uma biblioteca já publicada, substituir a regra do campo `categoria` no `VANIA_PROMPT` do `admin.html`. Em termos simples: a Vânia passa a classificar principalmente pela sinopse e, sem ela, pelos outros elementos da capa.

#215 16/10/2026 23:21:20
Correção no arquivo `admin.html`
Descrição: No computador, as miniaturas da capa e do verso no formulário de livro (Novo Livro / editar livro) ficavam encostadas à esquerda de cada coluna em vez de centralizadas. A regra `.livro-imagem-upload .book-cover-wrap{margin-left:auto;margin-right:auto}` existia apenas dentro do `@media (max-width:560px)`, por isso só funcionava no celular. Ela foi movida para fora do `@media`, valendo em todas as larguras, e o `@media` manteve só as regras exclusivas do celular. O tamanho das miniaturas, os botões e o restante do layout não mudaram. Para aplicar em uma biblioteca já publicada, mover essa regra para fora do `@media (max-width:560px)` no CSS do `admin.html`. Em termos simples: no computador, a capa e o verso agora ficam centralizados, como no celular.

#214 16/10/2026 22:03:15
Alteração no arquivo `admin.html`
Descrição: O rótulo do campo de ano passou a indicar a faixa válida também no Ensino Fundamental, como já era feito no Ensino Médio. No cadastro de pessoa (`labelAnoPessoa`) e na edição de pessoa (`labelEditAnoPessoa`), o texto "ANO *" virou "ANO (1-9) *" no Ensino Fundamental, enquanto o Ensino Médio continua "ANO (1, 2 ou 3) *". A alteração vale no texto inicial dos dois formulários e nas funções que trocam o rótulo ao mudar o nível de ensino (`selecionarNivel`, `editSelecionarNivel` e as versões legadas do módulo ES). O limite do campo (`max` 9 no Fundamental e 3 no Médio) e a validação não mudaram. Para aplicar em uma biblioteca já publicada, trocar "ANO *" por "ANO (1-9) *" nesses rótulos do `admin.html`. Em termos simples: ao cadastrar ou editar um aluno do Fundamental, o campo agora mostra "ANO (1-9)".

#213 16/10/2026 21:58:28
Correção no arquivo `admin.html`
Descrição: Na aba Lista de Pessoas, ao editar um cadastro e trocar a categoria (ALUNO, FUNCIONÁRIO ou VISITANTE), os campos continuavam sendo os da categoria anterior (por exemplo, marcar FUNCIONÁRIO em um aluno mantinha nível de ensino, ano e turma). Havia duas causas. (1) Existiam duas versões de `window.toggleEditTipoPessoa`: a correta, no script UMD, e uma antiga no módulo ES, que só conhecia aluno/funcionário e procurava o elemento inexistente `editGrpEnsinoMedio`; como o módulo ES executa depois, a versão antiga sobrescrevia a correta e, ao falhar nesse elemento, interrompia a troca dos campos (e a lista de sexo). A versão antiga foi removida do módulo ES. (2) Na versão correta, a exclusividade entre FUNCIONÁRIO e VISITANTE não sabia qual caixa tinha acabado de ser marcada, então marcar VISITANTE com FUNCIONÁRIO já marcado desfazia o VISITANTE. Agora os dois checkboxes passam a si mesmos (`toggleEditTipoPessoa(this)`) e a função desmarca o outro conforme a caixa que mudou. O fluxo de salvar não mudou. Para aplicar em uma biblioteca já publicada, repetir essas três mudanças no `admin.html`. Em termos simples: ao editar uma pessoa, escolher aluno, funcionário ou visitante agora mostra os campos certos de cada categoria, em qualquer direção.

#212 16/10/2026 21:09:33
Correção no arquivo `admin.html`
Descrição: No celular, o botão ESCOLHER CAPA abria o modal "ESCOLHER IMAGEM" com as opções CÂMERA e GALERIA, mas o botão ESCOLHER VERSO (e TROCAR VERSO) abria direto o seletor de arquivos do aparelho, sem a opção de câmera. O código do modal estava embutido em `abrirSeletorCapa()`. Ele foi extraído para a função `_escolherOrigemImagem(input)`, que recebe o campo de arquivo (`_inpCapa` ou `_inpVerso`): no celular abre o modal com CÂMERA, GALERIA e CANCELAR (a câmera usa `capture="environment"`; a galeria remove o `capture`); no desktop abre a galeria diretamente, como antes. `abrirSeletorCapa()` e `abrirSeletorVerso()` agora chamam essa mesma função, e o modal passou a usar o id `_modalOrigemImagem` (antes `_modalOrigemCapa`). O restante do fluxo (validação, compressão, pré-visualização e envio à Vânia) não mudou. Para aplicar em uma biblioteca já publicada, repetir essa extração no `admin.html`. Em termos simples: o ESCOLHER VERSO agora oferece câmera e galeria, igual ao ESCOLHER CAPA.

#211 16/10/2026 21:03:13
Alteração nos arquivos `admin.html` e `README.md`
Descrição: A Vânia respondia "autor não identificado" em duas capas reais: uma cuja única indicação era o nome da editora em letras pequenas ao lado de um logotipo no rodapé ("Ciranda Cultural") e uma da Turma da Mônica em que o autor aparecia só como assinatura manuscrita ("Mauricio") e dentro do logotipo "Mauricio de Sousa Editora", no canto inferior esquerdo. A regra do campo `autor` do `VANIA_PROMPT` foi reescrita: (1) a palavra "selo" saiu da lista do que não se acrescenta (ficou só cidade, CNPJ ou slogan), pois fazia o modelo descartar o logotipo da editora; (2) a assinatura manuscrita, o nome estilizado ou o logotipo com nome de pessoa passam a contar como autor, completando o nome inteiro quando ele aparecer em outro lugar da capa ou do verso (ex.: MAURICIO DE SOUSA); (3) para a editora, entrou o exemplo CIRANDA CULTURAL e a orientação de procurar nome de editora, assinaturas e logotipos no rodapé, nos cantos e no verso, mesmo em letras pequenas, lembrando que o nome ao lado de um símbolo ou logotipo conta como editora; (4) subtítulos (ex.: "Uma aventura em graphic novel") e nomes de coleção não são autor nem editora; (5) antes de usar `autor_identificado: false`, a IA deve reler o rodapé, os cantos e o verso procurando assinatura, logotipo ou nome de editora. A ordem de preferência (pessoa, editora, órgão), a regra de `descricao_capa` e o código `_vanIAPreencherFormulario()` não mudaram. O README foi atualizado para refletir a nova regra. Para aplicar em uma biblioteca já publicada, substituir a linha do campo `autor` no `VANIA_PROMPT` do `admin.html`. Em termos simples: a Vânia agora enxerga editora em logotipo pequeno e autor em assinatura, e só diz que não achou autor depois de reler a capa.

#210 16/10/2026 08:33:20
Alteração nos arquivos `README.md`, `supabase_setup.sql` e `bibmaker.claude`
Descrição: Documentado como colocar, trocar e excluir o username (nome exibido no painel) do bibliotecário, que fica no `user_metadata` do Supabase Auth, agora identificando o usuário pelo UUID (coluna "User UID" em Authentication → Users) em vez do e-mail. As quatro consultas — COLOCAR (`|| '{"nome":"Nome"}'`), TROCAR (`|| '{"nome":"Novo Nome"}'`), EXCLUIR (`raw_user_meta_data - 'nome'`, o painel volta a mostrar "OLÁ, ADMIN!" sem alterar foto nem login) e CONFERIR (`SELECT ... raw_user_meta_data->>'nome'`) — foram adicionadas: no `README.md` (passo 10 da instalação e seção "Criar o usuário bibliotecário"), no `supabase_setup.sql` (seção 11, em um bloco só de comentários, para o script continuar seguro de rodar por inteiro; basta tirar o "-- " da linha desejada) e no `bibmaker.claude` (passo 2 do guia de configuração, orientando o Claude a conduzir o usuário e a atender pedidos futuros de troca ou exclusão). Para aplicar em uma biblioteca já publicada, basta usar essas consultas no SQL Editor; nenhum arquivo do site precisa ser trocado. Os textos informam que o painel mostra só o primeiro nome ("OI, nome!"). Em termos simples: agora há instruções prontas para definir, mudar e apagar o nome do bibliotecário pelo UUID.

#209 16/10/2026 08:13:03
Alteração nos arquivos `admin.html` e `README.md`
Descrição: Invertida a ordem de preferência do campo `autor` no `VANIA_PROMPT` definida no #208. A ordem agora é: (1) o autor principal (pessoa); (2) se não houver autor pessoa, a editora impressa na capa ou no verso, escrita como aparece (ex.: Editora Moderna, Companhia das Letras); (3) se também não houver editora visível, o órgão ou instituição responsável pela obra, quando impresso na capa ou no verso (ex.: Ministério da Saúde, Secretaria de Educação do Ceará). Antes, o órgão responsável vinha antes da editora. Continuam valendo um único nome em maiúsculas, sem cidade, CNPJ, selo ou outros créditos, e `autor_identificado: false` com `autor` vazio somente quando nenhum dos três estiver visível. Os textos que citam "pessoa, órgão ou editora" na regra de `descricao_capa` e no `autor` foram ajustados para "pessoa, editora ou órgão", e a frase correspondente do README foi atualizada. Para aplicar em uma biblioteca já publicada, trocar os itens (2) e (3) do campo `autor` no `VANIA_PROMPT` do `admin.html`. Em termos simples: sem autor na capa, a Vânia usa primeiro a editora e, só se não houver editora, o órgão responsável.

#208 16/10/2026 08:11:30
Alteração nos arquivos `admin.html` e `README.md`
Descrição: A análise da capa com IA (botão Vânia) deixava muitos livros sem autor quando a capa só trazia a editora ou um órgão responsável, porque o `VANIA_PROMPT` mandava deixar o campo `autor` vazio e marcar `autor_identificado: false` sempre que não houvesse autor pessoa. A regra do campo `autor` agora segue uma ordem de preferência: (1) o autor principal (pessoa), como antes; (2) se não houver autor pessoa, o órgão ou instituição responsável impresso na capa ou no verso (ex.: Ministério da Saúde, Secretaria de Educação); (3) se também não houver, a editora impressa na capa ou no verso, escrita como aparece. Continua valendo um único nome em maiúsculas, sem cidade, CNPJ, selo ou outros créditos. Só quando nenhum dos três estiver visível a IA deixa `autor` vazio e usa `autor_identificado: false` (o que marca "N/A" via `_sincAutorNaoId`). A regra da `descricao_capa` também foi ajustada: o item (1) passa a citar o nome registrado no campo `autor` (pessoa, órgão ou editora) e só escreve "autor não identificado" se esse campo ficar vazio. O código `_vanIAPreencherFormulario()` não mudou, pois já preenche o campo `autor` quando `autor_identificado` não é `false`. O README foi atualizado para refletir a nova regra. Para aplicar em uma biblioteca já publicada, substituir esses dois trechos do `VANIA_PROMPT` no `admin.html`. Em termos simples: se o livro não tiver autor na capa, a Vânia passa a preencher o campo com o órgão responsável ou com a editora, em vez de deixar vazio.

#207 16/10/2026 08:06:00
Alteração nos arquivos `.github/workflows/manter-supabase-ativo.yml` e `README.md`
Descrição: Revertida a mudança do #206: o workflow "Manter Supabase ativo" voltou a rodar duas vezes por semana, às segundas e quintas-feiras, mantendo o horário de 00:00 de Brasília (03:00 UTC) definido no #205. O cron voltou de `0 3 * * 1` para `0 3 * * 1,4`, e os textos do comentário do arquivo e do README voltaram a dizer "duas vezes por semana". A margem fica de no máximo cerca de 4 dias entre execuções, bem abaixo do prazo de ~7 dias de inatividade em que o plano gratuito do Supabase pausa o projeto. Para aplicar em uma biblioteca já publicada, basta trocar a linha do `cron` no arquivo do repositório. Em termos simples: a consulta que mantém o Supabase ativo roda de novo às segundas e quintas, à meia-noite de Brasília.

#206 16/10/2026 08:03:00
Alteração nos arquivos `.github/workflows/manter-supabase-ativo.yml` e `README.md`
Descrição: O workflow "Manter Supabase ativo" passou a rodar apenas uma vez por semana, às segundas-feiras às 00:00 no horário de Brasília (03:00 UTC): o cron mudou de `0 3 * * 1,4` para `0 3 * * 1`, e os textos do comentário do arquivo e do README foram ajustados de "duas vezes por semana" para "uma vez por semana". Para aplicar em uma biblioteca já publicada, basta trocar a linha do `cron` no arquivo do repositório. Observação: o plano gratuito do Supabase pausa projetos após cerca de 7 dias sem atividade; com uma execução por semana a margem é curta, e um atraso do GitHub ou uma execução falha pode deixar passar o prazo. Em termos simples: a consulta que mantém o Supabase ativo agora roda só toda segunda-feira, à meia-noite de Brasília.

#205 16/10/2026 07:59:59
Alteração no arquivo `.github/workflows/manter-supabase-ativo.yml`
Descrição: O horário da execução automática do workflow "Manter Supabase ativo" passou de `17 9 * * 1,4` (09:17 UTC, 06:17 em Brasília) para `0 3 * * 1,4`, que corresponde a 00:00 no horário de Brasília (UTC-3, o Brasil não usa horário de verão), às segundas e quintas-feiras. O agendamento do GitHub Actions é sempre em UTC, por isso o cron usa 03:00. Foi adicionado um comentário no arquivo explicando a conversão. Para aplicar em uma biblioteca já publicada, basta trocar a linha do `cron` no arquivo do repositório. Em termos simples: a consulta que mantém o Supabase gratuito ativo agora roda à meia-noite de Brasília, às segundas e quintas.

#204 16/10/2026 07:57:40
Alteração no arquivo `.github/workflows/manter-supabase-ativo.yml`
Descrição: Eliminados os dois avisos que apareciam ao rodar o workflow "Manter Supabase ativo" (a execução já terminava com sucesso). `actions/checkout@v4` foi atualizado para `actions/checkout@v5`, que roda nativamente no Node 24 (o aviso "Node.js 20 is deprecated" deixa de aparecer), e `runs-on: ubuntu-latest` foi fixado em `runs-on: ubuntu-24.04`, para o workflow não mudar de sistema quando o rótulo `ubuntu-latest` migrar para o Ubuntu 26 em 19/10/2026. O restante do workflow (cron às segundas e quintas, consulta pública à tabela `livros`) não mudou. Para aplicar em uma biblioteca já publicada, basta editar essas duas linhas no arquivo do repositório. Em termos simples: o workflow que mantém o Supabase gratuito ativo continua igual, só sem os avisos do GitHub.

#203 16/10/2026 07:39:14
Alteração nos arquivos `admin.html`, `supabase_setup.sql`, `README.md` e `bibmaker.claude`
Descrição: Nome e foto de perfil do admin deixaram de ser gravados na tabela `admins` e passaram a ficar no `user_metadata` do Supabase Auth (campos `nome` e `foto_url`). Isso elimina o erro "new row violates row-level security policy for table admins" ao enviar a foto, pois o usuário logado sempre pode atualizar o próprio `user_metadata` (`auth.updateUser`), sem tabela nem política de acesso própria. No `admin.html`: `_carregarAdminPerfil()` lê `user.user_metadata`; o envio e a exclusão de foto usam `sb.auth.updateUser({ data: { foto_url } })` (que mescla com o nome já existente); o login lê o nome de `loginData.user.user_metadata.nome`; sem nome cadastrado, o painel continua exibindo "OLÁ, ADMIN!". No `supabase_setup.sql`: removidas a tabela `admins` e suas três políticas (seção 11 virou apenas uma nota com o SQL para definir o nome). No `README.md` e no `bibmaker.claude`: o passo 10 (criar o bibliotecário) agora define o nome com `UPDATE auth.users ... raw_user_meta_data` pelo e-mail, de forma opcional, em vez de `INSERT INTO admins`. Para aplicar em uma biblioteca já publicada: substituir o `admin.html` e executar o `aplicar_203.sql` no SQL Editor, que copia nome e foto antigos da tabela `admins` (se existirem) para o `user_metadata`; a tabela antiga pode ser apagada depois, com `DROP TABLE IF EXISTS public.admins;`. Observação: o `user_metadata` pode ser editado pelo próprio usuário, mas nenhuma permissão do sistema depende dele (é só exibição). Em termos simples: a foto e o nome do admin ficam no próprio cadastro de login, e enviar foto funciona sem depender de tabela extra.

#202 16/10/2026 07:12:03
Alteração no arquivo `supabase_setup.sql`
Descrição: Estar logado passou a bastar para todas as operações do painel admin, sem necessidade de linha na tabela `admins`. Antes, as políticas de `livros`, `emprestimos`, `reservas` e `config_privada` e a função de concluir reservas exigiam que o usuário também existisse em `admins`, e a política "Admin cria próprio perfil" era removida no final do arquivo — por isso o envio de foto de perfil falhava para quem não tinha linha em `admins`. Agora as 17 políticas passam a exigir apenas `(select auth.uid()) IS NOT NULL`, a função de concluir reservas exige apenas usuário autenticado, a política da `config_privada` foi renomeada para "Somente autenticados leem config_privada" (com DROP da versão anterior, para o script poder ser reexecutado sem erro), e a política de INSERT em `admins` (própria linha) foi mantida, permitindo que o upsert da foto crie a linha do próprio usuário. A tabela `admins` continua existindo só para nome e foto de perfil. IMPORTANTE: como qualquer usuário autenticado agora é administrador, o cadastro público de usuários precisa ficar desativado no Dashboard do Supabase (Authentication → Sign In / Providers → desligar "Allow new users to sign up"). Para aplicar em uma biblioteca já publicada, reexecutar o `supabase_setup.sql` completo no SQL Editor. Em termos simples: quem está logado no admin pode usar tudo, inclusive enviar foto, sem precisar ser cadastrado em `admins`.

#201 15/10/2026 08:51:49
Correção no arquivo `admin.html`
Descrição: A aba Lista de Pessoas não exibia os cards nem os nomes, mesmo com pessoas cadastradas no banco: o filtro de turma/funcionários era preenchido, mas a lista ficava vazia. A causa era a função `_eh()` (escape de texto contra XSS, introduzida na correção de segurança de 08/10/2026), chamada ao montar o título do grupo e o nome de cada pessoa sem estar definida nesse escopo — o navegador interrompia a montagem da lista com um erro de JavaScript. Foi adicionada, logo após `window.escapeHtml = escapeHtml;` no módulo ES, a linha `window._eh = escapeHtml;`, tornando `_eh` global e disponível para o módulo ES e para os scripts UMD. Para aplicar em uma biblioteca derivada, basta adicionar essa mesma linha logo abaixo de `window.escapeHtml = escapeHtml;` no `admin.html`. Em termos simples: a lista de pessoas voltou a mostrar os nomes e cards, e o escape contra XSS continua ativo.

#200 15/10/2026 07:37:22
Mudança nos arquivos `bibmaker.claude`, `bibconfig.claude` e `README.md`
Descrição: Na entrevista do BibMaker, o campo anteriormente rotulado "Tipo de Biblioteca" para exemplos como "Biblioteca Escolar" foi renomeado para "Denominação da Biblioteca", deixando distinto o campo "Tipo de biblioteca" que classifica a instância como escolar ou comunitária. O exemplo do nome oficial da escola foi corrigido para `Professora Maria Vânia Farias Linhares`, sem repetir `EMTI`, que é informado separadamente como denominação/sigla da escola; os exemplos de nome do projeto, descrição e pasta/ZIP também deixaram de incorporar EMTI ao nome da biblioteca. O template `bibconfig.claude` agora registra separadamente tipo, denominação da biblioteca, sigla da escola, nome da escola e nome da biblioteca comunitária. O guia pós-geração foi ampliado para instruir a execução dos dois SQLs no projeto Supabase correto, a conferência da URL e chave publishable em `bibconfig.js`, a criação do usuário no Auth e o cadastro do nome exibido em `public.admins` via UUID, e a publicação correta dos arquivos públicos na raiz do GitHub Pages, excluindo `setup_private.sql` e `bibconfig.claude`. O README foi alinhado às mesmas orientações. Em termos simples: a categoria escolar/comunitária não se confunde mais com a denominação da biblioteca, o exemplo não duplica a sigla da escola e o guia explica passo a passo como configurar e publicar a instância.

---

#199 14/10/2026 12:37:20
Correção nos arquivos `supabase_setup.sql` e `admin.html`
Descrição: A tabela `pessoas` deixou de exigir uma linha correspondente na tabela `admins` para permitir leitura, inserção, atualização e exclusão. As políticas agora exigem apenas uma sessão autenticada, alinhando o acesso às pessoas com o modelo já usado para empréstimos e operações de livros; usuários não autenticados continuam sem acesso. Na aba Lista de Pessoas, falhas de consulta deixam de ser silenciosas e passam a exibir uma mensagem com opção de tentar novamente, em vez de aparentarem uma lista vazia. Para instalações existentes, é necessário executar novamente o `supabase_setup.sql` no SQL Editor do Supabase para aplicar as políticas atualizadas. Em termos simples: qualquer pessoa logada no painel pode consultar e administrar a lista de pessoas, sem precisar de cadastro adicional em `admins`.

---

#198 14/10/2026 09:56:12
Mudança nos arquivos `bibmaker.claude` e `README.md`
Descrição: O `CHANGELOG.md` passou a ir também para a biblioteca gerada pelo BibMaker, no lugar da regra anterior (entrada #4) de que ele pertencia só ao projeto-base. No `bibmaker.claude`: (1) foi criado o item 7.5 de "Depois do Preenchimento" (e o item 5.5 do Protocolo), que manda gerar o `CHANGELOG.md` próprio da biblioteca na pasta do projeto, com o título `# CHANGELOG — <Nome do Projeto>`, a frase de apresentação e a seção "Formatação" copiadas da base (trocando só o nome do projeto) e uma única entrada `#1`, no formato padrão, registrando a versão inicial do projeto (`Adição no arquivo `VERSION.json``, "Versão do projeto definida como X.Y", com X.Y igual ao campo "Versão do Projeto" da entrevista); nenhuma entrada do changelog da base é copiada; (2) a entrega do `.zip` (item 8 do Protocolo e item 10 de "Depois do Preenchimento") deixou de excluir o `CHANGELOG.md` e passou a incluí-lo na pasta do projeto, de modo que ele também entra no cálculo do `bibhash.sig` da biblioteca; (3) o item 1.5 de "Depois do Preenchimento" passou a dizer que cada alteração é registrada no changelog do projeto em que foi feita (o da base ou o da biblioteca derivada); (4) foi criada a regra 0.10 do Protocolo, para o fluxo de atualização: o `CHANGELOG.md` atual da biblioteca derivada é pedido à pessoa (se não vier junto) para preservar o histórico e a numeração, as entradas existentes são mantidas, nada é copiado do changelog da base, uma mudança no campo "Versão do Projeto" gera uma nova entrada sobre o `VERSION.json` com o próximo ID e, se a pessoa não tiver o arquivo, o BibMaker avisa que o novo changelog recomeça do `#1` e só gera um novo com a confirmação dela. No `README.md`: a "Regra obrigatória de manutenção" (que é copiada para as bibliotecas derivadas) deixou de dizer que o `CHANGELOG.md` não vai para as derivadas e passou a explicar que cada biblioteca derivada recebe o seu, começando só com a entrada `#1`, com numeração própria; e a lista de arquivos do `.zip` entregue passou a citar o `CHANGELOG.md` da biblioteca. O texto da entrada #4 foi mantido como está, por ser histórico. Em termos simples: a biblioteca criada agora já nasce com o próprio histórico de mudanças, começando na versão em que foi criada, e tudo que for alterado nela dali em diante é anotado nesse arquivo. O `bibhash.sig` foi regenerado.

---

#197 14/10/2026 08:57:34
Mudança nos arquivos `bibmaker.claude` e `README.md`
Descrição: Foram definidos com precisão quais arquivos vão para a biblioteca gerada pelo BibMaker e passou a existir um `bibhash.sig` próprio para cada biblioteca derivada. No `bibmaker.claude`: (1) a regra "NÃO gerar/regenerar `bibhash.sig`" (item 7 do Protocolo e item 9 de "Depois do Preenchimento") foi trocada por "gerar o `bibhash.sig` próprio da biblioteca", como último passo antes de montar o `.zip`, com todos os arquivos da pasta do projeto já finais; o hash cobre somente a pasta do projeto (o `setup_private.sql` e o `bibconfig.claude`, que ficam soltos fora dela, não entram no cálculo), usa o mesmo método da base (dentro da pasta, sem o `bibhash.sig`, `LC_ALL=C find . -type f | sort | xargs sha256sum | sha256sum`, gravado com `echo -n`, 64 caracteres hexadecimais sem quebra de linha) e nunca copia o `bibhash.sig` da BibVânia Online base; (2) foi criada a regra 0.9 do Protocolo: ao receber a pasta ou o `.zip` completo de uma biblioteca (base ou derivada) com `bibhash.sig`, o BibMaker calcula o hash, compara e, se divergir, mostra o calculado e o armazenado e só prossegue com confirmação explícita; (3) a entrega do `.zip` (item 8 do Protocolo e item 10 de "Depois do Preenchimento") passou a dizer que a pasta do projeto inclui o `bibmaker.claude` e o `bibmaker-logo.png` (necessários para atualizar a biblioteca no futuro) e o `bibhash.sig`, exceto o `CHANGELOG.md`, com `setup_private.sql` e `bibconfig.claude` soltos na raiz do `.zip`; (4) o quadro "IMPORTANTE" sobre o `bibconfig.claude` ganhou um parágrafo explicando que ele serve para as futuras atualizações, tanto da BibVânia Online base quanto da própria biblioteca derivada. No `README.md`: o texto da entrega do `.zip` e das seções `bibconfig.claude` e `bibhash.sig` foi atualizado conforme acima (a nota "específico deste repositório-base" foi substituída pela explicação do hash próprio); e a descrição do `bibmaker.claude` foi corrigida em três pontos que estavam desatualizados: a versão do BibMaker é a da base menos 0.1 (estava 0.3), o guia de chaves passou a citar a Mistral AI e as imagens passaram a ser obrigatórias, sem fallback para PNGs do BibMaker. Em termos simples: a biblioteca criada agora leva junto o BibMaker e a logo dele, tem a sua própria assinatura de integridade e o BibMaker confere essa assinatura antes de atualizar. O `bibhash.sig` da base foi regenerado.

---

#196 14/10/2026 08:50:23
Correção no arquivo `bibmaker.claude`
Descrição: Foram corrigidos dois defeitos de texto no `bibmaker.claude`, sem alterar o comportamento do BibMaker. (1) A numeração estava repetida: no "Protocolo de Preenchimento" havia dois itens "5." e, em "Depois do Preenchimento", também dois itens "5."; os itens seguintes foram renumerados, ficando o Protocolo de 1 a 8 (o item de `bibconfig.claude` passou a 6, o de `bibhash.sig` a 7 e o do `.zip` a 8) e o "Depois do Preenchimento" de 1 a 11 (`LICENCE.md` passou a 6, `VERSION.json` a 7, `bibconfig.claude` a 8, `bibhash.sig` a 9, `.zip` a 10 e o aviso sobre o `bibconfig.claude` a 11); as referências às regras 0.7 e 1 não mudaram. (2) No exemplo da "Chave da Mistral AI" da entrevista, havia dois parênteses seguidos dizendo que o exemplo era fictício; ficou um só: "(sem prefixo fixo; exemplo fictício; nunca use esta chave)". Em termos simples: só arrumamos a numeração e uma frase repetida no arquivo do BibMaker. O `bibhash.sig` foi regenerado.

---

#195 14/10/2026 08:47:51
Remoção e mudança nos arquivos `bibmaker.claude`, `README.md`, `LICENCE.md` e `bibmaker-og-image.png`
Descrição: As imagens da biblioteca criada pelo BibMaker (logo, favicon e OG Image) passaram a ser obrigatórias, e o BibMaker deixou de ter imagens padrão. No `bibmaker.claude`: na lista do que a pessoa precisa ter em mãos, o item "Opcional: logo, favicon e imagem de compartilhamento — se não tiver, uso as imagens padrão do BibMaker" virou item obrigatório; na seção "2. Imagens da Biblioteca" da entrevista foi acrescentada a regra de que as três imagens são obrigatórias e de que o BibMaker não avança para a próxima etapa até a pessoa fornecer cada uma (ou pedir que ele gere uma versão adequada), e os campos Logo, Favicon e OG Image perderam a opção "deixe vazio para usar bibmaker-logo.png / bibmaker-favicon.png / bibmaker-og-image.png", passando a constar como obrigatórios, mantendo as dimensões mínimas e proporções (logo 600 × 360 px 5:3; favicon 512 × 512 px 1:1; OG Image 1200 × 630 px 40:21). O arquivo `bibmaker-og-image.png` foi removido do projeto; o `bibmaker-favicon.png`, que era citado mas já não existia na pasta, teve as citações removidas; o `bibmaker-logo.png` foi mantido no projeto, apesar de não ser mais usado como imagem padrão. No `README.md` (passo 5 do uso do BibMaker) a etapa "Informe as imagens (opcional)" passou a "(obrigatório)" e a frase sobre as imagens padrão foi trocada. No `LICENCE.md`, a lista de ativos visuais originais deixou de citar `bibmaker-favicon.png` e `bibmaker-og-image.png`. Os arquivos `logo.png`, `favicon.png`, `og-image.png` e os ícones da própria BibVânia Online na raiz não foram alterados. Em termos simples: quem criar uma biblioteca pelo BibMaker agora precisa enviar as três imagens da própria biblioteca; não existe mais imagem de reserva. O `bibhash.sig` foi regenerado.

---

#194 14/10/2026 08:44:59
Adição nos arquivos `bibmaker.claude` e `README.md`
Descrição: O passo a passo da chave da Mistral AI (seção "Mistral AI" dos pré-requisitos do `bibmaker.claude` e seção "Mistral AI (plano gratuito — botão Vânia)" do `README.md`) estava incompleto e foi corrigido com o que aconteceu na prática. Agora ele manda ativar o plano gratuito antes de criar a chave (admin.mistral.ai/organization/billing, "Experiment for free", aceitar os termos, "Subscribe", com possível verificação de telefone e sem cartão), já que sem isso a Mistral informa "nenhum plano ativo"; avisa que no celular pode ser preciso ativar "Site para computador"; manda criar a chave com o "Default Workspace" selecionado; e explica que o plano gratuito não libera os modelos maiores (erro 403 "not available in your subscription tier"), por isso a Vânia usa o `ministral-14b-2512`. A chave Publishable do Supabase já constava no `bibmaker.claude` (pré-requisitos, entrevista e `bibconfig.claude`) e não precisou de mudança, assim como os campos "Chave da Mistral AI" da entrevista e do `bibconfig.claude`, que já tinham sido atualizados na entrada #187. Em termos simples: quem criar uma biblioteca nova pelo BibMaker agora recebe o caminho completo para ter a chave da Mistral funcionando, sem tropeçar no plano inativo nem no modelo bloqueado. O `bibhash.sig` foi regenerado.

---

#193 14/10/2026 08:39:11
Mudança no arquivo `admin.html`
Descrição: O campo "DESCRIÇÃO DA CAPA (ACESSIBILIDADE)" (`textarea#capaAltText`, no cadastro e na edição de livros) passou a ter altura fixa com rolagem interna. No estilo do próprio campo, `resize:vertical` (que deixava a pessoa arrastar o canto para aumentar ou diminuir a caixa) foi trocado por `resize:none; height:4.5rem; overflow-y:auto;`: a altura é sempre 4,5rem (mostra cerca de duas a três linhas no celular) e, quando o texto de até 125 caracteres não cabe, aparece a barra de rolagem dentro do campo. O `rows="2"`, o `maxlength="125"` e a fonte de 0.8rem não mudaram. Para mudar a altura no futuro, basta alterar o valor de `height` nesse campo. Em termos simples: a caixa da descrição da capa não muda mais de tamanho e, se o texto for grande, rola por dentro. O `bibhash.sig` foi regenerado.

---

#192 14/10/2026 08:37:41
Mudança no arquivo `admin.html`
Descrição: A descrição da capa (texto alternativo, limite de 125 caracteres) gerada pelo botão Vânia vinha longa demais e era cortada em 125 pela função de preenchimento, às vezes no meio de uma palavra. No `VANIA_PROMPT`, a regra do campo `descricao_capa` foi reescrita: pede UMA frase completa com alvo de 80 a 110 caracteres e limite absoluto de 125, manda a IA contar os caracteres antes de responder e reescrever mais curto se passar de 110, define a ordem de prioridade (título e autor, depois um ou dois elementos visuais, depois o tom, só se sobrar espaço), proíbe começar com "Capa de" e traz dois exemplos de tamanho (85 e 87 caracteres) em vez de um de 95. Além disso, foi criada a função `_ajustarDescricaoCapa`, usada em `_vanIAPreencherFormulario` no lugar do `.slice(0, 125)`: se mesmo assim a IA passar de 125, o texto é cortado no último espaço (sem partir palavra), pontuação solta no fim é removida e é acrescentado um ponto final, sempre ficando em no máximo 125 caracteres. O campo `capaAltText` continua com `maxlength="125"`. Como modelos de IA menores erram contagem de caracteres, o prompt reduz a chance de passar do limite, mas a função de ajuste garante o resultado. Em termos simples: a IA agora tenta já escrever a descrição curta, e, se ainda assim escrever demais, o sistema encurta de forma limpa, sem deixar palavra cortada. O `bibhash.sig` foi regenerado.

---

#191 14/10/2026 08:28:01
Mudança nos arquivos `admin.html` e `README.md`
Descrição: O intervalo de espera entre análises do botão Vânia (cadastro e edição de livros com IA) foi reduzido de 5 para 1 segundo: no `admin.html`, a constante `VANIA_COOLDOWN_S` passou de `5` para `1` e o comentário acima dela foi atualizado; o `README.md` (seção do botão Vânia) passou a citar 1s. A pausa de 60 segundos continua existindo apenas quando a Mistral AI responde com erro 429 (limite de uso atingido). Atenção: o modelo `ministral-14b-2512` permite 0,5 requisição por segundo (uma a cada 2 segundos), então duas análises seguidas com intervalo de 1 segundo podem receber 429 e cair na pausa de 60 segundos; o limite de 937.500 tokens por minuto não é problema, pois cada análise usa cerca de 11 mil a 13 mil tokens. Se isso acontecer com frequência, basta trocar `VANIA_COOLDOWN_S` para `2`. Em termos simples: depois de analisar uma capa, o botão Vânia volta a ficar disponível em 1 segundo em vez de 5. O `bibhash.sig` foi regenerado.

---

#190 09/10/2026 00:51:23
Remoção nos arquivos `admin.html` e `README.md`
Descrição: Foram removidas da função `_validarArquivoImagem` (usada no envio de capa e de verso) as duas verificações de formato da imagem criadas na entrada #155: a dimensão mínima de 400 × 500 pixels (mensagem "A imagem deve ter pelo menos 400 × 500 pixels.") e a proporção obrigatória entre 0,68 e 0,92, "próxima de 4:5" (mensagem "A imagem deve manter proporção vertical próxima de 4:5."), junto com as constantes `_IMAGEM_MIN_W`, `_IMAGEM_MIN_H`, `_IMAGEM_RATIO_MIN` e `_IMAGEM_RATIO_MAX`. A faixa de proporção era estreita demais e recusava capas reais, como as de proporção 2:3 (0,667) e fotos em pé 9:16 (0,56). Continuam valendo as verificações essenciais: tipo de arquivo (JPG, PNG, WebP, HEIC ou HEIF), tamanho máximo de 10 MB e imagem legível pelo navegador, que evitam travar a tela "PROCESSANDO IMAGEM...", já que `comprimirImagem` não trata erro de leitura. Imagens grandes continuam sendo reduzidas por `comprimirImagem` para no máximo 1080×1350 px em JPEG 92% antes do envio ao ImgBB e à IA, mantendo a proporção original. O `README.md` (seção do seletor de capa) passou a descrever o que é validado. Em termos simples: o sistema deixou de recusar capas só pelo tamanho ou pelo formato retangular, e agora aceita qualquer foto de capa legível de até 10 MB. O `bibhash.sig` foi regenerado.

---

#189 09/10/2026 00:41:30
Correção nos arquivos `admin.html` e `README.md`
Descrição: O botão Vânia falhava com o erro "MISTRAL HTTP 403: This model is not available in your subscription tier" (código 1910, tipo `tier_not_allowed`): o modelo `mistral-large-2512` não está liberado no plano gratuito (Experiment) da Mistral AI. No `admin.html`, a constante `VANIA_MODELO` passou de `mistral-large-2512` para `ministral-14b-2512` (Ministral 3 14B, que aceita imagens e JSON mode e tem limite de 937.500 tokens por minuto e 0,5 requisição por segundo), o título do bloco da Vânia e o comentário do intervalo foram atualizados, e o `README.md` passou a citar o novo modelo (tecnologias e referência técnica do botão Vânia). O intervalo de 5 segundos (`VANIA_COOLDOWN_S`) continua válido, pois o mínimo exigido pelo limite de requisições é de cerca de 2 segundos. Para trocar de modelo no futuro, basta alterar o valor de `VANIA_MODELO` para outro modelo com visão liberado na conta (por exemplo, `ministral-8b-2512` ou `mistral-small-2603`; este último tem limite de apenas 20.000 tokens por minuto e exigiria um intervalo de cerca de 45 a 60 segundos). Em termos simples: a Vânia passou a usar um modelo menor da Mistral que o plano gratuito permite, em vez do modelo grande que ele bloqueia. O `bibhash.sig` foi regenerado.

---

#188 09/10/2026 00:37:31
Mudança nos arquivos `admin.html` e `README.md`
Descrição: O intervalo de espera entre análises do botão Vânia (cadastro e edição de livros com IA) foi reduzido de 60 para 5 segundos: no `admin.html`, a constante `VANIA_COOLDOWN_S` passou de `60` para `5`, e os comentários acima dela foram atualizados. A pausa de 60 segundos continua existindo apenas quando a Mistral AI responde com erro 429 (limite de uso atingido): nesse caso o código passa `_cooldownPosChamadaS = 60` e `_vanIAIniciarCooldown` usa o maior valor entre o intervalo padrão e o informado. O valor foi escolhido a partir do consumo de uma análise com o modelo `mistral-large-2512`: cada imagem enviada (máximo 1080×1350 px após `comprimirImagem`) custa cerca de 4.845 tokens (capa 2:3) a 5.780 tokens (pior caso), à razão de 1 token por bloco de 16×16 px, e o prompt `VANIA_PROMPT` (5.314 caracteres) custa de 1.330 a 1.770 tokens (estimativa), o que dá cerca de 11.200 a 13.100 tokens de entrada com capa e verso e cerca de 6.400 a 7.300 só com a capa, mais 300 a 500 tokens de saída. Com o limite de 250.000 tokens por minuto, o intervalo mínimo seria de cerca de 3,3 segundos; 5 segundos deixa folga. Se o limite real da conta for menor (por exemplo, 20.000 tokens por minuto no plano gratuito), o intervalo precisa voltar para cerca de 45 a 60 segundos, trocando o valor de `VANIA_COOLDOWN_S`. O `README.md` (seção do botão Vânia) passou a citar 5s e a pausa de 60s no erro 429. Em termos simples: depois de analisar uma capa, o botão Vânia volta a ficar disponível em 5 segundos em vez de 1 minuto. O `bibhash.sig` foi regenerado.

---

#187 08/10/2026 23:58:44
Mudança nos arquivos `admin.html`, `index.html`, `bibconfig.js`, `setup_private.sql`, `supabase_setup.sql`, `bibmaker.claude`, `bibconfig.claude` e `README.md`
Descrição: O botão Vânia (análise de capa com IA) deixou de usar a Groq e passou a usar a Mistral AI. No `admin.html`, a função `abrirVanIA` agora chama `https://api.mistral.ai/v1/chat/completions` (API compatível com o formato OpenAI) com o modelo definido na nova constante `VANIA_MODELO = 'mistral-large-2512'` (Mistral Large 3, aceita imagens e `response_format: { type: 'json_object' }`), mantendo `temperature: 0` e `max_tokens: 500`. As imagens passaram a ser enviadas no formato da Mistral, com `image_url` recebendo diretamente o texto (URL ou `data:image/jpeg;base64,...`), em vez de `{ url: ... }`. A leitura da resposta aceita `content` como texto ou como lista de partes (os textos das partes são juntados). A mensagem de erro HTTP passou a começar com "Mistral HTTP" e a de limite (429) deixou de dizer "gratuito": "LIMITE DE USO DA IA ATINGIDO. TENTE NOVAMENTE EM ALGUNS MINUTOS."; o intervalo de 60 segundos (`VANIA_COOLDOWN_S`) não mudou. A chave privada passou de `groq_api_key` para `mistral_api_key` na tabela `config_privada`; em `window.BibChaves` o nome interno passou de `groq` para `mistral` (`definir`, `obter`, `limpar` e `_carregarChavesPrivadas`). A CSP (`connect-src`) do `admin.html` e do `index.html` trocou `https://api.groq.com` por `https://api.mistral.ai`. No `setup_private.sql`, o INSERT e a verificação passam a usar `mistral_api_key` (marcador `<<SUA_CHAVE_MISTRAL_AQUI>>`) e as instruções apontam para console.mistral.ai/api-keys; o `supabase_setup.sql`, o `bibconfig.js`, o `bibconfig.claude` ("Chave da Mistral AI:"), o `bibmaker.claude` (lista de pré-requisitos, passo a passo da chave, campos da entrevista e do arquivo de configuração, sem o prefixo `gsk_`) e o `README.md` (tecnologias, funcionalidades, tabela de serviços, guia da chave e referência técnica do botão Vânia, que também teve corrigidos o intervalo, de 25s para 60s, e o nome da leitura da chave, de `window.GROQ_KEY` para `window.BibChaves.obter('mistral')`) foram atualizados com os mesmos nomes. Para quem já tem uma biblioteca publicada: rodar no SQL Editor do Supabase `INSERT INTO config_privada (chave, valor) VALUES ('mistral_api_key', 'SUA_CHAVE') ON CONFLICT (chave) DO UPDATE SET valor = EXCLUDED.valor;` e, se quiser, apagar a chave antiga com `DELETE FROM config_privada WHERE chave = 'groq_api_key';`, além de publicar o novo `admin.html` e o novo `index.html`. Em termos simples: o botão Vânia continua fazendo a mesma coisa (ler a capa e preencher o cadastro), mas agora quem lê a imagem é a Mistral AI, com uma chave nova guardada no banco.

---

#186 08/10/2026 22:24:50
Correção no arquivo `index.html`
Descrição: O botão de baixar o acervo em PDF mostrava "Não foi possível carregar o gerador de PDF. Verifique sua conexão e tente novamente." mesmo com internet. A causa é a CSP da página (`<meta http-equiv="Content-Security-Policy">`): o gerador (pdfmake) era baixado de `cdnjs.cloudflare.com` por XHR e executado com `new Function(...)`, mas a CSP só libera scripts de `'self'` e `https://cdn.jsdelivr.net` (`script-src`), não libera requisições XHR/fetch para CDNs (`connect-src`) e não tem `'unsafe-eval'`. Na função `_carregarPdfMake`, o `_carregarScriptXHR` (XHR + `new Function`) foi substituído por `_carregarScriptTag`, que insere uma tag `<script src>` e espera o `onload`. Os endereços passaram a ser `https://cdn.jsdelivr.net/npm/pdfmake@0.2.9/build/pdfmake.min.js` e `https://cdn.jsdelivr.net/npm/pdfmake@0.2.9/build/vfs_fonts.js` (versão fixa 0.2.9, já permitida no `script-src`), carregados em sequência (primeiro o pdfmake, depois as fontes). A CSP não foi alterada. A barra de progresso deixou de acompanhar os bytes baixados e avança ao concluir cada arquivo (5% ao iniciar, 25% após o pdfmake, 40% após as fontes). Se o carregamento falhar, o erro agora também é registrado no console (`console.error`). Em termos simples: o gerador de PDF voltou a ser carregado de uma origem que a página permite. O `bibhash.sig` foi regenerado.

---

#185 08/10/2026 22:21:30
Mudança no arquivo `index.html`
Descrição: No PDF do acervo completo (função `baixarAcervoPdf` e `_montarLinhasChunks`, gerado com pdfmake), foi removida a coluna "CAPA (URL)", que mostrava o link "[VER CAPA]" para a imagem da capa. O PDF não tinha coluna de verso: o link do verso nunca fez parte da tabela, então não havia o que remover. A tabela ficou com sete colunas: ID, TÍTULO, AUTOR, ISBN, CLASSIFICAÇÃO INDICATIVA, QTD e CADASTRO. As larguras foram ajustadas para a tabela ocupar toda a largura útil da página A4 em paisagem: `widths:[28,'*','*',72,95,30,52]` (antes `[35,'*','*',70,90,80,45,70]`), com ID, ISBN, classificação, quantidade e cadastro em largura fixa e TÍTULO e AUTOR dividindo igualmente o espaço restante, que aumentou com a remoção da coluna de capa. Em termos simples: o PDF ficou sem os links de capa e as colunas de título e autor ficaram mais largas, preenchendo a página. O `bibhash.sig` foi regenerado.

---

#184 08/10/2026 22:19:13
Mudança no arquivo CHANGELOG.md
Descrição: As entradas #180, #181 e #182 foram ajustadas à seção "Formatação": a segunda linha de cada uma passou a seguir o padrão "[Tipo da mudança] no(a) [ONDE]", e os blocos `[Código]` foram removidos, porque a Formatação não prevê esse bloco. O conteúdo técnico que estava neles (nomes de funções, chaves e constantes) já consta no texto das descrições. Nenhuma outra entrada foi alterada. O `bibhash.sig` foi regenerado.

---

#183 08/10/2026 22:17:51
Mudança no arquivo CHANGELOG.md
Descrição: A seção "## Formatação", com as regras de estrutura das entradas (ID, ordem, data e hora, tipo da mudança, local e descrição), estava no final do arquivo, junto da entrada #1. Ela foi movida para o topo, logo abaixo do título e da frase de introdução e antes da primeira entrada, e deve permanecer sempre ali. As entradas continuam em ordem decrescente: a próxima entrada é adicionada logo abaixo da seção "Formatação", acima da entrada anterior, e o #1 permanece no final do arquivo. O texto das regras não foi alterado. O `bibhash.sig` foi regenerado.

---

#182 08/10/2026 21:26:20
Mudança nos arquivos `admin.html`, `bibcore.js` e `README.md`
Descrição: Login do bibliotecário reduzido de 15 para 8 dias sem interação: o limite de inatividade do painel (`INATIVIDADE_LIMITE_MS`, agora `8 * 24 * 60 * 60 * 1000` no `admin.html`) passou de 15 para 8 dias. Nada mais mudou no mecanismo descrito no #181 (sessão em `localStorage`, marca de atividade em `bibvania_ultima_atividade`, checagem ao abrir o painel, ao voltar para a aba e a cada 60 segundos). A mensagem exibida ao expirar passou a ser "SESSÃO ENCERRADA APÓS 8 DIAS SEM USO. ENTRE NOVAMENTE.". Atualizados o comentário em `bibcore.js` e o README. O `bibhash.sig` foi regenerado.

---

#181 08/10/2026 21:25:49
Mudança nos arquivos `admin.html`, `bibcore.js` e `README.md`
Descrição: Login do bibliotecário passou a durar até 15 dias sem interação (valor alterado depois no #182). A sessão do painel deixou de ser encerrada ao fechar a aba e após 20 minutos de inatividade. Agora ela fica salva em `localStorage` (`bibcore.js`, função `_armazenamentoSessao`) e só termina ao tocar em SAIR ou após 15 dias sem nenhuma interação com o painel. O token de acesso continua sendo renovado automaticamente pelo supabase-js (`autoRefreshToken: true`). A contagem de inatividade passou a ser gravada em `localStorage` na chave `bibvania_ultima_atividade` (no máximo uma vez por minuto), para continuar valendo com o painel fechado e entre abas. A checagem roda ao abrir o painel (`init()`), ao voltar para a aba (`visibilitychange`) e a cada 60 segundos; ao expirar, `_encerrarSessaoAdmin` encerra o login, apaga as chaves privadas da memória e exibe a mensagem "SESSÃO ENCERRADA APÓS 15 DIAS SEM USO. ENTRE NOVAMENTE.". Sem registro de atividade (primeiro acesso após esta atualização), a contagem começa no momento da checagem. Foi removido o trecho do `bibcore.js` que apagava o token antigo de `localStorage` a cada carregamento, pois passaria a apagar a sessão válida. O `signOut()` agora também remove `bibvania_ultima_atividade`. Reverte a decisão das entradas #175 (sessão só em `sessionStorage`): como todos os sites de `limaoruan.github.io` compartilham a mesma origem, outro site publicado nela com falha de XSS poderia ler o token; não publique outros sites nessa origem. O README foi atualizado. O `bibhash.sig` foi regenerado.

---

#180 08/10/2026 20:56:00
Mudança nos arquivos `index.html` e `admin.html`
Descrição: Link do Instagram do autor com o mesmo estilo do link da licença nos rodapés: o link "Instagram do autor" dos rodapés do catálogo público (`index.html`) e do painel administrativo (`admin.html`, que tem dois rodapés: o da tela de login e o do painel) passou a usar exatamente a mesma formatação do link da licença: classe `license-link` e estilo inline `color:var(--primary);font-weight:700;text-decoration:underline;text-underline-offset:2px;` (cor primária do tema, negrito e sublinhado). Nenhum outro texto, link ou atributo do rodapé foi alterado (o `href`, o `target="_blank"` e o `rel="me author noopener"` continuam iguais). O `bibhash.sig` foi regenerado.

---

#179 08/10/2026 16:15:00
Hash de integridade regenerado
Descrição: O `bibhash.sig` foi recalculado após as correções de segurança #173 a #178, seguindo o método descrito no README (todos os arquivos, exceto o próprio `bibhash.sig`).

---

#178 08/10/2026 16:14:00
Escape de aspas simples no gerador de relatórios
Descrição: A função `esc()` do módulo de relatórios passou a converter também a aspa simples (`'`) em `&#39;`, igualando-se ao `escapeHtml` do `bibcore.js`.

---

#177 08/10/2026 16:13:00
XSS armazenado no Acervo e na Lista de pessoas
Descrição: Título, ISBN, autor, classificação, URL da capa e nome/turma de quem está com o livro eram inseridos sem escape no card do Acervo administrativo (`cardLivro`), e o nome da pessoa na Lista de pessoas. Agora todos passam por escape, a URL da capa só é aceita se começar com `http://` ou `https://`, e as mensagens de erro exibidas em `innerHTML` também são escapadas.

---

#176 08/10/2026 16:12:00
Chaves de API fora de `window` e ImgBB sem chave na URL
Descrição: As chaves ImgBB e Groq deixaram de ser propriedades globais (`window.IMGBB_KEY`/`window.GROQ_KEY`) e passaram a ficar em `window.BibChaves`, um objeto com fechamento privado, apagado ao sair. O upload para o ImgBB agora envia a chave no corpo da requisição em vez da URL (`?key=`), com uma nova tentativa no formato antigo caso o ImgBB recuse. A limitação permanece: qualquer administrador logado recebe as chaves no navegador; o isolamento completo exigiria um proxy (Supabase Edge Function).

---

#175 08/10/2026 16:11:00
Sessão do administrador somente em sessionStorage
Descrição: O cliente Supabase passou a guardar a sessão em `sessionStorage` (some ao fechar a aba) em vez de `localStorage`, reduzindo o risco de outro site publicado em `limaoruan.github.io` (mesma origem) ler o token. O token antigo em `localStorage` é removido automaticamente. Efeito colateral: é preciso entrar de novo ao abrir o painel em uma aba nova.

---

#174 08/10/2026 16:10:00
supabase-js com versão fixa
Descrição: O `<script>` UMD do `admin.html` e o import ESM do `bibcore.js` deixaram de usar `@2`/versão implícita e passaram a usar a versão exata `2.89.0`, evitando que uma publicação nova (ou comprometida) no CDN passe a rodar no painel sem revisão. Não foi adicionado SRI. Atualizar a versão nos dois arquivos ao mesmo tempo.

---

#173 08/10/2026 16:09:00
Proteção contra clickjacking no admin.html e index.html
Descrição: Removido `frame-ancestors 'none'` da CSP em `<meta>`, onde o navegador o ignora. No lugar, um script no `<head>` oculta a página e tenta sair do quadro quando ela é aberta dentro de um iframe. O `'unsafe-inline'` em `script-src` foi mantido, pois depende de mover os manipuladores `onclick` inline para JavaScript externo.

---

#172 08/10/2026 16:02:00
Livro excluído reaparecia no Acervo administrativo
Descrição: Ao excluir o último livro do acervo, o carrossel mantinha a lista antiga em memória e as setas laterais ainda a exibiam. Agora, quando a lista fica vazia, o estado do carrossel (lista, página, contador e setas) é zerado, e a mensagem "NENHUM LIVRO ENCONTRADO." permanece até o cadastro de um novo livro. Também corrige o caso em que limpar uma busca sem resultados não restaurava a lista.

---

#171 08/10/2026 15:51:00
Campos vazios de volume e edição sem placeholder visível
Descrição: Volume e edição continuam com posições e larguras fixas, mas deixam de exibir `00º` e `00ª` quando não preenchidos. Os valores só aparecem quando informados, sem alterar o alinhamento dos cards.

---

#170 08/10/2026 15:50:00
Posições fixas de volume e edição
Descrição: Volume e edição passaram a usar máscara visual fixa em todos os cards: `Volume: 00º Edição: 00ª`. Valores ausentes exibem 00º/00ª e valores preenchidos usam pelo menos dois dígitos, evitando que o conteúdo altere o alinhamento dos demais campos.

---

#169 08/10/2026 15:44:00
Cards comparativos com capa e verso
Descrição: O comparativo de livros parecidos passou a exibir os dois cards lado a lado, cada um com áreas visuais de CAPA e VERSO. Imagens selecionadas ou cadastradas são mostradas; quando ausentes, aparecem os placeholders SEM CAPA e SEM VERSO.

---

#168 08/10/2026 15:41:00
Correção do carregamento do admin após o modal de comparação
Descrição: Corrigida a expressão regular usada para validar a capa no comparativo de livros. O excesso de barras escapadas gerava erro de JavaScript no navegador e impedia o carregamento do painel.

---

#167 08/10/2026 15:36:00
Comparação completa no aviso de livro parecido
Descrição: O modal de duplicidade passou a exibir lado a lado todas as informações disponíveis do livro que será cadastrado e do livro já existente, incluindo dados de identificação, classificação, volume, edição, quantidades, verso, data e capas quando disponíveis.

---

#166 08/10/2026 15:33:00
Modal detalhado para livro parecido
Descrição: A confirmação de duplicidade deixou de usar uma caixa genérica. O painel agora mostra todas as informações principais do livro encontrado e oferece as ações explícitas CANCELAR (fechar sem cadastrar), NOVO (cadastrar com outro ID) e EDITAR (abrir o livro existente).

---

#165 08/10/2026 15:27:00
Espaçamento do volume padronizado no Acervo administrativo
Descrição: O contêiner dos cards do Acervo no admin passou a usar o mesmo espaçamento vertical do catálogo público. Foi removido o gap adicional entre título, volume/edição e os demais metadados, sem alterar o espaçamento horizontal entre volume e edição.

---

#164 08/10/2026 15:24:00
Padronização do espaçamento entre metadados
Descrição: Removida a margem negativa que causava sobreposição entre volume/edição e autor. A linha voltou a respeitar o espaçamento vertical padrão do card, enquanto o espaçamento horizontal entre volume e edição permanece ampliado.

---

#163 08/10/2026 15:21:00
Remoção do espaçamento vertical extra de volume e edição
Descrição: Ajustado o fluxo vertical dos cards para que a linha de volume/edição não crie uma faixa de espaçamento adicional antes de autor, ISBN e classificação indicativa. O espaçamento horizontal entre volume e edição foi preservado.

---

#162 08/10/2026 15:17:00
Espaçamento e visibilidade de volume e edição
Descrição: A linha de volume e edição deixou de usar uma coluna fixa que cortava o volume com reticências. As colunas agora se ajustam ao conteúdo, com maior distância horizontal entre os campos e sem espaçamento vertical extra em relação aos demais metadados.

---

#161 08/10/2026 15:12:00
Classificação indicativa obrigatória
Descrição: O campo de classificação indicativa do cadastro de livros passou a ser obrigatório, com asterisco visual, validação HTML e validação adicional no envio do formulário.

---

#160 08/10/2026 15:06:00
Confirmação de livro com mesmo título e autor
Descrição: Antes de enviar imagens ao ImgBB ou inserir um novo livro, o cadastro consulta título e autor normalizados. Quando encontra um registro igual, o usuário pode abrir o livro existente para edição ou continuar como novo cadastro, recebendo outro ID.

---

#159 08/10/2026 14:58:00
OG image histórica do BibMaker restaurada
Descrição: Restaurada a imagem OG original do BibMaker, anterior à padronização visual inspirada no PokéBottons. O fallback voltou a usar `bibmaker-og-image.png`, com a composição verde centralizada original.

---

#158 08/10/2026 14:55:00
Ajuste do espaçamento do botão Vân-IA
Descrição: Aumentado o espaço entre o botão “ANALISAR COM A VÂN-IA” e o texto auxiliar “analisar capa + verso com IA”, inclusive no layout mobile.

---

#157 08/10/2026 14:54:00
Ajuste visual da tela de login
Descrição: Rodapé do login separado visualmente do cartão, com espaçamento, borda e sombra próprios; removido o espaço inferior artificial que podia provocar scroll; layout mobile compactado e adaptado à área segura do dispositivo.

---

#156 08/10/2026 14:44:00
Consolidação do renderizador de devoluções
Descrição: Removida a implementação duplicada da aba Devoluções no módulo ES. O bloco UMD passou a ser a implementação única e o módulo ES mantém somente uma ponte de compatibilidade para sincronização de cache, paginação e indicadores.

---

#155 08/10/2026 14:40:00
Endurecimento final antes da publicação
Descrição: Conclusão de reserva limitada a administradores também na RPC; chaves ImgBB/Groq apagadas da memória no logout; validação de tipo, tamanho, dimensões mínimas e proporção nas capas/versos; validação básica na foto do administrador; opções dinâmicas passaram a usar textContent; arquivo privado protegido no .gitignore.

---

#154 08/10/2026 14:35:00
Escape de templates dinâmicos contra XSS armazenado
Descrição: Centralizado `escapeHtml` e aplicado escape aos dados dinâmicos usados por sugestões, cards de livros, pessoas, histórico, empréstimos, devoluções e reservas. URLs de capas passaram a aceitar somente HTTP/HTTPS nos cards principais. Fragmentos HTML estáticos permanecem, mas valores vindos do banco não são mais inseridos sem escape nos templates auditados.

---

#153 08/10/2026 14:22:00
Endurecimento de RLS para pré-publicação
Descrição: Restringidas operações de livros, pessoas, empréstimos, reservas, livros excluídos e leitura de `config_privada` a usuários que possuem perfil em `admins`. Removida a política que permitia a qualquer usuário autenticado criar o próprio perfil administrativo. Corrigidas as referências de preconnect para o novo Supabase e documentada a necessidade de desativar o cadastro público do Auth.

---

#152 08/10/2026 14:20:00
BibMaker passa a gerar o workflow YAML de manutenção
Descrição: Atualizado o contrato do BibMaker para gerar e atualizar obrigatoriamente `.github/workflows/manter-supabase-ativo.yml` em bibliotecas novas e existentes. O workflow usa apenas a configuração pública do `bibconfig.js`, sem chaves privadas, e permanece como o único YAML de manutenção.

---

#151 08/10/2026 14:19:00
Documentação de keep-alive atualizada
Descrição: O README passou a indicar o workflow do GitHub Actions como método principal para manter o Supabase ativo. O cron-job.org ficou documentado somente como alternativa opcional de contingência.

---

#150 08/10/2026 14:13:00
Workflow para manter o Supabase ativo
Descrição: Adicionado o único arquivo `.github/workflows/manter-supabase-ativo.yml`, com execução agendada duas vezes por semana e acionamento manual. O workflow faz uma consulta pública leve à tabela `livros` usando a URL e a chave publishable do `bibconfig.js`, sem chaves privadas.

---

#149 08/10/2026 14:12:00
Configuração de publicação apontada ao novo Supabase
Descrição: Atualizado o `bibconfig.js` para a URL e chave publishable do novo projeto Supabase e incrementada a versão do cache do service worker. A versão preparada para o novo GitHub Pages usa as URLs públicas de `limaoruan/bibvania`; chaves privadas de ImgBB e Groq permanecem fora do frontend.

---

#148 08/10/2026 14:11:00
Novo repositório e endereço do GitHub Pages
Descrição: Atualizadas as referências ativas do projeto para https://github.com/limaoruan/bibvania e https://limaoruan.github.io/bibvania/. Mantidos os registros históricos anteriores no changelog.

---

#147 08/10/2026 09:22:00
Script separado de hardening removido
Descrição: Removido o `supabase_hardening.sql`, pois o `supabase_setup.sql` atual já contém as regras de segurança, RLS, permissões, índices e funções necessárias. Removidas também sua referência no README e sua regra específica no robots.txt.

---

#146 08/10/2026 09:20:00
Documento PRIVACY.md removido
Descrição: Removido o arquivo separado de privacidade conforme solicitado, pois as informações relevantes já estão documentadas no README.md. Removidas também as instruções atuais do BibMaker para gerar esse arquivo. O supabase_hardening.sql foi mantido como registro reutilizável do hardening já aplicado ao banco.

---

#145 08/10/2026 09:15:00
Configuração pública renomeada para bibconfig.js
Descrição: Renomeado o arquivo de configuração pública de `config.js` para `bibconfig.js`, alinhando-o ao padrão de nomenclatura do BibVânia. Atualizados os carregamentos do catálogo e do admin, o cache do service worker, o README e a documentação SQL. A configuração continua separada do `bibcore.js` e o funcionamento permanece inalterado.

---

#144 08/10/2026 09:10:00
OG image original do BibVânia restaurada
Descrição: Restaurada a OG image original do BibVânia, anterior à padronização horizontal, recuperada do ZIP histórico do projeto. A imagem original em PNG 1200×630 e suas metatags foram preservadas; a OG image padronizada do BibMaker continua em JPEG 1200×630, sem alterações.

---

#143 08/10/2026 09:08:00
OG image do BibVânia restaurada
Descrição: Restaurada a composição anterior da OG image do BibVânia, mantendo o padrão horizontal JPEG 1200×630. A OG image do BibMaker permaneceu inalterada.

---

#142 08/10/2026 09:06:00
Identificação completa da escola na OG image do BibVânia
Descrição: Atualizada a OG image do BibVânia para exibir “Biblioteca Escolar Digital da EMTI — Professora Maria de Jesus Rodrigues Alves”, preservando o novo padrão horizontal dos sites de referência, a logo, a descrição funcional e a autoria. Mantida a proporção JPEG 1200×630.

---

#141 08/10/2026 08:59:00
OG images padronizadas com os sites de referência
Descrição: Recriadas as imagens Open Graph do BibVânia e do BibMaker no padrão horizontal dos sites de referência, com logo à esquerda, título, descrição e autoria à direita, composição consistente e proporção exata 1200×630. Os arquivos foram padronizados em JPEG, e as metatags, documentação, BibMaker e service worker foram atualizados para os novos nomes.

---

#140 08/10/2026 08:52:00
Licença atualizada para CC BY-SA 4.0
Descrição: Atualizada a licença do projeto para Creative Commons Atribuição-CompartilhaIgual 4.0 Internacional em metadados, JSON-LD, documentação, BibMaker, comentários de código e rodapés. Os links dos rodapés agora usam a cor primária do tema, com sublinhado e peso reforçado, garantindo contraste adequado nos modos claro e escuro.

---

#139 08/10/2026 08:49:00
Link do repositório removido dos rodapés
Descrição: Removido o link “Repositório” dos rodapés do catálogo público, da tela de login e do painel administrativo. Os atalhos de repositório existentes no menu e no modal de atualização permanecem inalterados.

---

#138 08/10/2026 08:47:00
Rodapé padronizado com os sites de referência
Descrição: Os rodapés do catálogo público, da tela de login e do painel administrativo passaram a usar o padrão mobile-first dos sites de referência: alinhamento à esquerda, descrição do sistema, versão/lançamento, autor com Instagram, licença CC BY 4.0 e repositório em nova aba. A identidade, os links oficiais e as funções do BibVânia foram preservados.

---

#137 08/10/2026 08:40:00
Correção do texto bruto exibido no admin
Descrição: Corrigido o template de HTML dos relatórios, que recebeu acidentalmente o registro do service worker dentro de uma string JavaScript. O `</script>` interno encerrava o bloco principal antes do fim e fazia o restante do código aparecer como texto na página. O service worker agora é registrado somente no final real do documento admin, e o HTML de relatório volta a ser encerrado com escape seguro.

---

#136 08/10/2026 08:31:00
Migração definitiva para Supabase Publishable Key
Descrição: Substituída a chave pública legada pela chave publishable fornecida no config.js. Removidos o campo de fallback legado, o fallback no bibcore.js, a chave duplicada hardcoded no admin.html e as instruções de uso da chave legada no BibMaker, Bibconfig e README. As permissões do papel PostgreSQL anon nas RPCs públicas permanecem intencionais e não representam uma chave de API. Consulta pública ao endpoint livros validada com HTTP 200 usando a publishable.

---

#135 08/10/2026 08:19:00
Padronização de segurança, PWA, SEO e configuração pública
Descrição: Separada a configuração pública do Supabase em config.js, priorizando a chave publishable (sb_publishable_) e mantendo temporariamente um fallback de migração. Adicionados service worker network-first restrito à origem, .nojekyll, ícones PWA em múltiplas dimensões, manifesto com categorias, metadados de autor/publicador/licença/idioma, preconnect do Supabase, robots e sitemap com lastmod. O service worker não intercepta chamadas ao Supabase; RLS e RPCs continuam sendo a fronteira de segurança. Rodapés e descrições de compartilhamento foram alinhados sem remover funções ou alterar a identidade do BibVânia.

---

#134 07/10/2026 21:40:00
Exemplos e instruções em todos os tópicos do BibMaker
Descrição: Reforçada a regra de preenchimento do bibmaker.claude para que todo tópico e todo campo tenha orientação de como preencher e um exemplo seguro. A entrevista recebeu regras explícitas para campos opcionais, condicionais, versões e credenciais. O modelo de bibconfig.claude foi completamente documentado com formatos e exemplos para data, biblioteca, imagens e dimensões, chaves privadas, projeto, licença e URLs do GitHub, mantendo placeholders fictícios e sem expor credenciais reais.

---

#133 07/10/2026 21:35:00
Dimensões e proporções obrigatórias para imagens no BibMaker
Descrição: Atualizado o tópico de imagens do bibmaker.claude para exigir a verificação e a informação das dimensões reais de cada imagem em pixels. Definidos mínimos e proporções: logo 600 × 360 px em 5:3, favicon 512 × 512 px em 1:1 e OG Image 1200 × 630 px em 40:21. Imagens maiores só são aceitas mantendo a mesma proporção; arquivos incompatíveis devem ser corrigidos ou substituídos sem distorção. O BibMaker também deve registrar as dimensões no bibconfig.claude e atualizar og:image:width/height com os valores reais.

---

#132 06/10/2026 11:56:00
Ordem das categorias no filtro de Reservas
Descrição: Ajustada a ordem das categorias no filtro da aba RESERVAS para exibir FUNCIONÁRIOS antes de VISITANTES, seguindo a mesma ordem da Lista de Pessoas. Os valores e a lógica dos filtros não foram alterados.

---

#131 06/10/2026 11:55:00
Título da lista de pessoas atualizado
Descrição: Atualizado o título da aba Lista de Pessoas no admin.html de “LISTA DE ALUNOS E FUNCIONÁRIOS” para “LISTA DE ALUNOS, FUNCIONÁRIOS E VISITANTES”, refletindo as três categorias exibidas no painel.

---

#130 06/10/2026 11:50:00
Categoria Visitantes na lista de pessoas
Descrição: Corrigido o rótulo da categoria de pessoas no filtro e no agrupamento da lista do admin.html: “VISITANTE” passou a ser exibido como “VISITANTES”, mantendo a mesma forma plural usada para “FUNCIONÁRIOS”. O valor interno do filtro e o tipo salvo no banco não foram alterados.

---

#129 06/10/2026 11:45:00
Simplificação do modal de atualização
Descrição: Removidos do modal de atualização do admin.html a frase “O painel não substitui seus arquivos automaticamente” e o botão “Continuar no painel”, mantendo o aviso objetivo e o botão “Ir para o repositório”. O modal continua podendo ser fechado pelo X, pela tecla Escape ou clicando fora do cartão.

---

#128 06/10/2026 11:35:00
Links de repositório e licença em nova aba
Descrição: Alterados os links clicáveis do repositório e da licença para abrir em nova aba, incluindo o botão IR PARA O REPOSITÓRIO do modal de atualização, os menus de atalhos do index e do admin, os rodapés das páginas e os links equivalentes na documentação README.md e LICENCE.md. O painel permanece aberto ao acessar o repositório, e os links de licença usam target blank com rel de segurança.

---

#127 06/10/2026 11:30:00
Modal explicativo para atualização da biblioteca
Descrição: Alterado o fluxo do botão ATUALIZAR no admin.html. Quando uma versão mais recente é detectada, o clique agora abre um modal acessível dentro do próprio painel, com explicação, comparação das versões, opção de continuar no painel e botão IR PARA O REPOSITÓRIO. O repositório só é acessado depois do clique explícito no botão do modal, na mesma aba; o painel não atualiza arquivos automaticamente. O modal também pode ser fechado pelo X, pela tecla Escape ou clicando fora do cartão.

---

#126 06/10/2026 11:20:00
Atualização dos links oficiais do projeto
Descrição: Atualizados em todos os arquivos necessários o repositório oficial para https://github.com/ruanolima/bibvania, o site público para https://ruanolima.github.io/bibvania/ e o link do autor para https://www.instagram.com/ruanoliveiralima_/. Incluídos HTML, JSON-LD, Open Graph, Twitter, CSP, sitemap.xml, robots.txt, documentação, CSS, JavaScript, BibMaker e URLs de verificação de versão, sem alterar links de licença ou serviços externos.

---

#125 06/10/2026 10:25:00
Exemplos de preenchimento no BibMaker
Descrição: Adicionados exemplos explícitos para todos os campos e tópicos da entrevista do BibMaker, incluindo tipos de biblioteca, identificação escolar/comunitária, imagens, URL e chaves de API com valores fictícios, dados do projeto, descrição Open Graph, modalidades de licença e URLs do GitHub. Os exemplos de credenciais foram marcados como fictícios e não utilizáveis para evitar que sejam confundidos com segredos reais.

---

#124 06/10/2026 10:20:00
Contrato completo de metadados no BibMaker
Descrição: Ampliado o bibmaker.claude para auditar e gerar/atualizar sistematicamente os metadados públicos e administrativos, incluindo tags HTML, canonical, robots/googlebot, referrer, theme-color, favicon, Apple Touch Icon, manifest, Open Graph, Twitter Card, JSON-LD Library/WebApplication, CSP, robots.txt, sitemap.xml, PRIVACY.md e VERSION.json. O protocolo agora corrige campos ausentes, duplicidades, referências à biblioteca-base e URLs antigas também no fluxo de atualização, sem inventar identificadores sociais ou expor dados privados. O modelo de bibconfig.claude passou a preservar a descrição de compartilhamento/Open Graph.

---

#123 06/10/2026 10:01:00
Metadados, descoberta e privacidade
Descrição: Corrigido o tipo de biblioteca no index, adicionados canonical, URLs absolutas de compartilhamento, Open Graph ampliado, Twitter URL, JSON-LD público, CSP, manifest.webmanifest, robots.txt, sitemap.xml e PRIVACY.md. O BibMaker foi instruído a reproduzir esses metadados e arquivos nas bibliotecas derivadas, mantendo o admin fora da indexação e do sitemap.

---

#122 06/10/2026 09:48:00
Descrição opcional para compartilhamento no BibMaker
Descrição: Adicionado ao BibMaker o campo opcional “Descrição para compartilhamento/Open Graph”. Quando preenchido, o texto é aplicado aos metadados públicos do index.html e ao JSON-LD; quando deixado vazio, permanece a descrição padrão adaptada pelo BibMaker. O valor também passou a ser preservado no bibconfig.claude.

---

#121 06/10/2026 09:43:00
Tipos de biblioteca disponíveis no BibMaker
Descrição: Removida a opção Biblioteca Pessoal do fluxo de criação. O BibMaker agora oferece somente as modalidades Biblioteca Escolar e Biblioteca Comunitária.

---

#120 06/10/2026 09:40:00
Botão Atualizar no final do menu de atalhos
Descrição: O botão de verificação/atualização da biblioteca foi reposicionado para ser o último item do menu de atalhos do painel administrativo.

---

#119 06/10/2026 09:33:00
Organização das abas do painel administrativo
Descrição: A aba CADASTRO foi renomeada para CADASTRO DE LIVRO e a aba ACERVO foi reposicionada imediatamente depois dela.

---

#118 06/10/2026 09:24:00
Remoção da observação auxiliar da classificação indicativa
Descrição: Removida do formulário de cadastro de livro a informação sobre faixa etária de referência, ClassInd e revisão da sugestão da IA. O campo CLASSIFICAÇÃO INDICATIVA continua disponível normalmente.

---

#117 01/10/2026 22:21:00
Documentação do Leaked Password Protection
Descrição: Atualizado o README para informar que a proteção contra senhas vazadas exige o plano Pro ou superior, além de registrar o nome atual da opção no painel do Supabase: Prevent the use of leaked passwords.

---

#116 01/10/2026 19:58:00
Hardening de segurança e performance do Supabase
Descrição: Corrigidas as políticas RLS permissivas da tabela reservas, removido o acesso direto de INSERT/DELETE pela API, adicionados índices para pessoas(nome), livros(titulo), emprestimos(livro_id) e bibfiles_pdfs(user_id) quando existente, otimizada a avaliação de auth.uid(), movida a extensão unaccent para o schema extensions e revogado o acesso público a funções internas de trigger. Criado o supabase_hardening.sql para aplicar a migração sem apagar dados em bancos existentes. A proteção contra senhas vazadas continua exigindo ativação no painel Authentication do Supabase.

---

#115 01/10/2026 09:31:00
Atualização da marca para BibVânia Online
Descrição: Atualizada a marca exibida no catálogo público, painel administrativo, títulos, metadados, relatórios, PDF, rodapés e documentação para “BibVânia Online”. Identificadores técnicos, chaves de armazenamento, URLs e referências históricas foram preservados.

---

#114 01/10/2026 09:30:00
Altura automática na lista de pessoas
Descrição: Removida a altura fixa de duas linhas no nome dos cards do admin. O card volta a aumentar naturalmente quando o nome ocupa mais de uma linha.

---

#113 01/10/2026 09:24:00
Altura fixa para nomes na lista de pessoas
Descrição: A área do nome nos cards do admin passou a reservar sempre duas linhas, mesmo quando o nome ocupa apenas uma. Nomes maiores são limitados a duas linhas, mantendo a altura visual uniforme dos cards.

---

#112 29/09/2026 14:50:00
Layout compacto dos cards da lista de pessoas
Descrição: Restaurado o layout com nome e turma/classificação à esquerda e os botões EDITAR e EXCLUIR empilhados verticalmente à direita, reduzindo a altura e melhorando a leitura dos cards no admin.

---

#111 29/09/2026 11:52:00
Coluna Volume compactada nos cards
Descrição: Reduzida a coluna reservada para Volume de 11ch para 9ch, mantendo o intervalo de 1ch. A posição de Edição fica mais próxima no caso comum sem valor, evitando o espaço excessivo observado nos cards do catálogo.

---

#110 29/09/2026 11:49:00
Layout fixo e compacto para Volume/Edição
Descrição: Mantida a coluna fixa de 11ch para impedir o deslocamento horizontal de Edição, com intervalo reduzido para 1ch. O layout passa a priorizar o padrão compacto `Volume: 00 Edição: 00`, preservando a posição fixa mesmo para valores como `99º`.

---

#109 29/09/2026 11:37:00
Redução do intervalo visual entre Volume e Edição
Descrição: Mantida a coluna fixa de 11ch para que Edição não se desloque, mas o intervalo foi reduzido de 3ch para 2ch. Assim, no caso comum `Volume: 00`, a distância visual até Edição fica mais próxima de três caracteres.

---

#108 29/09/2026 11:36:00
Largura fixa de Volume ajustada para 99º
Descrição: A primeira coluna de Volume foi ajustada de 12ch para 11ch, largura suficiente para `Volume: 99º`. O intervalo permanece em 3ch, mantendo Edição fixa e o espaçamento visual solicitado.

---

#107 29/09/2026 11:35:00
Coluna fixa para Edição nos cards
Descrição: A formatação de Volume/Edição deixou de usar flexívelmente o conteúdo do Volume para posicionar Edição. Agora a primeira coluna tem largura fixa de 12ch e mantém 3ch de intervalo, evitando que Edição se desloque horizontalmente quando o valor do Volume mudar.

---

#106 29/09/2026 11:32:00
Correção do espaçamento entre Volume e Edição
Descrição: Ajustado o espaçamento solicitado para exatamente `gap: 3ch` nos cards e listas que usam a formatação compartilhada de Volume/Edição.

---

#105 29/09/2026 11:29:00
Espaçamento entre Volume e Edição nos cards
Descrição: A formatação compartilhada passou de `gap: 4ch` para `gap: 1ch`, exibindo os campos no padrão “Volume: 00 Edição: 00” com apenas um espaço entre os valores, tanto no Index quanto no admin.

---

#104 29/09/2026 11:24:00
Navegação direta por posição nos cards do acervo
Descrição: O indicador de posição do carrossel, no formato “3 / 976”, passou a ser clicável no Index e no painel administrativo. Ao clicar, o usuário informa a posição desejada; o sistema valida o intervalo e abre diretamente o livro correspondente, mantendo as setas e o gesto de deslizar disponíveis.

---

#103 29/09/2026 11:19:00
Informação de cadastro no pré-fluxo de reserva e recálculo dos cards públicos
Descrição: Adicionada às regras exibidas antes do formulário a informação de que a reserva só pode ser feita para um nome já cadastrado no sistema da biblioteca. A altura dos cards do catálogo público foi recalculada de 11rem para 12,5rem para acomodar o badge de disponibilidade e o botão RESERVAR, preservando o alinhamento e o espaçamento do conteúdo.

---

#102 29/09/2026 11:20:00
Correção nos arquivos `index.html` e `style.css`
Descrição: O botão RESERVAR dos cards do catálogo deixou de parecer uma elipse (raio de 8px em botão de 15px de altura) e passou a ser um retângulo com cantos arredondados de 4px. A largura passou a ser exatamente a do badge de disponibilidade (quantidade disponível/total): badge e botão foram agrupados em `.badge-reserva-grupo` (largura ajustada ao conteúdo do badge; o botão usa `width:0; min-width:100%` para não alargar o grupo). A fonte do botão foi igualada à do badge (0.68rem). Layout segue mobile first, sem botão largo no PC.

---

#101 29/09/2026 10:53:00
Cooldown fixo de 60 segundos
Descrição: O botão da Vân-IA aguarda 60 segundos após cada chamada. Mantém-se o envio de capa e verso; duas imagens já representam cerca de 4.096 tokens, antes do prompt e da saída.

---

#100 29/09/2026 10:50:00
Cooldown fixo de 2 segundos
Descrição: O cooldown após cada chamada da Vân-IA foi alterado para 2 segundos; respostas HTTP 429 mantêm a pausa de 60 segundos.

---

#99 29/09/2026 10:46:00
Cooldown fixo de 1 segundo para teste
Descrição: O cooldown após a chamada da Vân-IA foi fixado em 1 segundo conforme solicitado; respostas HTTP 429 mantêm uma pausa de 60 segundos.

---

#98 29/09/2026 10:27:00
Cooldown dinâmico pela taxa de tokens
Descrição: O intervalo entre análises passa a usar o consumo real da resposta da Groq e o tempo já gasto na chamada, considerando as cotas-base gratuitas publicadas para o Qwen3.8-27B (30 RPM/8K TPM). Se faltar o uso na resposta, estima pelos caracteres do prompt, imagens e limite de saída.

---

#97 29/09/2026 10:24:00
Cooldown da Vân-IA reduzido
Descrição: O botão volta a poder ser usado cinco segundos após o fim de cada chamada. O cooldown não atrasa a resposta da IA; o tempo da chamada continua variável.

---

#96 29/09/2026 10:20:00
Leitura mais cuidadosa do título do livro
Descrição: O prompt orienta a Vân-IA a conferir fontes estilizadas, letras decorativas e ligaturas, cruzar trechos ambíguos com o verso e não adivinhar títulos ilegíveis.

---

#95 29/09/2026 10:17:00
Descrição de capa objetiva e limitada
Descrição: O prompt da Vân-IA pede até 125 caracteres, com título, um autor, detalhes visuais concretos e atmosfera/tom. O formulário limita a digitação e o preenchimento da IA ao mesmo máximo.

---

#94 29/09/2026 10:13:00
Campo autor limitado a um nome no prompt
Descrição: A Vân-IA deve preencher somente um nome no campo autor: o principal quando claro, ou o primeiro listado em caso de coautoria sem destaque; não deve concatenar coautores.

---

#93 29/09/2026 10:07:00
Desempate da classificação pela faixa mais alta
Descrição: Em caso de dúvida entre duas classificações possíveis, a Vân-IA deve escolher a faixa etária mais alta e mais restritiva.

---

#92 29/09/2026 10:06:00
Rubrica ClassInd substituída pelo texto indicado
Descrição: A rubrica de classificação do prompt da Vân-IA foi trocada pela lista de indicações e principais critérios fornecida pelo usuário, mantendo as demais instruções e o formato JSON.

---

#91 29/09/2026 09:53:00
Rubrica de referência ClassInd 2025 no cadastro
Descrição: Prompt da Vân-IA atualizado com metodologia e fatores do guia ClassInd 2025, de forma explicitamente adaptada a livros impressos; passa a deixar ClassInd em branco quando capa/verso não sustentam uma avaliação. Temperatura da chamada reduzida a zero para favorecer repetibilidade. Incluída a faixa de 6 anos nos selects, cores e documentação. O valor permanece sugestão interna, não classificação oficial.

---

#90 29/09/2026 09:46:00
Controles de busca na aba Reservas
Descrição: A busca de reservas agora usa o padrão do admin, com busca por voz e botão X para limpar o texto digitado.

---

#89 29/09/2026 09:37:00
Relatório mensal como padrão
Descrição: Na ausência de filtros salvos, a aba Relatório abre no modo mensal e preenche o mês e o ano atuais.

---

#88 29/09/2026 09:31:00
Rankings de livros por perfil no relatório
Descrição: Os rankings de livros mais lidos, renovados e reservados agora incluem todos os perfis no total geral e exibem subtópicos de Funcionários e Visitantes, preservando as etapas escolares dos alunos.

---

#87 29/09/2026 09:27:00
Título feminino no tópico 10 do relatório
Descrição: Alterado “Funcionários (mulheres)” para “Funcionárias (mulheres)” no relatório visual e textual.

---

#86 29/09/2026 09:19:00
Ranking de livros mais reservados no relatório
Descrição: Adicionada, após o tópico 3, a seção Livros mais Reservados com ranking geral e subtópicos para Ensino Fundamental I, Ensino Fundamental II, Ensino Médio e EJA.

---

#85 29/09/2026 09:14:00
Rótulos antes das contagens no cartão de pessoas
Descrição: As quantidades do cartão Total de pessoas agora aparecem como “Alunos: x”, “Funcionários: y” e “Visitantes: z”.

---

#84 29/09/2026 09:10:00
Distribuição de pessoas por perfil no relatório
Descrição: O cartão Total de pessoas agora mostra, abaixo do total, as quantidades de Alunos, Funcionários e Visitantes. As mesmas contagens aparecem na saída textual do relatório e são consultadas por contagem exata, sem carregar nomes.

---

#83 29/09/2026 09:04:00
Resumo de status das reservas em linhas separadas
Descrição: O relatório agora apresenta Pendentes, Concluídas e Canceladas em linhas individuais, no cartão de resumo e na saída textual, com o rótulo seguido de sua quantidade.

---

#82 29/09/2026 09:00:00
Relatório protegido contra resultados fora de ordem
Descrição: Gerações simultâneas do relatório agora descartam respostas antigas que terminem depois da consulta mais recente. A atualização também pode ocorrer quando o relatório estiver aberto antes da primeira carga, evitando que um resultado desatualizado substitua as contagens atuais de reservas.

---

#81 29/09/2026 08:48:00
Cartão de reservas contido na largura do painel
Descrição: Corrigida a largura mínima global aplicada aos botões dentro de nav, que fazia o paginador expandir o cartão além da borda. A lista, o cartão e os controles agora respeitam a largura disponível, inclusive em telas estreitas.

---

#80 29/09/2026 08:42:00
Paginação de uma reserva por página
Descrição: A fila administrativa agora exibe uma reserva por vez com botões ANTERIOR/PRÓXIMA e indicador “RESERVA X DE Y”. Busca e filtro reiniciam na primeira página; a navegação não aparece quando há apenas um resultado.

---

#79 29/09/2026 08:41:00
Botões de ação no topo do cartão de reserva
Descrição: Os botões EMPRESTAR e CANCELAR agora aparecem no início de cada cartão, antes dos blocos Livro e Pessoa.

---

#78 29/09/2026 08:35:00
Blocos Livro e Pessoa uniformes na fila de reservas
Descrição: Removida a capa/card visual do livro na fila administrativa. Cada reserva agora mostra dois painéis de campos no mesmo padrão: Livro (ID, nome, volume, edição, autor, ISBN, ClassInd e quantidade disponível/total) e Pessoa (nome, turma/categoria e data da reserva).

---

#77 29/09/2026 08:19:00
Cartões de reserva com dados separados de livro e pessoa
Descrição: Removido o contador redundante junto ao título da fila. Os cartões agora separam visualmente dados completos do livro e do cadastro da pessoa, incluindo metadados de acervo, perfil, turma, PcD, datas e arquivos disponíveis.

---

#76 28/09/2026 15:37:00
Rótulos completos de turma e contagem total
Descrição: Filtros de turma na fila de reservas seguem o padrão “EF 6º ANO — TURMA B” / “EM 1º ANO — TURMA A”, e “TODAS AS TURMAS” agora mostra o total de reservas pendentes.

---

#75 28/09/2026 15:33:00
Filtro de reservas por turma com contagens
Descrição: A fila administrativa agora lista todas as turmas cadastradas, mesmo sem reserva pendente, e mostra a quantidade de pendências por turma. O seletor também inclui Visitantes e Funcionários com suas contagens e atualiza as opções quando o cadastro de pessoas muda.

---

#74 28/09/2026 15:26:00
Removida explicação repetida da fila de reservas do admin
Descrição: Removido da tela administrativa de reservas o parágrafo sobre desconto de estoque, conversão/cancelamento e limites por perfil. As regras e a lógica do sistema permanecem inalteradas.

---

#73 28/09/2026 15:17:00
Botão Reservar com altura de 15 px
Descrição: Altura fixa do botão Reservar reduzida de 30 px para 15 px, mantendo a largura de 100% do card.

---

#72 28/09/2026 15:12:00
Botão Reservar mais baixo
Descrição: Altura fixa do botão Reservar reduzida de 36 px para 30 px, mantendo largura de 100% do card e largura visual inalterada.

---

#71 28/09/2026 15:03:00
Removido aviso duplicado do formulário de reserva
Descrição: A explicação de que a reserva fica pendente, desconta um exemplar e o devolve ao estoque ao ser cancelada permanece no pré-modal de regras; removida do formulário de reserva para evitar repetição.

---

#70 28/09/2026 14:55:00
Modal prévio com regras e ajustes do resumo do livro
Descrição: Antes do formulário de reserva, o catálogo mostra um modal com regras de alunos, visitantes e funcionários, com opção de voltar ou continuar. A miniatura do livro usa a proporção 96×148 e object-fit igual ao card; o campo de exemplares ocupa as duas colunas; a mensagem inicial de digitação foi removida e a lista fica vazia até uma busca.

---

#69 28/09/2026 12:21:00
Modal de reserva exibe todos os dados do livro e checkboxes marcáveis
Descrição: O modal de reserva exibe a capa, título, autor, volume, edição, ISBN, classificação indicativa e quantidade disponível/total do livro. Os checkboxes de Funcionário e Visitante usam marca de seleção ✓ visível e fundo da cor primária quando ativos, substituindo o appearance none herdado globalmente que ocultava a marca nativa.

---

#68 28/09/2026 12:11:00
Busca de reserva inicia com uma letra
Descrição: A busca pública por pessoas inicia após digitar um caractere, prioriza nomes que começam pelo termo e mantém o limite de 8 resultados e filtros por perfil. A RPC de compatibilidade que aceita apenas o nome também usa o novo critério.

---

#67 28/09/2026 12:04:00
Busca de cadastros de reserva com filtros de perfil
Descrição: O catálogo permite pesquisar por trecho do nome e oferece checkboxes para Funcionário e Visitante; sem seleção, pesquisa somente Alunos; com ambas marcadas, pesquisa os dois perfis. A RPC mantém o limite de resultados e retorna apenas dados cadastrais mínimos, preservando a chamada antiga para páginas ainda não atualizadas. O modal explica perfis e categorias sem resultados; o setup notifica o PostgREST para recarregar o cache de funções.

---

#66 28/09/2026 11:44:00
Reserva pendente passa a ocupar estoque; botão público com altura fixa
Descrição: Uma reserva pendente agora desconta imediatamente um exemplar de `quantidade_disponivel`; cancelamento o libera e a conversão em empréstimo transfere a mesma alocação sem dupla contagem. Triggers do Supabase recalculam o estoque após mutações de reservas/empréstimos, impedem checkout manual de exemplar reservado e bloqueiam redução do acervo abaixo de cópias emprestadas/reservadas. A fila permite confirmar o exemplar já alocado mesmo quando não há outras cópias livres. O botão público Reservar fica com 36 px de altura fixa, preservando a largura. Esta regra substitui a descrição não bloqueante da revisão #65.

---

#65 28/09/2026 11:21:00
Adição de reservas públicas, fila administrativa e migração segura do Supabase
Descrição: Adicionado botão e fluxo público para solicitar reserva mediante busca pelo nome completo exato, com criação via RPC e sem SELECT/INSERT anônimo direto nas tabelas pessoais ou de circulação. Criada a aba RESERVAS no admin com busca, filtro, Realtime, cancelamento com histórico e confirmação transacional para converter a reserva em empréstimo. A reserva pendente não bloqueia estoque; a RPC revalida disponibilidade ao emprestar. Alunos e visitantes compartilham o limite de uma reserva pendente por pessoa e só concluem após devolver empréstimo ativo; funcionários podem manter reservas e empréstimos sem limite. Fila e relatório paginam mais de mil registros; o relatório inclui totais por status. O setup SQL cria tabela, índices, RLS, RPCs e publicação Realtime sem apagar reservas existentes. Documentação atualizada.

---

#64 28/09/2026 10:45:22
Correção nos arquivos `index.html` e `admin.html`
Descrição: Corrigida a montagem dos filtros de CLASSIFICAÇÃO INDICATIVA no acervo público e no acervo administrativo. Categorias legadas agora são normalizadas para as faixas atuais (LIVRE, 10 ANOS, 12 ANOS, 14 ANOS, 16 ANOS e 18 ANOS), permitindo que todas as classificações existentes sejam contabilizadas, exibidas e filtradas corretamente.

---

#63 28/09/2026 10:34:15
Remoção no arquivo `admin.html`
Descrição: Removidas dos cards de funcionários, alunos e visitantes da aba LISTA DE PESSOAS as badges que exibiam a quantidade de livros emprestados, tanto no renderizador ES quanto no renderizador UMD. Os badges de tipo/perfil e os botões EDITAR e EXCLUIR permanecem inalterados. Nenhuma mudança no banco de dados.

---

#62 28/09/2026 10:21:44
Correção no arquivo `admin.html`
Descrição: Corrigidos os subtítulos dos nomes nos tópicos da aba RELATÓRIO. Alunos agora exibem sexo, ano e turma; funcionários exibem Funcionário ou Funcionária conforme o sexo; visitantes exibem Leitor ou Leitora seguido de `— VISITANTE`. Nenhuma mudança no banco de dados.

---

#61 28/09/2026 10:08:19
Correção no arquivo `admin.html`
Descrição: Adicionada a checkbox "VISITANTE" ao modal EDITAR EMPRÉSTIMO, seguindo o comportamento já existente no formulário REGISTRAR SAÍDA. As opções FUNCIONÁRIO e VISITANTE são mutuamente exclusivas, as sugestões de pessoas são filtradas pelo perfil selecionado, empréstimos de visitantes existentes são reconhecidos pela turma `VISITANTE` e o salvamento mantém essa classificação. Nenhuma mudança no banco de dados.

---

#60 28/09/2026 09:56:00
Correção no arquivo `admin.html`
Descrição: Corrigida a mudança visual que ocorria após editar uma pessoa. O renderizador usado depois do salvamento agora utiliza o mesmo card compacto, badge, tipografia e disposição de botões do renderizador inicial, mantendo o layout consistente para alunos, funcionários e visitantes.

---

#59 28/09/2026 09:52:00
Correção no arquivo `admin.html`
Descrição: Ajustado o layout responsivo dos cards da Lista de Pessoas. O nome e o badge agora ocupam a largura disponível, enquanto os botões EDITAR e EXCLUIR ficam em uma linha própria, evitando que o badge de visitante comprima e quebre o card em telas estreitas.

---

#58 28/09/2026 09:47:00
Correção no arquivo `admin.html`
Descrição: Corrigida a renderização da Lista de Pessoas, que exibia visitantes como alunos com ano e turma (por exemplo, “ALUNO — EF 0º VISITANTE”). Visitantes agora aparecem como LEITOR ou LEITORA — VISITANTE. O modal de edição também passa a preservar o tipo VISITANTE.

---

#57 28/09/2026 09:43:00
Correção nos arquivos `admin.html`, `README.md` e `CHANGELOG.md`
Descrição: Visitantes passaram a seguir a mesma regra de empréstimo dos alunos: cada visitante pode ter no máximo um empréstimo ativo por vez. Antes, a validação de empréstimo ativo era feita apenas para alunos, permitindo que visitantes tivessem vários empréstimos simultâneos. Funcionários continuam podendo ter vários empréstimos ativos. A mensagem de bloqueio agora identifica se o perfil é ALUNO ou VISITANTE.

---

#56 28/09/2026 09:42:00
Correção nos arquivos `admin.html` e `CHANGELOG.md`
Descrição: Removidos os botões "×" dos modais RENOVAR EMPRÉSTIMO e EDITAR EMPRÉSTIMO, conforme solicitado. O botão de fechamento permanece somente no modal EDITAR CADASTRO; os botões CANCELAR dos três modais continuam inalterados.

---

#55 28/09/2026 09:38:00
Adição nos arquivos `admin.html` e `style.css`
Descrição: Adicionado um botão "×" no canto superior direito dos modais EDITAR CADASTRO, RENOVAR EMPRÉSTIMO e EDITAR EMPRÉSTIMO. Cada botão reutiliza a função de fechamento já existente do respectivo modal, possui rótulo acessível e mantém o mesmo comportamento do botão CANCELAR.

---

#54 28/09/2026 09:34:00
Adição nos arquivos `admin.html` e `CHANGELOG.md`
Descrição: Adicionado o botão "✕" de limpar busca ao campo "PESQUISAR LIVRO CADASTRADO" da aba CADASTRO. O botão aparece enquanto há texto, fica à esquerda do microfone, limpa o campo, fecha as sugestões, devolve o foco ao campo e mantém o fluxo de pesquisa por voz e por texto.

---

#53 28/09/2026 09:28:00
Adição nos arquivos `admin.html` e `CHANGELOG.md`
Descrição: Adicionado o botão de pesquisa por voz ao campo "PESQUISAR LIVRO CADASTRADO" da aba CADASTRO. O reconhecimento usa a mesma Web Speech API dos demais campos de busca, respeita a degradação graciosa em navegadores sem suporte e dispara o mesmo fluxo de busca textual já existente, incluindo debounce e sugestões para edição do livro.

---

#52 28/09/2026 09:21:04
Adição nos arquivos `admin.html` e `README.md`
Descrição: Nos cards do ACERVO do admin, a área de botões de ação ganhou o botão "✏️ EDITAR" (à esquerda de "🗑️ EXCLUIR"), nos dois renderizadores do card (módulo ES e UMD). Ao clicar, chama a nova função global `window._cadEditarLivro(id)`, definida no módulo de edição da aba CADASTRO (#50): ela busca o livro atualizado no banco com `DB.getLivroPorId` (com fallback para o cache da pesquisa), troca para a aba CADASTRO com `switchTab(null, 'tab-cadastro')` e chama a mesma função interna `selecionar()` usada ao escolher um livro na pesquisa — ou seja, o formulário é preenchido, o título e o botão passam a "EDITAR LIVRO" e aparece o aviso "EDITANDO: …". Se o livro não puder ser carregado, mostra um alerta. Sem mudança de CSS (a grade de 2 colunas de `.book-actions` já comporta os dois botões) e nenhuma mudança no banco de dados. Nenhuma outra mudança de #38-#51 foi alterada.

---

#51 28/09/2026 09:11:21
Adição/Correção no arquivo `admin.html` e `README.md`
Descrição: O botão Vân-IA agora também funciona no modo EDITAR LIVRO da aba CADASTRO (#50). Ao selecionar um livro para editar, o botão fica habilitado se o livro tiver capa salva (ou se uma nova capa for selecionada) e analisa a capa nova ou, se não houver, a capa já salva no banco (URL), junto com o verso novo ou salvo, respeitando "EXCLUIR CAPA/VERSO". Como no modo edição o formulário já vem preenchido, ao clicar aparece a confirmação "SIM, CONTINUAR" (com texto próprio para edição); confirmando, título, autor, ISBN, classificação, Volume, Edição e descrição da capa são substituídos pelo resultado da IA (a quantidade total não é alterada) e nada é gravado até clicar em "EDITAR LIVRO". Cancelando, nada muda. O campo de descrição da capa (`#altTextGroup`) permanece visível quando há capa. Novas funções `_vanIACapaAtual()` e `_vanIAVersoAtual()`; `_vanIAAtualizarBotao`, `abrirVanIA`, `_vanIAConfirmarNovaAnalise` e `_vanIALimparDadosAnteriores` foram ajustadas. O cadastro de livro novo continua igual. Nenhuma mudança no banco de dados. Nenhuma outra mudança de #38-#50 foi alterada.

---

#50 28/09/2026 09:05:00
Adição nos arquivos `admin.html` e `README.md`
Descrição: Na aba CADASTRO, acima das capas, novo campo "PESQUISAR LIVRO CADASTRADO" (título, autor, ISBN ou ID; sem acento e sem diferenciar maiúsculas; até 10 sugestões). Ao selecionar um livro, o formulário é preenchido com os dados dele (título, Volume, Edição, ISBN, autor — inclusive "Autor não identificado" —, classificação indicativa, quantidade total, descrição da capa, capa e verso), o título do card passa a "EDITAR LIVRO" e o botão "CADASTRAR LIVRO" passa a "EDITAR LIVRO"; um aviso "EDITANDO: …" com o botão "✕ NOVO LIVRO" volta ao modo de cadastro limpando o formulário. Ao salvar em modo edição, o livro é atualizado com `DB.atualizarLivro` (mesmo ID; `quantidade_disponivel` recalculada pelos empréstimos ativos) em vez de criar um novo; a quantidade total não pode ficar abaixo dos empréstimos ativos; capa e verso existentes são mantidos se não forem trocados e só são apagados no banco quando o bibliotecário usa "EXCLUIR CAPA/VERSO". As sugestões são criadas via DOM (`textContent`), sem `innerHTML` com dados do banco. Os textos fixos "CADASTRAR LIVRO" dos seletores de capa passaram a respeitar o modo atual (`window._cadLabelBtn`). Nenhuma mudança no banco de dados. O botão Vânia continua exigindo uma nova capa selecionada. Nenhuma outra mudança de #38-#49 foi alterada.

---

#49 28/09/2026 08:53:16
Correção no arquivo `CHANGELOG.md`
Descrição: Corrigida a ordem das entradas #34, #35, #36 e #37, que estavam em ordem crescente acima do #33; agora todo o histórico segue a ordem decrescente por ID (o mais recente no topo). Apenas a posição das entradas mudou — o conteúdo de todas foi mantido exatamente como estava.

---

#48 28/09/2026 08:52:03
Correção nos arquivos `admin.html` e `style.css`
Descrição: Ao marcar "AUTOR NÃO IDENTIFICADO" (formulário de cadastro e formulários de edição por IA), o campo de autor continua desabilitado (não editável), mas agora aparece em branco em vez de mostrar "N/A". O valor "N/A" continua sendo o gravado no banco (convenção já tratada por `fmtAutor`): as funções `_setupAutorNaoId`, `_sincAutorNaoId` e `_resetAutorNaoId` passaram a adicionar/remover a classe `.autor-oculto` no campo, e o `style.css` ganhou a regra `input.autor-oculto` que torna o texto transparente. Nenhuma outra mudança de #38-#47 foi alterada.

---

#47 28/09/2026 08:41:57
Correção no arquivo `bibcore.js`
Descrição: `fmtAutor` passou a tratar como "sem autor" (retornando vazio) também os textos legados "NÃO INFORMADO" / "NÃO INFORMADA" (com ou sem acento, em qualquer caixa), além de "N/A". Em livros antigos esse texto estava gravado no campo `autor` do banco, então continuava aparecendo mesmo com o fallback vazio (#46). Vale para todos os lugares que usam `fmtAutor`: cards do ACERVO e do catálogo público, EMPRÉSTIMO e DEVOLUÇÕES. Nenhuma mudança no banco de dados. Nenhuma outra mudança de #38-#46 foi alterada.

---

#46 28/09/2026 08:39:53
Correção no arquivo `admin.html`
Descrição: Na aba DEVOLUÇÕES (renderizador do módulo ES) o campo ISBN não aparecia; agora é exibido entre o título/Volume/Edição e o AUTOR. Nas abas EMPRÉSTIMO e DEVOLUÇÕES (card "LIVRO SELECIONADO", sugestões de busca, modal de edição de empréstimo e os dois renderizadores de devoluções), campos sem valor — Título, ISBN, Autor, ClassInd/Cat. — agora aparecem vazios, em vez de "NÃO INFORMADO", "NÃO INFORMADA" ou "—". O autor "N/A" (autor não identificado) também passa por `fmtAutor` e aparece vazio nas listas de sugestões e nos cards de empréstimo e devolução. Na linha de sugestões, o separador " · " só aparece quando há autor. O fallback "LIVRO #id" (livro excluído) e o "—" das datas foram mantidos. Nenhuma outra mudança de #38-#45 foi alterada.

---

#45 28/09/2026 08:34:27
Adição nos arquivos `admin.html` e `bibcore.js`
Descrição: Volume e Edição (#38) agora também aparecem nas abas EMPRÉSTIMO e DEVOLUÇÕES do admin. Na aba EMPRÉSTIMO: na lista de sugestões da busca de livro, no card "LIVRO SELECIONADO" e, no modal de edição de empréstimo, na busca de troca de livro e no card do livro. Na aba DEVOLUÇÕES: nos dois renderizadores (módulo ES e UMD), logo abaixo do título de cada livro emprestado. A função `fmtVolumeEdicao` (`bibcore.js`) ganhou o parâmetro opcional `opcoes` (`{estilo, negrito}`) para uso nessas listas compactas, mantendo o mesmo formato dos cards: "Volume: Xº" e "Edição: Yª" lado a lado com `gap:4ch`, linha sempre exibida mesmo em branco; sem `opcoes`, o comportamento dos cards do ACERVO e do catálogo público não muda. Para isso, as consultas `select` de livros usadas nessas telas (cache de busca do empréstimo, cache da edição de empréstimo, join de empréstimos em `carregarDevolucoes` e `getEmprestimosAtivosComLivro`) passaram a trazer as colunas `volume` e `edicao`. Nenhuma outra mudança de #38-#44 foi alterada.

---

#44 28/09/2026 08:29:25
Correção no arquivo `admin.html`
Descrição: No formulário de cadastro de livros (aba CADASTRO), os campos VOLUME e EDIÇÃO (#38) foram movidos para logo abaixo de TÍTULO DO LIVRO (antes do ISBN), em vez de ficarem abaixo de Classificação Indicativa. Continuam lado a lado e opcionais. Nenhuma outra mudança de #38-#43 foi alterada.

---

#43 28/09/2026 08:17:15
Correção no arquivo `bibcore.js`
Descrição: Ajustado o espaçamento entre "Volume:" e "Edição:" na linha gerada por `fmtVolumeEdicao` (#38-#42) de `gap:5ch` para `gap:4ch`, equivalente à largura de 3 dígitos + 1 espaço (ex.: "Volume: 000 Edição: 000"), conforme pedido. Aplica-se aos três cards que usam a função. Nenhuma outra mudança de #38-#42 foi alterada.

---

#42 26/09/2026 13:45:07
Correção no arquivo `bibcore.js`
Descrição: Aumentado o espaçamento entre "Volume:" e "Edição:" na linha gerada por `fmtVolumeEdicao` (#38-#41) — de `gap:0.5rem` para `gap:5ch` (equivalente à largura de 4 dígitos + 1 espaço), por estar visualmente pequeno demais. Aplica-se aos três cards que usam a função. Nenhuma outra mudança de #38-#41 foi alterada.

---

#41 26/09/2026 13:43:02
Correção no arquivo `bibcore.js`
Descrição: Na linha Volume/Edição gerada por `fmtVolumeEdicao` (#38-#40), removido o separador "|" entre "Volume:" e "Edição:"; os dois campos agora ficam lado a lado com espaçamento padrão do projeto (`gap:0.5rem`, via `display:flex` nos dois `<span>` internos), em vez de texto unido por " | ". Aplica-se aos três cards que usam a função (catálogo público e os dois renderizadores do admin). Nenhuma outra mudança de #38-#40 foi alterada.

---

#40 26/09/2026 13:41:12
Correção no arquivo `bibcore.js`
Descrição: A linha "Volume: | Edição: " gerada por `fmtVolumeEdicao` (#38/#39) passou a usar as mesmas classes CSS dos demais campos do card — `book-meta-item book-meta-single` (as mesmas de AUTOR, ISBN e ClassInd) — para ficar no mesmo tamanho e fonte dos outros campos, em vez da classe própria `book-volume-edicao` (sem estilo definido, que herdava a formatação padrão de bloco). Os rótulos "Volume:" e "Edição:" passaram a ficar em negrito via `<strong>`, no mesmo padrão usado pela linha de ISBN (rótulo em negrito, valor em peso normal). Nenhuma outra mudança de #38/#39 foi alterada.

---

#39 26/09/2026 13:34:26
Correção no arquivo `bibcore.js`
Descrição: Corrigido o comportamento da função `fmtVolumeEdicao` (#38). Antes, quando nem Volume nem Edição eram informados, a linha inteira era omitida do card. Agora a linha "Volume: | Edição: " é sempre exibida abaixo do título, mesmo quando os dois campos estão em branco — apenas o número/ordinal de cada parte some quando o respectivo valor não foi informado (ex.: só "1º" some se Volume estiver vazio, mas o rótulo "Volume: " continua aparecendo). Nenhuma outra mudança de #38 foi alterada.

---

#38 26/09/2026 13:32:18
Adição nos arquivos `admin.html`, `index.html`, `bibcore.js` e `supabase_setup.sql`
Descrição: Adicionados os campos Volume e Edição ao livro, ambos numéricos e opcionais. No formulário de cadastro (`admin.html`, aba CADASTRO), dois novos campos numéricos lado a lado, abaixo de Classificação Indicativa: VOLUME e EDIÇÃO, sem valor mínimo obrigatório. No `bibcore.js`, criada a função exportada `fmtVolumeEdicao(volume, edicao)`, que retorna a linha `Volume: Xº | Edição: Yª` para exibição nos cards — omitindo a parte cujo valor não foi informado, e retornando string vazia (linha não aparece) quando nenhum dos dois foi identificado; adicionada aos campos retornados por `getLivros()`. A linha é exibida logo abaixo do título nos cards do catálogo público (`index.html`, `renderizarLivro`) e nos dois renderizadores de card do painel admin (`admin.html`: `renderLivro`, do módulo ES, e `cardLivro`, do script UMD que alimenta a aba ACERVO) — os três importam/expõem `fmtVolumeEdicao` em `window` seguindo o mesmo padrão já usado por `fmtAutor`/`spanCategoria`. O payload de cadastro (`formLivro` submit) passou a enviar `volume` e `edicao` (convertidos para inteiro, `null` se vazios) para `DB.salvarLivro`. A query de carregamento do acervo admin (`carregarAcervo`) também passou a buscar as duas colunas. Botão Vân-IA (análise por IA da capa e do verso, via Groq): o `VANIA_PROMPT` foi ampliado para pedir também `"volume"` e `"edicao"` (inteiros ou `null`) quando esses números estiverem impressos na capa ou no verso do livro (ex.: "VOLUME 2", "3ª EDIÇÃO"), e `_vanIAPreencherFormulario` passou a preencher os dois campos automaticamente sem sobrescrever valores já digitados manualmente; `_vanIAHaDadosPreenchidos` e `_vanIALimparDadosAnteriores` foram atualizadas para considerar/limpar `volume` e `edicao` junto dos demais campos preenchidos pela IA. No `supabase_setup.sql`, adicionadas as colunas `volume INTEGER` e `edicao INTEGER` ao `CREATE TABLE livros`, e adicionada, seguindo o mesmo padrão já usado para a remoção de `palavras_chave`, uma migração idempotente `ALTER TABLE IF EXISTS livros ADD COLUMN IF NOT EXISTS volume/edicao INTEGER;` logo no início do script, para bancos já existentes.

---

#37 26/09/2026 13:18:42
Mudança no arquivo `supabase_setup.sql`
Descrição: A coluna `palavras_chave` (mantida na #36 por precaução) foi removida do schema. Retirada da instrução `CREATE TABLE livros`, e adicionada, seguindo o mesmo padrão já usado para a remoção da tabela `reservas`, uma instrução `ALTER TABLE IF EXISTS livros DROP COLUMN IF EXISTS palavras_chave;` logo no início do script — idempotente e segura tanto para instalações novas (onde a coluna nunca é criada) quanto para bancos existentes (onde a coluna é removida ao rodar o script de novo). Comentário de cabeçalho do arquivo atualizado. Nenhuma outra tabela ou dado foi afetado.

---

#36 26/09/2026 13:17:02
Mudança nos arquivos `admin.html`, `index.html`, `bibcore.js` e `README.md`
Descrição: O campo palavra-chave foi removido por completo do sistema, após três tentativas de lista (nível de leitura #até-#33, gênero literário #34, estrutura textual #35) nenhuma ter se mostrado adequada. Removidos: o campo do formulário de cadastro manual (`admin.html`), o array/select de opções fixas, a exibição de tags clicáveis nos cards de livro (admin e catálogo público, três implementações distintas), a busca por `#tag` (admin e público), a função `window.filtrarPorTag`, a coluna "PALAVRA-CHAVE" do export CSV/PDF do catálogo público (com ajuste do array de larguras de coluna), a regra 5 e o campo `palavra_chave` do JSON de resposta do `VANIA_PROMPT` (Groq), a normalização do array em `bibcore.js` (`padronizarObjeto`), e o campo `palavras_chave` de todas as queries `.select(...)` do Supabase (admin, público e bibcore). README atualizado em todas as seções que mencionavam o recurso (funcionalidades, busca, fluxo Vânia, classificação indicativa, convenções internas). A coluna `palavras_chave` foi mantida no schema do Supabase (`supabase_setup.sql`) — não houve `DROP COLUMN` — para preservar dados já cadastrados; ela simplesmente deixou de ser lida/escrita pela aplicação. Categoria (classificação indicativa por idade) não foi afetada.

---

#35 26/09/2026 13:04:24
Mudança nos arquivos `admin.html` e `README.md`
Descrição: A lista de palavra-chave por gênero literário (#34) foi substituída por classificação de estrutura textual, mais restrita: Prosa, Verso, Drama. Atualizado o array de fallback dos 4 selects de palavra-chave e reescrita a regra 5 do `VANIA_PROMPT` (Groq) explicando cada uma das 3 opções (Prosa = texto corrido; Verso = versos/estrofes; Drama = diálogos/rubricas cênicas). README atualizado na seção de Classificação indicativa e na contagem de opções fixas descrita no fluxo do botão Vânia (de "7 fixas" para "3 fixas"). Categoria (classificação indicativa por idade) não foi afetada.

---

#34 25/09/2026 14:43:41
Mudança nos arquivos `admin.html` e `README.md`
Descrição: A lista fixa de palavra-chave, antes baseada em nível de leitura/tipo de material (Infantil, Infantojuvenil, Juvenil I, Juvenil II, Poesia, Material Didático, Educação Inclusiva), foi substituída por gêneros literários: Romance, Novela, Conto, Crônica, Poema, Didático, Acadêmico. Atualizado o array de fallback usado para popular os 4 selects de palavra-chave (cadastro/edição manual e com IA), e reescrita a regra 5 do prompt da Groq (`VANIA_PROMPT`) para pedir à IA um desses 7 gêneros, com uma explicação breve de cada um entre parênteses para orientar a classificação a partir da capa. README atualizado na seção de Classificação indicativa para refletir a nova lista. A classificação indicativa por idade (categoria, Livre a 18 anos) não foi alterada — é um campo independente.

---

#33 24/09/2026 00:29:55
Mudança no arquivo `admin.html`
Descrição: Overlay de confirmação (#31/#32) trocado de círculo verde com check + "LOGADO!" para a logo da biblioteca + "Bem-vindo!". O `<div id="adminLoginCheck">` com o SVG de check foi removido e substituído por `<img id="adminLoginSucessoLogo" src="logo.png">` — mesmo arquivo `logo.png` já usado no topo do formulário de login, então em bibliotecas derivadas pelo BibMaker a logo exibida é automaticamente a da biblioteca derivada, sem precisar de nenhum ajuste extra.

---

#32 24/09/2026 00:24:49
Correção no arquivo `admin.html`
Descrição: Quando havia sessão já ativa, o formulário de login (`#adminLoginContent`) ainda aparecia visível por um instante antes do overlay "LOGADO!" (#31) cobrir a tela, porque `#adminLoginContent` não tinha estado inicial oculto — só o overlay de sucesso era controlado por JS. Agora `#adminLoginContent` começa com `aria-hidden="true"` (`display:none` via CSS) e só é revelado dentro de `_mostrarLoginAdmin()`, chamada por `init()` exclusivamente quando NÃO há sessão; com sessão válida, `init()` vai direto pro overlay de sucesso e o formulário nunca chega a aparecer.
Efeito colateral corrigido junto: o auto-ajuste de fonte do nome da escola (#30) rodava no carregamento da página, mas com `#adminLoginContent` escondido por padrão, media largura zero (`scrollWidth`/`clientWidth` de elemento com `display:none`) e nunca encolhia a fonte quando o formulário de fato aparecia para quem não está logado. A lógica de preencher+medir foi extraída pra uma função nomeada (`_ajustarNomeEscolaLogin`, antes uma IIFE anônima), guardada contra repreenchimento (`dataset.preenchido`) e agora é chamada de novo dentro de `_mostrarLoginAdmin()` — via `requestAnimationFrame`, depois que o conteúdo já está com layout — garantindo a medição correta toda vez que o formulário é de fato revelado.

---

#31 23/09/2026 15:20:32
Adição no arquivo `admin.html`
Descrição: Adicionado um overlay de confirmação `#adminLoginSucesso` (círculo verde com check animado + texto "LOGADO!"), exibido por cima do overlay de login antes do painel ser revelado. Integrado num único ponto — dentro de `init()`, logo após a sessão ser confirmada válida e antes de `_ocultarLoginAdmin()` — então cobre tanto o login recém-feito pelo formulário quanto o caso de abrir admin.html já com sessão ativa (nenhum dos dois casos tinha qualquer feedback visual de confirmação antes). Pausa de 900ms antes de revelar o painel. `_mostrarLoginAdmin()`/`_ocultarLoginAdmin()` passaram a resetar o estado do overlay de sucesso (`_ocultarLoginSucesso()`) pra ele nunca aparecer já visível na próxima vez que o login for mostrado.

---

#30 23/09/2026 15:07:52
Correção no arquivo `admin.html`
Descrição: Revertida a abordagem do #29 (`text-wrap:balance`) — a pedido do usuário, cada linha do nome da escola no login deve caber numa linha só, não quebrar de forma equilibrada em duas. `#adminLoginBox .school-name{width:100%}` garante que o container ocupe a largura real disponível; o script que preenche `l1`/`l2` (mesmo de #28) passou a, logo depois de montar o HTML, aplicar `white-space:nowrap` em cada `span` e reduzir seu `font-size` em passos de 0.5px (piso de 9px) até `scrollWidth` caber dentro de `clientWidth`. Abordagem via JS (em vez de só CSS) porque o nome da escola vem das metatags `nomeesc1`/`nomeesc2`, que variam de tamanho em cada biblioteca derivada pelo BibMaker — um valor fixo de font-size não serviria pra todos os casos.

---

#29 23/09/2026 15:05:03
Correção no arquivo `admin.html`
Descrição: No nome da escola adicionado no overlay de login (#28), a linha "PROFESSORA MARIA VÂNIA FARIAS LINHARES" quebrava de forma desequilibrada — "LINHARES" sozinho numa segunda linha, órfão. Causa: a largura estreita do card de login (420px, menor que o cabeçalho de index.html/admin.html, onde o texto cabe numa faixa mais larga) força a quebra, e o comportamento padrão de wrap só quebra no último espaço que couber, sem considerar a linha seguinte. Adicionado `text-wrap:balance` em `#adminLoginBox .school-name span:last-child`, restrito ao contexto do login — o navegador agora distribui o texto entre as linhas de forma equilibrada em vez de deixar uma palavra sozinha.

---

#28 23/09/2026 15:03:04
Adição no arquivo `admin.html`
Descrição: O overlay de login embutido mostrava só "BIBVANIA ONLINE" e "ÁREA DO BIBLIOTECÁRIO", sem o nome da escola que já aparece no cabeçalho do index.html e do próprio admin.html (pós-login). Adicionado, logo abaixo do `<h1>`, um `div.school-name` (mesma classe/estrutura visual usada nos dois cabeçalhos) preenchido dinamicamente pelas mesmas metatags `nomeesc1`/`nomeesc2` já existentes em `<head>` — e não com o texto fixo "Biblioteca Escolar da EMTI Professora Maria Vânia Farias Linhares", para continuar funcionando corretamente em bibliotecas derivadas pelo BibMaker, que têm nome de escola diferente. "ÁREA DO BIBLIOTECÁRIO" foi mantido abaixo, sem alteração.

---

#27 23/09/2026 15:01:33
Correção no arquivo `admin.html`
Descrição: Ao focar o campo E-MAIL do overlay de login embutido, o navegador rolava só o mínimo necessário pra revelar esse campo, cortando parcialmente a caixa SENHA logo abaixo (sem `scroll-margin` nele, o comportamento padrão de scroll-into-view não considera o conteúdo seguinte). Adicionado `scroll-margin-bottom:6rem` em `#adminLoginEmail` — margem suficiente para cobrir label+campo+espaçamento do grupo SENHA abaixo, então o foco no e-mail agora rola o suficiente pra revelar a caixa de senha inteira também, sem depender do teclado. Complementa a correção #26, que já tinha resolvido o mesmo problema no campo SENHA propriamente.

---

#26 23/09/2026 14:59:39
Correção no arquivo `admin.html`
Descrição: A correção #25 (`padding-bottom:35vh` em `#adminLoginContent`) resolveu o campo de senha ficando coberto pelo teclado, mas passou a rolar longe demais — o navegador usava toda essa folga como área rolável ao focar o campo, indo bem além do necessário. Trocado por uma abordagem mais precisa: `padding-bottom` de `#adminLoginContent` reduzido para `6vh` (folga mínima de segurança no fim do overlay) e adicionado `scroll-margin-bottom:45vh` diretamente em `#adminLoginPassword` — assim o navegador rola só o suficiente para deixar essa margem livre abaixo do campo ao focá-lo (compensando a altura do teclado), sem depender de um espaço vazio grande no fim do conteúdo.

---

#25 23/09/2026 14:53:44
Correção no arquivo `admin.html`
Descrição: No overlay de login embutido, o campo de senha podia ficar coberto pelo teclado do celular sem nenhuma forma de rolar até ele. Causa: `#adminLoginOverlay` já tem `overflow:auto`, mas seu conteúdo (`#adminLoginContent`) é mais baixo que o próprio overlay, então o navegador não reconhece overflow algum — mesmo com o teclado reduzindo a área visível. Adicionado `padding-bottom:35vh` em `#adminLoginContent`, criando folga suficiente para rolar até a altura do campo de senha. A trava de scroll do documento (`html.admin-login-locked`/`body.admin-login-locked`, que impede a aba admin de aparecer atrás do overlay) não foi alterada — a folga fica inteiramente dentro do overlay, que já cobre a tela inteira via `position:fixed;inset:0`.

---

#24 23/09/2026 14:50:12
Correção e remoção nos arquivos `bibcore.js` e `admin.html`
Descrição: Duas mudanças ligadas à migração do login para um overlay embutido em `admin.html` (que não chama mais `DB.checkAuth()`, e sim `DB.getSession()` direto, mostrando/escondendo seu próprio overlay `#adminLoginOverlay`). (1) Removida de `DB.signOut()` (bibcore.js) a navegação morta para `login.html` — nenhum ponto de `admin.html` chama `DB.signOut()` (o logout local usa `_encerrarSessaoAdmin()`, que chama `DB.supabase.auth.signOut()` diretamente); `DB.checkAuth()` e `DB.redirectIfLoggedIn()` continuam existindo em bibcore.js, ainda referenciando `login.html`, e não foram alteradas nesta entrada. (2) Corrigido bug em que um modal do painel (perfil, editar pessoa, renovar empréstimo ou editar empréstimo) deixado aberto ao deslogar reaparecia já visível no login seguinte: como o logout não recarrega mais a página, o modal ficava apenas escondido atrás do overlay de login, não fechado. `_mostrarLoginAdmin()` (chamada em todo caminho de logout) agora também fecha esses quatro modais.

---

#23 22/09/2026 23:58:02
Mudança no arquivo `login.html`
Descrição: A pedido do usuário, login.html deixou de redirecionar direto e invisível para admin.html quando já há sessão ativa (`DB.redirectIfLoggedIn()`). Agora o body é revelado imediatamente e a própria página checa `DB.getSession()`: com sessão ativa, o formulário (campos + botão "ENTRAR NO PAINEL") é escondido e substituído pela mensagem "✅ VOCÊ JÁ ESTÁ LOGADO — ABRINDO O PAINEL...", com uma pausa visual de ~2s (ajustada de ~900ms a pedido do usuário, rápida demais pra ler) antes de navegar para admin.html — uma passagem visual intencional pela tela de login mesmo já autenticado, validando a sessão e só então mandando pro admin. Diferente da tentativa revertida em #18/#19: aquela forçava um vai-e-volta de DUAS páginas completas (admin.html → login.html → admin.html, via flag em sessionStorage) e travou no mobile; esta mudança fica inteira dentro de login.html, sem tocar em admin.html nem forçar nenhuma navegação extra, então não recria a mesma condição de corrida. `DB.redirectIfLoggedIn()` (bibcore.js) não é mais chamada por nenhum arquivo, mas foi mantida (dormente) por não ser código sensível.

---

#22 22/09/2026 23:44:10
Auditoria de segurança completa + correção no arquivo `index.html`
Descrição: Varredura de todas as tabelas, políticas RLS, canais Realtime, Storage e RPCs em busca de outros vazamentos de dado privado pro público, após as correções #20/#21. Achado: `index.html` assinava `window.DB.onEmprestimosChange(debounce)` — um canal Realtime público na tabela `emprestimos` (dados de aluno). O RLS do Supabase filtra Realtime por padrão desde 2021, mas há relatos de eventos DELETE escapando do filtro em certas configurações; como a assinatura não tinha mais função real (o handler só disparava refresh, e `livros.quantidade_disponivel` já é recalculado pelo trigger `recalcular_disponivel` e já aciona `onLivrosChange`, que a página já escuta), foi removida — sem perda de funcionalidade. Confirmado como já corretos e sem mudança: a chave embutida em `bibcore.js` é a `anon` (não `service_role` — confirmado decodificando o JWT), `config_privada`/`admins`/`livros_excluidos` seguem restritos a autenticado e nunca são referenciados nas páginas públicas, sem uso de Supabase Storage, sem função RPC exposta.

---

#21 22/09/2026 23:31:40
Simplificação no arquivo `index.html`
Descrição: Removida do catálogo público a busca de `emprestimos_status_publico` (view criada na mudança #20) e as variáveis mortas `idsAtrasadosCache`/`empsAtivosCache` que ela alimentava. Motivo: o destaque visual de "atrasado" (borda vermelha em `renderizarLivro`) nunca foi de fato ligado — a chamada real sempre passa `isAtrasado=false` fixo — então não havia nenhum uso real desses dados na página pública. Como o recurso não existe de verdade, não faz sentido a página pública buscar nada relacionado a empréstimo, nem por uma via seguramente filtrada; `index.html` agora busca só `getLivros()`. A view `emprestimos_status_publico` e `DB.getStatusEmprestimosPublico()` (bibcore.js) continuam existindo, dormentes e seguras (só expõem livro_id + atrasado, sem dado de aluno) — prontas caso o destaque "atrasado" seja implementado de verdade no futuro.

---

#20 22/09/2026 23:16:25
Correção de segurança nos arquivos `supabase_setup.sql`, `bibcore.js`, `index.html`, `admin.html` e `login.html`
Descrição: Revisão de segurança de ponta a ponta, cobrindo quatro frentes. (1) VAZAMENTO DE DADOS DE ALUNO SEM LOGIN — as políticas RLS "Leitura pública de pessoas" e "Leitura pública de emprestimos" permitiam que qualquer pessoa com a chave anon (pública no bibcore.js) consultasse a API do Supabase diretamente e baixasse nome, sexo, ano/turma e status de PCD de todos os alunos/funcionários (tabela pessoas), além de quem estava com qual livro (tabela emprestimos) — sem nenhuma autenticação. Ambas as políticas foram removidas; a política "Escrita autenticada" (FOR ALL) de cada tabela já cobre a leitura do admin logado. Como o catálogo público (index.html) usava emprestimos apenas para o destaque de "atrasado" (livro_id + atrasado, nunca dados de aluno), foi criada a view `emprestimos_status_publico` (SQL, seção 13) expondo só essas duas colunas, com SELECT liberado para anon; `bibcore.js` ganhou `DB.getStatusEmprestimosPublico()` e `index.html` passou a usá-la no lugar de `getEmprestimosAtivos()`. (2) SESSÃO SEM EXPIRAÇÃO — a sessão do Supabase persistia indefinidamente no localStorage; em aparelho compartilhado/emprestado, quem pegasse o celular continuaria logado como bibliotecário. Adicionado logout automático por inatividade em admin.html (`_iniciarLogoutPorInatividade`): sem nenhuma interação (toque/clique/tecla/rolagem) por 20 minutos, a sessão é encerrada e a tela volta para login.html; qualquer interação reinicia a contagem. (3) FORÇA BRUTA NO LOGIN — login.html ganhou um freio client-side: a cada tentativa de senha incorreta, o botão "ENTRAR NO PAINEL" fica temporariamente desabilitado com espera crescente (1s, 2s, 4s... até 30s), resetando no login bem-sucedido ou ao recarregar a página; a mensagem de erro genérica ("E-MAIL OU SENHA INCORRETOS", sem indicar se o problema foi o e-mail ou a senha) foi mantida. Isso é uma camada extra de UX — a proteção real contra força bruta continua sendo o rate limiting nativo do Supabase Auth (configurável no Dashboard, ver README/aviso ao usuário). (4) REVISÃO GERAL — confirmado que checkAuth()/redirectIfLoggedIn() (admin.html/login.html), as políticas de escrita autenticada em livros/emprestimos/pessoas, a leitura restrita de config_privada e a ausência de cadastro público de admin (criação só via SQL Editor) já estavam corretos e não precisaram de mudança.

---

#19 22/09/2026 22:59:23
Reversão nos arquivos `admin.html`, `login.html`, `bibcore.js` e `index.html`
Descrição: Revertida a mudança #18 (gate obrigando admin.html a sempre passar fisicamente por login.html, mesmo com sessão já ativa). Na prática, em uso real no mobile, esse encadeamento de duas navegações completas de página (admin.html → login.html → admin.html) travou numa tela azul sólida (cor do `theme-color`, `#2563eb`) sem nunca completar o redirecionamento de volta ao painel — causa raiz não totalmente isolada, mas o padrão em si (duas navegações de documento completas dependendo de timing assíncrono de `getSession()`, `sessionStorage` e possível corrida com `navegarComTransicao` sendo religado no `DOMContentLoaded` antes do redirecionamento assíncrono terminar) se mostrou frágil demais para o ganho. Removido: o gate no topo do `<head>` de admin.html (bloco de script que checava a flag `sessionStorage['bibvania_via_login']`); a gravação dessa flag em `DB.redirectIfLoggedIn()` (bibcore.js) e no submit do formulário de login.html; a mudança em `irParaAdmin()` (index.html, duas cópias) que forçava sempre passar por login.html. Restaurado o comportamento das correções #16 e #17: `admin.html` continua protegido por `DB.checkAuth()` (nunca abre sem sessão válida, sem flash — corrigido no #16) e `login.html` continua protegido por `DB.redirectIfLoggedIn()` (nunca mostra o formulário com sessão já ativa, sem flash — corrigido no #17); `irParaAdmin()` volta a verificar a sessão e ir direto para admin.html quando já logado, evitando a navegação dupla desnecessária. `DB.redirectIfLoggedIn()` mantém o retorno `true`/`false` introduzido no #17 (continua útil para login.html decidir quando revelar o body).

---

#18 22/09/2026 22:37:24
Mudança nos arquivos `admin.html`, `login.html`, `bibcore.js` e `index.html`
Descrição: Garantido que admin.html nunca abre sem passar pela lógica de login.html antes — mesmo com o bibliotecário já logado. Antes, havia três formas de chegar direto no painel sem passar por login.html: (1) o botão "Área do Bibliotecário" em index.html (`window.irParaAdmin()`, duas cópias — uma no script inline de fallback, outra no módulo ES) verificava a sessão e navegava direto para admin.html quando já havia sessão ativa; (2) qualquer acesso direto à URL de admin.html (favorito, digitação, atualização de página) com sessão válida também carregava o painel direto, sem tocar em login.html. Correção: `irParaAdmin()` em index.html agora sempre navega para login.html, sem checar sessão. Em admin.html, adicionado um gate no topo do `<head>`, antes de qualquer outro script — só continua o carregamento se encontrar a flag `sessionStorage['bibvania_via_login']=='1'` (e a consome, removendo-a); qualquer outro caso (sem a flag) redireciona imediatamente para login.html via `window.location.replace()`. Essa flag é gravada em dois pontos de login.html/bibcore.js, sempre logo antes de navegar para admin.html: em `DB.redirectIfLoggedIn()` (quando a sessão já está ativa ao carregar login.html) e no handler de submit do formulário de login (após `signIn()` bem-sucedido). Resultado: toda navegação para admin.html passa primeiro pela lógica de login.html — com sessão ativa, o encaminhamento de volta para admin.html é automático e sem exibir o formulário (login.html continua com o body oculto o tempo todo, sem flash); sem sessão, o formulário de login é exibido normalmente. Efeito colateral aceito: atualizar a página (F5) com o painel admin aberto agora também passa, de forma rápida e invisível, por login.html antes de o painel recarregar — é o preço de nunca permitir acesso direto.

---

#17 22/09/2026 22:33:13
Correção nos arquivos `bibcore.js` e `login.html`
Descrição: Corrigido o painel de login aparecendo por um instante antes de redirecionar para `admin.html`, mesmo com o bibliotecário já autenticado — mesma causa raiz do #16, agora do lado do `login.html`. `redirectIfLoggedIn()` (em `bibcore.js`) disparava a navegação para `admin.html` via `window.location.href`, mas não interrompe a execução do script; a função não retornava nenhuma indicação de que havia redirecionado. Assim, o `login.html` sempre executava `document.body.style.visibility='visible'` logo depois de chamar `redirectIfLoggedIn()`, revelando a tela de login por um instante mesmo quando a sessão já era válida e o redirecionamento para o admin já tinha sido disparado. Correção: `redirectIfLoggedIn()` agora retorna `true` quando redireciona (sessão ativa) e `false` quando não (sem sessão); `login.html` só torna o body visível quando o retorno é `false` — com sessão ativa, o body nunca chega a ser revelado antes de a navegação para `admin.html` acontecer.

---

#16 22/09/2026 22:31:18
Correção no arquivo `admin.html`
Descrição: Corrigido o painel admin aparecendo por alguns segundos antes do redirecionamento para o login, quando não havia sessão válida. Causa raiz: o script inline do `<head>` que restaura a aba ativa (`sessionStorage`) tornava o `body` visível (`document.body.style.visibility='visible'`) incondicionalmente no evento `DOMContentLoaded` — sem esperar a verificação de autenticação, que só roda depois, dentro de `init()` (módulo ES), via `DB.checkAuth()`. Como `DOMContentLoaded` dispara muito antes de `checkAuth()` resolver (especialmente quando é preciso tentar `refreshSession()` antes de decidir redirecionar), o painel inteiro ficava visível nesse intervalo, mesmo sem sessão. Além disso, mesmo depois de `checkAuth()` decidir redirecionar, `init()` continuava executando o resto da inicialização (carregar chaves privadas, perfil, dados de livros/pessoas etc.), já que `window.location.href = url` não interrompe a execução do script. Correção: removida a linha que tornava o body visível no `DOMContentLoaded`; `init()` agora captura o retorno de `DB.checkAuth()` — se não houver sessão, `checkAuth()` já redireciona para `login.html` e `init()` retorna imediatamente, sem revelar o body nem continuar a inicialização; só com sessão confirmada o body é tornado visível (`document.body.style.visibility='visible'`), logo no início de `init()`, antes do restante do carregamento.

---

#15 22/09/2026 21:24:28
Mudança nos arquivos `admin.html`, `bibcore.js` e `supabase_setup.sql`
Descrição: Unificada a UI de perfil do admin principal com a do admin secundário. Antes, só o admin secundário (com linha na tabela `admins`) via o botão de perfil (👤) com o modal de nome/foto/sair; o admin principal via só um botão SAIR solto no menu de atalhos. Agora todo mundo que loga vê o botão de perfil e o mesmo modal — o botão SAIR solto nunca mais aparece. Quando não há `nome` cadastrado (caso do admin principal, que não tem linha em `admins`), o botão mostra "OLÁ, ADMIN!" em vez de "OI, `<nome>`!", e o modal usa "ADMIN" como nome/inicial de exibição. As funções `_aplicarUIAdminPrincipal()`/`_aplicarUIAdminSecundario()` foram fundidas em `_aplicarUIPerfil()`. O envio de foto passou de `UPDATE` para `UPSERT` na tabela `admins` (incluindo sempre `nome`, que é `NOT NULL`, usando "ADMIN" como fallback), para o admin principal conseguir criar sua própria linha ao enviar a primeira foto — isso exigiu uma nova política de RLS de INSERT em `admins` ("Admin cria próprio perfil", `WITH CHECK (auth.uid() = id)`) no `supabase_setup.sql`, que precisa ser reaplicado no SQL Editor do Supabase em bibliotecas já publicadas para o recurso funcionar. Também adicionada uma chave de cache `bibvania_admin_semnome` (localStorage) para o admin principal não ver mais um flash do botão SAIR solto antes do modal de perfil aparecer — limpa no login com nome, no logout manual e no logout por sessão perdida, junto com `bibvania_admin_nome`.

---

#14 22/09/2026 20:32:33
Correção no arquivo `admin.html`
Descrição: No modal Editar Empréstimo, a lista de sugestões ao buscar outro livro aparecia empurrada para baixo do card "LIVRO SELECIONADO" inteiro, em vez de logo abaixo do campo de busca — dificultando a busca visualmente. Causa: o card `edt-livroCard` estava dentro do mesmo `.form-group` com `position:relative` que o campo de busca e a caixa de sugestões (`edt-livroSug`, `position:absolute; top:100%`); como o `top:100%` é calculado sobre a altura total do container posicionado mais próximo, e o card contava nessa altura, a sugestão era deslocada para baixo dele. Movido `edt-livroCard` para fora desse `.form-group`, como uma div irmã logo abaixo — mesma estrutura já usada na aba Empréstimo (Registrar Saída), onde esse problema não ocorria.

---

#13 22/09/2026 20:28:16
Correção no arquivo `admin.html`
Descrição: O card "LIVRO SELECIONADO" da aba Empréstimo (Registrar Saída) mostrava só ID, título, autor, classificação indicativa e quantidade disponível — faltavam ISBN, palavras-chave e quantidade total de exemplares, que o modal de Editar Empréstimo já exibe desde a correção #7. Causa: as duas consultas que alimentam `_livrosCache` nessa aba (busca sob demanda e pré-carregamento em segundo plano) selecionavam só `id,titulo,autor,categoria,quantidade_disponivel` no Supabase, sem `isbn`, `palavras_chave` e `quantidade_total`. Ambas as consultas passaram a selecionar também esses três campos, e `_mostrarLivroCard()` foi atualizada para exibir ISBN, PALAVRAS-CHAVE e a disponibilidade no formato `disponível/total`, igual ao card do modal de edição.

---

#12 22/09/2026 19:54:08
Correção no arquivo `admin.html`
Descrição: Corrigida a checkbox VISITANTE da aba Empréstimo, que nunca ficava marcada (verde) e parecia impossível de marcar. A causa era a função `_limparPessoa()`, chamada a cada mudança de perfil e a cada busca de pessoa, que forçava `chkVisit.checked = false` e removia a classe `checked` do rótulo incondicionalmente, desfazendo a marcação feita por `atualizarPerfilEmprestimo()` no mesmo instante. Removidas as duas linhas de `_limparPessoa()` que resetavam a checkbox VISITANTE — a limpeza da pessoa selecionada não deve mais alterar o perfil escolhido (FUNCIONÁRIO/VISITANTE). A checkbox FUNCIONÁRIO nunca teve esse problema, pois `_limparPessoa()` nunca mexeu nela.

---

#11 22/09/2026 19:35:10
Adição e correção no arquivo `admin.html`
Descrição: Adicionada a checkbox VISITANTE na aba Empréstimo. A busca agora permite selecionar cadastros do tipo visitante, exibindo LEITOR ou LEITORA, gravando a turma como VISITANTE e mantendo a seleção de Funcionário e Visitante mutuamente exclusiva. Visitantes podem ter mais de um empréstimo ativo, assim como funcionários; a regra de apenas um empréstimo ativo continua exclusiva dos alunos.

---

#10 22/09/2026 19:22:40
Correção no arquivo `admin.html`
Descrição: Corrigida a alternância das checkboxes do cadastro de pessoas. Ao marcar Funcionário, Visitante é desmarcado; ao marcar Visitante, Funcionário é desmarcado e a opção clicada permanece marcada. A seleção de sexo e os campos exibidos continuam sendo atualizados conforme o perfil escolhido.

---

#9 22/09/2026 19:10:30
Correção no arquivo `admin.html`
Descrição: Corrigido o contador exibido ao lado do nome na aba Devoluções. O formato `(x/y)` agora representa a posição do empréstimo dentro dos empréstimos ativos da própria pessoa e o total de livros ativos dessa pessoa, em vez do total global do sistema. Assim, uma pessoa com um livro aparece como `(1/1)` e uma pessoa com dois livros aparece como `(1/2)` e `(2/2)`.

---

#8 22/09/2026 18:45:20
Adição no arquivo `admin.html`
Descrição: Adicionada ao lado do nome de cada pessoa na aba Devoluções a indicação dinâmica `(x/y)`, em que `x` é a posição do empréstimo ativo exibido e `y` é o total de empréstimos ativos. A numeração é recalculada ao registrar, devolver ou excluir empréstimos, incluindo funcionários com vários livros emprestados.

---

#7 22/09/2026 18:25:40
Correção nos arquivos `admin.html` e `bibcore.js`
Descrição: Complementadas as informações do livro exibidas no modal Editar Empréstimo, aberto tanto pela aba Empréstimos quanto pela aba Devoluções. O cartão agora apresenta título, ID, ISBN, autor, classificação indicativa, palavras-chave e quantidade de exemplares. As consultas de empréstimos também passaram a carregar esses dados completos, evitando que informações desapareçam ao abrir a edição.

---

#6 22/09/2026 17:54:50
Adição nos arquivos `admin.html` e `bibcore.js`
Descrição: O modal de edição de empréstimos agora permite pesquisar e selecionar outro livro. Ao salvar, o sistema atualiza o `livro_id`, verifica a disponibilidade do novo livro e recalcula a quantidade disponível tanto do livro anterior quanto do novo livro. O relatório passa a considerar o livro atualizado sem criar uma nova leitura.

---

#5 22/09/2026 17:38:10
Correção no arquivo `admin.html`
Descrição: Aplicada a paginação também na renderização ES da aba Devoluções. Todas as sub-abas — Atrasado, Devolver hoje, Em aberto e Sem data definida — agora exibem um único empréstimo e um único nome por página, com navegação Anterior/Próximo e indicação da página atual.

---

#4 22/09/2026 17:32:10
Mudança no arquivo `bibmaker.claude` e na documentação do `README.md`
Descrição: Definido que o `CHANGELOG.md` pertence exclusivamente ao projeto-base BibVania e não deve ser copiado para bibliotecas derivadas geradas pelo BibMaker. A regra de registrar alterações continua válida para a manutenção do projeto-base.

---

#3 22/09/2026 15:53:45
Correções e adições nos arquivos `admin.html`, `bibcore.js` e `supabase_setup.sql`
Descrição: Registradas as mudanças funcionais desta manutenção: cadastro de visitantes com leitor/leitora e PcD; paginação da lista de pessoas com quatro pessoas por página; remoção do menu retrátil de livros nos cards de pessoas; paginação de um empréstimo por página nas sub-abas de devoluções; separação de alunos, funcionários e visitantes homônimos por `pessoa_id`; novos rankings de funcionários e visitantes no relatório; padronização do rótulo `VISITANTE`; correção da recomposição do estoque após exclusão de empréstimos; e migrações SQL para corrigir vínculos antigos de pessoas e quantidades disponíveis.

---

#2 22/09/2026 15:53:30
Mudança nos arquivos `CHANGELOG.md`, `README.md` e `bibmaker.claude`
Descrição: Estabelecida a regra permanente de que toda alteração, correção, adição, remoção, migração ou mudança de comportamento feita no projeto deve ser registrada no `CHANGELOG.md`. A regra também foi adicionada à documentação do projeto e ao protocolo do construtor, para orientar qualquer IA que venha a manter ou atualizar a biblioteca.

---

#1 18/06/2026 23:29:00
Mudança no arquivo VERSION.json
Descrição: Campo `bibvania` alterado de `"1.8"` para `"2.0"`. Em termos simples: o projeto avançou da versão 1.8 para a versão 2.0.
