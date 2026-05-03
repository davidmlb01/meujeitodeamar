import { createCanvas, registerFont } from 'canvas'
import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '..', 'public')

const DARK = '#4B1D3F'
const BG = '#E8D9C1'

const styles = [
  { key: 'default', name: null, color: '#D8A7B1', headline: 'Descubra o seu\njeito de amar.', sub: '20 perguntas. Resultado imediato. Base científica.' },
  { key: 'ansioso', name: 'Ansioso', color: '#D8A7B1' },
  { key: 'distante', name: 'Distante', color: '#C4909C' },
  { key: 'seguro', name: 'Seguro', color: '#BF8A96' },
  { key: 'confuso', name: 'Confuso', color: '#D4B5B0' },
]

function generateOG(style) {
  const W = 1200
  const H = 630
  const canvas = createCanvas(W, H)
  const ctx = canvas.getContext('2d')

  // Background
  ctx.fillStyle = DARK
  ctx.fillRect(0, 0, W, H)

  // Accent circle
  ctx.beginPath()
  ctx.arc(W * 0.65, H * 0.5, 250, 0, Math.PI * 2)
  ctx.fillStyle = style.color
  ctx.globalAlpha = 0.08
  ctx.fill()
  ctx.globalAlpha = 1

  ctx.textAlign = 'center'

  if (style.key === 'default') {
    // Default card
    ctx.font = '13px sans-serif'
    ctx.fillStyle = 'rgba(255,255,255,0.35)'
    ctx.fillText('TESTE GRATUITO', W / 2, 200)

    // Headline (multi-line)
    ctx.font = 'italic 56px serif'
    ctx.fillStyle = BG
    const lines = style.headline.split('\n')
    lines.forEach((line, i) => {
      // Color "amar." differently
      if (line.includes('amar.')) {
        const before = line.replace('amar.', '')
        const amorWidth = ctx.measureText('amar.').width
        const beforeWidth = ctx.measureText(before).width
        const totalWidth = beforeWidth + amorWidth
        const startX = W / 2 - totalWidth / 2

        ctx.fillStyle = BG
        ctx.textAlign = 'left'
        ctx.fillText(before, startX, 270 + i * 70)

        ctx.fillStyle = style.color
        ctx.fillText('amar.', startX + beforeWidth, 270 + i * 70)

        ctx.textAlign = 'center'
        ctx.fillStyle = BG
      } else {
        ctx.fillText(line, W / 2, 270 + i * 70)
      }
    })

    // Sub
    ctx.font = '18px sans-serif'
    ctx.fillStyle = 'rgba(255,255,255,0.5)'
    ctx.fillText(style.sub, W / 2, 420)

    // Divider
    ctx.strokeStyle = 'rgba(255,255,255,0.15)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(W / 2 - 30, 460)
    ctx.lineTo(W / 2 + 30, 460)
    ctx.stroke()

    // URL
    ctx.font = '500 16px sans-serif'
    ctx.fillStyle = BG
    ctx.globalAlpha = 0.7
    ctx.fillText('meujeitodeamar.com.br', W / 2, 500)
    ctx.globalAlpha = 1

  } else {
    // Style card
    ctx.font = '13px sans-serif'
    ctx.fillStyle = 'rgba(255,255,255,0.35)'
    ctx.fillText('MEU JEITO DE AMAR', W / 2, 195)

    // "Meu jeito de amar é"
    ctx.font = 'italic 38px serif'
    ctx.fillStyle = BG
    ctx.fillText('Meu jeito de amar é', W / 2, 260)

    // Style name
    ctx.font = 'italic 80px serif'
    ctx.fillStyle = style.color
    ctx.fillText(style.name + '.', W / 2, 350)

    // "E o seu?"
    ctx.font = 'italic 28px serif'
    ctx.fillStyle = 'rgba(255,255,255,0.5)'
    ctx.fillText('E o seu?', W / 2, 410)

    // Divider
    ctx.strokeStyle = 'rgba(255,255,255,0.12)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(W / 2 - 30, 450)
    ctx.lineTo(W / 2 + 30, 450)
    ctx.stroke()

    // CTA
    ctx.font = '300 17px sans-serif'
    ctx.fillStyle = 'rgba(255,255,255,0.45)'
    ctx.fillText('Descubra em', W / 2, 495)

    ctx.font = '500 19px sans-serif'
    ctx.fillStyle = BG
    ctx.fillText('meujeitodeamar.com.br', W / 2, 525)
  }

  return canvas
}

// Generate all
styles.forEach((style) => {
  const canvas = generateOG(style)
  const buffer = canvas.toBuffer('image/png')
  const filename = `og-${style.key}.png`
  writeFileSync(join(outDir, filename), buffer)
  console.log(`✓ ${filename} (${buffer.length} bytes)`)
})

console.log('\nDone! Files saved to public/')
