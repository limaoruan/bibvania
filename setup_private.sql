-- ============================================================================
-- BibVânia Online — setup_private.sql
-- Configuração PRIVADA — Chaves de API
-- ============================================================================
--
-- ⚠️  ATENÇÃO: ESTE ARQUIVO CONTÉM SEGREDOS DE API.
--    NUNCA faça commit deste arquivo para um repositório público no GitHub.
--    Adicione "setup_private.sql" ao seu .gitignore.
--
-- PROPÓSITO
--   Insere as chaves de API necessárias para as funcionalidades avançadas:
--   • imgbb_api_key            — upload de capas de livros via ImgBB
--   • mistral_api_key          — análise de capa com IA (botão Vânia), via Mistral AI
--   As chaves são lidas da tabela config_privada pelo admin.html após login
--   (via RLS autenticada), mantendo-as fora do código-fonte do frontend.
--
-- PRÉ-REQUISITO
--   Execute supabase_setup.sql ANTES deste arquivo.
--   A tabela config_privada deve existir.
--
-- COMO OBTER AS CHAVES
--   imgbb_api_key:           https://api.imgbb.com (conta gratuita)
--   mistral_api_key:         https://console.mistral.ai/api-keys
--
-- COMO EXECUTAR
--   1. Substitua os valores <<...>> abaixo pelas chaves reais
--   2. Acesse Dashboard Supabase → SQL Editor → New query
--   3. Cole e clique em Run
--   4. Apague o arquivo ou remova as chaves após executar
--
-- ============================================================================


-- ── ONDE OBTER AS CHAVES ─────────────────────────────────────────────────────
--
-- IMGBB (armazenamento de capas de livros)
--   • Acesse: https://api.imgbb.com
--   • Faça login → clique em "Get API key"
--   • Copie a chave (string hexadecimal)
--
-- MISTRAL AI (análise de capa com IA — botão Vânia)
--   • Acesse: https://console.mistral.ai/api-keys
--   • Faça login → "Create new key" e copie a chave (letras e números,
--     sem prefixo fixo)
--   • Há plano gratuito com limites de uso — o botão Vânia já aplica um
--     intervalo entre análises para não estourar esses limites no uso
--     normal da biblioteca.
--
-- ────────────────────────────────────────────────────────────────────────────


-- ============================================================================
-- INSERÇÃO DAS CHAVES
-- ON CONFLICT garante que re-executar este script apenas atualiza o valor,
-- sem criar duplicatas nem gerar erros.
-- ============================================================================

INSERT INTO config_privada (chave, valor)
VALUES ('imgbb_api_key', '<<SUA_CHAVE_IMGBB_AQUI>>')
ON CONFLICT (chave) DO UPDATE SET valor = EXCLUDED.valor;

INSERT INTO config_privada (chave, valor)
VALUES ('mistral_api_key', '<<SUA_CHAVE_MISTRAL_AQUI>>')
ON CONFLICT (chave) DO UPDATE SET valor = EXCLUDED.valor;


-- ============================================================================
-- VERIFICAÇÃO (opcional)
-- Execute após inserir para confirmar que as chaves foram salvas corretamente.
-- O valor aparece mascarado para evitar exposição no histórico do editor.
-- ============================================================================

SELECT
    chave,
    LEFT(valor, 6) || REPEAT('*', GREATEST(LENGTH(valor) - 10, 4)) || RIGHT(valor, 4) AS valor_mascarado,
    CASE WHEN LENGTH(valor) > 8 THEN '✅ OK' ELSE '⚠️ MUITO CURTA — VERIFIQUE' END AS status
FROM config_privada
WHERE chave IN ('imgbb_api_key', 'mistral_api_key');
