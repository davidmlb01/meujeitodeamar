import { useParams } from 'react-router-dom'

export default function Resultado() {
  const { estilo } = useParams()
  return (
    <div className="container">
      <p>Resultado — estilo: {estilo} — em construção</p>
    </div>
  )
}
