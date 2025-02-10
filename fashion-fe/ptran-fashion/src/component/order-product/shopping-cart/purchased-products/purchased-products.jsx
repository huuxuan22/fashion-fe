import { faBagShopping, faCartShopping, faCreditCard, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "./purchased-products.css"
const PurchasedProduct = () => {
  
  return (
    <div className="product-row ">
      <div className="product-checkbox">
        <input type="checkbox" />
      </div>
      <div className="product-image">
        <img
          src="https://th.bing.com/th/id/OIP.PRSVIp0-FbPm-0AIkVRqEgHaHa?rs=1&pid=ImgDetMain"
          alt="Giày đốc nam"
        />
      </div>
      <div className="product-info">
        <h4>Giày đốc nam da mềm, đế cao k hầu dễ thanh lịch</h4>
        <p>Flash Sale kết thúc lúc 20:59:59</p>
        <div className="product-options">
          <span>Phân Loại Hàng:</span>
          <select>
            <option>Mũi tròn có cao, 43</option>
          </select>
        </div>
      </div>
      <div className="product-price">
        <span className="original-price">₫350.000</span>
        <span className="current-price">₫179.000</span>
      </div>
      <div className="product-quantity">
        <button>-</button>
        <input type="text" value="1" readOnly />
        <button>+</button>
      </div>
      <div className="product-actions">
        <div>
            <button className="add-to-cart-button">
            <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />
            <span>Thêm vào giỏ hàng</span>
            </button>
        </div>
        <div>
            <FontAwesomeIcon icon={faBagShopping} className="buy-icon" />
            <span>Mua ngay</span>
        </div>
    </div>

      <div className="shipping-info">
        <span>Đơn vị vận chuyển: Giao hàng nhanh</span>
      </div>
    </div>
  );
};

export default PurchasedProduct;
