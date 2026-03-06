import { Search, PlusCircle, ShoppingBag, BookOpen, Clock, Megaphone, CheckCircle2, ChevronRight, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { Logo } from "../components/Logo";

export default function Landing() {
    const { user } = useAuth();

    const quickActions = [
        { name: "Report an Incident", icon: PlusCircle, href: "/tickets", desc: "Log a technical issue or bug", color: "text-error" },
        { name: "Request a Service", icon: ShoppingBag, href: "/software", desc: "Request new hardware or software", color: "text-primary" },
        { name: "Knowledge Base", icon: BookOpen, href: "/reports", desc: "Browse FAQs and help guides", color: "text-info" },
    ];

    const announcements = [
        { id: 1, title: "Scheduled Maintenance: Asset Database", date: "Oct 24, 2023", type: "Maintenance" },
        { id: 2, title: "New Software Request Policy Updated", date: "Oct 20, 2023", type: "Policy" },
    ];

    return (
        <div className="min-h-screen bg-base-200 font-sans">
            <header className="navbar bg-base-100 border-b border-base-300 px-6 md:px-12 sticky top-0 z-50">
                <div className="flex-1">
                    <Link to="/dashboard" className="flex items-center gap-3">
                        <Logo className="w-9 h-9" />
                        <span className="text-xl font-bold tracking-tight">Support Portal</span>
                    </Link>
                </div>
                <div className="flex-none">
                    <Link to="/login" className="btn btn-primary btn-sm md:btn-md rounded-xl px-8">Login</Link>
                </div>
            </header>

            {/* Hero Section */}
            <div className="bg-primary text-primary-content py-16 md:py-24 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4">How can we help you today?</h1>
                    <p className="text-primary-content/80 mb-10 text-lg">Search our knowledge base or browse services below</p>
                    
                    <div className="relative max-w-3xl mx-auto">
                        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                            <Search className="h-6 w-6 text-primary" />
                        </div>
                        <input
                            type="text"
                            placeholder="Type your question or keyword here..."
                            className="w-full pl-16 pr-4 py-6 bg-white border-none rounded-2xl text-slate-900 placeholder-slate-500 focus:ring-4 focus:ring-white/20 transition-all outline-none text-lg shadow-xl"
                        />
                        <div className="absolute inset-y-3 right-3">
                            <button className="btn btn-neutral rounded-xl px-8 h-full">Search</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Action Flex Layout */}
            <div className="max-w-6xl mx-auto -mt-12 px-6 pb-12">
                <div className="flex flex-wrap justify-center gap-6">
                    {quickActions.map((action) => (
                        <Link 
                            key={action.name} 
                            to={action.href}
                            className="card bg-base-100 shadow-xl border border-base-300 hover:border-primary/50 transition-all group p-6 rounded-2xl flex-1 min-w-[240px] max-w-sm"
                        >
                            <div className={`mb-4 ${action.color}`}>
                                <action.icon className="w-10 h-10 stroke-[1.5px]" />
                            </div>
                            <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">{action.name}</h3>
                            <p className="text-sm text-base-content/60">{action.desc}</p>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Main Content Area */}
            <main className="max-w-6xl mx-auto px-6 pb-20 space-y-12">
                
                {/* Announcements */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Megaphone className="w-5 h-5 text-warning" /> Announcements
                        </h2>
                        <button className="btn btn-ghost btn-sm text-primary">View All</button>
                    </div>
                    <div className="space-y-4">
                        {announcements.map(ann => (
                            <div key={ann.id} className="bg-base-100 p-5 rounded-xl border border-base-300 flex items-start gap-4 hover:shadow-md transition-shadow">
                                <div className="bg-warning/10 p-2 rounded-lg">
                                    <Megaphone className="w-5 h-5 text-warning" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-base-content hover:text-primary cursor-pointer">{ann.title}</h4>
                                    <p className="text-xs text-base-content/50 mt-1">{ann.type} • {ann.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Popular Articles */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-success" /> Popular Articles
                        </h2>
                        <button className="btn btn-ghost btn-sm text-primary">Browse KB</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <a className="block p-6 bg-base-100 rounded-xl border border-base-300 hover:bg-base-200 transition-colors shadow-sm">
                            <h5 className="font-semibold text-base mb-2">How to reset your workstation password</h5>
                            <span className="text-xs text-base-content/40">Viewed 1.2k times • Security</span>
                        </a>
                        <a className="block p-6 bg-base-100 rounded-xl border border-base-300 hover:bg-base-200 transition-colors shadow-sm">
                            <h5 className="font-semibold text-base mb-2">Setting up VPN on mobile devices</h5>
                            <span className="text-xs text-base-content/40">Viewed 850 times • Networking</span>
                        </a>
                        <a className="block p-6 bg-base-100 rounded-xl border border-base-300 hover:bg-base-200 transition-colors shadow-sm">
                            <h5 className="font-semibold text-base mb-2">Requesting hardware upgrades</h5>
                            <span className="text-xs text-base-content/40">Viewed 620 times • Procurement</span>
                        </a>
                    </div>
                </section>

            </main>

            {/* Footer */}
            <footer className="bg-base-100 border-t border-base-300 py-12 px-6">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-3 opacity-60">
                        <Logo className="w-8 h-8 grayscale" />
                        <span className="text-lg font-bold">Support Portal</span>
                    </div>
                    <div className="flex gap-8 text-sm text-base-content/60">
                        <a className="hover:text-primary link link-hover">Terms</a>
                        <a className="hover:text-primary link link-hover">Privacy</a>
                        <a className="hover:text-primary link link-hover">Contact</a>
                        <a className="hover:text-primary link link-hover">Status</a>
                    </div>
                    <p className="text-xs text-base-content/40">© 2026 AssetManager Inc. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
