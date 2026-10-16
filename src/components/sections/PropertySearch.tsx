import { Search, MapPin, Home, Tag, Maximize } from 'lucide-react';
import { useState, useMemo } from 'react';
import { propertyService, cidades, tiposImovel } from '@/services/propertyService';
import type { PropertyPurpose, PropertyType, Property } from '@/types/property';
import { PropertyCard } from '@/components/properties/PropertyCard';

export function PropertySearch() {
  const [finalidade, setFinalidade] = useState<PropertyPurpose | 'todas'>('todas');
  const [tipo, setTipo] = useState<PropertyType | 'todos'>('todos');
  const [cidade, setCidade] = useState<string>('');
  const [precoMax, setPrecoMax] = useState<number>(0);
  const [hasSearched, setHasSearched] = useState(false);

  const results = useMemo<Property[]>(() => {
    if (!hasSearched) return [];
    return propertyService.filter({ finalidade, tipo, cidade, precoMax });
  }, [finalidade, tipo, cidade, precoMax, hasSearched]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
  };

  const handleReset = () => {
    setFinalidade('todas');
    setTipo('todos');
    setCidade('');
    setPrecoMax(0);
    setHasSearched(false);
  };

  return (
    <section
      id="busca"
      className="relative -mt-20 z-20 mx-auto max-w-[1200px] px-6 lg:px-10"
    >
      {/* Search Card */}
      <form
        onSubmit={handleSearch}
        className="bg-marfim border border-grafite/10 shadow-[0_20px_60px_-15px_rgba(23,25,22,0.15)] rounded-sm p-6 md:p-8"
      >
        {/* Finalidade Toggle */}
        <div className="flex items-center gap-1 mb-6 border-b border-grafite/10 pb-5">
          {[
            { value: 'todas' as const, label: 'Todas' },
            { value: 'venda' as const, label: 'Comprar' },
            { value: 'aluguel' as const, label: 'Alugar' },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setFinalidade(opt.value)}
              className={`px-5 py-2 text-sm font-medium tracking-editorial transition-all duration-300 ease-editorial rounded-sm ${
                finalidade === opt.value
                  ? 'bg-grafite-900 text-marfim'
                  : 'text-grafite-600 hover:text-grafite-900 hover:bg-grafite/5'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Filter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Tipo */}
          <div>
            <label className="flex items-center gap-2 text-xs font-medium tracking-editorial text-grafite-500 uppercase mb-2.5">
              <Home className="w-3.5 h-3.5" strokeWidth={1.5} />
              Tipo
            </label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value as PropertyType | 'todos')}
              className="w-full bg-transparent border-b border-grafite/20 py-2.5 text-sm text-grafite-900 focus:border-dourado-500 focus:outline-none transition-colors duration-300 cursor-pointer"
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
            <label className="flex items-center gap-2 text-xs font-medium tracking-editorial text-grafite-500 uppercase mb-2.5">
              <MapPin className="w-3.5 h-3.5" strokeWidth={1.5} />
              Localização
            </label>
            <input
              type="text"
              list="cidades-list"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              placeholder="Cidade ou bairro"
              className="w-full bg-transparent border-b border-grafite/20 py-2.5 text-sm text-grafite-900 placeholder:text-grafite-300 focus:border-dourado-500 focus:outline-none transition-colors duration-300"
            />
            <datalist id="cidades-list">
              {cidades.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>

          {/* Preço Máximo */}
          <div>
            <label className="flex items-center gap-2 text-xs font-medium tracking-editorial text-grafite-500 uppercase mb-2.5">
              <Tag className="w-3.5 h-3.5" strokeWidth={1.5} />
              Preço máximo
            </label>
            <select
              value={precoMax}
              onChange={(e) => setPrecoMax(Number(e.target.value))}
              className="w-full bg-transparent border-b border-grafite/20 py-2.5 text-sm text-grafite-900 focus:border-dourado-500 focus:outline-none transition-colors duration-300 cursor-pointer"
            >
              <option value={0}>Sem limite</option>
              <option value={3000000}>R$ 3.000.000</option>
              <option value={5000000}>R$ 5.000.000</option>
              <option value={10000000}>R$ 10.000.000</option>
              <option value={20000000}>R$ 20.000.000</option>
            </select>
          </div>

          {/* Submit */}
          <div className="flex items-end">
            <button
              type="submit"
              className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-grafite-900 text-marfim text-sm font-medium tracking-editorial rounded-sm hover:bg-dourado-500 transition-all duration-300 ease-editorial"
            >
              <Search className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
              Buscar
            </button>
          </div>
        </div>
      </form>

      {/* Results */}
      {hasSearched && (
        <div className="mt-10 pb-4">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-grafite-500 font-sans">
              {results.length > 0 ? (
                <>
                  <span className="font-medium text-grafite-900">{results.length}</span>{' '}
                  {results.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
                </>
              ) : (
                'Nenhum imóvel encontrado com esses critérios'
              )}
            </p>
            <button
              onClick={handleReset}
              className="text-xs font-medium tracking-editorial text-grafite-500 hover:text-dourado-500 transition-colors duration-300 uppercase"
            >
              Limpar filtros
            </button>
          </div>

          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((property, i) => (
                <div
                  key={property.id}
                  className="opacity-0"
                  style={{
                    animation: `scale-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.08}s forwards`,
                  }}
                >
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border border-dashed border-grafite/15 rounded-sm">
              <Maximize className="w-8 h-8 text-grafite-300 mx-auto mb-4" strokeWidth={1} />
              <p className="text-grafite-400 font-sans text-sm">
                Tente ajustar os filtros para ver mais opções.
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
