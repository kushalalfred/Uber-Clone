import React, { useRef, useState } from 'react'
import logo from "../../assets/uberLogo.png";
import tempImg from "../../assets/tempImg.gif";
import { useEffect } from 'react';
import gsap from 'gsap';
import LocationSearchPanel from '../../components/LocationSearchPanel';

import VehiclePanelRef from '../../components/VehiclePanelRef';
import ConfirmedRide from '../../components/ConfirmedRide';
import LookingForDriver from '../../components/LookingForDriver';
import WaitForDriver from '../../components/WaitForDriver';

export default function Home() {

  const [pickup,setPickup] = useState("");
  const [destination,setDestination] = useState("");

  const [panel,setPanel] = useState(false);
  const [vehiclePanel,setVehiclePanel] = useState(false);
  const [confirmRidePanel,setConfirmRidePanel] = useState(false);
  const [lookingForDriverPanel,setLookingForDriverPanel] = useState(false);
  const [waitForDriverPanel,setWaitForDriverPanel] = useState(false);

  const panelRef = useRef(null);
  const vehichlePanelRef = useRef(null);
  const confirmedRidePanelRef = useRef(null);
  const lookingForDriverPanelRef = useRef(null);
  const waitForDriverPanelRef = useRef(null);


  useEffect(() => {
    if(panel){
      gsap.to(panelRef.current, {
        height: "70%",
        padding : 20,
        // display : "block",
      });
    }
    else{
      gsap.to(panelRef.current, {
        height: "0%",
        padding : 0,
        // display : "none"
 
      });
    }
  }, [panel,setPanel]);
  
  useEffect(()=>{
    if(vehiclePanel){
      gsap.to(vehichlePanelRef.current,{
        transform : "translateY(0)"
      });
    }
    else{
      gsap.to(vehichlePanelRef.current,{
        transform : "translateY(100%)"
      });
    }

  },[vehiclePanel,setVehiclePanel])

 
  useEffect(()=>{
    if(confirmRidePanel){
      gsap.to(confirmedRidePanelRef.current,{
        transform : "translateY(0)"
      });
    }
    else{
      gsap.to(confirmedRidePanelRef.current,{
        transform : "translateY(100%)"
      });
    }

  },[confirmRidePanel,setConfirmRidePanel])

  useEffect(()=>{
    if(lookingForDriverPanel){
      gsap.to(lookingForDriverPanelRef.current,{
        transform : "translateY(0)"
      });
    }
    else{
      gsap.to(lookingForDriverPanelRef.current,{
        transform : "translateY(100%)"
      });
    }
  },[lookingForDriverPanel,setLookingForDriverPanel])

  useEffect(()=>{
    if(waitForDriverPanel){
      gsap.to(waitForDriverPanelRef.current,{
        transform : "translateY(0)"
      });
    }
    else{
      gsap.to(waitForDriverPanelRef.current,{
        transform : "translateY(100%)"
      });
    }
  },[waitForDriverPanel,setWaitForDriverPanel])


  const handleSubmit = (e) => {
    try{
      e.preventDefault();

    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className='h-screen relative overflow-hidden'>
      <img src = {logo}  alt='Error' className='w-16 absolute top-5 left-5' />

      <div className='h-screen w-screen'>
        <img src={tempImg} className='h-full w-full object-cover' alt="" />
      </div>

      <div className='h-screen absolute top-0 flex flex-col justify-end'>
        
        <div className='h-[30%] p-6 bg-white relative'>
 
          <h4 className='text-2xl font-semibold'>
            Find Trip
          </h4>
          <form onSubmit = {(e)=>handleSubmit(e)}>
            {/* <div className='line absolute h-16 w-1 top-[44%] left-[10%] bg-black rounded-full'></div> */}
           
              {
                panel && <i className="ri-arrow-down-s-line absolute top-3 right-3 text-xl" onClick={()=>setPanel(false)}></i>
              }
              {
                !panel &&  <i className="ri-arrow-up-s-line absolute top-3 right-3 text-xl" onClick={()=>setPanel(true)}></i>
              }
        
            <input type = "text" placeholder = "Add a pick-up location" className='bg-[#eeee] px-12 py-2 rounded-lg w-full mt-4   outline-black text-base' 
              value = {pickup}
              onChange={(e)=>{
                setPickup(e.target.value);
              }}
              onClick={()=>setPanel(true)}
            />
            
            <input type = "text" placeholder = "Enter your destination" className='bg-[#eeee] px-12 py-2 rounded-lg w-full mt-4 outline-black text-base' 
            value={destination}
              onChange={(e)=>{
                setDestination(e.target.value);
              }}
              onClick={()=>setPanel(true)}
            />
          </form>
        </div>

        <div className='bg-white' ref = {panelRef}>
          <LocationSearchPanel vehiclePanel={vehiclePanel} setVehiclePanel={setVehiclePanel} 
            panel = {panel} setPanel={setPanel}
          />
        </div>

      </div>
      
      <div className='fixed w-full z-10 bottom-0 p-1 bg-white py-7 px-2  ' ref={vehichlePanelRef}>
          <VehiclePanelRef setVehiclePanel = {setVehiclePanel} setConfirmRidePanel={setConfirmRidePanel} />
      </div>

      <div className='fixed w-full z-10 bottom-0 p-1 bg-white py-6 px-3 pt-12  ' ref={confirmedRidePanelRef}>
        <ConfirmedRide confirmRidePanel={confirmRidePanel} setConfirmRidePanel={setConfirmRidePanel}
          lookingForDriverPanel={lookingForDriverPanel} setLookingForDriverPanel={setLookingForDriverPanel} 
          
        />
      </div>

      <div className='fixed w-full z-10 bottom-0 p-1 bg-white py-6 px-3 pt-12' ref={lookingForDriverPanelRef}>
        <LookingForDriver lookingForDriverPanel={lookingForDriverPanel} setLookingForDriverPanel={setLookingForDriverPanel}  />
      </div>

      <div className='fixed w-full z-10 bottom-0 p-1 bg-white py-6 px-3 pt-12' ref={waitForDriverPanelRef}>
        <WaitForDriver waitForDriverPanel={waitForDriverPanel} setWaitForDriverPanel={setWaitForDriverPanel}  />
      </div>

    </div>
  )
}