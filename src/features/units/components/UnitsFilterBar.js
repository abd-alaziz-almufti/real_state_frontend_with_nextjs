import React from 'react';

const UNIT_TYPES = ['All', 'apartment', 'studio', 'villa', 'office', 'house', 'shop', 'duplex', 'penthouse', 'town_house', 'land', 'warehouse'];

export default function UnitsFilterBar({ onOpenAdvancedFilter, filters, onFilterChange }) {
    return (
        <section className="sticky top-20 z-40 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 py-4">
            <div className="max-w-container-max mx-auto px-margin-desktop flex flex-wrap lg:flex-nowrap items-center gap-4">
                {/* Search Input */}
                <div className="flex-1 min-w-[300px] relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
                    <input 
                        className="w-full bg-white border border-outline-variant rounded-xl pl-12 pr-4 py-3 focus:ring-primary focus:border-primary" 
                        placeholder="Search location, neighborhood, or ZIP" 
                        type="text"
                        value={filters?.search || ''}
                        onChange={(e) => onFilterChange('search', e.target.value)}
                    />
                </div>
                
                {/* Dropdowns */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative group">
                        <select 
                            className="flex items-center gap-2 px-4 py-3 bg-white border border-outline-variant rounded-xl text-body-md hover:border-primary transition-all appearance-none pr-10 cursor-pointer capitalize"
                            value={filters?.type || 'All'}
                            onChange={(e) => onFilterChange('type', e.target.value)}
                        >
                            {UNIT_TYPES.map(type => (
                                <option key={type} value={type}>{type.replace('_', ' ')}</option>
                            ))}
                        </select>
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[18px] pointer-events-none text-outline">expand_more</span>
                    </div>
                    
                    <button 
                        className="flex items-center gap-2 px-4 py-3 bg-white border border-outline-variant rounded-xl text-body-md hover:border-primary transition-all" 
                        onClick={onOpenAdvancedFilter}
                    >
                        <span className="material-symbols-outlined text-[18px]">tune</span>
                        Advanced Filters
                        {((filters?.min_price || filters?.max_price || (filters?.bedrooms && filters.bedrooms !== 'Any') || filters?.amenities?.length > 0) && (
                            <span className="bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ml-1">!</span>
                        ))}
                    </button>
                </div>
                
                <div className="h-10 w-[1px] bg-outline-variant/30 mx-2 hidden lg:block"></div>
                
                {/* View Toggle & Sort */}
                <div className="flex items-center gap-4 ml-auto">
                    <div className="flex bg-surface-container rounded-xl p-1">
                        <button className="px-4 py-1.5 bg-white text-primary rounded-lg shadow-sm font-button flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">grid_view</span>
                            Grid
                        </button>
                        <button className="px-4 py-1.5 text-on-surface-variant font-button flex items-center gap-2 hover:bg-white/50 rounded-lg transition-all">
                            <span className="material-symbols-outlined text-[18px]">map</span>
                            Map
                        </button>
                    </div>
                    
                    <select 
                        className="bg-transparent border-none text-body-md font-semibold focus:ring-0 text-on-surface-variant cursor-pointer"
                        value={filters?.sort || 'newest_to_oldest'}
                        onChange={(e) => onFilterChange('sort', e.target.value)}
                    >
                        <option value="newest_to_oldest">Newest First</option>
                        <option value="oldest_to_newest">Oldest First</option>
                        <option value="top_rated">Top Rated</option>
                    </select>
                </div>
            </div>
        </section>
    );
}
