import React, { useState, useEffect } from 'react'
import images from './Images'

function Imageslider() {
    let [currentImage, setCurrentImage] = useState(0)

    // let handlePrive= ()=>{
    //     setCurrentImage(currentImage === 0 ? images.length -1 : currentImage - 1)
    // }

    // let handleNext =()=>{
    //     setCurrentImage(currentImage === images.length -1  ? 0 : currentImage + 1)
    // }
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImage(prevIndex =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000); 

        return () => clearInterval(intervalId);
    }, []);
  return (
    <div className='lg:flex lg:justify-center '>
    <div className='flex pt-[60px] lg:pt-16 pb-1 bg-[#bf1f8] relative w-screen lg:w-[960px] h-auto lg:h-[270px] shadow-2xl '>
        {/* <FaRegArrowAltCircleLeft className='text-white  rounded-sm cursor-pointer top-[85px] sm:top-64 md:top-80 lg:top-[160px] text-[20px] absolute left-1 lg:left-5 ' onClick={handlePrive}/> */}
        {
            images.map((v,i)=>(
                <img src={v.img} alt="lop" className={currentImage === i ? "w-full h-full object-contain" : "hidden"} key={i} />
               ))
            }
            {/* <FaRegArrowAltCircleRight className='text-white  cursor-pointer top-[85px] sm:top-64 md:top-80 lg:top-[160px] text-[20px] absolute right-1 lg:right-5' onClick={handleNext}/> */}
                <div className=' flex absolute  gap-1 bottom-2 mx-[120px] sm:mx-64 md:mx-[350px]  lg:mx-[380px]'>
            {
                images.map((_, index)=>(
                    <button key={index} className={`h-3 w-3 lg:h-4 lg:w-4 rounded-full ${currentImage === index ? 'bg-red-500' : 'bg-white'}`} onClick={() => setCurrentImage(index)}></button>
                ))
                
            }
            </div>
    </div>
    </div>
  )
}

export default Imageslider