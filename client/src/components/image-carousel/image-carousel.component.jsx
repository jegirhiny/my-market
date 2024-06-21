import "./image-carousel.styles.css";
import { useEffect, useState } from "react";
import { LuArrowLeft, LuArrowRight, LuTrash2 } from "react-icons/lu";

const ImageCarousel = ({ images, removeItem }) => {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    if (imgIndex < 0) {
      setImgIndex(images.length - 1);
    } else if (imgIndex > images.length - 1) {
      setImgIndex(0);
    }
  }, [imgIndex, images]);

  const handleNext = (direction) => {
    if (images.length !== 1) {
      setImgIndex((index) => index + direction);
    }
  };

  return (
    <div className="careousel-div">
      <img
        src={images[imgIndex]}
        alt={`Preview # ${imgIndex}`}
        className="careousel-img"
      />
      <div
        className="careousel-actions"
        style={{ justifyContent: images.length === 1 ? "flex-end" : "space-around" }}
      >
        {images.length > 1 && (
          <LuArrowLeft
            size={"1.3rem"}
            style={{ cursor: "pointer" }}
            onClick={() => handleNext(-1)}
          />
        )}
        <LuTrash2
          className="careousel-trash"
          size={"1.3rem"}
          onClick={() => removeItem(imgIndex)}
        />
        {images.length > 1 && (
          <LuArrowRight
            size={"1.3rem"}
            style={{ cursor: "pointer" }}
            onClick={() => handleNext(1)}
          />
        )}
      </div>
    </div>
  );
};

export default ImageCarousel;
