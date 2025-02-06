import React, { createContext, useState } from 'react'

export const CaptainDataContext  = createContext();

export default function CaptainContext({children}) {
  
    const [captain,setCaptain] = useState({});
    const [isLoading,setIsLoading] = useState(false);

  
    return (
    <div>
        <CaptainDataContext.Provider value={{captain,setCaptain,isLoading,setIsLoading}} >
            {children}
        </CaptainDataContext.Provider>
    </div>
  )
}
