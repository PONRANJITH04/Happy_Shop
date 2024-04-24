import React, { useEffect, useState, useCallback,useRef } from 'react';
import {ThreeDots} from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup/FiltersGroup'
import ProductCard from '../ProductCard/ProductCard'
import ProductsHeader from '../ProductsHeader/ProductsHeader'

import './index.css'

const categoryOptions = [
    {
      name: 'Clothing',
      categoryId: '1',
    },
    {
      name: 'Electronics',
      categoryId: '2',
    },
    {
      name: 'Appliances',
      categoryId: '3',
    },
    {
      name: 'Grocery',
      categoryId: '4',
    },
    {
      name: 'Toys',
      categoryId: '5',
    },
  ]
  
  const sortbyOptions = [
    {
      optionId: 'PRICE_HIGH',
      displayText: 'Price (High-Low)',
    },
    {
      optionId: 'PRICE_LOW',
      displayText: 'Price (Low-High)',
    },
  ]
  
  const ratingsList = [
    {
      ratingId: '4',
      imageUrl:
        'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
    },
    {
      ratingId: '3',
      imageUrl:
        'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
    },
    {
      ratingId: '2',
      imageUrl:
        'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
    },
    {
      ratingId: '1',
      imageUrl:
        'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
    },
  ]
  

const apiStatusConstants = {
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
  }


  
const AllProductSection = () => {

    const [state, setState] = useState({
        productsList: [],
        apiStatus: apiStatusConstants.inProgress,
        activeOptionId: sortbyOptions[0].optionId,
        activeCategoryId: '',
        searchInput: '',
        activeRatingId: '',
      });
      const {activeOptionId,activeCategoryId,searchInput,activeRatingId} = state;

    const stateRef = useRef();
    stateRef.current = state;
    

    const getProducts = useCallback(async () => {
        const jwtToken = Cookies.get('jwt_token')
        const {
          activeOptionId,
          activeCategoryId,
          searchInput,
          activeRatingId,
        } = stateRef.current;
        const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${activeCategoryId}&title_search=${searchInput}&rating=${activeRatingId}`
        const options = {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          method: 'GET',
        }
        const response = await fetch(apiUrl, options)
        if (response.ok) {
          const fetchedData = await response.json()
          const updatedData = fetchedData.products.map(product => ({
            title: product.title,
            brand: product.brand,
            price: product.price,
            id: product.id,
            imageUrl: product.image_url,
            rating: product.rating,
          }))
          setState({
            ...state,
            productsList: updatedData,
            apiStatus: apiStatusConstants.success,
          })
        } else {
          setState({
            ...state,
            apiStatus: apiStatusConstants.failure,
          })
        }
      },[])

      
      useEffect(() =>{
        getProducts()
     
      },[activeOptionId ,activeCategoryId,searchInput, activeRatingId, getProducts]);
    
    const renderLoadingView = () => (
        <div className="products-loader-container">
          <ThreeDots type="ThreeDots" color="#0b69ff" height="50" width="50" />
        </div>
      )
    
    const renderFailureView = () => (
        <div className="products-error-view-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
            alt="all-products-error"
            className="products-failure-img"
          />
          <h1 className="product-failure-heading-text">
            Oops! Something Went Wrong
          </h1>
          <p className="products-failure-description">
            We are having some trouble processing your request. Please try again.
          </p>
        </div>
      )
    
    const changeSortby = activeOptionId => {
        setState({...state,activeOptionId})
      }
    
    const renderProductsListView = () => {
        const {productsList, activeOptionId} = state
        const shouldShowProductsList = productsList.length > 0
    
        return shouldShowProductsList ? (
          <div className="all-products-container">
            <ProductsHeader
              activeOptionId={activeOptionId}
              sortbyOptions={sortbyOptions}
              changeSortby={changeSortby}
            />
            <ul className="products-list">
              {productsList.map(product => (
                <ProductCard productData={product} key={product.id} />
              ))}
            </ul>
          </div>
        ) : (
          <div className="no-products-view">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
              className="no-products-img"
              alt="no products"
            />
            <h1 className="no-products-heading">No Products Found</h1>
            <p className="no-products-description">
              We could not find any products. Try other filters.
            </p>
          </div>
        )
      }
    
    const renderAllProducts = () => {
        const {apiStatus} = state
    
        switch (apiStatus) {
          case apiStatusConstants.success:
            return renderProductsListView()
          case apiStatusConstants.failure:
            return renderFailureView()
          case apiStatusConstants.inProgress:
            return renderLoadingView()
          default:
            return null
        } 
        
      }
    
    const clearFilters = () => {
        setState(
          {
            ...state,
            searchInput: '',
            activeCategoryId: '',
            activeRatingId: '',
          },
          getProducts,
        )
      }
    
    const changeRating = activeRatingId => {
        setState({...state ,activeRatingId})
      }
    
    const changeCategory = activeCategoryId => {
        setState({...state,activeCategoryId})
      }
    
    const enterSearchInput = () => {
        getProducts()
      }
    
    const changeSearchInput = searchInput => {
        setState({...state,
            searchInput})
      }
  return (
    <div className="all-products-section">
        <FiltersGroup
          searchInput={searchInput}
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          changeSearchInput={changeSearchInput}
          enterSearchInput={enterSearchInput}
          activeCategoryId={activeCategoryId}
          activeRatingId={activeRatingId}
          changeCategory={changeCategory}
          changeRating={changeRating}
          clearFilters={clearFilters}
        />
        
        {renderAllProducts()}
      </div>
  );
}

export default AllProductSection;
