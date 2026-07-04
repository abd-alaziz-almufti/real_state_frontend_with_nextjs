"use client";

import React, { useState, useEffect } from 'react';

export default function UnitGallery({ images = [], mainImage }) {
  let displayImages = [];
  
  if (mainImage) {
      // Prioritize the main_image_url provided by the backend
      const mainImageObj = images.find(img => img.url === mainImage) || { url: mainImage };
      const otherImages = images.filter(img => img.url !== mainImage);
      displayImages = [mainImageObj, ...otherImages];
  } else if (images && images.length > 0) {
      displayImages = [...images];
  } else {
      // Fallback
      displayImages = [
        { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD95FZ3erNunRP8byz1G94ICgN_5n7tPnzCZH_QabbblPyzW75IE92aV9BZB8iTzKdPcnr9NrF1Kj9Uotfiu5AGfjyl2T20oOX6UNn4mFFcPc06dUx1mI-n4KkFX-JLUK9aDYmoLU7CTYISMMQtFnWUD32h7xmG3SMVda8d_2vPVaqyJN2_pW3I6vuvpoKNHPZoqJupOZedBUaoD68oZOffdN7yXfniLJ40COcBMdaSZNtLiodZNMKcWGHfA58sIyQ5lL7KNxCXHw", alt: "Main property view" },
        { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAi3aj16OwIJAeCt_oOzdYEKfEccmFMcQqkXY84b9MerBCmpcRCzJq4AJblgNtgu1BJi_OVV9xcl5PzBcDR70ISite3JEwKjfRka9rqp8PIZ00pImR6ewBEoKagzNEAcnxBahqyRk5_UF1MmNldS4W9ypHF0_hafmsuAERmVf8l55s0V6MUR6duTQnOisx5oCqqL7gQxmERIRPz7jTX04m1LHfm2whxX6RAAOSMjinDcnyQ1a6YqI7OAleYE9PV6p4moQC2m8gK1Q", alt: "Living room" },
        { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgpb5cYEA7VMdQ5vXYRtkMDIbPbbvTuj6jADhGt4fPB9cgPiPDg1hhgmlY2QdG9D5eCD1oFo7ajsnINyp6dqrY-4T9PBPv92K0I_3vlrpRt-WtSUtVadOSQGnzrX1lV7g4STRjTF8VDxOoypUDBXZokvzs_RLkDpg_npGcXdrqLP7osDr2peTP9AcN_G7SHY__aDXGXgsf0G85knoyk6HgfLz-j7W2KNkr31_GVzbhJ_iOfjVIvYPFEfyYtOhE2QExhTY6dzmbNg", alt: "Kitchen" },
        { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIx3nRFHoJ1PvMx8J--CkBbBTeSWFFrUrq5a1rrnLDQrFpVQzJC4aw6dOzUfwioQqqYwzE0x9BRXytGm_ha00Q_2gAaId71zHBbfC939uLb4wmkB1gZ2EvLAruvYV4wj_P4WSK4SHh5ex2SdpXE9XbV7OfgxcvDTlQOlMbhtCLzv2jGpD2XPq35rYkKAqroknP4DhNuqE-DiJvX9TUqtZLwFwHtxgRPf7D1eFm3d7tw6tvIcbWGHAKCge6EKlQ6hqQ-wX-_SIitQ", alt: "Bathroom" },
        { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGNdwyH4T5wsOpeScRPEqtszbSf5NSb5jNdvmFV1GuoV_lfCg_Kw8ve2GxayIcp541cGagsY0iIvjBH99oGNa7FYupcuNyUNierb1gC-t8n8c4za9kQhqs9H6EpQUyXHpgsmkAiKYrNljuDruGr62ySPC-0v8xVj6cfs-YNdV5uwx1k9r4Ei_R1ZT0kwknRQBWU5Omm22gGPy08kFpZn9aiCStn2iUWfo2CdG3QYbvum9xVbIAHMtqPMbDJ0y1YMkRVRNe2q2XDQ", alt: "More photos" }
      ];
  }

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, displayImages.length]);

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightboxOpen]);

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
        {displayImages.slice(0, 5).map((img, index) => {
          const isMain = index === 0;
          const isLast = index === 4;
          const extraPhotos = displayImages.length - 5;
          
          let containerClasses = "rounded-xl overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-lg transition-shadow duration-300 ";
          
          if (isMain) {
              containerClasses += "md:col-span-2 md:row-span-2 h-[400px] md:h-[600px]";
          } else if (index === 1 || index === 2) {
              containerClasses += "h-[200px] md:h-[292px]";
          } else {
              containerClasses += "h-[200px] md:h-[292px] hidden md:block";
          }

          return (
            <div key={img.id || index} className={containerClasses} onClick={() => openLightbox(index)}>
              {isLast && extraPhotos > 0 && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10 transition-opacity group-hover:bg-black/50">
                  <span className="text-white font-headline-md text-[24px] font-bold">+{extraPhotos} Photos</span>
                </div>
              )}
              <img
                alt={img.alt || `Property view ${index + 1}`}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                src={img.url || img.image_url}
              />
            </div>
          );
        })}
      </section>

      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-gray-300 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <span className="material-symbols-outlined text-[32px]">close</span>
          </button>

          {displayImages.length > 1 && (
            <button 
              className="absolute left-4 md:left-10 text-white hover:text-gray-300 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50 flex items-center justify-center"
              onClick={prevImage}
            >
              <span className="material-symbols-outlined text-[32px]">chevron_left</span>
            </button>
          )}

          <div className="relative max-w-[90vw] max-h-[90vh] flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img 
              src={displayImages[currentImageIndex]?.url || displayImages[currentImageIndex]?.image_url} 
              alt={`Property image ${currentImageIndex + 1}`} 
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            
            <div className="mt-4 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium">
              {currentImageIndex + 1} / {displayImages.length}
            </div>
          </div>

          {displayImages.length > 1 && (
            <button 
              className="absolute right-4 md:right-10 text-white hover:text-gray-300 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50 flex items-center justify-center"
              onClick={nextImage}
            >
              <span className="material-symbols-outlined text-[32px]">chevron_right</span>
            </button>
          )}
        </div>
      )}
    </>
  );
}
