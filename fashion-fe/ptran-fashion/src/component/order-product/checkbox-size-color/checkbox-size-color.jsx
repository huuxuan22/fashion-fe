import Radio from "@mui/joy/Radio";
import "./checkbox-size-color.css";
import { useState } from "react";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { Input } from "@mui/material";
import Accordion from "@mui/joy/Accordion";
import AccordionDetails from "@mui/joy/AccordionDetails";
import AccordionGroup from "@mui/joy/AccordionGroup";
import AccordionSummary from "@mui/joy/AccordionSummary";

const CheckBoxSizeColor = () => {
  const [selectedColor, setSelectedColor] = useState(null); // Trạng thái để lưu màu đã chọn

  const colors = [
    { name: "red", color: "red" },
    { name: "blue", color: "blue" },
    { name: "green", color: "green" },
    { name: "pink", color: "pink" },
    { name: "purple", color: "purple" },
  ];

  const handleColorClick = (color) => {
    setSelectedColor(color); // Cập nhật màu đã chọn
  };

  const [selectedSize, setSelectedSize] = useState("");

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const [value, setValue] = useState(500); // Giá trị mặc định

  const handleChange = (event, newValue) => {
    setValue(newValue); // Cập nhật giá trị khi kéo thanh trượt
  };

  const formatCurrency = (value) => {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  return (
    <div className="checbox-size-color">
        <div className="find-by-categories">
            <h3>SHOP BY CATEGORIES</h3>
        <AccordionGroup sx={{ maxWidth: 400 }}>
          <Accordion>
            <AccordionSummary>First accordion</AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>Second accordion</AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>Third accordion</AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </AccordionDetails>
          </Accordion>
        </AccordionGroup>
      </div>


      <h3>SHOP BY SIZE</h3>
      <div className="find-by-size">
        <form>
          <div className="select">
            <Radio
              name="size"
              color="neutral"
              value="XXXL"
              checked={selectedSize === "XXXL"}
              onChange={handleSizeChange}
              id="xxxl"
            />
            <label
              htmlFor="xxxl"
              className={selectedSize === "XXXL" ? "selected" : ""}
            >
              XXXL
            </label>
          </div>

          <div className="select">
            <Radio
              name="size"
              color="neutral"
              value="XXL"
              checked={selectedSize === "XXL"}
              onChange={handleSizeChange}
              id="xxl"
            />
            <label
              htmlFor="xxl"
              className={selectedSize === "XXL" ? "selected" : ""}
            >
              XXL
            </label>
          </div>

          <div className="select">
            <Radio
              name="size"
              color="neutral"
              value="XL"
              checked={selectedSize === "XL"}
              onChange={handleSizeChange}
              id="xl"
            />
            <label
              htmlFor="xl"
              className={selectedSize === "XL" ? "selected" : ""}
            >
              XL
            </label>
          </div>

          <div className="select">
            <Radio
              name="size"
              color="neutral"
              value="S"
              checked={selectedSize === "S"}
              onChange={handleSizeChange}
              id="s"
            />
            <label
              htmlFor="s"
              className={selectedSize === "S" ? "selected" : ""}
            >
              S
            </label>
          </div>

          <div className="select">
            <Radio
              name="size"
              color="neutral"
              value="M"
              checked={selectedSize === "M"}
              onChange={handleSizeChange}
              id="m"
            />
            <label
              htmlFor="m"
              className={selectedSize === "M" ? "selected" : ""}
            >
              M
            </label>
          </div>

          <div className="select">
            <Radio
              name="size"
              color="neutral"
              value="SM"
              checked={selectedSize === "SM"}
              onChange={handleSizeChange}
              id="sm"
            />
            <label
              htmlFor="sm"
              className={selectedSize === "SM" ? "selected" : ""}
            >
              SM
            </label>
          </div>
        </form>
      </div>

      <div className="find-by-number-size">
        <h4>Nhập size: </h4>
        <form action="">
          <Input size="md" placeholder="Ví dụ 38, 40.... " />
          <button>Tìm kiếm</button>
        </form>
      </div>

      <div style={{ width: 300 }}>
        <Typography variant="h6" gutterBottom>
          Chọn giá tiền
        </Typography>
        <Slider
          value={value}
          onChange={handleChange}
          aria-label="Currency Slider"
          min={100} // Giá trị nhỏ nhất
          max={10000} // Giá trị lớn nhất
          step={100} // Bước tăng/giảm
          valueLabelDisplay="on" // Hiển thị giá trị
          marks={[
            { value: 1000, label: "1k" },
            { value: 5000, label: "5k" },
            { value: 10000, label: "10k" },
          ]}
        />
        <Typography variant="body1" style={{ marginTop: "20px" }}>
          Giá trị hiện tại: <strong>{formatCurrency(value)}</strong>
        </Typography>
      </div>

      {/* SHOP BY COLOR */}
      <div className="find-by-color">
        <h3>SHOP BY COLOR</h3>
        <div className="color-options">
          {colors.map((color) => (
            <div className="select-color" key={color.name}>
              <div
                className="color-box"
                style={{
                  backgroundColor: color.color,
                  border:
                    selectedColor === color.color
                      ? "2px solid black"
                      : "2px solid white", // Đổi đường viền khi chọn
                }}
                onClick={() => handleColorClick(color.color)} // Xử lý khi nhấp vào màu
              ></div>
              <div
                className="color-title"
                onClick={() => handleColorClick(color.color)} // Xử lý khi nhấp vào tên màu
                style={{
                  fontWeight: selectedColor === color.color ? "bold" : "normal", // Làm nổi bật tên khi chọn
                  color:
                    selectedColor === color.color
                      ? "black"
                      : "rgb(152, 146, 146)", // Nổi bật chữ khi chọn
                }}
              >
                <span>{color.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckBoxSizeColor;
