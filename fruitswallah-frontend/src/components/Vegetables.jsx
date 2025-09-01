import ItemCard from "./ItemCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Products } from "../data/Products";

const Vegetables = () => {
  const Vegetables = Products.filter((item) => item.catagory === "Vegetable");
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1200 },
      items: 4,
      slidesToSlide: 1, 
    },
    desktop: {
      breakpoint: { max: 1200, min: 992 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 992, min: 576 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 576, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div className="container-fluid  fruite">
      <div className="container py-5">
        <h1 className="mb-4">Fresh Organic Vegetables</h1>

        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true} 
          autoPlaySpeed={2000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          itemClass="px-2"
        >
          {Vegetables.map((veg) => (
            <ItemCard key={veg.id} item={veg} />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Vegetables;
