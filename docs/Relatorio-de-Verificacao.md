# Relatório técnico de verificação — 09/11/2026

> Evidências obtidas na preparação da entrega React; este documento não equivale a validação final do cliente.

## Verificações realizadas

| Verificação | Resultado |
|---|---|
| Código React e JSX | **11 arquivos JS/JSX analisados** pelo transpilador TypeScript: nenhum erro sintático |
| Conteúdo institucional | Comparação de quantidade de `section`, `article`, `img`, `h1`, `h2`, `h3`, `details` e `summary` entre os quatro HTML de referência de 06/11 e suas páginas JSX: **todas as contagens preservadas** |
| Regras de dados e datas | **12 testes automatizados aprovados** via `npm test` (`node --test`), incluindo integridade das rotas, assets e configuração SPA |
| Testes estruturais da SPA | Verificadas as sete rotas React, rotas antigas `.html`, terceira área no hub, documentos essenciais e rewrite Vercel |
| Imagens declaradas diretamente em JSX | Verificação de caminhos locais em `public/assets`: sem falta detectada |
| Integridade da documentação | Links Markdown internos revisados |
| `vercel.json` | Rewrite SPA conferido com recomendação oficial da Vercel para Vite, `/(.*)` → `/index.html` |

## Tentativa de instalação e limitação externa

O comando `npm install --ignore-scripts --no-audit --no-fund --fetch-retries=0` foi tentado nesta preparação e **não pôde concluir**, com erro `EAI_AGAIN` ao resolver `registry.npmjs.org`. Por isso, não foi possível executar `vite build` nem testar o aplicativo React carregado no navegador neste ambiente. Não foi gerado `dist` e não se afirma que a Vercel já publicou o site.

## Validações pendentes antes de enviar como entrega final

1. Em máquina com rede, executar `npm install`, `npm test`, `npm run build`, `npm run preview`.
2. Abrir as sete páginas em navegador e testar menu, rota direta, modal, login e agendamento com dados fictícios.
3. Verificar em 375, 768, 1024 e 1440 px; testar foco e acessibilidade (WAVE ou equivalente).
4. Publicar prévia na Vercel e recarregar as rotas diretamente para conferir o fallback SPA.
5. Validar os textos, mídias e forma real de contato da Fisioterapia com os responsáveis.

A referência de teste manual detalhada está em [Plano-de-Testes.md](Plano-de-Testes.md).

## Complemento de revisão do pacote

Os testes foram repetidos na cópia local preparada para esta entrega. `npm install --offline` também foi tentado, mas falhou por ausência das dependências no cache (`ENOTCACHED`). Essa limitação impede afirmar que houve build ou deploy. O pacote contém todos os arquivos-fonte e mídias necessários para executar a instalação em ambiente conectado.

## Atualização de 13/11/2026 — Remoção do agendamento

Verificações executadas nesta máquina após remover o agendamento (ver [Remocao-Agendamento-Novembro.md](Remocao-Agendamento-Novembro.md)):

| Verificação | Resultado |
|---|---|
| `npm install` | Concluído |
| `npm test` | **10 testes aprovados**, incluindo o novo teste que confirma a ausência de links para `/agendamento` e a presença do WhatsApp de cada marca |
| `npm run build` | **Build do Vite concluído sem erros**, com geração de `dist` |

Com isso, a limitação de rede descrita acima não se aplica mais ao build. Continuam pendentes: abrir as **seis** páginas no navegador (casos de [Plano-de-Testes.md](Plano-de-Testes.md)), verificar acessibilidade e publicar a prévia na Vercel.
