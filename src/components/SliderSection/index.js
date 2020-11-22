import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import "./styles.scss";

const SliderSection = ({ items = [], clickable = false }) => {
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
        {items.map((item, i) => {
          return (
            <SwiperSlide key={`slide-${i}`} className={`gallery-slide`}>
              <Link
                className={`item-content ${clickable && "clickable"}`}
                to={item.link}
              >
                <img
                  src={`${item.thumbnail.path}/portrait_xlarge.${item.thumbnail.extension}`}
                  alt="slide"
                />
                <p className="description">{item.description || ""}</p>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default SliderSection;
