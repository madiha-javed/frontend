import { NavLink } from 'react-router-dom';
import './TopMenu.css';

const TopMenu = () => {
  return (
    <nav className="topNavigation">
        <ul>
          {/* Don't use <a href elements for the links */}
            {/* <li><a href="/">Home</a></li> */}
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="login">Login</NavLink></li>
            <li><NavLink to="recipes">Recipes</NavLink></li>
            <li><NavLink to="new">Add Recipe</NavLink></li>
          
            <li><NavLink to="planner">Weekly Planner</NavLink></li>
            <li><NavLink to="list">Shoping List</NavLink></li>
        </ul>
    </nav>
  )
}

export default TopMenu