import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import "./LoginPage.css"
import Cookies from 'js-cookie'
import {Navigate} from 'react-router-dom'

const LoginPage = () => {
     const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Navigate to="/" />;
    } 
  return (
       <div className="login-form-container">
         <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-mobile-img"
          alt="website logo"
         />
         <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="login-img"
          alt="website login"
         />
         <LoginForm />
      </div>
  );
}

export default LoginPage;
