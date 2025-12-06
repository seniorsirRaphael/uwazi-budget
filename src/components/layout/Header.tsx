import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Search, User, LogIn, LogOut, X, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileMenuButton } from "./Sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
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
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, title: "Budget Alert", message: "Nakuru County overspent by 15%", type: "warning", time: "2h ago" },
    { id: 2, title: "New Project", message: "Kisumu Water Project started", type: "info", time: "5h ago" },
    { id: 3, title: "Report Update", message: "Your report has been reviewed", type: "success", time: "1d ago" },
  ]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="flex items-center justify-between h-14 sm:h-16 px-3 sm:px-4 lg:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          <MobileMenuButton onClick={onMobileMenuOpen} />
          
          {/* Search (Desktop) */}
          <div className="hidden md:flex relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects, counties, budgets..."
              className="w-64 lg:w-80 bg-muted text-foreground placeholder:text-muted-foreground pl-10 pr-4 py-2 rounded-lg text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>

          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </Button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-kenya-red text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {notifications.length}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 sm:w-80">
              <DropdownMenuLabel className="font-display flex items-center justify-between">
                Notifications
                <span className="text-xs text-muted-foreground font-normal">{notifications.length} new</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((notif) => (
                <DropdownMenuItem key={notif.id} className="flex flex-col items-start gap-1 py-3 cursor-pointer">
                  <div className="flex items-center justify-between w-full">
                    <span className="font-semibold text-sm">{notif.title}</span>
                    <span className="text-xs text-muted-foreground">{notif.time}</span>
                  </div>
                  <span className="text-xs text-muted-foreground line-clamp-2">{notif.message}</span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center justify-center text-primary font-medium">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-kenya-green flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-display">
                  <p className="truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground font-normal capitalize">{user.role} Account</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="cursor-pointer">My Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Profile Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-kenya-red cursor-pointer">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth">
              <Button variant="default" size="sm" className="gap-2 text-xs sm:text-sm">
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Sign In</span>
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Search Bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-border overflow-hidden"
          >
            <div className="p-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search projects, counties, budgets..."
                  autoFocus
                  className="w-full bg-muted text-foreground placeholder:text-muted-foreground pl-10 pr-4 py-2.5 rounded-lg text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
