import Footer from "../../footer/footer";
import CheckBoxSizeColor from "../checkbox-size-color/checkbox-size-color";
import SelectCategories from "../select-option-categories/select-categories";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import CardProduct from "../../card-product/card-product";
import { Pagination } from "@mui/material";



const OrderProduct = () => {
  return (
    <div>
        <div className="order-product container">
      <div className="row">

        <div className=" col-lg-4 col-sm-12 col-md-5 mb-5">
          <CheckBoxSizeColor />
        </div>

        <div className="col-lg-8 col-sm-12 col-md-7 mb-5">

          <div className="row">
            <div className="col-lg-4">
                <CardProduct/>
            </div>

            <div className="col-lg-4">
                <CardProduct/>
            </div>

            <div className="col-lg-4">
                <CardProduct/>
            </div>

            <div className="col-lg-4">
                <CardProduct/>
            </div>

            <div className="col-lg-4">
                <CardProduct/>
            </div>

            <div className="col-lg-4">
                <CardProduct/>
            </div>
          </div>
        <Pagination count={10} variant="outlined" shape="rounded" />

        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default OrderProduct;
