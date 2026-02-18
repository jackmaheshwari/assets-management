import { User, Bell, Shield, Palette, Save } from "lucide-react";

export default function Settings() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-3xl font-bold text-base-content tracking-tight">Settings</h1>
                <p className="text-base-content/70 mt-1">Manage your account preferences and application configuration.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Sidebar Navigation (Simple) */}
                <div className="md:col-span-1">
                    <ul className="menu bg-base-100 rounded-box p-2 shadow-sm border border-base-200">
                        <li><a className="active"><User className="w-4 h-4" /> Profile</a></li>
                        <li><a><Palette className="w-4 h-4" /> Appearance</a></li>
                        <li><a><Bell className="w-4 h-4" /> Notifications</a></li>
                        <li><a><Shield className="w-4 h-4" /> Security</a></li>
                    </ul>
                </div>

                {/* Main Content Area */}
                <div className="md:col-span-2 space-y-6">
                    {/* Profile Section */}
                    <div className="card bg-base-100 shadow-xl border border-base-200">
                        <div className="card-body">
                            <h3 className="card-title text-lg font-bold mb-4">
                                <User className="w-5 h-5 text-primary" /> My Profile
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="avatar placeholder">
                                        <div className="bg-neutral text-neutral-content rounded-full w-16">
                                            <span className="text-xl">JD</span>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="btn btn-sm btn-outline">Change Avatar</button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Full Name</span>
                                        </label>
                                        <input type="text" defaultValue="John Doe" className="input input-bordered w-full" />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Email Address</span>
                                        </label>
                                        <input type="email" defaultValue="john.doe@example.com" className="input input-bordered w-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Preferences Section */}
                    <div className="card bg-base-100 shadow-xl border border-base-200">
                        <div className="card-body">
                            <h3 className="card-title text-lg font-bold mb-4">
                                <Palette className="w-5 h-5 text-primary" /> Preferences
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Dark Mode</p>
                                        <p className="text-sm text-base-content/60">Toggle the application theme.</p>
                                    </div>
                                    <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                                </div>
                                <div className="divider"></div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Compact Table View</p>
                                        <p className="text-sm text-base-content/60">Show more items per page.</p>
                                    </div>
                                    <input type="checkbox" className="toggle toggle-secondary" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Security Section */}
                    <div className="card bg-base-100 shadow-xl border border-base-200">
                        <div className="card-body">
                            <h3 className="card-title text-lg font-bold mb-4">
                                <Shield className="w-5 h-5 text-primary" /> Security
                            </h3>
                            <div className="space-y-4">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Two-Factor Authentication</span>
                                    </label>
                                    <select className="select select-bordered w-full">
                                        <option disabled selected>Select an option</option>
                                        <option>Email</option>
                                        <option>Authenticator App</option>
                                        <option>SMS</option>
                                    </select>
                                </div>
                                <button className="btn btn-error btn-outline btn-sm">Change Password</button>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button className="btn btn-primary gap-2 px-8 shadow-lg">
                            <Save className="w-4 h-4" /> Save All Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

