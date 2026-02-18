import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Briefcase, Package, Monitor, Settings, LogOut, Users, FileText } from "lucide-react";
import clsx from "clsx";
import { useAuth } from "../context/useAuth";
import { Logo } from "../components/Logo";

const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Hardware Assets", href: "/hardware", icon: Monitor },
    { name: "Software Assets", href: "/software", icon: Package },
    { name: "Non-IT Assets", href: "/non-it", icon: Briefcase },
    { name: "Team", href: "/team", icon: Users },
    { name: "Reports", href: "/reports", icon: FileText },
];

export function Sidebar() {
    const location = useLocation();
    const { logout, user } = useAuth();

    return (
        <div className="flex flex-col h-full w-20 bg-base-200 text-base-content border-r border-base-300 transition-all duration-300 overflow-visible">
            <div className="p-4 flex justify-center">
                <Logo className="w-10 h-10 shadow-lg" />
            </div>

            <ul className="menu menu-lg w-full flex-1 px-0 gap-0 items-center">
                {navigation.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                        <li key={item.name} className="w-full relative h-12 flex items-center justify-center">
                            {isActive && (
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-px bg-primary rounded-t-md scale-y-50 origin-bottom" />
                            )}
                            <Link
                                to={item.href}
                                className={clsx(
                                    isActive ? "active text-primary" : "text-base-content/70 hover:text-base-content hover:bg-base-200",
                                    "flex items-center justify-center w-full h-full rounded-none px-0 tooltip tooltip-right"
                                )}
                                data-tip={item.name}
                            >
                                <item.icon className="w-6 h-6" />
                            </Link>
                        </li>
                    );
                })}
            </ul>

            <div className="p-4 border-t border-base-content/10 mt-auto flex flex-col gap-4 items-center">
                <div className="avatar placeholder tooltip tooltip-right cursor-pointer" data-tip={user?.name || "User"}>
                    <div className="bg-primary text-primary-content rounded-full w-10 flex items-center justify-center">
                        <span className="text-lg font-medium uppercase tracking-wider">
                            {user?.name?.charAt(0) || "U"}
                        </span>
                    </div>
                </div>

                <button
                    onClick={logout}
                    className="btn btn-ghost btn-circle btn-sm text-base-content/70 hover:text-error tooltip tooltip-right"
                    data-tip="Sign Out"
                >
                    <LogOut className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}
