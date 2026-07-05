import React, { useState, useEffect } from 'react';

const AMENITIES = ['Parking', 'Gym', 'Swimming Pool', 'Pet Friendly', 'Security', 'Rooftop Garden'];

export default function UnitsAdvancedFilter({ isOpen, onClose, filters, onApplyFilters }) {
    const [localFilters, setLocalFilters] = useState({
        min_price: '',
        max_price: '',
        bedrooms: 'Any',
        amenities: []
    });

    useEffect(() => {
        if (isOpen) {
            setLocalFilters({
                min_price: filters?.min_price || '',
                max_price: filters?.max_price || '',
                bedrooms: filters?.bedrooms || 'Any',
                amenities: filters?.amenities || []
            });
        }
    }, [isOpen, filters]);

    const handleAmenityChange = (amenity) => {
        setLocalFilters(prev => {
            const current = [...prev.amenities];
            if (current.includes(amenity)) {
                return { ...prev, amenities: current.filter(a => a !== amenity) };
            } else {
                return { ...prev, amenities: [...current, amenity] };
            }
        });
    };

    const handleReset = () => {
        setLocalFilters({
            min_price: '',
            max_price: '',
            bedrooms: 'Any',
            amenities: []
        });
    };

    return (
        <aside 
            className={`fixed inset-y-0 right-0 w-full md:w-[400px] bg-white z-[100] shadow-2xl transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
            <div className="p-8 border-b border-outline-variant/30 flex items-center justify-between">
                <h2 className="text-headline-md font-headline-md">Advanced Filters</h2>
                <button 
                    className="h-10 w-10 flex items-center justify-center hover:bg-surface-container-high rounded-full transition-all" 
                    onClick={onClose}
                >
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
                {/* Price Range */}
                <div>
                    <h3 className="text-label-caps font-label-caps text-outline uppercase tracking-widest mb-4">Price Range</h3>
                    <div className="flex items-center gap-4">
                        <input 
                            type="number" 
                            placeholder="Min" 
                            className="w-full bg-white border border-outline-variant rounded-xl px-4 py-2 focus:ring-primary focus:border-primary"
                            value={localFilters.min_price}
                            onChange={(e) => setLocalFilters({ ...localFilters, min_price: e.target.value })}
                        />
                        <span className="text-outline-variant">-</span>
                        <input 
                            type="number" 
                            placeholder="Max" 
                            className="w-full bg-white border border-outline-variant rounded-xl px-4 py-2 focus:ring-primary focus:border-primary"
                            value={localFilters.max_price}
                            onChange={(e) => setLocalFilters({ ...localFilters, max_price: e.target.value })}
                        />
                    </div>
                </div>

                {/* Bedrooms */}
                <div>
                    <h3 className="text-label-caps font-label-caps text-outline uppercase tracking-widest mb-4">Bedrooms</h3>
                    <div className="flex gap-2">
                        {['Any', '1', '2', '3', '4+'].map(bed => (
                            <button 
                                key={bed} 
                                className={`flex-1 py-2 border rounded-lg text-body-md transition-all ${localFilters.bedrooms === bed ? 'border-primary bg-primary/5 text-primary' : 'border-outline-variant hover:bg-surface-container-high'}`}
                                onClick={() => setLocalFilters({ ...localFilters, bedrooms: bed })}
                            >
                                {bed}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Amenities */}
                <div>
                    <h3 className="text-label-caps font-label-caps text-outline uppercase tracking-widest mb-4">Amenities</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {AMENITIES.map(amenity => (
                            <label key={amenity} className="flex items-center gap-3 cursor-pointer group">
                                <input 
                                    className="h-5 w-5 rounded border-outline-variant text-primary focus:ring-primary" 
                                    type="checkbox"
                                    checked={localFilters.amenities.includes(amenity)}
                                    onChange={() => handleAmenityChange(amenity)}
                                />
                                <span className="text-body-md group-hover:text-primary transition-colors">{amenity}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="p-8 border-t border-outline-variant/30 flex gap-4 bg-white">
                <button 
                    className="flex-1 py-4 border-2 border-primary text-primary rounded-2xl font-button hover:bg-primary/5 transition-all"
                    onClick={handleReset}
                >
                    Reset
                </button>
                <button 
                    className="flex-[2] py-4 bg-primary text-white rounded-2xl font-button hover:bg-primary/90 transition-all"
                    onClick={() => onApplyFilters(localFilters)}
                >
                    Apply Filters
                </button>
            </div>
        </aside>
    );
}
