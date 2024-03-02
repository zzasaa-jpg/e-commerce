import React, { useState, useEffect, useContext } from 'react';
import Loader from './Loader'
import { useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa6";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { CartContext } from '../context/Shop_context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Loptop() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const {addToCart} = useContext(CartContext);

  const fetchProducts = () => {
    fetch(`https://dummyjson.com/products/category/laptops`)
      .then(res => res.json())
      .then(data => 
         {
          setProducts(data.products);
          setIsLoading(false)
        }
    )
      .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleNavigate = (productId) => {
    navigate(`/prd/${productId}`);
  };

  const handleNavigateBuy = (product) => {
    navigate(`/buy/${product.title}`, { state: { product: product } }); 
  }

  let notify =()=> toast.success("Cart Added!")

  return (
    <div className='px-0 py-2 lg:px-4 lg:py-8 pt-1  shadow-xl'>
        <h1 className='text-[28px] mx-2 lg:text-[40px] lg:mx-1 lg:my-1 font-semibold'>Loptops</h1>
        <ToastContainer />
      {
          isLoading ? (<Loader/>):
          (
    <>
    
      <div className='flex  items-start gap-5 overflow-y-scroll  py-4 px-4'>
        {products.map((product, index) => (
          <div className='bg-[#fff] h-[285px] lg:h-[370px] lg:min-w-[250px] min-w-[170px] shadow-2xl rounded-[10px] hover:transform hover:scale-105 hover:transition-transform duration-700 cursor-pointer' key={index} >
            <img src={product.thumbnail} alt='logo' width={250} className='bg-white h-[150px] w-[170px] lg:w-[270px] lg:h-[200px] border rounded-[10px] shadow-xl' onClick={()=>handleNavigate(product.id)} />
            <div className='p-2' onClick={()=>handleNavigate(product.id)}>
              <h1 className='text-[14px] lg:text-[20px] font-semibold  '>{product.title.substring(0,17)+"..."}</h1>
              <h1 className='text-[14px] lg:text-[16px]  '>Brand: {product.brand.substring(0,14)+"..."}</h1>
              <div className='flex justify-between items-center'>
              <h1 className='flex items-center text-[14px] lg:text-[16px]'>Price: <LiaRupeeSignSolid/> {product.price}</h1>
              <h1 className='flex items-center w-[51px] bg-green-500 rounded-[3px] text-white text-[14px] lg:text-[16px]'><FaStar className='text-white' /> {product.rating}</h1>
              </div>
              <h1 className='line-through flex items-center text-[14px] lg:text-[16px]'><LiaRupeeSignSolid/> {product.price - ( product.price * (product.discountPercentage /100)).toFixed(2)}</h1>
            </div>
            <div className='flex gap-2 px-2 text-[14px] lg:text-[18px]'>
              <button className='bg-[#ffffff] px-1 lg:px-2 rounded-[3px] shadow-xl border border-black font-semibold hover:bg-[#e8e7e7]' onClick={()=>handleNavigateBuy(product)}>buy</button>
              <button className='bg-[#fff] px-1 lg:px-2 rounded-[3px] shadow-xl border border-black font-semibold hover:bg-[#e8e7e7]' onClick={()=>{addToCart(product); notify();}}>cart</button>
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

export default Loptop;
