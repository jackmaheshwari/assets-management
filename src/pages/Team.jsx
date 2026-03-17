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

    const handleUpdateEmployee = async (formData) => {
        try {
            if (editingEmployee) {
                await api.put(endpoints.employees, editingEmployee._id, formData);
                fetchEmployees();
                setIsModalOpen(false);
                setEditingEmployee(null);
            }
        } catch (error) {
            console.error("Failed to update employee:", error);
            alert("Failed to update employee. Please try again.");
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
            </div>

            {loading ? (
                <div className="text-center py-10">Loading team...</div>
            ) : (
                <AssetTable
                    columns={columns}
                    data={filteredEmployees}
                    onEdit={handleEdit}
                    onView={handleView}
                />
            )}

            {editingEmployee && (
                <EmployeeForm
                    key={editingEmployee._id}
                    isOpen={isModalOpen}
                    onClose={() => { setIsModalOpen(false); setEditingEmployee(null); }}
                    onSubmit={handleUpdateEmployee}
                    initialData={editingEmployee}
                    title="Edit Member Details"
                />
            )}

            <AssetDetailsModal
                isOpen={isDetailOpen}
                onClose={() => setIsDetailOpen(false)}
                asset={viewingEmployee}
                assetType="employee"
            />
        </div>
    );
}
