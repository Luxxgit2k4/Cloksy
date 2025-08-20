import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo, GoogleIcon } from "@/components/Landing_page/icon";
import { Link } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sign in component 
export const SignIn = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSignIn = () => {
    if (!email || !password) {  // alerts the user when clicking without filling any fields 
      alert("Please fill in all fields.");
      return;
    }
    const storedData = localStorage.getItem('user');
    if (storedData) {
      const userData = JSON.parse(storedData);
      if (email === userData.email && password === userData.password) {

        userData.role = role;
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/timesheet');
      } else {
        alert("Invalid Email or Password. Try Again !");
      }
    } 
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      
      {/* Logo and name section */}
      <div className="flex items-center space-x-2 mb-8">
        <Logo className="w-10 h-10" />
        <span className="text-3xl font-bold">Cloksy</span>
      </div>

      {/* Card container for sign-in form */}
      <Card className="w-full max-w-md">
        
        {/* Card header with title and subtitle */}
        <CardHeader className="relative text-center">
          {/* Navigate back to landing page link using arrow back icon */}
            <Link to="/" className="absolute top-0 left-6 text-gray-500 hover:text-gray-800 transition-colors">
    <ArrowLeft size={24} />
  </Link>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to your Cloksy account</CardDescription>
        </CardHeader>
        
        {/* Card content containing form fields and actions */}
        <CardContent>
          <div className="space-y-4">
            
            {/* Email Container */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            {/* Password Container */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          
          <div className="space-y-2">
              <Label htmlFor="role">Sign in as</Label>
              <Select onValueChange={setRole} > {/* in built function in Select shadcn component used to update the state */}
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employee">Employee</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>

          {/* Sign-in button */}
          <Button className="w-full mt-6 bg-[#4F46E5]  hover:bg-[#4338CA] cursor-pointer " onClick={handleSignIn}>Sign In</Button>
          
          {/* Divider for alternative login methods */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Google authentication static button */}
          <Button variant="outline" className="w-full cursor-pointer">
                     <div className="flex items-center justify-center gap-2">
                     <GoogleIcon className="w-5 h-5" />
                     <span>Continue with Google</span>
                     </div>
                   </Button>

          {/* Redirection to sign up page for users without account */}
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
           <Link to="/signup"> <p className="underline cursor-pointer"> Sign up</p> 
              </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
