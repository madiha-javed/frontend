import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../core/AuthContext';

// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { Button, Stack } from '@mui/material';

const url = "http://localhost:3000/recipes/user/";
const Recipes = () => {
  const {user} = useContext(AuthContext);
  const {login } = useContext(AuthContext);
  console.log("user ID====>"+user.userId);

const navigate = useNavigate();


  //const [students, setStudents] =  useState([]);

  const [ rows, setRows] = useState([]);

  const columns = [
    { field: 'recipe_id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 130 },
    { field: 'description', headerName: 'Description', width: 230, sortable: false, },
    { field: 'category', headerName: 'Category', width: 130 },
    {
      field: 'ratings',
      headerName: 'Ratings', 
      type: 'number',
      width: 90,
    },
    {
      field: 'action',
      headerName: 'Action', 
      width: 280,
      headerAlign:"center",
      renderCell: (params) => (
        <>
        
         <Stack spacing={2} direction="row">
         <Button variant="contained" onClick={() => handleView(params.row)}>View</Button>
        <Button variant="contained" onClick={() => handleEdit(params.row)}>Edit</Button>
        <Button variant="contained" onClick={() => handleDelete(params.row)}>Delete</Button>
        </Stack>
        </>
        
      ),
    }
  ];
  const paginationModel = { page: 0, pageSize: 5 };
  function handleEdit(recipe) {
    console.log(recipe);
    console.log("*** Handle ***");
    navigate('/recipe/edit', { state: { edit: true, recipe_id: recipe.recipe_id, recipe_user:user.userId } });
  }
  const fetchRecipes = async () => {
    try {
        //console.log(user);
        const response = await fetch(url+ user.userId);
        // const response = await fetch(url+ '1');
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
    // login({ 
    //   userId: '6', 
    //   name: 'temp-firstname' + " " + 'last-name' });
    fetchRecipes();
    //testingUser();
    console.log('render');
}, []);

  const handleView = (recipe) => {
    navigate('/recipe/view', { 
      state: { 
        recipe_id: recipe.recipe_id, 
        recipe_user: recipe.user_id 
      } 
    });
  }
  const handleDelete = async (recipe) => {
    console.log("inside DEL function()");
    console.log(recipe);
    if (window.confirm(`'Are you sure you want to delete "${recipe.title} "recipe?`)) {
      try {
        const response = await fetch(`http://localhost:3000/recipes/${recipe.recipe_id}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error('Failed to delete recipe');
        }

        // Remove the deleted recipe from the rows state
        setRows(prevRows => prevRows.filter(row => row.recipe_id !== recipe.recipe_id));
      } catch (error) {
        console.error('Error deleting recipe:', error);
        alert('Failed to delete recipe: ' + error.message);
      }
    }
  };

  return (
    <section  className='page' >

    
      <h2 className='page__title'>All Recipes</h2>
      <div className='page__content'>
   
<Paper sx={{ height: 425, width: '100%' }}>
      <DataGrid
         //getRowId={(row: any) =>  row.first_name + row.salary}
        getRowId={(row) => row.recipe_id} 
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>

        </div>
    </section>
  )
}

export default Recipes