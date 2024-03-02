import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaStar } from "react-icons/fa6";
import { IoArrowBack } from "react-icons/io5";

function Buy() {
  const location = useLocation();
  const product = location.state.product;
  const Delivery_charges = 99.09
  const [phno, setPhno] = useState("0000000000")
  const [address, setAdress] = useState("ABCD ")
  const [open, setOpen] = useState(true);
  const [open2, setOpen2] = useState(true)
  const [open3, setOpen3] = useState(true)


  const inputPhno = (event) => {
    const number = event.target.value
    localStorage.setItem("phonenumber", number)
    setPhno(number)
  }

  const inputAddre = (event) => {
    const address = event.target.value
    setAdress(address)
  }
  const handleOpen = () => {
    setOpen(!open)
    setOpen3(true)
  }
  const handleOpen2 = () => {
    setOpen2(!open2)
    setOpen(true)
  }

  const handleOpen3 = () => {
    setOpen3(!open3)
    setOpen2(true)
  }

  const handleBack=()=>{
    window.history.back()
  }

  return (
   
    
    
    <div className='pt-16  lg:pt-20 sm:flex md:flex md:gap-5 sm:gap-4 lg:flex w-screen bg-[#f2f1f7] p-2 lg:p-5'>
      <button className='text-[25px] block' onClick={handleBack}><IoArrowBack />
</button>
      <div className='bg-white w-auto shadow-2xl rounded-[10px] lg:min-w-[350px] md:h-[470px] lg:h-[470px] '>
        <img src={product.thumbnail} alt='product' width='' className='mx-auto h-[240px] min-w-full rounded-[10px] shadow-2xl m-2' />
        <div className='p-2'>


          <div className='flex justify-between py-3'>
            <h1 className=''>Product</h1>
            <h1>{product.title}</h1>
          </div>
          <hr className='bg-[#2d2c2c]' />
          <div className='flex justify-between py-3'>
            <h1 className=''>Price</h1>
            <h1 className='font-semibold flex items-center'><LiaRupeeSignSolid className='text-[17px]' />{product.price}</h1>
          </div>
          <hr className='bg-[#2d2c2c]' />
          <div className='flex justify-between py-3'>
            <h1 className=''>Delivery charges</h1>
            <h1 className='font-semibold flex items-center'><LiaRupeeSignSolid className='text-[17px]' />{Delivery_charges}</h1>
          </div>
          <hr className='bg-[#2d2c2c]' />
          <div className='flex justify-between py-3'>
            <h1 className='font-semibold'>Total Payable </h1>
            <h1 className='font-semibold flex items-center'><LiaRupeeSignSolid className='text-[17px]' />{parseFloat(product.price + Delivery_charges).toFixed(2)}</h1>
          </div>
        </div>
      </div>



      <div className='flex flex-col md:w-screen gap-1 lg:w-screen bg-blue-2 pt-2 lg:p-2 lg:items-center'>
        <div className='bg-red-30  sm:w-auto lg:w-[800px] p-1'>
          <div className='bg-white shadow-2xl rounded-[10px] h-16 w-full flex items-center justify-between px-2 lg:px-10 '>
            <div className='flex flex-col'>

              <h1>Phone number </h1>
              <h1>+91 {phno}</h1>
            </div>
            <button onClick={handleOpen} className='outline p-1 rounded-[4px] hover:bg-[#eae7e7]'>Change</button>
          </div>
          <div className={open ? 'hidden' : ""}>

            <div className="bg-gray-200 rounded-[10px] h-16 w-full flex items-center justify-between p-3 lg:p-8 ">
              <div className='flex flex-col items-start'>
                <h1>Enter the phone number</h1>
                <input className='rounded-[4px] outline-none px-1 lg:px-4 w-44 lg:w-96 ' type="text" name="PhoneNumber" id="ph-no" onChange={inputPhno} maxLength={10} />
              </div>
              <button className='outline p-1 rounded-[4px]' onClick={handleOpen}>Close</button>

              {/* <button>Close</button> */}
            </div>

          </div>
        </div>


        <div className='bg-red-30  lg:w-[800px] p-1'>
          <div className='bg-white rounded-[10px] shadow-2xl h-16 w-full flex items-center justify-between px-2 lg:px-10 '>
            <div className='flex flex-col'>

              <h1>Delivery Address</h1>
              <h1>{address}</h1>
            </div>
            <button onClick={handleOpen2} className='outline p-1 rounded-[4px] hover:bg-[#eae7e7]'>Change</button>
          </div>
          <div className={open2 ? 'hidden' : ""}>

            <div className="bg-gray-200 rounded-[10px] shadow-2xl h-16 w-full flex items-center justify-between p-3 lg:p-8 ">
              <div className='flex flex-col items-start'>
                <h1>Enter the Address</h1>
                <input className='rounded-[4px] outline-none px-1 lg:px-4 w-44 lg:w-96 ' type="text" name="Address" id="ph-add" onChange={inputAddre} maxLength={60} />
              </div>
              <button onClick={handleOpen2} className='outline p-1 rounded-[4px]'>Close</button>

            </div>

          </div>
        </div>

        <div className='bg-red-30 md:w-auto  lg:w-[800px] p-1'>
          <div className='flex-col bg-white rounded-[10px] shadow-2xl h-[300px] md:h-[200px]  lg:h-40 md:w-auto lg:w-full flex lg:items-center justify-between lg:px-1'>
            <div className='p-1 md:flex lg:flex items-start gap-3 lg:gap-4 '>
              <img src={product.thumbnail} alt='porduct'  className='rounded-[10px] min-w-full md:min-w-[250px] h-[190px] lg:h-[150px] lg:min-w-[250px]' />
              <div>
                <h1 className=' font-semibold'>Product Details~</h1>

                <div className='flex justify-between
                 lg:w-[510px] items-start'>

                  <h1 className='text-[]' >Product {product.title}</h1>
                  <h1 className='flex items-center w-[42px] bg-green-500 rounded-[3px] text-[13px] text-white'><FaStar className='text-white' /> {product.rating}</h1>
                </div>
                <div className='flex gap-2'>

                <h1 className='flex items-center text-[]'>Price <LiaRupeeSignSolid className='text-[17px]' /> {product.price}</h1>
                <h1 className='line-through flex items-center'><LiaRupeeSignSolid/> {product.price - ( product.price * (product.discountPercentage /100)).toFixed(2)}</h1>
                </div>
                <h1 className=''>Category: {product.category}</h1>
              </div>
            </div>
            {/* <button onClick={handleOpen2}>Change</button> */}
          </div>

        </div>

        <div className='bg-red-30  lg:w-[800px] p-1'>
          <div className='bg-white rounded-[10px] shadow-2xl h-16 w-full flex items-center justify-between px-2 lg:px-10 '>
            {/* <div className='flex flex-col'> */}

              <h1>Payment Methods</h1>
              
            {/* </div> */}
            <button onClick={handleOpen3} className='outline p-1 rounded-[4px] hover:bg-[#eae7e7]'>Select</button>
          </div>
          <div className={open3 ? 'hidden' : ""}>

            <div className="bg-gray-200 rounded-[10px] shadow-2xl  w-full flex items-start justify-between p-3 lg:p-8 ">
              <div className='flex flex-col items-start gap-5'>
                <h1>Select the Payment Method</h1>
                <div className='flex items-center gap-4'>

                  <input type="radio" name="" id="" />
                  <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/2560px-UPI-Logo-vector.svg.png' alt='logo' width={80} />
                </div>
                <div className='flex items-center gap-4'>

                  <input type="radio" name="" id="" />
                  <img src='https://download.logo.wine/logo/Paytm/Paytm-Logo.wine.png' alt='logo' width={80} />
                </div>

                <div className='flex items-center gap-4'>

                  <input type="radio" name="" id="" />
                  <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/2560px-Google_Pay_Logo.svg.png' alt='logo' width={70} />
                </div>

                <div className='flex items-center gap-4'>

                  <input type="radio" name="" id="" />
                  <h1>Credit / Debit / ATM Card </h1>
                </div>

                <div className='flex items-center gap-4'>

                  <input type="radio" name="" id="" />
                  <h1>Net Banking</h1>
                </div>

                <div className='flex items-center gap-4'>

                  <input type="radio" name="" id="" />
                  <h1>Cash on Delivery</h1>
                </div>
              </div>


              <button onClick={handleOpen3} className='outline p-1 rounded-[4px]'>Close</button>

            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

export default Buy;
