import * as React from "react";
import "./employee-management.css";
import * as AdminService from "../../../../service/admin-service/admin-service";
import { useState } from "react";
import { useEffect } from "react";
import { Table } from "react-bootstrap";
import { Button, Input, Pagination } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
// cắt chuỗi ngày tháng thành thời gian nhất định
const formatDate = (dateString) => {
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

const EmployeeManagemenet = () => {
  const [employees, setEmployees] = useState([]);
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const getAllEmploye = async () => {
    await AdminService.getAllUser(size, page).then((data) => {
      // Kiểm tra nếu data là mảng, nếu không thì gán mảng rỗng
      console.log(data);
      setEmployees(data);
    });
  };

  useEffect(() => {
    getAllEmploye();
    console.log(employees);
  }, [size, page]);

  if (!employees || employees.length === 0) {
    return <>Không có danh sách bài</>;
  }

  /**
   * Đây là hàm lấy id của employee rồi gửi đi xuống lấy thông tin của người dùng
   * @param {*} userId
   */
  const handleDetail = (userId) => {
    console.log(userId);
    navigate("/admin/employee-infor", { state: { userId: userId } });
    
  };

  const handleUpdate = (data) => {
    navigate("/admin/employee-update", { state: {data: data} });
  };

  const handleAdd = () => {
    navigate("/admin/employee-add")
  };

  const handleDelete = () => {
    
  }

  return (
    <div className="employee value-search">
      <h2>DANH SÁCH NHÂN VIÊN</h2>
      <div className="row">
        <div className="col-lg-4 col-4 col-sm-4 col-sm-3">
          <input
            type="text"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Tìm kiếm theo tên, tài khoản, email,SĐT"
          />
        </div>

        <div className="col-lg-3 col-sm-4 col-sm-3">
          <input
            type="date"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Tìm kiếm theo tên, tài khoản, email,SĐT"
          />
        </div>
        <button className="search-button col-lg-1 ">
          <FontAwesomeIcon icon={faSearch} />
          Tìm Kiếm
        </button>

        <button
          className="search-button col-lg-1 "
          onClick={() => handleAdd()}
        >
          <FontAwesomeIcon icon={faUserPlus} />
          Tạo mới
        </button>
        <div className="col-lg-2"></div>
      </div>
      <Table className="table-employee" striped bordered hover size="sm">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên Nhân viên</th>
            <th>Email</th>
            <th>SĐT</th>
            <th>Giới tính</th>
            <th>Ngày vào làm</th>
            <th>Tên tài khoản</th>
            <th>Xóa</th>
            <th>Cập Nhật</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((data, index) => (
              <tr
                className="tr-value-employee"
                key={data.id || index}
                onClick={() => handleDetail(data.userId)}
              >
                <td>{index + 1}</td>
                <td>{data.fullName}</td>
                <td>{data.email}</td>
                <td>{data.numberphone}</td>
                <td>{data.gender == true ? <div>Nam</div> : <div>Nữ</div>}</td>
                <td>{formatDate(data.createAt)}</td>
                <td>{data.username}</td>
                <td>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "red",
                      "&:hover": { backgroundColor: "darkred" },
                    }}
                    onClick={(event) => {
                      event.stopPropagation();
                      
                    }}
                  >
                    Xóa
                  </Button>
                </td>
                <td>
                  <Button
                    variant="contained"
                    
                    onClick={(event) => {
                      event.stopPropagation();
                      handleUpdate(data.userId)
                    }}
                  >
                    Cập Nhật
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9  " style={{ textAlign: "center" }}>
                KHÔNG CÓ NHÂN VIÊN NÀO
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Pagination
        count={10}
        variant="outlined"
        shape="rounded"
        className="paginization"
      />
    </div>
  );
};

export default EmployeeManagemenet;
