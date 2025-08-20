import React from 'react';

// Shadcn UI components for styling
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Logo } from "@/components/Landing_page/icon";

export const Profile = () => {
    const navigate = useNavigate() // accessing useNavigate hook
    const [displayName, setDisplayName] = useState('') // Updating the state for display name
    
    const handleSetup = () => {
        if (!displayName) {
      alert("Please enter a display name.");
      return;
    }
    // Getting data from local storage and passing to storedData variable
    const storedData = localStorage.getItem('user'); 
    // Condition to update data 
    if (storedData) {
      const userData = JSON.parse(storedData); // Converting string data to array of objects
      userData.displayName = displayName; // adding new key and value E.g. displayName = "Lakshmanan"
      localStorage.setItem('user', JSON.stringify(userData)); // Setting it to local storage by converting it into strings
      navigate('/timesheet'); 
    } else {
      alert("An error occurred. Please sign up again.");
      navigate('/signup');
    }
  }

  return (
    // Full-screen centered layout with light background
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      
      {/* Logo and Welcome message*/}
      <div className="flex items-center space-x-2 mb-8">
        <Logo className="w-10 h-10" />
        <span className="text-3xl font-bold">Welcome to Cloksy!</span>
      </div>

      {/* Profile setup card container*/}
      <Card className="w-full max-w-md">
        
        {/* Card header with title and short description */}
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
          <CardDescription>
            Add your name to personalize your experience
          </CardDescription>
        </CardHeader>
        
        {/* Form container */}
        <CardContent>
          <div className="space-y-4">

            {/* Display Name field */}
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input id="displayName" type="text" placeholder="Enter your display name" required value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            </div>

            <p className="text-xs text-gray-500">
              This name will be displayed on your timesheets and reports.
            </p>
          </div>

          {/* Submit button to complete setup */}
          <Button className="w-full mt-6 bg-[#3c34d8]  hover:bg-[#4338CA]" onClick={handleSetup}>Complete Setup</Button>
          
          <p className="mt-4 text-center text-xs text-gray-500">
            You can update your profile information anytime from your dashboard.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
