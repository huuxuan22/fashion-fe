import { faArrowLeft, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./verify-code.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const VerifyCode = () => {
  const [code, setCode] = useState(["", "", "", "", ""]); // Mảng để lưu trữ giá trị của từng ô input

  const handleChange = (e, index) => {
    const newCode = [...code];
    newCode[index] = e.target.value; // Cập nhật giá trị của ký tự tại vị trí tương ứng
    setCode(newCode);

    // Chuyển đến ô input kế tiếp khi nhập xong 1 ký tự
    if (e.target.value.length === 1 && index < 4) {
      document.getElementById(`code-input-${index + 1}`).focus();
    }
  };

  return (
    <div className="verify-code">
      <img
        src="https://watermark.lovepik.com/photo/20211124/large/lovepik-fashion-womens-summer-shopping-image-picture_500961857.jpg"
        alt="background"
        className="background-image"
      />
      <div className="form-verify-code">
        <Link to="/" className="vc-back-link">
          <FontAwesomeIcon icon={faArrowLeft} /> Come back
        </Link>
        <div className="vc-title">
          <FontAwesomeIcon icon={faEnvelope} />
          <h6>VERIFY YOUR EMAIL ADDRESS</h6>
        </div>

        <div className="vc-content">
          <div>
            <span>
              A verification code has been sent to <br />
              tranduonghuuxuan22@gmail.com
            </span>
          </div>

          <div>
            <p>
              Please check your inbox and enter the verification code below to
              verify your email address. The code will expire in 14:48.
            </p>
          </div>

          <div className="row">
            <div className="col-lg-4"></div>
            <div className="col-lg-4 code-inputs ">
              {code.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  id={`code-input-${index}`}
                  maxLength="1"
                  value={value}
                  onChange={(e) => handleChange(e, index)}
                  className="verify-input"
                  autoFocus={index === 0}
                />
              ))}
            </div>
            <div className="col-lg-4"></div>
          </div>

          <button type="submit">Verify</button>

          <div className="action-other">
            <Link to="#" className="action-link">
              Resend Code
            </Link>
            <Link to="#" className="action-link">
              Change Email
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
