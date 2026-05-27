# Arquitetura do FlowMail

FlowMail foi desenhado para provar o fluxo principal de automação sem depender de infraestrutura externa.

## Fluxo Principal

1. O usuário insere remetente, assunto e corpo do e-mail.
2. A interface chama `classifyEmail`.
3. O classificador aplica regras por palavras-chave e pesos.
4. O resultado é salvo no estado local da inbox.
5. A UI exibe intenção, prioridade, confiança, resumo e próxima ação.
6. Uma tarefa estruturada é criada e pode ser copiada como JSON.

## Por Que Usar Classificação Local

Para portfólio, a classificação local tem vantagens práticas:

- Não consome créditos de API.
- Funciona offline.
- É determinística e rápida.
- Mostra domínio de produto e fluxo.
- Pode ser substituída por LLM depois sem mudar a interface.

## Pontos de Extensão

- Trocar `classifyEmail` por uma chamada para Gemini, Groq ou OpenRouter.
- Enviar a tarefa para Notion API.
- Persistir a inbox em IndexedDB.
- Monitorar uma caixa real via Gmail API ou IMAP.
