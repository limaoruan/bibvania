/**
 * Configuração pública do BibVânia Online.
 *
 * Esta chave pode ficar no repositório: a proteção dos dados vem do RLS e das
 * RPCs do Supabase. NUNCA coloque aqui uma chave secret/service_role.
 *
 * SUPABASE_PUBLISHABLE_KEY usa a chave pública sb_publishable_ do projeto.
 * Não coloque aqui chaves secret, service_role, ImgBB ou Mistral AI.
 *
 * ATENÇÃO AO FORMATO: o workflow .github/workflows/manter-supabase-ativo.yml
 * lê SUPABASE_URL e SUPABASE_PUBLISHABLE_KEY deste arquivo com `sed`, linha a
 * linha. Mantenha cada chave em uma linha própria, com aspas simples:
 *     SUPABASE_URL: 'https://xxxx.supabase.co',
 *
 * USO: carregado por index.html e admin.html (<script src="bibconfig.js">)
 * antes do bibcore.js, que lê window.BIBVANIA_CONFIG para criar o cliente
 * Supabase. Para trocar de banco, altere só os dois valores abaixo (e os
 * <link rel="preconnect"> do index.html e do admin.html).
 */
window.BIBVANIA_CONFIG = Object.freeze({
    SUPABASE_URL: 'https://hktovlpkjlxnbigifgrj.supabase.co',
    SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_5pYxFgAmuCnwxRetYNUBjQ_1TW31roK'
});
