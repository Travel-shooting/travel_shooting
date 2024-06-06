import { Swiper, SwiperSlide } from 'swiper/react';
import styled from 'styled-components';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import './slider.css';
import prevButtonImage from '../../../styles/images/arrow-left.png';
import nextButtonImage from '../../../styles/images/arrow-right.png';

const NavigationButton = styled.div`
  background-size: cover;
  border: none;
  width: 50px; // 버튼 크기 조절
  height: 50px; // 버튼 크기 조절
  cursor: pointer;
`;

const PrevButton = styled(NavigationButton)`
  background-image: url(${prevButtonImage});
`;

const NextButton = styled(NavigationButton)`
  background-image: url(${nextButtonImage});
`;

const Img = styled.img`
  display: block;
  width: 100%;
  height: 600px;
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
        navigation={{
          prevEl: '.custom-prev',
          nextEl: '.custom-next'
        }}
        modules={[Pagination, Navigation]}
      >
        {postImage.map((image, i) => (
          <SwiperSlide key={i}>
            <Img src={image} />
          </SwiperSlide>
        ))}
      </Swiper>
      <PrevButton className="custom-prev" />
      <NextButton className="custom-next" />
    </div>
  );
}

export default Slider;
