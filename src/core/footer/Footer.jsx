import './Footer.css'
import Container from '@mui/material/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook , faSquareTwitter, faSquareInstagram } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router';
const Footer = () => {
  return (
    <Container maxWidth="xl">
    <section className="footer">
      <div>  <span>&copy; 2025 Made with &hearts;, in Norderstedt</span> </div>
      <div> </div>
     
   
     
      
      
       
          {/* <FontAwesomeIcon icon="fa-brands fa-facebook" /> */}
          {/* <FontAwesomeIcon icon={faFacebook} /> */}
          <FontAwesomeIcon icon={faSquareFacebook} />
          <FontAwesomeIcon icon={faSquareTwitter} />
          <FontAwesomeIcon icon={faSquareInstagram} />
          <div >  
            
            <Link to="/any-url">
              {/* <FontAwesomeIcon icon={faRandom} />     */}
              <FontAwesomeIcon icon={faSquareFacebook} size="2x" />      
            </Link> 
            <Link to="/any-url">
              {/* <FontAwesomeIcon icon={faRandom} />     */}
              <FontAwesomeIcon icon={faSquareTwitter} size="2x" />      
            </Link> 
            <Link to="/any-url">
              {/* <FontAwesomeIcon icon={faRandom} />     */}
              <FontAwesomeIcon icon={faSquareInstagram} size="2x" />      
            </Link> 
         </div>

    </section>
    </Container>
  )
}

export default Footer