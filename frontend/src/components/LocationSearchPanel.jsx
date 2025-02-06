import React from 'react'

export default function LocationSearchPanel(props) {

  const locations = []



  return (
    <div className='flex flex-col gap-4'>
     
      <div className='flex items-center justify-start gap-4 border-2 active:border-black active:border-2 p-2 rounded-xl'
        onClick = {()=>{
          props.setVehiclePanel(true);
          props.setPanel(false)
        }}
      >
        <h2 className='bg-[#eee] p-4 rounded-lg'>
          <i className="ri-map-pin-line font-bold"></i>
        </h2>
        <h4 className='font-medium'>
          24B, Near Kapoor's Cafe, Sheryians Coding School Bhopla
        </h4>
      </div>

    </div>
  )
}
