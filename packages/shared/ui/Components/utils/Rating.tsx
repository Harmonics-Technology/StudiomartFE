import { Star, Rating } from "@smastrom/react-rating";

const Ratings = ({ value }: any) => {
  const myStyles = {
    itemShapes: Star,
    activeFillColor: "#facc15",
    inactiveStrokeColor: "#facc15",
    itemStrokeWidth: 2,
    activeStrokeColor: "transparent",
  };
  return (
    <Rating
      style={{ maxWidth: 100 }}
      value={value || 0}
      readOnly
      itemStyles={myStyles}
    />
  );
};

export default Ratings;
