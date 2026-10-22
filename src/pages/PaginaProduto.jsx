import { Link, useParams } from 'react-router'
import AvisarQuandoVoltar from '../components/AvisarQuandoVoltar'
import ProdutoCard from '../components/ProdutoCard'
import { formatarPrecoProduto } from '../utils/formatarPreco'
import { estaEsgotado, podeSerVendido } from '../utils/produtos'

export default function PaginaProduto({ produtos, listaEspera, onAdicionar, onAvisar }) {
  const { id } = useParams()
  // A página abre mesmo para produto esgotado: é o destino dos links divulgados pelo marketing
  const produto = produtos.find((item) => item.id === id)

  if (!produto) {
    return (
      <div className="estado-vazio">
        <p>Produto não encontrado.</p>
        <Link to="/" className="botao botao-secundario">
          Voltar para a loja
        </Link>
      </div>
    )
  }

  const esgotado = estaEsgotado(produto)

  // Esgotados não aparecem na loja, então também ficam fora dos relacionados
  const relacionados = produtos
    .filter(
      (item) =>
        item.category === produto.category && item.id !== produto.id && !estaEsgotado(item)
    )
    .slice(0, 4)

  return (
    <section>
      <nav className="trilha" aria-label="Você está em">
        <Link to="/">Loja</Link>
        <span aria-hidden="true">/</span>
        <span>{produto.title}</span>
      </nav>

      <div className="detalhe">
        <div className="detalhe-imagem-moldura">
          <img src={produto.image} alt={produto.title} className="detalhe-imagem" />
        </div>

        <div className="detalhe-info">
          <h1>{produto.title}</h1>
          <p className="card-avaliacao">
            ★ {produto.rating.rate} <span>({produto.rating.count} avaliações)</span>
          </p>
          <p className="detalhe-preco">{formatarPrecoProduto(produto)}</p>
          <p className="detalhe-descricao">{produto.description}</p>
          <p className="detalhe-estoque">{produto.estoque} unidades disponíveis</p>

          <button
            className="botao botao-grande"
            onClick={() => onAdicionar(produto)}
            disabled={!podeSerVendido(produto)}
          >
            Adicionar ao carrinho
          </button>

          {/* key: ao ir de um esgotado para outro, o formulário começa limpo */}
          {esgotado && (
            <AvisarQuandoVoltar
              key={produto.id}
              produto={produto}
              listaEspera={listaEspera}
              onAvisar={onAvisar}
            />
          )}

          <ul className="detalhe-garantias">
            <li>Troca grátis em até 30 dias</li>
            <li>Parcele em até 10x sem juros</li>
          </ul>
        </div>
      </div>

      <h2>Produtos relacionados</h2>
      <div className="grade">
        {relacionados.map((item) => (
          <ProdutoCard key={item.id} produto={item} onAdicionar={onAdicionar} />
        ))}
      </div>
    </section>
  )
}
