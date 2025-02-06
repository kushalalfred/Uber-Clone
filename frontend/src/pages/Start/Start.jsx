import React from 'react'
import uberLogo from "../../assets/uberLogo.png";
import homeImg from "../../assets/heroCloneProject.jpg";
import { useNavigate } from 'react-router-dom';

export default function Start() {

  const navigate = useNavigate();
  const navigateTo = () => {
    navigate("/login")
  }

  return (
    <div>
      <div
        className="h-screen w-full flex justify-between flex-col pt-8 bg-cover "
        style={{ backgroundImage: `url(${homeImg})` }} // Use inline style to apply the background image
      >
        <img src={uberLogo} alt='Error in Log' className='w-14 ml-8 ml-auto me-4' />

        <div className='bg-white py-4 px-4 pb-7'>
          <h2 className='text-2xl font-bold'>
            Get Started with Uber
          </h2>
          <button className='w-full bg-black text-white py-3 rounded mt-5' onClick={()=>navigateTo()}>
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
