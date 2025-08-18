import hero_img_1 from '../assets/hero-img-1.png';
import hero_img_2 from '../assets/hero-img-2.jpg';
const Hero = () => {
    return (
        <>
            
<div  className="container-fluid mb-5 hero-header" id="hero-header">
    <div  className="container py-5">
        <div  className="row g-5 align-items-center">
            <div  className="col-md-12 col-lg-7">
                <h4  className="mb-3 text-secondary">100% Chemical free</h4>
                <h1  className="mb-2 display-3 text-success">Garden-Fresh Organic Veggies and Fruits</h1>
                <div  className="position-relative mx-auto">
                    <form method='get' action='/fruitwallah/search'  className="form-inline my-2 my-lg-0">
                        <input  className="form-control border-2 border-secondary w-75 py-3 px-4 rounded-pill" type="search" name="search" id="search"  placeholder="Search"/>
                        <button type="submit"
                         className="btn btn-success border-2 border-secondary py-3 px-4 position-absolute rounded-pill text-white ">Submit Now</button>
                    </form>
                </div>
            </div>
            <div  className="col-md-12 col-lg-5">
                <div id="carouselId"  className="carousel slide position-relative" data-bs-ride="carousel">
                    <div  className="carousel-inner" role="listbox">
                        <div  className="carousel-item active rounded" id='carousel-items'>
                            <img src={hero_img_1} className="img-fluid w-100 h-100 bg-secondary rounded" alt="First slide"/>
                            <a href=""  className="btn px-4 py-2 text-white rounded">Fruites</a>
                        </div>
                        <div  className="carousel-item rounded" id='carousel-items'>
                            <img src={hero_img_2}  className="img-fluid w-100 h-100 rounded" alt="Second slide"/>
                            <a href=""  className="btn px-4 py-2 text-white rounded">Vegetables</a>
                        </div>
                    </div>
                    <button  className="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
                        <span  className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span  className="visually-hidden">Previous</span>
                    </button>
                    <button  className="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next">
                        <span  className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span  className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

            </>
    );
}
    export default Hero;