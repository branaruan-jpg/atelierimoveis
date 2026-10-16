import { Reveal } from '@/components/ui/Reveal';

export function BrandManifesto() {
  return (
    <section className="bg-grafite-900 py-28 md:py-40 overflow-hidden">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
        <Reveal>
          <p className="text-xs font-medium tracking-widest-editorial uppercase text-dourado-400 mb-8">
            Manifesto
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="font-serif text-2xl md:text-4xl lg:text-[2.75rem] font-light text-marfim leading-[1.3] tracking-editorial text-balance">
            Acreditamos que um imóvel é mais do que metros quadrados.
            <br />
            <span className="italic text-dourado-300">
              É a materialização de uma escolha de vida.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={250}>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl">
            <div>
              <p className="text-marfim/60 font-sans text-sm leading-relaxed font-light">
                Por isso, não trabalhamos com volume. Trabalhamos com
                curadoria. Cada propriedade que entra no nosso portfólio passa
                por uma avaliação criteriosa — de sua arquitetura, de sua
                localização, de seu potencial de valorização e, sobretudo, de
                seu caráter.
              </p>
            </div>
            <div>
              <p className="text-marfim/60 font-sans text-sm leading-relaxed font-light">
                Nossa função não é mostrar muitos imóveis. É mostrar o imóvel
                certo, para a pessoa certa, no momento certo. Esse é o
                princípio que orienta cada etapa do nosso trabalho.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Divider */}
        <Reveal delay={400}>
          <div className="mt-16 flex items-center gap-6">
            <div className="h-px flex-grow bg-marfim/15 max-w-[200px]" />
            <span className="font-serif text-sm italic text-dourado-300">
              Atelier Imóveis
            </span>
            <div className="h-px flex-grow bg-marfim/15 max-w-[200px]" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
