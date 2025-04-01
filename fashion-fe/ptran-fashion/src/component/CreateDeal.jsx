import React, { useState } from "react";
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Box } from "@mui/material";

const CreateDeal = () => {
  const [discount, setDiscount] = useState(0);
  const [category, setCategory] = useState("");
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Deal Created:", { discount, category });
  };
  
  return (
    <Box sx={{ maxWidth: 400, margin: "auto", padding: 3, textAlign: "center" }}>
      <h2 style={{ color: "#008772" }}>Create Deal</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          type="number"
          label="Discount"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          margin="normal"
          sx={{ "& label.Mui-focused": { color: "#008772" }, "& .MuiOutlinedInput-root": { "&.Mui-focused fieldset": { borderColor: "#008772" } } }}
        />
        <FormControl fullWidth margin="normal" sx={{ "& label.Mui-focused": { color: "#008772" }, "& .MuiOutlinedInput-root": { "&.Mui-focused fieldset": { borderColor: "#008772" } } }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="women_skirts_palazzos">Women Skirts & Palazzos</MenuItem>
            <MenuItem value="men_t_shirts">Men T-Shirts</MenuItem>
            <MenuItem value="men_formal_shirts">Men Formal Shirts</MenuItem>
          </Select>
        </FormControl>
        <Button 
          type="submit" 
          variant="contained" 
          fullWidth
          sx={{ mt: 2, backgroundColor: "#008772", "&:hover": { backgroundColor: "#006a5d" } }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default CreateDeal;
