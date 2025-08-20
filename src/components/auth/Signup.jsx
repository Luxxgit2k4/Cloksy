import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Logo, GoogleIcon } from "@/components/Landing_page/icon";
import { Link } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";

// source: https://ui.shadcn.com/docs/components/card
// Sign-up page component
export const SignUpPage = () => {
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
              <Input id="email" type="email" placeholder="Enter your email" required />
            </div>

            {/* Password container */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Create a password" required />
            </div>

            {/* Dropdown for selecting role*/}
            <div className="space-y-2">
              <Label htmlFor="role">Sign up as</Label>
              <Select>
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
          <Button className="w-full mt-6 bg-[#4F46E5]  hover:bg-[#4338CA]" asChild><Link to="/profile-setup">Create Account</Link></Button>
          
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
          <Button variant="outline" className="w-full">
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
