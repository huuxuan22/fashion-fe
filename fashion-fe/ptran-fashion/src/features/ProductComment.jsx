import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Divider,
  Button,
  Stack,
  Avatar,
  Chip,
  Pagination,
  TextField,
  IconButton,
  Badge,
  Collapse,
} from "@mui/material";
import {
  AttachFile,
  InsertEmoticon,
  Send,
  Close,
  MoreVert,
  Reply,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import { useTypingIndicator } from "../hooks/useTypingIndicator";
import { useWebSocket } from "../hooks/useWebSocket";

const ProductComment = ({ productId, currentUser }) => {
  const primaryColor = "#005244";
  const lightPrimary = "#e0f2f1";
  const [images, setImages] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [typing, setTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const fileInputRef = useRef(null);
  const replyInputRef = useRef(null);

  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: "user123",
      date: "2025-01-15",
      rating: 5,
      comment: "Sản phẩm tuyệt vời, chất lượng tốt",
      hasMedia: true,
      replies: [
        {
          id: 101,
          user: "shop_owner",
          date: "2025-01-16",
          comment: "Cảm ơn bạn đã đánh giá!",
        },
        {
          id: 102,
          user: "user456",
          date: "2025-01-16",
          comment: "Tôi cũng thấy sản phẩm rất tốt",
        },
      ],
      showReplies: true,
    },
    {
      id: 2,
      user: "user456",
      date: "2025-01-17",
      rating: 4,
      comment: "Sản phẩm tốt nhưng giá hơi cao",
      hasMedia: false,
      replies: [
        {
          id: 201,
          user: "shop_owner",
          date: "2025-01-18",
          comment: "Chúng tôi sẽ xem xét về giá cả, cảm ơn góp ý của bạn!",
        },
      ],
      showReplies: false,
    },
    {
      id: 3,
      user: "user789",
      date: "2025-01-20",
      rating: 5,
      comment: "Giao hàng nhanh, đóng gói cẩn thận",
      hasMedia: true,
      replies: [],
      showReplies: false,
    },
  ]);
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
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages([...images, ...newImages]);
  };
  const handleRemoveImage = (index) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handlePaste = (e) => {
    const items = (e.clipboardData || window.clipboardData).items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const blob = items[i].getAsFile();
        const image = {
          file: blob,
          preview: URL.createObjectURL(blob),
        };
        setImages([...images, image]);
      }
    }
  };
  const handleReply = (reviewId) => {
    setReplyingTo(reviewId);
    setTimeout(() => {
      replyInputRef.current?.focus();
    }, 100);
  };
  const handleSubmitReply = () => {
    if (replyContent.trim() && replyingTo) {
      setTyping(true);

      // Simulate typing effect
      setTimeout(() => {
        setReviews(
          reviews.map((review) => {
            if (review.id === replyingTo) {
              return {
                ...review,
                replies: [
                  ...review.replies,
                  {
                    id: Math.max(...review.replies.map((r) => r.id), 0) + 1,
                    user: "current_user",
                    date: new Date().toISOString().split("T")[0],
                    comment: replyContent,
                  },
                ],
                showReplies: true,
              };
            }
            return review;
          })
        );

        setReplyContent("");
        setReplyingTo(null);
        setTyping(false);
      }, 1500); // Simulate typing time
    }
  };
  const handleTyping = () => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTyping(true);
    setTypingTimeout(
      setTimeout(() => {
        setTyping(false);
      }, 2000)
    );
  };
  const toggleReplies = (reviewId) => {
    setReviews(
      reviews.map((review) => {
        if (review.id === reviewId) {
          return {
            ...review,
            showReplies: !review.showReplies,
          };
        }
        return review;
      })
    );
  };

  console.log("user: ", currentUser);
  console.log("prudctId: ", productId);
  const [comment, setComment] = useState("");
  const typingTimeoutRef = useRef({
    timer: null,
    isTyping: false
  });
  const { typingUsers, sendTypingEvent } = useTypingIndicator(
    productId,
    currentUser?.userId
  );

  const { isConnected, sendMessage } = useWebSocket(
    `http://localhost:8080/ws`,
    [`/topic/comments/${productId}`],
    (comment) => {
      console.log("New comment received from server:", comment);
    }
  );

  useEffect(() => {
    console.log(
      `WebSocket connection status: ${
        isConnected ? "✅ Connected" : "❌ Disconnected"
      }`
    );
  }, [isConnected]);

  const handleCommentChange = useCallback(
    (e) => {
      setComment(e.target.value);
  
      // Gửi sự kiện bắt đầu typing nếu chưa gửi
      if (!typingTimeoutRef.current.isTyping) {
        sendTypingEvent(true);
        typingTimeoutRef.current.isTyping = true;
      }
  
      // Reset timeout
      clearTimeout(typingTimeoutRef.current.timer);
      typingTimeoutRef.current.timer = setTimeout(() => {
        sendTypingEvent(false);
        typingTimeoutRef.current.isTyping = false;
      }, 2000);
    },
    [sendTypingEvent]
  );
  // Gửi khi blur khỏi textarea
  const handleBlur = useCallback(() => {
    clearTimeout(typingTimeoutRef.current.timer);
    if (typingTimeoutRef.current.isTyping) {
      sendTypingEvent(false);
      typingTimeoutRef.current.isTyping = false;
    }
  }, [sendTypingEvent]);

  const handleSubmitComment = () => {
    if (comment.trim()) {
      sendMessage(`/app/comment`, {
        productId,
        sender: currentUser?.userId,
        comment: comment,
      });
      console.log("Comment sent:", comment);
      setComment("");
      sendTypingEvent(false); // Gửi sự kiện ngừng gõ
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmitComment();
    }
  };

  console.log(typingUsers);

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
                borderColor: "#e0e0e0",
                backgroundColor: "#f5f5f5",
                "&:hover": {
                  borderColor: "#00796b",
                  backgroundColor: "#e0f2f1",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Typography variant="body2" sx={{ color: "#00796b" }}>
                  {[...Array(item.stars)].map((_, i) => (
                    <span key={i} style={{ color: "#ffb300" }}>
                      ★
                    </span>
                  ))}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    color: "#00796b",
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

        {/* Comment Input Box */}
        <Box sx={{ mb: 3, mt: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
            Viết đánh giá của bạn
          </Typography>
          <Box
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: 1,
              p: 1.5,
            }}
          >
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Nhập bình luận của bạn..."
              value={comment}
              onChange={handleCommentChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none",
                  },
                  "&:hover fieldset": {
                    border: "none",
                  },
                  "&.Mui-focused fieldset": {
                    border: "none",
                  },
                },
              }}
            />
            {/* dấu 3 chấm hiện khi gõ  */}
            {Object.entries(typingUsers).some(([_, isTyping]) => isTyping) && (
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {Object.entries(typingUsers)
                    .filter(([_, isTyping]) => isTyping)
                    .map(([userId]) => userId)
                    .join(", ")}{" "}
                  đang soạn tin nhắn...
                </Typography>
                <Box sx={{ display: "flex", ml: 1 }}>
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <Box
                      key={i}
                      sx={{
                        width: 6,
                        height: 6,
                        bgcolor: "text.secondary",
                        borderRadius: "50%",
                        mx: 0.5,
                        animation: "typingBounce 1.2s infinite ease-in-out",
                        animationDelay: `${delay}s`,
                        "@keyframes typingBounce": {
                          "0%, 80%, 100%": { transform: "scale(0)" },
                          "40%": { transform: "scale(1)" },
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}

            {/* Preview Images */}
            {images.length > 0 && (
              <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
                {images.map((image, index) => (
                  <Box
                    key={index}
                    sx={{
                      position: "relative",
                      width: 100,
                      height: 100,
                    }}
                  >
                    <img
                      src={image.preview}
                      alt={`preview-${index}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: 4,
                      }}
                    />
                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        bgcolor: "rgba(0,0,0,0.5)",
                        color: "white",
                        "&:hover": {
                          bgcolor: "rgba(0,0,0,0.7)",
                        },
                      }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <Close fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            )}

            {/* Action Buttons */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 1,
              }}
            >
              <Box>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  multiple
                  accept="image/*"
                  hidden
                />
                <IconButton
                  onClick={() => fileInputRef.current.click()}
                  sx={{ color: primaryColor }}
                >
                  <Badge badgeContent={images.length} color="primary">
                    <AttachFile />
                  </Badge>
                </IconButton>
                <IconButton sx={{ color: primaryColor }}>
                  <InsertEmoticon />
                </IconButton>
              </Box>
              <Button
                variant="contained"
                endIcon={<Send />}
                onClick={handleSubmitComment}
                disabled={!comment.trim() && images.length === 0}
                sx={{
                  bgcolor: primaryColor,
                  "&:hover": {
                    bgcolor: "#003d33",
                  },
                }}
              >
                Gửi
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Reviews List */}
        <Box sx={{ mt: 2 }}>
          {reviews.map((review) => (
            <Box
              key={review.id}
              sx={{
                mb: 2,
                borderBottom: `1px solid ${lightPrimary}`,
                pb: 2,
              }}
            >
              {/* Main Review */}
              <Box sx={{ display: "flex", alignItems: "flex-start" }}>
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
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: "bold", mr: 1 }}
                    >
                      {review.user}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary" }}
                    >
                      {review.date} | {"★".repeat(review.rating)}
                    </Typography>
                  </Box>

                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {review.comment}
                  </Typography>

                  {review.hasMedia && (
                    <Chip
                      label="Hình ảnh/video"
                      size="small"
                      sx={{
                        mt: 0.5,
                        bgcolor: lightPrimary,
                        color: primaryColor,
                      }}
                    />
                  )}

                  <Box sx={{ display: "flex", mt: 1 }}>
                    <Button
                      startIcon={<Reply fontSize="small" />}
                      size="small"
                      sx={{ color: primaryColor }}
                      onClick={() => handleReply(review.id)}
                    >
                      Phản hồi
                    </Button>
                    {review.replies.length > 0 && (
                      <Button
                        startIcon={
                          review.showReplies ? (
                            <KeyboardArrowUp />
                          ) : (
                            <KeyboardArrowDown />
                          )
                        }
                        size="small"
                        sx={{ color: primaryColor }}
                        onClick={() => toggleReplies(review.id)}
                      >
                        {review.replies.length} phản hồi
                      </Button>
                    )}
                  </Box>
                </Box>
              </Box>

              {/* Reply Input */}
              {replyingTo === review.id && (
                <Box sx={{ ml: 6, mt: 1 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    placeholder="Viết phản hồi..."
                    value={replyContent}
                    onChange={(e) => {
                      setReplyContent(e.target.value);
                      handleTyping();
                    }}
                    variant="outlined"
                    size="small"
                    inputRef={replyInputRef}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        fontSize: "0.875rem",
                      },
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      mt: 1,
                    }}
                  >
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleSubmitReply}
                      disabled={!replyContent.trim()}
                      sx={{
                        bgcolor: primaryColor,
                        "&:hover": {
                          bgcolor: "#003d33",
                        },
                      }}
                    >
                      Gửi
                    </Button>
                  </Box>
                </Box>
              )}

              {/* Typing Indicator */}
              {typing && replyingTo === review.id && (
                <Box
                  sx={{ ml: 6, mt: 1, display: "flex", alignItems: "center" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      bgcolor: lightPrimary,
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        "& > div": {
                          width: 6,
                          height: 6,
                          bgcolor: primaryColor,
                          borderRadius: "50%",
                          mr: 0.5,
                          animation: "typing 1.4s infinite ease-in-out",
                        },
                        "& > div:nth-of-type(2)": {
                          animationDelay: "0.2s",
                        },
                        "& > div:nth-of-type(3)": {
                          animationDelay: "0.4s",
                        },
                        "@keyframes typing": {
                          "0%, 60%, 100%": {
                            transform: "translateY(0)",
                          },
                          "30%": {
                            transform: "translateY(-5px)",
                          },
                        },
                      }}
                    >
                      <div />
                      <div />
                      <div />
                    </Box>
                    <Typography variant="caption" sx={{ ml: 1 }}>
                      Đang nhập...
                    </Typography>
                  </Box>
                </Box>
              )}

              {/* Replies List */}
              <Collapse in={review.showReplies && review.replies.length > 0}>
                <Box sx={{ ml: 6, mt: 1 }}>
                  {review.replies.map((reply) => (
                    <Box
                      key={reply.id}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        mb: 1.5,
                        pt: 1.5,
                        borderTop: `1px solid ${lightPrimary}`,
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 28,
                          height: 28,
                          bgcolor: primaryColor,
                          mr: 1,
                          fontSize: "0.875rem",
                        }}
                      >
                        {reply.user.charAt(0)}
                      </Avatar>
                      <Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              fontWeight: "bold",
                              mr: 1,
                              fontSize: "0.875rem",
                            }}
                          >
                            {reply.user}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "text.secondary",
                              fontSize: "0.75rem",
                            }}
                          >
                            {reply.date}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{ mt: 0.5, fontSize: "0.875rem" }}
                        >
                          {reply.comment}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Collapse>
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

export default ProductComment;
