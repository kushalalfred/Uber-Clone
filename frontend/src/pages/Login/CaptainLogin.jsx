import React, { useContext, useState } from 'react'
import uberLogo from "../../assets/uberLogo.png";
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../../context/CaptainContext';
import  axios from 'axios';



export default function CaptainLogin() {

  const {captain,setCaptain} = useContext(CaptainDataContext)
  const [formData,setFormData] = useState({
    email:'',
    password:''
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(values => ({...values, [name]: value}))
  }

  const handleSubmit = async(e)=>{

    try{
      e.preventDefault();
      console.log(formData);
 
      const captainData = {
        email : formData.email,
        password : formData.password
      }

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`,captainData);
      if(response.status === 200){
        // console.log("Here in Success")
        const data = response.data;
        setFormData({
          email:'',
          password:''
        });

        localStorage.setItem("token",data.token);
        setCaptain(data.captain);
        navigate("/captainHome");

      }

 


    }catch(error){
      console.log(error);
    }

  }

  const navigateUser = ()=>{
    navigate("/login");
  }


  return (
    <div className='p-5 flex flex-col justify-between h-screen'>
      
      <img src={uberLogo} alt='Error in Log' className='w-24 mb-10' />

      <div className='mb-4 '>
        
        <form onSubmit={handleSubmit} autoComplete='off'>
        
          {/* Email */}
          <div>
            <h3 className='text-xl mb-2'>
              What's your email ?
            </h3>

            <input type="email" required  placeholder='email@example.com'
              name="email"
              onChange={(event) => handleChange(event)}
              value = {formData?.email || ""}
              className='bg-[#eeee] rounded px-4 py-2  border w-full text-lg placeholder:text-sm text-base outline-black mb-7'
            />
          </div>

          {/* Password */}
          <div>
            <h3 className='text-xl mb-2'>
              Enter Password
            </h3>

            <input type="password" required placeholder='password'
              name="password"
              onChange={(event) => handleChange(event)}
              value = {formData?.password || ""}
              className='bg-[#eeee] rounded px-4 py-2  border w-full text-lg placeholder:text-sm text-base outline-black mb-7'
            />
          </div>

          {/* Submit */}
          <button className='bg-[#111] rounded px-4 py-2  border w-full text-lg placeholder:text-sm text-base outline-black mb-4 text-white
            font-semibold'
            type='submit'
          >
            Login
          </button>

          <p className='text-center text-sm'>
            Register as captain rider ? 
            <Link className='text-grey-600 ms-1 font-semibold' to="/captainSignup">
              Create new Account
            </Link>
          </p>

        </form>

      </div>

      <div>
        <button className='bg-[#111] rounded px-4 py-3  border w-full text-md placeholder:text-sm text-base outline-black text-white font-semibold'
          onClick = {()=>navigateUser()}
        >
          Sign In As User
        </button>
      </div>

    </div>
  )
}
