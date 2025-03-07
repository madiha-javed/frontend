import { Routes, Route } from 'react-router'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import Header from './core/header/Header'
import AddRecipe from './components/AddRecipe'
import Recipes from './components/Recipes'
import WeeklyPlanner from './components/WeeklyPlanner'
import ShoppingList from './components/ShoppingList'
import Footer from './core/footer/Footer'
import SignUp from './components/SignUp'

function App() {

  return (
    <>
      <header>
      <Header />
      </header>
      <main>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path='signup' element={ <SignUp /> } />
          <Route path='login' element={ <Login /> } />
          <Route path='recipes' element={ <Recipes /> } />
          <Route path="new" element={ <AddRecipe /> } />
          <Route path='planner' element={ <WeeklyPlanner /> } />
          <Route path='list' element={ <ShoppingList /> } />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default App
