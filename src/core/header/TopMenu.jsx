import { NavLink } from 'react-router-dom';
import './TopMenu.css';
import { useContext } from 'react';
import AuthContext from '../AuthContext';

const TopMenu = () => {
  const {isLogged} = useContext(AuthContext);
  return (
    <nav className="topNavigation">
        <ul>
          {/* Don't use <a href elements for the links */}
            {/* <li><a href="/">Home</a></li> */}
            <li><NavLink to="/">Home</NavLink></li>
            {!isLogged && 
              <>
                <li><NavLink to="signup">Sign Up</NavLink></li>
                <li><NavLink to="login">Login</NavLink></li>
              </>
            }
            
            { isLogged && 
              <>
                <li><NavLink to="recipes">Recipes</NavLink></li>
                <li><NavLink to="new">Add Recipe</NavLink></li>
          
                <li><NavLink to="planner">Weekly Planner</NavLink></li>
                <li><NavLink to="list">Shoping List</NavLink></li>
                <li><NavLink to="profile">Profile</NavLink></li>
                <li><NavLink to="logout">Logout</NavLink></li>
              </>
            }
            


        </ul>
    </nav>
  )
}

export default TopMenu