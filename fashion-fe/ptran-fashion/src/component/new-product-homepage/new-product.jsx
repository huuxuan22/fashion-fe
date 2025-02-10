import {Link} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faHeart, faShoppingCart, faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'; // Biểu tượng đầy
import  "./new-product-header.css";
import Footer from "../footer/footer";
import SelectCategories from "../order-product/select-option-categories/select-categories";
const NewProductHeader = () => {

    return (
         <div>
            <SelectCategories/>
            <div className="new-product">
            <div className="row">
                <div className="col-lg-1">
                </div>

                <div className=" col-sm-12 col-md-2  col-lg-2 title-new-product">
                    <p> New Product</p>
                </div>

                <div className=" col-sm-12 col-md-10 col-lg-8  menu-select-categories">
                    
                    <div className="categories-product-select">
                        <ul>
                            <li><Link href="">All</Link></li>
                            <li><Link href="">Man</Link></li>
                            <li><Link href="">Children</Link></li>
                            <li><Link href="">Women's</Link></li>
                            <li><Link href="">Shoe</Link></li>
                            <li><Link href="">Child</Link></li>
                            <li><Link href="">Cosmetics</Link></li>
                        </ul>
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="col-1 "></div>
                <div className="col-md-12 col-sm-12 col-lg-10 ">
                    <div className="row">
                    <div className="col-lg-3 col-sm-6 col-md-6 card-new-product">
                        <div className="card-img">
                            <img 
                                src="https://www.bing.com/th?id=OIP.KgMZg7k2Wks0xR1yjVbwnQHaLG&w=150&h=225&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=3.1&rm=2"
                                alt="Quần Áo đi biển"
                            />
                            <div className="icon-header-select">
                                <div className="icon-heart">
                                    <FontAwesomeIcon icon={faHeart} />
                                </div>
                                <div className="icon-shopping-cart">
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                </div>
                                <div className="icon-info">
                                    <FontAwesomeIcon icon={faCircleInfo} />
                                </div>
                            </div>
                        </div>
                        <div className="card-new-product-title"><p>Quần Áo đi biển</p></div>
                        <div className="icons-stars">
                            <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '17px', fontFamily: "'Times New Roman', Times, serif", color: 'gold' }} />
                            <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '17px', fontFamily: "'Times New Roman', Times, serif", color: 'gold' }} />
                            <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '17px', fontFamily: "'Times New Roman', Times, serif", color: 'gold' }} />
                            <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '17px', fontFamily: "'Times New Roman', Times, serif", color: 'gold' }} />
                            <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '17px', fontFamily: "'Times New Roman', Times, serif", color: 'gold' }} />
                        </div>
                        <div className="card-new-product-price"><p>$35 dolar</p></div>
                    </div>



                    <div className="col-lg-3 col-sm-6 col-md-6 card-new-product">
                        <div className="card-img">
                            <img 
                                src="https://www.bing.com/th?id=OIP.KgMZg7k2Wks0xR1yjVbwnQHaLG&w=150&h=225&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=3.1&rm=2"
                                alt="Quần Áo đi biển"
                            />
                            <div className="icon-header-select">
                                <div className="icon-heart">
                                    <FontAwesomeIcon icon={faHeart} />
                                </div>
                                <div className="icon-shopping-cart">
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                </div>
                                <div className="icon-info">
                                    <FontAwesomeIcon icon={faCircleInfo} />
                                </div>
                            </div>
                        </div>
                        <div className="card-new-product-title"><p>Quần Áo đi biển</p></div>
                        <div className="icons-stars">
                            <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '17px', fontFamily: "'Times New Roman', Times, serif", color: 'gold' }} />
                            <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '17px', fontFamily: "'Times New Roman', Times, serif", color: 'gold' }} />
                            <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '17px', fontFamily: "'Times New Roman', Times, serif", color: 'gold' }} />
                            <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '17px', fontFamily: "'Times New Roman', Times, serif", color: 'gold' }} />
                            <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '17px', fontFamily: "'Times New Roman', Times, serif", color: 'gold' }} />
                        </div>
                        <div className="card-new-product-price"><p>$35 dolar</p></div>
                    </div>


                    <div className="col-lg-3 col-sm-6 col-md-6 card-new-product">
                        <div className="card-img">
                            <img 
                                src="https://www.bing.com/th?id=OIP.KgMZg7k2Wks0xR1yjVbwnQHaLG&w=150&h=225&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=3.1&rm=2"
                                alt="Quần Áo đi biển"
                            />
                            <div className="icon-header-select">
                                <div className="icon-heart">
                                    <FontAwesomeIcon icon={faHeart} />
                                </div>
                                <div className="icon-shopping-cart">
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                </div>
                                <div className="icon-info">
                                    <FontAwesomeIcon icon={faCircleInfo} />
                                </div>
                            </div>
                        </div>
                        <div className="card-new-product-title"><p>Quần Áo đi biển</p></div>
                        <div className="icons-stars">
                            <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '17px', fontFamily: "'Times New Roman', Times, serif", color: 'gold' }} />
                            <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '17px', fontFamily: "'Times New Roman', Times, serif", color: 'gold' }} />
                            <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '17px', fontFamily: "'Times New Roman', Times, serif", color: 'gold' }} />
                            <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '17px', fontFamily: "'Times New Roman', Times, serif", color: 'gold' }} />
                            <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '17px', fontFamily: "'Times New Roman', Times, serif", color: 'gold' }} />
                        </div>
                        <div className="card-new-product-price"><p>$35 dolar</p></div>
                    </div>

                    <div className="col-lg-3 col-sm-6 col-md-6 card-new-product">
                        <div className="card-img">
                            <img 
                                src="https://www.bing.com/th?id=OIP.KgMZg7k2Wks0xR1yjVbwnQHaLG&w=150&h=225&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=3.1&rm=2"
                                alt="Quần Áo đi biển"
                            />
                            <div className="icon-header-select">
                                <div className="icon-heart">
                                    <FontAwesomeIcon icon={faHeart} />
                                </div>
                                <div className="icon-shopping-cart">
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                </div>
                                <div className="icon-info">
                                    <FontAwesomeIcon icon={faCircleInfo} />
                                </div>
                            </div>
                        </div>
                        <div className="card-new-product-title"><p>Quần Áo đi biển</p></div>
                        <div className="icons-stars">
                                <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }}/>
                                <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }} />
                                <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }} />
                                <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }} />
                                <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }} />
                        </div>
                        <div className="card-new-product-price"><p>$35 dolar</p></div>
                    </div>

                    </div>
                </div>
                <div className="col-1 col-lg-1"></div>
        </div>
        </div>
        <Footer/>
         </div>
    )
}

export default NewProductHeader;