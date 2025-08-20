import React from 'react';
// Importing shadcn components 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Search, Trash2, Edit } from 'lucide-react'; 
import { Calendar } from 'lucide-react'; 
// hero component for timesheet page
export const Hero = ({ timeEntries=[], onAddNewEntry, onEditEntry, onDeleteEntry }) => {

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
        </CardHeader>
        {/* Card content for empty state */}
        <CardContent>
          {!timeEntries || timeEntries.length === 0 ? (
          <div className="text-center text-gray-500 py-16">
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <p className="text-black font-semibold mt-4">No time entries found</p>
          <p className="text-sm mt-1">Start by logging your first time entry</p>
          {/* Button to enter log */}
          <Button className="mt-4 bg-[#4F46E5]  hover:bg-[#4338CA]" onClick={onAddNewEntry}>+ Add New Entry</Button>
        </div>
        ) : (
          <div className="space-y-4">
              {/* --- FILTER BAR --- */}
              <div className="flex flex-col md:flex-row items-center gap-2">
                <div className="relative w-full md:w-auto flex-grow">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input placeholder="Search projects, tasks..." className="pl-8 w-full" />
                </div>
                <Select>
                  <SelectTrigger className="w-full md:w-auto"><SelectValue placeholder="Daily" /></SelectTrigger>
                  <SelectContent><SelectItem value="daily">Daily</SelectItem></SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full md:w-auto"><SelectValue placeholder="All projects" /></SelectTrigger>
                  <SelectContent>{/* Options will go here */}</SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full md:w-auto"><SelectValue placeholder="Status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* --- DATA TABLE --- */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Task</TableHead>
                      <TableHead>Working hours</TableHead>
                      <TableHead>Billable</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {timeEntries.map((entry) => (
        
                      <TableRow key={entry.id}>
                        <TableCell>{new Date(entry.date).toLocaleDateString('en-GB')}</TableCell>
                        <TableCell className="font-medium">{entry.project}</TableCell>
                        <TableCell>{entry.description}</TableCell>
                          <TableCell>{`${calculateWorkingHours(entry).hours}h ${calculateWorkingHours(entry).minutes}m`}</TableCell>
                        <TableCell>
                          <Badge variant={entry.isBillable ? "default" : "secondary"}>
                            {entry.isBillable ? 'Billable' : 'Non-Billable'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{entry.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" onClick={() => onEditEntry(entry)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => onDeleteEntry(entry.id)}>
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
};
