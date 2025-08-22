import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const OrdersPage = () => {
  return (
    <>
      <Navbar />
          <div className="container-fluid page-header py-5">    
              <h1 className="text-center text-white display-6">Orders</h1>
              <ol className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item">
                  <a href="/" className="text-white">Home</a>
                </li>
                  <li className="breadcrumb-item active text-primary">Orders</li>
              </ol>
          </div>
          <div className="container mb-4">
            <h2 className="text-center mb-4">Your Orders</h2>
            <p className="text-center w-responsive mx-auto mb-5">
              Here you can view all your orders.
            </p>
            <div className="row">
              <div className="col-md-12">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Map through orders data here */}
                  </tbody>
                </table>
              </div>
              </div>
          </div>
            <div className="container py-5">
                <div className="row g-4 align-items-center">
                <div className="col-lg-6 col-md-6">
                    <h2 className="text-success">Need Help?</h2>
                    <p className="text-dark">
                    If you have any questions regarding your orders, feel free to contact our support team.
                    </p>
                </div>
                <div className="col-lg-6 col-md-6 text-end">
                    <a href="/contact" className="btn btn-primary">Contact Support</a>
                </div>
              </div>
          </div>
          <Footer />
    </>
  )
}

export default OrdersPage
