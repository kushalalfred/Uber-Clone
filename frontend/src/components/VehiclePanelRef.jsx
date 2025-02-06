import React from 'react'
import uberCar from "../assets/uberCar.png";
import uberAuto from "../assets/uberAuto.webp";
import uberMoto from "../assets/uberMoto.webp";

export default function VehiclePanelRef(props) {
  return (
    <div className=' flex flex-col gap-4'>
        <i className="ri-arrow-down-s-line absolute top-3 right-3 text-xl" onClick={()=>props.setVehiclePanel(false)}></i>
        <h3 className='text-2xl font-semibold mb-1 text-center'>
            Choose Your Vehicle
        </h3>

        <div className='flex items-center justify-between gap-3 w-full border-2 active:border-black rounded-xl py-2 px-1 bg-gray-100'
            onClick={()=>{
                props.setConfirmRidePanel(true);
            }}
        >
            <img src={uberCar} alt="Error"  className='h-12'/>
            <div className='text-sm w-1/2 p-3'>
                <h4 className='font-semibold'>
                UberGo <span className=''><i className="ri-user-fill"></i> 4 </span>
                </h4>
                <h5>2 mins away</h5>
                <p className='text-xs text-gray-600'>
                Affordable Compact Rides
                </p>
            </div>
            <h2 className='text-md font-semibold'>
                $ 192.2
            </h2>
        </div>
    
        <div className='flex items-center justify-between gap-3 w-full border-2 active:border-black rounded-xl py-2 px-1 bg-gray-100'
            onClick={()=>{
                props.setConfirmRidePanel(true);
            }}
        >
            <img src={uberAuto} alt="Error"  className='h-12'/>
            <div className='text-sm w-1/2 p-3'>
                <h4 className='font-semibold'>
                Uber Auto <span className=''><i className="ri-user-fill"></i> 3 </span>
                </h4>
                <h5>2 mins away</h5>
                <p className='text-xs text-gray-600'>
                Affordable Compact Rides
                </p>
            </div>

            <h2 className='text-md font-semibold'>
                $ 192.2
            </h2>
        </div>
    
        <div className='flex items-center justify-between gap-3 w-full border-2 active:border-black rounded-xl py-2 px-1 bg-gray-100'
            onClick={()=>{
                props.setConfirmRidePanel(true);
            }}
        >
            <img src={uberMoto} alt="Error"  className='h-12'/>
            <div className='text-sm w-1/2 p-3'>
                <h4 className='font-semibold'>
                Uber Moto <span className=''><i className="ri-user-fill"></i> 1</span>
                </h4>
                <h5>2 mins away</h5>
                <p className='text-xs text-gray-600'>
                Affordable Compact Rides
                </p>
            </div>
            <h2 className='text-md font-semibold'>
                $ 10.2
            </h2>
        </div>

    </div>
  )
}
