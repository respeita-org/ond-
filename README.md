# ONDÊ — Protótipo 3.0

Protótipo navegável do catálogo/serviços de turismo sustentável de Trancoso. Combina a capa fotográfica editorial da versão 2 com o design aconchegante e o catálogo funcional da versão 1.

## Abrir

Abra `index.html` em um navegador. Para testar localmente com servidor, na pasta do projeto execute `python -m http.server 8080` e abra `http://localhost:8080`.

Para um único arquivo, abra `ONDE_Prototipo_v3_Interativo.html` (entregue separadamente junto ao pacote).

## Estrutura

- `index.html`: páginas/seções sem framework.
- `styles.css`: responsividade e identidade visual.
- `app.js`: filtros, detalhes, menu e formulário de orçamento.
- `assets/`: imagens ilustrativas extraídas do catálogo piloto enviado pela cliente.
- `tests/`: testes unitários e fluxos automatizados.

## Atenção

Este é um **protótipo**, não a aplicação de produção. Não contém autenticação, Supabase, painel administrativo ou sistema de reservas. Experiências, disponibilidade, acesso e autorizações devem ser confirmados. Fotografias do catálogo-piloto são ilustrativas e precisam de validação de direitos antes do lançamento.

## Configurar WhatsApp

No `app.js`, configure `WHATSAPP_NUMBER` com o número comercial no formato internacional, **somente dígitos**, por exemplo `5573999999999` (fictício). Até lá, o formulário prepara uma mensagem e permite copiar seu texto. Nenhum dado é transmitido ao servidor.

## Testes

`node --test tests/*.test.mjs` executa testes unitários sem dependências adicionais. Os testes de navegação ponta a ponta foram desenvolvidos com Playwright Python e podem ser executados com `python -m pytest tests/test_browser.py`, quando as dependências locais estiverem instaladas. O GitHub Actions executa os testes Node automaticamente.

## Publicação (Cloudflare Pages)

Repositório GitHub -> Cloudflare Pages. Para um projeto estático como este, configure o diretório raiz como saída e nenhum comando de build; opcionalmente migre para Vite antes da versão de produção.

## Próxima etapa (fora do MVP demonstrativo)

Validar escopo de serviços, textos e fotos; escolher forma de editar conteúdo; implementar banco Supabase (se necessário), permissões e testes de segurança; conectar WhatsApp; internacionalização; análises de acessibilidade, SEO, performance e privacidade antes do lançamento público.
