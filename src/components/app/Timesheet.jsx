import React from 'react';
import { AppHeader } from './AppHeader';
import { Hero } from './hero';

// This component's only job is to assemble the main app layout.
export const Timesheet = () => {
  return (
    <div>
      <AppHeader />
      <main className="container mx-auto p-4 md:p-6">
        {/* For now, we will just show the TimesheetsPage. */}
        {/* Later, we can add routing here to switch between Timesheets and Reports. */}
        <Hero />
      </main>
    </div>
  );
};