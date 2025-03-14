
import { useState, useContext} from 'react'; 
import AuthContext from '../core/AuthContext';
import { Link, useNavigate } from 'react-router'; 
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { LinearProgress, Typography } from '@mui/material';






const url="http://localhost:3000/login";

const Login = () => {
  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  });

const [error, setError] = useState('');

 const {login } = useContext(AuthContext);
 const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };


  const handleChange = (event) => {
    const { name, value } = event.target;

    // Update form fields
    setFormFields(prevFields => ({
        ...prevFields,
        [name]: value
    }));

    // Validate field immediately
    // let error = '';
    // switch (name) {

    //     case 'email':
    //         if (!value) error = 'Email is required';
    //         else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email format';
    //         break;

    //     case 'password':
    //         if (!value) error = 'Password is required';
    //         break;
    // }

    // Update errors state
    setErrors(prevErrors => ({
        ...prevErrors,
        [name]: error
    }));
  };

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const validateForm = () => {
    let tempErrors = {    
      email: '',
      password: '',
    };
    let isValid = true;

  
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formFields.email) {
      tempErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formFields.email)) {
      tempErrors.email = 'Invalid email format';
      isValid = false;
    }


    // Password validation
    if (!formFields.password) {
      tempErrors.password = 'Password is required';
      isValid = false;
    } 

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (validateForm()) {
      try {
        const data = {
          email: formFields.email,
          password: formFields.password
        };

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          //throw new Error('login failed');
          if (response.status === 409) {
            const result = await response.json();
            throw Error(result.message);
          } else {
            throw Error("There was a problem connecting to the database!");
          }
          console.log(result);
        }
        const result = await response.json();

        // Clear form after successful submission
        setFormFields({ 
          email: '',
          password: '',
        });
        if (result.found===true) {
          console.log(result.data);
        console.log('Login successful!');
        login({ userId: result.data.user_id, name: result.data.first_name + " " + result.data.last_name });
        navigate('/');


      }else{
        console.log('Login not successful!');
        // show error - Wrong credentials
        setError("Wrong credentials");
      }
      
      } catch (error) {
        alert('Error during login: ' + error.message);
      }
    }
  };

  return (
    <section  className='page' >

    
      <h2 className='page__title'>Login Here!</h2>
      <div className='page__content'>
      <div className='page__content__form'>
      <Box
        component="form"
        // '& > :not(style)': means that it applies to all children elements that have no 'style' attribute. so marging 1 x 8px would be applied to all children
        sx={{ '& > :not(style)': { my: 2 } }}
        onSubmit={handleSubmit}
        noValidate
        // autoComplete="off"
      >

        <TextField
          fullWidth
          required
          id="email"
          name="email"
          label="Email"
          type='email'
          onChange={handleChange}
          value={formFields.email}
          error={!!errors.email}
          helperText={errors.email}
        // defaultValue="Hello World"
        />



        <FormControl fullWidth   variant="outlined" error={!!errors.password}>

          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            onChange={handleChange}
            value={formFields.password}
          
          />
          {errors.password && <FormHelperText>{errors.password}</FormHelperText>}
        </FormControl>

        <Button variant="outlined" type='submit' >Login</Button>


      </Box>
      </div>
      <Typography variant="button" gutterBottom sx={{ display: 'block' }}>
       Are you New to this site? consider <a href="/signup">Sign Up</a>.
      </Typography>
         
      {/* </form> */}
      </div>
     
    </section>
  )
}

export default Login