import { useState } from "react";
import "./shopping-carrt.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
import { Button, Pagination } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import Footer from "../../footer/footer";
import PurchasedProduct from "./purchased-products/purchased-products";

const ShoppingCart = () => {
  const [count, setCount] = useState(1);

  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => {
    if (count > 1) setCount(count - 1);
  };
  return (
    <div className="shopping-cart ">
      <div className="container mb-5">
        <div className="row ">
          <div className="col-11 ">
            <table className="table ">
              <thead>
                <tr>
                  <th scope="col">SHOP NOW</th>
                  <th scope="col">PRODUCT</th>
                  <th scope="col">PRICE</th>
                  <th scope="col">QUALITY</th>
                  <th scope="col">TOTAL</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <div className="sc-infor-product">
                      <input type="checkbox" />
                      <div className="sc-infor-product-img">
                        <img
                          src="https://th.bing.com/th/id/R.327d37ec89dd077e6398c2a4c332aac5?rik=nsYR6xwo1%2b2MAw&pid=ImgRaw&r=0"
                          alt=""
                        />
                      </div>
                    </div>
                  </th>
                  <td>Mark</td>
                  <td>
                    <div className="counter">
                      <button className="btn" onClick={handleDecrement}>
                        -
                      </button>
                      <span className="count">{count}</span>
                      <button className="btn" onClick={handleIncrement}>
                        +
                      </button>
                    </div>
                  </td>
                  <td>@mdo</td>
                  <td>$ 35.00</td>
                  <td className="delete-sc">
                    <div className="delete-similar-product">
                      <FontAwesomeIcon icon={faTrash} className="trash-icon" />
                    </div>
                    <div className="search-similar-product">
                      <FontAwesomeIcon
                        icon={faSearch}
                        className="search-icon"
                      />
                      <span>Find Similar Products</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <th scope="row">
                    <div className="sc-infor-product">
                      <input type="checkbox" />
                      <div className="sc-infor-product-img">
                        <img
                          src="https://th.bing.com/th/id/R.327d37ec89dd077e6398c2a4c332aac5?rik=nsYR6xwo1%2b2MAw&pid=ImgRaw&r=0"
                          alt=""
                        />
                      </div>
                    </div>
                  </th>
                  <td>Mark</td>
                  <td>
                    <div className="counter">
                      <button className="btn" onClick={handleDecrement}>
                        -
                      </button>
                      <span className="count">{count}</span>
                      <button className="btn" onClick={handleIncrement}>
                        +
                      </button>
                    </div>
                  </td>
                  <td>@mdo</td>
                  <td>$ 35.00</td>
                  <td>
                    <div className="delete-similar-product">
                      <FontAwesomeIcon icon={faTrash} className="trash-icon" />
                    </div>
                    <div className="search-similar-product">
                      <FontAwesomeIcon
                        icon={faSearch}
                        className="search-icon"
                      />
                      <span>Find Similar Products</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <div className="sc-infor-product">
                      <input type="checkbox" />
                      <div className="sc-infor-product-img">
                        <img
                          src="https://th.bing.com/th/id/R.327d37ec89dd077e6398c2a4c332aac5?rik=nsYR6xwo1%2b2MAw&pid=ImgRaw&r=0"
                          alt=""
                        />
                      </div>
                    </div>
                  </th>
                  <td>Mark</td>
                  <td>
                    <div className="counter">
                      <button className="btn" onClick={handleDecrement}>
                        -
                      </button>
                      <span className="count">{count}</span>
                      <button className="btn" onClick={handleIncrement}>
                        +
                      </button>
                    </div>
                  </td>
                  <td>@mdo</td>
                  <td>$ 35.00</td>
                  <td>
                    <div className="delete-similar-product">
                      <FontAwesomeIcon icon={faTrash} className="trash-icon" />
                    </div>
                    <div className="search-similar-product">
                      <FontAwesomeIcon
                        icon={faSearch}
                        className="search-icon"
                      />
                      <span>Find Similar Products</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-2">
            <Link>
              <Button variant="contained">CONTINUE SHOPPING</Button>
            </Link>
          </div>

          <div className="col-2">
            <Link to="hello">
              {" "}
              <Button variant="contained">UPDATE CART</Button>
            </Link>
          </div>
        </div>

        <div className="row mb-3 discount-total">
          <div className="col-lg-5">
            <div className="discount-code">
              <label className="discount-label">DISCOUNT CODES</label>
              <div className="discount-input-container">
                <input
                  type="text"
                  className="discount-input"
                  placeholder="Enter your coupon code"
                />
                <button className="discount-button">APPLY</button>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
              <div className="cart-total mb-3">
                <h3>CART TOTAL</h3>
                <div className="subtotal">
                  <span>Subtotal</span>
                  <span className="price">$ 750.0</span>
                </div>
                <div className="total">
                  <span>Total</span>
                  <span className="price">$ 750.0</span>
                </div>
                <button className="checkout-btn">PROCEED TO CHECKOUT</button>
              </div>
            </div>
        </div>

        <div className="purchard-product row">
          <h3>Sản phẩm của bạn đã mua</h3>
          <PurchasedProduct />
          <div className="col-lg-12 col-sm-12 ">
            <Pagination
              count={10}
              variant="outlined"
              className="pagination"
              shape="rounded"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default ShoppingCart;
