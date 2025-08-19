import React from 'react'
import Cauliflower from '../assets/Cauliflower.jpg';
import { FaShoppingBag } from 'react-icons/fa';

const Vegetables = () => {
  return (
    <>
      <div className="container-fluid vesitable ">
    <div className="container py-5">
        <h1 className="mb-0">Fresh Organic Vegetables</h1>
        <div className="owl-carousel vegetable-carousel justify-content-center row g-4">
            <div className=" rounded vesitable-item col-lg-3 col-md-4 col-sm-6">
                <div className="vesitable-img">
                              <img src={Cauliflower } className=" product w-100 rounded-top" alt=""/>
                </div>
                
                <div className="p-4 rounded-bottom border border-success border-top-0 position-relative">
                    <h4 id="namepr">Cauliflower</h4>
                    <p >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet veritatis et distinctio harum no</p>
                    <div className="d-flex justify-content-between flex-lg-wrap">
                        <p id="pricepr" className="text-dark fs-5 fw-bold mb-0">&#8377;80/ kg</p>
                        <span id="divpr" className="divpr">
                                      <button id="pr" className="btn cart border border-secondary rounded-pill px-3 text-success">
                            <FaShoppingBag size={30}></FaShoppingBag></button>
                        </span>
                    </div>
                </div>
            </div>
            <div className=" rounded vesitable-item col-lg-3 col-md-4 col-sm-6">
                <div className="vesitable-img">
                              <img src={Cauliflower } className=" product w-100 rounded-top" alt=""/>
                </div>
                
                <div className="p-4 rounded-bottom border border-success border-top-0 position-relative">
                    <h4 id="namepr">Cauliflower</h4>
                    <p >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet veritatis et distinctio harum no</p>
                    <div className="d-flex justify-content-between flex-lg-wrap">
                        <p id="pricepr" className="text-dark fs-5 fw-bold mb-0">&#8377;80/ kg</p>
                        <span id="divpr" className="divpr">
                                      <button id="pr" className="btn cart border border-secondary rounded-pill px-3 text-success">
                            <FaShoppingBag size={30}></FaShoppingBag></button>
                        </span>
                    </div>
                </div>
            </div>
            <div className=" rounded vesitable-item col-lg-3 col-md-4 col-sm-6">
                <div className="vesitable-img">
                              <img src={Cauliflower } className=" product w-100 rounded-top" alt=""/>
                </div>
                
                <div className="p-4 rounded-bottom border border-success border-top-0 position-relative vegetable-content">
                    <h4 id="namepr">Cauliflower</h4>
                    <p >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet veritatis et distinctio harum no</p>
                    <div className="d-flex justify-content-between flex-lg-wrap">
                        <p id="pricepr" className="text-dark fs-5 fw-bold mb-0">&#8377;80/ kg</p>
                        <span id="divpr" className="divpr">
                                      <button id="pr" className="btn cart border border-secondary rounded-pill px-3 text-success">
                            <FaShoppingBag size={30}></FaShoppingBag></button>
                        </span>
                    </div>
                </div>
            </div>
            <div className=" rounded vesitable-item col-lg-3 col-md-4 col-sm-6">
                <div className="vesitable-img">
                              <img src={Cauliflower } className=" product w-100 rounded-top" alt=""/>
                </div>
                
                <div className="p-4 rounded-bottom border border-success border-top-0 position-relative">
                    <h4 id="namepr">Cauliflower</h4>
                    <p >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet veritatis et distinctio harum no</p>
                    <div className="d-flex justify-content-between flex-lg-wrap">
                        <p id="pricepr" className="text-dark fs-5 fw-bold mb-0">&#8377;80/ kg</p>
                        <span id="divpr" className="divpr">
                                      <button id="pr" className="btn cart border border-secondary rounded-pill px-3 text-success">
                            <FaShoppingBag size={30}></FaShoppingBag></button>
                        </span>
                    </div>
                </div>
            </div>
           
        </div>

           

    </div>
</div>
    </>
  )
}

export default Vegetables
