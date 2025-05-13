import { faArrowLeft, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./verify-code.css";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as loginService from "./../../service/login-service";
import { faSpinner } from "@fortawesome/free-solid-svg-icons"; // Thêm import này
import * as userService from "./../../service/user-service";
import { Token } from '@mui/icons-material';
const VerifyCode = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const location = useLocation();
  const userDTO = location.state?.userDTO || {};
  const account = location.state.account  || {}; 
  const [showErrors, setShowErrors] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Thêm state cho thông báo thành công
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleChange = (e, index) => {
    const newCode = [...code];
    newCode[index] = e.target.value;
    setCode(newCode);

    if (e.target.value.length === 1 && index < 5) {
      document.getElementById(`code-input-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");

    try {
      const response = null;
      if (account) {
        response = await userService.updatePassword(token, account.newPassword,verificationCode);
      } else {
        response = await loginService.saveAfterCheck(
        userDTO,
        verificationCode
      );
      }
      if (!response.success) {
        setShowErrors(true);
        setError(response.data);
        setCode(["", "", "", "", "", ""]);
        document.getElementById("code-input-0").focus();
      } else {
        localStorage.setItem("token", response.data);
      }
      if (account) {
        navigate(-2)
      }else {
        navigate("/");
      }
    } catch (err) {
      console.error("Verification error:", err);
      setShowErrors(true);
      setError("An error occurred during verification");
    }
  };
  const [isResending, setIsResending] = useState(false); // Thêm state này cùng với các state khác
  const handleSendCodeAgain = async () => {
    try {
      setIsResending(true); // Bắt đầu hiển thị loading
      setShowErrors(false);
      setError("");
      setSuccessMessage("");

      const response = await loginService.sendCodeAgain(userDTO.email);
      console.log("email: ", userDTO.email);

      if (!response.success) {
        setShowErrors(true);
        setError(response.data);
      } else {
        setSuccessMessage(
          "New verification code has been sent to your email. Please check and enter the correct code."
        );

        // Tự động ẩn thông báo sau 5 giây
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      }
    } catch (err) {
      console.error("Resend code error:", err);
      setShowErrors(true);
      setError("Failed to resend verification code");
    } finally {
      setIsResending(false); // Kết thúc hiển thị loading dù có lỗi hay không
    }
  };

  return (
    <div className="verify-code">
      <img
        src="https://watermark.lovepik.com/photo/20211124/large/lovepik-fashion-womens-summer-shopping-image-picture_500961857.jpg"
        alt="background"
        className="background-image"
      />
      <form onSubmit={handleSubmit} className="form-verify-code">
        <Link onClick={() => navigate(-2)} className="back-link">
          <FontAwesomeIcon icon={faArrowLeft} /> Come back
        </Link>
        <div className="vc-title" style={{ color: "#00917b" }}>
          <FontAwesomeIcon icon={faEnvelope} />
          <h6>VERIFY YOUR EMAIL ADDRESS</h6>
        </div>

        <div className="vc-content">
          <div>
            <span>
              A verification code has been sent to <br />
              {userDTO?.email || "tranduonghuuxuan22@gmail.com"}
            </span>
          </div>

          <div>
            <p>
              Please check your inbox and enter the verification code below to
              verify your email address. Bạn có 5 lần để gửi mã nếu không email này sẽ bị chặn 10 phút rồi mới đăng nhập lại
            </p>
          </div>

          <div className="row">
            <div className="col-lg-4"></div>
            <div className="col-lg-4 code-inputs">
              {code.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  id={`code-input-${index}`}
                  maxLength="1"
                  value={value}
                  onChange={(e) => handleChange(e, index)}
                  className="verify-input"
                  style={{
                    borderColor: showErrors ? "#ff0000" : "#00917b",
                    color: "#00917b",
                    backgroundColor: showErrors ? "#fff0f0" : "white",
                  }}
                  autoFocus={index === 0}
                />
              ))}
            </div>
            <div className="col-lg-4"></div>
          </div>

          {/* Thông báo lỗi */}
          {showErrors && (
            <div
              className="error-message"
              style={{
                color: "#ff0000",
                backgroundColor: "#fff0f0",
                padding: "10px",
                borderRadius: "5px",
                margin: "15px 0",
                textAlign: "center",
                border: "1px solid #ff0000",
                fontWeight: "bold",
              }}
            >
              {error}
            </div>
          )}

          {/* Thông báo thành công khi gửi lại code */}
          {successMessage && (
            <div
              className="success-message"
              style={{
                color: "#00917b",
                backgroundColor: "#e6f7f0",
                padding: "10px",
                borderRadius: "5px",
                margin: "15px 0",
                textAlign: "center",
                border: "1px solid #00917b",
                fontWeight: "bold",
              }}
            >
              {successMessage}
            </div>
          )}

          <button
            type="submit"
            style={{
              backgroundColor: "#00917b",
              color: "white",
              border: "none",
              marginTop: "15px",
            }}
          >
            Verify
          </button>

          <div className="action-other">
            <button
              type="button"
              onClick={handleSendCodeAgain}
              className="action-link"
              style={{
                color: "#00917b",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
              disabled={isResending} // Vô hiệu hóa nút khi đang gửi
            >
              {isResending ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin />{" "}
                  {/* Biểu tượng xoay */}
                  Sending...
                </>
              ) : (
                "Resend Code"
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="action-link"
              style={{
                color: "#00917b",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Change Email
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VerifyCode;
