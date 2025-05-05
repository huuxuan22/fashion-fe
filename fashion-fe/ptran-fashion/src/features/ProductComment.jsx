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
  Videocam,
  Star,
} from "@mui/icons-material";
import { useTypingIndicator } from "../hooks/useTypingIndicator";
import { useWebSocket } from "../hooks/useWebSocket";
import * as feedbackServiceMain from "./../service/feedbacks-service";
import { format, set } from "date-fns";
import * as feedbackService from "./../redux/Feedback/Action";
import { useDispatch, useSelector } from "react-redux";
import { store } from "./../redux/store";
import { BASE_API_URL } from "../config/Config";
import ReplyIcon from "@mui/icons-material/Reply";
import ImageIcon from "@mui/icons-material/Image";
import * as utils from "./../utils/Utill"
function formatDateArray(dateArray, format = "dd/MM/yyyy HH:mm:ss") {
  if (!dateArray || dateArray.length < 3) return "";
  const [year, month, day, hours = 0, minutes = 0, seconds = 0] = dateArray;
  const date = new Date(year, month - 1, day, hours, minutes, seconds);
  if (isNaN(date.getTime())) return "Invalid Date";
  const pad = (num) => num.toString().padStart(2, "0");
  const replacements = {
    dd: pad(date.getDate()),
    MM: pad(date.getMonth() + 1),
    yyyy: date.getFullYear(),
    HH: pad(date.getHours()),
    mm: pad(date.getMinutes()),
    ss: pad(date.getSeconds()),
  };
  return format.replace(/dd|MM|yyyy|HH|mm|ss/g, (match) => replacements[match]);
}

