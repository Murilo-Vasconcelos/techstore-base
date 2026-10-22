import { Link } from 'react-router'
import { formatarPreco, formatarPrecoProduto } from '../utils/formatarPreco'
import { estaEsgotado, podeSerVendido } from '../utils/produtos'

// Card de produto usado em todos os lugares da loja: lista, "Produtos relacionados"
// e "Você também pode gostar". Qualquer mudança no visual do produto é feita só aqui.
export default function ProdutoCard({ produto, onAdicionar }) {
  const esgotado = estaEsgotado(produto)

  return (
    <article className="card">
      <Link to={`/produto/${produto.id}`} className="card-link">
        <div className="card-imagem-moldura">
          <img src={produto.image} alt={produto.title} className="card-imagem" />
        </div>
        <h3 className="card-titulo">{produto.title}</h3>
      </Link>

      <p className="card-avaliacao">
        ★ {produto.rating.rate} <span>({produto.rating.count} avaliações)</span>
      </p>

      <div className="card-precos">
        {produto.precoOriginal && (
          <span className="preco-original">{formatarPreco(produto.precoOriginal)}</span>
        )}
        <span className="preco">{formatarPrecoProduto(produto)}</span>
      </div>

      <div className="card-selos">
        {esgotado && <span className="selo selo-esgotado">Esgotado</span>}
      </div>

      <button
        className="botao"
        onClick={() => onAdicionar(produto)}
        disabled={!podeSerVendido(produto)}
      >
        Adicionar ao carrinho
      </button>
    </article>
  )
}
