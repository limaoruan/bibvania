# Licença — BibVânia Online v3.1

**BibVânia Online — Sistema de Biblioteca Escolar Digital** © 2026 Ruan Oliveira Lima.

Este projeto está licenciado sob a [Creative Commons Atribuição-CompartilhaIgual 4.0 Internacional (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/deed.pt-br).

---

## Você tem permissão para

- **Compartilhar** — copiar e redistribuir o material em qualquer suporte ou formato.
- **Adaptar** — remixar, transformar e criar a partir do material para qualquer fim, inclusive comercial.

Desde que respeite os termos desta licença.

---

## Sob as seguintes condições

**Atribuição** — Você deve dar o crédito apropriado ao autor original, incluir um link para a licença e indicar se foram feitas alterações. Você pode fazê-lo de qualquer forma razoável, mas não de forma que sugira que o licenciante endossa você ou seu uso.

**CompartilhaIgual** — Se você remixar, transformar ou criar a partir deste material, deverá distribuir suas contribuições sob a mesma licença CC BY-SA 4.0.

Atribuição sugerida:

> Derivado do projeto BibVânia Online por [Ruan Oliveira Lima](https://www.instagram.com/ruanoliveiralima_/) © 2026 — <https://github.com/limaoruan/bibvania> — [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.pt-br)

---

## Escopo e arquivos desta cópia-base

A declaração CC BY-SA 4.0 se aplica ao material do projeto cujos direitos o titular pode licenciar. A lista abaixo é um inventário dos arquivos distribuídos nesta cópia-base; ela não comprova, por si só, autoria individual, titularidade ou proveniência de cada componente e não substitui os avisos de terceiros.

- **Aplicação:** `index.html`, `admin.html`, `bibcore.js`, `bibconfig.js`, `service-worker.js`, `style.css` e `manifest.webmanifest`.
- **Construtor e prompt:** `bibmaker.claude` e `van-ia.prompt`.
- **Banco e funções:** `supabase_setup.sql`, `upload-imagem.ts` e `vania-ia.ts`.
- **Ativos visuais presentes:** `logo.png`, `van-ia.png`, `bibmaker-logo.png`, `og-image.png`, `favicon.ico`, `favicon.png`, `favicon-16.png`, `favicon-32.png`, `favicon-48.png`, `apple-touch-icon.png`, `icon-192.png` e `icon-512.png`.
- **Configuração e publicação:** `VERSION.json`, `bibhash.sig`, `robots.txt`, `sitemap.xml`, `.gitignore` e `.nojekyll`.
- **Documentação:** `README.md`, `LICENCE.md` e `CHANGELOG.md`.

O repositório não contém registros de proveniência que documentem a origem e a autoria individual de cada imagem ou ícone listado. A enumeração não afirma que esses ativos sejam originais nem concede direitos que pertençam a terceiros. Antes de redistribuí-los, confirme a origem e as permissões aplicáveis. `bibconfig.claude` não faz parte desta pasta-base: é um arquivo privado gerado para bibliotecas derivadas e deve ser tratado separadamente.

---

## Serviços e componentes de terceiros

Os serviços hospedados seguem os termos do respectivo provedor; esses termos não são licenças de software do BibVânia Online. A tabela reúne os serviços externos e ferramentas de desenvolvimento usados no projeto, além das versões fixadas das bibliotecas incluídas nos HTMLs desta cópia.

| Serviço ou componente | Uso no projeto | Licença ou termos aplicáveis |
| --- | --- | --- |
| [Supabase Cloud](https://supabase.com) | Banco de dados PostgreSQL, autenticação e Realtime hospedados | [Termos do serviço hospedado](https://supabase.com/terms) |
| [ImgBB](https://imgbb.com) | Hospedagem externa das imagens de capa e verso | [Termos de uso do ImgBB](https://imgbb.com/tos) |
| [Mistral AI API / Admin Panel](https://admin.mistral.ai/) | Análise de capa e verso pelo botão Vânia; acesso à conta e às configurações | [Termos da Mistral](https://mistral.ai/terms); a franquia mensal pode ser compartilhada entre Vibe, Studio e API. Pay-as-you-go é uma opção pré-paga que consome créditos comprados ou resgatados após o uso da franquia incluída. A disponibilidade, os limites e as tarifas dependem do plano e da organização; consulte os [limites da API](https://admin.mistral.ai/plateforme/limits) autenticando-se na conta. |
| [Claude (Anthropic)](https://claude.ai/) | Ferramenta usada no fluxo de desenvolvimento e no BibMaker; não é dependência de execução entregue ao visitante do site | [Termos individuais do Claude (Free, Pro e Max)](https://www.anthropic.com/legal/consumer-terms) ou [Termos comerciais do Claude (API e Claude for Work)](https://www.anthropic.com/legal/commercial-terms), conforme o produto usado; o [Centro Legal da Anthropic](https://www.anthropic.com/legal) ajuda a identificar os termos aplicáveis. Eles regem o serviço e não são a licença das bibliotecas do projeto. |
| [`@supabase/supabase-js` 2.89.0](https://www.npmjs.com/package/@supabase/supabase-js/v/2.89.0) | Cliente JavaScript carregado pelo site | [MIT](https://spdx.org/licenses/MIT.html) |
| [`pdfmake` 0.2.9](https://www.npmjs.com/package/pdfmake/v/0.2.9) | Geração do PDF do acervo no navegador | [MIT](https://spdx.org/licenses/MIT.html) |
| [`@zxing/library` 0.21.3](https://www.npmjs.com/package/@zxing/library/v/0.21.3) | Leitura de códigos de barras ISBN quando `BarcodeDetector` não está disponível | [MIT](https://spdx.org/licenses/MIT.html) |
| [Web Speech API](https://wicg.github.io/speech-api/) | Reconhecimento de fala acionado pela busca por voz | A especificação está sujeita à [W3C Document License 2023](https://www.w3.org/copyright/document-license-2023/); os componentes de código marcados seguem a [W3C Software License](https://www.w3.org/copyright/software-license/). Os [compromissos de licenciamento FSA específicos da Web Speech API](https://www.w3.org/community/speech-api/spec/16/commitments) são listados pela W3C. A implementação do navegador tem seus próprios termos e não é distribuída pelo projeto. |
