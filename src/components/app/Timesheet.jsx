import React from 'react';
import { AppHeader } from './AppHeader';
import { Hero } from './hero';
import { useState, useEffect } from 'react';

// Timesheet component by assembling all the components 
export const Timesheet = () => {
  const [user, setUser] = useState(null);
      useEffect(() => { 
    // This loads all our data when the app starts from the local storage
    const storedUser = localStorage.getItem('user'); // Getting user details from local storage string 
    if (storedUser) { setUser(JSON.parse(storedUser)); }
  }, []);


   return (
    <div>
      <AppHeader user={user} />
      <main className="container mx-auto p-4 md:p-6">

        <Hero />
      </main>
    </div>
  );
};