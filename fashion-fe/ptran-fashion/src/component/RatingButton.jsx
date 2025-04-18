import { Box, Typography } from "@mui/material";
import { Button } from "bootstrap";

const RatingButton = ({ star, count, active, onClick }) => (
    <Button
      variant="outlined"
      size="small"
      disabled={!active}
      onClick={() => active && onClick(star)}
      sx={{
        minWidth: 0,
        px: 1.5,
        py: 0.5,
        borderColor: "#e0e0e0",
        backgroundColor: active ? "#f5f5f5" : "#fafafa",
        "&:hover": active ? {
          borderColor: "#00796b",
          backgroundColor: "#e0f2f1",
        } : {},
        "&.Mui-disabled": {
          opacity: 0.7,
          borderColor: "#e0e0e0",
        }
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <Stars rating={star} active={active} />
        <Count count={count} active={active} />
      </Box>
    </Button>
  );
  
  const Stars = ({ rating, active }) => (
    <Typography variant="body2" sx={{ color: "#00796b" }}>
      {[...Array(rating)].map((_, i) => (
        <span key={i} style={{ color: active ? "#ffb300" : "#e0e0e0" }}>★</span>
      ))}
    </Typography>
  );
  
  const Count = ({ count, active }) => (
    <Typography variant="body2" sx={{ fontWeight: "bold", color: active ? "#00796b" : "#bdbdbd" }}>
      ({count})
    </Typography>
  );
  
  // Sử dụng

  export default RatingButton;