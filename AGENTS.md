# AGENTS.md

## Objetivo

Este projeto contém exclusivamente a app SideQuest, um gerador de pequenas
missões para quebrar a rotina de forma leve e divertida.

## Regras

- Manter a experiência rápida, positiva e utilizável sem conta.
- Não adicionar backend, anúncios, tracking ou IA sem pedido explícito.
- Guardar apenas o contador de missões concluídas no navegador.
- Preservar português europeu como língua base, acessibilidade e responsividade.
- A app suporta PT/EN/DE (`src/i18n.ts` e `src/data/quests.ts`) — qualquer nova
  missão ou texto de interface tem de ser traduzido nas três línguas, nunca
  deixar uma incompleta.
- Não colocar aqui código do portfólio ou de outras aplicações.

## Validação

```bash
npm run check
npm run build
```
