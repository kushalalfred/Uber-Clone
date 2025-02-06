import React, { createContext, useState } from 'react'

export const UserDataContext  = createContext();

export default function UserContext({children}) {
  
    const [user,setUser] = useState({});
    const [isLoading,setIsLoading] = useState(false);
  
    return (
    <div>
        <UserDataContext.Provider value={{user,setUser,isLoading,setIsLoading}} >
            {children}
        </UserDataContext.Provider>
    </div>
  )
}
