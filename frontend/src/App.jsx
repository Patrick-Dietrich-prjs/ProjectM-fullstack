import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PaginaMainProjetos from './pages/PaginaMainProjetos.jsx'
import PaginaProjeto from './pages/PaginaProjeto.jsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaMainProjetos />} />
        <Route path="/projeto/:id" element={<PaginaProjeto />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App