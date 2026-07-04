import React from 'react';

export default function Pagination({ meta, onPageChange }) {
    if (!meta || meta.last_page <= 1) return null;

    const { current_page, last_page } = meta;

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages = [];
        
        if (last_page <= 7) {
            for (let i = 1; i <= last_page; i++) {
                pages.push(i);
            }
        } else {
            if (current_page <= 4) {
                pages.push(1, 2, 3, 4, 5, '...', last_page);
            } else if (current_page >= last_page - 3) {
                pages.push(1, '...', last_page - 4, last_page - 3, last_page - 2, last_page - 1, last_page);
            } else {
                pages.push(1, '...', current_page - 1, current_page, current_page + 1, '...', last_page);
            }
        }
        
        return pages;
    };

    const pages = getPageNumbers();

    return (
        <div className="mt-16 flex items-center justify-center gap-2">
            <button 
                onClick={() => onPageChange(current_page - 1)}
                disabled={current_page === 1}
                className="h-12 w-12 flex items-center justify-center rounded-xl border border-outline-variant hover:bg-surface-container-high transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <span className="material-symbols-outlined">chevron_left</span>
            </button>

            {pages.map((page, index) => {
                if (page === '...') {
                    return <span key={`dots-${index}`} className="px-2 text-outline">...</span>;
                }

                return (
                    <button 
                        key={`page-${page}`}
                        onClick={() => onPageChange(page)}
                        className={`h-12 w-12 flex items-center justify-center rounded-xl transition-all ${
                            current_page === page 
                                ? 'bg-primary text-white font-semibold shadow-md' 
                                : 'border border-outline-variant hover:bg-surface-container-high'
                        }`}
                    >
                        {page}
                    </button>
                );
            })}

            <button 
                onClick={() => onPageChange(current_page + 1)}
                disabled={current_page === last_page}
                className="h-12 w-12 flex items-center justify-center rounded-xl border border-outline-variant hover:bg-surface-container-high transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <span className="material-symbols-outlined">chevron_right</span>
            </button>
        </div>
    );
}
