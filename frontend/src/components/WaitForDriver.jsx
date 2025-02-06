import React from 'react'
import uberCar from "../assets/uberCar.png";

export default function WaitForDriver(props) {
  return (
    <div>
      <i className="ri-arrow-down-s-line absolute top-3 right-3 text-xl"
        onClick={()=>{
          props.setWaitForDriverPanel(false);
        }}
      ></i>
      {/* <h3 className='text-xl font-semibold mb-1 text-center'>
        Wait for Driver
      </h3> */}
      <div className='flex items-center justify-between'>
        <img src={uberCar} alt="" className='h-12' />
        <div className='text-right'>
          <h2 className='text-lg font-medium -mt-1 '>Sarthak</h2>
          <h2 className='font-semibold -mt-1'>GJ0392AM03</h2>
          <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
        </div>
      </div>
      
      <div className='flex flex-col justify-between items-center gap-3 mt-5'>
        
 
        <div className='w-full flex flex-col gap-5'>
            
          <div className='flex items-center gap-5 border-b-2 p-2'>
            <i className="ri-map-pin-line"></i>
            <div>
              <h3 className='text-lg font-medium'>563/11-A</h3>
              <p className='text-sm  -mt-1 text-gray-600'>
                Kankariya Talab Ahmedabad
              </p>
            </div>
          </div>

          <div className='flex items-center gap-5 border-b-2 p-2'>
            <i className="ri-map-pin-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>563/11-A</h3>
              <p className='text-sm  -mt-1 text-gray-600'>
                Kankariya Talab Ahmedabad
              </p>
            </div>
          </div>

          <div className='flex items-center gap-5 border-b-2 p-2'>
            <i className="ri-wallet-2-line"></i>
            <div>
              <h3 className='text-lg font-medium'>192 ₹</h3>
              <p className='text-sm  -mt-1 text-gray-600'>
                Cash
              </p>
            </div>
          </div>

        </div>

      </div>
       

    </div>
  )
}
