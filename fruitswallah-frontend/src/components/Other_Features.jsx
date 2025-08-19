import featur_1 from "../assets/feature-1.jpg";
import featur_2 from "../assets/feature-2.jpg"; 
import featur_3 from "../assets/feature-3.jpg";
const Other_Features = () => {
  return (
    <>
      <div className="container-fluid service py-5">
        <div className="container py-5">
          <div className="row g-4 justify-content-center">
            <div className="col-md-6 col-lg-4 ">
              <a href="" className="text-decoration-none">
                <div className="service-item bg-success rounded border border-secondary ">
                  <img
                    src={featur_1}
                    className="img-fluid rounded-top w-100"
                    alt=""
                  />
                  <div className="px-4 rounded-bottom">
                    <div className="service-content bg-secondary text-center p-4 rounded">
                      <h5 className="text-white">Fresh Apples</h5>
                      <h3 className="mb-0 text-black">20% OFF</h3>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-6 col-lg-4">
              <a href="" className="text-decoration-none">
                <div className="service-item bg-success rounded border border-dark">
                  <img
                    src={featur_2}
                    className="img-fluid rounded-top w-100"
                    alt=""
                  />
                  <div className="px-4 rounded-bottom">
                    <div className="service-content bg-secondary text-center p-4 rounded">
                      <h5 className="text-white">Tasty Fruits</h5>
                      <h3 className="mb-0 text-black">Free delivery</h3>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-6 col-lg-4">
              <a href="" className="text-decoration-none">
                <div className="service-item bg-success rounded border border-success">
                  <img
                    src={featur_3}
                    className="img-fluid rounded-top w-100"
                    alt=""
                  />
                  <div className="px-4 rounded-bottom">
                    <div className="service-content bg-secondary text-center p-4 rounded">
                      <h5 className="text-white">Exotic Vegitable</h5>
                      <h3 className="mb-0 text-black">Discount 30&#8377;</h3>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Other_Features;
