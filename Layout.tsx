import React, { useState } from 'react';
import { Menu, X, Globe, Phone, MapPin, MessageCircle } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate: (sectionId: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Rutas por España', id: 'rutas-espana' },
    { label: 'Rutas por Europa', id: 'rutas-europa' },
    { label: 'Larga Distancia', id: 'larga-distancia' },
  ];

  const handleNavClick = (id: string) => {
    setIsMenuOpen(false);
    onNavigate(id);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-brand-dark">
      {/* Header */}
      <header className="fixed w-full z-50 bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-100">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo Placeholder */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavClick('home')}>
             <div className="h-14 w-56 bg-brand-primary flex items-center justify-center rounded-lg shadow-xl transform hover:scale-105 transition-transform skew-x-[-10deg]">
                <span className="text-white font-impact text-3xl tracking-widest pt-1 skew-x-[10deg]">NEW TRAVEL CLICK</span>
             </div>
          </div>

          {/* Desktop Nav - STRIKING BUTTONS */}
          <nav className="hidden lg:flex items-center space-x-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="group relative px-5 py-2 overflow-hidden rounded-md bg-white border-2 border-brand-primary text-brand-primary shadow-sm hover:shadow-md transition-all duration-300 font-display font-bold text-sm uppercase tracking-wider"
              >
                <span className="absolute inset-0 w-full h-full bg-brand-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                <span className="relative group-hover:text-white transition-colors duration-300 z-10">
                  {link.label}
                </span>
              </button>
            ))}
            
            <button 
              onClick={() => handleNavClick('contact')}
              className="group relative px-5 py-2 overflow-hidden rounded-md bg-white border-2 border-brand-secondary text-brand-secondary shadow-sm hover:shadow-md transition-all duration-300 font-display font-bold text-sm uppercase tracking-wider"
            >
               <span className="absolute inset-0 w-full h-full bg-brand-secondary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
               <span className="relative group-hover:text-white transition-colors duration-300 z-10">
                  Te ayudamos
               </span>
            </button>

            <a 
              href="https://www.newtravelclick.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-brand-accent hover:bg-brand-dark text-white font-bold py-3 px-6 rounded-md transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 font-display tracking-widest text-sm border-2 border-transparent"
            >
              RESERVA TU VIAJE
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-brand-primary p-2 border-2 border-brand-primary rounded"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-4 px-4 shadow-xl absolute w-full z-50">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="text-left bg-gray-50 text-brand-dark font-bold p-4 rounded-lg shadow-sm border border-gray-100 font-display uppercase active:bg-brand-primary active:text-white"
                >
                  {link.label}
                </button>
              ))}
               <button
                  onClick={() => handleNavClick('contact')}
                  className="text-left bg-gray-50 text-brand-dark font-bold p-4 rounded-lg shadow-sm border border-gray-100 font-display uppercase active:bg-brand-secondary active:text-white"
                >
                  Te ayudamos
                </button>
              <a 
                href="https://www.newtravelclick.com/"
                className="bg-brand-accent text-white font-bold py-4 px-4 rounded-lg text-center font-display shadow-lg uppercase tracking-wider"
              >
                RESERVA TU VIAJE
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-24 lg:pt-28">
        {children}
      </main>

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/34633543009"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#128C7E] transition-all transform hover:scale-110 flex items-center justify-center group"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle size={32} fill="white" className="group-hover:animate-pulse" />
        <span className="absolute right-full mr-3 bg-white text-gray-800 px-3 py-1 rounded-lg text-sm font-bold shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
          ¡Escríbenos!
        </span>
      </a>

      {/* Footer */}
      <footer className="bg-brand-dark text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
               <div className="h-12 w-48 bg-white/10 flex items-center justify-center rounded mb-4 skew-x-[-10deg]">
                  <span className="text-white font-impact text-2xl tracking-wide pt-1 skew-x-[10deg]">NEW TRAVEL CLICK</span>
               </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Tu agencia de viajes de confianza. Descubre el mundo con la seguridad y experiencia que mereces.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4 font-display text-brand-secondary">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => handleNavClick('rutas-espana')} className="hover:text-white transition-colors">Rutas por España</button></li>
                <li><button onClick={() => handleNavClick('rutas-europa')} className="hover:text-white transition-colors">Rutas por Europa</button></li>
                <li><button onClick={() => handleNavClick('larga-distancia')} className="hover:text-white transition-colors">Larga Distancia</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 font-display text-brand-secondary">Contacto</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-center"><MapPin size={16} className="mr-2 text-brand-secondary" /> Madrid, España</li>
                <li className="flex items-center"><Phone size={16} className="mr-2 text-brand-secondary" /> +34 910 825 715</li>
                <li className="flex items-center"><Globe size={16} className="mr-2 text-brand-secondary" /> newtravelclick@newtravelclick.com</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 font-display text-brand-secondary">Reserva Ahora</h4>
              <p className="text-gray-400 text-sm mb-4">Encuentra las mejores ofertas en nuestra web principal.</p>
              <a 
                href="https://www.newtravelclick.com/"
                className="inline-block bg-brand-primary hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-colors"
              >
                Ir a New Travel Click
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} New Travel Click. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};