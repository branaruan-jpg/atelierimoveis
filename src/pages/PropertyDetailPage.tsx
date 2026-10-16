import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Maximize2,
  BedDouble,
  Bath,
  Car,
  Calendar,
  Check,
  Mail,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PropertyGallery } from '@/components/properties/PropertyGallery';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { Reveal } from '@/components/ui/Reveal';
import { propertyService } from '@/services/propertyService';

export function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const property = id ? propertyService.getById(id) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!property) {
    return (
      <div className="min-h-screen bg-marfim flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center px-6">
          <div className="text-center">
            <h1 className="font-serif text-3xl font-light text-grafite-900 mb-4">
              Imóvel não encontrado
            </h1>
            <p className="text-sm text-grafite-500 font-sans mb-8">
              O imóvel que você procura não está disponível ou foi removido.
            </p>
            <button
              onClick={() => navigate('/catalogo')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-grafite-900 text-marfim text-sm font-medium tracking-editorial rounded-sm hover:bg-dourado-500 transition-all duration-300 ease-editorial"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
              Voltar ao catálogo
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedProperties = propertyService
    .getAll()
    .filter((p) => p.id !== property.id && p.tipo === property.tipo)
    .slice(0, 3);

  const statusLabel =
    property.status === 'disponivel'
      ? property.finalidade === 'venda'
        ? 'À venda'
        : 'Para alugar'
      : property.status === 'vendido'
        ? 'Vendido'
        : 'Alugado';

  const specs = [
    { icon: Maximize2, label: 'Área', value: `${property.area} m²` },
    { icon: BedDouble, label: 'Quartos', value: `${property.quartos}` },
    { icon: Bath, label: 'Banheiros', value: `${property.banheiros}` },
    ...(property.vagas
      ? [{ icon: Car, label: 'Vagas', value: `${property.vagas}` }]
      : []),
    ...(property.anoConstrucao
      ? [{ icon: Calendar, label: 'Ano', value: `${property.anoConstrucao}` }]
      : []),
  ];

  return (
    <div className="min-h-screen bg-marfim">
      <Header />

      {/* Detail Content */}
      <article className="pt-24 md:pt-28">
        {/* Breadcrumb / Back */}
        <div className="mx-auto max-w-[1300px] px-6 lg:px-10 py-6">
          <Link
            to="/catalogo"
            className="group inline-flex items-center gap-2 text-xs font-medium tracking-editorial text-grafite-500 hover:text-dourado-600 transition-colors duration-300 uppercase"
          >
            <ArrowLeft
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1"
              strokeWidth={1.5}
            />
            Voltar ao catálogo
          </Link>
        </div>

        {/* Gallery + Info */}
        <div className="mx-auto max-w-[1300px] px-6 lg:px-10 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Gallery */}
            <div className="lg:col-span-8">
              <PropertyGallery
                images={property.imagens}
                alt={property.titulo}
              />
            </div>

            {/* Info Sidebar */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                {/* Status + Type */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1.5 bg-grafite-900 text-marfim text-[10px] font-medium tracking-widest-editorial uppercase rounded-sm">
                    {statusLabel}
                  </span>
                  <span className="px-2.5 py-1 bg-dourado-500/90 text-marfim text-[9px] font-medium tracking-widest-editorial uppercase rounded-sm">
                    Demo
                  </span>
                </div>

                {/* Title */}
                <h1 className="font-serif text-2xl md:text-3xl font-light text-grafite-900 tracking-editorial leading-tight mb-3">
                  {property.titulo}
                </h1>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-sm text-grafite-500 font-sans mb-6">
                  <MapPin className="w-4 h-4 text-dourado-500" strokeWidth={1.5} />
                  <span>
                    {property.localizacao.bairro
                      ? `${property.localizacao.bairro}, `
                      : ''}
                    {property.localizacao.cidade}, {property.localizacao.estado}
                  </span>
                </div>

                {/* Price */}
                <div className="py-5 border-y border-grafite/10 mb-6">
                  <p className="text-[10px] text-grafite-400 font-sans uppercase tracking-widest-editorial mb-1">
                    {property.finalidade === 'venda' ? 'Preço' : 'Mensalidade'}
                  </p>
                  <p className="font-serif text-2xl md:text-3xl font-medium text-grafite-900">
                    {property.precoFormatado}
                  </p>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-center gap-3 py-3 px-4 bg-marfim-50 border border-grafite/8 rounded-sm"
                    >
                      <spec.icon
                        className="w-4 h-4 text-dourado-500 flex-shrink-0"
                        strokeWidth={1.5}
                      />
                      <div>
                        <p className="text-[10px] text-grafite-400 font-sans uppercase tracking-editorial">
                          {spec.label}
                        </p>
                        <p className="text-sm text-grafite-900 font-sans font-medium">
                          {spec.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Contact CTA */}
                <div className="bg-grafite-900 rounded-sm p-6 text-center">
                  <p className="text-marfim/70 text-xs font-sans mb-4 leading-relaxed">
                    Tem interesse neste imóvel? Inicie uma conversa com nossa
                    equipe.
                  </p>
                  <Link
                    to="/#contato"
                    className="inline-flex items-center justify-center gap-2 w-full px-5 py-3.5 bg-marfim text-grafite-900 text-sm font-medium tracking-editorial rounded-sm hover:bg-dourado-500 hover:text-marfim transition-all duration-300 ease-editorial"
                  >
                    <Mail className="w-4 h-4" strokeWidth={1.5} />
                    Consultar este imóvel
                  </Link>
                  <p className="mt-3 text-[10px] text-marfim/40 font-sans tracking-editorial">
                    Atendimento personalizado e discreto
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <Reveal className="mt-16 max-w-3xl">
            <p className="text-xs font-medium tracking-widest-editorial uppercase text-dourado-600 mb-5">
              Sobre o imóvel
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-light text-grafite-900 tracking-editorial leading-tight mb-6">
              {property.titulo}
            </h2>
            <p className="text-grafite-600 font-sans text-base leading-relaxed font-light">
              {property.descricao}
            </p>
          </Reveal>

          {/* Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <Reveal delay={100} className="mt-12 max-w-3xl">
              <p className="text-xs font-medium tracking-widest-editorial uppercase text-dourado-600 mb-5">
                Diferenciais e ambientes
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {property.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-3 py-2 border-b border-grafite/8"
                  >
                    <Check
                      className="w-4 h-4 text-dourado-500 flex-shrink-0"
                      strokeWidth={1.5}
                    />
                    <span className="text-sm text-grafite-700 font-sans font-light">
                      {amenity}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </article>

      {/* Related Properties */}
      {relatedProperties.length > 0 && (
        <section className="py-16 md:py-20 bg-marfim-50 border-t border-grafite/8">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <Reveal className="mb-10">
              <p className="text-xs font-medium tracking-widest-editorial uppercase text-dourado-600 mb-3">
                Imóveis semelhantes
              </p>
              <h2 className="font-serif text-2xl md:text-3xl font-light text-grafite-900 tracking-editorial">
                Continue explorando
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProperties.map((p, i) => (
                <Reveal key={p.id} delay={i * 100}>
                  <PropertyCard property={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
