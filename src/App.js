import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import LegalRights from './pages/LegalRights'
import VoiceTraining from './pages/VoiceTraining'
import SelfDefense from './pages/SelfDefense'
import Resources from './pages/Resources'
import Emergency from './pages/Emergency'
import { initializeMockData } from './lib/mockData'

function App() {
  useEffect(() => {
    // Initialize mock data on app start
    initializeMockData()
  }, [])

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/legal-rights" element={<LegalRights />} />
          <Route path="/voice-training" element={<VoiceTraining />} />
          <Route path="/self-defense" element={<SelfDefense />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/emergency" element={<Emergency />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
