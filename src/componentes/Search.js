import React, { useEffect, useState, useContext } from 'react'
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/Shop_context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Search() {
    let [search, setSearch] = useState([])
    let [searchValue, SetSearchValue] = useState()
    let navigate = useNavigate()
    
    useEffect(()=>{
      let fetchSearchValues =()=>{
          fetch(`https://dummyjson.com/products/search?q=${searchValue}`)
          .then(response => response.json())
          .then(data => {
              if (Array.isArray(data.products)) {
                  setSearch(data.products);
                } else {
                  console.error("Data is not an array");
                }
          })
          .catch(error => {
              console.error('Error fetching data:', error);
          });  
      }
        fetchSearchValues()
    },[searchValue]);

    let handleSearchValue=(event)=>{
        SetSearchValue(event.target.value)
    }

    const handleNavigateBuy = (product) => {
        navigate(`/buy/${product.title}`, { state: { product: product } }); 
        console.log(product);
      }

      const {addToCart} = useContext(CartContext)

      let notify =()=> toast.success("Cart Added!")
  return (
      <div className='pt-16 bg-[#f2f1f7]  h-screen'>
        <ToastContainer />
        <div className=' mx-4 sm:mx-[200px] md:mx-[300px] lg:mx-[450px] pb-2 '>

        <input type="text" placeholder='Search.....' onChange={handleSearchValue} className=' p-1 lg:w-96 sm:w-[300px] md:w-[400px] rounded-[4px] shadow-2xl outline-none bg-white' />
        </div>
        {
            searchValue ?(

        <div className='overflow-y-scroll h-screen p-2 lg:p-5 flex flex-col gap-5 shadow-2xl'>
            { Array.isArray(search) && search.map((value, index)=>(
                 
                 
                   <div className='bg-[#fff] rounded-[10px] sm:flex sm:w-auto sm:gap-2 md:flex md:w-auto  lg:w-auto lg:flex gap-5 lg:px-4 lg:py-5 '>
                     <img src={value.thumbnail} alt='logo' width={450} className='bg-white sm:w-[300px] h-[250px] lg:h-[300px] border rounded-[10px] lg:w-[450px] shadow-2xl' />
                     <div className='flex flex-col px-2 pt-4 lg:px-0 lg:pt-0'>
                     <div className='p-0'>
                       <h1 className='text-[25px] lg:text-[50px] font-semibold w-full'>{value.title}</h1>
                       <div className='flex items-center justify-between'>
                       <h1 className='text-[14px] lg:text-[16px]' >Brand: {value.brand}</h1>
           
                       <h1 className=' flex items-center w-[51px] bg-green-500 rounded-[3px] text-white text-[14px] lg:text-[16px]'><FaStar className='text-white' /> {value.rating}</h1>
                       </div>
                       <div className='flex gap-2'>
                       <h1 className=' flex items-center text-[14px] lg:text-[16px]'>Price: <LiaRupeeSignSolid /> {value.price}</h1>
                       <h1 className='line-through flex items-center text-[14px] lg:text-[16px]'><LiaRupeeSignSolid/> {value.price - ( value.price * (value.discountPercentage /100)).toFixed(2)}</h1>
                       </div>
                       <h1 className='text-[14px] lg:text-[16px]'>Description: {value.description}</h1>
                      
                       <h1 className='text-[14px] lg:text-[16px]'>Category: {value.category}</h1>
                     </div>
                     <div className='flex items-start gap-2 py-4 text-[14px] lg:text-[18px]'>
                       <button className='bg-[#ffffff] lg:w-[100px] px-1 lg:px-[2px] rounded-[3px]  shadow-xl border border-black font-semibold hover:bg-[rgb(232,232,236)] ' onClick={()=>handleNavigateBuy(value)}>Buy Now</button>
                       <button className='bg-[#fff]  lg:w-[120px] px-1 lg:px-[2px] rounded-[3px]  shadow-xl border border-black font-semibold hover:bg-[#e8e8ec] ' onClick={()=> {addToCart(value); notify();}}>Add To Cart</button>
                     </div>
                     </div>
                   </div>
                ))
            }
        </div>

            ):(
                <h1 className='text-[20px] flex justify-center my-10'>Search The Products...</h1>
            )
        }
        
    </div>
  )
}

export default Search;