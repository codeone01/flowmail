# Skill: code-quality

## Quando Usar

Use em ajustes do classificador, UI ou refatoracoes.

## Objetivo

Manter regras locais simples, legiveis e bem tipadas.

## Regras

- Responsabilidade unica.
- Regras em `src/lib/classifier.ts`.
- Nomes claros: intent, priority, sentiment.
- Baixo acoplamento entre UI e classificacao.
- Nao mudar comportamento sem necessidade.

## Passos

1. Leia a regra atual.
2. Extraia funcoes pequenas.
3. Preserve tipos exportados.
4. Rode validacoes.

## Checklist

- [ ] Sem duplicacao de regras.
- [ ] Sem `any`.
- [ ] UI separada da logica.

## Evite

- Classificacao espalhada no JSX.
- Refatoracao ampla sem ganho real.
