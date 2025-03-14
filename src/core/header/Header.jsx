import IconNav from "./IconNav"
import Logo from "./Logo"
import TopMenu from "./TopMenu"
import './Header.css';
import Container from '@mui/material/Container';


const Header = () => {
  return (
   
    <section className="header__content">
     
        <Logo />
        <TopMenu />
        <IconNav />
       
    </section>
   
    
  )
}

export default Header