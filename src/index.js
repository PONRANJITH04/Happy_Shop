import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from 'react-router-dom';
import App from './App';
import Home from './pages/Home/Home';
//import NotFound from './pages/NotFound/NotFound';
import LoginPage from './pages/LoginPage/LoginPage';
import Cart from  './pages/Cart/Cart'
import NotFound from './pages/NotFound/NoTFound'
import Product from './pages/Product/Product';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element = {<App />}>
    <Route index  element = {<Home/>}/>
    <Route path='login' element = {<LoginPage />} />  
    <Route path='cart' element = {<Cart />} />
    <Route path='product' element = {<Product />} />
    <Route path='*' element = {<NotFound /> }  />
   </Route>
))

const el = document.getElementById('root');
const root = createRoot(el);
root.render(
  <RouterProvider router={router} />
);
