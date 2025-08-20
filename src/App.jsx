import React from "react"
import { Routes, Route} from 'react-router-dom';
import { LandingPage } from "./components/Landing_page/LandingPage";
import { SignUpPage } from "./components/auth/Signup";
import { SignIn} from "./components/auth/SignIn"
import { Profile } from "./components/auth/Profile"
import { Timesheet } from "./components/app/Timesheet";
function App() {
   return (
    // routes consist of all the paths or address to be made for navigation
    <Routes> 
      {/* Route is used to define path for a page
      Source: https://www.w3schools.com/react/react_router.asp  */}
      <Route path="/" element={<LandingPage />} /> 
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/profile-setup" element={<Profile />} />
      <Route path="/timesheet" element={<Timesheet />} />
      
    </Routes>
  )
}

export default App
