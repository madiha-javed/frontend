import IconNav from "./IconNav"
import Logo from "./Logo"
import TopMenu from "./TopMenu"
import './Header.css';

const Header = () => {
  return (
    <section className="header">
      
        <Logo />
        <TopMenu />
        {/* <IconNav /> */}
    </section>
  )
}

export default Header