import { Search, Home, MapPin, Tag, BedDouble, ArrowUpDown, X } from 'lucide-react';
import type { PropertyFilters, SortOption } from '@/services/propertyService';
import {
  tiposImovel,
  quartosOpcoes,
  sortOpcoes,
  cidades,
} from '@/services/propertyService';
import type { PropertyPurpose, PropertyType } from '@/types/property';

interface CatalogFiltersProps {
  filters: PropertyFilters;
  onChange: (filters: PropertyFilters) => void;
  resultCount: number;
}

export function CatalogFilters({
  filters,
  onChange,
  resultCount,
}: CatalogFiltersProps) {
  const update = (patch: Partial<PropertyFilters>) => {
    onChange({ ...filters, ...patch });
  };

  const handleReset = () => {
    onChange({
      finalidade: 'todas',
      tipo: 'todos',
      cidade: '',
      precoMax: 0,
      quartos: 0,
      busca: '',
      sort: 'recentes',
    });
  };

  const hasActiveFilters =
    (filters.finalidade && filters.finalidade !== 'todas') ||
    (filters.tipo && filters.tipo !== 'todos') ||
    (filters.cidade && filters.cidade !== '') ||
    (filters.precoMax && filters.precoMax > 0) ||
    (filters.quartos && filters.quartos > 0) ||
    (filters.busca && filters.busca !== '');

  return (
    <div className="bg-marfim border border-grafite/10 rounded-sm p-5 md:p-6">
      {/* Top Row: Search + Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-5 pb-5 border-b border-grafite/10">
        {/* Text Search */}
        <div className="flex-grow">
          <label className="flex items-center gap-2 text-[10px] font-medium tracking-widest-editorial uppercase text-grafite-500 mb-2">
            <Search className="w-3 h-3" strokeWidth={1.5} />
            Busca
          </label>
          <input
            type="text"
            value={filters.busca ?? ''}
            onChange={(e) => update({ busca: e.target.value })}
            placeholder="Título, cidade, bairro..."
            className="w-full bg-transparent border-b border-grafite/20 py-2 text-sm text-grafite-900 placeholder:text-grafite-300 focus:border-dourado-500 focus:outline-none transition-colors duration-300"
          />
        </div>

        {/* Sort */}
        <div className="md:w-52">
          <label className="flex items-center gap-2 text-[10px] font-medium tracking-widest-editorial uppercase text-grafite-500 mb-2">
            <ArrowUpDown className="w-3 h-3" strokeWidth={1.5} />
            Ordenar por
          </label>
          <select
            value={filters.sort ?? 'recentes'}
            onChange={(e) => update({ sort: e.target.value as SortOption })}
            className="w-full bg-transparent border-b border-grafite/20 py-2 text-sm text-grafite-900 focus:border-dourado-500 focus:outline-none transition-colors duration-300 cursor-pointer"
          >
            {sortOpcoes.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Finalidade Toggle */}
      <div className="flex items-center gap-1 mb-5">
        {[
          { value: 'todas' as const, label: 'Todas' },
          { value: 'venda' as const, label: 'Comprar' },
          { value: 'aluguel' as const, label: 'Alugar' },
        ].map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => update({ finalidade: opt.value })}
            className={`px-4 py-2 text-xs font-medium tracking-editorial transition-all duration-300 ease-editorial rounded-sm ${
              (filters.finalidade ?? 'todas') === opt.value
                ? 'bg-grafite-900 text-marfim'
                : 'text-grafite-600 hover:text-grafite-900 hover:bg-grafite/5'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Filter Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Tipo */}
        <div>
          <label className="flex items-center gap-1.5 text-[10px] font-medium tracking-widest-editorial uppercase text-grafite-500 mb-2">
            <Home className="w-3 h-3" strokeWidth={1.5} />
            Tipo
          </label>
          <select
            value={filters.tipo ?? 'todos'}
            onChange={(e) => update({ tipo: e.target.value as PropertyType | 'todos' })}
            className="w-full bg-transparent border-b border-grafite/20 py-2 text-sm text-grafite-900 focus:border-dourado-500 focus:outline-none transition-colors duration-300 cursor-pointer"
          >
            {tiposImovel.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* Cidade */}
        <div>
          <label className="flex items-center gap-1.5 text-[10px] font-medium tracking-widest-editorial uppercase text-grafite-500 mb-2">
            <MapPin className="w-3 h-3" strokeWidth={1.5} />
            Cidade
          </label>
          <input
            type="text"
            list="cidades-catalog"
            value={filters.cidade ?? ''}
            onChange={(e) => update({ cidade: e.target.value })}
            placeholder="Cidade"
            className="w-full bg-transparent border-b border-grafite/20 py-2 text-sm text-grafite-900 placeholder:text-grafite-300 focus:border-dourado-500 focus:outline-none transition-colors duration-300"
          />
          <datalist id="cidades-catalog">
            {cidades.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </div>

        {/* Preço Máximo */}
        <div>
          <label className="flex items-center gap-1.5 text-[10px] font-medium tracking-widest-editorial uppercase text-grafite-500 mb-2">
            <Tag className="w-3 h-3" strokeWidth={1.5} />
            Preço máx.
          </label>
          <select
            value={filters.precoMax ?? 0}
            onChange={(e) => update({ precoMax: Number(e.target.value) })}
            className="w-full bg-transparent border-b border-grafite/20 py-2 text-sm text-grafite-900 focus:border-dourado-500 focus:outline-none transition-colors duration-300 cursor-pointer"
          >
            <option value={0}>Sem limite</option>
            <option value={3000000}>R$ 3.000.000</option>
            <option value={5000000}>R$ 5.000.000</option>
            <option value={10000000}>R$ 10.000.000</option>
            <option value={20000000}>R$ 20.000.000</option>
          </select>
        </div>

        {/* Quartos */}
        <div>
          <label className="flex items-center gap-1.5 text-[10px] font-medium tracking-widest-editorial uppercase text-grafite-500 mb-2">
            <BedDouble className="w-3 h-3" strokeWidth={1.5} />
            Quartos
          </label>
          <select
            value={filters.quartos ?? 0}
            onChange={(e) => update({ quartos: Number(e.target.value) })}
            className="w-full bg-transparent border-b border-grafite/20 py-2 text-sm text-grafite-900 focus:border-dourado-500 focus:outline-none transition-colors duration-300 cursor-pointer"
          >
            {quartosOpcoes.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results + Reset */}
      <div className="flex items-center justify-between mt-5 pt-5 border-t border-grafite/10">
        <p className="text-xs text-grafite-500 font-sans">
          <span className="font-medium text-grafite-900">{resultCount}</span>{' '}
          {resultCount === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
        </p>
        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-[10px] font-medium tracking-widest-editorial uppercase text-grafite-500 hover:text-dourado-600 transition-colors duration-300"
          >
            <X className="w-3 h-3" strokeWidth={1.5} />
            Limpar filtros
          </button>
        )}
      </div>
    </div>
  );
}
