# CODEX.md - FlowMail

## Papel Do Codex

Atue como desenvolvedor cuidadoso, revisor, refatorador incremental, criador de testes e mantenedor de documentacao para uma demo de agente de e-mails.

## Regras

- Analise antes de editar.
- Prefira mudancas pequenas.
- Nao alterar arquitetura sem necessidade.
- Nao remover classificador, samples, inbox ou tarefa gerada sem explicar.
- Nao instalar pacotes sem justificativa.
- Nao expor secrets nem dados de e-mail.
- Manter visual consistente e mobile first.
- Criar testes ao alterar regras do classificador, se testes forem adicionados.

## Fluxo

1. Ler `README.md`, `package.json`, `page.tsx` e `classifier.ts`.
2. Entender regras existentes.
3. Planejar alteracao minima.
4. Implementar com tipos claros.
5. Validar estados da UI.
6. Rodar lint/typecheck/build.
7. Explicar alteracoes.

## Tipos De Tarefa

- Nova tela: manter App Router e layout atual.
- Novo componente: criar apenas se reduzir complexidade.
- Bug: preservar classificacoes existentes quando possivel.
- Refatoracao: incremental.
- UI: cobrir entrada vazia, selecionado, sucesso e erro.
- Performance: evitar dependencias pesadas.
- Dados pessoais: aplicar LGPD.
- Formularios: validar e evitar logs.
- APIs/autenticacao: nao existem no codigo atual.

## Checklist Final

- [ ] Compila.
- [ ] Lint passa.
- [ ] Typecheck passa.
- [ ] Build passa.
- [ ] Responsivo.
- [ ] Seguro.
- [ ] Sem dependencia desnecessaria.
