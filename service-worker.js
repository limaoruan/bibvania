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
 *     só usa o cache quando estiver offline. Assim, publicar uma versão nova
 *     no GitHub Pages chega ao usuário sem precisar trocar o nome do cache.
 *
 * QUANDO MEXER AQUI
 *   • Mudou a lista de arquivos da casca? Atualize SHELL.
 *   • Quer forçar a limpeza do cache de todos os aparelhos? Troque o número
 *     de CACHE (ex.: v4 → v5); o evento "activate" apaga os caches antigos.
 *
 * REGISTRO: feito por index.html e admin.html (navigator.serviceWorker.register).
 * ===========================================================================
 */

// Nome (e versão) do cache da casca. Mudar o nome invalida o cache antigo.
const CACHE = 'bibvania-shell-v4';

// Arquivos pré-carregados na instalação. Se um deles não existir (404),
// cache.addAll falha e o service worker não é instalado: mantenha a lista
// sincronizada com os arquivos reais do projeto.
const SHELL = [
  './', 'index.html', 'admin.html', 'bibconfig.js', 'bibcore.js', 'style.css',
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

// ACTIVATE: apaga caches de versões anteriores (qualquer nome diferente de
// CACHE) e assume o controle das abas já abertas (clients.claim).
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(key => key !== CACHE).map(key => caches.delete(key))
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
