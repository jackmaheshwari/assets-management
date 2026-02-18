import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { Logo } from "../components/Logo";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const success = await login(email, password);
        if (success) {
            navigate(from, { replace: true });
        } else {
            setError("Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-cover bg-center font-sans"
            style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1629814684497-76b3843815c3?q=80&w=2574&auto=format&fit=crop')` // Cloud/Sky background
            }}
        >
            {/* Logo Top Left */}
            <div className="absolute top-8 left-8 flex items-center gap-3 text-slate-800 z-20">
                <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><circle cx="12" cy="12" r="4"></circle></svg>
                </div>
                <span className="text-xl font-bold tracking-tight">AssetManager</span>
            </div>

            {/* Glass Card */}
            <div className="relative w-full max-w-[480px] bg-white/40 backdrop-blur-2xl border border-white/50 rounded-[3rem] shadow-2xl p-8 md:p-12 z-10 transition-all duration-300">

                <div className="flex flex-col items-center text-center mb-8">
                    <div className="w-16 h-16 bg-white/80 rounded-2xl flex items-center justify-center mb-6 shadow-sm ring-1 ring-white/50">
                        <LogIn className="w-7 h-7 text-slate-900" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Sign in</h1>
                    <p className="text-slate-600 mt-3 text-sm max-w-xs leading-relaxed">
                        Enter your credentials to log in
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-50/80 border border-red-100 text-red-600 text-sm font-medium flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="group">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-slate-800 transition-colors" />
                            </div>
                            <input
                                type="email"
                                className="w-full pl-11 pr-4 py-4 bg-slate-50/50 border-0 text-slate-900 placeholder-slate-500 rounded-2xl focus:ring-2 focus:ring-slate-900/10 focus:bg-white transition-all outline-none font-medium"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="group">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-slate-800 transition-colors" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full pl-11 pr-11 py-4 bg-slate-50/50 border-0 text-slate-900 placeholder-slate-500 rounded-2xl focus:ring-2 focus:ring-slate-900/10 focus:bg-white transition-all outline-none font-medium"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-700 transition-colors"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <a href="#" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                            Forgot password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-slate-900/20 active:scale-[0.98]"
                    >
                        Login
                    </button>
                </form>            </div>
        </div>
    );
}
