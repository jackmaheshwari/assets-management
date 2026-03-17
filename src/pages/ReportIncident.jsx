import { useState } from "react";
import { ChevronLeft, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { api, endpoints } from "../services/api";
import { useAuth } from "../context/useAuth";
import { Logo } from "../components/Logo";

export default function ReportIncident() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "Hardware",
        priority: "Medium",
        assetName: "",
        raisedBy: user?.name || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await api.post(endpoints.tickets, formData);
            setSubmitted(true);
            setTimeout(() => navigate("/"), 3000);
        } catch (err) {
            console.error("Failed to submit ticket:", err);
            setError("Failed to report incident. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
                <div className="card bg-base-100 shadow-2xl max-w-md w-full p-8 text-center animate-in zoom-in-95 duration-300">
                    <div className="flex justify-center mb-6">
                        <div className="bg-success/10 p-4 rounded-full">
                            <CheckCircle2 className="w-16 h-16 text-success" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Incident Reported!</h2>
                    <p className="text-base-content/60 mb-8">
                        Your issue has been logged and automatically assigned to an IT specialist. 
                        You'll be redirected to the landing page shortly.
                    </p>
                    <Link to="/" className="btn btn-primary w-full">Return Home Now</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200 font-sans">
            <header className="navbar bg-base-100 border-b border-base-300 px-6 md:px-12 sticky top-0 z-50">
                <div className="flex-1 flex items-center gap-4">
                    <Link to="/" className="btn btn-ghost btn-circle btn-sm bg-base-200 hover:bg-base-300">
                        <ChevronLeft className="w-5 h-5 text-base-content" />
                    </Link>
                    <div className="flex items-center gap-3">
                        <Logo className="w-9 h-9" />
                        <span className="text-xl font-bold tracking-tight text-base-content">Support Portal</span>
                    </div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 py-12 md:py-20">
                <div className="mb-10">
                    <h1 className="text-4xl font-extrabold text-base-content mb-3">Report an Incident</h1>
                    <p className="text-base-content/50 text-lg">
                        Describe the technical issue you're experiencing. Our system will automatically route it to the right person.
                    </p>
                </div>

                <div className="card bg-base-100 shadow-xl border border-base-300 overflow-hidden">
                    <div className="bg-primary h-2 w-full"></div>
                    <form onSubmit={handleSubmit} className="p-8 space-y-8">
                        {error && (
                            <div className="alert alert-error shadow-sm">
                                <AlertCircle className="w-5 h-5" />
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="space-y-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold text-base">Issue Title</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="input input-bordered w-full h-14 text-lg focus:input-primary transition-all"
                                    required
                                    placeholder="e.g., My laptop screen is flickering"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold text-base">Detailed Description</span>
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="textarea textarea-bordered w-full h-40 text-lg focus:textarea-primary transition-all"
                                    required
                                    placeholder="Please provide as much detail as possible..."
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold text-base">Category</span>
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="select select-bordered w-full h-14 focus:select-primary"
                                    >
                                        <option value="Hardware">Hardware Issue</option>
                                        <option value="Software">Software Issue</option>
                                    </select>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold text-base">Priority</span>
                                    </label>
                                    <select
                                        name="priority"
                                        value={formData.priority}
                                        onChange={handleChange}
                                        className="select select-bordered w-full h-14 focus:select-primary"
                                    >
                                        <option value="Low">Low - Not urgent</option>
                                        <option value="Medium">Medium - Normal</option>
                                        <option value="High">High - Important</option>
                                        <option value="Urgent">Urgent - Critical Block</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold text-base">Affected Asset</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="assetName"
                                        value={formData.assetName}
                                        onChange={handleChange}
                                        className="input input-bordered w-full h-14 focus:input-primary"
                                        required
                                        placeholder="e.g., MacBook Pro 16 (Serial: C02...)"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold text-base">Your Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="raisedBy"
                                        value={formData.raisedBy}
                                        onChange={handleChange}
                                        className={`input input-bordered w-full h-14 focus:input-primary transition-all ${user ? 'bg-base-200 cursor-not-allowed' : ''}`}
                                        required
                                        placeholder="Enter your full name"
                                        readOnly={!!user}
                                    />
                                    {!user && <span className="label-text-alt text-base-content/40 mt-2 px-1">You are reporting as a guest</span>}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-4 pt-6">
                            <Link to="/" className="btn btn-ghost h-14 px-8">Cancel</Link>
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-primary h-14 px-12 text-lg shadow-lg shadow-primary/20"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5 mr-2" />
                                        Submit Incident
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
