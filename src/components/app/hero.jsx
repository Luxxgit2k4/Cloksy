import React from 'react';
// Importing shadcn components 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Trash2, Edit, CheckCircle, XCircle, Calendar } from 'lucide-react'; 
// hero component for timesheet page
export const Hero = ({  user, timeEntries=[], onAddNewEntry, onEditEntry, onDeleteEntry,  onUpdateStatus, searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter }) => {

  const calculateWorkingHours = (entry) => {
    if (!entry.startTime || !entry.endTime) return { hours: 0, minutes: 0, totalMinutes: 0 };
    
    const startTime = new Date(`1970-01-01T${entry.startTime}`);
    const endTime = new Date(`1970-01-01T${entry.endTime}`);
    
    let diffInMillis = endTime - startTime;
    
    if (diffInMillis < 0) { // Handles overnight entries
      diffInMillis += 24 * 60 * 60 * 1000;
    }
    
    let totalMinutes = diffInMillis / 1000 / 60;
    totalMinutes -= entry.breakMinutes || 0;
    totalMinutes += entry.overtimeMinutes || 0;
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    return { hours, minutes, totalMinutes };
  };

  const totalMinutes = timeEntries.reduce((acc, entry) => {
    return acc + calculateWorkingHours(entry).totalMinutes;
  }, 0);
  const totalHours = (totalMinutes / 60).toFixed(1);

   const billableMinutes = timeEntries.reduce((acc, entry) => {
    if (entry.isBillable) {
      return acc + calculateWorkingHours(entry).totalMinutes;
    }
    return acc;
  }, 0);
  const billableHours = (billableMinutes / 60).toFixed(1);

  const pendingCount = timeEntries.filter(entry => entry.status === 'Pending').length;

    // creating a new array called `filteredEntries` that will display in the table.
   const filteredEntries = timeEntries.filter(entry => {
    const searchMatch = entry.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        entry.description.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = statusFilter === 'All' || entry.status === statusFilter;
    return searchMatch && statusMatch;
  });

    return (
    // Main page container
    <div className="space-y-6">

      {/* Welcome Header Section */}
      <div className="flex justify-between items-center">
        <div>
          {/* Page title */}
          <h1 className="text-3xl font-bold">Welcome back!</h1>
          <p className="text-gray-500">
            Track your time efficiently and stay on top of your projects.
          </p>
        </div>
      </div>

      {/* Grid layout for the summary cards */}
      <div className="grid gap-4 md:grid-cols-3">

        {/* Total Hours Card */}
        <Card>
          {/* Card header */}
          <CardHeader>
            <CardTitle>Total Hours</CardTitle>
          </CardHeader>
          {/* Card content  */}
          <CardContent>
            <div className="text-3xl font-bold">{totalHours}h</div>
          </CardContent>
        </Card>

        {/* Billable Hours Card */}
        <Card>
          <CardHeader>
            <CardTitle>Billable Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{billableHours}h</div>
          </CardContent>
        </Card>

        {/* Pending Approval Card */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Time Entries List Section */}
      {/* Main card container for the list of time entries */}
   <Card>
        <CardHeader>
          <CardTitle>Time Entries</CardTitle>
          {/* This text will now correctly show the count of visible (filtered) entries */}
          <p className="text-sm text-gray-500">Showing {filteredEntries.length} of {timeEntries.length} entries</p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-2 mb-4">
            <div className="relative w-full md:w-auto flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                placeholder="Search projects, tasks..." 
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-auto"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {!timeEntries || timeEntries.length === 0 ? (
            <div className="text-center text-gray-500 py-16">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <p className="font-semibold mt-4">No time entries found</p>
              <p className="text-sm mt-1">Start by logging your first time entry</p>
              <Button className="mt-4" onClick={onAddNewEntry}>+ Add New Entry</Button>
            </div>
          ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Working hours</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* The table maps over the `filteredEntries` array */}
                    {filteredEntries.map((entry) => {
                      const duration = calculateWorkingHours(entry);
                      return (
                        <TableRow key={entry.id}>
                          <TableCell>{new Date(entry.date).toLocaleDateString('en-GB')}</TableCell>
                          <TableCell className="font-medium">{entry.project}</TableCell>
                          <TableCell>{`${duration.hours}h ${duration.minutes}m`}</TableCell>
                          <TableCell><Badge className={entry.status === 'Approved' ? 'bg-green-100 text-green-800' : entry.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}>{entry.status}</Badge></TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                                {user?.role === 'Manager' && entry.status === 'Pending' && (
                                <>
                                  <Button variant="ghost" size="icon" onClick={() => onUpdateStatus(entry.id, 'Approved')}><CheckCircle className="h-4 w-4 text-green-500" /></Button>
                                  <Button variant="ghost" size="icon" onClick={() => onUpdateStatus(entry.id, 'Rejected')}><XCircle className="h-4 w-4 text-red-500" /></Button>
                                </>
                              )}
                              <Button variant="ghost" size="icon" onClick={() => onEditEntry(entry)}><Edit className="h-4 w-4" /></Button>
                              <Button variant="ghost" size="icon" onClick={() => onDeleteEntry(entry.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
