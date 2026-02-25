import { useState, useEffect, useMemo } from "react";
import { Plus, Search } from "lucide-react";
import { AssetTable } from "../components/AssetTable";
import { AssetForm } from "../components/AssetForm";
import { AssetDetailsModal } from "../components/AssetDetailsModal";
import { api, endpoints } from "../services/api";

export default function NonIT() {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAsset, setEditingAsset] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [viewingAsset, setViewingAsset] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const fetchAssets = async () => {
        try {
            setLoading(true);
            const data = await api.get(endpoints.nonIT);
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

    const filteredAssets = useMemo(() => {
        return assets.filter(asset => 
            asset.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            asset.assetId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            asset.assignee?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [assets, searchQuery]);

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
            label: "Item Name",
            render: (name) => (
                <div className="flex items-center gap-3">
                    <span className="font-medium text-base-content">{name}</span>
                </div>
            )
        },
        { key: "assignee", label: "Location/Assignee" },
        { key: "purchaseDate", label: "Purchase Date" },
    ];

    const handleAddAsset = async (formData) => {
        try {
            if (editingAsset) {
                await api.put(endpoints.nonIT, editingAsset._id, formData);
            } else {
                // Generate a simple asset ID if not provided
                const newAsset = { ...formData, assetId: `AST-N${Date.now()}` };
                await api.post(endpoints.nonIT, newAsset);
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

    const handleView = (asset) => {
        setViewingAsset(asset);
        setIsDetailOpen(true);
    };

    const handleDelete = async (asset) => {
        if (confirm("Are you sure you want to delete this item?")) {
            try {
                await api.delete(endpoints.nonIT, asset._id);
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
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
                    <input
                        type="text"
                        placeholder="Search by name, ID or location..."
                        className="input input-bordered w-full pl-10 h-11"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button
                    onClick={() => { setEditingAsset(null); setIsModalOpen(true); }}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
                >
                    <Plus className="w-5 h-5" />
                    Add Item
                </button>
            </div>

            {loading ? (
                <div className="text-center py-10">Loading assets...</div>
            ) : (
                <AssetTable
                    columns={columns}
                    data={filteredAssets}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onView={handleView}
                />
            )}

            <AssetForm
                key={editingAsset ? editingAsset._id : 'new'}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddAsset}
                initialData={editingAsset}
                title={editingAsset ? "Edit Item" : "Add Item"}
                assetType="non-it"
            />

            <AssetDetailsModal
                isOpen={isDetailOpen}
                onClose={() => setIsDetailOpen(false)}
                asset={viewingAsset}
                assetType="non-it"
            />
        </div>
    );
}
