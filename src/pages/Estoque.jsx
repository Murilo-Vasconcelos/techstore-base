import { quemEsperaPeloProduto } from '../utils/listaEspera'

// Página usada pelo time de estoque para acompanhar a quantidade de cada produto
// e quem está esperando os produtos esgotados voltarem
export default function Estoque({ produtos, listaEspera }) {
  // slice cria uma cópia, para o sort não alterar a lista original.
  // Menos unidades primeiro; entre produtos com a mesma quantidade (os esgotados),
  // quem tem mais gente esperando vem antes, para ajudar a decidir o que repor primeiro.
  const ordenados = produtos.slice().sort((a, b) => {
    if (a.estoque !== b.estoque) return a.estoque - b.estoque
    return (
      quemEsperaPeloProduto(listaEspera, b.id).length -
      quemEsperaPeloProduto(listaEspera, a.id).length
    )
  })

  return (
    <section>
      <p className="sobretitulo">Área interna</p>
      <h1>Estoque</h1>
      <p className="aviso">Produtos com menos de 5 unidades precisam de reposição.</p>

      <div className="tabela-moldura">
        <table className="tabela">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Categoria</th>
              <th>Unidades</th>
              <th>Situação</th>
              <th>Aguardando aviso</th>
            </tr>
          </thead>
          <tbody>
            {ordenados.map((produto) => {
              const esperando = quemEsperaPeloProduto(listaEspera, produto.id)

              return (
                <tr key={produto.id}>
                  <td>{produto.title}</td>
                  <td>{produto.category}</td>
                  <td>{produto.estoque}</td>
                  <td>
                    {produto.estoque === 0 && <span className="selo selo-esgotado">Esgotado</span>}
                    {produto.estoque > 0 && produto.estoque < 5 && (
                      <span className="selo selo-alerta">Repor</span>
                    )}
                    {produto.estoque >= 5 && <span className="selo selo-ok">OK</span>}
                  </td>
                  <td>
                    {esperando.length === 0 && '—'}
                    {esperando.length > 0 && (
                      <>
                        <strong>
                          {esperando.length} {esperando.length === 1 ? 'pessoa' : 'pessoas'}
                        </strong>
                        <ul className="lista-espera">
                          {esperando.map((pedido) => (
                            <li key={pedido.email}>
                              {pedido.nome} · {pedido.email}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
