import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import "./Image.css";
export default function ImageCarousel() {
  const { carID } = useParams(); // get car id from url parameter

  const [carImages, setCarImages] = useState(null);
  // destructure car details
  const { carImg, image2, image3, image4, image5 } = carImages ? carImages : {};

  useEffect(() => {
    axios
      .get(`https://milesmotors.herokuapp.com/car/${carID}`)
      .then(({ data }) => setCarImages(data.data))
      .catch((err) => console.log(err));
  }, [carID]);

  const images = [
    {
      id: 1,
      src: carImg,
      alt: "cars",
    },
    {
      id: 2,
      src: image2,
      alt: "cars",
    },
    {
      id: 3,
      src: image3,
      alt: "cars",
    },
    {
      id: 4,
      src: image4,
      alt: "cars",
    },
    {
      id: 5,
      src: image5,
      alt: "cars",
    },
  ];
  const carousel = useRef();
  const settings = {
    infinite: true,
    customPaging: function (i) {
      return (
        <a className="image-page">
          <img
            src={images[i].src}
            height="100%"
            width="100%"
            alt={images[i].alt}
          />
        </a>
      );
    },
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    dots: true,
    slidesToShow: 1,
    arrows: true,
    slidesToScroll: 1,
    lazyLoad: true,
  };

  return (
    <div className="container">
      <button onClick={() => carousel.current.slickGoTo(0)} className="button">
        Go to first
      </button>
      <button
        onClick={() => carousel.current.slickGoTo(images.length - 1)}
        className="button"
      >
        Go to last
      </button>
      <Slider {...settings} ref={carousel} className="slyder">
        {images.map((item) => (
          <div key={item.id} className="photo--container">
            {" "}
            <img src={item.src} alt={item.alt} className="car--photo" />
          </div>
        ))}
      </Slider>
    </div>
  );
}
