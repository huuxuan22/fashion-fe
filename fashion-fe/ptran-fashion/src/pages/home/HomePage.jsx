import React, { useState } from "react";
import { Box } from "@mui/material";
import Header from "../../layout/Header";
import ProductCategory from "../../component/ProductCategory";
import ShopByCategory from "../../component/ShopByCategory";
import DealsSection from "../../component/DealsSection";
import Footer from "../../layout/Footer";
import FashionGallery from "../../component/FashionGallery";
import ProductGrid from "../../features/ProductGrid";
import Promotion from "../../features/Promotion";
import DashboardLayout from "../../features/DoarchBarLayout";

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
        <div><DashboardLayout/></div>
        <div className="mb-4">
          <ProductCategory />
        </div>
        <div className="mb-5">
          <FashionGallery/>
        </div>
        <div className="mb-5">
          <ShopByCategory />
        </div>
        <div>
          <Promotion/>
        </div>
        <div>
        <DealsSection />
        </div>
        <div className="mb-5">
          <ProductGrid/>
        </div>

        <div className="mb-5">
          <ProductGrid/>
        </div>
        <Footer></Footer>
      </Box>
    </div>
  );
};

export default HomePage;
