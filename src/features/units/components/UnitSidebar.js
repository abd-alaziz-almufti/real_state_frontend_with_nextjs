import React from 'react';

export default function UnitSidebar({ unit }) {
    if (!unit) return null;

    return (
        <div className="lg:col-span-4 relative">
            <div className="sticky top-28 bg-surface/80 backdrop-blur-xl border border-outline-variant/30 rounded-xl p-6 shadow-sm flex flex-col gap-6">
                
                {/* Pricing */}
                <div>
                    <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-[32px] font-bold text-[#10b981]">
                            ${parseFloat(unit.rent_price).toLocaleString()}
                        </span>
                        <span className="text-[16px] text-on-surface-variant">/ month</span>
                    </div>
                    <p className="text-[12px] font-semibold tracking-wider text-on-surface-variant">
                        Available Now • 12 Month Lease
                    </p>
                </div>

                {/* CTA */}
                <button className="w-full bg-surface-tint hover:bg-primary text-on-primary text-[14px] font-semibold py-3 px-4 rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2">
                    Apply for Lease
                </button>
                <button className="w-full bg-surface-container-low hover:bg-surface-container text-on-surface text-[14px] font-semibold py-3 px-4 rounded-lg transition-colors border border-outline-variant/30">
                    Contact Agent
                </button>
                
                <hr className="border-outline-variant/30 my-2" />
                
                {/* Agency Profile */}
                <div>
                    <h4 className="text-[12px] font-semibold text-on-surface-variant mb-4 uppercase tracking-wider">
                        Managed By
                    </h4>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden border border-outline-variant/30">
                            <img 
                                alt="Agency Logo" 
                                className="w-full h-full object-cover" 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6TBS1NcwsF2AblSOaWSZSXnegkmUUpXp4_1_GV0q8NC_LlaJ0XJcpRoKjrpkTyRIEL-kNR2rtmIysuc6nvX7eYu4N1vQB2s4ok0dr1qtEjv4J-B9DOZaV_tDpHwXNDaBwm4l4xoSyXj4ztbcj69jAHcZnqJ26Cn0AkWuGpf1VjUVGuILY-c3Mg4X5E_w2cioXJDCiNITKp6BcOAfHkSFmJOGCc5_yLjRqGARuN2NvWLGOg5teSb1gBhjq-TkeePfBpRuAjn8u6Q" 
                            />
                        </div>
                        <div>
                            <h5 className="text-[16px] font-semibold text-on-surface">Horizon Heights</h5>
                            <p className="text-[12px] font-semibold text-on-surface-variant flex items-center gap-1 mt-1">
                                <span className="material-symbols-outlined text-[14px]">star</span>
                                4.9 (124 Reviews)
                            </p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}
