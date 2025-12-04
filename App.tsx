import React, { useState } from 'react';
import { 
  ArrowRight, MapPin, Folder, ArrowLeft, Sparkles, X, Send, 
  Loader2, Globe, Utensils, Lightbulb, Clock, ShieldCheck, Heart, Headphones,
  Menu, Facebook, Instagram, Twitter, Mail, Phone as PhoneIcon
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// --- 1. LAYOUT INTEGRADO (Para arreglar el error de carpetas) ---
const Layout = ({ children, onNavigate }: { children: React.ReactNode, onNavigate: (section: string) => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-md transition-all duration-300">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
             <span className="text-2xl font-black text-blue-600 tracking-tighter">NEW TRAVEL CLICK</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <button onClick={() => onNavigate('rutas-espana')} className="font-bold text-gray-700 hover:text-blue-600 uppercase text-sm tracking-widest">España</button>
            <button onClick={() => onNavigate('rutas-europa')} className="font-bold text-gray-700 hover:text-blue-600 uppercase text-sm tracking-widest">Europa</button>
            <button onClick={() => onNavigate('larga-distancia')} className="font-bold text-gray-700 hover:text-blue-600 uppercase text-sm tracking-widest">Larga Distancia</button>
            <button onClick={() => onNavigate('contact')} className="bg-blue-600 text-white px-5 py-2 rounded-full font-bold hover:bg-blue-800 transition-all shadow-md transform hover:-translate-y-0.5 text-sm">Te Ayudamos</button>
          </div>
          <button className="md:hidden text-gray-800" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl">
            <div className="flex flex-col p-4 space-y-4">
              <button onClick={() => { onNavigate('rutas-espana'); setIsMenuOpen(false); }} className="text-left font-bold text-gray-700 py-2">Rutas España</button>
              <button onClick={() => { onNavigate('rutas-europa'); setIsMenuOpen(false); }} className="text-left font-bold text-gray-700 py-2">Rutas Europa</button>
              <button onClick={() => { onNavigate('larga-distancia'); setIsMenuOpen(false); }} className="text-left font-bold text-gray-700 py-2">Larga Distancia</button>
            </div>
          </div>
        )}
      </nav>
      <main className="flex-grow pt-16">{children}</main>
      <footer className="bg-gray-900 text-white pt-16 pb-8 text-center">
         <h3 className="text-3xl font-black mb-6">NEW TRAVEL CLICK</h3>
         <p className="text-gray-400 text-sm">© 2024 New Travel Click. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

// --- 2. TUS TEXTOS ORIGINALES (Recuperados) ---
const BLOG_CONTENT: Record<string, string> = {
  '1': `<h1>1. RUTA POR LA COSTA BRAVA: CALAS SECRETAS Y PUEBLOS DE PESCADORES</h1><img src="https://images.unsplash.com/photo-1512413914633-b5043f4041ea?auto=format&fit=crop&w=1200&q=80" style="width: 100%; height: 400px; object-fit: cover; border-radius: 12px; margin: 25px 0;"><p class="intro" style="font-size: 1.1em; line-height: 1.6; color: #555; margin-bottom: 30px;">La Costa Brava no es solo un destino, es un estado de ánimo. Pinos que tocan el mar, aguas turquesas y una gastronomía que enamora. Aquí tienes tu hoja de ruta para 5 días inolvidables.</p><h2 style="color: #0d6efd; margin-top: 40px;">🗺️ El Itinerario</h2><ul style="list-style: none; padding-left: 0; line-height: 1.8;"><li style="margin-bottom: 15px;"><strong>Día 1: Blanes y Lloret.</strong> Aterrizaje suave. Empieza en el Jardín Botánico Marimurtra de Blanes para unas fotos de infarto. Termina el día en Cala Boadella, un oasis entre el turismo.</li><li style="margin-bottom: 15px;"><strong>Día 2: Tossa de Mar.</strong> Sube a la Vila Vella (el único recinto medieval fortificado de la costa catalana) y baja a darte un chapuzón en Cala Pola.</li><li style="margin-bottom: 15px;"><strong>Día 3: Palafrugell y Llafranc.</strong> Recorre el "Camí de Ronda" al amanecer. Es la esencia de la Costa Brava.</li><li style="margin-bottom: 15px;"><strong>Día 4: Begur.</strong> El día de las joyas: Aiguablava, Sa Tuna y Platja Fonda. Aguas cristalinas garantizadas.</li><li style="margin-bottom: 15px;"><strong>Día 5: Cadaqués.</strong> El pueblo de Dalí. Blanco, bohemio y rodeado por la naturaleza salvaje del Cap de Creus.</li></ul>`,
  '2': `<h1>Escapada Imperial: Praga y Budapest</h1><img src="https://images.unsplash.com/photo-1541849546-2165492d06d6?auto=format&fit=crop&w=1200&q=80" style="width: 100%; height: auto; border-radius: 12px; margin-bottom: 25px;"><p>Dos capitales, un pasado imperial y una belleza que corta la respiración...</p><h2>🗺️ El Itinerario</h2><ul><li>Día 1: Praga, la Ciudad Vieja.</li><li>Día 2: El Castillo y Malá Strana.</li><li>Día 3: Rumbo a Budapest.</li><li>Día 4: Buda, la histórica.</li><li>Día 5: Pest y Relax Termal.</li></ul>`,
  '3': `<h1>Japón Milenario: Un Viaje entre Templos y Neones</h1><img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80" style="width: 100%; height: auto; border-radius: 12px; margin-bottom: 25px;"><p>Japón es el país donde el futuro convive con el pasado...</p><h2>🗺️ El Itinerario</h2><ul><li>Día 1: Tokio Eléctrico.</li><li>Día 2: El Tokio Antiguo.</li><li>Día 3: Kioto y las mil puertas.</li><li>Día 4: Bambú y Oro.</li><li>Día 5: Nara y Osaka.</li></ul>`,
  '4': `<h1>ANDALUCÍA EN RUTA: SOL, ARTE Y DUENDE</h1><img src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=1200&q=80" style="width: 100%; height: 400px; object-fit: cover; border-radius: 12px; margin: 25px 0;"><p>Un viaje que despierta los sentidos...</p>`,
  '5': `<h1>Fiordos Noruegos: Donde la Naturaleza Reina</h1><img src="https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?auto=format&fit=crop&w=1200&q=80" style="width: 100%; height: auto; border-radius: 12px; margin-bottom: 25px;"><p>Cascadas que caen al mar, trenes que desafían la gravedad...</p>`,
  '6': `<h1>Safari Kenia y Tanzania: En Busca de los Cinco Grandes</h1><img src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80" style="width: 100%; height: auto; border-radius: 12px; margin-bottom: 25px;"><p>No es un zoológico, es la vida real en su estado más puro...</p>`,
  '7': `<h1>NORTE DE ESPAÑA: GASTRONOMÍA Y PAISAJE VERDE</h1><img src="https://images.unsplash.com/photo-1598453414998-333e6669865a?auto=format&fit=crop&w=1200&q=80" style="width: 100%; height: 400px; object-fit: cover; border-radius: 12px; margin: 25px 0;"><p>Si te gusta comer bien y los paisajes que parecen Suiza pero con mar...</p>`,
  '8': `<h1>La Toscana: Ruta entre Viñedos y Renacimiento</h1><img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80" style="width: 100%; height: auto; border-radius: 12px; margin-bottom: 25px;"><p>La "Dolce Vita" existe y está en la Toscana...</p>`,
  '9': `<h1>Nueva York: Guía de la Ciudad que Nunca Duerme</h1><img src="https://images.unsplash.com/photo-1496442226666-8d4a0e62e6e9?auto=format&fit=crop&w=1200&q=80" style="width: 100%; height: auto; border-radius: 12px; margin-bottom: 25px;"><p>Es el escenario de mil películas y el centro del mundo moderno...</p>`
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

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [activePost, setActivePost] = useState<string | null>(null);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setActivePost(null);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setCurrentSection(id);
    }
  };

  const handleOpenPost = (id: string) => {
    setActivePost(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // VISTA ARTÍCULO COMPLETO
  if (activePost && BLOG_CONTENT[activePost]) {
    return (
      <Layout onNavigate={scrollToSection}>
        <div className="pt-28 pb-20 bg-[#FFF8F0] min-h-screen">
          <div className="container mx-auto px-4 max-w-4xl">
            <button onClick={() => setActivePost(null)} className="mb-8 flex items-center text-blue-600 font-bold hover:underline">
              <ArrowLeft className="mr-2" /> Volver a la Lista
            </button>
            <article className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100 prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: BLOG_CONTENT[activePost] }} />
            </article>
          </div>
        </div>
      </Layout>
    );
  }

  // PORTADA
  return (
    <Layout onNavigate={scrollToSection}>
      <section id="home" className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070" className="w-full h-full object-cover" alt="Hero" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-black text-[#15803d] mb-6 tracking-wide leading-none shadow-sm drop-shadow-md">DESCUBRE EL MUNDO CON <br/> NEW TRAVEL CLICK</h1>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
             <button onClick={() => scrollToSection('contact')} className="bg-[#0B3D91] text-white font-bold py-4 px-10 rounded-full shadow-2xl hover:bg-[#333333] transition-all">VER OFERTAS EXCLUSIVAS</button>
             <button onClick={() => setIsAIModalOpen(true)} className="bg-white/40 backdrop-blur-md border border-white/60 text-[#333333] font-bold py-4 px-10 rounded-full shadow-lg hover:bg-white/60 transition-all flex items-center justify-center"><Sparkles className="mr-2" /> Planificar con IA</button>
          </div>
        </div>
      </section>

      <section id="rutas-espana" className="py-24 bg-[#FFF8F0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16"><h2 className="text-5xl font-black text-[#333333] mb-4">Nuestras Colecciones</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
            <div className="bg-white border-t-8 border-[#0071BC] rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all">
              <h3 className="text-2xl font-black text-[#333333] mb-6 flex items-center">Rutas España <MapPin className="ml-2 text-[#0071BC]"/></h3>
              <div className="space-y-4">
                {blogData.espana.map(item => (
                  <button key={item.id} onClick={() => handleOpenPost(item.id)} className="w-full flex items-center p-4 rounded-lg hover:bg-blue-50 transition-all text-left border-b border-gray-100"><span className="text-gray-800 font-extrabold text-lg">{item.title}</span></button>
                ))}
              </div>
            </div>
            <div className="bg-white border-t-8 border-[#29ABE2] rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all">
              <h3 className="text-2xl font-black text-[#333333] mb-6 flex items-center">Rutas Europa <MapPin className="ml-2 text-[#29ABE2]"/></h3>
              <div className="space-y-4">
                {blogData.europa.map(item => (
                  <button key={item.id} onClick={() => handleOpenPost(item.id)} className="w-full flex items-center p-4 rounded-lg hover:bg-cyan-50 transition-all text-left border-b border-gray-100"><span className="text-gray-800 font-extrabold text-lg">{item.title}</span></button>
                ))}
              </div>
            </div>
            <div className="bg-white border-t-8 border-[#0B3D91] rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all">
              <h3 className="text-2xl font-black text-[#333333] mb-6 flex items-center">Larga Distancia <MapPin className="ml-2 text-[#0B3D91]"/></h3>
              <div className="space-y-4">
                {blogData.larga.map(item => (
                  <button key={item.id} onClick={() => handleOpenPost(item.id)} className="w-full flex items-center p-4 rounded-lg hover:bg-orange-50 transition-all text-left border-b border-gray-100"><span className="text-gray-800 font-extrabold text-lg">{item.title}</span></button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-gray-900 text-white text-center">
        <h2 className="text-4xl font-black mb-6">¿Hablamos?</h2>
        <p className="mb-8">Déjanos tus datos y diseñaremos tu viaje ideal.</p>
        <div className="max-w-2xl mx-auto bg-white text-gray-900 p-8 rounded-2xl text-left">
           <form onSubmit={(e) => { e.preventDefault(); alert("Mensaje enviado. Contactaremos contigo pronto."); }}>
             <label className="block font-bold mb-2">Email</label>
             <input type="email" className="w-full p-3 border rounded-lg mb-4" placeholder="tu@email.com" />
             <button className="w-full bg-[#0071BC] text-white font-bold py-3 rounded-lg hover:bg-blue-800">ENVIAR</button>
           </form>
        </div>
      </section>

      {isAIModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80">
           <div className="bg-white w-full max-w-2xl p-8 rounded-2xl relative text-center">
              <button onClick={() => setIsAIModalOpen(false)} className="absolute top-4 right-4"><X /></button>
              <Sparkles className="mx-auto text-blue-600 mb-4" size={48}/>
              <h3 className="text-2xl font-bold">Asistente Virtual</h3>
              <p className="text-gray-600 mb-6">Esta función estará disponible próximamente en tu dominio oficial.</p>
              <button onClick={() => setIsAIModalOpen(false)} className="bg-gray-200 py-2 px-6 rounded-lg font-bold">Cerrar</button>
           </div>
        </div>
      )}
    </Layout>
  );
}

export default App;
