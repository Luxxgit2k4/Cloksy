import React from 'react'
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast';

export const LogTimeModal = ({ onSave, onClose, existingEntry, isSaving }) => {
  // keeping track of all the form stuff
  const [date, setDate] = useState(new Date())
  const [project, setProject] = useState('')
  const [description, setDescription] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [breakMinutes, setBreakMinutes] = useState(0)
  const [overtimeMinutes, setOvertimeMinutes] = useState(0)
  const [isBillable, setIsBillable] = useState(false)

// This `useEffect` hook watches for changes to the `existingEntry` prop
  useEffect(() => {
    if (existingEntry) {
      setDate(new Date(existingEntry.date));
      setProject(existingEntry.project);
      setDescription(existingEntry.description);
      setStartTime(existingEntry.startTime);
      setEndTime(existingEntry.endTime);
      setBreakMinutes(existingEntry.breakMinutes || 0);
      setOvertimeMinutes(existingEntry.overtimeMinutes || 0);
      setIsBillable(existingEntry.isBillable || false);
    } else {
      // If we are adding a new entry, reset the form to be empty.
      setDate(new Date());
      setProject('');
      setDescription('');
      setStartTime('');
      setEndTime('');
      setBreakMinutes(0);
      setOvertimeMinutes(0);
      setIsBillable(false);
    }
  }, [existingEntry]);
  // handle saving the form
  const handleSave = () => {
    if (!project || !startTime  || !date) {
      toast('Please fill the required fields')
      return
    }
    const entryData = {
      id: Date.now(),
      date: date.toISOString(),
      project,
      description,
      startTime,
      endTime,
      breakMinutes,
      overtimeMinutes,
      isBillable,
      status: 'Pending'
    }
    onSave(entryData)
  }
  return (
    <Dialog open onOpenChange={onClose}>
      {/* modal content with fixed header and footer, scrollable middle */}
      <DialogContent className="sm:max-w-lg grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90vh]">
        
        {/* header with title and description */}
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-2xl">{existingEntry ? "Edit Time Entry" : "Log Time Entry"}</DialogTitle>
          <DialogDescription>
            Fill in the details for your time entry and hit save when done
          </DialogDescription>
        </DialogHeader>

        {/* form fields container, scrolls if too tall */}
        <div className="space-y-4 px-6 overflow-y-auto">
          {/* date picker with popover calendar */}
          <div className="space-y-2">
            <Label htmlFor="date">Date*</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          {/* project input */}
          <div className="space-y-2">
            <Label htmlFor="project">Project*</Label>
            <Input id="project" value={project} onChange={(e) => setProject(e.target.value)} />
          </div>

          {/* description textarea */}
          <div className="space-y-2">
            <Label htmlFor="description">Task description*</Label>
            <Textarea
              id="description"
              placeholder="what have you worked on"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* start and end time side by side on medium screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start time*</Label>
              <Input id="startTime" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End time</Label>
              <Input id="endTime" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </div>
          </div>

          {/* break and overtime inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="break">Break in (mins)</Label>
              <Input
                id="break"
                type="number"
                value={breakMinutes}
                onChange={(e) => setBreakMinutes(parseInt(e.target.value, 10) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="overtime">Overtime in (mins)</Label>
              <Input
                id="overtime"
                type="number"
                value={overtimeMinutes}
                onChange={(e) => setOvertimeMinutes(parseInt(e.target.value, 10) || 0)}
              />
            </div>
          </div>

          {/* toggle for billable */}
          <div className="flex items-center justify-between pt-2">
            <Label htmlFor="billable" className="text-base">Billable</Label>
            <Switch id="billable" checked={isBillable} onCheckedChange={setIsBillable}  />
          </div>
        </div>

        {/* footer with cancel and save buttons */}
        <DialogFooter className="p-6 pt-4 border-t">
          <Button variant="ghost" onClick={onClose} disabled={isSaving}>Cancel</Button>
          <Button onClick={handleSave} disabled={isSaving}>{isSaving ? (
          // If we are saving, show a spinner and "Saving..."
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Saving...
          </>
        ) : (
          // Otherwise, show the normal text.
          existingEntry ? "Save Changes" : "Save Entry"
        )} </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
