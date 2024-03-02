import { useContext } from "react";
import { CartContext } from "../context/Shop_context";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaStar } from "react-icons/fa6";
import { CiShoppingCart } from "react-icons/ci";

function Cart(value) {
  const Delivery_charges = 99.09
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal, totalItems } = useContext(CartContext);
  
  return (
    <div className='pt-20 w-screen lg:pt-20 sm:flex sm:gap-5 md:flex md:gap-10 lg:flex bg-[#f2f1f7] h-screen p-2 lg:p-5 lg:gap-0'>
        {
            cartItems.length > 0 ?(

        <div className='bg-white w-auto sm:w-[400px] md:w-[500px] lg:w-[85vh] shadow-2xl rounded-[10px] h-[270px] p-3'>
          <h1 className='font-semibold py-2 text-[20px] '>Price Details</h1>
          <div className='p-'>
            
            <hr className='bg-[#2d2c2c]' />
            <div className='flex justify-between py-3'>
              <h1 className=''>Total Products </h1>
              <h1 className="">{totalItems}</h1>
            </div>  
            <hr className='bg-[#2d2c2c]' />
            <div className='flex justify-between py-3'>
              <h1 className=''>Delivery charges</h1>
              <h1 className=' flex items-center'><LiaRupeeSignSolid className='text-[17px]' />{Delivery_charges}</h1>
            </div>
            <hr className='bg-[#2d2c2c]' />
            <div className='flex justify-between py-3'>
              <h1 className='font-semibold'>Total Payable </h1>
              <h1 className='font-semibold flex items-center'><LiaRupeeSignSolid className='text-[17px]' />
              {parseFloat(getCartTotal() + Delivery_charges).toFixed(2)}</h1>
            </div>
              <hr className='bg-[#2d2c2c]' />
            <div className='py-3'>
            <button className="outline px-1 rounded-[2px] hover:bg-[#e3e1e1]" onClick={()=>clearCart()}>Clear Cart</button>
            
          </div>
            
          </div>
        </div>
            ):(
                <div className="flex justify-center items-center w-screen">

            <div className="flex flex-col justify-center items-center">
            <CiShoppingCart className="text-[150px]" />
            <h1 className="text-[20px] flex justify-center">Your cart is empty!</h1>
            </div>
                </div>
            )
        }
       


      <div className={`flex flex-col pt-1 gap-1 lg:w-screen bg-blue-20 lg:p-2 lg:items-center
      sm:overflow-y-scroll sm:w-full md:overflow-y-scroll md:w-[500px] lg:overflow-y-scroll ${cartItems.length === 0 ? 'hidden': 'w-full'}`}>
        {
            cartItems.map((value)=>(
                <>
                
               <div className="">

                <div className=' w-auto sm:w-[400px] lg:w-[800px] '>
                <div className='flex-col bg-white rounded-[10px] shadow-2xl h-[370px] w-auto lg:h-40 sm:w-[400px] lg:w-full flex lg:items-center justify-between lg:px-1'>
                  <div className='p-1  lg:flex items-start gap-3 lg:gap-4  '>
                    <img src={value.thumbnail} alt='porduct' width={200} className='rounded-[10px] min-w-full h-[220px] lg:h-[150px] lg:min-w-[250px]'/>
                    <div>
                      <h1 className=' font-semibold'>Product Details~</h1>
      
                      <div className='flex justify-between lg:w-[510px] items-start'>
      
                        <h1 className='text-[]' >Product {value.title}</h1>
                        <h1 className='flex items-center w-[42px] bg-green-500 rounded-[3px] text-[13px] text-white'><FaStar className='text-white' /> {value.rating}</h1>
                      </div>
                      <div className='flex gap-2'>
      
                      <h1 className='flex items-center text-[]'>Price <LiaRupeeSignSolid className='text-[17px]' /> {value.price}</h1>
                      <h1 className='line-through flex items-center'><LiaRupeeSignSolid/> {value.price - ( value.price * (value.discountPercentage /100)).toFixed(2)}</h1>
                      </div>
                      <h1 className=''>Category: {value.category}</h1>
                      <div className="flex gap-4 items-center my-2">
                      <button className="border-[1px] border-black px-2 py- text-[18px] font-semibold rounded-[3px] hover:bg-[#dedddd]" onClick={()=>addToCart(value)}>+</button>
                      <h1>{value.quantity}</h1>
                      <button className="border-[1px] border-black px-2 py- text-[18px] font-semibold rounded-[3px] hover:bg-[#dedddd]" onClick={()=>removeFromCart(value)}>-</button>

                      </div>
                    </div>
                  </div>
                </div>
      
              </div>
               </div>


</>
            ))
        }
      </div>

    </div>
  );
}

export default Cart;

// import React, { useContext } from 'react';
// import { CartContext } from '../context/Shop_context'


// function Cart(){
//     const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext);
//     console.log(cartItems)
//     return(
    
//     <div className="flex-col flex items-center bg-white gap-8 p-10 text-black text-sm">
//   <h1 className="text-2xl font-bold">Cart</h1>
//   <div className="flex flex-col gap-4">
//     {cartItems.map((item) => (
//       <div className="flex justify-between items-center" key={item.id}>
//         <div className="flex gap-4">
//           <img src={item.thumbnail} alt={item.title} className="rounded-md h-24" />
//           <div className="flex flex-col">
//             <h1 className="text-lg font-bold">{item.title}</h1>
//             <p className="text-gray-600">{item.price}</p>
//           </div>
//         </div>
//         <div className="flex gap-4">
//           <button
//             className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
//             onClick={() => {
//               addToCart(item)
//             }}
//           >
//             +
//           </button>
//           <p>{item.quantity}</p>
//           <button
//             className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
//             onClick={() => {
//               removeFromCart(item)
//             }}
//           >
//             -
//           </button>
//         </div>
//       </div>
//     ))}
//   </div>
//   {
//     cartItems.length > 0 ? (
//       <div className="flex flex-col justify-between items-center">
//     <h1 className="text-lg font-bold">Total: ${getCartTotal()}</h1>
//     <button
//       className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
//       onClick={() => {
//         clearCart()
//       }}
//     >
//       Clear cart
//     </button>
//   </div>
//     ) : (
//       <h1 className="text-lg font-bold">Your cart is empty</h1>
//     )
//   }
// </div>
//     )
// }

// export default Cart