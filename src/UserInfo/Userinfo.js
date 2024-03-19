import React, {useState, useEffect} from 'react';
import { onAuthStateChanged , getAuth, signOut} from 'firebase/auth';
import app from '../FireBase/Firebase';
import { useNavigate } from 'react-router-dom';
import { FaRegCircleUser } from "react-icons/fa6";

function Userinfo() {
    let [user, setUser] = useState(null);
    let auth = getAuth(app);
    let navigate = useNavigate();

    
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
        const handleSignOut = async () => {
            try {
                await signOut(auth);
                navigate('/')
                localStorage.removeItem("isSignIn");
            } catch (error) {
                console.error('Sign-out error:', error);
            }
        };
    
  return (
    <div className='flex justify-center items-center h-screen bg-[#f2f1f7] p-2 lg:p-0'>
         {user && (
                <div className=" w-screen sm:w-96 md:w-96 lg:w-96 flex justify-center flex-col items-center bg-white shadow-2xl p-2 rounded-[15px]">
                    {
                        user.photoURL ? (
                    <img src={user.photoURL} alt="User logo"  width={100} className="rounded-full"/ >

                        ):
                        (
                            <FaRegCircleUser className='text-[100px]' />
                        )
                    }
                    <h2>User Information:</h2>
                    <h1 className="font-semibold">Email: {user.email}</h1>
                    <h1 className="font-semibold">Name: {user.displayName? user.displayName : "user name"}</h1>
                    <button className="border border-black w-16 rounded-[4px] hover:bg-[#dedddd]" onClick={handleSignOut}>Logout</button>
                </div>
            )}
    </div>
  )
}

export default Userinfo;