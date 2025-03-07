

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlateWheat } from '@fortawesome/free-solid-svg-icons';
import './Logo.css';

const Logo = () => {
  return (
    <section id='logo'>
    <h1>
    <a href="#">
        <FontAwesomeIcon icon={faPlateWheat} />
        <span>Recipe Book</span>
    </a>
    </h1>

    </section>
  )
}

export default Logo