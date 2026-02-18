import { useState } from "react";
import { Plus } from "lucide-react";
import { AssetTable } from "../components/AssetTable";
import { AssetForm } from "../components/AssetForm";


import { initialData as hardwareData } from "./Hardware";

const initialData = [
    { id: 1, name: "Adobe Creative Cloud", version: "5.11.0", publisher: "Adobe", packageName: "adobe-cc", installDate: "2023-01-01", status: "Active", installedMachine: hardwareData[0].name },
    { id: 2, name: "Microsoft 365 Business", version: "16.0.1", publisher: "Microsoft", packageName: "o365-bus", installDate: "2023-01-01", status: "Active", installedMachine: hardwareData[1].name },
    { id: 3, name: "JetBrains All Products", version: "2023.2", publisher: "JetBrains", packageName: "jetbrains-toolbox", installDate: "2023-05-15", status: "Active", installedMachine: hardwareData[3].name },
    { id: 4, name: "Slack", version: "4.36.1", publisher: "Slack Technologies", packageName: "com.slack.slack", installDate: "2023-02-01", status: "Active", installedMachine: "All Machines" },
    { id: 5, name: "JIRA Cloud", version: "N/A", publisher: "Atlassian", packageName: "web-app", installDate: "2023-03-01", status: "Active", installedMachine: hardwareData[0].name },
];

export default function Software() {
    const [assets, setAssets] = useState(initialData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAsset, setEditingAsset] = useState(null);

    const columns = [
        {
            key: "id",
            label: "Asset ID",
            render: (_, item) => (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-info/10 text-info border border-info/20">
                    AST-{item.id}
                </span>
            )
        },
        {
            key: "name",
            label: "Display Name",
            render: (name) => (
                <span className="font-medium text-base-content">{name}</span>
            )
        },
        { key: "version", label: "Version No." },
        { key: "publisher", label: "Publisher" },
        { key: "packageName", label: "Package Name" },
        { key: "installDate", label: "Install Date" },
        { key: "installedMachine", label: "Installed On" },
    ];

    const handleAddAsset = (newAsset) => {
        if (editingAsset) {
            setAssets(assets.map(a => a.id === editingAsset.id ? { ...newAsset, id: a.id } : a));
        } else {
            setAssets([...assets, { ...newAsset, id: Date.now() }]);
        }
        setEditingAsset(null);
    };

    const handleEdit = (asset) => {
        setEditingAsset(asset);
        setIsModalOpen(true);
    };

    const handleDelete = (asset) => {
        if (confirm("Are you sure you want to delete this software license?")) {
            setAssets(assets.filter(a => a.id !== asset.id));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-base-content tracking-tight">Software Assets</h1>
                    <p className="text-base-content/70 mt-1">Manage software licenses, subscriptions, and specialized tools.</p>
                </div>
                <button
                    onClick={() => { setEditingAsset(null); setIsModalOpen(true); }}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
                >
                    <Plus className="w-5 h-5" />
                    Add Software
                </button>
            </div>

            <AssetTable
                columns={columns}
                data={assets}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <AssetForm
                key={editingAsset ? editingAsset.id : 'new'}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddAsset}
                initialData={editingAsset}
                title={editingAsset ? "Edit Software License" : "Add Software License"}
                assetType="software"
            />
        </div>
    );
}
