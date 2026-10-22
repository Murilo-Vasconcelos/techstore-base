import { useState } from 'react'
import { Link } from 'react-router'
import ProdutoCard from '../components/ProdutoCard'
import { agruparItens, calcularTotal } from '../utils/carrinho'
import { validarCupom } from '../utils/cupons'
import { formatarPreco } from '../utils/formatarPreco'
import { calcularFrete, VALOR_FRETE_GRATIS } from '../utils/frete'
import { podeSerVendido } from '../utils/produtos'

export default function Carrinho({ carrinho, produtos, clienteAtual, onAdicionar, onRemover }) {
  const [codigoCupom, setCodigoCupom] = useState('')
  const [cupomAplicado, setCupomAplicado] = useState(null)
  const [mensagemCupom, setMensagemCupom] = useState('')

  const itens = agruparItens(carrinho)
  const total = calcularTotal(carrinho)
  const totalComDesconto = cupomAplicado ? total * (1 - cupomAplicado.desconto) : total
  // O frete grátis considera o valor final, depois do desconto do cupom
  const frete = calcularFrete(totalComDesconto)

  // Sugestões só com o que pode ser comprado: sem esgotados e sem produtos sem preço
  const sugestoes = produtos
    .filter((produto) => podeSerVendido(produto) && !carrinho.find((item) => item.id === produto.id))
    .slice(0, 3)

  function aplicarCupom(evento) {
    evento.preventDefault()
    const resultado = validarCupom(codigoCupom, clienteAtual)

    if (resultado.valido) {
      setCupomAplicado(resultado)
      setMensagemCupom('Cupom aplicado!')
    } else {
      setCupomAplicado(null)
      setMensagemCupom('Cupom inválido')
    }
  }

  if (carrinho.length === 0) {
    return (
      <section>
        <h1>Carrinho</h1>
        <div className="estado-vazio">
          <p>Seu carrinho está vazio.</p>
          <Link to="/" className="botao botao-secundario">
            Ver produtos
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section>
      <h1>Carrinho</h1>

      <div className="carrinho-layout">
        <ul className="lista-carrinho">
          {itens.map((item) => (
            <li key={item.produto.id} className="item-carrinho">
              {/* Imagem e nome abrem a página do produto (o link da imagem fica fora do teclado
                  e dos leitores de tela para não repetir o do nome) */}
              <Link
                to={`/produto/${item.produto.id}`}
                className="item-imagem-moldura"
                aria-hidden="true"
                tabIndex={-1}
              >
                <img src={item.produto.image} alt={item.produto.title} />
              </Link>
              <div className="item-info">
                <p className="item-titulo">
                  <Link to={`/produto/${item.produto.id}`}>{item.produto.title}</Link>
                </p>
                <p className="item-preco">R$ {item.produto.price}</p>
              </div>
              <span className="item-quantidade">{item.quantidade} un.</span>
              <button className="botao-texto" onClick={() => onRemover(item.produto.id)}>
                Remover 1
              </button>
            </li>
          ))}
        </ul>

        <aside className="resumo">
          <h2 className="resumo-titulo">Resumo do pedido</h2>

          <form className="cupom" onSubmit={aplicarCupom}>
            <label htmlFor="cupom" className="rotulo">
              Cupom de desconto
            </label>
            <div className="cupom-campo">
              <input
                id="cupom"
                value={codigoCupom}
                onChange={(evento) => setCodigoCupom(evento.target.value)}
                placeholder="Digite o código"
              />
              <button className="botao botao-secundario">Aplicar</button>
            </div>
            {mensagemCupom && <p className="mensagem-cupom">{mensagemCupom}</p>}
          </form>

          {cupomAplicado && (
            <p className="resumo-linha">
              <span>Desconto</span>
              <span>{cupomAplicado.desconto * 100}%</span>
            </p>
          )}
          <p className="total">
            <span>Total</span>
            <span>{formatarPreco(totalComDesconto)}</span>
          </p>

          <div className={frete.gratis ? 'frete frete-ok' : 'frete'} role="status">
            {frete.gratis ? (
              <p className="frete-destaque">Você ganhou frete grátis!</p>
            ) : (
              <p className="frete-destaque">
                Falta {formatarPreco(frete.falta)} para você ganhar frete grátis.
              </p>
            )}
            <p className="frete-regra">
              Frete grátis em compras acima de {formatarPreco(VALOR_FRETE_GRATIS)}, já com o
              desconto do cupom.
            </p>
          </div>
        </aside>
      </div>

      <h2>Você também pode gostar</h2>
      <div className="grade">
        {sugestoes.map((produto) => (
          <ProdutoCard key={produto.id} produto={produto} onAdicionar={onAdicionar} />
        ))}
      </div>
    </section>
  )
}
