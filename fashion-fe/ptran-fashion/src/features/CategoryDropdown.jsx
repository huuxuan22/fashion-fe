import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  List, 
  ListItem, 
  ListItemText,
  Collapse,
  Button
} from '@mui/material';

const CategoryDropdown = ({ onClose }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const categories = {
    "Indian & Italian Wear": [
      "Nurtis & Suts",
      "Nurtis, Tunes & Tops",
      "Sevo",
      "Ethnic Wear",
      "Leggings, Silvens & Churches",
      "Skirts & Pistzzos",
      "Dress Materials",
      "Leitenga Cholis",
      "Dupertas & Sharks",
      "Jadwes",
      "Betts, Sonnets & More",
      "Witches & Wearables"
    ],
    "Western Wear": [
      "Western Wear",
      "Orestes",
      "Tops",
      "Tjants",
      "jaws",
      "Trousers & Cajins",
      "Shorts & Skirts",
      "Goards",
      "Playlists",
      "Jarrejuits",
      "Shrugs",
      "Seasons & Sweetshirts",
      "Jadwes & Coles"
    ],
    "Footwear": [
      "Footwear",
      "Rats",
      "Casual Shoes",
      "Heels",
      "Boots",
      "Sports Shoes & Floaters"
    ],
    "Sports & Active Wear": [
      "Sports & Active Wear",
      "Clothing",
      "Footwear",
      "Sports Accessories",
      "Sports Equipment"
    ],
    "Lingents Steepwear": [
      "Lingens & Sleepwear",
      "Bra",
      "Briefs",
      "Shadowcar",
      "Speedwear & Loungewear",
      "Swimwear",
      "Camtoiles & Thermists"
    ]
  };

  const handleCategoryClick = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <Box sx={{ p: 3 }} onMouseLeave={onClose}>
      <Grid container spacing={4}>
        {Object.keys(categories).map((category) => (
          <Grid item xs={12} md={3} key={category}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 'bold', 
                mb: 1,
                cursor: 'pointer',
                '&:hover': {
                  color: 'primary.main'
                }
              }}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </Typography>
            
            <Collapse in={expandedCategory === category}>
              <List dense>
                {categories[category].map((item) => (
                  <ListItem key={item} sx={{ py: 0, px: 0 }}>
                    <ListItemText 
                      primary={item} 
                      sx={{
                        '& .MuiTypography-root': {
                          fontSize: '0.875rem',
                          '&:hover': {
                            color: 'primary.main'
                          }
                        }
                      }} 
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </Grid>
        ))}
      </Grid>
      
    </Box>
  );
};

export default CategoryDropdown;