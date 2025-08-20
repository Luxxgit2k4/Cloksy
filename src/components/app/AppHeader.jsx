import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Landing_page/icon";

// Import dropdown menu components from shadcn/ui for user profile
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const AppHeader = ({ user, onAddNewEntry }) => {
  // Mock user data: normally fetched from Local Storage or API
//   const user = {
//     displayName: "Lakshmanan",
//     role: "Employee",
//   };

  const navigate = useNavigate(); 
  const location = useLocation();

  // Sign out handler: clear session & navigate to landing page
  const singout = () => {
    console.log("Signing out...");
    navigate('/');
  };

  if (!user) {
    return null;
  }

  return (
    // Main header bar
    <header className="bg-white border-b sticky top-0 z-10">
      
      {/* Header container */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Left section: Logo and main navigation */}
        <div className="flex items-center gap-6">
          
          {/* Logo and App name container */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <Logo className="w-8 h-8" /> {/* Logo icon */}
            <span className="text-xl font-bold">Cloksy</span> 
          </Link> 

          {/* Desktop navigation, hidden on mobile shown on screens >768px */}
          <nav className="hidden md:flex items-center space-x-4">
            {/* Condition to highlight current active nav bar using location hook*/}
  <Link
    to="/timesheet"
    className={location.pathname === '/timesheet' ? 'font-semibold' : 'font-normal'}
  >
    Timesheets
  </Link>
  <Link
    to="/reports"
    className={location.pathname === '/reports' ? 'font-semibold' : 'font-normal'}
  >
    Reports
  </Link>
</nav>
</div>
        
        {/* Right section: actions (+Entries button) and user profile */}
        <div className="flex items-center gap-4">
          
          {/* Quick action button */}
          <Button className="bg-[#4F46E5]  hover:bg-[#4338CA]" onClick={onAddNewEntry}>+ Entries</Button>

          {/* User profile dropdown */}
         <DropdownMenu>
  {/* Dropdown trigger: opens the menu */}
  <DropdownMenuTrigger asChild>
    {/* Single avatar button for all screen sizes */}
   <Button variant="ghost" className="relative h-10 w-10 rounded-full overflow-hidden">
  <img
    className="absolute inset-0 w-full h-full object-cover"
    src={`https://api.dicebear.com/8.x/initials/svg?seed=${user.displayName}`}
    alt={user.displayName}
  />
</Button>

  </DropdownMenuTrigger>

  {/* Dropdown content: menu items displayed when trigger is clicked */}
  <DropdownMenuContent className="w-56" align="end" forceMount>
    
    {/* User information section at the top */}
    <DropdownMenuLabel className="font-normal">
      <div className="flex flex-col space-y-1">
        <p className="text-sm font-medium leading-none">{user.displayName}</p>
        <p className="text-xs leading-none text-muted-foreground">{user.role}</p>
      </div>
    </DropdownMenuLabel>

    <DropdownMenuSeparator /> {/* Divider in buil shadcn*/}

    {/* Mobile navigation links inside dropdown */}
    <div className="md:hidden">
      <DropdownMenuItem>Timesheets</DropdownMenuItem>
      <DropdownMenuItem>Reports</DropdownMenuItem>
      <DropdownMenuSeparator /> {/* Divider before profile items */}
    </div>

    {/* Standard menu items for desktop and mobile */}
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuSeparator /> {/* Divider  */}
    <DropdownMenuItem 
      onClick={singout} 
      className="text-red-500 cursor-pointer"
    >
      Sign out
    </DropdownMenuItem>

  </DropdownMenuContent>
</DropdownMenu>


        </div>
      </div>
    </header>
  );
};
