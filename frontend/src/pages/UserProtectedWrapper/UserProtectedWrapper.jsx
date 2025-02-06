import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../../context/UserContext';
import axios from 'axios';

export default function UserProtectedWrapper({children}) {
    
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [isLoading, setIsLoading] = useState(false);
    
    const {user,setUser} = useContext(UserDataContext);

 
    useEffect(()=>{
        const checkToken = async()=>{

            try{
                const token = localStorage.getItem("token");
                if(!token){
                    navigate("/");
                }

                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
                    headers : {
                        Authorization : `Bearer ${token}`, 
                    }
                })
 
                if(response.status===200){
                    if(!response.data.user){
                        throw new "User is not Present"
                    }
                    setUser(response.data.user);
                    setIsLoading(false);
                }


            }catch(error){
                console.log(error);
                localStorage.removeItem("token");
                navigate("/");
                setIsLoading(false);
            }
            finally{
                setIsLoading(false)
            }



        }
        checkToken();
    },[])
 
 
    return (
    <>
        {children}
    </>
  )
}
