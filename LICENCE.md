# Licença — BibVânia Online v3.0

**BibVânia Online — Sistema de Biblioteca Escolar Digital** © 2026 Ruan Oliveira Lima.

Este projeto está licenciado sob a <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.pt-br" target="_blank" rel="license noopener noreferrer">Creative Commons Atribuição-CompartilhaIgual 4.0 Internacional (CC BY-SA 4.0)</a>.

---

## Você tem permissão para

- **Compartilhar** — copiar e redistribuir o material em qualquer suporte ou formato
- **Adaptar** — remixar, transformar e criar a partir do material para qualquer fim, inclusive comercial

Desde que respeite os termos desta licença.

---

## Sob as seguintes condições

**Atribuição** — Você deve dar o crédito apropriado ao autor original, incluir um link para a licença e indicar se foram feitas alterações. Você pode fazê-lo de qualquer forma razoável, mas não de forma que sugira que o licenciante endossa você ou seu uso.

**CompartilhaIgual** — Se você remixar, transformar ou criar a partir deste material, deverá distribuir suas contribuições sob a mesma licença CC BY-SA 4.0.

Atribuição sugerida:

> Derivado do projeto BibVânia Online por [Ruan Oliveira Lima](https://www.instagram.com/ruanoliveiralima_/) © 2026 — <a href="https://github.com/limaoruan/bibvania" target="_blank" rel="noopener noreferrer">https://github.com/limaoruan/bibvania</a> — <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.pt-br" target="_blank" rel="license noopener noreferrer">CC-BY-SA 4.0</a>

---

## O que está coberto por esta licença

- Código-fonte: `index.html`, `admin.html`, `bibcore.js`, `bibconfig.js`, `service-worker.js`, `style.css`, `bibmaker.claude`, `bibconfig.claude`
- Scripts SQL: `supabase_setup.sql`, `setup_private.sql`
- Ativos visuais originais: `logo.png`, `van-ia.png`, `bibmaker-logo.png`, `og-image.png`, `favicon.ico`, `favicon.png`, `favicon-16.png`, `favicon-32.png`, `favicon-48.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`
- Configuração e publicação: `manifest.webmanifest`, `robots.txt`, `sitemap.xml`, `.github/workflows/manter-supabase-ativo.yml`
- Documentação: `README.md`, `LICENCE.md`, `CHANGELOG.md`

---

## Dependências de terceiros

Este projeto utiliza serviços e bibliotecas de terceiros com suas próprias licenças e termos de uso:

| Serviço / Biblioteca | Uso | Licença / Termos |
|---|---|---|
| [Supabase](https://supabase.com) | Banco de dados, autenticação e realtime | [Apache 2.0](https://github.com/supabase/supabase/blob/master/LICENSE) |
| [ImgBB](https://imgbb.com) | Armazenamento de capas de livros | [Termos de uso ImgBB](https://imgbb.com/tos) |
| [Claude (Anthropic)](https://www.anthropic.com) | Assistência com IA no desenvolvimento | [Política de Uso Anthropic](https://www.anthropic.com/legal/aup) |
| [Supabase JS](https://cdn.jsdelivr.net/npm/@supabase/supabase-js) | Cliente JavaScript do Supabase | [MIT](https://github.com/supabase/supabase-js/blob/master/LICENSE) |
| [Web Speech API](https://wicg.github.io/speech-api/) | Reconhecimento e síntese de voz no navegador | [W3C Community License](https://www.w3.org/community/about/agreements/cla/) |
| [pdfmake](https://github.com/bpampuch/pdfmake) | Geração do PDF do acervo no navegador (`pdfmake@0.2.9`, jsDelivr) | [MIT](https://spdx.org/licenses/MIT.html) |
| [@zxing/library](https://github.com/zxing-js/library) | Leitura do código de barras (ISBN) quando o navegador não tem `BarcodeDetector` (`@0.21.3`, jsDelivr) | [MIT](https://spdx.org/licenses/MIT.html) |
| [Mistral AI](https://mistral.ai) | Análise de capa e verso com IA (botão Vânia) | [Termos legais da Mistral AI](https://legal.mistral.ai/terms) |
