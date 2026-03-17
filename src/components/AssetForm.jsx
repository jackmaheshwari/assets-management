import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export function AssetForm({ isOpen, onClose, onSubmit, initialData, title, assetType }) {
    const [formData, setFormData] = useState({
        name: "",
        status: "Active",
        assignee: "",
        purchaseDate: "",
        manufacturer: "",
        modelName: "",
        modelNumber: "",
        serialNumber: "",
        macAddress: "",
        ipAddress: "",
        hostName: "",
        registeredOwner: "",
        systemType: "",
        processors: "",
        biosVersion: "",
        totalPhysicalMemory: "",
        networkCards: "",
        hyperVRequirements: JSON.stringify({
            vmMonitorModeExtensions: false,
            virtualizationEnabledInFirmware: false,
            secondLevelAddressTranslation: false,
            dataExecutionPreventionAvailable: false
        }, null, 2)
    });

    useEffect(() => {
        if (initialData) {
            const preparedData = { ...initialData };
            if (Array.isArray(preparedData.processors)) preparedData.processors = preparedData.processors.join(', ');
            if (Array.isArray(preparedData.networkCards)) preparedData.networkCards = preparedData.networkCards.join(', ');
            if (typeof preparedData.hyperVRequirements === 'object') {
                preparedData.hyperVRequirements = JSON.stringify(preparedData.hyperVRequirements, null, 2);
            }
            
            if (preparedData.purchaseDate) {
                preparedData.purchaseDate = preparedData.purchaseDate.split('T')[0];
            }
            if (preparedData.installDate) {
                preparedData.installDate = preparedData.installDate.split('T')[0];
            }
            
            setFormData(prev => ({ ...prev, ...preparedData }));
        } else {
            setFormData({
                name: "",
                status: "Active",
                assignee: "",
                purchaseDate: "",
                manufacturer: "",
                modelName: "",
                modelNumber: "",
                serialNumber: "",
                macAddress: "",
                ipAddress: "",
                hostName: "",
                registeredOwner: "",
                systemType: "",
                processors: "",
                biosVersion: "",
                totalPhysicalMemory: "",
                networkCards: "",
                hyperVRequirements: JSON.stringify({
                    vmMonitorModeExtensions: false,
                    virtualizationEnabledInFirmware: false,
                    secondLevelAddressTranslation: false,
                    dataExecutionPreventionAvailable: false
                }, null, 2)
            });
        }
    }, [initialData, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const submittedData = { ...formData };
        
        if (submittedData.processors && typeof submittedData.processors === 'string') {
            submittedData.processors = submittedData.processors.split(',').map(s => s.trim());
        }
        if (submittedData.networkCards && typeof submittedData.networkCards === 'string') {
            submittedData.networkCards = submittedData.networkCards.split(',').map(s => s.trim());
        }
        try {
            if (submittedData.hyperVRequirements && typeof submittedData.hyperVRequirements === 'string') {
                submittedData.hyperVRequirements = JSON.parse(submittedData.hyperVRequirements);
            }
        } catch (e) {
            console.error("Invalid JSON for hyperVRequirements");
        }
        
        onSubmit(submittedData);
        onClose();
    };

    if (!isOpen) return null;

    const modalContent = (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            {}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
                onClick={onClose}
            />
            
            {}
            <div className="relative bg-base-100 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
                <div className="p-6 md:p-8">
                    <button
                        onClick={onClose}
                        className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <h3 className="font-bold text-2xl mb-8 text-base-content">{title}</h3>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Asset Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="input input-bordered w-full focus:input-primary"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Status</span>
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="select select-bordered w-full focus:select-primary"
                                >
                                    <option value="Active">Active</option>
                                    <option value="In Use">In Use</option>
                                    <option value="In Repair">In Repair</option>
                                    <option value="Retired">Retired</option>
                                </select>
                            </div>
                        </div>

                        {assetType !== "software" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Assigned To</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="assignee"
                                        value={formData.assignee || ""}
                                        onChange={handleChange}
                                        className="input input-bordered w-full focus:input-primary"
                                        placeholder="Employee Name or Department"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Purchase Date</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="purchaseDate"
                                        value={formData.purchaseDate || ""}
                                        onChange={handleChange}
                                        className="input input-bordered w-full focus:input-primary"
                                    />
                                </div>
                            </div>
                        )}

                        {assetType === "software" && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">Version</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="version"
                                            value={formData.version || ""}
                                            onChange={handleChange}
                                            className="input input-bordered w-full focus:input-primary"
                                            placeholder="e.g. 1.0.0"
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">Publisher</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="publisher"
                                            value={formData.publisher || ""}
                                            onChange={handleChange}
                                            className="input input-bordered w-full focus:input-primary"
                                            placeholder="e.g. Adobe"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">Package Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="packageName"
                                            value={formData.packageName || ""}
                                            onChange={handleChange}
                                            className="input input-bordered w-full focus:input-primary"
                                            placeholder="e.g. adobe.cc"
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">Install Date</span>
                                        </label>
                                        <input
                                            type="date"
                                            name="installDate"
                                            value={formData.installDate || ""}
                                            onChange={handleChange}
                                            className="input input-bordered w-full focus:input-primary"
                                        />
                                    </div>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Installed Machine</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="installedMachine"
                                        value={formData.installedMachine || ""}
                                        onChange={handleChange}
                                        className="input input-bordered w-full focus:input-primary"
                                        placeholder="e.g. MacBook Pro 16"
                                    />
                                </div>
                            </>
                        )}

                        {assetType === "hardware" && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">Manufacturer</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="manufacturer"
                                            value={formData.manufacturer || ""}
                                            onChange={handleChange}
                                            className="input input-bordered w-full focus:input-primary"
                                            placeholder="e.g. Dell"
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">Model Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="modelName"
                                            value={formData.modelName || ""}
                                            onChange={handleChange}
                                            className="input input-bordered w-full focus:input-primary"
                                            placeholder="e.g. XPS 15"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">Serial Number</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="serialNumber"
                                            value={formData.serialNumber || ""}
                                            onChange={handleChange}
                                            className="input input-bordered w-full focus:input-primary"
                                            placeholder="e.g. 123456789"
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">Model Number</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="modelNumber"
                                            value={formData.modelNumber || ""}
                                            onChange={handleChange}
                                            className="input input-bordered w-full focus:input-primary"
                                            placeholder="e.g. AB-123"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">MAC Address</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="macAddress"
                                            value={formData.macAddress || ""}
                                            onChange={handleChange}
                                            className="input input-bordered w-full focus:input-primary"
                                            placeholder="e.g. 00:1A:2B:3C:4D:5E"
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">IP Address</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="ipAddress"
                                            value={formData.ipAddress || ""}
                                            onChange={handleChange}
                                            className="input input-bordered w-full focus:input-primary"
                                            placeholder="e.g. 192.168.1.100"
                                        />
                                    </div>
                                </div>

                                <div className="divider text-[10px] font-bold opacity-30 tracking-[0.2em] uppercase">System Information</div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">Host Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="hostName"
                                            value={formData.hostName || ""}
                                            onChange={handleChange}
                                            className="input input-bordered w-full focus:input-primary"
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">Registered Owner</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="registeredOwner"
                                            value={formData.registeredOwner || ""}
                                            onChange={handleChange}
                                            className="input input-bordered w-full focus:input-primary"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">System Type</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="systemType"
                                            value={formData.systemType || ""}
                                            onChange={handleChange}
                                            className="input input-bordered w-full focus:input-primary"
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">BIOS Version</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="biosVersion"
                                            value={formData.biosVersion || ""}
                                            onChange={handleChange}
                                            className="input input-bordered w-full focus:input-primary"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">Total Physical Memory</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="totalPhysicalMemory"
                                            value={formData.totalPhysicalMemory || ""}
                                            onChange={handleChange}
                                            className="input input-bordered w-full focus:input-primary"
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">Processors (Comma separated)</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="processors"
                                            value={formData.processors || ""}
                                            onChange={handleChange}
                                            className="input input-bordered w-full focus:input-primary"
                                        />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Network Cards (Comma separated)</span>
                                    </label>
                                    <textarea
                                        name="networkCards"
                                        value={formData.networkCards || ""}
                                        onChange={handleChange}
                                        className="textarea textarea-bordered h-20 focus:textarea-primary"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Hyper-V Requirements (JSON)</span>
                                    </label>
                                    <textarea
                                        name="hyperVRequirements"
                                        value={formData.hyperVRequirements || ""}
                                        onChange={handleChange}
                                        className="textarea textarea-bordered font-mono text-xs h-32 focus:textarea-primary"
                                    />
                                </div>
                            </>
                        )}

                        <div className="flex justify-end gap-3 pt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="btn btn-ghost"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary px-8"
                            >
                                {initialData ? "Save Changes" : "Add Asset"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
