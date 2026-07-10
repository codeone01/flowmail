# Skill: security-lgpd

## Quando Usar

Use em tarefas com e-mails, formularios, clipboard ou futuras integracoes.

## Objetivo

Proteger dados pessoais e comerciais.

## Regras

- Nao logar remetente, assunto, corpo ou tarefa.
- Nao expor tokens de e-mail/Notion.
- Nao enviar dados a terceiros sem consentimento.
- Nao renderizar HTML bruto.
- Coleta minima.

## Passos

1. Identifique dados pessoais.
2. Verifique persistencia/rede.
3. Trate erros sem vazar conteudo.
4. Documente finalidade se integrar API.

## Checklist

- [ ] Sem secrets.
- [ ] Sem logs sensiveis.
- [ ] Sem XSS.

## Evite

- Salvar inbox sem consentimento.
- Analytics com corpo de e-mail.
