import { X } from "lucide-react";
import { createPortal } from "react-dom";

export function AssetDetailsModal({ isOpen, onClose, asset, assetType }) {
    if (!isOpen || !asset) return null;

    // Helper to format labels
    const formatLabel = (key) => {
        return key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str) => str.toUpperCase());
    };

    // Fields to exclude from display
    const excludeFields = ['_id', '__v', 'password', 'createdAt'];

    const modalContent = (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div 
                className="bg-base-100 rounded-2xl shadow-2xl w-[90%] max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
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

                {/* Content - Scrollable */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        {Object.entries(asset).map(([key, value]) => {
                            if (excludeFields.includes(key) || (typeof value === 'object' && value !== null)) return null;
                            
                            return (
                                <div key={key} className="group/item transition-all">
                                    <span className="text-[10px] font-bold text-base-content/40 uppercase tracking-[0.15em] mb-2 block">
                                        {formatLabel(key)}
                                    </span>
                                    <div className="text-base font-semibold text-base-content/90 bg-base-200/30 p-3 rounded-lg border border-transparent group-hover/item:border-primary/20 group-hover/item:bg-base-200/50 transition-all">
                                        {value?.toString() || "N/A"}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer Gradient overlay to indicate more content */}
                <div className="h-6 bg-gradient-to-t from-base-100 to-transparent pointer-events-none" />
            </div>
            
            {/* Click backdrop to close */}
            <div className="absolute inset-0 -z-10" onClick={onClose} />
        </div>
    );

    return createPortal(modalContent, document.body);
}
