import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Analytics } from './components'
import LandingPage from './pages/LandingPage'
import QuizB from './pages/QuizB'
import Resultado from './pages/Resultado'
import Obrigado from './pages/Obrigado'
import Privacidade from './pages/Privacidade'
import Termos from './pages/Termos'

export default function App() {
  return (
    <HelmetProvider>
    <BrowserRouter>
      <Analytics />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/quiz/b" element={<QuizB />} />
        <Route path="/resultado/:estilo" element={<Resultado />} />
        <Route path="/obrigado" element={<Obrigado />} />
        <Route path="/privacidade" element={<Privacidade />} />
        <Route path="/termos" element={<Termos />} />
      </Routes>
    </BrowserRouter>
    </HelmetProvider>
  )
}
