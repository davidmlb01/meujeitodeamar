// Mapeamento de opção → estilo de apego
const OPTION_TO_STYLE = {
  A: 'ansioso',
  B: 'distante',
  C: 'seguro',
  D: 'desorganizado',
}

// Em empate, prioridade: desorganizado > ansioso > distante > seguro
const PRIORITY = ['desorganizado', 'ansioso', 'distante', 'seguro']

/**
 * Calcula o estilo de apego dominante a partir das respostas.
 * @param {string[]} answers - Array de 20 letras (A/B/C/D), uma por pergunta
 * @returns {'ansioso'|'distante'|'seguro'|'desorganizado'}
 */
export function calcularEstilo(answers) {
  const counts = { ansioso: 0, distante: 0, seguro: 0, desorganizado: 0 }

  for (const answer of answers) {
    const style = OPTION_TO_STYLE[answer]
    if (style) counts[style]++
  }

  const maxCount = Math.max(...Object.values(counts))

  // Se houver empate, usar ordem de prioridade
  for (const style of PRIORITY) {
    if (counts[style] === maxCount) return style
  }

  return 'seguro' // fallback
}
