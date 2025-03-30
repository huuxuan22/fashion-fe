import React from "react";
import {
  Box,
  Typography,
  Divider,
  Button,
  Stack,
  Avatar,
  Chip,
  Pagination,
} from "@mui/material";

const ProductReviews = () => {
  const primaryColor = "#005244";
  const lightPrimary = "#e0f2f1";

  const reviews = [
    {
      id: 1,
      user: "user123",
      date: "2025-01-15",
      rating: 5,
      comment: "Sản phẩm tuyệt vời, chất lượng tốt",
      hasMedia: true,
    },
    {
      id: 2,
      user: "user123",
      date: "2025-01-15",
      rating: 5,
      comment: "Sản phẩm tuyệt vời, chất lượng tốt",
      hasMedia: true,
    },
    {
      id: 4,
      user: "user123",
      date: "2025-01-15",
      rating: 5,
      comment: "Sản phẩm tuyệt vời, chất lượng tốt",
      hasMedia: true,
    },
    {
      id: 3,
      user: "user123",
      date: "2025-01-15",
      rating: 5,
      comment: "Sản phẩm tuyệt vời, chất lượng tốt",
      hasMedia: true,
    },
    {
      id: 5,
      user: "user123",
      date: "2025-01-15",
      rating: 5,
      comment: "Sản phẩm tuyệt vời, chất lượng tốt",
      hasMedia: true,
    },
  ];

  const ratingData = {
    average: 4.9,
    total: 45,
    withMedia: 15,
    breakdown: [
      { stars: 5, count: 44 },
      { stars: 4, count: 1 },
      { stars: 3, count: 1 },
      { stars: 2, count: 0 },
      { stars: 1, count: 0 },
    ],
  };

  return (
    <Box
      sx={{
        px: "200px",
        py: 3,
      }}
    >
      <Box
        sx={{
          border: `1px solid ${lightPrimary}`,
          borderRadius: 1,
          p: 2,
        }}
      >
        {/* Header */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: primaryColor,
            mb: 1,
          }}
        >
          ĐÁNH GIÁ SẢN PHẨM
        </Typography>

        {/* Rating Summary */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              mr: 1,
              color: primaryColor,
            }}
          >
            {ratingData.average}
          </Typography>
          <Typography sx={{ mr: 1 }}>★★★★★</Typography>
          <Typography>({ratingData.total})</Typography>
        </Box>

        {/* Long Divider */}
        <Divider
          sx={{
            my: 2,
            borderBottomWidth: 2,
            borderColor: primaryColor,
          }}
        />

        {/* Rating Buttons - Single Row */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            mb: 2,
            flexWrap: "wrap",
          }}
        >
          {ratingData.breakdown.map((item, index) => (
            <Button
              key={index}
              variant="outlined"
              size="small"
              sx={{
                minWidth: 0,
                px: 1.5,
                py: 0.5,
                borderColor: "#e0e0e0", // Light gray border
                backgroundColor: "#f5f5f5", // Light gray background
                "&:hover": {
                  borderColor: "#00796b", // Teal hover border
                  backgroundColor: "#e0f2f1", // Light teal hover background
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Typography variant="body2" sx={{ color: "#00796b" }}>
                  {" "}
                  {/* Teal text */}
                  {[...Array(item.stars)].map((_, i) => (
                    <span key={i} style={{ color: "#ffb300" }}>
                      ★
                    </span> // Yellow stars
                  ))}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    color: "#00796b", // Teal text
                  }}
                >
                  ({item.count})
                </Typography>
              </Box>
            </Button>
          ))}
        </Box>

        {/* Review Stats - Single Row */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 2,
          }}
        >
          <Button variant="text" size="small" sx={{ color: primaryColor }}>
            Có Bình Luận ({ratingData.total})
          </Button>
          <Button variant="text" size="small" sx={{ color: primaryColor }}>
            Có Hình Ảnh / Video ({ratingData.withMedia})
          </Button>
        </Box>

        {/* Reviews List */}
        <Box sx={{ mt: 2 }}>
          {reviews.map((review) => (
            <Box key={review.id} sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: primaryColor,
                    mr: 1,
                  }}
                >
                  {review.user.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                    {review.user}
                  </Typography>
                  <Typography variant="caption">
                    {review.date} | {"★".repeat(review.rating)}
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body2" sx={{ mt: 1, ml: 4 }}>
                {review.comment}
              </Typography>

              {review.hasMedia && (
                <Chip
                  label="Hình ảnh/video"
                  size="small"
                  sx={{
                    ml: 4,
                    mt: 0.5,
                    bgcolor: lightPrimary,
                    color: primaryColor,
                  }}
                />
              )}
            </Box>
          ))}
        </Box>

        {/* Pagination */}
        <Pagination
          count={5}
          size="small"
          sx={{
            mt: 2,
            "& .MuiPaginationItem-root.Mui-selected": {
              bgcolor: primaryColor,
              color: "white",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default ProductReviews;
