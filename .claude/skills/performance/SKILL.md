# Skill: performance

## Quando Usar

Use em melhorias de resposta da UI, inbox e bundle.

## Objetivo

Manter a classificacao instantanea e leve.

## Regras

- Evitar dependencias grandes.
- Evitar reprocessamento desnecessario.
- Limitar listas grandes.
- Preferir funcoes simples.

## Passos

1. Identifique custo real.
2. Reduza renderizacoes.
3. Preserve feedback da UI.
4. Rode build.

## Checklist

- [ ] Bundle sem crescimento injustificado.
- [ ] UI fluida em mobile.
- [ ] Classificacao continua local.

## Evite

- Adicionar LLM/client SDK pesado sem pedido.
