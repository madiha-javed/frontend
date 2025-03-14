import { NavLink } from 'react-router-dom';
import './TopMenu.css';
import { useContext } from 'react';
import AuthContext from '../AuthContext';

const TopMenu = () => {
  const {isLogged} = useContext(AuthContext);
  return (
    <nav className="topNavigation">
        <ul>
          
            
            { isLogged && 
              <>
                <li><NavLink to="recipes">Recipes</NavLink></li>
                <li><NavLink to="recipe/new">Add Recipe</NavLink></li>
          
                <li><NavLink to="planner">Weekly Planner</NavLink></li>
                <li><NavLink to="list">Shoping List</NavLink></li>
                {/* <li><NavLink to="profile">Profile</NavLink></li>
                <li><NavLink to="logout">Logout</NavLink></li> */}
              </>
            }
            


        </ul>
    </nav>
  )
}

export default TopMenu