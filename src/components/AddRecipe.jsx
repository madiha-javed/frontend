import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import FormHelperText from '@mui/material/FormHelperText';

const url="http://localhost:3000/users";

const min = 0;
const max = 10;
const AddRecipe = () => {
  // Basic state initialization
  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    portionSize: '',
    preprationTime: '',
    cookingTime: '',
    category: '',
    rating: 0,
    cookingSteps: '',
    notes: '',
    source: ''
  });
  
  // Separate state for ingredients to avoid complex nesting
  const [recipeIngredients, setRecipeIngredients] = useState([
    { name: '', quantity: '', unit: '' }
  ]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  // Fetch available ingredients from backend
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch('http://localhost:3000/ingredients');
        if (response.ok) {
          const data = await response.json();
          setIngredients(data || []);
        }
      } catch (err) {
        console.error('Error fetching ingredients:', err);
      }
    };
    
    fetchIngredients();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRecipe(prev => ({ ...prev, [name]: value }));
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...recipeIngredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setRecipeIngredients(newIngredients);
  };

  const addIngredient = () => {
    setRecipeIngredients([...recipeIngredients, { name: '', quantity: '', unit: '' }]);
  };

  const removeIngredient = (index) => {
    if (recipeIngredients.length > 1) {
      setRecipeIngredients(recipeIngredients.filter((_, i) => i !== index));
    }
  };

  const validateForm = () => {
    if (!recipe.title) {
      setError('Recipe title is required');
      return false;
    }
    
    if (!recipe.portionSize) {
      setError('Portion size is required');
      return false;
    }
    
    if (!recipe.preprationTime) {
      setError('Preparation time is required');
      return false;
    }
    
    if (!recipe.cookingTime) {
      setError('Cooking time is required');
      return false;
    }
    
    if (!recipe.cookingSteps) {
      setError('Cooking steps are required');
      return false;
    }
    
    // Check if at least one ingredient is valid
    const validIngredients = recipeIngredients.filter(
      ing => ing.name && ing.quantity && ing.unit
    );
    
    if (validIngredients.length === 0) {
      setError('At least one complete ingredient is required');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess(false);

    if (!validateForm()) return;

    setLoading(true);
    try {
      // Filter out empty ingredients
      const validIngredients = recipeIngredients.filter(
        ing => ing.name && ing.quantity && ing.unit
      );

      const response = await fetch('http://localhost:3000/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...recipe,
          ingredients: validIngredients
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add recipe');
      }

      setSuccess(true);
      // Reset form
      setRecipe({
        title: '',
        description: '',
        portionSize: '',
        preprationTime: '',
        cookingTime: '',
        category: '',
        rating: 0,
        cookingSteps: '',
        notes: '',
        source: ''
      });
      setRecipeIngredients([{ name: '', quantity: '', unit: '' }]);
    } catch (err) {
      setError(err.message || 'Error adding recipe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <Typography variant="h4" gutterBottom>Add Recipe</Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>Recipe added successfully!</Alert>}
      
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
        <TextField
          fullWidth
          required
          label="Recipe Title"
          name="title"
          value={recipe.title}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={recipe.description}
          onChange={handleInputChange}
          multiline
          rows={2}
          sx={{ mb: 2 }}
        />
        
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <TextField
            required
            label="Portion Size"
            name="portionSize"
            type="number"
            value={recipe.portionSize}
            onChange={handleInputChange}
            inputProps={{ min: 1 }}
          />
          
          <TextField
            required
            label="Preparation Time (min)"
            name="preprationTime"
            type="number"
            value={recipe.preprationTime}
            onChange={handleInputChange}
            inputProps={{ min: 0 }}
          />
          
          <TextField
            required
            label="Cooking Time (min)"
            name="cookingTime"
            type="number"
            value={recipe.cookingTime}
            onChange={handleInputChange}
            inputProps={{ min: 0 }}
          />
        </Stack>
        
        <FormControl sx={{ mb: 2, minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={recipe.category}
            label="Category"
            onChange={handleInputChange}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value="vegan">Vegan</MenuItem>
            <MenuItem value="vegetarian">Vegetarian</MenuItem>
            <MenuItem value="non-vegetarian">Non-Vegetarian</MenuItem>
          </Select>
        </FormControl>
        
        <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
          Ingredients <Typography component="span" color="error">*</Typography>
        </Typography>
        <FormHelperText sx={{ mb: 2 }}>At least one complete ingredient is required</FormHelperText>
        
        {recipeIngredients.map((ing, index) => (
          <Stack key={index} direction="row" spacing={2} sx={{ mb: 2 }}>
            <Autocomplete
              freeSolo
              options={ingredients.map(i => i.name || '')}
              value={ing.name || ''}
              onInputChange={(_, newValue) => handleIngredientChange(index, 'name', newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Ingredient Name"
                  required
                  placeholder="e.g. Flour, Sugar"
                />
              )}
              sx={{ flexGrow: 1 }}
            />
            
            <TextField
              label="Quantity"
              type="number"
              required
              value={ing.quantity}
              onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
              inputProps={{ min: 0, step: 0.1 }}
              sx={{ width: 100 }}
            />
            
            <TextField
              label="Unit"
              required
              value={ing.unit}
              onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
              sx={{ width: 100 }}
              placeholder="e.g. cup, tbsp"
            />
            
            <IconButton 
              onClick={() => removeIngredient(index)}
              disabled={recipeIngredients.length <= 1}
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        ))}
        
        <Button variant="outlined" onClick={addIngredient} sx={{ mb: 3 }}>
          Add Ingredient
        </Button>
        
        <TextField
          fullWidth
          required
          label="Cooking Steps"
          name="cookingSteps"
          value={recipe.cookingSteps}
          onChange={handleInputChange}
          multiline
          rows={4}
          sx={{ mb: 2 }}
          placeholder="Enter step-by-step instructions"
        />
        
        <TextField
          fullWidth
          label="Notes"
          name="notes"
          value={recipe.notes}
          onChange={handleInputChange}
          multiline
          rows={2}
          sx={{ mb: 2 }}
        />
        
        <TextField
          fullWidth
          label="Recipe Source"
          name="source"
          value={recipe.source}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        
        <Box sx={{ mb: 3 }}>
          <Typography component="legend">Rating</Typography>
          <Rating
            name="rating"
            value={Number(recipe.rating)}
            onChange={(_, newValue) => {
              setRecipe(prev => ({ ...prev, rating: newValue }));
            }}
          />
        </Box>
        
        <Button 
          type="submit" 
          variant="contained" 
          disabled={loading}
        >
          {loading ? 'Adding Recipe...' : 'Add Recipe'}
        </Button>
      </Box>
    </section>
  );
};

export default AddRecipe;