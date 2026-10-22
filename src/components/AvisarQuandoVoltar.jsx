import { useState } from 'react'
import { validarPedidoAviso } from '../utils/listaEspera'

// Formulário para o cliente pedir aviso quando um produto esgotado voltar
export default function AvisarQuandoVoltar({ produto, listaEspera, onAvisar }) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [erro, setErro] = useState('')
  const [emailAvisado, setEmailAvisado] = useState('')

  function enviar(evento) {
    evento.preventDefault()

    const mensagemErro = validarPedidoAviso(nome, email, produto.id, listaEspera)
    if (mensagemErro) {
      setErro(mensagemErro)
      setEmailAvisado('')
      return
    }

    onAvisar(produto.id, nome.trim(), email.trim())
    setEmailAvisado(email.trim())
    setErro('')
    setNome('')
    setEmail('')
  }

  return (
    <form className="aviso-esgotado" onSubmit={enviar} noValidate>
      <p className="aviso-esgotado-titulo">Quer ser avisado quando voltar?</p>
      <p className="aviso-esgotado-texto">
        Deixe seu nome e e-mail e avisamos assim que este produto chegar.
      </p>

      <label htmlFor="aviso-nome" className="rotulo">
        Nome
      </label>
      <input
        id="aviso-nome"
        value={nome}
        onChange={(evento) => setNome(evento.target.value)}
        autoComplete="name"
      />

      <label htmlFor="aviso-email" className="rotulo">
        E-mail
      </label>
      <input
        id="aviso-email"
        type="email"
        value={email}
        onChange={(evento) => setEmail(evento.target.value)}
        autoComplete="email"
      />

      {erro && (
        <p className="mensagem-erro" role="alert">
          {erro}
        </p>
      )}
      {emailAvisado && (
        <p className="mensagem-sucesso" role="status">
          Pronto! Vamos avisar {emailAvisado} quando este produto voltar.
        </p>
      )}

      <button className="botao">Avise-me quando voltar</button>
    </form>
  )
}
