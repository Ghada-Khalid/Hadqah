import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar' // إذا عندك سايدبار
// import other pages as needed

function App() {
  return (
    <div className="App flex">
      <BrowserRouter>
        <Sidebar /> {/* تظهر دائمًا */}
        <div className="flex-1">
          <Navbar /> {/* تظهر دائمًا */}
          <div className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              {/* ممكن تضيف لاحقًا بقية الصفحات زي assessment, controls, etc */}
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App

