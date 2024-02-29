import React, { useState, useEffect, useContext } from 'react';
import Loader from './Loader'
import { useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa6";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { CartContext } from '../context/Shop_context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Products({ category }) {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {addToCart} = useContext(CartContext);

  
  useEffect(() => {
    const fetchProducts = () => {
      fetch(`https://dummyjson.com/products/category/${category}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.products) {
            setProducts(data.products);
            setIsLoading(false)
          } else {
            console.error("Invalid data:", data);
          }
        })
        .catch(error => console.error('Error:', error));
    };
    fetchProducts();
  }, [category]);

  const handleNavigate = (productId) => {
    navigate(`/prd/${productId}`);
  };

  const handleNavigateBuy = (product) => {
    navigate(`/buy/${product.title}`, { state: { product: product } }); 
  }

  let notify =()=> toast.success("Cart Added!")

  return (
    <div className='lg:pt-8'>
      <ToastContainer />
      {
          isLoading ? (<Loader/>):
          (
    <>
    
    <h1 className='text-[25px] lg:text-[40px] lg:ml-[190px] font-semibold'>{category}</h1>
      <div className='flex flex-wrap justify-center items-start lg:items-end  lg:justify-normal gap-5 lg:ml-[190px] pb-5 z-10'>
        {products.map((product, index) => (
          <div className='bg-[#fff] h-[380px] lg:h-[360px] w-[320px] lg:w-[250px] shadow-2xl rounded-[10px] hover:transform hover:scale-105 hover:transition-transform duration-700 cursor-pointer' key={index} >
            <img src={product.thumbnail} alt='logo' width={250} className='bg-white w-[320px] lg:w-[250px] h-[220px] lg:h-[200px] border rounded-[10px] shadow-xl' onClick={()=>handleNavigate(product.id)} />
            <div className='p-2' onClick={()=>handleNavigate(product.id)}>
              <h1 className='text-[20px] font-semibold w-60'>{product.title.substring(0,18)+'...'}</h1>
              <h1>Brand: {product.brand.substring(0,18)+'...'}</h1>
              <div className='flex justify-between items-center'>
              <h1 className='flex items-center'>Price: <LiaRupeeSignSolid/> {product.price}</h1>
              <h1 className='flex items-center bg-green-500 rounded-[3px] text-white'><FaStar className='text-white' /> {product.rating}</h1>
              </div>
              <h1 className='line-through flex items-center'><LiaRupeeSignSolid/> {product.price - ( product.price * (product.discountPercentage /100)).toFixed(2)}</h1>
            </div>
            <div className='flex gap-2 px-2 text-[18px]'>
              <button className='bg-[#ffffff] px-2 rounded-[3px] shadow-xl border border-black font-semibold hover:bg-[#e8e7e7]' onClick={()=>handleNavigateBuy(product)}>buy</button>
              <button className='bg-[#fff] px-2 rounded-[3px] shadow-xl border border-black font-semibold hover:bg-[#e8e7e7]' onClick={()=>{addToCart(product); notify();}}>cart</button>
            </div>
          </div>
        ))}
      </div>
    </>          
        )
      }
    </div>
  );
}

export default Products;
