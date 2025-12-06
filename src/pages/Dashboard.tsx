import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import CitizenDashboard from "@/components/dashboards/CitizenDashboard";
import JournalistDashboard from "@/components/dashboards/JournalistDashboard";
import OfficialDashboard from "@/components/dashboards/OfficialDashboard";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/auth" replace />;
  }

  switch (user.role) {
    case "citizen":
      return <CitizenDashboard user={user} />;
    case "journalist":
      return <JournalistDashboard user={user} />;
    case "official":
      return <OfficialDashboard user={user} />;
    default:
      return <Navigate to="/auth" replace />;
  }
}
