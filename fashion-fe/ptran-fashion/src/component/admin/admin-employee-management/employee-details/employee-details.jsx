import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Form, Container, Row, Col, Image } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import * as adminService from "../../../../service/admin-service/admin-service";
const formatDate = (dateString) => {
  // Giả sử dateString là chuỗi ISO hoặc định dạng hợp lệ mà JavaScript có thể hiểu
  const date = new Date(dateString);

  // Lấy ngày, tháng, năm
  const day = date.getDate().toString().padStart(2, "0"); // Đảm bảo luôn có 2 chữ số
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = date.getFullYear();

  // Trả về chuỗi định dạng dd/MM/yyyy
  return `${day}/${month}/${year}`;
};

const formatDates = (dateString) => {
  // Tạo đối tượng Date từ các giá trị này
  const year = parseInt(dateString[0], 10);
  const month = parseInt(dateString[1], 10) - 1; // tháng trong JavaScript bắt đầu từ 0 (0 = tháng 1)
  const day = parseInt(dateString[2], 10);
  const hours = parseInt(dateString[3], 10);
  const minutes = parseInt(dateString[4], 10);
  const seconds = parseInt(dateString[5], 10);

  // Tạo đối tượng Date
  const date = new Date(year, month, day, hours, minutes, seconds);

  // Định dạng lại ngày theo kiểu dễ đọc
  return date.toLocaleString(); // Bạn có thể thay đổi cách định dạng nếu cần
};

const UserProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    fullName: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    phone: "0123456789",
    address: "Hà Nội, Việt Nam",
    numberphone: "Nhân viên",
    username: "Phòng Kỹ thuật",
    isActive: "01/01/2023",
    createAt: "",
    gender: true,
    birthday: "22/12/2004",
    age: 12,
    imgUrl: "",
  });

  const location = useLocation();
  const { userId } = location.state || {};

  useEffect(() => {
    getInforemployee();
  }, []);

  const getInforemployee = async () => {
    await adminService.getInforEmployee(userId).then((data) => {
      console.log(data.data);
      
      setUserInfo(data.data)
      
    });
  };

  const handleEdit = () => {
    navigate("/admin/employee-update")
  };

  
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserInfo((prev) => ({
          ...prev,
          avatar: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleComeBack = () => {
    navigate("/admin/employee");
  };

  if (!userInfo) {
    return <p>Đang tải...</p>; // Hiển thị trạng thái đang tải
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={4} className="text-center">
          <div className="position-relative d-inline-block">
            {userInfo.imgUrl ? (
              <div className="image-detail">
                <Image
                  src={userInfo.imgUrl}
                  roundedCircle
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                  }}
                  onClick={() => window.open(userInfo.imgUrl, "_blank")}
                />
              </div>
            ) : (
              <div
                className="bg-secondary rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: "200px", height: "200px" }}
              >
                <FaUser size={100} color="white" />
              </div>
            )}
            {isEditing && (
              <div className="position-absolute bottom-0 end-0">
                <Form.Group>
                  <Form.Label className="btn btn-primary btn-sm rounded-circle">
                    <i className="fas fa-camera"></i>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      style={{ display: "none" }}
                    />
                  </Form.Label>
                </Form.Group>
              </div>
            )}
          </div>
        </Col>
      </Row>

      <h2 className="mb-4 text-center">{userInfo.username}</h2>

      {!isEditing ? (
        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          {/* "Họ và tên",
            "Giới tính",
            "Tuổi",
            "Ngày sinh",
            "Email",
            "Số điện thoại",
            "Địa chỉ",
            "Trạng thái",
            "Ngày vào làm", */}
          <Row
            className="mb-3 align-items-center"
            style={{
              borderBottom: "1px solid #dee2e6",
              paddingBottom: "10px",
            }}
          >
            <Col sm={4} style={{ color: "#6c757d" }}>
              <strong>Họ và tên:</strong>
            </Col>
            <Col sm={8} style={{ color: "#2c3e50" }}>
              {userInfo.fullName}
            </Col>
          </Row>

          <Row
            className="mb-3 align-items-center"
            style={{
              borderBottom: "1px solid #dee2e6",
              paddingBottom: "10px",
            }}
          >
            <Col sm={4} style={{ color: "#6c757d" }}>
              <strong>Giới tính:</strong>
            </Col>
            <Col sm={8} style={{ color: "#2c3e50" }}>
              {userInfo.gender === true ? "Nam" : "Nữ"}
            </Col>
          </Row>

          <Row
            className="mb-3 align-items-center"
            style={{
              borderBottom: "1px solid #dee2e6",
              paddingBottom: "10px",
            }}
          >
            <Col sm={4} style={{ color: "#6c757d" }}>
              <strong>Ngày sinh:</strong>
            </Col>
            <Col sm={8} style={{ color: "#2c3e50" }}>
              {userInfo.birthday}
            </Col>
          </Row>

          <Row
            className="mb-3 align-items-center"
            style={{
              borderBottom: "1px solid #dee2e6",
              paddingBottom: "10px",
            }}
          >
            <Col sm={4} style={{ color: "#6c757d" }}>
              <strong>Email:</strong>
            </Col>
            <Col sm={8} style={{ color: "#2c3e50" }}>
              {userInfo.email}
            </Col>
          </Row>

          <Row
            className="mb-3 align-items-center"
            style={{
              borderBottom: "1px solid #dee2e6",
              paddingBottom: "10px",
            }}
          >
            <Col sm={4} style={{ color: "#6c757d" }}>
              <strong>Số điện thoại:</strong>
            </Col>
            <Col sm={8} style={{ color: "#2c3e50" }}>
              {userInfo.numberphone}
            </Col>
          </Row>

          <Row
            className="mb-3 align-items-center"
            style={{
              borderBottom: "1px solid #dee2e6",
              paddingBottom: "10px",
            }}
          >
            <Col sm={4} style={{ color: "#6c757d" }}>
              <strong>Địa chỉ:</strong>
            </Col>
            <Col sm={8} style={{ color: "#2c3e50" }}>
              {userInfo.address}
            </Col>
          </Row>

          <Row
            className="mb-3 align-items-center"
            style={{
              borderBottom: "1px solid #dee2e6",
              paddingBottom: "10px",
            }}
          >
            <Col sm={4} style={{ color: "#6c757d" }}>
              <strong>Trạng thái:</strong>
            </Col>
            <Col sm={8} style={{ color: "#2c3e50" }}>
              {userInfo.isActive ? "Nhân viên" : "Đã nghỉ"}
            </Col>
          </Row>

          <Row
            className="mb-3 align-items-center"
            style={{
              borderBottom: "1px solid #dee2e6",
              paddingBottom: "10px",
            }}
          >
            <Col sm={4} style={{ color: "#6c757d" }}>
              <strong>Ngày vào làm:</strong>
            </Col>
            <Col sm={8} style={{ color: "#2c3e50" }}>
              {formatDates(userInfo.createAt)}
            </Col>
          </Row>

          <div className="text-center btn-action mt-4">
              <Button variant="outlined" color="error" onClick={handleComeBack} style={{margin: "20px"}}>
                Quay về
              </Button>

              <Button variant="outlined" onClick={handleEdit}>
                Cập nhật thông tin
              </Button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default UserProfile;
