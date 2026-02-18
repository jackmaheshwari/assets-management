export function StatusBadge({ status }) {
    const styles = {
        Active: "bg-green-100 text-green-700",
        "In Repair": "bg-yellow-100 text-yellow-700",
        Retired: "bg-red-100 text-red-700",
        Available: "bg-blue-100 text-blue-700",
    };

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[status] || "bg-gray-100 text-gray-700"}`}>
            {status}
        </span>
    );
}

export function StatusDot({ status }) {
    const styles = {
        Active: "bg-green-500",
        "In Repair": "bg-yellow-500",
        Retired: "bg-red-500",
        Available: "bg-blue-500",
    };

    return (
        <div
            className={`w-2.5 h-2.5 rounded-full ${styles[status] || "bg-gray-400"}`}
            title={status}
        />
    );
}
