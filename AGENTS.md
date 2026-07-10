# AGENTS.md - FlowMail

## Objetivo

Demo Next.js de triagem de e-mails com classificador local, resumo, prioridade, sentimento e tarefa estilo Notion.

## Como Rodar

```bash
npm install
npm run dev
```

URL: `http://127.0.0.1:3011`

## Validacao

```bash
npm run lint
npm run typecheck
npm run build
```

Testes automatizados nao foram identificados.

## Estrutura

```txt
src/app/page.tsx        UI, formulario, inbox e tarefa.
src/lib/classifier.ts   Regras locais de classificacao.
src/lib/cn.ts           Helper Tailwind.
```

## Regras

- Nao criar integracoes reais sem pedido.
- Nao logar remetente, assunto ou corpo.
- Preserve classificador local e samples.
- Nao instalar dependencias sem justificativa.
- Mantenha mobile first.

## Seguranca/LGPD

E-mails podem conter dados pessoais. Nao enviar a APIs externas, nao persistir sem consentimento e nao exibir conteudo sensivel em erros.

## Checklist

- [ ] Mudanca focada.
- [ ] Lint/typecheck/build executados.
- [ ] Sem secrets.
- [ ] Sem dados pessoais em logs.
- [ ] Documentacao atualizada quando necessario.
