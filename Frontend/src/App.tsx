// src/App.tsx
import './App.css'

// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Navbar from './components/navbar/navbar'
import Homepage from './pages/homepage/homepage'
import AIpdfTagger from './pages/AIpdfTagger/AIpdfTagger'

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/ai-pdf-tagger" element={<AIpdfTagger/>} />
      </Routes>
    </Router>
  )
}