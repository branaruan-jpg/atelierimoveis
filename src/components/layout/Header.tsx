import { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useScrolled } from '@/hooks/useScrolled';

const navLinks = [
  { label: 'Início', to: '/' },
  { label: 'Imóveis', to: '/catalogo' },
  { label: 'Sobre', to: '/#sobre' },
  { label: 'Contato', to: '/#contato' },
];

export function Header() {
  const scrolled = useScrolled(60);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    to: string
  ) => {
    e.preventDefault();
    setMenuOpen(false);

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
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-editorial ${
          scrolled || !isHome
            ? 'bg-marfim/95 backdrop-blur-md border-b border-grafite/10 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => handleNavClick(e, '/')}
            className="group flex items-center gap-2 select-none"
          >
            <span
              className={`font-serif text-xl md:text-2xl font-medium tracking-editorial transition-colors duration-500 ${
                scrolled || !isHome ? 'text-grafite-900' : 'text-marfim'
              }`}
            >
              ATELIER
            </span>
            <span
              className={`font-serif text-xl md:text-2xl font-light italic transition-colors duration-500 ${
                scrolled || !isHome ? 'text-dourado-500' : 'text-dourado-300'
              }`}
            >
              Imóveis
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.to}
                href={link.to}
                onClick={(e) => handleNavClick(e, link.to)}
                className={`group relative text-sm font-medium tracking-editorial transition-colors duration-300 ${
                  scrolled || !isHome
                    ? 'text-grafite-700 hover:text-grafite-900'
                    : 'text-marfim/80 hover:text-marfim'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px bg-dourado-500 transition-all duration-300 ease-editorial w-0 group-hover:w-full ${
                    scrolled || !isHome ? 'opacity-80' : 'opacity-100'
                  }`}
                />
              </a>
            ))}
          </nav>

          {/* CTA Button (Desktop) */}
          <a
            href="/catalogo"
            onClick={(e) => handleNavClick(e, '/catalogo')}
            className={`hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium tracking-editorial border rounded-sm transition-all duration-300 ease-editorial ${
              scrolled || !isHome
                ? 'border-grafite-900 text-grafite-900 hover:bg-grafite-900 hover:text-marfim'
                : 'border-marfim/40 text-marfim hover:bg-marfim hover:text-grafite-900'
            }`}
          >
            <Search className="w-4 h-4" strokeWidth={1.5} />
            Encontrar meu imóvel
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 transition-colors duration-300 ${
              scrolled || !isHome ? 'text-grafite-900' : 'text-marfim'
            }`}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X className="w-6 h-6" strokeWidth={1.5} />
            ) : (
              <Menu className="w-6 h-6" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden bg-grafite-900 transition-all duration-500 ease-editorial ${
          menuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.to}
              href={link.to}
              onClick={(e) => handleNavClick(e, link.to)}
              className="font-serif text-3xl font-light text-marfim hover:text-dourado-300 transition-colors duration-300"
              style={{
                animation: menuOpen
                  ? `slide-down 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.08}s both`
                  : 'none',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/catalogo"
            onClick={(e) => handleNavClick(e, '/catalogo')}
            className="mt-4 inline-flex items-center gap-2 px-6 py-3 text-sm font-medium tracking-editorial border border-dourado-500 text-dourado-300 rounded-sm hover:bg-dourado-500 hover:text-grafite-900 transition-all duration-300"
            style={{
              animation: menuOpen
                ? `slide-down 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${navLinks.length * 0.08}s both`
                : 'none',
            }}
          >
            <Search className="w-4 h-4" strokeWidth={1.5} />
            Encontrar meu imóvel
          </a>
        </div>
      </div>
    </>
  );
}
