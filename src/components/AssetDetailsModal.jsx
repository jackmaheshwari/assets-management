import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { formatDate } from "../utils/date";

export function AssetDetailsModal({ isOpen, onClose, asset, assetType }) {
    if (!isOpen || !asset) return null;

    const formatLabel = (key) => {
        return key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str) => str.toUpperCase());
    };

    const excludeFields = ['_id', '__v', 'password', 'createdAt'];

    const modalContent = (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div 
                className="bg-base-100 rounded-2xl shadow-2xl w-[90%] max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative p-6 md:p-8 border-b border-base-200">
                    <button
                        onClick={onClose}
                        className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 hover:bg-base-200 transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-5">
                        <div className="p-3 bg-primary/10 rounded-2xl">
                            <div className="w-8 h-8 text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-2xl text-base-content leading-tight">
                                {asset.name || asset.title || "Asset Details"}
                            </h3>
                            <p className="text-sm text-base-content/50 capitalize font-semibold tracking-wide mt-1">
                                {assetType} Information
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        {Object.entries(asset).map(([key, value]) => {
                            if (excludeFields.includes(key)) return null;
                            
                            if (key === 'assignedTo' && value && typeof value === 'object') {
                                return (
                                    <div key={key} className="group/item transition-all">
                                        <span className="text-[10px] font-bold text-base-content/40 uppercase tracking-[0.15em] mb-2 block">
                                            Assigned Specialist
                                        </span>
                                        <div className="text-base font-semibold text-base-content/90 bg-primary/5 p-3 rounded-lg border border-primary/10 group-hover/item:bg-primary/10 transition-all flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                                                {value.name ? value.name.split(' ').map(n => n[0]).join('') : '??'}
                                            </div>
                                            <div>
                                                <div>{value.name || 'N/A'}</div>
                                                <div className="text-[10px] opacity-50 font-normal">{value.email || 'N/A'}</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                            if (Array.isArray(value)) {
                                return (
                                    <div key={key} className="group/item transition-all col-span-full">
                                        <span className="text-[10px] font-bold text-base-content/40 uppercase tracking-[0.15em] mb-2 block">
                                            {formatLabel(key)}
                                        </span>
                                        <div className="bg-base-200/30 p-3 rounded-lg border border-transparent group-hover/item:border-primary/20 group-hover/item:bg-base-200/50 transition-all space-y-1">
                                            {value.map((item, idx) => (
                                                <div key={idx} className="text-sm font-medium text-base-content/80">
                                                    • {item}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            }

                            if (typeof value === 'object' && value !== null) {
                                return (
                                    <div key={key} className="group/item transition-all col-span-full">
                                        <span className="text-[10px] font-bold text-base-content/40 uppercase tracking-[0.15em] mb-2 block">
                                            {formatLabel(key)}
                                        </span>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-base-200/30 p-3 rounded-lg border border-transparent group-hover/item:border-primary/20 group-hover/item:bg-base-200/50 transition-all">
                                            {Object.entries(value).map(([subKey, subValue]) => (
                                                <div key={subKey} className="flex justify-between items-center text-sm border-b border-base-content/5 pb-1">
                                                    <span className="text-base-content/60">{formatLabel(subKey)}:</span>
                                                    <span className="font-semibold">{subValue?.toString() || "N/A"}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            }
                            
                            return (
                                <div key={key} className="group/item transition-all">
                                    <span className="text-[10px] font-bold text-base-content/40 uppercase tracking-[0.15em] mb-2 block">
                                        {formatLabel(key)}
                                    </span>
                                    <div className="text-base font-semibold text-base-content/90 bg-base-200/30 p-3 rounded-lg border border-transparent group-hover/item:border-primary/20 group-hover/item:bg-base-200/50 transition-all">
                                        {(key.toLowerCase().includes('date') || key.toLowerCase().endsWith('at')) 
                                            ? formatDate(value) 
                                            : (value?.toString() || "N/A")}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="h-6 bg-gradient-to-t from-base-100 to-transparent pointer-events-none" />
            </div>
            
            <div className="absolute inset-0 -z-10" onClick={onClose} />
        </div>
    );

    return createPortal(modalContent, document.body);
}
