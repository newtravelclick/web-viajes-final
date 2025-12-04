import React, { useState, useRef, useEffect } from 'react';
// AJUSTE CLAVE: Buscamos los archivos donde realmente los tienes (en la raíz)
import { Layout } from './Layout';
import { 
  ArrowRight, Calendar, MapPin, User, Mail, Phone as PhoneIcon, FolderOpen, Folder, 
  ArrowLeft, Sparkles, X, Send, Loader2, Globe, Utensils, Lightbulb, Clock, ShieldCheck, Heart, Headphones
} from 'lucide-react';
import { askTravelAssistant } from './geminiService'; // Ajustado a la raíz
import ReactMarkdown from 'react-markdown';

// --- TUS TEXTOS ORIGINALES COMPLETOS ---
const BLOG_CONTENT: Record<string, string> = {
  '1': `
    <h1>1. RUTA POR LA COSTA BRAVA: CALAS SECRETAS Y PUEBLOS DE PESCADORES</h1>
    <img src="https://images.unsplash.com/photo-1512413914633-b5043f4041ea?auto=format&fit=crop&w=1200&q=80" alt="Costa Brava" style="width: 100%; height: 400px; object-fit: cover; border-radius: 12px; margin: 25px 0;">
    <p class="intro" style="font-size: 1.1em; line-height: 1.6; color: #555; margin-bottom: 30px;">La Costa Brava no es solo un destino, es un estado de ánimo. Pinos que tocan el mar, aguas turquesas y una gastronomía que enamora. Aquí tienes tu hoja de ruta para 5 días inolvidables.</p>
    <h2 style="color: #0d6efd; margin-top: 40px;">🗺️ El Itinerario</h2>
    <ul style="list-style: none; padding-left: 0; line-height: 1.8;">
      <li style="margin-bottom: 15px;"><strong>Día 1: Blanes y Lloret.</strong> Aterrizaje suave. Empieza en el Jardín Botánico Marimurtra...</li>
      <li style="margin-bottom: 15px;"><strong>Día 2: Tossa de Mar.</strong> Sube a la Vila Vella...</li>
      <li style="margin-bottom: 15px;"><strong>Día 3: Palafrugell y Llafranc.</strong> Recorre el "Camí de Ronda"...</li>
      <li style="margin-bottom: 15px;"><strong>Día 4: Begur.</strong> Aiguablava, Sa Tuna y Platja Fonda...</li>
      <li style="margin-bottom: 15px;"><strong>Día 5: Cadaqués.</strong> El pueblo de Dalí...</li>
    </ul>
    <div style="text-align: center; margin: 50px 0;">
      <a href="https://www.newtravelclick.com/" target="_blank" style="background-color: #0d6efd; color: #ffffff; padding: 18px 35px; text-decoration: none; font-weight: bold; border-radius: 50px;">✈️ RESERVA TU VIAJE</a>
    </div>
  `,
  '2': `<h1>ESCAPADA IMPERIAL: PRAGA Y BUDAPEST</h1><img src="https://images.unsplash.com/photo-1541849546-2165492d06d6?auto=format&fit=crop&w=1200&q=80" style="width: 100%; height: auto; border-radius: 12px; margin-bottom: 25px;"><p>Dos capitales, un pasado imperial...</p>`,
  '3': `<h1>JAPÓN MILENARIO</h1><img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80" style="width: 100%; height: auto; border-radius: 12px; margin-bottom: 25px;"><p>El futuro convive con el pasado...</p>`,
  '4': `<h1>ANDALUCÍA EN RUTA</h1><img src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=1200&q=80" style="width: 100%; height: 400px; object-fit: cover; border-radius: 12px; margin: 25px 0;"><p>Sol, arte y duende...</p>`,
  '5': `<h1>FIORDOS NORUEGOS</h1><img src="https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?auto=format&fit=crop&w=1200&q=80" style="width: 100%; height: auto; border-radius: 12px; margin-bottom: 25px;"><p>Naturaleza pura...</p>`,
  '6': `<h1>SAFARI KENIA Y TANZANIA</h1><img src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80" style="width: 100%; height: auto; border-radius: 12px; margin-bottom: 25px;"><p>En busca de los cinco grandes...</p>`,
  '7': `<h1>NORTE DE ESPAÑA</h1><img src="https://images.unsplash.com/photo-1598453414998-333e6669865a?auto=format&fit=crop&w=1200&q=80" style="width: 100%; height: 400px; object-fit: cover; border-radius: 12px; margin: 25px 0;"><p>Gastronomía y paisaje...</p>`,
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
  
  // AI Modal State
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<{ text: string; sources: any[] } | null>(null);
  const [aiStatus, setAiStatus] = useState('IDLE');
  const aiInputRef = useRef<HTMLInputElement>(null);

  const scrollToSection = (id: string) => {
    setActivePost(null); 
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setCurrentSection(id);
    }
  };

  const handleOpenPost = (id: string) => {
    if (BLOG_CONTENT[id]) {
      setActivePost(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleClosePost = () => {
    setActivePost(null);
  };

  // --- FUNCIÓN WHATSAPP RECUPERADA ---
  const handleWhatsAppContact = () => {
    const form = document.getElementById('contact-form') as HTMLFormElement;
    let name = "Cliente";
    let message = "Hola, me gustaría más información.";
    
    if(form) {
      const formData = new FormData(form);
      name = (formData.get('name') as string) || "Cliente";
      message = (formData.get('message') as string) || "Hola, me gustaría más información.";
    }
    
    const text = `Hola soy ${name}, escribo desde la web.\n${message}`;
    window.open(`https://wa.me/34633543009?text=${encodeURIComponent(text)}`, '_blank');
  };

  // AI Handler
  const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;

    setAiStatus('LOADING');
    try {
      const result = await askTravelAssistant(aiQuery);
      setAiResponse({ text: result.text || "No response generated.", sources: result.sources || [] });
      setAiStatus('SUCCESS');
    } catch (error) {
      setAiStatus('ERROR');
    }
  };

  // RENDER: ARTÍCULO
  if (activePost && BLOG_CONTENT[activePost]) {
    return (
      <Layout onNavigate={scrollToSection}>
        <div className="pt-28 pb-20 bg-[#FFF8F0] min-h-screen">
          <div className="container mx-auto px-4 max-w-4xl">
            <button 
              onClick={handleClosePost}
              className="mb-8 flex items-center text-[#0071BC] font-bold hover:underline transition-all"
            >
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

  // RENDER: PORTADA
  return (
    <Layout onNavigate={scrollToSection}>
      <section id="home" className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070" className="w-full h-full object-cover"/>
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
            {/* Cards de Rutas */}
            <div className="bg-white border-t-8 border-[#0071BC] rounded-2xl shadow-xl p-8 hover:shadow-2xl hover:scale-[1.01] transition-all">
              <h3 className="text-3xl font-black text-[#333333] mb-6 flex items-center">Rutas España <Folder className="ml-auto text-[#0071BC] opacity-20"/></h3>
              <div className="space-y-4">
                {blogData.espana.map((item) => (
                  <button key={item.id} onClick={() => handleOpenPost(item.id)} className="w-full flex items-center p-4 rounded-lg hover:bg-blue-50 transition-all text-left border-b border-gray-100">
                     <div className="bg-blue-100 p-2 rounded-full mr-3 text-[#0071BC]"><MapPin size={20} /></div>
                     <span className="text-gray-800 font-extrabold text-xl">{item.title}</span>
                  </button>
                ))}
              </div>
            </div>
             <div className="bg-white border-t-8 border-[#29ABE2] rounded-2xl shadow-xl p-8 hover:shadow-2xl hover:scale-[1.01] transition-all">
              <h3 className="text-3xl font-black text-[#333333] mb-6 flex items-center">Rutas Europa <Folder className="ml-auto text-[#29ABE2] opacity-20"/></h3>
              <div className="space-y-4">
                {blogData.europa.map((item) => (
                  <button key={item.id} onClick={() => handleOpenPost(item.id)} className="w-full flex items-center p-4 rounded-lg hover:bg-cyan-50 transition-all text-left border-b border-gray-100">
                     <div className="bg-cyan-100 p-2 rounded-full mr-3 text-[#29ABE2]"><MapPin size={20} /></div>
                     <span className="text-gray-800 font-extrabold text-xl">{item.title}</span>
                  </button>
                ))}
              </div>
            </div>
             <div className="bg-white border-t-8 border-[#0B3D91] rounded-2xl shadow-xl p-8 hover:shadow-2xl hover:scale-[1.01] transition-all">
              <h3 className="text-3xl font-black text-[#333333] mb-6 flex items-center">Larga Distancia <Folder className="ml-auto text-[#0B3D91] opacity-20"/></h3>
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

      {/* Contact Form con WhatsApp */}
      <section id="contact" className="py-20 bg-gray-900 text-white relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-5xl font-black mb-6">¿Hablamos?</h2>
              <p className="text-gray-400 text-lg mb-8">Déjanos tus datos.</p>
            </div>
            <div className="md:w-1/2 w-full">
              <form id="contact-form" onSubmit={(e) => {e.preventDefault(); alert("Enviado")}} className="bg-white text-gray-800 p-8 rounded-2xl shadow-2xl">
                <div className="mb-6"><label className="block font-bold">Nombre</label><input name="name" className="w-full p-3 border rounded-lg" placeholder="Tu nombre" /></div>
                <div className="mb-6"><label className="block font-bold">Mensaje</label><textarea name="message" className="w-full p-3 border rounded-lg" placeholder="Tu mensaje"></textarea></div>
                
                <button type="submit" className="w-full bg-[#0071BC] text-white font-bold py-4 rounded-lg mb-4">ENVIAR EMAIL</button>
                
                {/* BOTÓN WHATSAPP RECUPERADO */}
                <button type="button" onClick={handleWhatsAppContact} className="w-full bg-[#25D366] text-white font-bold py-4 rounded-lg flex items-center justify-center hover:bg-[#128C7E] transition-colors">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 mr-2 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    WHATSAPP DIRECTO
                </button>
              </form>
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
                 {aiStatus === 'IDLE' && <div className="text-center mt-20"><Sparkles className="mx-auto text-[#0071BC] mb-4" size={64}/><h3 className="text-3xl font-bold">Asistente de Viajes IA</h3><p className="text-xl text-gray-500 mt-4">¿A dónde sueñas ir?</p></div>}
                 {aiStatus === 'LOADING' && <div className="flex justify-center mt-20"><Loader2 className="animate-spin text-[#0071BC]" size={64}/></div>}
                 {aiResponse && <div className="prose prose-lg"><ReactMarkdown>{aiResponse.text}</ReactMarkdown></div>}
              </div>
              <div className="p-6 border-t bg-gray-50 rounded-b-3xl">
                 <form onSubmit={handleAskAI} className="flex gap-4">
                    <input value={aiQuery} onChange={e=>setAiQuery(e.target.value)} className="flex-1 p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-[#0071BC]" placeholder="Ej: Plan de 3 días en París..." />
                    <button type="submit" className="bg-[#0071BC] text-white p-4 rounded-xl hover:bg-blue-700"><Send size={24}/></button>
                 </form>
              </div>
           </div>
        </div>
      )}
    </Layout>
  );
}

export default App;
