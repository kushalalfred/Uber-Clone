import React, { useState } from 'react'
import uberLogo from "../../assets/uberLogo.png";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { UserDataContext } from '../../context/UserContext'; 
import { useContext } from 'react';

export default function UserSignup() {

  const {user,setUser} = useContext(UserDataContext);

  const [formData,setFormData] = useState({
    email:'',
    password:'',
    firstname : "",
    lastname : ""
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

      const newUser = {
        fullname : {
          firstname : formData.firstname,
          lastname : formData.lastname 
        },
        email : formData.email,
        password : formData.password
      };

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser);
      setFormData({
        email:'',
        password:'',
        firstname : "",
        lastname : ""
      });

      if(response.status===201){
        // const data = response.data;
        // setUser(data?.user);
        navigate("/login")
      }



    }catch(error){
      console.log(error);
    }

  }

  const navigateCaptain = ()=>{
    navigate("/captainLogin");
  }


  return (
    <div className='p-5 flex flex-col justify-between h-screen'>
      
      <img src={uberLogo} alt='Error in Log' className='w-24 mb-10' />
      
      <div className='mb-4 '>
        
        <form onSubmit={handleSubmit} autoComplete='off'>


          {/* Name */}
          <div>
            <h3 className='text-xl mb-2'>
              What's your Name ?
            </h3>
            <div className='flex gap-4'>
              <input type="text" required  placeholder='First Name'
                name="firstname"
                onChange={(event) => handleChange(event)}
                value = {formData?.firstname || ""}
                className='bg-[#eeee] rounded px-4 py-2  border w-full text-lg placeholder:text-sm text-base outline-black mb-7'
              />
              <input type="text" required  placeholder='Last Name'
                name="lastname"
                onChange={(event) => handleChange(event)}
                value = {formData?.lastname || ""}
                className='bg-[#eeee] rounded px-4 py-2  border w-full text-lg placeholder:text-sm text-base outline-black mb-7'
              />


            </div>
          </div>
        


          {/* Email */}
          <div>
            <h3 className='text-xl mb-2'>
              What's your Email ?
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
          <p className='text-xs mb-4 text-[#c7c1c1] px-2'>
          By proceeding, you consent to receive calls, texts, and promotional messages from us, including updates.
          </p>
          <button className='bg-[#111] rounded px-4 py-2  border w-full text-lg placeholder:text-sm text-base outline-black mb-4 text-white
            font-semibold'
            type='submit'
          >
            Create Account
          </button>

          <p className='text-center '>
            Already have an Account? 
            <Link className='text-grey-600 ms-1 font-semibold' to="/login">
                Login
            </Link>
          </p>

        </form>

      </div>

      <div>
        <button className='bg-[#111] rounded px-4 py-3  border w-full text-md placeholder:text-sm text-base outline-black text-white font-semibold'
          onClick = {()=>navigateCaptain()}
        >
          Sign In As Captain Rider
        </button>
      </div>
    
    </div>
  )
}
