import React, { useState, useEffect } from 'react';
import Products from './Products';
import { IoMenu } from "react-icons/io5";

function Navbar() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("smartphones");
  let [open, setOpen] = useState(false)

  const fetchCategories = () => {
    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setCategories(data);
        } else {
          console.error("Invalid data:", data);
        }
      })
      .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  let handleOpen = ()=>{
    setOpen(!open)
  }

  return (
    <>
        <button className='text-[25px] pt-14 lg:pt-0 lg:text-[0px]' onClick={handleOpen}><IoMenu />
</button>
      <nav className={` ${open ? "block" : "hidden"} bg-[#d3d3f9] p-1 lg:pt-10 lg:fixed lg:flex flex-col justify-start items-start lg:w-44 lg:h-[96vh] overflow-x-scroll`}>
        {categories.map((category, index) => (
          <h1 key={index} onClick={() => handleCategoryClick(category)} className={` cursor-pointer font-light hover:bg-[#bcbcf4] p-1 m-[1px] lg:w-[160px] rounded-[5px] ${selectedCategory === category ? "bg-[#bcbcf4] hover:bg-[#aeaef7]":"" }`}>{category}</h1>
          ))}
      </nav>
      <Products category={selectedCategory} />
    </>
  );
}

export default Navbar;