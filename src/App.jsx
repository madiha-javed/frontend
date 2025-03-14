import { Routes, Route } from 'react-router'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import Header from './core/header/Header'
import AddRecipe from './components/AddRecipe'
import Recipes from './components/Recipes'
import Planner from './components/Planner'
import ShoppingList from './components/ShoppingList'
import Footer from './core/footer/Footer'
import SignUp from './components/SignUp'
import Logout from './components/Logout'
import { useContext } from 'react'
import AuthContext from './core/AuthContext';
import Profile from './components/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import ViewRecipe from './components/ViewRecipe'
import Container from '@mui/material/Container';

function App() {
  const { user } = useContext(AuthContext);
  return (
    <>

      <header className='header'>
        <Header />
      </header>
      <main className='main'>
      <section className="main__content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='login' element={<Login />} />

          {/* **** protected routes */}
          <Route path="profile" element={
            <ProtectedRoute user={user}>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path='recipes' element={<Recipes />} />
          <Route path="recipe" element={<AddRecipe />} />
          <Route path="recipe/view" element={<ViewRecipe />} />
          <Route path='planner' element={<Planner />} />
          <Route path='list' element={<ShoppingList />} />
          <Route path='logout' element={<Logout />} />
        </Routes>
        </section>
      </main>
      <footer className='footer'>
        <Footer />
      </footer>
    </>
  )
}

export default App
