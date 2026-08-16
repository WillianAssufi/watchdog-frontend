# Watchdog — Frontend

Interface web em **React** para o **[Watchdog](https://github.com/WillianAssufi/monitoramento-servicos)**, uma API de monitoramento de serviços. Este frontend consome a API para gerenciar os serviços monitorados (cadastrar, listar, atualizar e remover), enquanto a observabilidade do time fica no Grafana do backend.

> Projeto separado do backend (arquitetura *polyrepo*): o backend é a API + banco + observabilidade; este repositório é apenas o cliente web que a consome.

## Sobre este projeto

Este frontend nasceu de uma necessidade prática: gerenciar os serviços monitorados (criar, editar, remover, ativar/desativar) de forma rápida, **sem precisar recorrer à documentação Swagger da API** a cada operação.

Meu foco de estudo e atuação é o **backend** — é onde está minha profundidade. Frontend e, principalmente, estilização não são minha área forte. Por isso, na construção desta interface contei com **bastante apoio de IA**, sobretudo na parte visual/CSS. Ainda assim, a lógica, a estrutura e vários toques pessoais de UX passaram por mim — como as ações de editar/remover por linha, a confirmação antes de excluir (avisando sobre a perda do histórico de métricas) e o toggle de ativo/inativo.

## Stack

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/) (dev server com HMR e build)
- JavaScript
- ESLint

## Funcionalidades

CRUD de serviços consumindo a API:

- [x] **Listar** serviços (`GET /servicos`)
- [x] **Cadastrar** serviço (`POST /servicos`)
- [x] **Atualizar** serviço via modal de edição (`PATCH /servicos/{id}`)
- [x] **Remover** serviço com modal de confirmação (`DELETE /servicos/{id}`)
- [x] **Ativar/desativar** serviço com toggle (`PATCH /servicos/{id}`)
- [x] **Filtrar** serviços por nome
- [x] **Status de cada serviço** na listagem — No ar / Fora do ar / Aguardando, vindo da última verificação do scheduler
- [x] Layout com menu de navegação, ícones e tema escuro

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18+ (desenvolvido com a v24)
- A **API do Watchdog rodando** em `http://localhost:8000`. Veja as instruções no [repositório do backend](https://github.com/WillianAssufi/monitoramento-servicos) (sobe com `docker compose up`).

> O backend precisa liberar o CORS para a origem do frontend (`http://localhost:5173`). Isso já está configurado no `main.py` da API via `CORSMiddleware`.

## Como rodar

```bash
# 1. Instalar as dependências
npm install

# 2. Subir o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173` no navegador. Certifique-se de que a API esteja rodando em paralelo.

## Scripts disponíveis

| Comando | O que faz |
|---|---|
| `npm run dev` | Sobe o servidor de desenvolvimento (com hot-reload) |
| `npm run build` | Gera a build de produção na pasta `dist/` |
| `npm run preview` | Serve localmente a build de produção |
| `npm run lint` | Roda o ESLint no projeto |
