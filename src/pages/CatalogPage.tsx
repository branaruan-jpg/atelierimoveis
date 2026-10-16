import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Maximize2 } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { CatalogFilters } from '@/components/properties/CatalogFilters';
import { Reveal } from '@/components/ui/Reveal';
import { propertyService } from '@/services/propertyService';
import type { PropertyFilters } from '@/services/propertyService';

const defaultFilters: PropertyFilters = {
  finalidade: 'todas',
  tipo: 'todos',
  cidade: '',
  precoMax: 0,
  quartos: 0,
  busca: '',
  sort: 'recentes',
};

export function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<PropertyFilters>(() => {
    const tipo = searchParams.get('tipo');
    const finalidade = searchParams.get('finalidade');
    return {
      ...defaultFilters,
      tipo: (tipo as PropertyFilters['tipo']) ?? 'todos',
      finalidade: (finalidade as PropertyFilters['finalidade']) ?? 'todas',
    };
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const results = useMemo(() => {
    return propertyService.filter(filters);
  }, [filters]);

  const handleFiltersChange = (newFilters: PropertyFilters) => {
    setFilters(newFilters);
    const params = new URLSearchParams();
    if (newFilters.tipo && newFilters.tipo !== 'todos') {
      params.set('tipo', newFilters.tipo);
    }
    if (newFilters.finalidade && newFilters.finalidade !== 'todas') {
      params.set('finalidade', newFilters.finalidade);
    }
    setSearchParams(params, { replace: true });
  };

  return (
    <div className="min-h-screen bg-marfim">
      <Header />

      {/* Page Header */}
      <section className="pt-28 md:pt-36 pb-10 bg-marfim border-b border-grafite/8">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="text-xs font-medium tracking-widest-editorial uppercase text-dourado-600 mb-4">
            Catálogo completo
          </p>
          <h1 className="font-serif text-3xl md:text-5xl font-light text-grafite-900 tracking-editorial leading-tight">
            Todos os imóveis
          </h1>
          <p className="mt-4 text-sm text-grafite-500 font-sans max-w-xl leading-relaxed">
            Navegue pelo portfólio completo da ATELIER. Use os filtros para
            refinar sua busca por tipo, localização, preço e características.
          </p>
        </div>
      </section>

      {/* Catalog Content */}
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          {/* Filters */}
          <div className="mb-8">
            <CatalogFilters
              filters={filters}
              onChange={handleFiltersChange}
              resultCount={results.length}
            />
          </div>

          {/* Results */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-marfim border border-grafite/8 rounded-sm overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className="aspect-[4/3] bg-grafite/5 animate-pulse" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 w-1/3 bg-grafite/5 animate-pulse rounded" />
                    <div className="h-5 w-2/3 bg-grafite/5 animate-pulse rounded" />
                    <div className="h-3 w-1/2 bg-grafite/5 animate-pulse rounded" />
                    <div className="h-px bg-grafite/8 my-3" />
                    <div className="flex justify-between items-center">
                      <div className="h-5 w-1/4 bg-grafite/5 animate-pulse rounded" />
                      <div className="h-3 w-1/6 bg-grafite/5 animate-pulse rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((property, i) => (
                <div
                  key={property.id}
                  className="opacity-0"
                  style={{
                    animation: `scale-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.06}s forwards`,
                  }}
                >
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-grafite/15 rounded-sm">
              <Maximize2 className="w-10 h-10 text-grafite-300 mx-auto mb-5" strokeWidth={1} />
              <h3 className="font-serif text-xl font-light text-grafite-700 mb-2">
                Nenhum imóvel encontrado
              </h3>
              <p className="text-sm text-grafite-400 font-sans max-w-sm mx-auto">
                Tente ajustar os filtros para ampliar sua busca. Talvez
                relaxar algum critério traga resultados interessantes.
              </p>
            </div>
          )}

          {/* Demo Notice */}
          <Reveal className="mt-12 text-center">
            <p className="text-xs text-grafite-400 font-sans tracking-editorial">
              Os imóveis e valores apresentados são fictícios, para fins de demonstração.
            </p>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
