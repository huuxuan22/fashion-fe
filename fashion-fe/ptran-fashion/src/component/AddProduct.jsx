import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  MenuItem,
  Paper,
  Avatar,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton
} from '@mui/material';
import { CloudUpload, Cancel, Delete } from '@mui/icons-material';

// Validation schema
const productSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  mrpPrice: yup
    .number()
    .typeError('MRP must be a number')
    .positive('MRP must be positive')
    .required('MRP is required'),
  sellingPrice: yup
    .number()
    .typeError('Selling price must be a number')
    .positive('Selling price must be positive')
    .required('Selling price is required'),
  category: yup.string().required('Category is required'),
  secondCategory: yup.string(),
  thirdCategory: yup.string(),
});

// Color options
const colorOptions = [
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
  { value: 'black', label: 'Black' },
  { value: 'white', label: 'White' },
];

// Size options
const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const AddProduct = () => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [variants, setVariants] = useState([]);
  const [currentVariant, setCurrentVariant] = useState({
    color: '',
    size: '',
    quantity: 1
  });
  
  const fileInputRef = useRef();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newPreviews = [];
      
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result);
          if (newPreviews.length === files.length) {
            setImagePreviews(prev => [...prev, ...newPreviews]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleVariantChange = (e) => {
    const { name, value } = e.target;
    setCurrentVariant(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 0 : value
    }));
  };

  const addVariant = () => {
    if (!currentVariant.color || !currentVariant.size || currentVariant.quantity <= 0) {
      return;
    }
    
    const variantExists = variants.some(
      v => v.color === currentVariant.color && v.size === currentVariant.size
    );
    
    if (!variantExists) {
      setVariants(prev => [...prev, currentVariant]);
      setCurrentVariant({
        color: '',
        size: '',
        quantity: 1
      });
    }
  };

  const removeVariant = (index) => {
    setVariants(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (data) => {
    if (variants.length === 0) {
      alert('Please add at least one variant');
      return;
    }
    
    const productData = {
      ...data,
      variants,
      images: imagePreviews
    };
    
    console.log('Product data:', productData);
    // Handle form submission here
  };

  // Teal color theme
  const tealColor = '#007160';
  const hoverTealColor = '#005a4a';

  return (
    <Box component={Paper} sx={{ maxWidth: 'md', mx: 'auto', p: 4, boxShadow: 3 }}>
      <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: tealColor }}>
        Add New Product
      </Typography>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Image Upload */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, color: 'text.secondary' }}>
            Product Images *
          </Typography>
          
          {/* Image Previews */}
          <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', mb: 2 }}>
            {imagePreviews.map((preview, index) => (
              <Box key={index} sx={{ position: 'relative' }}>
                <Avatar
                  src={preview}
                  variant="rounded"
                  sx={{ 
                    width: 100, 
                    height: 100,
                    border: `1px solid ${tealColor}` 
                  }}
                />
                <Chip
                  icon={<Cancel />}
                  size="small"
                  onClick={() => removeImage(index)}
                  sx={{
                    position: 'absolute',
                    top: -10,
                    right: -10,
                    backgroundColor: 'error.main',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'error.dark'
                    }
                  }}
                />
              </Box>
            ))}
          </Stack>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            multiple
            style={{ display: 'none' }}
          />
          <Button
            variant="outlined"
            startIcon={<CloudUpload />}
            onClick={() => fileInputRef.current?.click()}
            sx={{ 
              color: tealColor,
              borderColor: tealColor,
              '&:hover': {
                borderColor: hoverTealColor,
                backgroundColor: 'rgba(0, 113, 96, 0.04)'
              }
            }}
          >
            Upload Images (Multiple)
          </Button>
          {imagePreviews.length === 0 && (
            <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>
              Please upload at least one image
            </Typography>
          )}
        </Box>

        {/* Title */}
        <TextField
          label="Title *"
          fullWidth
          margin="normal"
          {...register('title')}
          error={!!errors.title}
          helperText={errors.title?.message}
          sx={{
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: tealColor,
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: tealColor,
            }
          }}
        />

        {/* Description */}
        <TextField
          label="Description *"
          fullWidth
          margin="normal"
          multiline
          rows={3}
          {...register('description')}
          error={!!errors.description}
          helperText={errors.description?.message}
          sx={{
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: tealColor,
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: tealColor,
            }
          }}
        />

        {/* Price Row */}
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {/* MRP Price */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="MRP Price *"
              fullWidth
              margin="normal"
              type="number"
              {...register('mrpPrice')}
              error={!!errors.mrpPrice}
              helperText={errors.mrpPrice?.message}
              sx={{
                '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: tealColor,
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: tealColor,
                }
              }}
            />
          </Grid>

          {/* Selling Price */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Selling Price *"
              fullWidth
              margin="normal"
              type="number"
              {...register('sellingPrice')}
              error={!!errors.sellingPrice}
              helperText={errors.sellingPrice?.message}
              sx={{
                '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: tealColor,
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: tealColor,
                }
              }}
            />
          </Grid>
        </Grid>

        {/* Variants Section */}
        <Box sx={{ mt: 3, mb: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 2, color: 'text.secondary' }}>
            Product Variants *
          </Typography>
          
          <Grid container spacing={2}>
            {/* Color */}
            <Grid item xs={12} sm={4}>
              <TextField
                select
                label="Color *"
                fullWidth
                value={currentVariant.color}
                onChange={handleVariantChange}
                name="color"
              >
                <MenuItem value="">Select color</MenuItem>
                {colorOptions.map(color => (
                  <MenuItem key={color.value} value={color.value}>
                    {color.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            
            {/* Size */}
            <Grid item xs={12} sm={3}>
              <TextField
                select
                label="Size *"
                fullWidth
                value={currentVariant.size}
                onChange={handleVariantChange}
                name="size"
              >
                <MenuItem value="">Select size</MenuItem>
                {sizeOptions.map(size => (
                  <MenuItem key={size} value={size}>{size}</MenuItem>
                ))}
              </TextField>
            </Grid>
            
            {/* Quantity */}
            <Grid item xs={12} sm={3}>
              <TextField
                label="Quantity *"
                fullWidth
                type="number"
                value={currentVariant.quantity}
                onChange={handleVariantChange}
                name="quantity"
                inputProps={{ min: 1 }}
              />
            </Grid>
            
            {/* Add Button */}
            <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                variant="contained"
                onClick={addVariant}
                sx={{
                  backgroundColor: tealColor,
                  '&:hover': {
                    backgroundColor: hoverTealColor,
                  },
                  height: '56px', // Match text field height
                  width: '100%'
                }}
              >
                Add
              </Button>
            </Grid>
          </Grid>
          
          {/* Variants Table */}
          {variants.length > 0 && (
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Color</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {variants.map((variant, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {colorOptions.find(c => c.value === variant.color)?.label || variant.color}
                      </TableCell>
                      <TableCell>{variant.size}</TableCell>
                      <TableCell>{variant.quantity}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => removeVariant(index)}>
                          <Delete color="error" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>

        {/* Categories */}
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {/* Category */}
          <Grid item xs={12} md={4}>
            <TextField
              select
              label="Category *"
              fullWidth
              margin="normal"
              {...register('category')}
              error={!!errors.category}
              helperText={errors.category?.message}
              sx={{
                '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: tealColor,
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: tealColor,
                }
              }}
            >
              <MenuItem value="">Select category</MenuItem>
              <MenuItem value="clothing">Clothing</MenuItem>
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="home">Home</MenuItem>
            </TextField>
          </Grid>

          {/* Second Category */}
          <Grid item xs={12} md={4}>
            <TextField
              select
              label="Second Category"
              fullWidth
              margin="normal"
              {...register('secondCategory')}
              sx={{
                '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: tealColor,
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: tealColor,
                }
              }}
            >
              <MenuItem value="">Optional</MenuItem>
              <MenuItem value="men">Men</MenuItem>
              <MenuItem value="women">Women</MenuItem>
              <MenuItem value="kids">Kids</MenuItem>
            </TextField>
          </Grid>

          {/* Third Category */}
          <Grid item xs={12} md={4}>
            <TextField
              select
              label="Third Category"
              fullWidth
              margin="normal"
              {...register('thirdCategory')}
              sx={{
                '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: tealColor,
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: tealColor,
                }
              }}
            >
              <MenuItem value="">Optional</MenuItem>
              <MenuItem value="shirts">Shirts</MenuItem>
              <MenuItem value="pants">Pants</MenuItem>
              <MenuItem value="shoes">Shoes</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        {/* Submit Button */}
        <Box sx={{ mt: 4 }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={imagePreviews.length === 0 || variants.length === 0}
            sx={{ 
              py: 1.5,
              backgroundColor: tealColor,
              '&:hover': {
                backgroundColor: hoverTealColor,
              },
              '&:disabled': {
                backgroundColor: 'grey.400'
              }
            }}
          >
            ADD PRODUCT
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddProduct;