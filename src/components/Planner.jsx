import React, { useState, useEffect } from 'react';



import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';


import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { Button, Stack } from '@mui/material';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {Select, MenuItem} from '@mui/material';


function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

/**
 * Mimic fetch with abort controller https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
 * ⚠️ No IE11 support
 */
function fakeFetch(date, { signal }) {
  console.log("Fake fetch" + date + signal);
  return new Promise((resolve, reject) => {

    const timeout = setTimeout(() => {
      const daysInMonth = date.daysInMonth();
      const daysToHighlight = [1, 2, 3].map(() => getRandomNumber(1, daysInMonth));

      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException('aborted', 'AbortError'));
    };
  });
}

const initialValue = dayjs('2022-04-17');

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? '🌚' : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}
const url = "http://localhost:3000/planner/user/";
const Planner = () => {

  let date = Date();
  const [value, setValue] = useState(dayjs(date));
  const initialDate = dayjs(date).toISOString().split('T')[0]; // Format today's date as yyyy-mm-dd


  const [formFields, setFormFields] = useState({
    //id: '',
    recipe_id: '',
    date: initialDate,
    mealTime: '', // Set initial dob to today's date
    // password: '',
  });
  const [errors, setErrors] = useState({
    recipe_id: '',
    date: '',
    mealTime: ''
  });

  const [rows, setRows] = useState([]);

  const columns = [
    //{ field: 'recipe_id', headerName: 'ID', width: 70 },
    { field: 'date', headerName: 'Date', width: 130, sortable: true, },
    { field: 'title', headerName: 'Title', width: 230 },
    { field: 'meal_time', headerName: 'Meal Time', width: 230, sortable: false, }
  ];
  const paginationModel = { page: 0, pageSize: 10 };

  const [ recipes, setRecipes] = useState(null);
  const fetchRecipes = async () => {
    try {
      //console.log(user);
      //const response = await fetch(url+ user.userId);
      const response = await fetch(url + '1');
      if (!response.ok) {
        throw Error("There was a problem connecting to the database!");
      }
      const result = await response.json();
      // setStudents(students);
      console.log(result);
      setRecipes(result);
      console.log(recipes);
    } catch (error) {
      // setErrors({
      //     ...errors,
      //     error: error.message
      // });
      console.log(error);
    }
  }

  const fetchPlanner = async () => {
    try {
      //console.log(user);
      //const response = await fetch(url+ user.userId);
      const response = await fetch(url + '6');
      if (!response.ok) {
        throw Error("There was a problem connecting to the database!");
      }
      const result = await response.json();
      // setStudents(students);
      console.log(result);
      setRows(result);
    } catch (error) {
      // setErrors({
      //     ...errors,
      //     error: error.message
      // });
      console.log(error);
    }
  }

  
  

  useEffect(() => {
    fetchRecipes();
    fetchPlanner();
    
  }, []);

 


 
  


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
      case 'recipe_id':
        if (!value.trim()) error = 'Recipe is required';
        break;

      case 'mealTime':
        if (!value.trim()) error = 'Meal Time  is required';
        break;
    }

    // Update errors state
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: error
    }));
  };

  const handleInputChange = (event) => {
    console.log(event);
    const { name, value } = event.target;
    console.log(event.target);
    console.log(formFields);
    setFormFields(prev => ({ ...prev, [name]: value }));
    console.log(formFields);
    // Validate field immediately
    // let error = '';
    // switch (name) {
    //     case 'firstName':
    //         if (!value.trim()) error = 'First name is required';
    //         else if (value.length < 2) error = 'First name must be at least 2 characters';
    //         else if (!/^[A-Za-z\s]+$/.test(value)) error = 'First name should only contain letters';
    //         break;

    //     case 'lastName':
    //         if (!value.trim()) error = 'Last name is required';
    //         else if (value.length < 2) error = 'Last name must be at least 2 characters';
    //         else if (!/^[A-Za-z\s]+$/.test(value)) error = 'Last name should only contain letters';
    //         break;

    //     case 'email':
    //         if (!value) error = 'Email is required';
    //         else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email format';
    //         break;

    //     case 'password':
    //         if (!value) error = 'Password is required';
    //         else if (value.length < 8) error = 'Password must be at least 8 characters';
    //         break;
    // }


  };
  const handleDatepicker = (x) => {
    let d = new Date(x);
    const formattedDate = d.toISOString().split('T')[0];
    
    setFormFields(prevFields => ({
        ...prevFields,
        date: formattedDate
    }));

    // Validate date immediately
    setErrors(prevErrors => ({
        ...prevErrors,
        date: formattedDate ? '' : 'Date is required'
    }));
  };
  const validateForm = () => {
    let tempErrors = {
      recipe_id: '',
      date: '',
      mealTime: ''
    };
    let isValid = true;

     

    // Name validation regex - only letters and spaces allowed
   // const nameRegex = /^[A-Za-z\s]+$/;

    // First Name validation
    if (formFields.recipe_id==='') {
      tempErrors.recipe_id = 'Recipe name is required';
      isValid = false;
    } 

    // Last Name validation
    if (formFields.mealTime==='') {
      tempErrors.mealTime = 'Meal name is required';
      isValid = false;
    } 

   
    

    setErrors(tempErrors);
    return isValid;
  };
  const handleSubmit = async (event) => {
    console.log("handleSubmit- start");
    event.preventDefault();
    console.log(formFields);
    
    
    if (validateForm()) {
      console.log("all fields done");
      try {
        const dataToInsert = {
          recipe_id: formFields.recipe_id,
          date: formFields.date,
          meal_time: formFields.mealTime
        };

        const response = await fetch("http://localhost:3000/planner", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToInsert)
        });

        if (!response.ok) {
          throw new Error('Insertion failed');
        }

        // Clear form after successful submission
        setFormFields({
          recipe_id: '',
          date: '',
          mealTime: ''
        });
        
        alert('Insertion successful!');
      } catch (error) {
        alert('Error during insertion: ' + error.message);
      }
    }
  }

  return (
    <>

      <div className='plannerForm'>

        <h2>Planner</h2>
        <Box

          component="form"
          sx={{ '& > :not(style)': { m: 2 } }}


          autoComplete="off"
          onSubmit={handleSubmit}
          noValidate
        >

<LocalizationProvider dateAdapter={AdapterDayjs}>

            {/* <DatePicker   value={value} label="Date of Birth"  onChange={(newValue) => setValue(newValue)}/> */}
            <DatePicker value={value} label="Date" onChange={(newValue) => handleDatepicker(newValue)}
              slotProps={{
                textField: {
                  error: !!errors.dob,
                  helperText: errors.dob
                }
              }}
            />


          </LocalizationProvider>
        
          
<FormControl sx={{ mb: 2, minWidth: 200 }} error={!!errors.recipe_id}>
          <InputLabel>Recipe</InputLabel>
          <Select
            required
            id="recipe_id"
            value={formFields.recipe_id} 
            name="recipe_id" label="Select Recipe"
            onChange={handleInputChange}
            error={!!errors.recipe_id}
          
          >
         
            { recipes && recipes.map(row=>
                  <MenuItem key={row.id} value={row.id}>{row.title}</MenuItem>

                  
                    )}

          </Select>
          {errors.recipe_id && <FormHelperText>{errors.recipe_id}</FormHelperText>}
        </FormControl>

        <FormControl sx={{ mb: 2, minWidth: 200 }} error={!!errors.mealTime}>
          <InputLabel>Meal Time</InputLabel>
          <Select
            id="mealTime"
            value={formFields.mealTime} 
            name="mealTime" label="Meal Time"
            onChange={handleInputChange}
            
          >
            <MenuItem value=""><em>None</em></MenuItem>

            <MenuItem value="breakfast">Breakfast</MenuItem>
            <MenuItem value="lunch">Lunch</MenuItem>
            <MenuItem value="dinner">Dinner</MenuItem>
          </Select>
          {errors.mealTime && <FormHelperText>{errors.mealTime}</FormHelperText>}
        </FormControl>

          


          <Button variant="outlined" type='submit'>Add</Button>


        </Box>

        {/* </form> */}

      </div>

      {/* datagrid */}
      <div>
        <Paper sx={{ height: 400, width: '100%' }}>
          <DataGrid
            //getRowId={(row: any) =>  row.first_name + row.salary}
            getRowId={(row) => row.id}
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            // checkboxSelection
            sx={{ border: 0 }}
          />
        </Paper>
      </div>
    </>
  );
}
export default Planner