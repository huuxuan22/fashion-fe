import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Checkbox,
  FormControlLabel,
  Divider,
  Chip
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

export default function ClothingCard({product}) {

  return (
    <Card sx={{ maxWidth: 300, m: 1 }}>
      <CardMedia
        component="img"
        height="200"
        image={product?.imageUrl}
        alt={product?.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product?.brand}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product?.name}
        </Typography>
        <Typography variant="h6" sx={{ mt: 1 }}>
          {product?.price}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <StarIcon color="primary" fontSize="small" />
          <StarIcon color="primary" fontSize="small" />
          <StarIcon color="primary" fontSize="small" />
          <StarIcon color="primary" fontSize="small" />
          <StarIcon color="primary" fontSize="small" />
          <Typography variant="caption" sx={{ ml: 1 }}>
            {product?.ratingCount}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" fullWidth>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
