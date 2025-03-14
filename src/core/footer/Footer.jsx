import './Footer.css'
import Container from '@mui/material/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faSquareTwitter, faSquareInstagram } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router';



const Footer = () => {
  const getYear = new Date().getFullYear();

  return (

    <section className="footer__content">

      <div>  <span>&copy; {getYear}  Made with &hearts;, in Norderstedt</span> </div>


      <div  >

        <Link to="/" className='footer__social'>
          {/* <FontAwesomeIcon icon={faRandom} />     */}
          <FontAwesomeIcon icon={faSquareFacebook} size="2x" />
        </Link>
        <Link to="/" className='footer__social'>
          {/* <FontAwesomeIcon icon={faRandom} />     */}
          <FontAwesomeIcon icon={faSquareTwitter} size="2x" />
        </Link>
        <Link to="/">
          {/* <FontAwesomeIcon icon={faRandom} />     */}
          <FontAwesomeIcon icon={faSquareInstagram} size="2x" />
        </Link>

      </div>
    </section>

  )
}

export default Footer