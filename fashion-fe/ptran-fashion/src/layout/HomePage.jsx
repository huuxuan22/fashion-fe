import React, { useState } from "react";
import ShopByCategory from "../component/ShopByCategory";
import ProductCategory from "../component/ProductCategory";
import DealsSection from "../component/DealsSection";
import Footer from "./Footer";
import Header from "./Header";
import { Box } from "@mui/material";

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
