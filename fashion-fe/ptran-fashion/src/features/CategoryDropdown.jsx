import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as categoryService from "./../service/category-service";

const CategoryDropdown = ({ categories, onClose }) => {
  const [subCategory, setSubCategory] = useState([]);
  const [selectCateId, setSelectCateId] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const loadSubCategory = async (categoryId) => {
    try {
      const data = await categoryService.getAllSubCateByCateId(
        token,
        categoryId
      );
      setSubCategory(data.data);
    } catch (error) {
      console.error("Failed to load subcategories:", error);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setSelectCateId(categoryId);
    loadSubCategory(categoryId);
  };

  console.log(subCategory);
  

  return (
    <Box
      sx={{
        p: 4,
        width: "100%",
        backgroundColor: "#dce4dc", // Xám xanh
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(87, 142, 60, 0.1)",
      }}
    >
      {/* Main Categories */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
          gap: 2,
        }}
      >
        {categories.map((category) => (
          <Box
            key={category.categorieId}
            onClick={() => handleCategoryClick(category.categorieId)}
            sx={{
              cursor: "pointer",
              padding: "12px 16px",
              borderRadius: "6px",
              backgroundColor: "#fff",
              border: `2px solid ${
                selectCateId === category.categorieId ? "#578e3c" : "#dce4dc"
              }`,
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              gap: 1,
              "&:hover": {
                backgroundColor: "#f3f7f1",
                transform: "translateY(-2px)",
                boxShadow: "0 2px 8px rgba(87, 142, 60, 0.1)",
              },
            }}
          >
            <img
              src={category.thumbnail}
              alt={category.categoriesName}
              style={{
                width: 24,
                height: 24,
                objectFit: "contain",
              }}
            />
            <Typography
              sx={{
                fontSize: "1.05rem",
                color: "#578e3c",
                fontWeight: 600,
                fontFamily: "'Poppins', sans-serif", // hoặc 'Inter'
                letterSpacing: "0.3px",
              }}
            >
              {category.categoriesName}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Sub Categories */}
      {subCategory.length > 0 && (
        <Box
          sx={{
            mt: 4,
            animation: "fadeIn 0.4s ease-out",
            "@keyframes fadeIn": {
              "0%": { opacity: 0, transform: "translateY(10px)" },
              "100%": { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              fontWeight: 600,
              color: "#578e3c",
              fontFamily: "sans-serif",
              fontSize: "1.25rem",
              position: "relative",
              display: "inline-block",
              "&:after": {
                content: '""',
                position: "absolute",
                bottom: "-8px",
                left: 0,
                width: "50%",
                height: "3px",
                backgroundColor: "#578e3c",
                borderRadius: "3px",
              },
            }}
          >
            Danh mục con
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              "& > *": {
                flex: "1 1 calc(20% - 16px)",
                minWidth: "120px",
              },
            }}
          >
            {subCategory.map((sub) => (
              <Box
                key={sub.subCategoryId}
                onClick={() => {
                  navigate(`/product-page?subcategoryId=${sub.subCategoryId}`,);
                  if (onClose) onClose();
                }}
                sx={{
                  padding: "10px 16px",
                  backgroundColor: "#fff",
                  borderRadius: "6px",
                  cursor: "pointer",
                  border: "2px solid #578e3c",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#f3f7f1",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 8px rgba(87, 142, 60, 0.15)",
                  },
                }}
              >
                <Typography
                  sx={{
                    color: "#578e3c",
                    color: "#578e3c",
                    fontWeight: 600,
                    fontFamily: "'Poppins', sans-serif",
                    textAlign: "center",
                  }}
                >
                  {sub.subCategoryName}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CategoryDropdown;
