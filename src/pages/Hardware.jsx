import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { AssetTable } from "../components/AssetTable";
import { AssetForm } from "../components/AssetForm";
import { StatusDot } from "../components/StatusBadge";
import { api, endpoints } from "../services/api";

export default function Hardware() {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAsset, setEditingAsset] = useState(null);

    const fetchAssets = async () => {
        try {
            setLoading(true);
            const data = await api.get(endpoints.hardware);
            setAssets(data);
        } catch (error) {
            console.error("Failed to fetch assets:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAssets();
    }, []);

    const columns = [
        {
            key: "assetId",
            label: "Asset ID",
            render: (assetId) => (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-info/10 text-info border border-info/20">
                    {assetId}
                </span>
            )
        },
        {
            key: "name",
            label: "Asset Name",
            render: (name, item) => (
                <div className="flex items-center gap-3">
                    <StatusDot status={item.status} />
                    <span className="font-medium text-base-content">{name}</span>
                </div>
            )
        },
        { key: "manufacturer", label: "Manufacturer" },
        { key: "modelName", label: "Model" },
        { key: "ipAddress", label: "IP Address" },
        { key: "serialNumber", label: "Serial No." },
        { key: "assignee", label: "Assignee" },
    ];

    const handleAddAsset = async (formData) => {
        try {
            if (editingAsset) {
                await api.put(endpoints.hardware, editingAsset._id, formData);
            } else {
                // Generate a simple asset ID if not provided (backend could do this too)
                const newAsset = { ...formData, assetId: `AST-${Date.now()}` };
                await api.post(endpoints.hardware, newAsset);
            }
            fetchAssets();
            setIsModalOpen(false);
            setEditingAsset(null);
        } catch (error) {
            console.error("Failed to save asset:", error);
            alert("Failed to save asset. Please try again.");
        }
    };

    const handleEdit = (asset) => {
        setEditingAsset(asset);
        setIsModalOpen(true);
    };

    const handleDelete = async (asset) => {
        if (confirm("Are you sure you want to delete this asset?")) {
            try {
                await api.delete(endpoints.hardware, asset._id);
                fetchAssets();
            } catch (error) {
                console.error("Failed to delete asset:", error);
                alert("Failed to delete asset.");
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-base-content tracking-tight">Hardware Assets</h1>
                    <p className="text-base-content/70 mt-1">Manage laptops, desktops, printers, and other devices.</p>
                </div>
                <button
                    onClick={() => { setEditingAsset(null); setIsModalOpen(true); }}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
                >
                    <Plus className="w-5 h-5" />
                    Add Hardware
                </button>
            </div>

            {loading ? (
                <div className="text-center py-10">Loading assets...</div>
            ) : (
                <AssetTable
                    columns={columns}
                    data={assets}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            <AssetForm
                key={editingAsset ? editingAsset._id : 'new'}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddAsset}
                initialData={editingAsset}
                title={editingAsset ? "Edit Hardware" : "Add Hardware"}
                assetType="hardware"
            />
        </div>
    );
}
