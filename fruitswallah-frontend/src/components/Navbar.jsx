function Navbar() {
   return(
   <>
   
    <div className="container-fluid fixed-top">
        <div className="container px-0">
            <nav className="navbar navbar-light bg-white navbar-expand-xl">
                <a href="/fruitwallah/" className="navbar-brand">
                    <h1 className="text-success display-6"><b>FruitsWallah</b> </h1>
                </a>
                <button className="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse"
                    data-bs-target="navbarCollapse">
                    <span className="fa fa-bars text-success"></span>
                </button>
                <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
                    <div className="navbar-nav mx-auto">
                        <a href="/fruitwallah/" className="nav-item nav-link active">Home</a>
                        <a href="/fruitwallah/shop/" className="nav-item nav-link">Shop</a>
                        <a href="/fruitwallah/shopdetail/" className="nav-item nav-link">Shop Detail </a>
                        <div className="nav-item dropdown">
                            <a href=" " className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages </a>
                            <div className="dropdown-menu m-0 bg-secondary rounded-0">
                                <a href="/fruitwallah/cart/" className="dropdown-item">Cart</a>
                                <a href="/fruitwallah/checkout/" className="dropdown-item">Checkout </a>
                                <a href="/fruitwallah/testimonial/" className="dropdown-item">Testimonial</a>
                                <a href="/fruitwallah/tracker/" className="dropdown-item">Order Tracker </a>
                                <a href="/fruitwallah/order/" className="dropdown-item">My Orders</a>
                            </div>
                        </div>
                        <a href="/fruitwallah/contact/" className="nav-item nav-link">Contact </a>
                    </div>
                </div>
            </nav>
        </div>
        
     
     <div id="addItem" className="addItem"></div>
    </div> 
    
   </> 
)}
export default Navbar