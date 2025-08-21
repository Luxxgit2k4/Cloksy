import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppHeader } from './AppHeader';
import { Hero } from './hero';
import { ReportsPage } from './ReportsPage';
import { LogTimeModal } from './LogTimeModal';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

// Timesheet component by assembling all the components 
export const Timesheet = () => {
  const [user, setUser] = useState(null);
  const [timeEntries, setTimeEntries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // This new state will remember which entry we are currently editing
  const [editingEntry, setEditingEntry] = useState(null); 

  // State for filters 
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All Time');

  // State for delete confirmation
  const [entryToDelete, setEntryToDelete] = useState(null);

  useEffect(() => { 
    // This loads all our data when the app starts from the local storage
    const storedData = localStorage.getItem('user'); 
    if (storedData) { 
      setUser(JSON.parse(storedData)); 
    }

    const storedEntries = localStorage.getItem('timeEntries');
    if (storedEntries) { 
      setTimeEntries(JSON.parse(storedEntries)); 
    }
  }, []);

  // save the updated list to state and Local Storage
  const saveEntries = (updatedEntries) => {
    setTimeEntries(updatedEntries);
    localStorage.setItem('timeEntries', JSON.stringify(updatedEntries));
  };

  const handleSaveEntry = (entryData) => {
    if (editingEntry) { 
      // update entry
      const updatedEntries = timeEntries.map(entry => 
        entry.id === editingEntry.id ? { ...entry, ...entryData } : entry
      );
      saveEntries(updatedEntries);
    } else { 
      // add new entry
      const newEntry = { ...entryData, id: Date.now(), status: 'Pending' };
      saveEntries([...timeEntries, newEntry]);
    }
    
    setIsModalOpen(false);
    setEditingEntry(null);
  };

  const confirmDeleteEntry = () => {
    if (entryToDelete) {
      const updatedEntries = timeEntries.filter(entry => entry.id !== entryToDelete);
      saveEntries(updatedEntries);
      setEntryToDelete(null);
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

  const handleOpenAddModal = () => {
    setEditingEntry(null); 
    setIsModalOpen(true);
  };

  return (
    <div>
      <AppHeader user={user} onAddNewEntry={handleOpenAddModal} />
      <main className="container mx-auto p-4 md:p-6">
        <Routes>
          <Route 
            path="/" 
            element={
              <Hero 
                user={user}
                timeEntries={timeEntries} 
                onAddNewEntry={handleOpenAddModal}
                onEditEntry={handleOpenEditModal}
                onDeleteEntry={(id) => setEntryToDelete(id)} 
                onUpdateStatus={handleUpdateStatus}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                dateFilter={dateFilter}
                setDateFilter={setDateFilter}
              />
            } 
          />
          <Route 
            path="/reports" 
            element={<ReportsPage timeEntries={timeEntries} />} 
          />
        </Routes>
      </main>

      {isModalOpen && (
        <LogTimeModal 
          onSave={handleSaveEntry} 
          onClose={() => setIsModalOpen(false)} 
          existingEntry={editingEntry}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!entryToDelete} onOpenChange={() => setEntryToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Entry</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this entry? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setEntryToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteEntry}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
