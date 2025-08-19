import React from "react";
import { Button } from "../ui/button";
import { Link } from 'react-router-dom'

// Hero component 
export const Hero = () => {
    return (
       
        <section className="text-center py-16 md:py-24 px-6">
            {/* Hero headline */}
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                Track Time, <span className="text-[#4F46E5]">Boost Productivity</span>
            </h1>

             {/* Sub paragraph to show what is the site about */}
            <p className="max-w-md md:max-w-2xl mx-auto text-gray-600 mt-4 text-lg">Streamline your workflow with our intuitive timesheet application. Perfect for teams and individuals who value efficiency and accuracy.</p>
       
        {/* Buttons container centered */}
       <div className="mt-8 flex justify-center gap-4">
       <Button size="lg" className="bg-[#4F46E5] hover:bg-[#4338CA]" asChild><Link to="/signup">Get Started Free</Link></Button>
        <Button size="lg" variant="outline" className="text-[#4F46E5]" asChild><Link to="/login">Sign In</Link></Button>
       </div>
        </section>

    );
};