import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { KeyRound, Mail, ArrowRight } from "lucide-react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Mock async login for effect
        setTimeout(() => {
            if (login(email, password)) {
                navigate(from, { replace: true });
            } else {
                setError("Invalid credentials. Try admin@example.com / password");
            }
        }, 500);
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
            <div className="card lg:card-side bg-base-100 shadow-2xl max-w-4xl w-full overflow-hidden border border-base-200">
                <div className="card-body w-full lg:w-1/2 p-8 lg:p-12">
                    <div className="flex flex-col h-full justify-center">
                        <div className="mb-8">
                            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-4 text-primary-content">
                                <KeyRound className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-bold">Welcome back</h2>
                            <p className="text-base-content/60 mt-2">Please enter your details to sign in.</p>
                        </div>

                        {error && (
                            <div role="alert" className="alert alert-error mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-2">
                                    <Mail className="w-4 h-4 opacity-70" />
                                    <input
                                        type="email"
                                        className="grow"
                                        placeholder="admin@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-2">
                                    <KeyRound className="w-4 h-4 opacity-70" />
                                    <input
                                        type="password"
                                        className="grow"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </label>
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>

                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">
                                    Sign in <ArrowRight className="w-4 h-4 ml-2" />
                                </button>
                            </div>
                        </form>

                        <div className="mt-6 text-center text-sm text-base-content/60">
                            Don't have an account? <a href="#" className="link link-primary">Contact Admin</a>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 bg-primary relative hidden lg:flex flex-col items-center justify-center p-12 text-primary-content">
                    <div className="absolute inset-0 bg-linear-to-br from-primary to-secondary opacity-90"></div>
                    <div className="relative z-10 text-center space-y-6">
                        <h1 className="text-4xl font-bold">Asset Manager</h1>
                        <p className="text-lg opacity-90">Streamline your hardware and software tracking with our modern solution.</p>
                        <div className="mockup-window border bg-base-300 w-full max-w-sm mx-auto shadow-2xl">
                            <div className="flex justify-center px-4 py-16 bg-base-200 text-base-content font-mono text-sm leading-6">
                                &gt; System.init()<br />
                                &gt; Loading modules...<br />
                                &gt; Ready.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
