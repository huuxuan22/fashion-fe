import React from "react";
import { Grid, Card, CardMedia } from "@mui/material";

const imageData = [
  {
    id: 1,
    src: "https://th.bing.com/th/id/OIP.jD1UnRvsAL8PdCKEQZFOtgHaIB?rs=1&pid=ImgDetMain",
  },
  {
    id: 2,
    src: "https://th.bing.com/th/id/OIP.jD1UnRvsAL8PdCKEQZFOtgHaIB?rs=1&pid=ImgDetMain",
  },
  {
    id: 3,
    src: "https://th.bing.com/th/id/OIP.jD1UnRvsAL8PdCKEQZFOtgHaIB?rs=1&pid=ImgDetMain",
  },
  {
    id: 4,
    src: "https://th.bing.com/th/id/OIP.jD1UnRvsAL8PdCKEQZFOtgHaIB?rs=1&pid=ImgDetMain",
  },
  {
    id: 5,
    src: "https://th.bing.com/th/id/OIP.jD1UnRvsAL8PdCKEQZFOtgHaIB?rs=1&pid=ImgDetMain",
  },
  {
    id: 6,
    src: "https://th.bing.com/th/id/OIP.jD1UnRvsAL8PdCKEQZFOtgHaIB?rs=1&pid=ImgDetMain",
  },
  {
    id: 7,
    src: "https://th.bing.com/th/id/OIP.jD1UnRvsAL8PdCKEQZFOtgHaIB?rs=1&pid=ImgDetMain",
  },
  {
    id: 8,
    src: "https://th.bing.com/th/id/OIP.jD1UnRvsAL8PdCKEQZFOtgHaIB?rs=1&pid=ImgDetMain",
  },
  {
    id: 9,
    src: "https://th.bing.com/th/id/OIP.jD1UnRvsAL8PdCKEQZFOtgHaIB?rs=1&pid=ImgDetMain",
  },
  {
    id: 10,
    src: "https://th.bing.com/th/id/OIP.jD1UnRvsAL8PdCKEQZFOtgHaIB?rs=1&pid=ImgDetMain",
  },
];

const ShopByCategory = () => {
  return (
    <div
      style={{
        width: "calc(100% - 200px)",
        margin: "0 100px",
        padding: "24px 0",
      }}
    >
      <Grid container spacing={7}>
        {imageData.map((item) => (
          <Grid item xs={12} sm={2.4} key={item.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: "50%",
                aspectRatio: "1/1",
                border: "3px solid #008B76", // Đường viền màu #008B76
                boxShadow: "0 0 0 4px rgba(0, 139, 118, 0.3)", // Hiệu ứng shadow bên ngoài
                transition: "all 0.3s ease", // Hiệu ứng chuyển động mượt
                "&:hover": {
                  transform: "scale(1.05)", // Phóng to nhẹ khi hover
                  boxShadow: "0 0 0 6px rgba(0, 139, 118, 0.4)", // Tăng shadow khi hover
                },
                padding: "4px", // Khoảng cách giữa viền và ảnh
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
                image={item.src}
                alt={`Fashion ${item.id}`}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ShopByCategory;