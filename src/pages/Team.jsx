import { useState, useEffect, useMemo } from "react";
import { Plus, Search, Users } from "lucide-react";
import { AssetTable } from "../components/AssetTable";
import { EmployeeForm } from "../components/EmployeeForm";
import { AssetDetailsModal } from "../components/AssetDetailsModal";
import { api, endpoints } from "../services/api";

export default function Team() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [viewingEmployee, setViewingEmployee] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

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

    const filteredEmployees = useMemo(() => {
        return employees.filter(emp => 
            emp.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            emp.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            emp.username?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [employees, searchQuery]);

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

    const handleView = (employee) => {
        setViewingEmployee(employee);
        setIsDetailOpen(true);
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
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
                    <input
                        type="text"
                        placeholder="Search by name, email or username..."
                        className="input input-bordered w-full pl-10 h-11"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
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
                    data={filteredEmployees}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onView={handleView}
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

            <AssetDetailsModal
                isOpen={isDetailOpen}
                onClose={() => setIsDetailOpen(false)}
                asset={viewingEmployee}
                assetType="employee"
            />
        </div>
    );
}
