import { temPreco } from './produtos'

export function formatarPreco(valor) {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

// Preço de um produto para exibir na tela.
// Produto sem preço definido não mostra "R$ NaN": avisa que o preço ainda vai chegar.
export function formatarPrecoProduto(produto) {
  return temPreco(produto) ? formatarPreco(produto.price) : 'Preço em breve'
}
