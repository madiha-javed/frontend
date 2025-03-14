

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlateWheat } from '@fortawesome/free-solid-svg-icons';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import './Logo.css';
import { Typography } from '@mui/material';

const Logo = () => {
  return (
    <section id='logo'>
    {/* <h1> */}
    <a href="/">
        
        {/* <RamenDiningIcon /> */}
        
        <Typography variant="h4" gutterBottom> <FontAwesomeIcon icon={faPlateWheat} /> RecipeKeeper</Typography>
        
    </a>
    {/* </h1> */}

    </section>
  )
}

export default Logo