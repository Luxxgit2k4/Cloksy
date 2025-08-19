import React from "react";
// importing button component from pre built shadcn components
import { Button } from "@/components/ui/button";

// Header component 
export const LandingHeader = () => {
    return (
        // Header with responsive design md (medium screens)
        <header className="w-full bg-white py-4 px-6 md:px-10 flex items-center border-b">
{/* Logo and Name section */ }
<div className="flex items-center space-x-2" > 
<div className="w-8 h-8 bg-blue-600 rounded-md"></div>
<span className="text-2xl font-bold">Cloksy</span>
</div> 

{/* Pushes the buttons to the right end */}
<div className="flex-grow"></div>

{/* Button section */}
<div className="flex items-center space-x-4">
    <Button variant="ghost">Log In</Button>
    <Button className="bg-[#4F46E5] hover:bg-[#4338CA] ">Sign Up</Button>
</div>
        </header>
    );
};