const ProductComment = ({ productId, currentUser }) => {
  const primaryColor = "#005244";
  const lightPrimary = "#e0f2f1";
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [typing, setTyping] = useState(false);
  const [feedbackId, setFeedbackId] = useState(null);
  const fileInputRef = useRef(null);
  const replyInputRef = useRef(null);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [change, setChange] = useState(false);
  const [unique, setUnique] = useState(""); // cái biến này để dựa vào cái này để phân biệt các feedbackMessage khác nhau để thao tác
  const size = 15;
  const [page, setPage] = useState(0);
  const [rating, setRating] = useState(0);
  const { feedbacks } = useSelector((store) => store);
  const [selectedRating, setSelectedRating] = useState(0);
  const [replyImages, setReplyImages] = useState([]);
  const replyFileInputRef = useRef(null);
  const [showInputReply, setShowInputReply] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState({});
  const [replyMessage, setReplyMessage] = useState("");
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
  // lấy danh sách ảnh lên mà kiểm tra
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // Danh sách định dạng hỗ trợ (đồng bộ với BE)
    const supportedExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".mp4",
      ".mpeg",
    ];
    const supportedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "video/mp4",
      "video/mpeg",
    ];
    const newFiles = files
      .map((file) => {
        // Kiểm tra kích thước (ví dụ tối đa 50MB cho video)
        if (file.size > 50 * 1024 * 1024) {
          alert(`File ${file.name} quá lớn! Tối đa 50MB`);
          return null;
        }

        // Kiểm tra extension (đuôi file)
        const fileExtension = file.name
          .toLowerCase()
          .slice(file.name.lastIndexOf("."));
        if (!supportedExtensions.includes(fileExtension)) {
          alert(`Định dạng file ${fileExtension} không được hỗ trợ!`);
          return null;
        }

        // Kiểm tra MIME type (đồng bộ với BE)
        if (!supportedMimeTypes.includes(file.type)) {
          alert(`Loại file ${file.type} không được hỗ trợ!`);
          return null;
        }
        return {
          file,
          preview: file.type.startsWith("video/")
            ? null // Video không có preview URL
            : URL.createObjectURL(file),
          type: file.type.startsWith("video/") ? "video" : "image",
          extension: fileExtension,
        };
      })
      .filter(Boolean);

    setImages((prev) => [...prev, ...newFiles]);
  };

  // xóa ảnh khi gửi lên
  const handleRemoveImage = (index) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    setImages(newImages);
  };

  // xử lý sự kiện dán ở trong ô nhập bình luận
  const handlePaste = (e) => {
    const items = (e.clipboardData || window.clipboardData).items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const blob = items[i].getAsFile();
        if (blob instanceof Blob) {
          // Kiểm tra lại xem có phải Blob không
          const image = {
            file: blob,
            preview: URL.createObjectURL(blob),
          };
          setImages((prevImages) => [...prevImages, image]);
        } else {
          console.error("Dữ liệu không phải là file hợp lệ:", blob);
        }
      }
    }
  };

  // hiển thị các phản hồi theo logic true false
  const handleReply = (reviewId) => {
    setReplyingTo(reviewId);
    setTimeout(() => {
      replyInputRef.current?.focus();
    }, 100);
    if (showInputReply) {
      setShowInputReply(false);
      setFeedbackId(null);
    } else {
      setShowInputReply(true);
    }
  };

  // quản lý việc show feedback phản hồi
  const toggleReplies = (feedbackId, status) => {
    console.log("status của bạn là: ", status);
    if (status) {
      dispatch(
        feedbackService.updateStatusShowFeedbackMessage(feedbackId, false)
      );
    } else {
      dispatch(
        feedbackService.updateStatusShowFeedbackMessage(feedbackId, true)
      );
    }
  };
  //hook websocket
  const { isConnected, sendMessage } = useWebSocket(
    `http://localhost:8080/ws`,
    [`/topic/comments`],
    (comment) => {
      console.log("== RAW comment từ WebSocket:", comment);
      try {
        if (comment.feedbackId) {
          console.log("da di vao trong casi nafy");
          uploadReplyImage(comment.unique);
          handleLoadDataComment();
        } else {
          setChange(true);
          setUnique(comment.unique);
          uploadImage(comment.unique);
          handleLoadDataComment();
        }
      } catch (err) {
        console.error("❌ JSON parse failed:", err);
      }
    }
  );
  // log ra kiểm tra kết nối với websocket
  useEffect(() => {
    console.log(
      `WebSocket connection status: ${
        isConnected ? "✅ Connected" : "❌ Disconnected"
      }`
    );
  }, [isConnected]);

  // load lấy tất cả dữ liệu về bình luận và ảnh video
  useEffect(() => {
    handleLoadDataComment();
    setFeedbackId(null);
  }, [productId]);
  useEffect(() => {
    setFeedbackId(null);
  }, []);
  // lấy tổng tất cả dữ liệu bình luận và ảnh video
  const handleLoadDataComment = async () => {
    await dispatch(feedbackService.getAllFeedbacks({ productId, page, size, selectedRating, token }));
    await dispatch(feedbackService.countCommentByRating({ productId, token }));
    await dispatch(feedbackService.countAllComment({ productId, token }));
    await dispatch(feedbackService.countAllMedia({ productId, token }));
    await dispatch(feedbackService.getAllTotalPage( productId,selectedRating,token ));
    await dispatch(feedbackService.getAverageRating( productId, token ));
  };


  // xử lý ảnh bỏ vào trong biến images rồi bắt đầu gửi lên trên server
  const uploadImage = async (unique) => {
    if (images.length === 0) {
      return;
    }
    if (images.length > 0) {
      console.log("đã vào uplaod iamge feedback");
      const formData = new FormData();
      // Thêm từng file vào FormData
      images.forEach((image, index) => {
        if (image.file instanceof Blob) {
          formData.append(`files`, image.file); // Key phải trùng với @RequestPart
        }
      });
      await feedbackServiceMain
        .uploadImageFeedback(formData, unique, token)
        .then((data) => {
          if (!data.success) {
            alert(data.data);
          } else {
            setUnique("");
            setChange(false);
            handleLoadDataComment();
          }
        });
    }
    setImages([]);
  };

  // gửi bình luận đầu tiên
  const handleSubmitComment = async () => {
    if (comment.trim() || images.length > 0) {
      sendMessage(`/app/comments`, {
        productId,
        sender: currentUser?.userId,
        comment: comment,
        rating: rating || 5,
        unique: "",
      });
      setComment("");
      setRating(0);
    }
  };
  // xử lý sự kiện bấm nút gửi bình luận
  useEffect(() => {
    if (change && unique !== "") {
      uploadImage(unique);
      setChange(false);
    }
  }, [change]);

  // xử lý sự kiện bấm enter để gửi bình luận
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmitComment();
    }
  };

  // phần upload ảnh trong phản hồi đầu tiên
  const uploadReplyImage = async (unique) => {
    console.log("đã vào upload reply image",images);
    
    if (replyImages.length > 0) {
      try {
        console.log("đã vào uplaod iamge respone");
        let formData;
        if (replyImages.length > 0) {
          formData = new FormData();
          replyImages.forEach((img) => {
            formData.append("files", img.file);
          });
          await feedbackServiceMain
            .uploadImageFeedbackResponse(formData, unique, token)
            .then((data) => {
              if (!data.success) {
                alert(data.data);
              } else {
                alert("Thêm ảnh thành công");
                setReplyImages([]);
              }
            });
        }
      } catch (error) {
        console.error("Lỗi khi gửi phản hồi:", error);
      }
    }
  };

  // xử lý sự kiện khi bấm nút phản hồi
  const handleSendMessRespone = async () => {
    // Gửi phản hồi (giữ nguyên logic WebSocket của bạn)
    sendMessage(`/app/response`, {
      feedbackId: replyingTo,
      sender: currentUser?.userId,
      message: replyContent,
      unique: "",
    });
    // Reset form
    setReplyContent("");
    setReplyingTo(null);
    console.log("dữ liệu của bạn: ", replyContent);
  };
  // xử lý xử kiện bấm enter để gửi phản hồi ở dưới feedback
  const handleKeyDownRespone = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessRespone();
    }
  };
  // thao tác logic để hiển thị ô input phản hồi
  const toggleReplyInput = (feedbackId) => {
    setShowReplyInput((prev) => ({
      ...prev,
      [feedbackId]: !prev[feedbackId],
    }));
    setReplyMessage("");
  };
  // cái này là phần bấm submit để gửi phản hồi cho feedback ô input ở dưới feedback
  const handleSendReply = (feedbackId) => {
    console.log(
      "Gửi reply cho feedback:",
      feedbackId,
      "Nội dung:",
      replyMessage
    );
    if (replyMessage.trim()) {
      sendMessage(`/app/response`, {
        feedbackId: feedbackId,
        sender: currentUser?.userId,
        message: replyMessage,
        unique: "",
      });
    }
    setReplyMessage("");
    toggleReplyInput(feedbackId);
  };

  const handleSelectPage = (pageNumber) => {
    setPage(pageNumber-1);
    setChange(true);
    console.log("page của bạn là: ", pageNumber);
  }
  useEffect(() => {
    console.log("đã đi vào trong này rồi nè");
    loadDataWithRatingOrPage();
    
  },[selectedRating, page]);
  const loadDataWithRatingOrPage =  async () => {
    console.log("select rating của bạn là: ", selectedRating);
    
      await dispatch(
        feedbackService.getAllFeedbacks({ productId, page, size, selectedRating, token })
      );
    await dispatch(feedbackService.getAllTotalPage( productId,selectedRating,token ));
  };
   // Hàm xử lý khi click vào nút rating
   const handleRatingFilter = (rating) => {
    console.log(`Đã chọn rating: ${rating}`);
    setSelectedRating(rating);
    console.log("select rating của bạn là: ", selectedRating);
    
    // Thêm các xử lý khác nếu cần (như filter comments...)
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

        {/* đánh giá 4.9★★★★★(45) */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              mr: 1,
              color: primaryColor,
            }}
          >
            {parseFloat(feedbacks.averageRating).toFixed(2)}
          </Typography>
          <Typography sx={{ mr: 1 }}>★★★★★</Typography>
          <Typography>({feedbacks.countComment}) </Typography>
        </Box>

        {/* Dấu ngăn cách */}
        <Divider
          sx={{
            my: 2,
            borderBottomWidth: 2,
            borderColor: primaryColor,
          }}
        />
        {/* Hàm hiển thị số lượng bình luận theo đánh giá sao*/}
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {[1, 2, 3, 4, 5].map((star) => {
            const ratingData = feedbacks.commentsRating?.find(
              (item) => item[0] === star
            );
            const count = ratingData ? ratingData[1] : 0;
            const hasComments = count > 0;
            const isSelected = selectedRating === star;

            return (
              <Button
                key={star}
                variant="outlined"
                size="small"
                disabled={!hasComments}
                onClick={() => hasComments && handleRatingFilter(star)}
                sx={{
                  minWidth: 0,
                  px: 1.5,
                  py: 0.5,
                  borderColor: isSelected ? "#00796b" : "#e0e0e0",
                  backgroundColor: isSelected
                    ? "#e0f2f1"
                    : hasComments
                    ? "#f5f5f5"
                    : "#fafafa",
                  "&:hover": hasComments
                    ? {
                        borderColor: "#00796b",
                        backgroundColor: isSelected ? "#e0f2f1" : "#b2dfdb",
                      }
                    : {},
                  "&.Mui-disabled": {
                    opacity: 0.7,
                    borderColor: "#e0e0e0",
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  {/* Hiển thị sao */}
                  <Typography component="span" sx={{ color: "#00796b" }}>
                    {Array.from({ length: star }).map((_, i) => (
                      <span
                        key={i}
                        style={{
                          color: isSelected
                            ? "#ff8f00"
                            : hasComments
                            ? "#ffb300"
                            : "#e0e0e0",
                          fontSize: "1rem",
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </Typography>

                  {/* Hiển thị số lượng */}
                  <Typography
                    component="span"
                    sx={{
                      fontWeight: "bold",
                      color: isSelected
                        ? "#00796b"
                        : hasComments
                        ? "#00796b"
                        : "#bdbdbd",
                      fontSize: "0.875rem",
                    }}
                  >
                    ({count})
                  </Typography>
                </Box>
              </Button>
            );
          })}
        </Box>

        {/* Tổng số bình luận và hình ảnh video */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 2,
          }}
        >
          <Button variant="text" size="small" sx={{ color: primaryColor }}>
            Có Bình Luận ({feedbacks.countComment})
          </Button>
          <Button variant="text" size="small" sx={{ color: primaryColor }}>
            Có Hình Ảnh / Video ({feedbacks.countMedia})
          </Button>
        </Box>

        {/* Đây form để nhập các bình luận */}
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
            {/* Phần đánh giá sao */}
            <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
              <Typography variant="body2" sx={{ mr: 1 }}>
                Đánh giá:
              </Typography>
              {[1, 2, 3, 4, 5].map((star) => (
                <IconButton
                  key={star}
                  size="small"
                  onClick={() => setRating(star)}
                  sx={{ p: 0.5 }}
                >
                  <Star
                    sx={{
                      color: star <= rating ? "#FFD700" : "#e0e0e0",
                      fontSize: 24,
                    }}
                  />
                </IconButton>
              ))}
              <Typography
                variant="caption"
                sx={{ ml: 1, color: "text.secondary" }}
              >
                {rating > 0 ? `${rating} sao` : "Chưa đánh giá"}
              </Typography>
            </Box>

            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Nhập bình luận của bạn..."
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
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

            {/* Preview Images */}
            {images.length > 0 && (
              <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
                {images.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      position: "relative",
                      width: 100,
                      height: 100,
                      border: "1px solid #e0e0e0",
                      borderRadius: 1,
                      overflow: "hidden",
                      bgcolor: "#f5f5f5",
                    }}
                  >
                    {item.type === "image" ? (
                      <img
                        src={item.preview}
                        alt={`preview-${index}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                        }}
                      >
                        <Videocam
                          sx={{ color: "text.secondary", fontSize: 40 }}
                        />
                        <Typography variant="caption" sx={{ ml: 1 }}>
                          {item.file.name}
                        </Typography>
                      </Box>
                    )}

                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        bgcolor: "rgba(0,0,0,0.5)",
                        color: "white",
                        "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
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
                  accept="image/*,video/*"
                  hidden
                />
                <IconButton
                  onClick={() => fileInputRef.current.click()}
                  sx={{ color: primaryColor }}
                >
                  <Badge badgeContent={images.length} color="primary">
                    <Box sx={{ display: "flex" }}>
                      <AttachFile />
                    </Box>
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
          {feedbacks?.feedbacks.map((review) => (
            <Box
              key={review.feedbackId}
              sx={{
                mb: 2,
                borderBottom: `1px solid ${lightPrimary}`,
                pb: 2,
              }}
            >
              {/* feedback chính */}
              <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: primaryColor,
                    mr: 1,
                  }}
                  src={review.user.imgUrl}
                >
                  {review.user.imgUrl}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: "bold", mr: 1 }}
                    >
                      {review.user.fullName}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary" }}
                    >
                      {formatDateArray(review.createAt, "yyyy-MM-dd HH:mm")} |{" "}
                      {"★".repeat(review.rating)}
                    </Typography>
                  </Box>

                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {review.content}
                  </Typography>

                  {review?.feedbackMedia.map((media, index) =>
                    media.mediaUrl.endsWith(".mp4") ? (
                      <video
                        key={index}
                        width="200"
                        controls
                        src={`${BASE_API_URL}/api/comment/media?link=${media.mediaUrl}`}
                      />
                    ) : (
                      <img
                        key={index}
                        width="200"
                        src={`${BASE_API_URL}/api/comment/media?link=${media.mediaUrl}`}
                        alt={`Media ${index}`}
                      />
                    )
                  )}

                  <Box sx={{ display: "flex", mt: 1 }}>
                    <Button
                      startIcon={<Reply fontSize="small" />}
                      size="small"
                      sx={{ color: primaryColor }}
                      onClick={() => handleReply(review.feedbackId)}
                    >
                      Phản hồi
                    </Button>
                    {review?.feedbackMessages.length > 0 && (
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
                        onClick={() =>
                          toggleReplies(review.feedbackId, review.status)
                        }
                      >
                        {review?.feedbackMessages.length} phản hồi tin nhắn
                      </Button>
                    )}
                  </Box>
                </Box>
              </Box>

              {/* Reply Input */}
              {replyingTo === review.feedbackId && showInputReply && (
                <Box sx={{ ml: 6, mt: 1 }}>
                  {/* Ô nhập phản hồi */}
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    placeholder="Viết phản hồi..."
                    value={replyContent}
                    onKeyDown={handleKeyDownRespone}
                    onChange={(e) => setReplyContent(e.target.value)}
                    onPaste={(e) => {
                      const items = (e.clipboardData || window.clipboardData)
                        .items;
                      const newImages = [];
                      for (let i = 0; i < items.length; i++) {
                        if (items[i].type.indexOf("image") !== -1) {
                          const blob = items[i].getAsFile();
                          if (blob) {
                            newImages.push({
                              file: blob,
                              preview: URL.createObjectURL(blob),
                              type: "image",
                            });
                          }
                        }
                      }
                      setReplyImages((prev) => [...prev, ...newImages]);
                    }}
                    variant="outlined"
                    size="small"
                    inputRef={replyInputRef}
                  />

                  {/* Hiển thị preview hình ảnh/video phản hồi */}
                  {replyImages.length > 0 && (
                    <Box
                      sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}
                    >
                      {replyImages.map((item, index) => (
                        <Box
                          key={index}
                          sx={{ position: "relative", width: 100, height: 100 }}
                        >
                          {item.type === "image" ? (
                            <img
                              src={item.preview}
                              alt={`preview-${index}`}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "100%",
                              }}
                            >
                              <Videocam
                                sx={{ color: "text.secondary", fontSize: 40 }}
                              />
                            </Box>
                          )}
                          <IconButton
                            size="small"
                            sx={{
                              position: "absolute",
                              top: 0,
                              right: 0,
                              bgcolor: "rgba(0,0,0,0.5)",
                              color: "white",
                              "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                            }}
                            onClick={() => {
                              URL.revokeObjectURL(replyImages[index].preview);
                              const newImages = [...replyImages];
                              newImages.splice(index, 1);
                              setReplyImages(newImages);
                            }}
                          >
                            <Close fontSize="small" />
                          </IconButton>
                        </Box>
                      ))}
                    </Box>
                  )}

                  {/* Thanh công cụ phản hồi */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 1,
                    }}
                  >
                    <Box>
                      {/* Input file ẩn */}
                      <input
                        type="file"
                        ref={replyFileInputRef}
                        onChange={(e) => {
                          const files = Array.from(e.target.files);
                          const newImages = files.map((file) => ({
                            file,
                            preview: file.type.startsWith("video/")
                              ? null
                              : URL.createObjectURL(file),
                            type: file.type.startsWith("video/")
                              ? "video"
                              : "image",
                          }));
                          setReplyImages((prev) => [...prev, ...newImages]);
                        }}
                        accept="image/*,video/*"
                        multiple
                        hidden
                      />

                      {/* Icon đính kèm */}
                      <IconButton
                        onClick={() => replyFileInputRef.current.click()}
                        sx={{ color: primaryColor }}
                      >
                        <Badge
                          badgeContent={replyImages.length}
                          color="primary"
                        >
                          <AttachFile fontSize="small" />
                        </Badge>
                      </IconButton>
                    </Box>

                    <Button
                      variant="contained"
                      endIcon={<Send />}
                      onClick={handleSendMessRespone}
                      disabled={
                        !replyContent.trim() && replyImages.length === 0
                      }
                      sx={{
                        bgcolor: primaryColor,
                        "&:hover": { bgcolor: "#003d33" },
                      }}
                    >
                      Gửi
                    </Button>
                  </Box>
                </Box>
              )}
              {/* Typing Indicator */}
              {typing && replyingTo === review.feedbackId && (
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
              {!review.status && (
                <>
                  <Collapse in={review.feedbackMessages.length > 0}>
                    <Box sx={{ ml: 6, mt: 1 }}>
                      {review?.feedbackMessages.map((reply) => (
                        <Box
                          key={reply.fbMessageId}
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
                            src={reply.sender.imgUrl}
                          ></Avatar>
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
                                {reply.sender.fullName}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  color: "text.secondary",
                                  fontSize: "0.75rem",
                                }}
                              >
                                {format(
                                  new Date(reply?.createdAt),
                                  "yyyy-MM-dd HH:mm"
                                )}
                              </Typography>
                            </Box>
                            <Typography
                              variant="body2"
                              sx={{ mt: 0.5, fontSize: "0.875rem" }}
                            >
                              {reply.message}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </Collapse>

                  {/* Phần nút bình luận và input */}
                  <Box sx={{ ml: 6, mt: 1 }}>
                    {!showReplyInput[review.feedbackId] ? (
                      <Button
                        size="small"
                        startIcon={<ReplyIcon fontSize="small" />}
                        onClick={() => toggleReplyInput(review.feedbackId)}
                        sx={{ color: "text.secondary", fontSize: "0.75rem" }}
                      >
                        Bình luận
                      </Button>
                    ) : (
                      <Box sx={{ mt: 1 }}>
                        <Box sx={{ mt: 1 }}>
                          <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            placeholder="Viết bình luận..."
                            value={replyMessage}
                            onChange={(e) => setReplyMessage(e.target.value)}
                            onKeyDown={(e) => {
                              if (
                                e.key === "Enter" &&
                                !e.shiftKey &&
                                replyMessage.trim()
                              ) {
                                e.preventDefault(); // Ngăn chặn xuống dòng
                                handleSendReply(review.feedbackId);
                              }
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                fontSize: "0.875rem",
                                "& fieldset": {
                                  borderColor: "#00917B",
                                },
                                "&:hover fieldset": {
                                  borderColor: "#00917B",
                                },
                              },
                            }}
                          />
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "flex-end",
                              mt: 1,
                              gap: 1,
                            }}
                          >
                            <Button
                              size="small"
                              variant="text"
                              onClick={() => {
                                setReplyMessage("");
                                toggleReplyInput(review.feedbackId);
                              }}
                              sx={{
                                fontSize: "0.75rem",
                                color: "#00917B",
                                "&:hover": {
                                  backgroundColor: "rgba(0, 145, 123, 0.08)",
                                },
                              }}
                            >
                              Hủy
                            </Button>
                            <Button
                              size="small"
                              variant="contained"
                              onClick={() => handleSendReply(review.feedbackId)}
                              disabled={!replyMessage.trim()}
                              sx={{
                                fontSize: "0.75rem",
                                backgroundColor: "#00917B",
                                color: "#fff",
                                "&:hover": {
                                  backgroundColor: "#007A66",
                                },
                                "&:disabled": {
                                  backgroundColor: "rgba(0, 145, 123, 0.3)",
                                  color: "rgba(255, 255, 255, 0.5)",
                                },
                              }}
                            >
                              Gửi
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </>
              )}
            </Box>
          ))}
        </Box>

        {/* Pagination */}
        <Pagination
          count={feedbacks.totalPage}
          size="small"
          sx={{
            mt: 2,
            "& .MuiPaginationItem-root.Mui-selected": {
              bgcolor: primaryColor,
              color: "white",
            },
          }}
          onChange={(event, value) => handleSelectPage(value)}
        />
      </Box>
    </Box>
  );
};

export default ProductComment;
