import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaStar } from "react-icons/fa6";
import { CartContext } from '../context/Shop_context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const {addToCart} = useContext(CartContext);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
      })
      .catch(error => console.error('Error:', error));
  }, [id]);

  const handleNavigateBuy = (product) => {
    navigate(`/buy/${product.title}`, { state: { product: product } }); 
  }

  let notify =()=> toast.success("Cart Added!")

  let [currentImage, setCurrentImage] = useState(0)

    let handlePrive= ()=>{
        setCurrentImage(currentImage === 0 ? product.images.length -1 : currentImage - 1)
    }

    let handleNext =()=>{
        setCurrentImage(currentImage === product.images.length -1  ? 0 : currentImage + 1)
    }

    let handleBack=()=>{
      window.history.back()
    }
  return (
    <div className='container p-1 pt-16 '>
      <div className='flex gap-5'>
      <button className='text-[25px]' onClick={handleBack}><IoArrowBack />
</button>
      <h1 className=' text-[25px] lg:text-[40px] lg:my-1 font-semibold'>ProductDetails Details</h1>

      </div>
      <ToastContainer />
      {product ? (
        <div className='bg-[#fff] rounded-[10px] lg:flex md:flex gap-5 px-2 lg:px-4 py-2 lg:py-5 '>
          <img src={product.thumbnail} alt='logo'  className='bg-white h-[220px] lg:h-[300px] w-full lg:w-[450px] border rounded-[10px] shadow-2xl hover:transform hover:scale-105 hover:transition-transform duration-700 cursor-pointer' />
          <div className='flex flex-col pt-2 lg:pt-0'>
          <div className='p-0'>
            <h1 className='text-[30px] lg:text-[50px] font-semibold w-full'>{product.title}</h1>
            <div className='flex items-center justify-between'>
            <h1 className='' >Brand: {product.brand}</h1>

            <h1 className=' flex items-center w-[52px] bg-green-500 rounded-[3px] text-white'><FaStar className='text-white' /> {product.rating}</h1>
            </div>
            <div className='flex gap-2'>
            <h1 className=' flex items-center'>Price: <LiaRupeeSignSolid /> {product.price}</h1>
            <h1 className='line-through flex items-center'><LiaRupeeSignSolid/> {product.price - ( product.price * (product.discountPercentage /100)).toFixed(2)}</h1>
            </div>
            <h1 className=''>Description: {product.description}</h1>
           
            <h1 className=''>Category: {product.category}</h1>
          </div>
          <div className='flex items-start gap-2 py-4 text-[18px]'>
            <button className='bg-[#ffffff] w-[100px] px-[2px] rounded-[3px]  shadow-xl border border-black font-semibold hover:bg-[#e8e8ec] ' onClick={()=>handleNavigateBuy(product)}>Buy Now</button>
            <button className='bg-[#fff]  w-[120px] px-[2px] rounded-[3px]  shadow-xl border border-black font-semibold hover:bg-[#e8e8ec] ' onClick={()=> {addToCart(product); notify();}}>Add To Cart</button>
          </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {
        product && product.images && (
         
          <div className='lg:flex lg:justify-center pb-5 justify-normal'>
          <div className='bg-[#d4d4d4] flex rounded-xl bg-[#bf1f8] relative w-screen h-[200px] lg:w-[960px] lg:h-[270px] shadow-2xl '>
              <FaRegArrowAltCircleLeft className='text-white  rounded-sm cursor-pointer top-[95px] sm:top-[95px] md:top-[95px] lg:top-[140px] text-[20px] absolute left-1 lg:left-5 ' onClick={handlePrive}/>
              {
                  product && product.images.map((image,i)=>(
                      <img src={image} alt="lop" className={currentImage === i ? "w-full h-full object-contain" : "hidden"} />
                     ))
                  }
                  <FaRegArrowAltCircleRight className='text-white  cursor-pointer top-[95px] sm:top-[95px] md:top-[95px] lg:top-[140px] text-[20px] absolute right-1 lg:right-5' onClick={handleNext}/>
                      <div className=' flex absolute  gap-1 bottom-2 mx-[150px] sm:mx-80 md:mx-[400px]  lg:mx-[440px]'>
                  {
                      product.images.map((_, index)=>(
                          <button key={index} className={`h-3 w-3 lg:h-4 lg:w-4 rounded-full ${currentImage === index ? 'bg-red-500' : 'bg-black'}`} onClick={() => setCurrentImage(index)}></button>
                      ))
                      
                  }
                  </div>
          </div>
          </div>
        )
      }
    </div>
  );
}

export default ProductDetails;
