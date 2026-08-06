import { useEffect, useState } from "react"

import "./App.css"

function App() {
  const [servicos, setServicos] = useState([])

  async function buscarServicos() {
    const resposta = await fetch("http://localhost:8000/servicos")
    const dados = await resposta.json()
    setServicos(dados)
  }

  useEffect(() => {
    buscarServicos()
  }, [])

  const [nome, setNome] = useState("")
  const [url, setUrl] = useState("")
  const [intervaloMinutos, setIntervaloMinutos] = useState("")

  async function criarServico(e) {
    e.preventDefault()
    await fetch("http://localhost:8000/servicos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: nome,
        url: url,
        intervalo_minutos: Number(intervaloMinutos)
      })
    })
    await buscarServicos()
    setNome("")
    setUrl("")
    setIntervaloMinutos("")
  }

  async function deletarServico(id) {
    await fetch(`http://localhost:8000/servicos/${id}`, {
      method: "DELETE"
    })
    await buscarServicos()
  }

  const [busca, setBusca] = useState("")
  const servicosFiltrados = servicos.filter((servico) =>
    servico.nome.toLowerCase().includes(busca.toLowerCase())
  )

  const [view, setView] = useState("listar")
  const [menuAberto, setMenuAberto] = useState(false)
  const [servicoEditando, setServicoEditando] = useState(null)

  async function salvarEdicao() {
    await fetch(`http://localhost:8000/servicos/${servicoEditando.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: servicoEditando.nome,
        url: servicoEditando.url,
        intervalo_minutos: Number(servicoEditando.intervalo_minutos)
      })
    })
    buscarServicos()
    setServicoEditando(null)
  }

  async function alternarAtivo(servico) {
    await fetch(`http://localhost:8000/servicos/${servico.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ativo: !servico.ativo
      })
    })
    await buscarServicos()
  }

  return (
    <div>
      {/* TOPO DO FRONT */}
      <header className="topo">
        <div className="menu-wrapper">
          <button className="hamburguer" onClick={() => setMenuAberto(!menuAberto)}>
            ☰
          </button>
          {menuAberto && (
            <>
              <div className="backdrop" onClick={() => setMenuAberto(false)}></div>
              <nav className="menu">
                <button onClick={() => { setView("listar"); setMenuAberto(false) }}>Listar</button>
                <button onClick={() => { setView("adicionar"); setMenuAberto(false) }}>Adicionar</button>
              </nav>
            </>
          )}
        </div>
        <h1>WATCHDOG</h1>
        <p>Monitoramento de Serviços</p>
      </header>

      {/* CORPO DO FRONT */}
      <div className="corpo">
        <main className="conteudo">
          {/* TELA: ADICIONAR SERVIÇO */}
          {view === "adicionar" && (
            <form onSubmit={criarServico} className="form-servico">
              <input placeholder="Nome do Serviço" value={nome} onChange={(e) => setNome(e.target.value)} />
              <input placeholder="URL: https://exemplo.com/" value={url} onChange={(e) => setUrl(e.target.value)} />
              <input placeholder="Intervalo em Minutos" type="number" value={intervaloMinutos} onChange={(e) => setIntervaloMinutos(e.target.value)} />
              <p>
                <button className="add-button" type="submit">ADICIONAR</button>
              </p>
            </form>
          )}

          {/* TELA: LISTAR SERVIÇOS */}
          {view === "listar" && (
            <>
              <input className="busca-input" placeholder="Buscar por Nome..." value={busca} onChange={(e) => setBusca(e.target.value)} />
              <table className="tabela-servicos">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>URL</th>
                    <th>Intervalo (Min)</th>
                    <th>Estado do Serviço</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {servicosFiltrados.map((servico) => (
                    <tr key={servico.id}>
                      <td>{servico.nome}</td>
                      <td>{servico.url}</td>
                      <td>{servico.intervalo_minutos}</td>
                      <td>
                        <button className="ativo-button" onClick={() => alternarAtivo(servico)}>{servico.ativo ? "Ativo" : "Inativo"}</button>
                      </td>
                      <td>
                        <button className="atualizar-button" onClick={() => setServicoEditando(servico)}>Editar</button>
                        <button className="remover-button" onClick={() => deletarServico(servico.id)}>Remover</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </main>
      </div>
      {servicoEditando && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Editar Serviço</h2>
            <input value={servicoEditando.nome} onChange={(e) => setServicoEditando({ ...servicoEditando, nome: e.target.value })} />
            <input value={servicoEditando.url} onChange={(e) => setServicoEditando({ ...servicoEditando, url: e.target.value })} />
            <input type="number" value={servicoEditando.intervalo_minutos} onChange={(e) => setServicoEditando({ ...servicoEditando, intervalo_minutos: e.target.value })} />
            <button onClick={() => setServicoEditando(null)}>Cancelar</button>
            <button onClick={salvarEdicao}>Salvar</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
