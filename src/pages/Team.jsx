import { useState } from "react";
import { Plus, Users } from "lucide-react";
import { AssetTable } from "../components/AssetTable";


const initialData = [
    { id: 1, name: "John Doe", username: "jdoe", email: "john.doe@example.com", workload: "High", status: "Active" },
    { id: 2, name: "Jane Smith", username: "jsmith", email: "jane.smith@example.com", workload: "Medium", status: "Active" },
    { id: 3, name: "Robert Wilson", username: "rwilson", email: "robert.wilson@example.com", workload: "Low", status: "Active" },
    { id: 4, name: "Sarah Connor", username: "sconnor", email: "sarah.connor@example.com", workload: "High", status: "Active" },
    { id: 5, name: "Michael Scott", username: "mscott", email: "michael.scott@example.com", workload: "Medium", status: "Active" },
];

export default function Team() {
    const [employees, setEmployees] = useState(initialData);

    const workloadStyles = {
        High: "bg-error",
        Medium: "bg-warning",
        Low: "bg-success",
    };

    const columns = [
        {
            key: "id",
            label: "EMP ID",
            render: (_, item) => (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-info/10 text-info border border-info/20">
                    EMP-{item.id}
                </span>
            )
        },
        { key: "name", label: "Name" },
        { key: "username", label: "Username" },
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
    ];

    const handleEdit = (employee) => {
        alert(`Edit feature for ${employee.name} is coming soon!`);
    };

    const handleDelete = (employee) => {
        if (confirm(`Are you sure you want to remove ${employee.name} from the team?`)) {
            setEmployees(employees.filter(e => e.id !== employee.id));
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
                    onClick={() => alert("Add employee feature is coming soon!")}
                >
                    <Plus className="w-5 h-5" />
                    Add Member
                </button>
            </div>

            <AssetTable
                columns={columns}
                data={employees}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
}
