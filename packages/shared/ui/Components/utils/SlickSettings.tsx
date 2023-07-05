export const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};

export const sliderSets = {
  dots: false,
  className: "service-slick",
  infinite: true,
  speed: 500,
  autoplaySpeed: 4000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  dotsClass: "slick-dots",
  arrows: false,
  fade: true,
  pauseOnHover: false,
};

export const slickImages = [
  { id: 1, url: "/assets/007.jpg" },
  { id: 2, url: "/assets/003.jpg" },
  { id: 3, url: "/assets/004.jpg" },
  { id: 4, url: "/assets/005.jpg" },
  { id: 5, url: "/assets/006.jpg" },
];
