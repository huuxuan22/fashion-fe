import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faHeart, faShoppingCart, faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'; // Biểu tượng đầy
import "./feature-content.css"

const FeatureContent = () => {
    return (
        <div className="content-sections">
            <div className="row">
                <div className="col-1 "></div>

                <div className="col-10 col-sm-12 col-md-10 col-lg-10 col-xl-10">
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-4 hot-trends">
                            <h3>HOT TREND</h3>
                            <div className="row card-hot-trend">
                                <div className="col-5 hot-trend-img">
                                    <img src="https://www.bing.com/th?id=OIP.DDWc3Trj-G5db9Ny8kOnxgHaHa&w=150&h=150&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=3.1&rm=2" alt="" />
                                </div>
                                <div className="col-7">
                                    <div className="hot-trend-title"><p>Chain bucket</p></div>
                                    <div className="hot-trend-icons-stars">
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }}/>
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }} />
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }} />
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }} />
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }} />
                                    </div>
                                    <div className="hot-trends-price">
                                        <p>$35</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row card-hot-trend">
                                <div className="col-5 hot-trend-img">
                                    <img src="https://www.bing.com/th?id=OIP.DDWc3Trj-G5db9Ny8kOnxgHaHa&w=150&h=150&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=3.1&rm=2" alt="" />
                                </div>
                                <div className="col-7">
                                    <div className="hot-trend-title"><p>Chain bucket</p></div>
                                    <div className="hot-trend-icons-stars">
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }}/>
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }} />
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }} />
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }} />
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }} />
                                    </div>
                                    <div className="hot-trends-price">
                                        <p>$35</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row card-hot-trend">
                                <div className="col-5 hot-trend-img">
                                    <img src="https://www.bing.com/th?id=OIP.DDWc3Trj-G5db9Ny8kOnxgHaHa&w=150&h=150&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=3.1&rm=2" alt="" />
                                </div>
                                <div className="col-7">
                                    <div className="hot-trend-title"><p>Chain bucket</p></div>
                                    <div className="hot-trend-icons-stars">
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }}/>
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }} />
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }} />
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }} />
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }} />
                                    </div>
                                    <div className="hot-trends-price">
                                        <p>$35</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className=" col-sm-12 col-md-12 col-sm-12 col-lg-4 best-seller">
                            <h3>BEST SELLER</h3>
                            <div className="row card-hot-trend">
                                <div className="col-5 hot-trend-img">
                                    <img src="https://www.bing.com/th?id=OIP.DDWc3Trj-G5db9Ny8kOnxgHaHa&w=150&h=150&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=3.1&rm=2" alt="" />
                                </div>
                                <div className="col-7">
                                    <div className="hot-trend-title"><p>Chain bucket</p></div>
                                    <div className="hot-trend-icons-stars">
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }}/>
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }} />
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }} />
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }} />
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }} />
                                    </div>
                                    <div className="hot-trends-price">
                                        <p>$35</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row card-hot-trend">
                                <div className="col-5 hot-trend-img">
                                    <img src="https://www.bing.com/th?id=OIP.DDWc3Trj-G5db9Ny8kOnxgHaHa&w=150&h=150&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=3.1&rm=2" alt="" />
                                </div>
                                <div className="col-7">
                                    <div className="hot-trend-title"><p>Chain bucket</p></div>
                                    <div className="hot-trend-icons-stars">
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }}/>
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }} />
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }} />
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }} />
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }} />
                                    </div>
                                    <div className="hot-trends-price">
                                        <p>$35</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row card-hot-trend">
                                <div className="col-5 hot-trend-img">
                                    <img src="https://www.bing.com/th?id=OIP.DDWc3Trj-G5db9Ny8kOnxgHaHa&w=150&h=150&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=3.1&rm=2" alt="" />
                                </div>
                                <div className="col-7">
                                    <div className="hot-trend-title"><p>Chain bucket</p></div>
                                    <div className="hot-trend-icons-stars">
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }}/>
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }} />
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }} />
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }} />
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }} />
                                    </div>
                                    <div className="hot-trends-price">
                                        <p>$35</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className=" col-sm-12 col-md-12 col-lg-4  feature">
                            <h3>FEATURE</h3>
                            <div className="row card-hot-trend">
                                <div className="col-5 hot-trend-img">
                                    <img src="https://www.bing.com/th?id=OIP.DDWc3Trj-G5db9Ny8kOnxgHaHa&w=150&h=150&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=3.1&rm=2" alt="" />
                                </div>
                                <div className="col-7">
                                    <div className="hot-trend-title"><p>Chain bucket</p></div>
                                    <div className="hot-trend-icons-stars">
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }}/>
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }} />
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }} />
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }} />
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }} />
                                    </div>
                                    <div className="hot-trends-price">
                                        <p>$35</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row card-hot-trend">
                                <div className="col-5 hot-trend-img">
                                    <img src="https://www.bing.com/th?id=OIP.DDWc3Trj-G5db9Ny8kOnxgHaHa&w=150&h=150&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=3.1&rm=2" alt="" />
                                </div>
                                <div className="col-7">
                                    <div className="hot-trend-title"><p>Chain bucket</p></div>
                                    <div className="hot-trend-icons-stars">
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }}/>
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }} />
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }} />
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }} />
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }} />
                                    </div>
                                    <div className="hot-trends-price">
                                        <p>$35</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row card-hot-trend">
                                <div className="col-5 hot-trend-img">
                                    <img src="https://www.bing.com/th?id=OIP.DDWc3Trj-G5db9Ny8kOnxgHaHa&w=150&h=150&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=3.1&rm=2" alt="" />
                                </div>
                                <div className="col-7">
                                    <div className="hot-trend-title"><p>Chain bucket</p></div>
                                    <div className="hot-trend-icons-stars">
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }}/>
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }} />
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }} />
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }} />
                                        <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '12px', fontFamily: "'Times New Roman', Times, serif", color: 'rgb(242, 195, 8)' }} />
                                    </div>
                                    <div className="hot-trends-price">
                                        <p>$35</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-1"></div>
            </div>
        </div>
    )
}
export default FeatureContent;