/*
 * ===========================================================================
 * BibVânia Online — service-worker.js  |  PWA: cache da casca do site
 * ===========================================================================
 * PROPÓSITO
 *   Permite instalar o site como aplicativo (PWA) e abrir a casca estática
 *   (HTML, CSS, JS, ícones) mesmo sem conexão.
 *
 * REGRAS DE OURO
 *   • Só intercepta requisições GET da MESMA origem do site. Supabase, ImgBB,
 *     Mistral AI, CDNs e qualquer outra origem passam direto, sem cache:
 *     dados do acervo, reservas e login NUNCA ficam guardados aqui.
 *   • Estratégia "rede primeiro": tenta sempre a versão mais nova na rede e
 *     só usa o cache quando estiver offline.
 *
 * QUANDO MEXER AQUI
 *   • Mudou a lista de arquivos da casca? Atualize SHELL.
 *   • A versão de CACHE acompanha a versão do projeto-base menos 2,4
 *     (projeto 3.1 → cache v0.7). Ao mudar a versão-base, atualize este número;
 *     o evento "activate" apaga os caches antigos deste escopo.
 *
 * REGISTRO: feito por index.html e admin.html (navigator.serviceWorker.register).
 * ===========================================================================
 */

// Escopo deste site (ex.: "/minha-biblioteca/"). Sites do mesmo usuário no GitHub Pages compartilham a mesma origem e,
// portanto, o mesmo armazenamento de caches; o escopo entra no nome do cache para um site nunca apagar o de outro.
const ESCOPO = new URL(self.registration.scope).pathname;

// Regra: versão do cache = versão do projeto-base − 2,4 (3.1 − 2,4 = 0.7).
// Mudar o nome/versionamento faz o activate remover o cache antigo deste escopo.
const CACHE = 'bibvania-shell-v0.7@' + ESCOPO;

// Arquivos pré-carregados na instalação. Se um deles não existir (404),
// cache.addAll falha e o service worker não é instalado: mantenha a lista
// sincronizada com os arquivos reais do projeto.
const SHELL = [
  './', 'index.html', 'admin.html', 'bibconfig.js', 'bibcore.js', 'style.css', 'van-ia.prompt',
  'manifest.webmanifest', 'favicon.ico', 'favicon-16.png', 'favicon-32.png',
  'favicon-48.png', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png',
  'logo.png', 'og-image.png'
];

// INSTALL: baixa a casca para o cache e ativa o novo worker imediatamente
// (skipWaiting), sem esperar o usuário fechar todas as abas.
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)));
  self.skipWaiting();
});

// ACTIVATE: apaga os caches de versões anteriores DESTE site (os de bibliotecas de outro escopo, na mesma origem,
// ficam intactos; o nome antigo, sem "@", também é apagado) e assume o controle das abas já abertas (clients.claim).
self.addEventListener('activate', event => {
  const seu = key => key.startsWith('bibvania-shell-') && (!key.includes('@') || key.endsWith('@' + ESCOPO));
  event.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(key => seu(key) && key !== CACHE).map(key => caches.delete(key))
  )).then(() => self.clients.claim()));
});

// FETCH: rede primeiro, cache como reserva.
//   1) Ignora tudo que não for GET da mesma origem (Supabase, ImgBB, etc.).
//   2) Busca na rede; se a resposta for válida (ok), guarda uma cópia no cache.
//   3) Se a rede falhar (offline), devolve a cópia em cache; se nem ela
//      existir, devolve a página inicial ('./') como último recurso.
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  event.respondWith(
    fetch(request).then(response => {
      if (response.ok) caches.open(CACHE).then(cache => cache.put(request, response.clone()));
      return response;
    }).catch(() => caches.match(request).then(hit => hit || caches.match('./')))
  );
});
