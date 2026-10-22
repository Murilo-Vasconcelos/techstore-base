import { get } from './api'

// Formato dos produtos documentado em docs/api.md

// A API às vezes manda o preço como texto ("189.90") e, nos produtos que o time
// de suprimentos ainda não precificou, nem manda o campo. Aqui o preço vira número
// (ou null, quando não existe) para o resto do site não precisar se preocupar com isso.
function converterPreco(valor) {
  // Number('') dá 0, então vazio precisa ser tratado antes da conversão
  if (valor === undefined || valor === null || valor === '') return null

  const numero = Number(valor)
  return Number.isNaN(numero) ? null : numero
}

function normalizarProduto(produto) {
  return {
    ...produto,
    price: converterPreco(produto.price),
    precoOriginal: converterPreco(produto.precoOriginal),
  }
}

export function buscarProdutos() {
  return get('/products.json').then((produtos) => produtos.map(normalizarProduto))
}
