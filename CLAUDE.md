# CLAUDE.md - FlowMail

## Visao Geral

FlowMail e uma demo funcional de agente de triagem de e-mails. O usuario informa remetente, assunto e corpo; o app classifica intencao, prioridade e sentimento, gera resumo, recomenda proxima acao e monta uma tarefa estruturada no formato de uma integracao com Notion.

Estado atual: demo client-side, sem backend, sem banco, sem login, sem Gmail/IMAP e sem Notion real. A classificacao e deterministica em TypeScript.

Funcionalidades prontas:
- Entrada manual de e-mails e samples.
- Classificacao por regras locais.
- Prioridade, sentimento, confianca, resumo e proxima acao.
- Inbox em estado local e copia/exportacao da tarefa JSON.

Pendencias identificadas:
- Testes automatizados nao foram identificados.
- Integracoes reais com Gmail, IMAP, Notion, webhooks ou LLM sao proximos passos.
- Persistencia historica nao existe no codigo atual.

## Stack Tecnica

- Framework: Next.js 14 com App Router.
- Linguagem: TypeScript estrito.
- Pacote: npm.
- UI: React 18, Tailwind CSS, Framer Motion, Lucide React.
- Validacao/deps: Zod esta instalado, mas a classificacao principal esta em TypeScript local.
- Banco: nao identificado.
- Autenticacao: nao identificada.
- APIs externas: nao identificadas.
- Testes: nao identificados.
- Build/deploy: `next build`; deploy pendente de confirmacao.

## Estrutura Do Projeto

```txt
src/app/
  layout.tsx     Metadados, fontes e shell HTML.
  page.tsx       UI principal, formulario, inbox, metricas e tarefa gerada.
  globals.css    Sistema visual local.
src/lib/
  classifier.ts  Tipos, samples, regras, prioridade, sentimento e tarefa.
  cn.ts          Helper para classes Tailwind.
```

Regras de classificacao devem ficar em `src/lib/classifier.ts`. Componentes devem focar interacao e apresentacao.

## Regras Para Claude Code

- Leia `README.md`, `package.json`, `src/app/page.tsx` e `src/lib/classifier.ts` antes de editar.
- Nao criar integracao real com Notion/Gmail como se ja existisse.
- Nao remover samples, classificacao local, inbox ou exportacao sem pedido explicito.
- Nao instalar dependencias sem justificar.
- Nao logar remetente, assunto, corpo ou tarefas geradas.
- Preserve mobile first, TypeScript estrito e consistencia visual.

## Clean Code

- Regras de negocio ficam no classificador.
- Evite logica complexa no JSX.
- Use nomes de dominio: intent, priority, sentiment, confidence, notionTask.
- Evite duplicacao de palavras-chave e pesos.
- Refatore de forma incremental e preserve comportamento.

## UX/UI

- Formulario deve ser claro e seguro.
- Estados de entrada vazia, e-mail selecionado e tarefa gerada devem ser evidentes.
- Feedback de copia/exportacao deve ser visivel.
- Botoes devem ter area de toque confortavel e foco visivel.
- Textos nao devem prometer IA externa ou integracao real.

## Performance

- Classificacao deve continuar leve e local.
- Evite renderizacoes desnecessarias na inbox.
- Nao adicionar LLM/bibliotecas grandes sem demanda explicita.

## Seguranca

- Nunca expor tokens ou credenciais de e-mail.
- Nao confiar em texto do usuario para HTML.
- Nao usar `dangerouslySetInnerHTML`.
- Nao enviar e-mails a terceiros sem consentimento documentado.
- Tratar clipboard como acao explicita do usuario.

## LGPD

E-mails podem conter dados pessoais e comerciais sensiveis. Coletar apenas campos necessarios, nao persistir sem consentimento, nao logar conteudo e nao expor dados em erros.

## TDD E Testes

Testes automatizados ainda nao foram identificados. Recomendacao: Vitest para `classifyEmail`, prioridade, sentimento, due date e regras por intencao; React Testing Library para formulario e estados principais.

## Fluxo Para Nova Feature

1. Entender regra atual.
2. Ajustar tipos em `classifier.ts`.
3. Implementar logica local.
4. Atualizar UI responsiva.
5. Cobrir estados de erro/vazio/sucesso.
6. Rodar `npm run lint`, `npm run typecheck`, `npm run build`.
7. Revisar LGPD e documentacao.

## Checklist Final

- [ ] Porta 3011 continua funcional.
- [ ] Classificacao local preservada.
- [ ] Lint/typecheck/build passam.
- [ ] Sem dados de e-mail em logs.
- [ ] UI responsiva e acessivel.
