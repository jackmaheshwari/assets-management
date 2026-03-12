import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export function EmployeeForm({ isOpen, onClose, onSubmit, initialData, title }) {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        workload: "Medium",
        status: "Active",
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                name: "",
                username: "",
                email: "",
                workload: "Medium",
                status: "Active",
            });
        }
    }, [initialData, isOpen]);

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

    const modalContent = (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            {}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
                onClick={onClose}
            />
            
            {}
            <div className="relative bg-base-100 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
                <div className="p-6 md:p-8">
                    <button
                        onClick={onClose}
                        className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <h3 className="font-bold text-2xl mb-8 text-base-content">{title}</h3>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Full Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="input input-bordered w-full focus:input-primary"
                                required
                                placeholder="e.g. John Doe"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Username</span>
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="input input-bordered w-full focus:input-primary"
                                    required
                                    placeholder="e.g. jdoe"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Workload</span>
                                </label>
                                <select
                                    name="workload"
                                    value={formData.workload}
                                    onChange={handleChange}
                                    className="select select-bordered w-full focus:select-primary"
                                >
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="input input-bordered w-full focus:input-primary"
                                required
                                placeholder="john.doe@example.com"
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
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>

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
                                {initialData ? "Save Changes" : "Add Member"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
