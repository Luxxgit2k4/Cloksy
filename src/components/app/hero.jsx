import React from 'react';
// importing shadcn components 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Calendar } from 'lucide-react'; 

export const Hero = () => {
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
            <div className="text-3xl font-bold">0.0h</div>
          </CardContent>
        </Card>

        {/* Billable Hours Card */}
        <Card>
          <CardHeader>
            <CardTitle>Billable Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0.0h</div>
          </CardContent>
        </Card>

        {/* Pending Approval Card */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
          </CardContent>
        </Card>
      </div>

      {/* Time Entries List Section */}
      {/* Main card container for the list of time entries */}
      <Card>
        <CardHeader>
          <CardTitle>Time Entries</CardTitle>
        </CardHeader>
        {/* Card content */}
        {/*  content for empty state */}
        <CardContent className="text-center text-gray-500 py-16">
          {/* Icon representing no entries */}
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          {/* Message when no entries exist */}
          <p className="text-black font-semibold mt-4">No time entries found</p>
          <p className="text-sm mt-1">Start by logging your first time entry</p>
          {/* Action button to add a new time entry */}
          <Button className="mt-4 bg-[#4F46E5]  hover:bg-[#4338CA]">+ Add New Entry</Button>
        </CardContent>
      </Card>

    </div>
  );
};
