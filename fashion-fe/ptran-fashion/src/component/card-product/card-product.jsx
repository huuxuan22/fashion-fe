import { faCircleInfo, faHeart, faShoppingCart,faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CardProduct = () => {
    return (
        <div className="card-product">
                <div className="col-lg-12 card-new-product">
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
        </div>
    )
}

export default CardProduct;