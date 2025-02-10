// Import các hàm cần thiết từ Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Cấu hình Firebase của bạn
const firebaseConfig = {
  apiKey: "AIzaSyDU9YK_u_XO2CL5TZEy9EJzjb_F4nnDQrM",
  authDomain: "c1023l1.firebaseapp.com",
  projectId: "c1023l1",
  storageBucket: "c1023l1.appspot.com",
  messagingSenderId: "741088283002",
  appId: "1:741088283002:web:11b2cbb4f6e6f4ca1e2ec3",
  measurementId: "G-FKQN1M6REE"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo các đối tượng Firebase cần thiết
const storage = getStorage(app);

// Export các đối tượng này để sử dụng ở nơi khác trong ứng dụng của bạn
export { storage };
