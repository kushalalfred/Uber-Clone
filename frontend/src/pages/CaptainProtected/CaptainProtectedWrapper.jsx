import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import  axios  from 'axios';
import { CaptainDataContext } from '../../context/CaptainContext'

export default function CaptainProtectedWrapper({children}) {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const {captain,setCaptain}  = useContext(CaptainDataContext)
    
    useEffect(()=>{
        const checkToken = async()=>{

            try{
                const token = localStorage.getItem("token");
                if(!token){
                    navigate("/");
                }
    
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`,{
                    headers : {
                        Authorization : `Bearer ${token}`, 
                    }
                })
                if(response.status===200){
                    if(!response.data.captain){
                        throw new "Captain is not Present"
                    }
                    setCaptain(response.data.captain);
                    setIsLoading(false);
                }

            }catch(error){
                console.log(error);
                localStorage.removeItem("token");
                navigate("/");
                setIsLoading(false);
            }
            finally{
                setIsLoading(false);
            }          
        }
        checkToken();
    },[]);

    if(isLoading){
        return <div>Loading...</div>
    }

 
  
    return (
    <>
        {children}
    </>
  )
}
