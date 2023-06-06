import React, { CSSProperties } from "react";
import { CarouselItem } from "./CarouselItem";
import { Carousel } from "react-responsive-carousel";

export const HeroBanner = ({ onOpen }: any) => {
  const indicatorStyles: CSSProperties = {
    background: "white",
    width: 80,
    height: 8,
    borderRadius: "50px",
    display: "inline-block",
    margin: "0 8px 25px 0",
  };
  return (
    <Carousel
      showStatus={false}
      autoPlay={true}
      infiniteLoop
      animationHandler="fade"
      useKeyboardArrows
      swipeable={false}
      stopOnHover={false}
      showArrows={false}
      showThumbs={false}
      transitionTime={500}
      renderIndicator={(onClickHandler, isSelected, index, label) => {
        if (isSelected) {
          return (
            <li
              style={{
                ...indicatorStyles,
                background: "#5D5FEF",
                width: 80,
              }}
              aria-label={`Selected: ${label} ${index + 1}`}
              title={`Selected: ${label} ${index + 1}`}
            />
          );
        }
        return (
          <li
            style={indicatorStyles}
            onClick={onClickHandler}
            onKeyDown={onClickHandler}
            value={index}
            key={index}
            role="button"
            tabIndex={0}
            title={`${label} ${index + 1}`}
            aria-label={`${label} ${index + 1}`}
          />
        );
      }}
    >
      <CarouselItem
        title="one-stop shop"
        blueTitle="Studio-specific"
        note="Discover, connect, and thrive with StudioMart – where studio owners and customers come together."
        img="/imga.png"
        onOpen={onOpen}
      />
      <CarouselItem
        title="for your creative exploration"
        blueTitle="Discover the next Studio "
        note="Our platform allows customers to browse through listings, compare features, and make informed decisions based on their specific needs."
        img="/imgb.png"
        onOpen={onOpen}
      />
      <CarouselItem
        title="Start earning"
        blueTitle="Do you own a Studio? "
        note="Join StudioMart today and unlock the potential of your studio! Connect with a wide network of individuals seeking the perfect studio space for their creative endeavors"
        img="/imgc.png"
        onOpen={onOpen}
      />
    </Carousel>
  );
};
