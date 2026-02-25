import { Edit, Trash2, Eye } from "lucide-react";


export function AssetTable({ columns, data, onEdit, onDelete, onView, selectedIds = [], onSelect }) {
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            onSelect(data.map(item => item._id || item.id));
        } else {
            onSelect([]);
        }
    };

    const handleSelectItem = (id) => {
        if (selectedIds.includes(id)) {
            onSelect(selectedIds.filter(i => i !== id));
        } else {
            onSelect([...selectedIds, id]);
        }
    };

    return (
        <div className="overflow-x-auto bg-base-100 rounded-box shadow">
            <table className="table table-zebra table-pin-rows w-full">
                <thead>
                    <tr className="bg-base-200 text-base-content">
                        {onSelect && (
                            <th className="w-12">
                                <input 
                                    type="checkbox" 
                                    className="checkbox checkbox-sm checkbox-primary" 
                                    onChange={handleSelectAll}
                                    checked={data.length > 0 && selectedIds.length === data.length}
                                />
                            </th>
                        )}
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className="font-semibold text-sm uppercase tracking-wider"
                            >
                                {col.label}
                            </th>
                        ))}
                        {(onEdit || onDelete || onView) && <th className="text-right font-semibold text-sm uppercase tracking-wider">Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length + (onSelect ? 1 : 0) + (onEdit || onDelete || onView ? 1 : 0)} className="text-center py-8 text-base-content/60">
                                No assets found. Add one to get started.
                            </td>
                        </tr>
                    ) : (
                        data.map((item) => {
                            const id = item._id || item.id;
                            return (
                                <tr key={id} className="hover">
                                    {onSelect && (
                                        <td>
                                            <input 
                                                type="checkbox" 
                                                className="checkbox checkbox-sm" 
                                                checked={selectedIds.includes(id)}
                                                onChange={() => handleSelectItem(id)}
                                            />
                                        </td>
                                    )}
                                    {columns.map((col, idx) => (
                                        <td key={col.key} className="text-sm">
                                            {idx === 0 && onView ? (
                                                <button 
                                                    onClick={() => onView(item)}
                                                    className="hover:text-primary hover:underline text-left transition-colors duration-200 font-medium"
                                                >
                                                    {col.render ? col.render(item[col.key], item) : item[col.key]}
                                                </button>
                                            ) : (
                                                col.render ? col.render(item[col.key], item) : item[col.key]
                                            )}
                                        </td>
                                    ))}
                                    {(onEdit || onDelete || onView) && (
                                        <td className="text-right">
                                            <div className="flex justify-end gap-2">
                                                {onEdit && (
                                                    <button
                                                        onClick={() => onEdit(item)}
                                                        className="btn btn-ghost btn-xs text-info"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                )}
                                                {onDelete && (
                                                    <button
                                                        onClick={() => onDelete(item)}
                                                        className="btn btn-ghost btn-xs text-error"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
}
