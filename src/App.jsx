import { Header } from "@/components/Landing_page/Header";
import { Hero } from "@/components/Landing_page/Hero";
import { Features } from "@/components/Landing_page/Features";
import { Footer } from "@/components/Landing_page/Footer";
import React from "react"
import { Routes, Route} from 'react-router-dom';
import { LandingPage } from "./components/Landing_page/LandingPage";
function App() {
   return (
    <div className="min-h-screen flex flex-col bg-gray-50">
    <Header />
    <Hero />
    <Features />
    <Footer />
    </div>
    // routes consist of all the paths or address to be made for navigation
    <Routes> 
      {/* Route is used to define path for a page
      Source: https://www.w3schools.com/react/react_router.asp  */}
      <Route path="/" element={<LandingPage />} /> 
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  )
}

export default App
