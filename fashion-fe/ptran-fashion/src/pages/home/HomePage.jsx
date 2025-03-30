import React, { useState } from "react";
import { Box } from "@mui/material";
import Header from "../../layout/Header";
import ProductCategory from "../../component/ProductCategory";
import ShopByCategory from "../../component/ShopByCategory";
import DealsSection from "../../component/DealsSection";
import Footer from "../../layout/Footer";

const HomePage = () => {
    const [showFooter, setShowFooter] = useState(true);
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Header></Header>
        <div className="mb-4">
          <ProductCategory />
        </div>
        <div className="mb-5">
          <ShopByCategory />
        </div>
        <DealsSection />
        <Footer></Footer>
      </Box>
    </div>
  );
};

export default HomePage;
