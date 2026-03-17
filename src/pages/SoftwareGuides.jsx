import { useState, useMemo } from "react";
import { Search, BookOpen, ChevronLeft, ExternalLink, Download, MessageSquare, Info, Shield, Monitor, Key, Globe, Zap, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "../components/Logo";

const CATEGORIES = [
    { id: "all", name: "All Articles", icon: BookOpen },
    { id: "getting-started", name: "Getting Started", icon: Zap },
    { id: "accounts", name: "Accounts & Access", icon: Key },
    { id: "hardware", name: "Hardware & Devices", icon: Monitor },
    { id: "software", name: "Software & Apps", icon: Download },
    { id: "network", name: "Network & Wi-Fi", icon: Globe },
    { id: "security", name: "Security & Compliance", icon: Shield },
];

const ALL_ARTICLES = [
    { 
        id: 1, 
        title: "New Hire IT Onboarding Guide", 
        category: "getting-started",
        publisher: "IT Ops", 
        description: "Everything you need to know about your first day: equipment setup, account credentials, and core tools.",
        lastUpdated: "March 2026",
        readTime: "10 min",
        popularity: 1200
    },
    { 
        id: 2, 
        title: "How to Reset Your Workstation Password", 
        category: "accounts",
        publisher: "Security Team", 
        description: "Step-by-step instructions for resetting your domain password using the self-service portal.",
        lastUpdated: "Feb 2026",
        readTime: "3 min",
        popularity: 2500
    },
    { 
        id: 3, 
        title: "Setting Up Multi-Factor Authentication (MFA)", 
        category: "accounts",
        publisher: "Security Team", 
        description: "Learn how to configure Microsoft Authenticator or Duo on your mobile device for secure login.",
        lastUpdated: "Jan 2026",
        readTime: "5 min",
        popularity: 1800
    },
    { 
        id: 4, 
        title: "VPN Access: Connecting from Home", 
        category: "network",
        publisher: "Network Admin", 
        description: "Detailed instructions for establishing a secure connection to the corporate network via GlobalProtect.",
        lastUpdated: "March 2026",
        readTime: "6 min",
        popularity: 1500
    },
    { 
        id: 5, 
        title: "Adobe Creative Cloud: Installation & Activation", 
        category: "software",
        publisher: "Adobe", 
        description: "Learn how to download the Creative Cloud Desktop app and sign in with your enterprise ID.",
        lastUpdated: "March 2026",
        readTime: "5 min",
        popularity: 900
    },
    { 
        id: 6, 
        title: "Microsoft 365: Optimizing Teams Workflow", 
        category: "software",
        publisher: "Microsoft", 
        description: "A comprehensive guide on using Teams for effective communication and integrated app usage.",
        lastUpdated: "Feb 2026",
        readTime: "8 min",
        popularity: 1100
    },
    { 
        id: 7, 
        title: "Troubleshooting Common Printer Issues", 
        category: "hardware",
        publisher: "Hardware Support", 
        description: "Fix paper jams, connectivity errors, and driver issues for office and remote printers.",
        lastUpdated: "Jan 2026",
        readTime: "7 min",
        popularity: 800
    },
    { 
        id: 8, 
        title: "Reporting Phishing and Suspicious Emails", 
        category: "security",
        publisher: "Security Team", 
        description: "How to use the 'Report Phish' button in Outlook to flag suspicious content for analysis.",
        lastUpdated: "March 2026",
        readTime: "4 min",
        popularity: 2100
    },
    { 
        id: 9, 
        title: "Requesting Hardware Upgrades", 
        category: "hardware",
        publisher: "Procurement", 
        description: "The official process for requesting a laptop refresh or additional peripheral equipment.",
        lastUpdated: "Feb 2026",
        readTime: "5 min",
        popularity: 1300
    }
];

export default function SoftwareGuides() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");

    const filteredArticles = useMemo(() => {
        return ALL_ARTICLES.filter(article => {
            const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                article.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === "all" || article.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeCategory]);

    return (
        <div className="min-h-screen bg-base-200 font-sans flex flex-col">
            {}
            <header className="navbar bg-base-100 border-b border-base-300 px-6 md:px-12 sticky top-0 z-50">
                <div className="flex-1 flex items-center gap-4">
                    <Link to="/" className="btn btn-ghost btn-circle btn-sm bg-base-200 hover:bg-base-300">
                        <ChevronLeft className="w-5 h-5 text-base-content" />
                    </Link>
                    <div className="flex items-center gap-3">
                        <Logo className="w-9 h-9" />
                        <span className="text-xl font-bold tracking-tight text-base-content">Knowledge Base</span>
                    </div>
                </div>
            </header>

            <div className="flex-1 flex flex-col md:flex-row max-w-[1440px] mx-auto w-full">
                {}
                <aside className="w-full md:w-72 bg-base-100 border-r border-base-300 p-6 space-y-2 shrink-0">
                    <h2 className="text-xs font-bold text-base-content/40 uppercase tracking-widest mb-4 px-2">Categories</h2>
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-medium text-sm ${
                                activeCategory === cat.id 
                                ? "bg-primary text-primary-content shadow-lg shadow-primary/20" 
                                : "hover:bg-base-200 text-base-content/70 hover:text-base-content"
                            }`}
                        >
                            <cat.icon className="w-4 h-4" />
                            {cat.name}
                        </button>
                    ))}
                    
                    <div className="pt-8 mt-8 border-t border-base-200">
                        <h2 className="text-xs font-bold text-base-content/40 uppercase tracking-widest mb-4 px-2">Need Help?</h2>
                        <Link to="/tickets" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-base-200 text-base-content/70 hover:text-base-content transition-all font-medium text-sm">
                            <MessageSquare className="w-4 h-4 text-info" />
                            Create Support Ticket
                        </Link>
                    </div>
                </aside>

                {}
                <main className="flex-1 p-6 md:p-10">
                    {}
                    <nav className="flex items-center gap-2 text-xs text-base-content/40 mb-6 font-medium">
                        <Link to="/" className="hover:text-primary">Support Portal</Link>
                        <ChevronLeft className="w-3 h-3 rotate-180" />
                        <span className="text-base-content/80">Knowledge Base</span>
                        {activeCategory !== "all" && (
                            <>
                                <ChevronLeft className="w-3 h-3 rotate-180" />
                                <span className="text-primary capitalize">{activeCategory.replace("-", " ")}</span>
                            </>
                        )}
                    </nav>

                    {/* Page Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                        <div>
                            <h1 className="text-3xl font-extrabold text-base-content mb-2">
                                {activeCategory === "all" ? "Knowledge Base" : CATEGORIES.find(c => c.id === activeCategory).name}
                            </h1>
                            <p className="text-base-content/50 max-w-xl">
                                Browse our comprehensive guides, FAQs, and troubleshooting articles to find the help you need.
                            </p>
                        </div>

                        <div className="md:hidden relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                className="input input-bordered w-full pl-12 h-12 shadow-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {filteredArticles.map((article) => (
                            <div key={article.id} className="group flex bg-base-100 rounded-2xl border border-base-300 hover:border-primary/40 hover:shadow-xl transition-all overflow-hidden cursor-pointer">
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <div className="bg-primary/10 p-2 rounded-lg">
                                                <FileText className="w-5 h-5 text-primary" />
                                            </div>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-base-content/40">{article.publisher}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-[10px] text-base-content/40">
                                            <Zap className="w-3 h-3 fill-warning text-warning" />
                                            {article.popularity.toLocaleString()} views
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold text-base-content mb-2 group-hover:text-primary transition-colors">
                                        {article.title}
                                    </h3>
                                    <p className="text-sm text-base-content/50 line-clamp-2 leading-relaxed mb-6">
                                        {article.description}
                                    </p>
                                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-base-200">
                                        <div className="text-[10px] font-medium text-base-content/30 uppercase tracking-tighter">
                                            Updated {article.lastUpdated} • {article.readTime}
                                        </div>
                                        <div className="flex items-center gap-1 text-primary text-xs font-bold group-hover:gap-2 transition-all uppercase tracking-widest">
                                            Read Article <ExternalLink className="w-3 h-3" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {filteredArticles.length === 0 && (
                            <div className="col-span-full py-24 text-center">
                                <div className="bg-base-300 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Info className="w-10 h-10 opacity-20" />
                                </div>
                                <h3 className="text-2xl font-bold text-base-content/40">No articles found</h3>
                                <p className="text-base-content/30 mt-2">Try adjusting your search or category filters</p>
                                <button 
                                    onClick={() => {setSearchQuery(""); setActiveCategory("all");}}
                                    className="btn btn-outline btn-primary btn-sm rounded-lg mt-8"
                                >
                                    Reset all filters
                                </button>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {}
            <footer className="bg-base-100 border-t border-base-300 py-10 px-6 mt-auto">
                <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3 opacity-60">
                        <Logo className="w-7 h-7 grayscale" />
                        <span className="text-base font-bold">Support Portal</span>
                    </div>
                    <p className="text-[10px] text-base-content/30">© 2026 AssetManager Inc. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
