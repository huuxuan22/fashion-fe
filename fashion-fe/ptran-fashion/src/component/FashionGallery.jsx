import React from "react";
import { Grid, Card, CardMedia } from "@mui/material";

const imageData = [
  { id: 1, src: "https://th.bing.com/th/id/OIP.jD1UnRvsAL8PdCKEQZFOtgHaIB?rs=1&pid=ImgDetMain", cols: 2 }, // Ảnh lớn
  { id: 2, src: "https://th.bing.com/th/id/OIP.jD1UnRvsAL8PdCKEQZFOtgHaIB?rs=1&pid=ImgDetMain", cols: 1 },
  { id: 3, src: "https://th.bing.com/th/id/OIP.jD1UnRvsAL8PdCKEQZFOtgHaIB?rs=1&pid=ImgDetMain", cols: 1 },
  { id: 4, src: "https://th.bing.com/th/id/OIP.jD1UnRvsAL8PdCKEQZFOtgHaIB?rs=1&pid=ImgDetMain", cols: 1 },
  { id: 5, src: "https://th.bing.com/th/id/OIP.jD1UnRvsAL8PdCKEQZFOtgHaIB?rs=1&pid=ImgDetMain", cols: 1 },
  { id: 6, src: "https://th.bing.com/th/id/OIP.jD1UnRvsAL8PdCKEQZFOtgHaIB?rs=1&pid=ImgDetMain", cols: 1 },
];

const FashionGallery = () => {
  return (
    <div className="w-full max-w-6xl mx-auto py-6">
      <Grid container spacing={2}>
        {imageData.map((item) => (
          <Grid item xs={12} sm={item.cols === 2 ? 6 : 3} key={item.id}>
            <Card className="shadow-md rounded-lg overflow-hidden">
              <CardMedia
                component="img"
                height="100%"
                image={item.src}
                alt={`Fashion ${item.id}`}
                className="object-cover"
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default FashionGallery;
