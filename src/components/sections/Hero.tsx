import { ArrowRight, ArrowDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Hero() {
  const navigate = useNavigate();

  const scrollToSection = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-[100svh] flex items-end overflow-hidden bg-grafite-900"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1920"
          alt="Residência contemporânea com varandas envidraçadas"
          className="w-full h-full object-cover animate-image-reveal"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-grafite-900 via-grafite-900/40 to-grafite-900/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-grafite-900/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1400px] w-full px-6 lg:px-10 pb-20 pt-32">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <p
            className="text-marfim/60 text-xs md:text-sm font-sans font-medium tracking-widest-editorial uppercase mb-6 opacity-0"
            style={{ animation: 'hero-reveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards' }}
          >
            Curadoria imobiliária de alto padrão
          </p>

          {/* Title */}
          <h1
            className="text-marfim font-serif text-4xl md:text-6xl lg:text-7xl font-light leading-[1.05] tracking-editorial text-balance opacity-0"
            style={{ animation: 'hero-reveal 1s cubic-bezier(0.22, 1, 0.36, 1) 0.5s forwards' }}
          >
            Arquitetura que se torna
            <br />
            <span className="italic text-dourado-300">endereço de morar.</span>
          </h1>

          {/* Subtitle */}
          <p
            className="mt-8 text-marfim/70 text-base md:text-lg font-sans font-light leading-relaxed max-w-xl opacity-0"
            style={{ animation: 'hero-reveal 1s cubic-bezier(0.22, 1, 0.36, 1) 0.7s forwards' }}
          >
            Uma seleção criteriosa de propriedades contemporâneas, escolhidas
            por seu desenho, localização e caráter. Cada imóvel é avaliado
            pessoalmente antes de chegar ao nosso portfólio.
          </p>

          {/* Buttons */}
          <div
            className="mt-10 flex flex-col sm:flex-row gap-4 opacity-0"
            style={{ animation: 'hero-reveal 1s cubic-bezier(0.22, 1, 0.36, 1) 0.9s forwards' }}
          >
            <button
              onClick={() => navigate('/catalogo')}
              className="group inline-flex items-center justify-center gap-3 px-7 py-4 bg-marfim text-grafite-900 text-sm font-medium tracking-editorial rounded-sm hover:bg-dourado-500 hover:text-marfim transition-all duration-400 ease-editorial"
            >
              Explorar imóveis
              <ArrowRight
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </button>
            <button
              onClick={() => scrollToSection('#sobre')}
              className="inline-flex items-center justify-center gap-3 px-7 py-4 border border-marfim/30 text-marfim text-sm font-medium tracking-editorial rounded-sm hover:border-marfim hover:bg-marfim/5 transition-all duration-400 ease-editorial"
            >
              Conhecer nossa abordagem
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => scrollToSection('#busca')}
        className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-2 text-marfim/50 hover:text-marfim transition-colors duration-300 opacity-0"
        style={{ animation: 'hero-reveal 1s cubic-bezier(0.22, 1, 0.36, 1) 1.2s forwards' }}
        aria-label="Rolar para baixo"
      >
        <span className="text-[10px] tracking-widest-editorial uppercase">Role</span>
        <ArrowDown className="w-4 h-4 animate-bounce" strokeWidth={1.5} />
      </button>
    </section>
  );
}
