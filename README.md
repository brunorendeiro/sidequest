# SideQuest

Uma app leve que gera pequenas missões para quebrar o piloto automático. O
utilizador escolhe quanto tempo tem, quanta energia sente e onde quer realizar
a missão; a app devolve uma atividade concreta e divertida.

## Resumo das ideias

A ideia nasceu da vontade de criar conteúdo útil sem transformar tudo numa
ferramenta de produtividade. Em vez de listas intermináveis, a SideQuest dá
uma única sugestão que pode ser concluída em 5, 15 ou 30 minutos.

As principais decisões foram:

- Missões pequenas o suficiente para começar imediatamente.
- Três filtros simples: tempo, energia e terreno.
- Tom divertido, mas sem pressão, pontuações competitivas ou culpa.
- Funcionamento totalmente local, sem login, backend ou IA.
- Um contador local de missões concluídas como pequena sensação de progresso.
- Identidade visual inspirada em cartões de missão, jogos e fanzines.

## Estado atual

- Gerador com 30 missões originais
- Filtros por tempo, energia e contexto
- Nova escolha sem repetir imediatamente a missão atual
- Contador local de missões concluídas
- Interface disponível em português (PT-PT), inglês e alemão, com deteção
  automática do idioma do browser e persistência local da escolha
- Interface responsiva e acessível por teclado
- Suporte para preferência de movimento reduzido

## Executar

```bash
npm install
npm run dev
```

Abrir <http://127.0.0.1:5175>.

## Validar

```bash
npm run check
npm run build
```

## Ideias para evoluir

- Permitir criar missões pessoais.
- Adicionar conjuntos temáticos: criatividade, cidade, relações e bem-estar.
- Criar um modo para duas pessoas receberem a mesma missão.
- Gerar um cartão partilhável quando uma missão é concluída.
- Adicionar um modo semanal com sete side quests complementares.
- Transformar a app numa PWA que funciona completamente offline.

O README deve ser atualizado quando o conceito, as funcionalidades ou as
prioridades mudarem.
