import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { IoHomeOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { CiShoppingCart } from "react-icons/ci";
import { CartContext } from '../context/Shop_context';
import { CiSearch } from "react-icons/ci";
import { onAuthStateChanged , getAuth} from 'firebase/auth';
import app from '../FireBase/Firebase';
import { FaRegCircleUser } from "react-icons/fa6";
import logo from '../logo2.png'

function TopNavbar() {
  const {totalItems} = useContext(CartContext)
  let [user, setUser] = useState(null);
  let auth = getAuth(app);
  let navigate = useNavigate()
  


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user);
        } else {
            setUser(null);
        }
    });

    return () => unsubscribe();
    }, [auth]);

    let handleuserinfo=()=>{
      navigate('/user-info')
    }

    const location = useLocation();
  const isLoginPage = location.pathname === '/';
  const isLoginPage2 = location.pathname === '/signin'
  
  if (isLoginPage) {
    return null; // Hide the TopNavbar on the login page
  }
  if(isLoginPage2){
    return null
  }
  return (
    <div>
        <nav className='bg-[#bfc1f8] fixed w-full flex items-center justify-between p-1 px-2 lg:px-4 z-10 shadow-2xl'>
          <Link to="/app">
          <img src={logo} alt="logo" className='w-[50px] h-[50px] shadow-2xl rounded-[4px]' />
          </Link>
            <ul className='flex items-center gap-4'>
                <li className='hover:underline text-[25px]'>

                <Link to="/app"><IoHomeOutline /></Link>
                </li>
                <li className='hover:underline text-[25px]'>

                <Link to="/categories"><BiCategory /></Link>
                </li>

                <li className='hover:underline text-[25px]'>

                <Link className='flex items-center relative' to="/cart">
                  <h1 className=''>
                <CiShoppingCart  />
                  </h1>
                  <h1 className='absolute  left-4 top-[-8px] text-[12px] font-semibold bg-[#fff] rounded-full w-[20px] flex justify-center items-center h-[20px]'>{totalItems}</h1>
                  </Link>
                </li>

                <li className='hover:underline text-[25px]'>

                <Link to="/search"><CiSearch /></Link>
                </li>
               {user && (
                <div>
                    {
                      user.photoURL ? (
                        <img src={user.photoURL} alt="user logo" onClick={handleuserinfo}  width={100} className='w-[25px] h-[25px] rounded-full cursor-pointer'/ >

                      ):(
                        <FaRegCircleUser className='text-[25px] cursor-pointer'onClick={handleuserinfo} />
                      )
                    }
                    
                </div>
            )}
            </ul>
        </nav>
    </div>
  )
}

export default TopNavbar;