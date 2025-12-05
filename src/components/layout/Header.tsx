import { useState } from "react";
import { Bell, Search, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileMenuButton } from "./Sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onMobileMenuOpen: () => void;
}

export function Header({ onMobileMenuOpen }: HeaderProps) {
  const [notifications] = useState([
    { id: 1, title: "Budget Alert", message: "Nakuru County overspent by 15%", type: "warning" },
    { id: 2, title: "New Project", message: "Kisumu Water Project started", type: "info" },
    { id: 3, title: "Report Update", message: "Your report has been reviewed", type: "success" },
  ]);

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <MobileMenuButton onClick={onMobileMenuOpen} />
          
          {/* Search (Desktop) */}
          <div className="hidden md:flex relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects, counties, budgets..."
              className="w-80 bg-muted text-foreground placeholder:text-muted-foreground pl-10 pr-4 py-2 rounded-lg text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-kenya-red text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {notifications.length}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="font-display">Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((notif) => (
                <DropdownMenuItem key={notif.id} className="flex flex-col items-start gap-1 py-3 cursor-pointer">
                  <span className="font-semibold text-sm">{notif.title}</span>
                  <span className="text-xs text-muted-foreground">{notif.message}</span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center justify-center text-primary font-medium">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-display">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Dashboard</DropdownMenuItem>
              <DropdownMenuItem>My Reports</DropdownMenuItem>
              <DropdownMenuItem>Followed Projects</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-kenya-red">Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sign In Button */}
          <Button variant="default" size="sm" className="hidden sm:flex gap-2">
            <LogIn className="w-4 h-4" />
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
}
