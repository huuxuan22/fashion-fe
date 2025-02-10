import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import anhKhuyenMai from "./../../img/anh-khuyen-mai.jpg"
import "./navbar-header.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const NavbarHeader = () => {
    return (
        <div style={{ width: '100%', margin: 'auto', paddingTop: '0px' }}>
            <Swiper
                modules={[Navigation, Pagination]}
                
                pagination={{ clickable: true }}
                loop={true}
                spaceBetween={30}
                slidesPerView={1}
            >
                {/* Các slide */}
                <SwiperSlide>
                    <img
                        src="https://th.bing.com/th/id/OIP.8DX5BqYklO_cj5sVuiR__gHaD4?w=319&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                        alt="Slide 1"
                        style={{ width: '100%',height: '800px', borderRadius: '10px' }}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src={anhKhuyenMai}
                        alt="Slide 2"
                        style={{ width: '100%',height: '700px', borderRadius: '10px' }}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="https://th.bing.com/th/id/OIP.NeimtCeSTRTj8TZfNon7-gHaE7?w=241&h=181&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                        alt="Slide 3"
                        style={{ width: '100%',height: '600px', borderRadius: '10px' }}
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default NavbarHeader;
