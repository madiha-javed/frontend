import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
// import { faUser } from '@fortawesome/free-regular-svg-icons';
import './IconNav.css';
import { NavLink } from 'react-router';
import { Button, Menu, MenuItem } from '@mui/material';
import AuthContext from '../AuthContext';


const IconNav = () => {
  const { user } = useContext(AuthContext);
  const { isLogged } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <section id="topNavIcons">



      <div>

        <Button
          id="demo-positioned-button"
          aria-controls={open ? 'demo-positioned-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={faUser} />
        </Button>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        // anchorOrigin={{
        //   vertical: 'top',
        //   horizontal: 'left',
        // }}
        // transformOrigin={{
        //   vertical: 'top',
        //   horizontal: 'left',
        // }}
        >
          {/* <NavLink to="/login">Login</NavLink> */}
          {!isLogged &&

            <MenuItem onClick={handleClose}><a href="/login">Login</a></MenuItem>
          }

          {isLogged &&
            <>
              <MenuItem onClick={handleClose} >
              
              <NavLink to="profile">Profile</NavLink>
              </MenuItem>
              <MenuItem onClick={handleClose}><NavLink to="logout">Logout</NavLink></MenuItem>

            </>
          }

        </Menu>
      </div>
    </section>
  )
}

export default IconNav