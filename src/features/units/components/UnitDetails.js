import React from 'react';

export default function UnitDetails({ unit }) {
    if (!unit) return null;

    const property = unit.property || {};
    const address = property.address || "Address not available";
    const title = property.name ? `${property.name} - ${unit.unit_number}` : `Unit ${unit.unit_number}`;
    const description = property.description || "No description available for this unit.";

    // In a real app we'd map features dynamically from unit.features
    const featuresList = unit.features?.length > 0 ? unit.features : [
        { icon: "not_interested", label: "No Features" },
    ];

    return (
        <div className="lg:col-span-8 space-y-12">
            {/* Header Info */}
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div>
                        <h2 className="text-[32px] md:text-[48px] font-bold text-on-surface leading-tight tracking-tight mb-2">
                            {title}
                        </h2>
                        <p className="text-[16px] md:text-[18px] text-on-surface-variant flex items-center gap-2">
                            <span className="material-symbols-outlined text-[20px]">location_on</span>
                            {address}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">share</span>
                        </button>
                        <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">favorite_border</span>
                        </button>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4 border-t border-outline-variant/30">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-outline">bed</span>
                        <span className="text-[16px] text-on-surface font-semibold">{unit.bedrooms} Beds</span>
                    </div>
                    <div className="w-px h-6 bg-outline-variant/50 hidden sm:block"></div>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-outline">shower</span>
                        <span className="text-[16px] text-on-surface font-semibold">{unit.bathrooms} Baths</span>
                    </div>
                    <div className="w-px h-6 bg-outline-variant/50 hidden sm:block"></div>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-outline">square_foot</span>
                        <span className="text-[16px] text-on-surface font-semibold">{unit.sqft} sqft</span>
                    </div>
                    <div className="w-px h-6 bg-outline-variant/50 hidden sm:block"></div>
                    <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-semibold text-white ${unit.status_color || 'bg-primary'}`}>
                            {unit.status}
                        </span>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div>
                <h3 className="text-[24px] font-semibold text-on-surface mb-4">About this property</h3>
                <p className="text-[16px] text-on-surface-variant leading-relaxed mb-4">
                    {description}
                </p>
            </div>

            {/* Unit Features */}
            <div>
                <h3 className="text-[24px] font-semibold text-on-surface mb-6">Unit Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {featuresList.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-outline text-[24px]">
                                {feature.icon || "check_circle"}
                            </span>
                            <span className="text-[16px] text-on-surface">{feature.name || feature.label} : {feature.value || ''}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
