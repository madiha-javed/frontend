import IconNav from "./IconNav"
import Logo from "./Logo"
import TopMenu from "./TopMenu"
import './Header.css';
import Container from '@mui/material/Container';


const Header = () => {
  return (
    <Container maxWidth="xl">
    <section className="header">
      
        <Logo />
        <TopMenu />
        {/* <IconNav /> */}
    </section>
    </Container>
    
  )
}

export default Header