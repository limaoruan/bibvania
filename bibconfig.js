/**
 * Configuração pública do BibVânia Online.
 *
 * Esta chave pode ficar no repositório: a proteção dos dados vem do RLS e das
 * RPCs do Supabase. NUNCA coloque aqui uma chave secret/service_role.
 *
 * SUPABASE_PUBLISHABLE_KEY usa a chave pública sb_publishable_ do projeto.
 * Não coloque aqui chaves secret, service_role, ImgBB ou Mistral AI.
 *
 * ATENÇÃO AO FORMATO: mantenha cada chave em uma linha própria, com aspas simples.
 *     SUPABASE_URL: 'https://xxxx.supabase.co',
 *
 * USO: carregado por index.html e admin.html (<script src="bibconfig.js">)
 * antes do bibcore.js, que lê window.BIBVANIA_CONFIG para criar o cliente
 * Supabase. Para trocar de banco, altere só os dois valores abaixo: o preconnect
 * ao Supabase e as chaves de armazenamento local saem daqui automaticamente.
 */
window.BIBVANIA_CONFIG = Object.freeze({
    SUPABASE_URL: 'https://hktovlpkjlxnbigifgrj.supabase.co',
    SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_5pYxFgAmuCnwxRetYNUBjQ_1TW31roK'
});

// Preconnect ao banco desta biblioteca: abre a conexão com o Supabase antes da primeira consulta. É criado aqui, a
// partir de SUPABASE_URL, para que o endereço do banco exista num único arquivo (nunca escrito no HTML).
(function () {
    try {
        var url = window.BIBVANIA_CONFIG.SUPABASE_URL;
        if (!/^https:\/\//i.test(url)) return;
        ['', 'anonymous'].forEach(function (cors) {
            var link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = url;
            if (cors) link.crossOrigin = cors;
            document.head.appendChild(link);
        });
    } catch (_) { /* a dica de preconnect é opcional */ }
})();

// Nome de uma chave de armazenamento local (localStorage) EXCLUSIVA desta biblioteca. No GitHub Pages, sites do mesmo
// usuário compartilham a mesma origem (e o mesmo localStorage); por isso a chave inclui o identificador do projeto
// Supabase (o primeiro trecho do endereço), e uma biblioteca nunca lê o que outra gravou.
// Ex.: BIBVANIA_CHAVE('admin_nome') -> "bibvania_abcdxyz_admin_nome".
window.BIBVANIA_CHAVE = function (nome) {
    var ref = 'local';
    try { ref = new URL(window.BIBVANIA_CONFIG.SUPABASE_URL).hostname.split('.')[0] || ref; } catch (_) { /* usa "local" */ }
    return 'bibvania_' + ref + '_' + nome;
};
