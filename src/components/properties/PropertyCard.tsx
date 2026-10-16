import { MapPin, BedDouble, Bath, Maximize2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Property } from '@/types/property';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const navigate = useNavigate();

  const handleDetails = () => {
    navigate(`/imovel/${property.id}`);
  };

  const statusLabel =
    property.status === 'disponivel'
      ? property.finalidade === 'venda'
        ? 'À venda'
        : 'Para alugar'
      : property.status === 'vendido'
        ? 'Vendido'
        : 'Alugado';

  return (
    <article className="group flex flex-col bg-marfim border border-grafite/8 rounded-sm overflow-hidden hover:shadow-[0_16px_40px_-12px_rgba(23,25,22,0.2)] transition-all duration-500 ease-editorial">
      {/* Image */}
      <div
        className="relative aspect-[4/3] overflow-hidden bg-grafite-100 cursor-pointer"
        onClick={handleDetails}
      >
        <img
          src={property.imagens[0]}
          alt={`${property.titulo} — ${property.localizacao.cidade}, ${property.localizacao.estado}`}
          className="w-full h-full object-cover transition-transform duration-[1.2s] ease-editorial group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-grafite-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Status Badge */}
        <span className="absolute top-4 left-4 px-3 py-1.5 bg-marfim/90 backdrop-blur-sm text-[10px] font-medium tracking-wider-editorial uppercase text-grafite-900 rounded-sm">
          {statusLabel}
        </span>

        {/* Demo Badge */}
        <span className="absolute top-4 right-4 px-2.5 py-1 bg-dourado-500/90 backdrop-blur-sm text-[9px] font-medium tracking-wider-editorial uppercase text-marfim rounded-sm">
          Demo
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-5">
        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs text-grafite-400 font-sans mb-2">
          <MapPin className="w-3.5 h-3.5" strokeWidth={1.5} />
          <span>
            {property.localizacao.bairro
              ? `${property.localizacao.bairro}, `
              : ''}
            {property.localizacao.cidade}, {property.localizacao.estado}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl font-medium text-grafite-900 mb-1 tracking-editorial">
          {property.titulo}
        </h3>

        {/* Type */}
        <p className="text-xs text-grafite-400 font-sans uppercase tracking-editorial mb-4">
          {property.tipo === 'mansao'
            ? 'Mansão'
            : property.tipo === 'cobertura'
              ? 'Cobertura'
              : property.tipo.charAt(0).toUpperCase() + property.tipo.slice(1)}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-grafite-600 font-sans mb-5 pb-5 border-b border-grafite/8">
          <span className="flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5 text-dourado-500" strokeWidth={1.5} />
            {property.area} m²
          </span>
          <span className="flex items-center gap-1.5">
            <BedDouble className="w-3.5 h-3.5 text-dourado-500" strokeWidth={1.5} />
            {property.quartos} dorms.
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="w-3.5 h-3.5 text-dourado-500" strokeWidth={1.5} />
            {property.banheiros} banhos.
          </span>
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between">
          <div>
            <p className="text-[10px] text-grafite-400 font-sans uppercase tracking-editorial mb-0.5">
              {property.finalidade === 'venda' ? 'Preço' : 'Mensalidade'}
            </p>
            <p className="font-serif text-lg font-medium text-grafite-900">
              {property.precoFormatado}
            </p>
          </div>
          <button
            onClick={handleDetails}
            className="group/btn inline-flex items-center gap-2 text-xs font-medium tracking-editorial text-grafite-700 hover:text-dourado-600 transition-colors duration-300"
          >
            Detalhes
            <ArrowRight
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1"
              strokeWidth={1.5}
            />
          </button>
        </div>
      </div>
    </article>
  );
}
