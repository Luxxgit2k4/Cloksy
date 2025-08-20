import React from 'react';
import { AppHeader } from './AppHeader';
import { Hero } from './hero';
import { useState, useEffect } from 'react';
import { LogTimeModal } from './LogTimeModal';

// Timesheet component by assembling all the components 
export const Timesheet = () => {
  const [user, setUser] = useState(null);
  const [timeEntries, setTimeEntries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

      useEffect(() => { 
    // This loads all our data when the app starts from the local storage
    const storedData = localStorage.getItem('user'); // Getting user details from local storage string 
    if (storedData) { setUser(JSON.parse(storedData)); }

     const storedEntries = localStorage.getItem('timeEntries');
    if (storedEntries) { setTimeEntries(JSON.parse(storedEntries)); }
  }, []);

  const handleAddTimeEntry = (newEntry) => {
    const updatedEntries = [...timeEntries, newEntry];
    setTimeEntries(updatedEntries);
    localStorage.setItem('timeEntries', JSON.stringify(updatedEntries));
    setIsModalOpen(false); // Close the modal after saving
  };

   return (
    <div>
      <AppHeader user={user} onAddNewEntry={() => setIsModalOpen(true)} />
      <main className="container mx-auto p-4 md:p-6">

        <Hero  timeEntries={timeEntries} 
          onAddNewEntry={() => setIsModalOpen(true)} />
      </main>
      {isModalOpen && (
        <LogTimeModal 
          onSave={handleAddTimeEntry} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>

  );
};