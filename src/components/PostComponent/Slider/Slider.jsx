import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import styled from "styled-components";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import "./slider.css";
const Img = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: scale-down;
`;
function Slider() {
  return (
    <div>
      <Swiper
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
      >
        <SwiperSlide>
          <Img src={"https://source.unsplash.com/random?nature"} />
        </SwiperSlide>
        <SwiperSlide>
          <Img src={"https://source.unsplash.com/random?animal"} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Slider;
