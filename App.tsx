import React, { useState, useRef, useEffect } from 'react';
import { Layout } from './components/Layout';
import { 
  ArrowRight, Calendar, MapPin, User, Mail, Phone as PhoneIcon, FolderOpen, Folder, 
  ArrowLeft, Sparkles, X, Send, Loader2, Globe, Utensils, Lightbulb, Clock, ShieldCheck, Heart, Headphones
} from 'lucide-react';
import { askTravelAssistant } from './services/geminiService';
import ReactMarkdown from 'react-markdown';

// TUS TEXTOS ORIGINALES
const BLOG_CONTENT: Record<string, string> = {
  '1': `<h1>1. RUTA POR LA COSTA BRAVA: CALAS SECRETAS Y PUEBLOS DE PESCADORES</h1><img src="https://images.unsplash.com/photo-1512413914633-b5043f4041ea?auto=format&fit=crop&w=1200&q=80" style="width: 100%; height: 400px; object-fit: cover; border-radius: 12px; margin: 25px 0;"><p>La Costa Brava no es solo un destino, es un estado de ánimo...</p><h2>🗺️ El Itinerario</h2><ul><li><strong>Día 1: Blanes y Lloret.</strong> Jardín Botánico Marimurtra...</li><li><strong>Día 2: Tossa de Mar.</strong> Vila Vella...</li><li><strong>Día 3: Palafrugell.</strong> Camí de Ronda...</li><li><strong>Día 4: Begur.</strong> Aiguablava...</li><li><strong>Día 5: Cadaqués.</strong> El pueblo de Dalí...</li></ul><p>Reserva tu viaje en New Travel Click.</p>`,
  '2': `<h1>ESCAPADA IMPERIAL: PRAGA Y BUDAPEST</h1><img src="https://images.unsplash.com/photo-1541849546-2165492d06d6?auto=format&fit=crop&w=1200&q=80" style="width: 100%; height: auto; border-radius: 12px; margin-bottom: 25px;"><p>Dos capitales, un pasado imperial...</p><h2>🗺️ El Itinerario</h2><ul><li>Día 1: Praga Ciudad Vieja...</li><li>Día 2: El Castillo...</li><li>Día 3: Tren a Budapest...</li><li>Día 4: Buda y Bastión...</li><li>Día 5: Pest y Termas...</li></ul>`,
  '3': `<h1>JAPÓN MILENARIO</h1><img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80" style="width: 100%; height: auto; border-radius: 12px; margin-bottom: 25px;"><p>Japón es el país donde el futuro convive con el pasado...</p><h2>🗺️ El Itinerario</h2><ul><li>Día 1: Tokio Eléctrico...</li><li>Día 2: Tokio Antiguo...</li><li>Día 3: Kioto...</li><li>Día 4: Bambú y Oro...</li><li>Día 5: Nara y Osaka...</li></ul>`,
  '4': `<h1>ANDALUCÍA EN RUTA</h1><img src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=1200&q=80" style="width: 100%; height: 400px; object-fit: cover; border-radius: 12px; margin: 25px 0;"><p>Un viaje que despierta los sentidos...</p><ul><li>Sevilla, Córdoba, Granada, Málaga...</li></ul>`,
  '5': `<h1>FIORDOS NORUEGOS</h1><img src="https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?auto=format&fit=crop&w=1200&q=80" style="width: 100%; height: auto; border-radius: 12px; margin-bottom: 25px;"><p>Naturaleza pura...</p>`,
  '6': `<h1>SAFARI KENIA Y TANZANIA</h1><img src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80" style="width: 100%; height: auto; border-radius: 12px; margin-bottom: 25px;"><p>En busca de los cinco grandes...</p>`,
  '7': `<h1>NORTE DE ESPAÑA</h1><img src="https://images.unsplash.com/photo-1598453414998-333e6669865a?auto=format&fit=crop&w=1200&q=80" style="width: 100%; height: 400px; object-fit: cover; border-radius: 12px; margin: 25px 0;"><p>Gastronomía y paisaje verde...</p>`,
  '8': `<h1>LA TOSCANA</h1><img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80" style="width: 100%; height: auto; border-radius: 12px; margin-bottom: 25px;"><p>Viñedos y Renacimiento...</p>`,
  '9': `<h1>NUEVA YORK</h1><img src="https://images.unsplash.com/photo-1496442226666-8d4a0e62e6e9?auto=format&fit=crop&w=1200&q=80" style="width: 100%; height: auto; border-radius: 12px; margin-bottom: 25px;"><p>La ciudad que nunca duerme...</p>`
};

