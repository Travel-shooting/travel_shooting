import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import styled from 'styled-components';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import './slider.css';
const Img = styled.img`
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
`;

function Slider({ postImage }) {
  return (
    <div>
      <Swiper
        slidesPerView={1}
        pagination={{
          clickable: true
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
      >
        {postImage.map((image, i) => (
          <SwiperSlide key={i}>
            <Img src={image} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Slider;
