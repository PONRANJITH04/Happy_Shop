
import React,{useState,useEffect} from 'react';
import Cookies from 'js-cookie'
import {ThreeDots} from 'react-loader-spinner'
import ProductCard from '../ProductCard/ProductCard'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS'
}

const PrimeDealSection = () => {
  const [primeProducts, setPrimeProducts] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.inProgress);


  useEffect(()=> {
      getPrimeDeals()

  },[])

 
  const getPrimeDeals = async () => {
  
      const jwtToken = Cookies.get('jwt_token')
  
      const apiUrl = 'https://apis.ccbp.in/prime-deals'
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }
      const response = await fetch(apiUrl, options)
      if (response.ok === true) {
        const fetchedData = await response.json()
        const updatedData = fetchedData.prime_deals.map(product => ({
          title: product.title,
          brand: product.brand,
          price: product.price,
          id: product.id,
          imageUrl: product.image_url,
          rating: product.rating,
        }))
        setPrimeProducts( updatedData)
        setApiStatus(apiStatusConstants.success)
      }
      if (response.status === 401) {
        setApiStatus(apiStatusConstants.failure)
      }
    }

  const primeDealsListView = () => {
      return (
        <div>
          <h1 className="primedeals-list-heading">Exclusive Prime Deals</h1>
          <ul className="products-list">
            {primeProducts.map(product => (
              <ProductCard productData={product} key={product.id} />
            ))}
          </ul>
        </div>
      )
  }
    const primeDealsFailureView = () => (
        <img
          src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
          alt="register prime"
          className="register-prime-img"
        />
      )
    
    const loadingView = () => (
        <div className="primedeals-loader-container">
          <ThreeDots type="ThreeDots" color="#0b69ff" height="50" width="50" />
        </div>
      )

  switch (apiStatus) {
      case apiStatusConstants.success:
         return primeDealsListView();
      case apiStatusConstants.failure:
        return primeDealsFailureView();
      case apiStatusConstants.inProgress:
        return loadingView();
      default:
        return null ;
    }
};

   

export default PrimeDealSection