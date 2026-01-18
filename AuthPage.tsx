import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music2, Mail, Lock, User, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SpotifyConnect } from "./SpotifyConnect";

interface AuthPageProps {
  onAuthComplete: () => void;
}

export function AuthPage({ onAuthComplete }: AuthPageProps) {
  const [step, setStep] = useState<"auth" | "spotify">("auth");
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth - replace with real auth later
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setStep("spotify");
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    // Simulate Google auth - replace with real auth later
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setStep("spotify");
  };

  const handleSpotifyConnect = () => {
    onAuthComplete();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-500/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-2xl animate-float" />
      </div>

      <AnimatePresence mode="wait">
        {step === "auth" ? (
          <motion.div
            key="auth"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex-1 flex flex-col items-center justify-center p-6 relative z-10"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 15, delay: 0.2 }}
              className="mb-8"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl tunely-glow">
                <Music2 className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-8"
            >
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Welcome to <span className="text-primary">Tunely</span>
              </h1>
              <p className="text-muted-foreground">
                Discover music through the people around you
              </p>
            </motion.div>

            {/* Auth Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full max-w-sm"
            >
              {/* Toggle */}
              <div className="flex bg-muted rounded-xl p-1 mb-6">
                <button
                  onClick={() => setMode("signup")}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    mode === "signup"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground"
                  }`}
                >
                  Sign Up
                </button>
                <button
                  onClick={() => setMode("login")}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    mode === "login"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground"
                  }`}
                >
                  Log In
                </button>
              </div>

              {/* Google Sign In */}
              <Button
                variant="outline"
                className="w-full h-12 mb-4 gap-3 text-base font-medium hover:bg-muted/50"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with email
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === "signup" && (
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="pl-10 h-12 bg-muted/50 border-0 focus-visible:ring-primary"
                    />
                  </div>
                )}
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="pl-10 h-12 bg-muted/50 border-0 focus-visible:ring-primary"
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="pl-10 h-12 bg-muted/50 border-0 focus-visible:ring-primary"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 text-base font-semibold gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      {mode === "signup" ? "Create Account" : "Sign In"}
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>

              {mode === "login" && (
                <p className="text-center text-sm text-muted-foreground mt-4">
                  <button className="text-primary hover:underline">
                    Forgot password?
                  </button>
                </p>
              )}
            </motion.div>

          </motion.div>
        ) : (
          <SpotifyConnect onConnect={handleSpotifyConnect} onBack={() => setStep("auth")} />
        )}
      </AnimatePresence>
    </div>
  );
}
