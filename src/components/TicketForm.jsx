import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export function TicketForm({ isOpen, onClose, onSubmit, initialData, title }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "Open",
        priority: "Medium",
        category: "Hardware",
        raisedBy: "",
        assetName: "",
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                title: "",
                description: "",
                status: "Open",
                priority: "Medium",
                category: "Hardware",
                raisedBy: "",
                assetName: "",
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
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Issue Title</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="input input-bordered w-full focus:input-primary"
                                required
                                placeholder="Briefly describe the issue"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Description</span>
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="textarea textarea-bordered w-full h-32 focus:textarea-primary"
                                required
                                placeholder="Provide details about the problem"
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Category</span>
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="select select-bordered w-full focus:select-primary"
                                >
                                    <option value="Hardware">Hardware</option>
                                    <option value="Software">Software</option>
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Priority</span>
                                </label>
                                <select
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleChange}
                                    className="select select-bordered w-full focus:select-primary"
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                    <option value="Urgent">Urgent</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                    <option value="Open">Open</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Resolved">Resolved</option>
                                    <option value="Closed">Closed</option>
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Asset Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="assetName"
                                    value={formData.assetName}
                                    onChange={handleChange}
                                    className="input input-bordered w-full focus:input-primary"
                                    required
                                    placeholder="e.g. MacBook Pro 16"
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Raised By</span>
                            </label>
                            <input
                                type="text"
                                name="raisedBy"
                                value={formData.raisedBy}
                                onChange={handleChange}
                                className="input input-bordered w-full focus:input-primary"
                                required
                                placeholder="Employee Name"
                            />
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
                                {initialData ? "Save Changes" : "Create Ticket"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
