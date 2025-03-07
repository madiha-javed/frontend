
import * as React from 'react';
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

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';





console.log("test");

const SignUp = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = (event) => {
    console.log("test2");
  }

  return (
    <section className="login">

    <div className='LoginForm'>

      <h2>Login Page</h2>
      <Box
        component="form"
        // '& > :not(style)': means that it applies to all children elements that have no 'style' attribute. so marging 1 x 8px would be applied to all children
        sx={{ '& > :not(style)': { my: 1 } }}
        
        
        autoComplete="off"
      >

<TextField
          fullWidth
          required
          id="firstName"
          label="First Name"
          type='text'
        // defaultValue="Hello World"
        />

<TextField
          fullWidth
          required
          id="lastName"
          label="Last Name"
          type='text'
        // defaultValue="Hello World"
        />

        <TextField
          fullWidth
          required
          id="email"
          label="Email"
          type='email'
        // defaultValue="Hello World"
        />


{/* <DatePicker 
id="dob"
label="Basic date picker" /> */}

<LocalizationProvider dateAdapter={AdapterDayjs}>
      
        <DatePicker   id ="dob" label="Date of Birth" />
  
    </LocalizationProvider>

        <FormControl fullWidth  variant="outlined">

          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
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
          />
        </FormControl>

        <Button variant="outlined">Sign Up</Button>


      </Box>

      {/* </form> */}

      </div>
    </section>
  )
}

export default SignUp