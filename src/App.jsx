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
import Logout from './components/Logout'
import { useContext, useState } from 'react'
import AuthContext from './core/AuthContext';
import { useNavigate } from 'react-router';
import Profile from './components/Profile'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const { user } = useContext(AuthContext);
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

          {/* **** protected routes */}
          <Route path="profile" element={
              <ProtectedRoute user={user} >
                  <Profile /> 
                  
              </ProtectedRoute>
          } />
          <Route path='recipes' element={ <Recipes /> } />
          <Route path="new" element={ <AddRecipe /> } />
          <Route path='planner' element={ <WeeklyPlanner /> } />
          <Route path='list' element={ <ShoppingList /> } />
          
          <Route path='logout' element={ <Logout /> } />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default App
