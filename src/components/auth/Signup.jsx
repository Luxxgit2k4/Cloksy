import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Logo, GoogleIcon } from "@/components/Landing_page/icon";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // importing useNavigate hook
import { ArrowLeft } from "lucide-react";

// source: https://ui.shadcn.com/docs/components/card
// Sign-up page component
export const SignUpPage = () => {

  const navigate = useNavigate(); // calling the hook and accessing the navigation
  const [email, setEmail] = useState(''); // State variable to update the state of email when the user enters
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); 

  const handleSignUp = () => {  // This runs when Create account button is clicked
    if (!email || !password || !role) {  // alerts the user when clicking without filling any fields 
      alert("Please fill in all fields.");
      return;
    }
    const user = { email, password, role }; // Creating an array of objects to store data
    localStorage.setItem('user', JSON.stringify(user)); // Converting object to string to store in local storage
    
    navigate('/profile-setup'); // navigates to profile setup page
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      
      {/* Logo and name section */}
      <div className="flex items-center space-x-2 mb-8">
        <Logo className="w-10 h-10" />
        <span className="text-3xl font-bold">Cloksy</span>
      </div>

      {/* Card container for sign-up form */}
      <Card className="w-full max-w-md">
        
        {/* Card Header */}
        <CardHeader className=" relative text-center">
          {/* Navigate back to landing page link using arrow back icon */}
           <Link to="/" className="absolute top-0 left-6 text-gray-500 hover:text-gray-800 transition-colors">
    <ArrowLeft size={24} />
  </Link>
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>
            Join Cloksy and start tracking your time
          </CardDescription>
        </CardHeader>
        
        {/* Card content */}
        <CardContent>
          <div className="space-y-2">
            
            {/* Email container*/}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              {/* When the email is entered the state is updated*/}
              <Input id="email" type="email" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            {/* Password container */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              {/* When the password is entered the state is updated*/}
              <Input id="password" type="password" placeholder="Create a password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            {/* Dropdown for selecting role*/}
            <div className="space-y-2">
              <Label htmlFor="role">Sign up as</Label>
              <Select onValueChange={setRole}> {/* in built function in Select shadcn component used to update the state */}
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employee">Employee</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Submit button */}
          <Button className="w-full mt-6 bg-[#453ece]  hover:bg-[#4338CA] cursor-pointer" onClick={handleSignUp}>Create Account</Button>
          
          {/* continue with container */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google authentication static button */}
          <Button variant="outline" className="w-full cursor-pointer">
            <div className="flex items-center justify-center gap-2">
            <GoogleIcon className="w-5 h-5" />
            <span>Continue with Google</span>
            </div>
          </Button>
          

          {/* Redirect link for existing users */}
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
           <Link to="/login"> <p className="underline cursor-pointer"> Sign in</p> 
              </Link>
            
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
