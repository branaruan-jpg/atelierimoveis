import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';

interface PropertyGalleryProps {
  images: string[];
  alt: string;
}

export function PropertyGallery({ images, alt }: PropertyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, goNext, goPrev]);

  return (
    <>
      {/* Main Image + Thumbnails */}
      <div className="flex flex-col gap-3">
        {/* Main Image */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-grafite-100 group">
          <img
            src={images[activeIndex]}
            alt={`${alt} — foto ${activeIndex + 1}`}
            className="w-full h-full object-cover"
            loading="eager"
          />

          {/* Expand button */}
          <button
            onClick={() => setLightboxOpen(true)}
            className="absolute top-4 right-4 p-2.5 bg-grafite-900/60 backdrop-blur-sm text-marfim rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-grafite-900/80"
            aria-label="Ver em tela cheia"
          >
            <Expand className="w-4 h-4" strokeWidth={1.5} />
          </button>

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 bg-grafite-900/50 backdrop-blur-sm text-marfim rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-grafite-900/80"
                aria-label="Imagem anterior"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
              </button>
              <button
                onClick={goNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 bg-grafite-900/50 backdrop-blur-sm text-marfim rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-grafite-900/80"
                aria-label="Próxima imagem"
              >
                <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
              </button>

              {/* Counter */}
              <span className="absolute bottom-4 right-4 px-3 py-1.5 bg-grafite-900/60 backdrop-blur-sm text-marfim text-[10px] font-medium tracking-widest-editorial rounded-sm">
                {activeIndex + 1} / {images.length}
              </span>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`relative flex-shrink-0 w-20 h-16 md:w-28 md:h-20 overflow-hidden rounded-sm transition-all duration-300 ${
                  i === activeIndex
                    ? 'ring-2 ring-dourado-500 ring-offset-2 ring-offset-marfim'
                    : 'opacity-50 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`${alt} — miniatura ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[60] bg-grafite-900/95 flex items-center justify-center animate-fade-in"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 text-marfim/70 hover:text-marfim transition-colors duration-300"
            aria-label="Fechar"
          >
            <X className="w-7 h-7" strokeWidth={1.5} />
          </button>

          <img
            src={images[activeIndex]}
            alt={`${alt} — foto ${activeIndex + 1}`}
            className="max-w-[90vw] max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-3 text-marfim/70 hover:text-marfim transition-colors duration-300"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-8 h-8" strokeWidth={1.5} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-3 text-marfim/70 hover:text-marfim transition-colors duration-300"
                aria-label="Próxima"
              >
                <ChevronRight className="w-8 h-8" strokeWidth={1.5} />
              </button>
            </>
          )}

          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 text-marfim/50 text-xs font-medium tracking-widest-editorial">
            {activeIndex + 1} / {images.length}
          </span>
        </div>
      )}
    </>
  );
}
