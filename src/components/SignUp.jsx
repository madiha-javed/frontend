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






const url = "http://localhost:3000/users";

const SignUp = () => {
  let date = Date();
  const [value, setValue] = useState(dayjs(date));
  const initialDate = dayjs(date).toISOString().split('T')[0]; // Format today's date as yyyy-mm-dd

  const [formFields, setFormFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: initialDate, // Set initial dob to today's date
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
  const handleDatepicker = (x) => {
    let d = new Date(x);
    const formattedDate = d.toISOString().split('T')[0];

    setFormFields(prevFields => ({
      ...prevFields,
      dob: formattedDate
    }));

    // Validate date immediately
    setErrors(prevErrors => ({
      ...prevErrors,
      dob: formattedDate ? '' : 'Date of birth is required'
    }));
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    // Update form fields
    setFormFields(prevFields => ({
      ...prevFields,
      [name]: value
    }));

    // Validate field immediately
    let error = '';
    switch (name) {
      case 'firstName':
        if (!value.trim()) error = 'First name is required';
        else if (value.length < 2) error = 'First name must be at least 2 characters';
        else if (!/^[A-Za-z\s]+$/.test(value)) error = 'First name should only contain letters';
        break;

      case 'lastName':
        if (!value.trim()) error = 'Last name is required';
        else if (value.length < 2) error = 'Last name must be at least 2 characters';
        else if (!/^[A-Za-z\s]+$/.test(value)) error = 'Last name should only contain letters';
        break;

      case 'email':
        if (!value) error = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email format';
        break;

      case 'password':
        if (!value) error = 'Password is required';
        else if (value.length < 8) error = 'Password must be at least 8 characters';
        break;
    }

    // Update errors state
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: error
    }));
  };

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    password: '',
  });

  const validateForm = () => {
    let tempErrors = {
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      password: '',
    };
    let isValid = true;

    // Name validation regex - only letters and spaces allowed
    const nameRegex = /^[A-Za-z\s]+$/;

    // First Name validation
    if (!formFields.firstName.trim()) {
      tempErrors.firstName = 'First name is required';
      isValid = false;
    } else if (formFields.firstName.length < 2) {
      tempErrors.firstName = 'First name must be at least 2 characters';
      isValid = false;
    } else if (!nameRegex.test(formFields.firstName)) {
      tempErrors.firstName = 'First name should only contain letters';
      isValid = false;
    }

    // Last Name validation
    if (!formFields.lastName.trim()) {
      tempErrors.lastName = 'Last name is required';
      isValid = false;
    } else if (formFields.lastName.length < 2) {
      tempErrors.lastName = 'Last name must be at least 2 characters';
      isValid = false;
    } else if (!nameRegex.test(formFields.lastName)) {
      tempErrors.lastName = 'Last name should only contain letters';
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formFields.email) {
      tempErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formFields.email)) {
      tempErrors.email = 'Invalid email format';
      isValid = false;
    }

    // Date of Birth validation
    if (!formFields.dob) {
      tempErrors.dob = 'Date of birth is required';
      isValid = false;
    }

    // Password validation
    if (!formFields.password) {
      tempErrors.password = 'Password is required';
      isValid = false;
    } else if (formFields.password.length < 8) {
      tempErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        const dataToInsert = {
          first_name: formFields.firstName,
          last_name: formFields.lastName,
          email: formFields.email,
          birth_date: formFields.dob,
          password: formFields.password
        };

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToInsert)
        });

        if (!response.ok) {
          throw new Error('Signup failed');
        }

        // Clear form after successful submission
        setFormFields({
          firstName: '',
          lastName: '',
          email: '',
          dob: '',
          password: '',
        });

        alert('Signup successful!');
      } catch (error) {
        alert('Error during signup: ' + error.message);
      }
    }
  };


  return (


    <section className='page' >
      <h2 className='page__title'>Sign Up Here!</h2>
      <div className='page__content'>
        <div className='page__content__form'>
          <Box

            component="form"
            // '& > :not(style)': means that it applies to all children elements that have no 'style' attribute. so marging 1 x 8px would be applied to all children
            sx={{ '& > :not(style)': { my: 1 } }}


            autoComplete="off"
            onSubmit={handleSubmit}
            noValidate
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
              value={formFields.firstName}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />

            <TextField
              fullWidth
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              type='text'
              onChange={handleChange}
              value={formFields.lastName}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />

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
            />


<FormControl fullWidth >
            <LocalizationProvider dateAdapter={AdapterDayjs}>

              {/* <DatePicker   value={value} label="Date of Birth"  onChange={(newValue) => setValue(newValue)}/> */}
              <DatePicker  value={value} label="Date of Birth" onChange={(newValue) => handleDatepicker(newValue)}
                slotProps={{
                  textField: {
                    error: !!errors.dob,
                    helperText: errors.dob
                  }
                }}
              />


            </LocalizationProvider>
            </FormControl>

            <FormControl fullWidth variant="outlined" error={!!errors.password}>

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
              {errors.password && <FormHelperText>{errors.password}</FormHelperText>}
            </FormControl>

            <Button variant="outlined" type='submit' sx={{ mt: 2 }}>Sign Up</Button>


          </Box>

          {/* </form> */}
        </div>
      </div>
    </section>
  )
}

export default SignUp