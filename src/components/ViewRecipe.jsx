import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Divider, 
  List, 
  ListItem, 
  ListItemText,
  Rating,
  Chip,
  Alert
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CategoryIcon from '@mui/icons-material/Category';
import AuthContext from '../core/AuthContext';

const ViewRecipe = () => {

  const {user} = useContext(AuthContext);
  const {login } = useContext(AuthContext);

  console.log("user ID====View Recipe ====>"+user.userId);
  const location = useLocation();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        if (!location.state?.recipe_id) {
          throw new Error('No recipe ID provided');
        }

        const response = await fetch(`http://localhost:3000/recipes/${location.state.recipe_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipe');
        }

        const data = await response.json();
        setRecipe(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [location.state]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!recipe) {
    return <Alert severity="info">Recipe not found</Alert>;
  }

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        {/* Title and Rating */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            {recipe.title}
          </Typography>
          <Rating value={recipe.ratings || 0} readOnly />
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Quick Info */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccessTimeIcon />
              <Typography>
                Prep: {recipe.prepration_time} min | Cook: {recipe.cooking_time} min
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <RestaurantIcon />
              <Typography>Serves: {recipe.portion_size}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CategoryIcon />
              <Chip label={recipe.category || 'Uncategorized'} />
            </Box>
          </Grid>
        </Grid>

        {/* Description */}
        {recipe.description && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>Description</Typography>
            <Typography>{recipe.description}</Typography>
          </Box>
        )}

        <Divider sx={{ mb: 3 }} />

        {/* Ingredients */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>Ingredients</Typography>
          <List>
            {recipe.ingredients?.map((ingredient, index) => (
              <ListItem key={index}>
                <ListItemText>
                  • {ingredient.quantity} {ingredient.unit} {ingredient.name}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Cooking Steps */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>Instructions</Typography>
          <Typography sx={{ whiteSpace: 'pre-line' }}>
            {recipe.steps}
          </Typography>
        </Box>

        {/* Notes */}
        {recipe.notes && (
          <>
            <Divider sx={{ mb: 3 }} />
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>Notes</Typography>
              <Typography>{recipe.notes}</Typography>
            </Box>
          </>
        )}

        {/* Source */}
        {recipe.source && (
          <>
            <Divider sx={{ mb: 3 }} />
            <Box>
              <Typography variant="h6" gutterBottom>Source</Typography>
              <Typography>{recipe.source}</Typography>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default ViewRecipe;