import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Fruits_shop from '../components/Fruits_shop'
import { useParams } from 'react-router-dom'
import { GetSearchedProducts } from '../services/SearchController'
import Footer from '../components/Footer'

const SearchPage = () => {
    const [products, setProducts] = useState([]);
    const { search } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(8);

    useEffect(() => {
        GetSearchedProducts(search, setProducts);
    }, [search]);

     const product = products.filter((p) => p.isActive);
     const lastPost = currentPage * postPerPage;
     const firstPost = lastPost - postPerPage;
     const currentPost = product.slice(firstPost, lastPost);
  return (
    <>
      <Navbar />
      <Fruits_shop
        products={currentPost}
        postPerPage={postPerPage}
        allProducts={product.length}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
          />
          <Footer/>
    </>
  );
}

export default SearchPage
