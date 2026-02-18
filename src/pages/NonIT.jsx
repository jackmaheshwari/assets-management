import { useState } from "react";
import { Plus } from "lucide-react";
import { AssetTable } from "../components/AssetTable";
import { AssetForm } from "../components/AssetForm";
import { StatusBadge, StatusDot } from "../components/StatusBadge";

const initialData = [
    { id: 1, name: "Ergonomic Chair", status: "Active", assignee: "John Doe", purchaseDate: "2022-08-15" },
    { id: 2, name: "Standing Desk", status: "Active", assignee: "Jane Smith", purchaseDate: "2023-01-20" },
    { id: 3, name: "Meeting Room Table", status: "Active", assignee: "Conference A", purchaseDate: "2021-06-10" },
    { id: 4, name: "Whiteboard", status: "Active", assignee: "Meeting Room B", purchaseDate: "2021-07-01" },
    { id: 5, name: "Office Sofa", status: "Retired", assignee: "Lobby", purchaseDate: "2020-03-15" },
];

export default function NonIT() {
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
            label: "Item Name",
            render: (name, item) => (
                <div className="flex items-center gap-3">
                    <span className="font-medium text-base-content">{name}</span>
                </div>
            )
        },
        { key: "assignee", label: "Location/Assignee" },
        { key: "purchaseDate", label: "Purchase Date" },
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
        if (confirm("Are you sure you want to delete this item?")) {
            setAssets(assets.filter(a => a.id !== asset.id));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-base-content tracking-tight">Non-IT Assets</h1>
                    <p className="text-base-content/70 mt-1">Manage furniture, office supplies, and other physical assets.</p>
                </div>
                <button
                    onClick={() => { setEditingAsset(null); setIsModalOpen(true); }}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
                >
                    <Plus className="w-5 h-5" />
                    Add Item
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
                title={editingAsset ? "Edit Item" : "Add Item"}
                assetType="non-it"
            />
        </div>
    );
}
