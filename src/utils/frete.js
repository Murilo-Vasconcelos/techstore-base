// Regra do frete grátis (campanha de outubro de 2026):
// vale para compras com valor final ACIMA de R$ 200, já com o desconto do cupom.

export const VALOR_FRETE_GRATIS = 200

// Trabalha em centavos para não errar por causa de números decimais (0.1 + 0.2 !== 0.3).
// Devolve se a compra tem frete grátis e, se não tiver, quanto falta para ganhar.
export function calcularFrete(valorFinal) {
  const limite = Math.round(VALOR_FRETE_GRATIS * 100)
  const centavos = Math.round(valorFinal * 100)

  if (centavos > limite) {
    return { gratis: true, falta: 0 }
  }

  // "Acima" de R$ 200 exige pelo menos 1 centavo a mais, então nunca mostra "falta R$ 0,00"
  return { gratis: false, falta: Math.max(limite - centavos, 1) / 100 }
}
