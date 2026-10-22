// Regras de negócio sobre a situação de venda de um produto

// Produto sem nenhuma unidade em estoque
export function estaEsgotado(produto) {
  return produto.estoque <= 0
}

// Produto com preço definido pelo time de suprimentos.
// Sem preço, o produto não pode ser vendido (mesmo tendo estoque separado).
export function temPreco(produto) {
  return Number.isFinite(produto.price) && produto.price > 0
}

// Só entra no carrinho quem tem preço e tem unidade em estoque
export function podeSerVendido(produto) {
  return temPreco(produto) && !estaEsgotado(produto)
}
