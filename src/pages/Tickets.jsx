import { useState, useEffect, useMemo } from "react";
import { Plus, Search, Ticket as TicketIcon } from "lucide-react";
import { AssetTable } from "../components/AssetTable";
import { TicketForm } from "../components/TicketForm";
import { AssetDetailsModal } from "../components/AssetDetailsModal";
import { StatusBadge } from "../components/StatusBadge";
import { api, endpoints } from "../services/api";

export default function Tickets() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTicket, setEditingTicket] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [viewingTicket, setViewingTicket] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const fetchTickets = async () => {
        try {
            setLoading(true);
            const data = await api.get(endpoints.tickets);
            setTickets(data);
        } catch (error) {
            console.error("Failed to fetch tickets:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    const filteredTickets = useMemo(() => {
        return tickets.filter(ticket => 
            ticket.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ticket.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ticket.raisedBy?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ticket.assetName?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [tickets, searchQuery]);

    const columns = [
        {
            key: "title",
            label: "Issue",
            render: (title, item) => (
                <div>
                    <div className="font-bold">{title}</div>
                    <div className="text-sm opacity-50">{item.category}</div>
                </div>
            )
        },
        { key: "assetName", label: "Asset" },
        { key: "raisedBy", label: "Raised By" },
        {
            key: "priority",
            label: "Priority",
            render: (priority) => (
                <span className={`badge badge-sm ${
                    priority === 'Urgent' ? 'badge-error' :
                    priority === 'High' ? 'badge-warning' :
                    priority === 'Medium' ? 'badge-info' : 'badge-ghost'
                }`}>
                    {priority}
                </span>
            )
        },
        {
            key: "status",
            label: "Status",
            render: (status) => <StatusBadge status={status} />
        },
        {
            key: "createdAt",
            label: "Date",
            render: (date) => new Date(date).toLocaleDateString()
        }
    ];

    const handleAddTicket = async (formData) => {
        try {
            if (editingTicket) {
                await api.put(endpoints.tickets, editingTicket._id, formData);
            } else {
                await api.post(endpoints.tickets, formData);
            }
            fetchTickets();
            setIsModalOpen(false);
            setEditingTicket(null);
        } catch (error) {
            console.error("Failed to save ticket:", error);
            alert("Failed to save ticket. Please try again.");
        }
    };

    const handleEdit = (ticket) => {
        setEditingTicket(ticket);
        setIsModalOpen(true);
    };

    const handleView = (ticket) => {
        setViewingTicket(ticket);
        setIsDetailOpen(true);
    };

    const handleDelete = async (ticket) => {
        if (confirm("Are you sure you want to delete this ticket?")) {
            try {
                await api.delete(endpoints.tickets, ticket._id);
                fetchTickets();
            } catch (error) {
                console.error("Failed to delete ticket:", error);
                alert("Failed to delete ticket.");
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
                        placeholder="Search by issue, asset or user..."
                        className="input input-bordered w-full pl-10 h-11"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button
                    onClick={() => { setEditingTicket(null); setIsModalOpen(true); }}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-error text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm font-medium"
                >
                    <Plus className="w-5 h-5" />
                    New Ticket
                </button>
            </div>

            {loading ? (
                <div className="text-center py-10">Loading tickets...</div>
            ) : (
                <AssetTable
                    columns={columns}
                    data={filteredTickets}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onView={handleView}
                />
            )}

            <TicketForm
                key={editingTicket ? editingTicket._id : 'new'}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddTicket}
                initialData={editingTicket}
                title={editingTicket ? "Edit Ticket" : "Create New Ticket"}
            />

            <AssetDetailsModal
                isOpen={isDetailOpen}
                onClose={() => setIsDetailOpen(false)}
                asset={viewingTicket}
                assetType="ticket"
            />
        </div>
    );
}
