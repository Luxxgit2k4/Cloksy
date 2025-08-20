import React from "react"
import { Routes, Route} from 'react-router-dom';
import { LandingPage } from "./components/Landing_page/LandingPage";
import { SignUpPage } from "./components/auth/Signup";
import { SignIn} from "./components/auth/SignIn"
function App() {
   return (
    // routes consist of all the paths or address to be made for navigation
    <Routes> 
      {/* Route is used to define path for a page
      Source: https://www.w3schools.com/react/react_router.asp  */}
      <Route path="/" element={<LandingPage />} /> 
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<SignIn />} />
      
    </Routes>
  )
}

export default App
