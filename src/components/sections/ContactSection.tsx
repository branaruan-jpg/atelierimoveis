import { Reveal } from '@/components/ui/Reveal';
import { ArrowRight } from 'lucide-react';

export function ContactSection() {
  const scrollToContact = () => {
    const footer = document.getElementById('contato');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="contato-cta"
      className="relative py-28 md:py-36 overflow-hidden bg-grafite-900"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/31737859/pexels-photo-31737859.jpeg?auto=compress&cs=tinysrgb&h=900&w=1400"
          alt="Arquitetura residencial iluminada à noite"
          className="w-full h-full object-cover opacity-20"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-grafite-900/80 via-grafite-900/60 to-grafite-900/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[900px] px-6 lg:px-10 text-center">
        <Reveal>
          <p className="text-xs font-medium tracking-widest-editorial uppercase text-dourado-400 mb-6">
            Vamos conversar
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-marfim tracking-editorial leading-tight text-balance mb-8">
            O imóvel que você procura
            <br />
            <span className="italic text-dourado-300">pode não estar no portfólio.</span>
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p className="text-marfim/60 font-sans text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto mb-10">
            Parte do nosso trabalho acontece fora do catálogo. Se você tem um
            critério específico, uma rua, um bairro ou um tipo de arquitetura
            em mente, conte para nós. A busca certa começa pela conversa.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <button
            onClick={scrollToContact}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-marfim text-grafite-900 text-sm font-medium tracking-editorial rounded-sm hover:bg-dourado-500 hover:text-marfim transition-all duration-400 ease-editorial"
          >
            Iniciar conversa
            <ArrowRight
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
