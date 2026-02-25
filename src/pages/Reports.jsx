import { useState, useEffect } from "react";
import { Download, FileText, Filter } from "lucide-react";
import clsx from "clsx";
import { api, endpoints } from "../services/api";
import { AssetTable } from "../components/AssetTable";
import { StatusBadge } from "../components/StatusBadge";

const tabs = [
    { id: "hardware", label: "Hardware" },
    { id: "software", label: "Software" },
    { id: "non-it", label: "Non-IT" },
    { id: "tickets", label: "Tickets" },
];

export default function Reports() {
    const [activeTab, setActiveTab] = useState("hardware");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const endpointMap = {
                hardware: endpoints.hardware,
                software: endpoints.software,
                "non-it": endpoints.nonIT,
                tickets: endpoints.tickets
            };
            const result = await api.get(endpointMap[activeTab]);
            setData(result);
            setSelectedIds([]); // Clear selection when tab changes
        } catch (error) {
            console.error("Failed to fetch report data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const getColumns = () => {
        if (activeTab === "hardware") {
            return [
                { key: "assetId", label: "ID" },
                { key: "name", label: "Name" },
                { key: "status", label: "Status", render: (s) => <StatusBadge status={s} /> },
                { key: "assignee", label: "Assignee" },
                { key: "purchaseDate", label: "Purchase Date" }
            ];
        }
        if (activeTab === "software") {
            return [
                { key: "name", label: "Name" },
                { key: "version", label: "Version" },
                { key: "publisher", label: "Publisher" },
                { key: "installDate", label: "Install Date" }
            ];
        }
        if (activeTab === "non-it") {
            return [
                { key: "assetId", label: "ID" },
                { key: "name", label: "Name" },
                { key: "assignee", label: "Location" },
                { key: "purchaseDate", label: "Purchase Date" }
            ];
        }
        if (activeTab === "tickets") {
            return [
                { key: "title", label: "Issue" },
                { key: "category", label: "Category" },
                { key: "priority", label: "Priority" },
                { key: "status", label: "Status", render: (s) => <StatusBadge status={s} /> },
                { key: "raisedBy", label: "Raised By" }
            ];
        }
        return [];
    };

    const handleExport = () => {
        const itemsToExport = selectedIds.length > 0 
            ? data.filter(item => selectedIds.includes(item._id || item.id))
            : data;

        const headers = getColumns().map(c => c.label).join(",");
        const rows = itemsToExport.map(item => 
            getColumns().map(c => item[c.key]).join(",")
        ).join("\n");
        const csvContent = "data:text/csv;charset=utf-8," + headers + "\n" + rows;
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${activeTab}_report.csv`);
        document.body.appendChild(link);
        link.click();
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
                    <p className="text-base-content/70 mt-1">Generate and view asset reports.</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={handleExport} className="btn btn-primary btn-sm gap-2">
                        <Download className="w-4 h-4" />
                        {selectedIds.length > 0 ? `Export Selected (${selectedIds.length})` : 'Export All CSV'}
                    </button>
                </div>
            </div>

            <div className="tabs tabs-boxed bg-base-100 p-1 w-fit">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={clsx("tab", activeTab === tab.id && "tab-active")}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="text-center py-20">Loading report...</div>
            ) : data.length > 0 ? (
                <AssetTable 
                    columns={getColumns()} 
                    data={data} 
                    selectedIds={selectedIds}
                    onSelect={setSelectedIds}
                />
            ) : (
                <div className="card bg-base-100 shadow-sm border border-base-200">
                    <div className="card-body items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center mb-4">
                            <FileText className="w-8 h-8 text-base-content/40" />
                        </div>
                        <h3 className="text-lg font-medium">No data found</h3>
                        <p className="text-base-content/60 max-w-sm mx-auto mt-2">
                            There are no {tabs.find(t => t.id === activeTab)?.label} items to display.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
