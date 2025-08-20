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

   // This new state will remember which entry we are currently editing.
  const [editingEntry, setEditingEntry] = useState(null); 

  // State for filters 
    const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All Time');

      useEffect(() => { 
    // This loads all our data when the app starts from the local storage
    const storedData = localStorage.getItem('user'); // Getting user details from local storage string 
    if (storedData) { setUser(JSON.parse(storedData)); }

     const storedEntries = localStorage.getItem('timeEntries');
    if (storedEntries) { setTimeEntries(JSON.parse(storedEntries)); }
  }, []);

  // save the updated list to state and Local Storage.
  const saveEntries = (updatedEntries) => {
    setTimeEntries(updatedEntries);
    localStorage.setItem('timeEntries', JSON.stringify(updatedEntries));
  };

   const handleSaveEntry = (entryData) => {
    if (editingEntry) { // If we are in "edit mode"...
      // We use .map() to find the entry with the matching ID and replace it.
      const updatedEntries = timeEntries.map(entry => 
        entry.id === editingEntry.id ? { ...entry, ...entryData } : entry
      );
      saveEntries(updatedEntries);
    } else { // If we are adding a new entry...
      const newEntry = { ...entryData, id: Date.now(), status: 'Pending' };
      saveEntries([...timeEntries, newEntry]);
    }
    // We close the modal and reset the editing state.
    setIsModalOpen(false);
    setEditingEntry(null);
  };

  const handleDeleteEntry = (entryId) => {
    // A confirmation box to prevent accidental deletion.
    if (window.confirm("Are you sure you want to delete this entry?")) {
      // We use .filter() to create a new array that includes every entry EXCEPT the one with the matching ID.
      const updatedEntries = timeEntries.filter(entry => entry.id !== entryId);
      saveEntries(updatedEntries);
    }
  };

  const handleUpdateStatus = (entryId, newStatus) => {
    const updatedEntries = timeEntries.map(entry => 
      entry.id === entryId ? { ...entry, status: newStatus } : entry
    );
    saveEntries(updatedEntries);
  };

  const handleOpenEditModal = (entry) => {
    setEditingEntry(entry);
    setIsModalOpen(true);
  };

  // This new function opens the modal for adding a new entry.
  const handleOpenAddModal = () => {
    setEditingEntry(null); // We make sure we are not in edit mode.
    setIsModalOpen(true);
  };

   return (
    <div>
      <AppHeader user={user} onAddNewEntry={handleOpenAddModal} />
      <main className="container mx-auto p-4 md:p-6">

       <Hero 
          user={user}
          timeEntries={timeEntries} 
          onAddNewEntry={handleOpenAddModal}
          onEditEntry={handleOpenEditModal}
          onDeleteEntry={handleDeleteEntry} 
          onUpdateStatus={handleUpdateStatus}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
           dateFilter={dateFilter}
          setDateFilter={setDateFilter}
        /> </main>
      {isModalOpen && (
        <LogTimeModal 
         onSave={handleSaveEntry} 
          onClose={() => setIsModalOpen(false)} 
          existingEntry={editingEntry}
        />
      )}
    </div>

  );
};