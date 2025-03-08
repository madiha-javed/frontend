import * as React from 'react';
import { useState } from "react";

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
import dayjs from 'dayjs';






const url="http://localhost:3000/users";

const SignUp = () => {
  let date = Date();
  const [value,setValue]=useState(dayjs(date));
  console.log(value);
  
  const [ formFields, setFormFields ] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    password: '',
});

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  // const handleSubmit = (event) => {
  //   console.log("test2");
  // }
  const handleDatepicker=(x) =>{
    let d = new Date(x);
    const formattedDate = d.toISOString().split('T')[0]; // Formats to yyyy-mm-dd
    console.log("formatted date:", formattedDate);
    
    setFormFields({
        ...formFields,
        dob: formattedDate 
    });
  }
  const handleChange = (event) => {
    // destructuring
    console.log(event);
    console.log(event.target);
    const { name, value } = event.target;
    // const name = event.target.name;
    // const value = event.target.value;

      console.log(formFields);

        setFormFields({
            ...formFields,
            [name]: value
        });
        console.log("after");
        console.log(formFields);

    
}

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("handlesubmit funciton");
    console.log(formFields);
    // if (error===false)
    // let isThereErrors=false;
    // for (let property in errors) {
    //     if (errors[property]!=="") {
    //         isThereErrors=true;
    //     }
    // }
    // // if (!error) {
    // if (!isThereErrors) {
    //     if (formFields.gender==="O" && formFields.otherGender==="") {
    //         alert("You need to select or specify a gender!");
    //     } else {
    //         const dataToInsert={
    //             first_name: formFields.firstName,
    //             last_name: formFields.lastName,
    //             email: formFields.email,
    //             birth_date: formFields.dob,
    //             password: formFields.password
    //         }
    //         onSubmitForm(dataToInsert);
    //     }
    // } else {
    //     alert("There are still some errors.")
    // }
}
 

  return (
    <section className="signup">

    <div className='SignUpForm'>

      <h2>Sign Up Page</h2>
      <Box 
      
         component="form"
        // '& > :not(style)': means that it applies to all children elements that have no 'style' attribute. so marging 1 x 8px would be applied to all children
        sx={{ '& > :not(style)': { my: 1 } }}
        
        
        autoComplete="off"
        onSubmit={handleSubmit}
      >

<TextField
          fullWidth
          required
          id="firstName"
          name="firstName"
          // value={formFields.firstName}
          label="First Name"
          type='text'
         onChange={handleChange}
        />

<TextField
          fullWidth
          required
          id="lastName"
          name="lastName"
          label="Last Name"
          type='text'
          onChange={handleChange}
        />

        <TextField
          fullWidth
          required
          id="email"
          name="email"
          label="Email"
          type='email'
          onChange={handleChange}
        />



<LocalizationProvider dateAdapter={AdapterDayjs}>
      
        {/* <DatePicker   value={value} label="Date of Birth"  onChange={(newValue) => setValue(newValue)}/> */}
        <DatePicker   value={value} label="Date of Birth"  onChange={(newValue) => handleDatepicker(newValue)}/>

  
    </LocalizationProvider>

        <FormControl fullWidth  variant="outlined">

          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            onChange={handleChange}
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

        <Button variant="outlined" type='submit'>Sign Up</Button>
        

      </Box>

      {/* </form> */}

      </div>
    </section>
  )
}

export default SignUp