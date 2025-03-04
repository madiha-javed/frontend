import { Routes, Route } from 'react-router'
import './App.css'
import Home from './components/Home'
import Students from './components/Students'
import Header from './core/header/Header'

function App() {

  return (
    <>
      <header>
      <Header />
      </header>
      <main>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="students" element={ <Students /> } />
        </Routes>
      </main>
      <footer>

      </footer>
    </>
  )
}

export default App
