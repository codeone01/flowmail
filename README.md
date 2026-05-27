# FlowMail - Agente de Triagem de E-mails

FlowMail é uma demo funcional de agente para triagem de e-mails. A função principal funciona de verdade sem depender de API externa: o usuário insere um e-mail, o sistema classifica a intenção, define prioridade, calcula confiança, gera resumo, recomenda próxima ação e cria uma tarefa estruturada no formato de uma integração com Notion.

O projeto não usa banco de dados, login ou integração real com Notion. A proposta é demonstrar o fluxo principal de automação com uma experiência de produto pronta para portfólio.

## O Que Funciona

- Cadastro/manual paste de e-mail.
- Classificação por intenção com regras determinísticas.
- Detecção de prioridade.
- Detecção simples de sentimento.
- Resumo automático.
- Sugestão de próxima ação.
- Criação de tarefa estruturada.
- Exportação da tarefa como JSON.
- Inbox inteligente em estado local.
- Métricas calculadas em tempo real.

## O Que É Demo

- Histórico persistente.
- Integração real com Notion.
- Monitoramento de inbox real.
- Classificação com LLM.
- Multiusuário e autenticação.

Esses recursos podem ser adicionados depois, mas não são necessários para demonstrar o valor principal.

## Stack

- Next.js 14 com App Router
- TypeScript estrito
- Tailwind CSS
- Framer Motion
- Classificador local em TypeScript

## Como Rodar Junto Com o Portfólio

Na raiz do portfólio:

```bash
npm.cmd run dev:all
```

Isso sobe:

```text
Portfólio: http://localhost:3000
Aurora:    http://127.0.0.1:3010
FlowMail:  http://127.0.0.1:3011
```

## Como Rodar Só o FlowMail

Entre na pasta:

```bash
cd projects/flowmail
```

Instale dependências:

```bash
npm install
```

Rode:

```bash
npm run dev
```

Abra:

```text
http://127.0.0.1:3011
```

## Arquitetura

```text
src/app/page.tsx
  Interface principal, estado local, inbox, formulário e tarefa gerada.

src/lib/classifier.ts
  Parser e classificador funcional de e-mails.

src/lib/cn.ts
  Helper para classes Tailwind.
```

## Como Funciona a Classificação

1. O texto do remetente, assunto e corpo é normalizado.
2. O classificador procura palavras-chave por intenção.
3. Cada intenção possui peso próprio.
4. A melhor pontuação define a categoria do e-mail.
5. A prioridade é calculada com base na intenção e nos termos de urgência.
6. O sentimento é inferido por termos positivos ou críticos.
7. O sistema cria resumo, próxima ação e uma tarefa estruturada.

## Repositório GitHub

Nome sugerido:

```text
flowmail-ai-agent
```

Quando estiver pronto para publicar:

```bash
cd projects/flowmail
git init
git add .
git commit -m "Projeto inicial do FlowMail"
```

## Próximos Passos

- Integração real com Notion API.
- Conexão com Gmail ou IMAP.
- Classificação opcional com Gemini/Groq/OpenRouter.
- Persistência local com IndexedDB.
- Webhooks para n8n ou Make.
