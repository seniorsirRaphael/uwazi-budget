import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn, UserPlus, Shield, Newspaper, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth, DEMO_CREDENTIALS } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/images/logo.png";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      toast({
        title: "Welcome to Uwazi Budget!",
        description: "You have successfully signed in.",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Authentication Failed",
        description: result.error,
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  const fillCredentials = (role: keyof typeof DEMO_CREDENTIALS) => {
    setEmail(DEMO_CREDENTIALS[role].email);
    setPassword(DEMO_CREDENTIALS[role].password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-kenya-black via-kenya-red/80 to-kenya-green" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative z-10 flex flex-col justify-center px-16">
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            src={logo}
            alt="Uwazi Budget"
            className="w-32 h-32 mb-8"
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-display font-bold text-white mb-4"
          >
            Uwazi Budget
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl text-white/90 font-display"
          >
            See Every Shilling, Build Our Nation
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-white/70 max-w-md"
          >
            Access real-time budget data, track government projects, and hold your leaders accountable.
          </motion.p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <img src={logo} alt="Uwazi Budget" className="w-12 h-12" />
            <span className="font-display font-bold text-2xl text-foreground">Uwazi Budget</span>
          </div>

          <div className="bg-card border border-border rounded-3xl p-8 shadow-xl">
            <h2 className="font-display font-bold text-2xl text-foreground mb-2">
              {isLogin ? "Welcome back" : "Create account"}
            </h2>
            <p className="text-muted-foreground mb-6">
              {isLogin ? "Sign in to access your dashboard" : "Join the transparency movement"}
            </p>

            {/* Demo Credentials Section */}
            <div className="mb-6 p-4 bg-muted/50 rounded-xl border border-border">
              <p className="text-sm font-medium text-foreground mb-3">Demo Credentials:</p>
              <div className="grid grid-cols-1 gap-2">
                <button
                  type="button"
                  onClick={() => fillCredentials("citizen")}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-background transition-colors text-left"
                >
                  <User className="w-4 h-4 text-success" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Citizen</p>
                    <p className="text-xs text-muted-foreground">{DEMO_CREDENTIALS.citizen.email}</p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => fillCredentials("journalist")}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-background transition-colors text-left"
                >
                  <Newspaper className="w-4 h-4 text-trust" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Journalist</p>
                    <p className="text-xs text-muted-foreground">{DEMO_CREDENTIALS.journalist.email}</p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => fillCredentials("official")}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-background transition-colors text-left"
                >
                  <Shield className="w-4 h-4 text-warning" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Government Official</p>
                    <p className="text-xs text-muted-foreground">{DEMO_CREDENTIALS.official.email}</p>
                  </div>
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">Password for all: [role]123</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                variant="kenya"
                className="w-full py-6 text-base"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {isLogin ? "Signing in..." : "Creating account..."}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    {isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                    {isLogin ? "Sign In" : "Create Account"}
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
