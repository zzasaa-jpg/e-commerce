import { useState, useEffect } from 'react';
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import app from './Firebase';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';
import { MdOutlineEmail } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../FireBase/logo.png"

function GoogleAuthentication() {
    const [error, setError] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(true);
    const navigate = useNavigate();
    const auth = getAuth(app);

    useEffect(() => {
        // Check if the user is already signed in
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                localStorage.setItem("isSignIn", true);
                navigate('/app');
            }
        });

        // Unsubscribe when component unmounts
        return () => unsubscribe();
    }, [auth, navigate]);

    const handleSignUp = async (e) => {
        e.preventDefault();

        const provider = new GoogleAuthProvider();

        try {
            await signInWithPopup(auth, provider);
            localStorage.setItem("isSignIn", true);
            navigate('/app');
        } catch (error) {
            setError(true);
            let errorMessage = error.message;
            let errorCode = error.code;


            switch (errorCode) {
                case "auth/operation-not-allowed":
                    toast.error("Email/password accounts are not enabled!", {
                        theme: 'colored'
                    })
                    break;
                case "auth/operation-not-supported-in-this-environment":
                    toast.error("HTTP protocol is not supported. Please use HTTPS!", {
                        theme: 'colored'
                    })
                    break;
                case "auth/popup-blocked":
                    toast.error("Popup has been blocked by the browser. Please allow popups for this website!", {
                        theme: 'colored'
                    })
                    break;
                case "auth/popup-closed-by-user":
                    toast.error("Popup has been closed by the user before finalizing the operation. Please try again!", {
                        theme: 'colored'
                    })
                    break;
                default:
                    setMessageError(errorMessage);
                    break;
            }
        }
    };



    let handleEmail = (e) => {
        setEmail(e.target.value)
    }

    let handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSignUpMicrosoft = async (e) => {
        e.preventDefault();
        setEmail(e.target.value)
        setPassword(e.target.value)
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            // The signed-in user info
            const user = userCredential.user;
            console.log(user[0]);
            localStorage.setItem("isSignIn", true);
            navigate('/app');
        } catch (error) {
            setError(true)
            let errormessage = error.message;
            let errorCode = error.code;


            switch (errorCode) {
                case "auth/invalid-email":
                    toast.error('This email address is invalid!', {
                        theme: 'colored'
                    })
                    break;

                case "auth/missing-email":
                    toast.error('This email address is missing!', {
                        theme: 'colored'
                    })
                    break;
                case "auth/missing-password":
                    toast.error('Password is missing!', {
                        theme: 'colored'
                    })
                    break;
                case "auth/invalid-credential":
                    toast.error('invalid-credential!', {
                        theme: 'colored'
                    })
                    break;
                case "auth/user-disabled":
                    toast.error('This email address is disabled by the administrator!', {
                        theme: 'colored'
                    })
                    break;
                case "auth/user-not-found":
                    toast.error('This email address is not registered!', {
                        theme: 'colored'
                    })
                    break;
                case "auth/wrong-password":
                    toast.error('The password is invalid or the user does not have a password!', {
                        theme: 'colored'
                    })
                    break;
                default:
                    setMessageError(errormessage);
                    break;
            }

        }
    };


    const handleShow = () => {
        setShow(!show)
    }

    return (
        <div className='flex flex-col justify-center items-center h-screen bg-[#f2f1f7] p-2'>
            <ToastContainer />
            <main className='flex flex-col sm:flex-row md:flex-row lg:flex-row justify-center lg:items-center  gap-[5px] sm:gap-[10px] md:gap-[20px] lg:gap-[80px]'>
                <section className='flex justify-center items-center'>
                    <img src={logo} alt="logo" className='w-[100px] h-[100px] rounded-xl sm:w-[280px] sm:h-[280px] sm:rounded-2xl md:w-[300px] md:h-[300px] md:rounded-2xl lg:w-[400px] lg:h-[400px] lg:rounded-2xl shadow-2xl shadow-zinc-500' />
                </section>
                <section>
                    <div className='flex p-1'>

                        <h1 className='text-black'>{error && <h1 className='text-[10px] font-semibold'>{messageError.message}</h1>}</h1>

                    </div>
                    <div className='bg-white w-auto sm:w-[350px] md:w-[400px] lg:w-[600px] h-[380px] sm:h-[400px] md:h-[400px] lg:h-[400px] gap-1 flex flex-col items-center shadow-2xl rounded-[20px] p-2'>
                        <h1 className='text-[30px] sm:text-[35px] md:text-[38px] lg:text-[40px] text-center'>LogIn</h1>
                        <button onClick={handleSignUp} className='cursor-pointer flex justify-between items-center text-[20px] border-black border-[1px] hover:bg-[#efefef]
            w-full sm:w-[300px] md:w-[350px] lg:w-[400px] p-1 rounded-[4px]'>Google <FcGoogle className='text-[40px]' /></button>
                        <h1 className='text-[25px]'>OR</h1>
                        <form onSubmit={handleSignUpMicrosoft} className='flex flex-col gap-4 '>
                            <div className='flex justify-center items-center'>

                                <input className='bg-transparent border-[1px] border-black p-2 rounded-[4px] text-[20px] w-full sm:w-[250px] md:w-[300px] lg:w-[350px]' placeholder='Enter the Emmail...' type="email" name="" id="email" onChange={handleEmail} /> <MdOutlineEmail className='
            border-[1px] border-black h-12 w-12 rounded-[4px] ' />
                            </div>

                            <div className='flex justify-center items-center'>

                                <input className='bg-transparent border-[1px] border-black p-2 rounded-[4px] text-[20px] w-full sm:w-[250px] md:w-[300px] lg:w-[350px]' placeholder='Enter the Password...' type={show ? "password" : "text"} name="" id="password" onChange={handlePassword} /> <IoKeyOutline className='
            border-[1px] border-black h-12 w-12 rounded-[4px] ' onMouseEnter={handleShow} onMouseLeave={handleShow} />
                            </div>
                            {/* <input className='bg-transparent border-[1px] border-black p-2 rounded-[4px] text-[20px]' type="password" name="" id="password" onChange={handlePassword}/> */}
                            <button type='submit' className='cursor-pointer text-[20px] border-black border-[1px] hover:bg-[#efefef]  w-full sm:w-[300px] md:w-[350px] lg:w-[400px] p-2 rounded-[4px]'>Login</button>
                        </form>
                        <h1 className='pt-2'>Create a New account <Link className='underline' to='/signin'>Signin</Link></h1>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default GoogleAuthentication;
