import { Mail, MapPin, Clock } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Início', to: '/' },
  { label: 'Imóveis', to: '/catalogo' },
  { label: 'Sobre', to: '/#sobre' },
  { label: 'Contato', to: '/#contato' },
];

const institutionalLinks = [
  { label: 'Política de privacidade', href: '#' },
  { label: 'Termos de uso', href: '#' },
  { label: 'Código de ética', href: '#' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    to: string
  ) => {
    e.preventDefault();
    if (to.startsWith('/#')) {
      const hash = to.slice(2);
      if (isHome) {
        const target = document.getElementById(hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        navigate('/');
        setTimeout(() => {
          const target = document.getElementById(hash);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    } else {
      navigate(to);
    }
  };

  return (
    <footer id="contato" className="bg-grafite-900 text-marfim">
      {/* Main */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <span className="font-serif text-2xl font-medium tracking-editorial text-marfim">
                ATELIER
              </span>{' '}
              <span className="font-serif text-2xl font-light italic text-dourado-300">
                Imóveis
              </span>
            </div>
            <p className="text-marfim/40 font-sans text-sm leading-relaxed font-light max-w-xs">
              Curadoria imobiliária de alto padrão. Arquitetura como critério,
              atendimento como princípio.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-medium tracking-widest-editorial uppercase text-marfim/50 mb-5">
              Navegação
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <a
                    href={link.to}
                    onClick={(e) => handleNavClick(e, link.to)}
                    className="text-sm text-marfim/60 hover:text-dourado-300 transition-colors duration-300 font-sans font-light"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Institutional */}
          <div>
            <h4 className="text-xs font-medium tracking-widest-editorial uppercase text-marfim/50 mb-5">
              Institucional
            </h4>
            <ul className="space-y-3">
              {institutionalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-marfim/60 hover:text-dourado-300 transition-colors duration-300 font-sans font-light"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-medium tracking-widest-editorial uppercase text-marfim/50 mb-5">
              Contato
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-marfim/50 font-sans font-light">
                <Mail className="w-4 h-4 mt-0.5 text-dourado-400 flex-shrink-0" strokeWidth={1.5} />
                <span>A configurar</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-marfim/50 font-sans font-light">
                <MapPin className="w-4 h-4 mt-0.5 text-dourado-400 flex-shrink-0" strokeWidth={1.5} />
                <span>Endereço a configurar</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-marfim/50 font-sans font-light">
                <Clock className="w-4 h-4 mt-0.5 text-dourado-400 flex-shrink-0" strokeWidth={1.5} />
                <span>Horário a configurar</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-marfim/10">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-marfim/30 font-sans tracking-editorial">
            © {currentYear} ATELIER Imóveis. Projeto de demonstração — dados fictícios.
          </p>
          <p className="text-xs text-marfim/30 font-sans tracking-editorial">
            Feito com atenção aos detalhes.
          </p>
        </div>
      </div>
    </footer>
  );
}
