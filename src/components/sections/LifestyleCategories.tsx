import { Reveal } from '@/components/ui/Reveal';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    id: 'casas-contemporaneas',
    titulo: 'Casas contemporâneas',
    descricao:
      'Projetos de arquitetura atual, linhas limpas e integração com a paisagem.',
    imagem:
      'https://images.pexels.com/photos/7031604/pexels-photo-7031604.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    filtro: 'casa',
  },
  {
    id: 'apartamentos-sofisticados',
    titulo: 'Apartamentos sofisticados',
    descricao:
      'Unidades de alto padrão em localizações privilegiadas, com design de interiores apurado.',
    imagem:
      'https://images.pexels.com/photos/8135492/pexels-photo-8135492.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    filtro: 'apartamento',
  },
  {
    id: 'propriedades-exclusivas',
    titulo: 'Propriedades exclusivas',
    descricao:
      'Mansões e coberturas de raridade arquitetônica, para um perfil exigente.',
    imagem:
      'https://images.pexels.com/photos/3195642/pexels-photo-3195642.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    filtro: 'mansao',
  },
];

export function LifestyleCategories() {
  const navigate = useNavigate();

  const handleCategoryClick = (tipo: string) => {
    navigate(`/catalogo?tipo=${tipo}`);
  };

  return (
    <section className="py-24 md:py-32 bg-marfim-50">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Header */}
        <Reveal className="mb-14">
          <p className="text-xs font-medium tracking-widest-editorial uppercase text-dourado-600 mb-4">
            Seleção por estilo
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-grafite-900 tracking-editorial leading-tight">
            Encontre seu estilo de morar
          </h2>
        </Reveal>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <Reveal key={cat.id} delay={i * 120}>
              <button
                onClick={() => handleCategoryClick(cat.filtro)}
                className="group relative block w-full aspect-[3/4] overflow-hidden rounded-sm bg-grafite-900 text-left"
              >
                {/* Image */}
                <img
                  src={cat.imagem}
                  alt={cat.titulo}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-editorial group-hover:scale-110"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-grafite-900/90 via-grafite-900/30 to-transparent transition-opacity duration-500 group-hover:from-grafite-900/95" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-7">
                  <h3 className="font-serif text-xl md:text-2xl font-light text-marfim tracking-editorial mb-2">
                    {cat.titulo}
                  </h3>
                  <p className="text-marfim/60 font-sans text-xs leading-relaxed mb-4 max-w-[260px] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-editorial translate-y-2 group-hover:translate-y-0">
                    {cat.descricao}
                  </p>
                  <span className="inline-flex items-center gap-2 text-xs font-medium tracking-editorial text-dourado-300 uppercase">
                    Explorar
                    <ArrowRight
                      className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5"
                      strokeWidth={1.5}
                    />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
