import React, { useState } from 'react';
import { 
  ArrowRight, MapPin, Folder, ArrowLeft, Sparkles, X, Send, 
  Loader2, Globe, Utensils, Lightbulb, Clock, ShieldCheck, Heart, Headphones,
  Menu, Mail, Phone as PhoneIcon
} from 'lucide-react';
import { askTravelAssistant } from './geminiService';
import ReactMarkdown from 'react-markdown';

// --- 1. CONTENIDO COMPLETO Y DETALLADO (RECONSTRUIDO) ---
const BLOG_CONTENT: Record<string, string> = {
  '1': `
    <h1 style="color:#0071BC;font-size:2.2rem;">1. RUTA POR LA COSTA BRAVA: CALAS SECRETAS</h1>
    <img src="https://images.unsplash.com/photo-1512413914633-b5043f4041ea?auto=format&fit=crop&w=1200&q=80" style="width:100%;height:400px;object-fit:cover;border-radius:12px;margin:20px 0;">
    <p class="intro" style="font-size:1.1rem;line-height:1.6;color:#444;">La Costa Brava no es solo un destino, es un estado de ánimo. Pinos que tocan el mar, aguas turquesas y una gastronomía que enamora. Aquí tienes tu hoja de ruta para 5 días inolvidables.</p>
    
    <h2 style="color:#0071BC;margin-top:30px;">🗺️ El Itinerario</h2>
    <ul style="list-style:none;padding:0;line-height:1.8;">
      <li style="margin-bottom:10px;"><strong>Día 1: Blanes y Lloret.</strong> Empieza en el Jardín Botánico Marimurtra para unas fotos de infarto. Termina en Cala Boadella.</li>
      <li style="margin-bottom:10px;"><strong>Día 2: Tossa de Mar.</strong> Sube a la Vila Vella (recinto medieval) y báñate en Cala Pola.</li>
      <li style="margin-bottom:10px;"><strong>Día 3: Palafrugell.</strong> Recorre el "Camí de Ronda" al amanecer. Es la esencia de la Costa Brava.</li>
      <li style="margin-bottom:10px;"><strong>Día 4: Begur.</strong> El día de las joyas: Aiguablava, Sa Tuna y Platja Fonda.</li>
      <li style="margin-bottom:10px;"><strong>Día 5: Cadaqués.</strong> El pueblo de Dalí. Blanco, bohemio y rodeado de naturaleza.</li>
    </ul>

    <h2 style="color:#0071BC;margin-top:30px;">🎒 Qué hacer (Imprescindibles)</h2>
    <ul style="line-height:1.8;">
      <li><strong>Caminar por los Caminos de Ronda:</strong> Senderos que bordean el mar conectando playas.</li>
      <li><strong>Casa-Museo Salvador Dalí:</strong> En Portlligat. Imprescindible reservar.</li>
      <li><strong>Snorkel en Islas Medas:</strong> Una reserva marina espectacular en L'Estartit.</li>
    </ul>

    <div style="background-color:#E3F2FD;border-left:5px solid #0071BC;padding:20px;margin:30px 0;border-radius:8px;">
      <p style="color:#0071BC;font-weight:bold;margin:0;">💡 TIP NEW TRAVEL CLICK</p>
      <p style="margin-top:10px;">En verano, los parkings de las calas famosas se llenan a las 9:00 AM. ¡Madruga o ve en barco!</p>
    </div>
  `,
  '2': `
    <h1 style="color:#0071BC;font-size:2.2rem;">ESCAPADA IMPERIAL: PRAGA Y BUDAPEST</h1>
    <img src="https://images.unsplash.com/photo-1541849546-2165492d06d6?auto=format&fit=crop&w=1200&q=80" style="width:100%;height:400px;object-fit:cover;border-radius:12px;margin:20px 0;">
    <p class="intro" style="font-size:1.1rem;line-height:1.6;color:#444;">Dos capitales, un pasado imperial y una belleza que corta la respiración. Este viaje conecta el romanticismo gótico de Praga con la majestuosidad de Budapest.</p>
    
    <h2 style="color:#0071BC;margin-top:30px;">🗺️ El Itinerario</h2>
    <ul style="list-style:none;padding:0;line-height:1.8;">
      <li style="margin-bottom:10px;"><strong>Día 1: Praga Ciudad Vieja.</strong> Reloj Astronómico y Puente de Carlos al atardecer.</li>
      <li style="margin-bottom:10px;"><strong>Día 2: El Castillo.</strong> Sube al Castillo de Praga y baja por el barrio de Malá Strana.</li>
      <li style="margin-bottom:10px;"><strong>Día 3: Tren a Budapest.</strong> Viaje panorámico. Noche de crucero por el Danubio.</li>
      <li style="margin-bottom:10px;"><strong>Día 4: Buda.</strong> Bastión de los Pescadores y la Iglesia de Matías.</li>
      <li style="margin-bottom:10px;"><strong>Día 5: Pest y Termas.</strong> Visita el Parlamento y relájate en los Baños Széchenyi.</li>
    </ul>

    <h2 style="color:#0071BC;margin-top:30px;">🍽️ Dónde comer</h2>
    <p>Prueba el <em>Goulash</em> en Hungría y el <em>Trdelník</em> (dulce de chimenea) en las calles de Praga.</p>

    <div style="background-color:#E3F2FD;border-left:5px solid #0071BC;padding:20px;margin:30px 0;border-radius:8px;">
      <p style="color:#0071BC;font-weight:bold;margin:0;">💡 TIP NEW TRAVEL CLICK</p>
      <p style="margin-top:10px;">Ojo con la moneda: Coronas Checas y Florines Húngaros. Saca dinero en cajeros oficiales, no cambies en la calle.</p>
    </div>
  `,
  '3': `
    <h1 style="color:#0071BC;font-size:2.2rem;">JAPÓN MILENARIO: TEMPLOS Y NEONES</h1>
    <img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80" style="width:100%;height:400px;object-fit:cover;border-radius:12px;margin:20px 0;">
    <p class="intro" style="font-size:1.1rem;line-height:1.6;color:#444;">Japón es donde el futuro convive con el pasado. En un mismo día viajas en tren bala y meditas en un jardín zen.</p>
    
    <h2 style="color:#0071BC;margin-top:30px;">🗺️ El Itinerario</h2>
    <ul style="list-style:none;padding:0;line-height:1.8;">
      <li style="margin-bottom:10px;"><strong>Día 1: Tokio Eléctrico.</strong> Shibuya, el cruce más famoso, y las luces de Shinjuku.</li>
      <li style="margin-bottom:10px;"><strong>Día 2: Tokio Tradicional.</strong> Templo Senso-ji en Asakusa y parque Ueno.</li>
      <li style="margin-bottom:10px;"><strong>Día 3: Kioto.</strong> Fushimi Inari (los mil toriis rojos) y barrio de Gion.</li>
      <li style="margin-bottom:10px;"><strong>Día 4: Naturaleza.</strong> Bosque de Bambú de Arashiyama y Pabellón Dorado.</li>
      <li style="margin-bottom:10px;"><strong>Día 5: Osaka.</strong> Castillo de Osaka y comida callejera en Dotonbori.</li>
    </ul>

    <h2 style="color:#0071BC;margin-top:30px;">🚫 No te pierdas</h2>
    <p>Dormir al menos una noche en un <em>Ryokan</em> (hotel tradicional) con suelo de tatami y aguas termales.</p>

    <div style="background-color:#E3F2FD;border-left:5px solid #0071BC;padding:20px;margin:30px 0;border-radius:8px;">
      <p style="color:#0071BC;font-weight:bold;margin:0;">💡 TIP NEW TRAVEL CLICK</p>
      <p style="margin-top:10px;">Compra el JR Pass antes de ir si vas a moverte en tren bala. ¡Allí es mucho más caro!</p>
    </div>
  `,
  '4': `
    <h1 style="color:#0071BC;font-size:2.2rem;">ANDALUCÍA EN RUTA: SOL Y ARTE</h1>
    <img src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=1200&q=80" style="width:100%;height:400px;object-fit:cover;border-radius:12px;margin:20px 0;">
    <p class="intro" style="font-size:1.1rem;line-height:1.6;color:#444;">Un viaje que despierta los sentidos. Desde la Alhambra hasta el olor a azahar de Sevilla.</p>
    
    <h2 style="color:#0071BC;margin-top:30px;">🗺️ El Itinerario</h2>
    <ul style="list-style:none;padding:0;line-height:1.8;">
      <li style="margin-bottom:10px;"><strong>Día 1: Sevilla.</strong> Catedral, Giralda y Real Alcázar.</li>
      <li style="margin-bottom:10px;"><strong>Día 2: Sevilla.</strong> Plaza de España y barrio de Triana.</li>
      <li style="margin-bottom:10px;"><strong>Día 3: Córdoba.</strong> La Mezquita-Catedral y sus patios llenos de flores.</li>
      <li style="margin-bottom:10px;"><strong>Día 4: Granada.</strong> La Alhambra (reserva meses antes) y el Albaicín.</li>
      <li style="margin-bottom:10px;"><strong>Día 5: Málaga.</strong> Museo Picasso y espetos en la playa.</li>
    </ul>

    <div style="background-color:#E3F2FD;border-left:5px solid #0071BC;padding:20px;margin:30px 0;border-radius:8px;">
      <p style="color:#0071BC;font-weight:bold;margin:0;">💡 TIP NEW TRAVEL CLICK</p>
      <p style="margin-top:10px;">En verano evita las horas centrales del día. ¡La siesta es sagrada por el calor!</p>
    </div>
  `,
  '5': `
    <h1 style="color:#0071BC;font-size:2.2rem;">FIORDOS NORUEGOS: NATURALEZA PURA</h1>
    <img src="https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?auto=format&fit=crop&w=1200&q=80" style="width:100%;height:400px;object-fit:cover;border-radius:12px;margin:20px 0;">
    <p class="intro" style="font-size:1.1rem;line-height:1.6;color:#444;">Cascadas que caen al mar, trenes que desafían la gravedad y un silencio que cura.</p>
    
    <h2 style="color:#0071BC;margin-top:30px;">🗺️ El Itinerario</h2>
    <ul style="list-style:none;padding:0;line-height:1.8;">
      <li style="margin-bottom:10px;"><strong>Día 1: Bergen.</strong> Muelle Hanseático de Bryggen y mercado de pescado.</li>
      <li style="margin-bottom:10px;"><strong>Día 2: Tren de Flåm.</strong> Uno de los trayectos en tren más bonitos del mundo.</li>
      <li style="margin-bottom:10px;"><strong>Día 3: El Fiordo.</strong> Crucero por el Naeroyfjord (Patrimonio de la Humanidad).</li>
      <li style="margin-bottom:10px;"><strong>Día 4: Mirador Stegastein.</strong> Vistas de vértigo sobre el fiordo.</li>
      <li style="margin-bottom:10px;"><strong>Día 5: Stavanger.</strong> Subida al Púlpito (Preikestolen) si te atreves.</li>
    </ul>

    <div style="background-color:#E3F2FD;border-left:5px solid #0071BC;padding:20px;margin:30px 0;border-radius:8px;">
      <p style="color:#0071BC;font-weight:bold;margin:0;">💡 TIP NEW TRAVEL CLICK</p>
      <p style="margin-top:10px;">Lleva ropa por capas ("cebolla"). El clima cambia en 5 minutos.</p>
    </div>
  `,
  '6': `
    <h1 style="color:#0071BC;font-size:2.2rem;">SAFARI KENIA Y TANZANIA</h1>
    <img src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80" style="width:100%;height:400px;object-fit:cover;border-radius:12px;margin:20px 0;">
    <p class="intro" style="font-size:1.1rem;line-height:1.6;color:#444;">No es un zoo, es la vida real. La sabana infinita y los "Cinco Grandes" te esperan.</p>
    
    <h2 style="color:#0071BC;margin-top:30px;">🗺️ El Itinerario</h2>
    <ul style="list-style:none;padding:0;line-height:1.8;">
      <li style="margin-bottom:10px;"><strong>Día 1: Nairobi.</strong> Orfanato de elefantes y centro de jirafas.</li>
      <li style="margin-bottom:10px;"><strong>Día 2: Masai Mara.</strong> Safari en 4x4 buscando leones y guepardos.</li>
      <li style="margin-bottom:10px;"><strong>Día 3: El cruce.</strong> Si es época, ver la Gran Migración cruzando el río.</li>
      <li style="margin-bottom:10px;"><strong>Día 4: Serengeti (Tanzania).</strong> Llanuras infinitas llenas de vida.</li>
      <li style="margin-bottom:10px;"><strong>Día 5: Ngorongoro.</strong> Un volcán con un ecosistema único dentro.</li>
    </ul>

    <div style="background-color:#E3F2FD;border-left:5px solid #0071BC;padding:20px;margin:30px 0;border-radius:8px;">
      <p style="color:#0071BC;font-weight:bold;margin:0;">💡 TIP NEW TRAVEL CLICK</p>
      <p style="margin-top:10px;">Lleva prismáticos buenos. La diferencia entre ver una mancha y un leopardo es la óptica.</p>
    </div>
  `,
  '7': `
    <h1 style="color:#0071BC;font-size:2.2rem;">NORTE DE ESPAÑA: GASTRONOMÍA</h1>
    <img src="https://images.unsplash.com/photo-1598453414998-333e6669865a?auto=format&fit=crop&w=1200&q=80" style="width:100%;height:400px;object-fit:cover;border-radius:12px;margin:20px 0;">
    <p class="intro" style="font-size:1.1rem;line-height:1.6;color:#444;">Paisajes verdes que parecen Suiza pero con mar, y la mejor comida del mundo.</p>
    
    <h2 style="color:#0071BC;margin-top:30px;">🗺️ El Itinerario</h2>
    <ul style="list-style:none;padding:0;line-height:1.8;">
      <li style="margin-bottom:10px;"><strong>Día 1: San Sebastián.</strong> Playa de la Concha y ruta de Pintxos.</li>
      <li style="margin-bottom:10px;"><strong>Día 2: Costa Vasca.</strong> Zarautz y Getaria (tierra del Txakoli).</li>
      <li style="margin-bottom:10px;"><strong>Día 3: Bilbao.</strong> Museo Guggenheim y casco viejo.</li>
      <li style="margin-bottom:10px;"><strong>Día 4: Cantabria.</strong> Castro Urdiales y Santoña (anchoas).</li>
      <li style="margin-bottom:10px;"><strong>Día 5: Santander.</strong> Palacio de la Magdalena y playa del Sardinero.</li>
    </ul>

    <div style="background-color:#E3F2FD;border-left:5px solid #0071BC;padding:20px;margin:30px 0;border-radius:8px;">
      <p style="color:#0071BC;font-weight:bold;margin:0;">💡 TIP NEW TRAVEL CLICK</p>
      <p style="margin-top:10px;">Prueba la tarta de queso en San Sebastián y las rabas en Santander.</p>
    </div>
  `,
  '8': `
    <h1 style="color:#0071BC;font-size:2.2rem;">LA TOSCANA: VIÑEDOS Y ARTE</h1>
    <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80" style="width:100%;height:400px;object-fit:cover;border-radius:12px;margin:20px 0;">
    <p class="intro" style="font-size:1.1rem;line-height:1.6;color:#444;">La Dolce Vita. Carreteras de cipreses, colinas doradas y vino Chianti.</p>
    
    <h2 style="color:#0071BC;margin-top:30px;">🗺️ El Itinerario</h2>
    <ul style="list-style:none;padding:0;line-height:1.8;">
      <li style="margin-bottom:10px;"><strong>Día 1: Florencia.</strong> El Duomo, Ponte Vecchio y el David de Miguel Ángel.</li>
      <li style="margin-bottom:10px;"><strong>Día 2: Chianti.</strong> Ruta en coche por pueblos vinícolas como Greve.</li>
      <li style="margin-bottom:10px;"><strong>Día 3: Siena.</strong> La plaza del Campo (forma de abanico).</li>
      <li style="margin-bottom:10px;"><strong>Día 4: San Gimignano.</strong> El pueblo de las torres medievales.</li>
      <li style="margin-bottom:10px;"><strong>Día 5: Val d'Orcia.</strong> Los paisajes de postal más famosos.</li>
    </ul>

    <div style="background-color:#E3F2FD;border-left:5px solid #0071BC;padding:20px;margin:30px 0;border-radius:8px;">
      <p style="color:#0071BC;font-weight:bold;margin:0;">💡 TIP NEW TRAVEL CLICK</p>
      <p style="margin-top:10px;">Cuidado con las zonas ZTL (tráfico limitado) al conducir, ¡las multas son caras!</p>
    </div>
  `,
  '9': `
    <h1 style="color:#0071BC;font-size:2.2rem;">NUEVA YORK: LA CIUDAD QUE NUNCA DUERME</h1>
    <img src="https://images.unsplash.com/photo-1496442226666-8d4a0e62e6e9?auto=format&fit=crop&w=1200&q=80" style="width:100%;height:400px;object-fit:cover;border-radius:12px;margin:20px 0;">
    <p class="intro" style="font-size:1.1rem;line-height:1.6;color:#444;">El escenario de mil películas. Rascacielos, taxis amarillos y energía pura.</p>
    
    <h2 style="color:#0071BC;margin-top:30px;">🗺️ El Itinerario</h2>
    <ul style="list-style:none;padding:0;line-height:1.8;">
      <li style="margin-bottom:10px;"><strong>Día 1: Midtown.</strong> Times Square, Top of the Rock y Central Park.</li>
      <li style="margin-bottom:10px;"><strong>Día 2: Libertad.</strong> Estatua de la Libertad y Wall Street (toro de bronce).</li>
      <li style="margin-bottom:10px;"><strong>Día 3: Brooklyn.</strong> Cruza el puente andando y hazte fotos en DUMBO.</li>
      <li style="margin-bottom:10px;"><strong>Día 4: Museos y High Line.</strong> El MET o MoMA y paseo por las vías elevadas.</li>
      <li style="margin-bottom:10px;"><strong>Día 5: Compras.</strong> 5ª Avenida y SoHo.</li>
    </ul>

    <div style="background-color:#E3F2FD;border-left:5px solid #0071BC;padding:20px;margin:30px 0;border-radius:8px;">
      <p style="color:#0071BC;font-weight:bold;margin:0;">💡 TIP NEW TRAVEL CLICK</p>
      <p style="margin-top:10px;">Saca el visado ESTA con tiempo. Y recuerda: la propina (20%) es obligatoria.</p>
    </div>
  `
};

