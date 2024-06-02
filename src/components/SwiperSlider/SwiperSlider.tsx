import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import './SwiperSlider.scss';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Image } from '@commercetools/platform-sdk';
import { useState } from 'react';
import { Box, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface IProductImgArr {
  productImgArr: Image[] | undefined;
}

export function SwiperSlider({ productImgArr }: IProductImgArr) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const style = {
  //   margin: '0 auto',
  //   bacgroundColor: 'red',
  // };

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
          <img
            onClick={handleOpen}
            style={{ width: 500, height: 500 }}
            src={el.url}
            alt="image"
          />
          <Modal
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <CloseIcon
                onClick={handleClose}
                sx={{ fontSize: '40px', cursor: 'pointer' }}
              />
              <img
                className="popapSliderImg"
                style={{ width: 700, height: 600 }}
                src={el.url}
                alt="image"
              />
            </Box>
          </Modal>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
