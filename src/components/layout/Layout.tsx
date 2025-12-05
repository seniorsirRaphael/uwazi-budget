import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function Layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />
      
      <div 
        className="flex-1 min-h-screen transition-all duration-300"
        style={{ marginLeft: sidebarCollapsed ? 72 : 260 }}
      >
        <div className="hidden lg:block">
          <Header onMobileMenuOpen={() => setMobileMenuOpen(true)} />
          <main className="p-4 lg:p-6">
            <Outlet />
          </main>
        </div>
        <div className="lg:hidden">
          <Header onMobileMenuOpen={() => setMobileMenuOpen(true)} />
          <main className="p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
