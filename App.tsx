import React, { useState } from 'react';
import { 
  ArrowRight, MapPin, Folder, ArrowLeft, Sparkles, X, Send, 
  Loader2, Globe, Utensils, Lightbulb, Clock, ShieldCheck, Heart, Headphones,
  Menu, Facebook, Instagram, Twitter, Mail, Phone as PhoneIcon
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// --- 1. COMPONENTES INTEGRADOS (Para que no busque carpetas que faltan) ---

const Layout = ({ children, onNavigate }: { children: React.ReactNode, onNavigate: (section: string) => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-md transition-all duration-300">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
             <span className="text-2xl font-black text-blue-600 tracking-tighter">NEW TRAVEL CLICK</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <button onClick={() => onNavigate('rutas-espana')} className="font-bold text-gray-700 hover:text-blue-600 transition-colors uppercase text-sm tracking-widest">España</button>
            <button onClick={() => onNavigate('rutas-europa')} className="font-bold text-gray-700 hover:text-blue-600 transition-colors uppercase text-sm tracking-widest">Europa</button>
            <button onClick={() => onNavigate('larga-distancia')} className="font-bold text-gray-700 hover:text-blue-600 transition-colors uppercase text-sm tracking-widest">Larga Distancia</button>
            <button onClick={() => onNavigate('contact')} className="bg-blue-600 text-white px-5 py-2 rounded-full font-bold hover:bg-blue-800 transition-all shadow-md transform hover:-translate-y-0.5 text-sm">Te Ayudamos</button>
          </div>
          <button className="md:hidden text-gray-800" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl">
            <div className="flex flex-col p-4 space-y-4">
              <button onClick={() => { onNavigate('rutas-espana'); setIsMenuOpen(false); }} className="text-left font-bold text-gray-700 py-2">Rutas España</button>
              <button onClick={() => { onNavigate('rutas-europa'); setIsMenuOpen(false); }} className="text-left font-bold text-gray-700 py-2">Rutas Europa</button>
              <button onClick={() => { onNavigate('larga-distancia'); setIsMenuOpen(false); }} className="text-left font-bold text-gray-700 py-2">Larga Distancia</button>
              <button onClick={() => { onNavigate('contact'); setIsMenuOpen(false); }} className="bg-blue-600 text-white text-center py-3 rounded-lg font-bold">Contactar</button>
            </div>
          </div>
        )}
      </nav>
      <main className="flex-grow pt-16">{children}</main>
      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4 text-center">
           <h3 className="text-3xl font-black mb-6">NEW TRAVEL CLICK</h3>
           <p className="text-gray-400 max-w-md mx-auto mb-8">Viajes diseñados a medida con la seguridad y experiencia que mereces.</p>
           <p className="text-gray-600 text-sm">© 2024 New Travel Click. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

// --- 2. CONTENIDO DEL BLOG (Tus textos) ---
const BLOG_CONTENT: Record<string, string> = {
  '1': `<h1>1. RUTA POR LA COSTA BRAVA</h1><img src="https://images.unsplash.com/photo-1512413914633-b5043f4041ea?auto=format&fit=crop&w=1200&q=80" style="width:100%;border-radius:10px;margin:20px 0;" /><p>Descubre calas secretas y pueblos mágicos. La Costa Brava no es solo un destino, es un estado de ánimo...</p>`,
  '2': `<h1>ESCAPADA A PRAGA Y BUDAPEST</h1><img src="https://images.unsplash.com/photo-1541849546-2165492d06d6?auto=format&fit=crop&w=1200&q=80" style="width:100%;border-radius:10px;margin:20px 0;" /><p>Dos capitales imperiales que te dejarán sin aliento...</p>`,
  // Puedes añadir más aquí copiando el formato
};

const blogData = {
  espana: [
    { id: '1', title: 'Ruta por la Costa Brava: Calas Secretas', url: '#' },
    { id: '4', title: 'Andalucía en Ruta: Sol y Arte', url: '#' },
    { id: '7', title: 'Norte de España: Gastronomía', url: '#' },
  ],
  europa: [
    { id: '2', title: 'Escapada a Praga y Budapest', url: '#' },
    { id: '5', title: 'Fiordos Noruegos', url: '#' },
    { id: '8', title: 'La Toscana', url: '#' },
  ],
  larga: [
    { id: '3', title: 'Japón Milenario', url: '#' },
    { id: '6', title: 'Safari en Kenia', url: '#' },
    { id: '9', title: 'Nueva York', url: '#' },
  ]
};

// --- 3. APP PRINCIPAL ---
function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [activePost, setActivePost] = useState<string | null>(null);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setActivePost(null);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenPost = (id: string) => {
    if (BLOG_CONTENT[id] || id) { // Simple check
      setActivePost(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Si hay un post abierto, mostramos el artículo
  if (activePost) {
    return (
      <Layout onNavigate={scrollToSection}>
        <div className="pt-10 pb-20 bg-[#FFF8F0] min-h-screen">
          <div className="container mx-auto px-4 max-w-4xl">
            <button onClick={() => setActivePost(null)} className="mb-8 flex items-center text-blue-600 font-bold hover:underline">
              <ArrowLeft className="mr-2" /> Volver a la Lista
            </button>
            <article className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100 prose prose-lg max-w-none">
              {BLOG_CONTENT[activePost] ? (
                <div dangerouslySetInnerHTML={{ __html: BLOG_CONTENT[activePost] }} />
              ) : (
                 <div>
                   <h1 className="text-3xl font-bold mb-4">Artículo Completo Próximamente</h1>
                   <p>Contacta con nosotros para recibir el itinerario detallado de este viaje.</p>
                 </div>
              )}
            </article>
          </div>
        </div>
      </Layout>
    );
  }

  // Si no, mostramos la portada (Dashboard)
  return (
    <Layout onNavigate={scrollToSection}>
      {/* Hero Section */}
      <section id="home" className="relative h-[85vh] flex items-center justify-center bg-blue-900 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070" className="w-full h-full object-cover opacity-60" alt="Hero" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl text-white">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-wide drop-shadow-md">DESCUBRE EL MUNDO CON <br/> NEW TRAVEL CLICK</h1>
          <p className="text-xl md:text-2xl font-bold mb-10 max-w-3xl mx-auto drop-shadow-sm">Viajes diseñados para ti con seguridad y experiencia.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <button onClick={() => scrollToSection('contact')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full transition-all shadow-lg transform hover:-translate-y-1 uppercase tracking-wider">VER OFERTAS</button>
             <button onClick={() => setIsAIModalOpen(true)} className="bg-white text-blue-900 font-bold py-4 px-10 rounded-full hover:bg-gray-100 transition-all flex items-center justify-center uppercase tracking-wider"><Sparkles className="mr-2"/> IA PLANNER</button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="rutas-espana" className="py-20 bg-[#FFF8F0]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-4 text-gray-800">Nuestras Colecciones</h2>
          <p className="text-center text-gray-600 mb-12">Selecciona tu próximo destino</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* España */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border-t-8 border-blue-500 hover:scale-[1.02] transition-transform">
              <h3 className="text-2xl font-black mb-6 text-blue-600 flex items-center"><MapPin className="mr-2"/> ESPAÑA</h3>
              <ul className="space-y-4">
                {blogData.espana.map(item => (
                  <li key={item.id} onClick={() => handleOpenPost(item.id)} className="flex items-center p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
                    <span className="font-bold text-gray-700">{item.title}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Europa */}
            <div id="rutas-europa" className="bg-white p-8 rounded-2xl shadow-lg border-t-8 border-cyan-500 hover:scale-[1.02] transition-transform">
              <h3 className="text-2xl font-black mb-6 text-cyan-600 flex items-center"><MapPin className="mr-2"/> EUROPA</h3>
              <ul className="space-y-4">
                {blogData.europa.map(item => (
                  <li key={item.id} onClick={() => handleOpenPost(item.id)} className="flex items-center p-3 bg-cyan-50 rounded-lg cursor-pointer hover:bg-cyan-100 transition-colors">
                    <span className="font-bold text-gray-700">{item.title}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Larga Distancia */}
            <div id="larga-distancia" className="bg-white p-8 rounded-2xl shadow-lg border-t-8 border-orange-500 hover:scale-[1.02] transition-transform">
              <h3 className="text-2xl font-black mb-6 text-orange-600 flex items-center"><MapPin className="mr-2"/> MUNDO</h3>
              <ul className="space-y-4">
                {blogData.larga.map(item => (
                  <li key={item.id} onClick={() => handleOpenPost(item.id)} className="flex items-center p-3 bg-orange-50 rounded-lg cursor-pointer hover:bg-orange-100 transition-colors">
                    <span className="font-bold text-gray-700">{item.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl font-black mb-6">¿Hablamos?</h2>
          <p className="text-xl text-gray-400 mb-10">Déjanos tus datos y diseñaremos tu viaje ideal.</p>
          
          <div className="bg-white text-gray-900 p-8 rounded-2xl shadow-2xl text-left">
            <form onSubmit={(e) => {
              e.preventDefault();
              alert("Gracias por contactar. Te responderemos pronto.");
            }}>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                 <div>
                   <label className="block font-bold mb-2 uppercase text-xs tracking-wider">Nombre</label>
                   <input type="text" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg" placeholder="Tu nombre" />
                 </div>
                 <div>
                   <label className="block font-bold mb-2 uppercase text-xs tracking-wider">Teléfono</label>
                   <input type="tel" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg" placeholder="+34..." />
                 </div>
               </div>
               <div className="mb-6">
                 <label className="block font-bold mb-2 uppercase text-xs tracking-wider">Email</label>
                 <input type="email" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg" placeholder="tu@email.com" />
               </div>
               <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 shadow-lg transition-all text-lg uppercase">ENVIAR SOLICITUD</button>
            </form>
          </div>
        </div>
      </section>

      {/* AI Modal Mock */}
      {isAIModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
           <div className="bg-white w-full max-w-2xl p-8 rounded-2xl text-center relative">
              <button onClick={() => setIsAIModalOpen(false)} className="absolute top-4 right-4"><X /></button>
              <Sparkles className="mx-auto text-blue-600 mb-4" size={48} />
              <h3 className="text-2xl font-bold mb-2">Asistente Virtual IA</h3>
              <p className="text-gray-600 mb-6">Esta función estará disponible muy pronto para ayudarte a planificar tus rutas.</p>
              <button onClick={() => setIsAIModalOpen(false)} className="bg-gray-200 font-bold py-2 px-6 rounded-lg">Entendido</button>
           </div>
        </div>
      )}
    </Layout>
  );
}

export default App;
