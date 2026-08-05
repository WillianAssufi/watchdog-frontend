# Watchdog — Frontend

Interface web em **React** para o **[Watchdog](https://github.com/WillianAssufi/monitoramento-servicos)**, uma API de monitoramento de serviços. Este frontend consome a API para gerenciar os serviços monitorados (cadastrar, listar, atualizar e remover), enquanto a observabilidade do time fica no Grafana do backend.

> Projeto separado do backend (arquitetura *polyrepo*): o backend é a API + banco + observabilidade; este repositório é apenas o cliente web que a consome.

## Stack

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/) (dev server com HMR e build)
- JavaScript
- ESLint

## Funcionalidades

CRUD de serviços consumindo a API:

- [x] **Listar** serviços (`GET /servicos`)
- [x] **Cadastrar** serviço (`POST /servicos`)
- [x] **Remover** serviço (`DELETE /servicos/{id}`)
- [ ] **Atualizar** serviço (`PATCH /servicos/{id}`) — em desenvolvimento
- [ ] Melhorias de layout e navegação — em desenvolvimento

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
