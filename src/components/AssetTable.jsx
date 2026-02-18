import { Edit, Trash2 } from "lucide-react";


export function AssetTable({ columns, data, onEdit, onDelete }) {
    return (
        <div className="overflow-x-auto bg-base-100 rounded-box shadow">
            <table className="table table-zebra table-pin-rows w-full">
                <thead>
                    <tr className="bg-base-200 text-base-content">
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className="font-semibold text-sm uppercase tracking-wider"
                            >
                                {col.label}
                            </th>
                        ))}
                        <th className="text-right font-semibold text-sm uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length + 1} className="text-center py-8 text-base-content/60">
                                No assets found. Add one to get started.
                            </td>
                        </tr>
                    ) : (
                        data.map((item) => (
                            <tr key={item.id} className="hover">
                                {columns.map((col) => (
                                    <td key={col.key} className="text-sm">
                                        {col.render ? col.render(item[col.key], item) : item[col.key]}
                                    </td>
                                ))}
                                <td className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => onEdit(item)}
                                            className="btn btn-ghost btn-xs text-info"
                                            title="Edit"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(item)}
                                            className="btn btn-ghost btn-xs text-error"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
