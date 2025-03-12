

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlateWheat } from '@fortawesome/free-solid-svg-icons';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import './Logo.css';

const Logo = () => {
  return (
    <section id='logo'>
    <h1>
    <a href="#">
        <FontAwesomeIcon icon={faPlateWheat} />
        {/* <RamenDiningIcon /> */}
        <span>Recipe Book</span>
    </a>
    </h1>

    </section>
  )
}

export default Logo