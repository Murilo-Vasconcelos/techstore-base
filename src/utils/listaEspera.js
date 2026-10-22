// Regras da lista de espera: clientes que pediram para ser avisados
// quando um produto esgotado voltar ao estoque.
// Cada pedido é guardado como { produtoId, nome, email }.

// Verificação simples de formato: algo@dominio.com, sem espaços
export function emailValido(email) {
  const texto = email.trim()
  const arroba = texto.indexOf('@')
  const dominio = texto.slice(arroba + 1)

  return (
    arroba > 0 &&
    !texto.includes(' ') &&
    !dominio.includes('@') &&
    dominio.includes('.') &&
    !dominio.startsWith('.') &&
    !dominio.endsWith('.')
  )
}

// Pessoas que estão esperando por um produto
export function quemEsperaPeloProduto(listaEspera, produtoId) {
  return listaEspera.filter((pedido) => pedido.produtoId === produtoId)
}

// Devolve a mensagem de erro para mostrar ao cliente, ou '' quando os dados estão corretos
export function validarPedidoAviso(nome, email, produtoId, listaEspera) {
  if (!nome.trim()) return 'Informe seu nome.'
  if (!email.trim()) return 'Informe seu e-mail.'
  if (!emailValido(email)) return 'Informe um e-mail válido, como nome@email.com.'

  const jaPediu = quemEsperaPeloProduto(listaEspera, produtoId).find(
    (pedido) => pedido.email.toLowerCase() === email.trim().toLowerCase()
  )
  if (jaPediu) return 'Este e-mail já está na lista de espera deste produto.'

  return ''
}
