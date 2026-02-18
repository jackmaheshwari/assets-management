import { X } from "lucide-react";
import { useState } from "react";

export function AssetForm({ isOpen, onClose, onSubmit, initialData, title, assetType }) {
    const [formData, setFormData] = useState(initialData || {
        name: "",
        status: "Active",
        assignee: "",
        purchaseDate: "",
        // Hardware specific
        manufacturer: "",
        modelName: "",
        modelNumber: "",
        serialNumber: "",
        macAddress: "",
        ipAddress: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box w-11/12 max-w-2xl bg-base-100">
                <button
                    onClick={onClose}
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >
                    <X className="w-5 h-5" />
                </button>

                <h3 className="font-bold text-lg mb-6">{title}</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Asset Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Status</span>
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="select select-bordered w-full"
                            >
                                <option value="Active">Active</option>
                                <option value="In Use">In Use</option>
                                <option value="In Repair">In Repair</option>
                                <option value="Retired">Retired</option>
                            </select>
                        </div>
                    </div>

                    {assetType !== "software" && (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Assigned To</span>
                                </label>
                                <input
                                    type="text"
                                    name="assignee"
                                    value={formData.assignee || ""}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                    placeholder="Employee Name or Department"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Purchase Date</span>
                                </label>
                                <input
                                    type="date"
                                    name="purchaseDate"
                                    value={formData.purchaseDate || ""}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                />
                            </div>
                        </div>
                    )}

                    {assetType === "software" && (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Version</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="version"
                                        value={formData.version || ""}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                        placeholder="e.g. 1.0.0"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Publisher</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="publisher"
                                        value={formData.publisher || ""}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                        placeholder="e.g. Adobe"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Package Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="packageName"
                                        value={formData.packageName || ""}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                        placeholder="e.g. adobe.cc"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Install Date</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="installDate"
                                        value={formData.installDate || ""}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                    />
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Installed Machine</span>
                                </label>
                                <input
                                    type="text"
                                    name="installedMachine"
                                    value={formData.installedMachine || ""}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                    placeholder="e.g. MacBook Pro 16"
                                />
                            </div>
                        </>
                    )}

                    {assetType === "hardware" && (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Manufacturer</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="manufacturer"
                                        value={formData.manufacturer || ""}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                        placeholder="e.g. Dell"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Model Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="modelName"
                                        value={formData.modelName || ""}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                        placeholder="e.g. XPS 15"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Serial Number</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="serialNumber"
                                        value={formData.serialNumber || ""}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                        placeholder="e.g. 123456789"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Model Number</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="modelNumber"
                                        value={formData.modelNumber || ""}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                        placeholder="e.g. AB-123"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">MAC Address</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="macAddress"
                                        value={formData.macAddress || ""}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                        placeholder="e.g. 00:1A:2B:3C:4D:5E"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">IP Address</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="ipAddress"
                                        value={formData.ipAddress || ""}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                        placeholder="e.g. 192.168.1.100"
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    <div className="modal-action">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            {initialData ? "Save Changes" : "Add Asset"}
                        </button>
                    </div>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}>close</button>
            </form>
        </div>
    );
}
