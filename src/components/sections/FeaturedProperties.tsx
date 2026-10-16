import { Reveal } from '@/components/ui/Reveal';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { propertyService } from '@/services/propertyService';

export function FeaturedProperties() {
  const featured = propertyService.getFeatured();
  const navigate = useNavigate();

  return (
    <section id="imoveis" className="py-24 md:py-32 bg-marfim">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Section Header */}
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="text-xs font-medium tracking-widest-editorial uppercase text-dourado-600 mb-4">
              Portfólio selecionado
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-grafite-900 tracking-editorial leading-tight">
              Imóveis em destaque
            </h2>
          </div>
          <div className="flex flex-col gap-4 max-w-sm">
            <p className="text-sm text-grafite-500 font-sans leading-relaxed">
              Uma curadoria de propriedades que representam o padrão de
              excelência da ATELIER. Cada imóvel foi visitado e avaliado
              pessoalmente.
            </p>
            <button
              onClick={() => navigate('/catalogo')}
              className="group inline-flex items-center gap-2 text-sm font-medium tracking-editorial text-grafite-700 hover:text-dourado-600 transition-colors duration-300 self-start"
            >
              Ver todos os imóveis
              <ArrowRight
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </button>
          </div>
        </Reveal>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((property, i) => (
            <Reveal key={property.id} delay={i * 100}>
              <PropertyCard property={property} />
            </Reveal>
          ))}
        </div>

        {/* Demo Notice */}
        <Reveal delay={200} className="mt-10 text-center">
          <p className="text-xs text-grafite-400 font-sans tracking-editorial">
            Os imóveis e valores apresentados são fictícios, para fins de demonstração.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
