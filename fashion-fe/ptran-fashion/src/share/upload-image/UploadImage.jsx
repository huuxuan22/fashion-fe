import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./../../config/firebase-config"; // Đảm bảo import đúng đường dẫn
import "./UploadImage.css"; // Import file CSS
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import * as AdminService from "./../../service/admin-service/admin-service";
import CustomToast from "../announcement/announcement-successfull";
import { Toast } from "react-bootstrap";

const UploadImage = () => {
  const [avatar, setAvatar] = useState(null); // Lưu file ảnh
  const [progress, setProgress] = useState(0); // Tiến độ upload
  const [loading, setLoading] = useState(false); // Trạng thái tải ảnh
  const [downloadURL, setDownloadURL] = useState(""); // URL của ảnh sau khi upload
  const [open, setOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const location = useLocation();
  const { numberphone } = location.state || {};
  console.log(numberphone);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  const handleUpload = () => {
    if (!avatar) {
      alert("Vui lòng chọn ảnh trước khi upload!");
      return;
    }

    const storageRef = ref(storage, `user/employee/${avatar.name}`);
    const uploadTask = uploadBytesResumable(storageRef, avatar);

    setLoading(true);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.error("Upload failed:", error);
        setLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setDownloadURL(url);
          setLoading(false);

          AdminService.uploadImageEmployee(url, numberphone)
            .then(() => {
              setShowToast(true); // Hiển thị Toast sau khi upload thành công
              setTimeout(() => {
                navigate("/admin/employee"); // Chuyển trang sau khi Toast biến mất
              }, 4000);
            })
            .catch((error) => {
              console.error("Error uploading image:", error);
            });
        });
      }
    );
  };

  return (
    <div className="upload-container">
      <CustomToast
        message="*Bạn đã thêm mới 1 nhân viên"
        duration={4000}
        onClose={() => setShowToast(false)}
        show={showToast} // Điều khiển hiển thị Toast
      />
      <h2>Chọn hình ảnh của nhân viên</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
      <div>
        {loading && <p>Progress: {progress}%</p>}
        {downloadURL && (
          <div>
            <p>Upload thành công!</p>
            <img src={downloadURL} alt="Uploaded Image" width="300" />
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadImage;
