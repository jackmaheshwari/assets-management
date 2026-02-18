import { useState } from "react";
import { Copy, Download, FileText, Filter } from "lucide-react";
import clsx from "clsx";

const tabs = [
    { id: "hardware", label: "Hardware" },
    { id: "software", label: "Software" },
    { id: "non-it", label: "Non-IT" },
];

export default function Reports() {
    const [activeTab, setActiveTab] = useState("hardware");

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
                    <p className="text-base-content/70 mt-1">Generate and view asset reports.</p>
                </div>
                <div className="flex gap-2">
                    <button className="btn btn-primary btn-sm gap-2">
                        <Download className="w-4 h-4" />
                        Export CSV
                    </button>
                    <button className="btn btn-outline btn-sm gap-2">
                        <Filter className="w-4 h-4" />
                        Filter
                    </button>
                </div>
            </div>

            <div className="tabs tabs-boxed bg-base-100 p-1 w-fit">
                {tabs.map((tab) => (
                    <a
                        key={tab.id}
                        className={clsx("tab", activeTab === tab.id && "tab-active")}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </a>
                ))}
            </div>

            <div className="card bg-base-100 shadow-sm border border-base-200">
                <div className="card-body items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center mb-4">
                        <FileText className="w-8 h-8 text-base-content/40" />
                    </div>
                    <h3 className="text-lg font-medium">No reports generated</h3>
                    <p className="text-base-content/60 max-w-sm mx-auto mt-2">
                        Select a category and apply filters to generate a report for {tabs.find(t => t.id === activeTab)?.label} assets.
                    </p>
                    <button className="btn btn-primary btn-sm mt-6">
                        Generate Report
                    </button>
                </div>
            </div>
        </div>
    );
}
