import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Image } from '@commercetools/platform-sdk';

interface IProductImgArr {
  productImgArr: Image[] | undefined;
}

export function SwiperSlider({ productImgArr }: IProductImgArr) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={1}
      slidesPerView={1}
      navigation
      scrollbar={{ draggable: true }}
      onSwiper={swiper => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      style={{ maxWidth: 370 }}
    >
      {productImgArr?.map(el => (
        <SwiperSlide key={el.url}>
          <img style={{ width: 500, height: 500 }} src={el.url} alt="image" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
