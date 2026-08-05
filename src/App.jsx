import { useEffect, useState } from "react"

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
  const [url, setUrl] = useState("https://")
  const [intervaloMinutos, setIntervaloMinutos] = useState(1)

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
    setUrl("https://")
    setIntervaloMinutos(1)
  }

  async function deletarServico(id) {
    await fetch(`http://localhost:8000/servicos/${id}`,{
      method: "DELETE"
    })
    await buscarServicos()
  }

  return (
    <div>
      <h1>WATCHDOG</h1>
      <p>Monitoramento de Serviços</p>
      <form onSubmit={criarServico}>
        <input value={nome} onChange={(e) => setNome(e.target.value)}/>
        <input value={url} onChange={(e) => setUrl(e.target.value)}/>
        <input type="number" value={intervaloMinutos} onChange={(e) => setIntervaloMinutos(e.target.value)}/>
        <p>
          <button type="submit">Adicionar</button>
        </p>
      </form>
      <p>Nome: {nome}</p>
      <p>URL: {url}</p>
      <p>Intervalo de Minutos: {intervaloMinutos}</p>
      <ul>{servicos.map((servico) => <li key={servico.id}>{servico.nome} {servico.url} <button onClick={() => deletarServico(servico.id)}>Remover</button></li>)}</ul>      
    </div>
  )
}

export default App