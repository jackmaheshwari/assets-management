import { useState, useEffect } from "react";
import { Plus, Users } from "lucide-react";
import { AssetTable } from "../components/AssetTable";
import { EmployeeForm } from "../components/EmployeeForm";
import { api, endpoints } from "../services/api";

export default function Team() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);

    const fetchEmployees = async () => {
        try {
            setLoading(true);
            const data = await api.get(endpoints.employees);
            setEmployees(data);
        } catch (error) {
            console.error("Failed to fetch employees:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const workloadStyles = {
        High: "bg-error",
        Medium: "bg-warning",
        Low: "bg-success",
    };

    const columns = [
        {
            key: "username",
            label: "Username",
            render: (username) => (
                <span className="font-mono text-xs">{username}</span>
            )
        },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        {
            key: "workload",
            label: "Workload",
            render: (workload) => (
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${workloadStyles[workload] || "bg-base-300"}`} />
                    <span className="capitalize">{workload}</span>
                </div>
            )
        },
        { key: "status", label: "Status" }
    ];

    const handleAddEmployee = async (formData) => {
        try {
            if (editingEmployee) {
                await api.put(endpoints.employees, editingEmployee._id, formData);
            } else {
                await api.post(endpoints.employees, formData);
            }
            fetchEmployees();
            setIsModalOpen(false);
            setEditingEmployee(null);
        } catch (error) {
            console.error("Failed to save employee:", error);
            alert("Failed to save employee. Please try again.");
        }
    };

    const handleEdit = (employee) => {
        setEditingEmployee(employee);
        setIsModalOpen(true);
    };

    const handleDelete = async (employee) => {
        if (confirm(`Are you sure you want to remove ${employee.name} from the team?`)) {
            try {
                await api.delete(endpoints.employees, employee._id);
                fetchEmployees();
            } catch (error) {
                console.error("Failed to delete employee:", error);
                alert("Failed to delete employee.");
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-base-content tracking-tight">Our Team</h1>
                    <p className="text-base-content/70 mt-1">Manage employee details, workloads, and assignments.</p>
                </div>
                <button
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
                    onClick={() => { setEditingEmployee(null); setIsModalOpen(true); }}
                >
                    <Plus className="w-5 h-5" />
                    Add Member
                </button>
            </div>

            {loading ? (
                <div className="text-center py-10">Loading team...</div>
            ) : (
                <AssetTable
                    columns={columns}
                    data={employees}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            <EmployeeForm
                key={editingEmployee ? editingEmployee._id : 'new'}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddEmployee}
                initialData={editingEmployee}
                title={editingEmployee ? "Edit Member" : "Add Member"}
            />
        </div>
    );
}
