import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

function Home() {
  return (
    <div className="container mt-5">
      <h1>OctoFit Tracker</h1>
      <p>Welcome to your fitness tracking application</p>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
