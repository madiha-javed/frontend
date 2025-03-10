import { useContext, useEffect } from 'react';
import AuthContext from '../core/AuthContext';
import { useNavigate } from 'react-router';

const Logout = () => {
  const { logout } = useContext(AuthContext);

  const navigate = useNavigate();
  
  useEffect(() => {
    logout();
    navigate('/')
  },[]);

  return null
};

export default Logout;
