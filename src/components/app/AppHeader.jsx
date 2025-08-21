import React from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
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
 
//   const user = {
//     displayName: "Lakshmanan",
//     role: "Employee",
//   };

  const navigate = useNavigate(); 
  const location = useLocation();

  // sign out handler clear session & navigate to landing page
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
        
        {/* left Logo and main navigation */}
        <div className="flex items-center gap-6">
          
          {/* Logo and App name container */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <Logo className="w-8 h-8" /> {/* Logo icon */}
            <span className="text-xl font-bold">Cloksy</span> 
          </Link> 

          {/* Desktop navigation, hidden on mobile shown on screens >768px */}
          <nav className="hidden md:flex items-center space-x-4">
            {/* Condition to highlight current active nav bar using location hook*/}
              <NavLink 
              to="/dashboard"  
              end // The `end` prop is important for the main dashboard link
              className={({ isActive }) => isActive ? "font-semibold text-blue-600" : "font-normal text-gray-500"}
            >
              Timesheets
            </NavLink>
            <NavLink 
              to="/dashboard/reports" 
              className={({ isActive }) => isActive ? "font-semibold text-blue-600" : "font-normal text-gray-500"}
            >
              Reports
            </NavLink>
</nav>
</div>
        
        {/* Right section: actions (+Entries button) and user profile */}
        <div className="flex items-center gap-4">
          
          {/* Quick action button */}
          {location.pathname !== '/dashboard/reports' && (
            <Button  className="bg-[#453ece]  hover:bg-[#4338CA] cursor-pointer"onClick={onAddNewEntry}>+ Entries</Button>
          )}
          {/* User profile dropdown */}
         <DropdownMenu>
  {/* Dropdown trigger opens the menu */}
  <DropdownMenuTrigger asChild>
    {/*user icon button for all screen sizes */}
   <Button variant="ghost" className="relative h-10 w-10 rounded-full overflow-hidden">
  <img
    className="absolute inset-0 w-full h-full object-cover"
    src={`https://api.dicebear.com/8.x/initials/svg?seed=${user.displayName}`}
    alt={user.displayName}
  />
</Button>

  </DropdownMenuTrigger>

  {/* menu items displayed when trigger is clicked */}
  <DropdownMenuContent className="w-56" align="end" forceMount>
    
    {/* user information section at the top */}
    <DropdownMenuLabel className="font-normal">
      <div className="flex flex-col space-y-1">
        <p className="text-sm font-medium leading-none">{user.displayName}</p>
        <p className="text-xs leading-none text-muted-foreground">{user.role}</p>
      </div>
    </DropdownMenuLabel>

    <DropdownMenuSeparator /> {/* Divider in built shadcn*/}

    {/* mobile navigation links inside dropdown */}
    <div className="md:hidden">
      <Link to="/dashboard">
        <DropdownMenuItem>Timesheets</DropdownMenuItem>
      </Link>
      <Link to="/dashboard/reports">
        <DropdownMenuItem>Reports</DropdownMenuItem>
      </Link>
      <DropdownMenuSeparator /> 
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