const blogData = {
  espana: [
    { id: '1', title: 'Ruta por la Costa Brava: Calas Secretas', url: '#' },
    { id: '4', title: 'Andalucía en Ruta: Sol y Arte', url: '#' },
    { id: '7', title: 'Norte de España: Gastronomía y Paisaje', url: '#' },
  ],
  europa: [
    { id: '2', title: 'Escapada a Praga y Budapest', url: '#' },
    { id: '5', title: 'Fiordos Noruegos: Naturaleza Pura', url: '#' },
    { id: '8', title: 'La Toscana: Viñedos y Renacimiento', url: '#' },
  ],
  larga: [
    { id: '3', title: 'Japón Milenario: Templos y Neones', url: '#' },
    { id: '6', title: 'Safari en Kenia y Tanzania', url: '#' },
    { id: '9', title: 'Nueva York: La Ciudad que Nunca Duerme', url: '#' },
  ]
};

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [activePost, setActivePost] = useState<string | null>(null);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<{ text: string; sources: any[] } | null>(null);
  const [aiStatus, setAiStatus] = useState('IDLE');

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

  const handleClosePost = () => {
    setActivePost(null);
  };

  const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;
    setAiStatus('LOADING');
    try {
      const result = await askTravelAssistant(aiQuery);
      setAiResponse(result);
      setAiStatus('SUCCESS');
    } catch (error) { setAiStatus('ERROR'); }
  };

  if (activePost && BLOG_CONTENT[activePost]) {
    return (
      <Layout onNavigate={scrollToSection}>
        <div className="pt-28 pb-20 bg-[#FFF8F0] min-h-screen">
          <div className="container mx-auto px-4 max-w-4xl">
            <button onClick={handleClosePost} className="mb-8 flex items-center text-[#0071BC] font-bold hover:underline transition-all">
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

  return (
    <Layout onNavigate={scrollToSection}>
      <section id="home" className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-black text-[#15803d] mb-6 tracking-wide leading-none shadow-sm">DESCUBRE EL MUNDO CON <br/> NEW TRAVEL CLICK</h1>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
             <a href="https://www.newtravelclick.com/" target="_blank" className="bg-[#0B3D91] text-white font-bold py-4 px-10 rounded-full shadow-2xl hover:bg-[#333333] transition-all">VER OFERTAS EXCLUSIVAS</a>
             <button onClick={() => setIsAIModalOpen(true)} className="bg-white/40 backdrop-blur-md border border-white/60 text-[#333333] font-bold py-4 px-10 rounded-full shadow-lg hover:bg-white/60 transition-all flex items-center justify-center"><Sparkles className="mr-2" /> Planificar con IA</button>
          </div>
        </div>
      </section>

      <section id="rutas-espana" className="py-24 bg-[#FFF8F0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16"><h2 className="text-5xl font-black text-[#333333] mb-4">Nuestras Colecciones</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {/* España */}
            <div className="bg-white border-t-8 border-[#0071BC] rounded-2xl shadow-xl p-8 hover:shadow-2xl hover:scale-[1.01] transition-all">
              <h3 className="text-3xl font-black text-[#333333] mb-6 flex items-center justify-between">Rutas España <Folder className="text-[#0071BC] opacity-20"/></h3>
              <div className="space-y-4">
                {blogData.espana.map((item) => (
                  <button key={item.id} onClick={() => handleOpenPost(item.id)} className="w-full flex items-center p-4 rounded-lg hover:bg-blue-50 transition-all text-left border-b border-gray-100">
                     <div className="bg-blue-100 p-2 rounded-full mr-3 text-[#0071BC]"><MapPin size={20} /></div>
                     <span className="text-gray-800 font-extrabold text-xl">{item.title}</span>
                  </button>
                ))}
              </div>
            </div>
            {/* Europa */}
            <div id="rutas-europa" className="bg-white border-t-8 border-[#29ABE2] rounded-2xl shadow-xl p-8 hover:shadow-2xl hover:scale-[1.01] transition-all">
              <h3 className="text-3xl font-black text-[#333333] mb-6 flex items-center justify-between">Rutas Europa <Folder className="text-[#29ABE2] opacity-20"/></h3>
              <div className="space-y-4">
                {blogData.europa.map((item) => (
                  <button key={item.id} onClick={() => handleOpenPost(item.id)} className="w-full flex items-center p-4 rounded-lg hover:bg-cyan-50 transition-all text-left border-b border-gray-100">
                     <div className="bg-cyan-100 p-2 rounded-full mr-3 text-[#29ABE2]"><MapPin size={20} /></div>
                     <span className="text-gray-800 font-extrabold text-xl">{item.title}</span>
                  </button>
                ))}
              </div>
            </div>
            {/* Mundo */}
            <div id="larga-distancia" className="bg-white border-t-8 border-[#0B3D91] rounded-2xl shadow-xl p-8 hover:shadow-2xl hover:scale-[1.01] transition-all">
              <h3 className="text-3xl font-black text-[#333333] mb-6 flex items-center justify-between">Larga Distancia <Folder className="text-[#0B3D91] opacity-20"/></h3>
              <div className="space-y-4">
                {blogData.larga.map((item) => (
                  <button key={item.id} onClick={() => handleOpenPost(item.id)} className="w-full flex items-center p-4 rounded-lg hover:bg-orange-50 transition-all text-left border-b border-gray-100">
                     <div className="bg-orange-100 p-2 rounded-full mr-3 text-[#0B3D91]"><MapPin size={20} /></div>
                     <span className="text-gray-800 font-extrabold text-xl">{item.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Modal */}
      {isAIModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
           <div className="bg-white w-full max-w-4xl h-[80vh] rounded-3xl shadow-2xl flex flex-col relative">
              <button onClick={() => setIsAIModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-red-500"><X size={32}/></button>
              <div className="p-8 flex-1 overflow-y-auto">
                 {aiStatus === 'IDLE' && <div className="text-center mt-20"><Sparkles className="mx-auto text-[#0071BC] mb-4" size={64}/><h3 className="text-3xl font-bold">Asistente de Viajes IA</h3><p className="text-xl text-gray-500 mt-4">¿A dónde sueñas ir? Pregúntame.</p></div>}
                 {aiStatus === 'LOADING' && <div className="flex justify-center mt-20"><Loader2 className="animate-spin text-[#0071BC]" size={64}/></div>}
                 {aiResponse && <div className="prose prose-lg"><ReactMarkdown>{aiResponse.text}</ReactMarkdown></div>}
              </div>
              <div className="p-6 border-t bg-gray-50 rounded-b-3xl">
                 <form onSubmit={handleAskAI} className="flex gap-4">
                    <input value={aiQuery} onChange={e=>setAiQuery(e.target.value)} className="flex-1 p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-[#0071BC] outline-none" placeholder="Ej: Plan de 3 días en París..." />
                    <button type="submit" className="bg-[#0071BC] text-white p-4 rounded-xl hover:bg-blue-700 transition-colors"><Send size={24}/></button>
                 </form>
              </div>
           </div>
        </div>
      )}
    </Layout>
  );
}

export default App;
