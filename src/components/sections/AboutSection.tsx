import { Reveal } from '@/components/ui/Reveal';
import { Building2, Compass, HeartHandshake } from 'lucide-react';

const pillars = [
  {
    icon: Compass,
    titulo: 'Curadoria',
    texto:
      'Visitamos e avaliamos cada imóvel pessoalmente. Só entra no portfólio o que passa no nosso critério de design, localização e valor.',
  },
  {
    icon: HeartHandshake,
    titulo: 'Atendimento personalizado',
    texto:
      'Entendemos o seu modo de viver antes de sugerir um imóvel. A correspondência entre pessoa e propriedade é o que buscamos.',
  },
  {
    icon: Building2,
    titulo: 'Discrição',
    texto:
      'Tratamos cada negociação com confidencialidade. Acreditamos que comprar um imóvel de alto padrão é, antes de tudo, uma decisão pessoal.',
  },
];

export function AboutSection() {
  return (
    <section id="sobre" className="py-24 md:py-32 bg-marfim">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left: Image */}
          <Reveal className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
              <img
                src="https://images.pexels.com/photos/2081172/pexels-photo-2081172.jpeg?auto=compress&cs=tinysrgb&h=900&w=700"
                alt="Escadaria minimalista de uma arquitetura contemporânea"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>

          {/* Right: Content */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-xs font-medium tracking-widest-editorial uppercase text-dourado-600 mb-6">
                Sobre a ATELIER
              </p>
              <h2 className="font-serif text-3xl md:text-5xl font-light text-grafite-900 tracking-editorial leading-tight mb-8 text-balance">
                Uma imobiliária que pensa como um estúdio de arquitetura.
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-grafite-600 font-sans text-base leading-relaxed mb-6 font-light">
                A ATELIER Imóveis nasce da observação de que o mercado
                imobiliário de alto padrão precisava de uma abordagem diferente.
                Não a do volume, nem a do catálogo exaustivo. Mas a da
                curadoria — a mesma que orienta um estúdio de arquitetura na
                seleção de materiais, na leitura de um terreno, na composição
                de um espaço.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-grafite-600 font-sans text-base leading-relaxed mb-12 font-light">
                Nossa equipe entende de arquitetura, de bairros, de história
                urbana. Mais do que apresentar imóveis, ajudamos a entender se
                uma propriedade faz sentido para o seu projeto de vida. Esta é
                uma demonstração de nosso trabalho — fictícia em dados, real em
                propósito.
              </p>
            </Reveal>

            {/* Pillars */}
            <div className="space-y-0">
              {pillars.map((pillar, i) => (
                <Reveal key={pillar.titulo} delay={300 + i * 100}>
                  <div className="flex gap-5 py-6 border-t border-grafite/10 last:border-b">
                    <div className="flex-shrink-0">
                      <div className="w-11 h-11 flex items-center justify-center border border-dourado-500/30 rounded-sm text-dourado-600">
                        <pillar.icon className="w-5 h-5" strokeWidth={1.25} />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-medium text-grafite-900 mb-1.5 tracking-editorial">
                        {pillar.titulo}
                      </h3>
                      <p className="text-sm text-grafite-500 font-sans leading-relaxed font-light">
                        {pillar.texto}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