const blogData = {
  espana: [
    { id: '1', title: 'Ruta por la Costa Brava: Calas Secretas' },
    { id: '4', title: 'Andalucía en Ruta: Sol y Arte' },
    { id: '7', title: 'Norte de España: Gastronomía' },
  ],
  europa: [
    { id: '2', title: 'Escapada a Praga y Budapest' },
    { id: '5', title: 'Fiordos Noruegos: Naturaleza Pura' },
    { id: '8', title: 'La Toscana: Viñedos y Renacimiento' },
  ],
  larga: [
    { id: '3', title: 'Japón Milenario: Templos y Neones' },
    { id: '6', title: 'Safari en Kenia y Tanzania' },
    { id: '9', title: 'Nueva York: La Ciudad que Nunca Duerme' },
  ]
};

// --- COMPONENTE LAYOUT ---
const Layout = ({ children, onNavigate }: { children: React.ReactNode, onNavigate: (section: string) => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-md transition-all duration-300">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
             <span className="text-2xl font-black text-[#0071BC] tracking-tighter">NEW TRAVEL CLICK</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <button onClick={() => onNavigate('rutas-espana')} className="font-bold text-gray-700 hover:text-[#0071BC] transition-colors uppercase text-sm tracking-widest">España</button>
            <button onClick={() => onNavigate('rutas-europa')} className="font-bold text-gray-700 hover:text-[#0071BC] transition-colors uppercase text-sm tracking-widest">Europa</button>
            <button onClick={() => onNavigate('larga-distancia')} className="font-bold text-gray-700 hover:text-[#0071BC] transition-colors uppercase text-sm tracking-widest">Larga Distancia</button>
            <button onClick={() => onNavigate('contact')} className="bg-[#0071BC] text-white px-5 py-2 rounded-full font-bold hover:bg-[#0B3D91] transition-all shadow-md transform hover:-translate-y-0.5 text-sm">Te Ayudamos</button>
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
              <button onClick={() => { onNavigate('contact'); setIsMenuOpen(false); }} className="bg-[#0071BC] text-white text-center py-3 rounded-lg font-bold">Contactar</button>
            </div>
          </div>
        )}
      </nav>
      <main className="flex-grow">{children}</main>
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4 text-center">
           <h3 className="text-3xl font-black mb-6">NEW TRAVEL CLICK</h3>
           <p className="text-gray-400 text-sm">© 2024 New Travel Click. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
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
    setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setCurrentSection(id);
        }
    }, 100);
  };

  const handleOpenPost = (id: string) => {
    if (BLOG_CONTENT[id]) {
      setActivePost(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Aviso de que se va a abrir el correo
    alert("Se abrirá tu gestor de correo para enviar el mensaje a newtravelclick@newtravelclick.com");
    
    window.location.href = `mailto:newtravelclick@newtravelclick.com?subject=Consulta Web de ${name}&body=${encodeURIComponent("Hola, soy " + name + " (" + email + ").\n\n" + message)}`;
  };

  const handleWhatsAppContact = () => {
    window.open(`https://wa.me/34633543009?text=${encodeURIComponent("Hola New Travel Click, me gustaría información sobre un viaje.")}`, '_blank');
  };

  const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;
    setAiStatus('LOADING');
    try {
      const result = await askTravelAssistant(aiQuery);
      setAiResponse({ text: result.text || "No response", sources: result.sources || [] });
      setAiStatus('SUCCESS');
    } catch (error) { setAiStatus('ERROR'); }
  };

  // VISTA ARTÍCULO
  if (activePost && BLOG_CONTENT[activePost]) {
    return (
      <Layout onNavigate={scrollToSection}>
        <div className="pt-28 pb-20 bg-[#FFF8F0] min-h-screen">
          <div className="container mx-auto px-4 max-w-4xl">
            <button onClick={() => setActivePost(null)} className="mb-8 flex items-center text-[#0071BC] font-bold hover:underline">
              <ArrowLeft className="mr-2" /> Volver a la Lista
            </button>
            <article className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100 prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: BLOG_CONTENT[activePost] }} />
              <div className="mt-10 text-center">
                 <button onClick={() => scrollToSection('contact')} className="bg-[#0071BC] text-white py-4 px-8 rounded-full font-bold shadow-lg hover:bg-[#0B3D91] transition-all">SOLICITAR PRESUPUESTO PARA ESTE VIAJE</button>
              </div>
            </article>
          </div>
        </div>
      </Layout>
    );
  }

  // VISTA PORTADA
  return (
    <Layout onNavigate={scrollToSection}>
      <section id="home" className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0"><img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070" className="w-full h-full object-cover"/></div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-black text-[#15803d] mb-6 shadow-sm" style={{textShadow: '2px 2px 4px rgba(255,255,255,0.8)'}}>DESCUBRE EL MUNDO CON <br/> NEW TRAVEL CLICK</h1>
          <div className="flex justify-center gap-6">
             <button onClick={() => scrollToSection('contact')} className="bg-[#0B3D91] text-white font-bold py-4 px-10 rounded-full shadow-2xl hover:scale-105 transition-all">VER OFERTAS</button>
             <button onClick={() => setIsAIModalOpen(true)} className="bg-white/80 text-[#333] font-bold py-4 px-10 rounded-full shadow-lg hover:bg-white transition-all flex items-center"><Sparkles className="mr-2"/> IA PLANNER</button>
          </div>
        </div>
      </section>

      <section id="rutas-espana" className="py-24 bg-[#FFF8F0]">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-black text-center text-[#333] mb-16">Nuestras Colecciones</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* GRUPOS */}
            <div className="bg-white border-t-8 border-[#0071BC] rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-black text-[#333] mb-6">🇪🇸 España</h3>
              <div className="space-y-4">{blogData.espana.map(item => <button key={item.id} onClick={() => handleOpenPost(item.id)} className="w-full text-left p-3 hover:bg-blue-50 rounded-lg font-bold text-gray-700">{item.title}</button>)}</div>
            </div>
            <div className="bg-white border-t-8 border-[#29ABE2] rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-black text-[#333] mb-6">🇪🇺 Europa</h3>
              <div className="space-y-4">{blogData.europa.map(item => <button key={item.id} onClick={() => handleOpenPost(item.id)} className="w-full text-left p-3 hover:bg-cyan-50 rounded-lg font-bold text-gray-700">{item.title}</button>)}</div>
            </div>
            <div className="bg-white border-t-8 border-[#0B3D91] rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-black text-[#333] mb-6">🌍 Mundo</h3>
              <div className="space-y-4">{blogData.larga.map(item => <button key={item.id} onClick={() => handleOpenPost(item.id)} className="w-full text-left p-3 hover:bg-orange-50 rounded-lg font-bold text-gray-700">{item.title}</button>)}</div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-[#333] text-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <h2 className="text-5xl font-black mb-6">¿Hablamos?</h2>
              <p className="text-xl mb-4">Llámanos: <strong>910 825 715</strong></p>
              <p className="text-xl">Email: <strong>newtravelclick@newtravelclick.com</strong></p>
            </div>
            <div className="md:w-1/2 bg-white text-gray-800 p-8 rounded-2xl">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <input name="name" className="w-full p-4 border rounded-lg" placeholder="Nombre" required/>
                <input name="email" className="w-full p-4 border rounded-lg" placeholder="Email" required/>
                <textarea name="message" className="w-full p-4 border rounded-lg" rows={4} placeholder="Mensaje" required></textarea>
                <button type="submit" className="w-full bg-[#0071BC] text-white font-bold py-4 rounded-lg">ENVIAR EMAIL</button>
                <button type="button" onClick={handleWhatsAppContact} className="w-full bg-[#25D366] text-white font-bold py-4 rounded-lg flex justify-center items-center"><PhoneIcon className="mr-2"/> WHATSAPP</button>
              </form>
            </div>
        </div>
      </section>

      {isAIModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
           <div className="bg-white w-full max-w-4xl h-[80vh] rounded-3xl shadow-2xl flex flex-col relative overflow-hidden">
              <div className="bg-[#333] p-4 flex justify-between text-white"><h3 className="font-bold flex items-center"><Sparkles className="text-[#0071BC] mr-2"/> ASISTENTE IA</h3><button onClick={()=>setIsAIModalOpen(false)}><X/></button></div>
              <div className="p-6 flex-1 overflow-y-auto bg-gray-50">
                 {aiStatus === 'IDLE' && <div className="text-center mt-20"><h3 className="text-2xl font-bold">¿Dónde quieres ir?</h3></div>}
                 {aiStatus === 'LOADING' && <div className="flex justify-center mt-20"><Loader2 className="animate-spin text-[#0071BC]" size={48}/></div>}
                 {aiResponse && <div className="prose"><ReactMarkdown>{aiResponse.text}</ReactMarkdown></div>}
              </div>
              <div className="p-4 border-t bg-white"><form onSubmit={handleAskAI} className="flex gap-2"><input value={aiQuery} onChange={e=>setAiQuery(e.target.value)} className="flex-1 p-4 border rounded-lg" placeholder="Pregunta a la IA..." /><button className="bg-[#0071BC] text-white p-4 rounded-lg"><Send/></button></form></div>
           </div>
        </div>
      )}
    </Layout>
  );
}

export default App;
