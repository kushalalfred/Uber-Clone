import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import 'remixicon/fonts/remixicon.css' 

import Start from './pages/Start/Start'
import NotSupport from './pages/NotSupport/NotSupport';
import UserLogin from './pages/Login/UserLogin';
import UserSignup from './pages/Login/UserSignup';
import CaptainLogin from './pages/Login/CaptainLogin';
import CaptainSignup from './pages/Login/CaptainSignup';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Home from './pages/Home/Home';
import CaptainHome from './pages/Captains/CaptainHome/CaptainHome';

import CaptainProtectedWrapper from './pages/CaptainProtected/CaptainProtectedWrapper';
import UserProtectedWrapper from './pages/UserProtectedWrapper/UserProtectedWrapper';
 

export default function App() {
  // Use media query to detect if the screen width is small (mobile devices)
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const token = localStorage.getItem("token");

  const navigate = useNavigate("/home");

  // useEffect(()=>{
 
  //   const authenticateUser = ()=>{
  //     const allowedRoutes = ["/", "/login", "/signup", "/captainLogin", "/captainSignup"];
  //     const protectedRoutes = ["/home"]
  //     const token = localStorage.getItem("token");
  //     // If user has a token, navigate to /home
  //     if (token) {
        
  //       if(!protectedRoutes.includes[window.location.pathname]){
  //         // navigate("/home");
  //         // console.log("Here")
  //       }

  //     } else {
  //       // If user doesn't have a token, make sure they're on allowed public routes
  //       if (!allowedRoutes.includes(window.location.pathname)) {
  //         navigate("/");
  //       }
      
  //     }
  //   }
  //   authenticateUser()


  // },[]);

 

  return (
    <>
      {
        isMobile ? (
          <Routes>
            
            <Route path="/" element={<Start />} />
            
            <Route path="/login" element={<UserLogin/>} />
            <Route path="/signup" element={<UserSignup/>} />
            <Route path="/home" element = {<UserProtectedWrapper><Home/></UserProtectedWrapper>} />

            <Route path="/captainHome" element = {<CaptainProtectedWrapper><CaptainHome/></CaptainProtectedWrapper>} />
            <Route path = "/captainLogin" element={<CaptainLogin/>} />
            <Route path = "/captainSignup" element={<CaptainSignup/>} />
             
            <Route path="*" element={<PageNotFound/>} />

          </Routes>
        ) : (
          <NotSupport/>
        )
      }
    </>
  )
}
