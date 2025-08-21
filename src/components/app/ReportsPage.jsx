import React, { useState, useMemo } from 'react';
import { subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subMonths } from 'date-fns';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bar, BarChart, Pie, PieChart, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

export const ReportsPage = ({ timeEntries = [] }) => {
  const [dateFilter, setDateFilter] = useState('This Week');

  // helper to get total working minutes for an entry
  const calculateWorkingMinutes = (entry) => {
    if (!entry.startTime || !entry.endTime) return 0;

    const startTime = new Date(`1970-01-01T${entry.startTime}`);
    const endTime = new Date(`1970-01-01T${entry.endTime}`);
    let diffInMillis = endTime - startTime;

    // handle overnight shifts (end before start)
    if (diffInMillis < 0) diffInMillis += 24 * 60 * 60 * 1000;

    let totalMinutes = diffInMillis / 1000 / 60;
    totalMinutes -= entry.breakMinutes || 0;
    totalMinutes += entry.overtimeMinutes || 0;

    return totalMinutes;
  };

  // filter entries based on selected date range
  const now = new Date();
  const filteredEntries = timeEntries.filter(entry => {
    const entryDate = new Date(entry.date);

    if (dateFilter === 'Last Week') {
      const lastWeekStart = startOfWeek(subDays(now, 7), { weekStartsOn: 1 });
      const lastWeekEnd = endOfWeek(subDays(now, 7), { weekStartsOn: 1 });
      return entryDate >= lastWeekStart && entryDate <= lastWeekEnd;
    }

    if (dateFilter === 'This Month') {
      const thisMonthStart = startOfMonth(now);
      const thisMonthEnd = endOfMonth(now);
      return entryDate >= thisMonthStart && entryDate <= thisMonthEnd;
    }

    if (dateFilter === 'Last Month') {
      const lastMonthStart = startOfMonth(subMonths(now, 1));
      const lastMonthEnd = endOfMonth(subMonths(now, 1));
      return entryDate >= lastMonthStart && entryDate <= lastMonthEnd;
    }

    if (dateFilter === 'Last 3 Months') {
      const threeMonthsAgoStart = startOfMonth(subMonths(now, 2));
      return entryDate >= threeMonthsAgoStart && entryDate <= now;
    }

    // default = this week
    const thisWeekStart = startOfWeek(now, { weekStartsOn: 1 });
    const thisWeekEnd = endOfWeek(now, { weekStartsOn: 1 });
    return entryDate >= thisWeekStart && entryDate <= thisWeekEnd;
  });

  // crunch all the report numbers in one go
  const reportData = useMemo(() => {
    const totalMinutes = filteredEntries.reduce((acc, entry) => acc + calculateWorkingMinutes(entry), 0);
    const billableMinutes = filteredEntries.reduce((acc, entry) => entry.isBillable ? acc + calculateWorkingMinutes(entry) : acc, 0);
    const totalDays = new Set(filteredEntries.map(entry => entry.date.split('T')[0])).size;
    
    const totalHours = (totalMinutes / 60).toFixed(1);
    const billableHours = (billableMinutes / 60).toFixed(1);
    const dailyAverage = totalDays > 0 ? (totalMinutes / totalDays / 60).toFixed(1) : '0.0';
    const billableRate = totalMinutes > 0 ? ((billableMinutes / totalMinutes) * 100).toFixed(0) : '0';

    // group minutes by project
    const projectHours = filteredEntries.reduce((acc, entry) => {
      const minutes = calculateWorkingMinutes(entry);
      acc[entry.project] = (acc[entry.project] || 0) + minutes;
      return acc;
    }, {});
    const barChartData = Object.entries(projectHours).map(([name, minutes]) => ({
      name,
      hours: parseFloat((minutes / 60).toFixed(1)),
    }));

    // billable vs non-billable split
    const pieChartData = [
      { name: 'Billable', value: billableMinutes },
      { name: 'Non-billable', value: totalMinutes - billableMinutes },
    ];
    
    return { totalHours, billableHours, dailyAverage, billableRate, barChartData, pieChartData };
  }, [filteredEntries]);

  // quick CSV export function
  const handleExportCSV = () => {
    const headers = "Date,Project,Task,Working Hours,Billable,Status";

    const csvRows = filteredEntries.map(entry => {
      const durationInMinutes = calculateWorkingMinutes(entry);
      const hours = Math.floor(durationInMinutes / 60);
      const minutes = durationInMinutes % 60;
      return [
        new Date(entry.date).toLocaleDateString('en-GB'),
        `"${entry.project.replace(/"/g, '""')}"`,
        `"${entry.description.replace(/"/g, '""')}"`,
        `${hours}h ${minutes}m`,
        entry.isBillable ? 'Yes' : 'No',
        entry.status
      ].join(',');
    });

    const csvString = [headers, ...csvRows].join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'cloksy_report.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* header: title + filters + export btn */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold">Reports</h1>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="This Week">This Week</SelectItem>
              <SelectItem value="Last Week">Last Week</SelectItem>
              <SelectItem value="This Month">This Month</SelectItem>
              <SelectItem value="Last Month">Last Month</SelectItem>
              <SelectItem value="Last 3 Months">Last 3 Months</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-[#453ece]  hover:bg-[#4338CA] cursor-pointer" onClick={handleExportCSV}>Export CSV</Button>
        </div>
      </div>

      {/* top summary cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card><CardHeader><CardTitle>Total Hours</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold">{reportData.totalHours}h</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Billable Hours</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold">{reportData.billableHours}h</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Daily Average</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold">{reportData.dailyAverage}h</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Billable Rate</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold">{reportData.billableRate}%</div></CardContent></Card>
      </div>

      {/* charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Hours by Project</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={reportData.barChartData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                <Tooltip />
                <Bar dataKey="hours" fill="#4F46E5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Billable vs Non-billable</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={reportData.pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  <Cell key="billable" fill="#4F46E5" />
                  <Cell key="non-billable" fill="#E5E7EB" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
