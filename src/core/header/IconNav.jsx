import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
// import { faUser } from '@fortawesome/free-regular-svg-icons';
import './IconNav.css';

const IconNav = () => {
  return (
    <section id="topNavIcons">   
        <FontAwesomeIcon icon={faUser} />
    </section>
  )
}

export default IconNav