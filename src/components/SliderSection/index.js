import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Divider } from "antd";

import "./styles.scss";

const SliderSection = ({ images }) => {
  return (
    <div className="slider-section">
      <Swiper
        spaceBetween={10}
        className="gallery"
        freeMode={true}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
          1300: {
            slidesPerView: 5,
          },
        }}
      >
        {images.map((image, i) => {
          return (
            <SwiperSlide key={`slide-${i}`} className="gallery-slide">
              <img
                src={`${image.path}/portrait_xlarge.${image.extension}`}
                alt="slide"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default SliderSection;
