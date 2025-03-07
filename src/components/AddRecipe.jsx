import React,{useState} from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';



const min = 0;
const max = 10;
const AddRecipe = () => {
  const [value, setValue] = useState(0);
  return (
    <section>
      <h2>Add Recipe</h2>

      <Box
        component="form"
        // '& > :not(style)': means that it applies to all children elements that have no 'style' attribute. so marging 1 x 8px would be applied to all children
        sx={{ '& > :not(style)': { my: 1 } }}


        autoComplete="off"
      >

        <TextField
        sx={ { m: 1, width: '60ch' } }
          fullWidth
          required
          id="titel"
          label="Titel" />

        <TextField 
        sx={ { m: 1, width: '120ch' } }
        fullWidth id="description" label="Description" />
       
        
        <TextField
          sx={ { m: 1, width: '25ch' } }
           id="portionSize"
          label="Portion Size"    
          type="number"
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">min</InputAdornment>,
            },
          }}
          
          inputProps={{ min, max }}
       
        defaultValue={value}
        //parseInt(string, radix)
        onChange={(e) => {
          var value = parseInt(e.target.value, 10);

          if (value > max) value = max;
          if (value < min) value = min;

          setValue(value);
        }}
          
        />
                <TextField
          sx={ { m: 1, width: '25ch' } }
           id="preprationTime"
          label="Prepration Time"    
          type="number"
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">min</InputAdornment>,
            },
          }}
          
          inputProps={{ min, max }}
       
        defaultValue={value}
        //parseInt(string, radix)
        onChange={(e) => {
          var value = parseInt(e.target.value, 10);

          if (value > max) value = max;
          if (value < min) value = min;

          setValue(value);
        }}
          
        />
        <TextField
          sx={ { m: 1, width: '25ch' } }
           id="cookingTime"
          label="Cooking Time"    
          type="number"
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">min</InputAdornment>,
            },
          }}
          
          inputProps={{ min, max }}
       
        defaultValue={value}
        //parseInt(string, radix)
        onChange={(e) => {
          var value = parseInt(e.target.value, 10);

          if (value > max) value = max;
          if (value < min) value = min;

          setValue(value);
        }}
          
        />

<TextField
        type="number"
        inputProps={{ min, max }}
        value={value}
        onChange={(e) => {
          var value = parseInt(e.target.value, 10);

          if (value > max) value = max;
          if (value < min) value = min;

          setValue(value);
        }}
      />



<TextField fullWidth
          id="cookingSteps"
          label="Steps"
          multiline
          rows={8}
         
        />

<TextField 
          id="notes"
          label="Notes"
          multiline
          maxRows={2}
         
        />
 <TextField 
        sx={ { m: 1, width: '120ch' } }
         id="source" label="Recipe Source" />

        <Button variant="outlined">Add Recipe</Button>


      </Box>



    </section>
  )
}

export default AddRecipe