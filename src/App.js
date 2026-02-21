import React, { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './components/AuthContext'
import Layout from './components/Layout'
import { initializeMockData } from './lib/mockData'
import AIChat from './components/chat/AIChat'
import { Loader2 } from 'lucide-react'

// Lazy load the pages
const Dashboard = lazy(() => import('./pages/Dashboard'))
const LegalRights = lazy(() => import('./pages/LegalRights'))
const VoiceTraining = lazy(() => import('./pages/VoiceTraining'))
const SelfDefense = lazy(() => import('./pages/SelfDefense'))
const Resources = lazy(() => import('./pages/Resources'))
const Emergency = lazy(() => import('./pages/Emergency'))

// Loading fallback component
const PageLoader = () => (
  <div className="flex h-[80vh] items-center justify-center">
    <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
  </div>
)

function App() {
  useEffect(() => {
    // Initialize mock data on app start
    initializeMockData()
  }, [])

  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/legal-rights" element={<LegalRights />} />
              <Route path="/voice-training" element={<VoiceTraining />} />
              <Route path="/self-defense" element={<SelfDefense />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/emergency" element={<Emergency />} />
            </Routes>
          </Suspense>
          {/* Global AI Chat Widget */}
          <AIChat />
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App
