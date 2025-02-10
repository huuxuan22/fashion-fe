import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { List, ListItem, ListItemText, Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // Icon để mở rộng
import ExpandLessIcon from "@mui/icons-material/ExpandLess"; // Icon để thu nhỏ
import "./doashbar-admin.css"
const DoashbarAmin = () => {
  // Tạo state cho từng mục điều hướng
  const [openEmployees, setOpenEmployees] = useState(false);
  const [openCustomer, setOpenCustomer] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [openOrders, setOpenOrders] = useState(false);
  const [openStoreHouse, setOpenStoreHouse] = useState(false);
  const [openPromotion, setOpenPromotion] = useState(false);
  const [openTurnover, setOpenTurnover] = useState(false);

  // Hàm xử lý click thay đổi trạng thái của mỗi mục
  const handleClick = (menu) => {
    switch (menu) {
      case "Nhân viên":
        setOpenEmployees(!openEmployees);
        break;
      case "Khách hàng":
        setOpenCustomer(!openCustomer);
        break;
      case "Sản phẩm":
        setOpenProduct(!openProduct);
        break;
      case "Đơn hàng":
        setOpenOrders(!openOrders);
        break;
      case "Kho":
        setOpenStoreHouse(!openStoreHouse);
        break;
      case "Doanh thu":
        setOpenTurnover(!openTurnover);
        break;
      case "Khuyến mãi":
        setOpenPromotion(!openPromotion);
        break;
      default:
        break;
    }
  };

  return (
    <div className="admin">
      <div className="sidebar">
        <div >
          <List>
          
            {/* ==============================NHÂN VIÊN======================================== */}
            <ListItem button onClick={() => handleClick("Nhân viên")}>
              <ListItemText primary="Quản lý Nhân viên" />
              {openEmployees ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItem>

            <Collapse in={openEmployees} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button component={Link} to="employee">
                  <ListItemText
                    primary="DOANH SÁCH NHÂN VIÊN"
                    style={{ paddingLeft: 20 }}
                  />
                </ListItem>
                <ListItem button component={Link} to="absence">
                  <ListItemText
                    primary="YÊU CẦU VẮNG NGHỈ"
                    style={{ paddingLeft: 20 }}
                  />
                </ListItem>

                <ListItem button component={Link} to="salary">
                  <ListItemText
                    primary="QUẢN LÝ LƯƠNG ĐÃI NGỘ"
                    style={{ paddingLeft: 20 }}
                  />
                </ListItem>

                <ListItem button component={Link} to="time">
                  <ListItemText
                    primary="CHẤM CÔNG NHÂN VIÊN"
                    style={{ paddingLeft: 20 }}
                  />
                </ListItem>
              </List>
            </Collapse>

            {/* ============================================================================== */}

            {/* ==================================KHÁCH HÀNG =================================*/}
            <ListItem button onClick={() => handleClick("Khách hàng")}>
              <ListItemText primary="Quản lý Khách Hàng" />
              {openCustomer ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItem>
            <Collapse in={openCustomer} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button component={Link} to="/employees/add">
                  <ListItemText
                    primary="DOANH SÁCH KHÁCH HÀNG"
                    style={{ paddingLeft: 30 }}
                  />
                </ListItem>

                <ListItem button component={Link} to="/employees/add">
                  <ListItemText
                    primary="LỊCH SỬ MUA HÀNG"
                    style={{ paddingLeft: 30 }}
                  />
                </ListItem>
                <ListItem button component={Link} to="/employees/list">
                  <ListItemText
                    primary="ĐIỂM THƯỞNG ƯU ĐÃI"
                    style={{ paddingLeft: 30 }}
                  />
                </ListItem>

                <ListItem button component={Link} to="/employees/list">
                  <ListItemText
                    primary="BẢO MẬT KHÁCH HÀNG"
                    style={{ paddingLeft: 30 }}
                  />
                </ListItem>
              </List>
            </Collapse>
            {/* ================================================================================ */}

            {/* ====================================SẢN PHẨM======================================= */}
            <ListItem button onClick={() => handleClick("Sản phẩm")}>
              <ListItemText primary="Quản lý Sản Phẩm" />
              {openProduct ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItem>

            <Collapse in={openProduct} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button component={Link} to="/employees/add">
                  <ListItemText
                    primary="CRUD SẢN PHẨM"
                    style={{ paddingLeft: 30 }}
                  />
                </ListItem>

                <ListItem button component={Link} to="/employees/list">
                  <ListItemText
                    primary="DANH MỤC SẢN PHẨM"
                    style={{ paddingLeft: 30 }}
                  />
                </ListItem>

                <ListItem button component={Link} to="/employees/list">
                  <ListItemText
                    primary="SẢN PHẨM TỒN KHO"
                    style={{ paddingLeft: 30 }}
                  />
                </ListItem>

                <ListItem button component={Link} to="/employees/list">
                  <ListItemText
                    primary="DOANH MỤC HÌNH ẢNH"
                    style={{ paddingLeft: 30 }}
                  />
                </ListItem>
              </List>
            </Collapse>

            {/* ================================================================================ */}

            <ListItem button onClick={() => handleClick("Đơn hàng")}>
              <ListItemText primary="Quản lý Đơn Hàng" />
              {openOrders ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItem>

            <ListItem button onClick={() => handleClick("Kho")}>
              <ListItemText primary="Quản lý Kho" />
              {openStoreHouse ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItem>

            <ListItem button onClick={() => handleClick("Doanh thu")}>
              <ListItemText primary="Quản lý Doanh Thu" />
              {openTurnover ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItem>

            <ListItem button onClick={() => handleClick("Khuyến mãi")}>
              <ListItemText primary="Chương trình Khuyến Mãi" />
              {openPromotion ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItem>

            {/* Các phần collapse cho các mục khác, ví dụ quản lý Doanh Thu */}
            <Collapse in={openTurnover} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button component={Link} to="/turnover/details">
                  <ListItemText
                    primary="Chi tiết Doanh Thu"
                    style={{ paddingLeft: 30 }}
                  />
                </ListItem>
              </List>
            </Collapse>
          </List>
        </div>
      </div>


      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default DoashbarAmin;
