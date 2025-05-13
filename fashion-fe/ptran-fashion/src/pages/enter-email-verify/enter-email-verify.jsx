import { useForm } from "react-hook-form";
import "./enter-email-verify.css";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation } from "react-router-dom";
const EnterEmailVerify = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("*You haven't entered the correct email format")
      .required("*You haven't entered your email"),
  });
  const location = useLocation();
  const { account } = location.state || {}; // Lấy email từ state nếu có
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = () => {
    alert("hello con chóa");
  };
  return (
    <div className="enter-email-verify">
      <img
        src="https://watermark.lovepik.com/photo/20211124/large/lovepik-fashion-womens-summer-shopping-image-picture_500961857.jpg"
        alt="background"
        className="background-image"
      />
      <div className="form-enter-email-verify">
        <h1>PTRAN-FASHION</h1>
        <p>Fill email for verify code</p>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Email for check"
              {...register("email")}
            />
            {errors.email && (
              <div className="error-message">
                <p>{errors.email.message}</p>
              </div>
            )}
          <button>Check</button>

          </form>
        </div>
      </div>
    </div>
  );
};
export default EnterEmailVerify;
