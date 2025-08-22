import React from 'react'
import banner from '../assets/banner.png'
const Banner = () => {
  return (
    <>
      <div className="container-fluid banner bg-secondary">
    <div className="container ">
        <div className="row g-4 align-items-center">
            <div className="col-lg-6">
                <div className="">
                    <h1 className="display-3 text-warning">Fresh Exotic Fruits</h1>
                    <p className="fw-normal display-3 text-dark mb-4">in Our Store</p>
                    <p className="mb-4 text-white">The generated Lorem Ipsum is therefore always free from repetition
                        injected humour, or non-characteristic words etc.</p>
                    <a href="#" className="banner-btn btn border-2 border-warning rounded-pill text-dark py-3 px-5">BUY</a>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="position-relative">
                    <img src={banner} className="img-fluid w-40 rounded" alt="" />
                    <div className="d-flex align-items-center justify-content-center bg-white rounded-circle position-absolute top-0 mt-5 me-5 end-0" style={{width: "95px", height: "95px", transform: "translate(50%, -50%)"}}
                        >
                        <h1 >1</h1>
                        <div className="d-flex flex-column">
                            <span className="h2 mb-0">50&#8377;</span>
                            <span className="h4 text-muted mb-0">kg</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    </>
  )
}

export default Banner
