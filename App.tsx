¡Madre mía, qué desastre! 😓 Tienes toda la razón para estar así. He visto la imagen del error (image_3ee495.jpg) y pone: ERROR: Unexpected end of file (Error: Fin de archivo inesperado).

¿Sabes qué significa eso? Que el código que copiaste se quedó a medias. Como es un código tan largo (porque querías los textos completos), es muy probable que al copiarlo o al pegarlo, se cortara la parte final. Por eso la web no carga: le falta el cierre.

Vamos a arreglarlo AHORA MISMO.

Esta vez, por seguridad, te voy a dar el código y tienes que asegurarte de que lo copias HASTA EL FINAL. La última línea tiene que ser export default App;.

🛑 PASO ÚNICO: El Código Completo (Intento Definitivo)
Ve a GitHub -> App.tsx.

Borra TODO (déjalo vacío).

Copia este código y pégalo.

👁️ OJO: Antes de guardar, baja hasta el final del archivo y comprueba que la última línea es export default App;. Si no está, es que no se ha copiado todo.

TypeScript

import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight, Calendar, MapPin, User, Mail, Phone as PhoneIcon, FolderOpen, Folder, 
  ArrowLeft, Sparkles, X, Send, Loader2, Globe, Utensils, Lightbulb, Clock, ShieldCheck, Heart, Headphones, Menu
} from 'lucide-react';
// Asegúrate de que geminiService.ts está en tu lista de archivos. Si no, borra esta línea.
import { askTravelAssistant } from './geminiService';
import ReactMarkdown from 'react-markdown';

// --- 1. CONTENIDO COMPLETO DE TUS VIAJES (RECUPERADO AL 100%) ---
const BLOG_CONTENT: Record<string, string> = {
  '1': `
    <h1 style="color:#0071BC;font-size:2.5rem;">1. RUTA POR LA COSTA BRAVA: CALAS SECRETAS</h1>
    <img src="https://images.unsplash.com/photo-1512413914633-b5043f4041ea?auto=format&fit=crop&w=1200&q=80" style="width:100%;height:400px;object-fit:cover;border-radius:12px;margin:20px 0;">
    <p class="intro" style="font-size:1.1rem;line-height:1.6;color:#444;">La Costa Brava no es solo un destino, es un estado de ánimo. Pinos que tocan el mar, aguas turquesas y una gastronomía que enamora. Aquí tienes tu hoja de ruta para 5 días inolvidables.</p>
    
    <h2 style="color:#0071BC;margin-top:30px;">🗺️ El Itinerario</h2>
    <ul style="list-style:none;padding:0;line-height:1.8;">
      <li style="margin-bottom:10px;"><strong>Día 1: Blanes y Lloret.</strong> Aterrizaje suave. Empieza en el Jardín Botánico Marimurtra de Blanes para unas fotos de infarto. Termina el día en Cala Boadella, un oasis entre el turismo.</li>
      <li style="margin-bottom:10px;"><strong>Día 2: Tossa de Mar.</strong> Sube a la Vila Vella (el único recinto medieval fortificado de la costa catalana) y baja a darte un chapuzón en Cala Pola.</li>
      <li style="margin-bottom:10px;"><strong>Día 3: Palafrugell y Llafranc.</strong> Recorre el "Camí de Ronda" al amanecer. Es la esencia de la Costa Brava.</li>
      <li style="margin-bottom:10px;"><strong>Día 4: Begur.</strong> El día de las joyas: Aiguablava, Sa Tuna y Platja Fonda. Aguas cristalinas garantizadas.</li>
      <li style="margin-bottom:10px;"><strong>Día 5: Cadaqués.</strong> El pueblo de Dalí. Blanco, bohemio y rodeado por la naturaleza salvaje del Cap de Creus.</li>
    </ul>

    <h2 style="color:#0071BC;margin-top:30px;">🎒 Qué hacer (Imprescindibles)</h2>
    <ul style="line-height:1.8;">
      <li><strong>Caminar por los Caminos de Ronda:</strong> Son senderos que bordean el mar y conectan las playas. El tramo de Calella de Palafrugell a Llafranc es sencillo y precioso.</li>
      <li><strong>Visitar la Casa-Museo Salvador Dalí:</strong> En Portlligat (Cadaqués). Necesitas reservar con antelación, pero ver su estudio tal cual lo dejó es mágico.</li>
      <li><strong>Snorkel en las Islas Medas:</strong> Desde L'Estartit salen barcos con fondo de cristal o para hacer inmersiones. Es una reserva marina llena de vida.</li>
    </ul>

    <h2 style="color:#0071BC;margin-top:30px;">🍽️ Dónde comer</h2>
    <ul style="line-height:1.8;">
      <li><strong>La Blava (Calella):</strong> Para comer arroz o pescado con los pies en la arena.</li>
      <li><strong>Compartir (Cadaqués):</strong> De los creadores de El Bulli. Imprescindible reservar.</li>
    </ul>

    <div style="background-color:#E3F2FD;border-left:5px solid #0071BC;padding:20px;margin:30px 0;border-radius:8px;">
      <p style="color:#0071BC;font-weight:bold;margin:0;">💡 TIP NEW TRAVEL CLICK</p>
      <p style="margin-top:10px;">En verano, los parkings de las calas famosas se llenan a las 09:00 AM. Si quieres aparcar y tener sitio para la toalla, madruga.</p>
    </div>
  `,
  '2': `
    <h1 style="color:#0071BC;font-size:2.5rem;">ESCAPADA IMPERIAL: PRAGA Y BUDAPEST</h1>
    <img src="https://images.unsplash.com/photo-1541849546-2165492d06d6?auto=format&fit=crop&w=1200&q=80" style="width:100%;height:400px;object-fit:cover;border-radius:12px;margin:20px 0;">
    <p class="intro" style="font-size:1.1rem;line-height:1.6;color:#444;">Dos capitales, un pasado imperial y una belleza que corta la respiración. Este itinerario conecta el romanticismo gótico de Praga con la majestuosidad de Budapest.</p>
    
    <h2 style="color:#0071BC;margin-top:30px;">🗺️ El Itinerario</h2>
    <ul style="list-style:none;padding:0;line-height:1.8;">
      <li style="margin-bottom:10px;"><strong>Día 1: Praga, la Ciudad Vieja.</strong> Reloj Astronómico y Puente de Carlos al atardecer.</li>
      <li style="margin-bottom:10px;"><strong>Día 2: El Castillo y Malá Strana.</strong> Sube al Castillo de Praga (el más grande del mundo) y baja callejeando.</li>
      <li style="margin-bottom:10px;"><strong>Día 3: Rumbo a Budapest.</strong> Tren panorámico. Llegada a Budapest y crucero nocturno por el Danubio.</li>
      <li style="margin-bottom:10px;"><strong>Día 4: Buda, la histórica.</strong> Sube al Bastión de los Pescadores y la Iglesia de Matías.</li>
      <li style="margin-bottom:10px;"><strong>Día 5: Pest y Termas.</strong> Visita el Parlamento y termina en los Baños Széchenyi.</li>
    </ul>

    <h2 style="color:#0071BC;margin-top:30px;">🎒 Qué hacer (Imprescindibles)</h2>
    <p>Ver los <strong>Zapatos en la orilla del Danubio</strong> en Budapest. Un monumento estremecedor.</p>

    <div style="background-color:#E3F2FD;border-left:5px solid #0071BC;padding:20px;margin:30px 0;border-radius:8px;">
      <p style="color:#0071BC;font-weight:bold;margin:0;">💡 TIP NEW TRAVEL CLICK</p>
      <p style="margin-top:10px;">Ojo con la moneda. Ninguna usa Euro (Coronas y Florines). Saca siempre de cajeros oficiales.</p>
    </div>
  `,
  '3': `
    <h1 style="color:#0071BC;font-size:2.5rem;">JAPÓN MILENARIO: TEMPLOS Y NEONES</h1>
    <img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80" style="width:100%;height:400px;object-fit:cover;border-radius:12px;margin:20px 0;">
    <p class="intro" style="font-size:1.1rem;line-height:1.6;color:#444;">Japón es el país donde el futuro convive con el pasado. En un mismo día puedes viajar en un tren bala a 300 km/h y meditar en un jardín zen.</p>
    
    <h2 style="color:#0071BC;margin-top:30px;">🗺️ El Itinerario</h2>
    <ul style="list-style:none;padding:0;line-height:1.8;">
      <li style="margin-bottom:10px;"><strong>Día 1: Tokio Eléctrico.</strong> Cruce de Shibuya y luces de Shinjuku.</li>
      <li style="margin-bottom:10px;"><strong>Día 2: Tokio Antiguo.</strong> Templo Senso-ji en Asakusa y parque Ueno.</li>
      <li style="margin-bottom:10px;"><strong>Día 3: Kioto.</strong> Tren bala y visita a Fushimi Inari Taisha (toriis rojos).</li>
      <li style="margin-bottom:10px;"><strong>Día 4: Bambú y Oro.</strong> Bosque de Bambú de Arashiyama y Pabellón Dorado.</li>
      <li style="margin-bottom:10px;"><strong>Día 5: Nara y Osaka.</strong> Ciervos en Nara y comida en Dotonbori.</li>
    </ul>

    <h2 style="color:#0071BC;margin-top:30px;">🎒 Qué hacer (Imprescindibles)</h2>
    <ul style="line-height:1.8;">
      <li><strong>Baño en un Onsen:</strong> Prueba los baños termales tradicionales.</li>
      <li><strong>Noche de Karaoke:</strong> Alquila una sala privada en Tokio.</li>
      <li><strong>Dormir en un Ryokan:</strong> Alojamiento tradicional con suelo de tatami.</li>
    </ul>

    <div style="background-color:#E3F2FD;border-left:5px solid #0071BC;padding:20px;margin:30px 0;border-radius:8px;">
      <p style="color:#0071BC;font-weight:bold;margin:0;">💡 TIP NEW TRAVEL CLICK</p>
      <p style="margin-top:10px;">En Japón no se deja propina. Compra el JR Pass con antelación desde España.</p>
    </div>
  `,
  '4': `
    <h1 style="color:#0071BC;font-size:2.5rem;">ANDALUCÍA EN RUTA: SOL Y ARTE</h1>
    <img src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=1200&q=80" style="width:100%;height:400px;object-fit:cover;border-radius:12px;margin:20px 0;">
    <p class="intro" style="font-size:1.1rem;line-height:1.6;color:#444;">Un viaje que despierta los sentidos. Desde la grandiosidad de la Alhambra hasta el olor a azahar de Sevilla.</p>
    
    <h2 style="color:#0071BC;margin-top:30px;">🗺️ El Itinerario</h2>
    <ul style="list-style:none;padding:0;line-height:1.8;">
      <li style="margin-bottom:10px;"><strong>Día 1: Sevilla Clásica.</strong> Catedral, Giralda y Real Alcázar.</li>
      <li style="margin-bottom:10px;"><strong>Día 2: Sevilla Moderna.</strong> Plaza de España y barrio de Triana.</li>
      <li style="margin-bottom:10px;"><strong>Día 3: Córdoba.</strong> Mezquita-Catedral y Patios de flores.</li>
      <li style="margin-bottom:10px;"><strong>Día 4: Granada.</strong> La Alhambra (reservar meses antes) y Albaicín.</li>
      <li style="margin-bottom:10px;"><strong>Día 5: Málaga.</strong> Teatro romano y puerto.</li>
    </ul>

    <div style="background-color:#E3F2FD;border-left:5px solid #0071BC;padding:20px;margin:30px 0;border-radius:8px;">
      <p style="color:#0071BC;font-weight:bold;margin:0;">💡 TIP NEW TRAVEL CLICK</p>
      <p style="margin-top:10px;">En verano evita las horas centrales del día (14:00-18:00). ¡La siesta es sagrada!</p>
    </div>
  `,
  '5': `
    <h1 style="color:#0071BC;font-size:2.5rem;">FIORDOS NORUEGOS: NATURALEZA PURA</h1>
    <img src="https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?auto=format&fit=crop&w=1200&q=80" style="width:100%;height:400px;object-fit:cover;border-radius:12px;margin:20px 0;">
    <p class="intro" style="font-size:1.1rem;line-height:1.6;color:#444;">Cascadas que caen al mar, trenes que desafían la gravedad y un silencio que cura. El paisaje más espectacular.</p>
    
    <h2 style="color:#0071BC;margin-top:30px;">🗺️ El Itinerario</h2>
    <ul style="list-style:none;padding:0;line-height:1.8;">
      <li style="margin-bottom:10px;"><strong>Día 1: Bergen.</strong> Muelle Hanseático de Bryggen y funicular Fløyen.</li>
      <li style="margin-bottom:10px;"><strong>Día 2: Tren de Flåm.</strong> Uno de los trayectos más bonitos del mundo.</li>
      <li style="margin-bottom:10px;"><strong>Día 3: Naeroyfjord.</strong> Crucero por el fiordo más estrecho (Patrimonio de la Humanidad).</li>
      <li style="margin-bottom:10px;"><strong>Día 4: Mirador Stegastein.</strong> Plataforma sobre el fiordo de Aurland.</li>
      <li style="margin-bottom:10px;"><strong>Día 5: Stavanger.</strong> Subida al Púlpito (Preikestolen).</li>
    </ul>

    <div style="background-color:#E3F2FD;border-left:5px solid #0071BC;padding:20px;margin:30px 0;border-radius:8px;">
      <p style="color:#0071BC;font-weight:bold;margin:0;">💡 TIP NEW TRAVEL CLICK</p>
      <p style="margin-top:10px;">Viste por capas ("teoría de la cebolla") y lleva chubasquero. El clima cambia rápido.</p>
    </div>
  `,
  '6': `
    <h1 style="color:#0071BC;font-size:2.5rem;">SAFARI KENIA Y TANZANIA</h1>
    <img src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80" style="width:100%;height:400px;object-fit:cover;border-radius:12px;margin:20px 0;">
    <p class="intro" style="font-size:1.1rem;line-height:1.6;color:#444;">No es un zoológico, es la vida real. Recorrer la sabana infinita y ver los "Cinco Grandes" es una experiencia que cambia el alma.</p>
    
    <h2 style="color:#0071BC;margin-top:30px;">🗺️ El Itinerario</h2>
    <ul style="list-style:none;padding:0;line-height:1.8;">
      <li style="margin-bottom:10px;"><strong>Día 1: Nairobi.</strong> Orfanato de elefantes y centro de jirafas.</li>
      <li style="margin-bottom:10px;"><strong>Día 2: Masai Mara (Kenia).</strong> Safari en 4x4 buscando leones y guepardos.</li>
      <li style="margin-bottom:10px;"><strong>Día 3: Serengeti (Tanzania).</strong> Llanuras infinitas donde la densidad de animales es asombrosa.</li>
      <li style="margin-bottom:10px;"><strong>Día 4: Amanecer en la Sabana.</strong> Rastreo de los Cinco Grandes.</li>
      <li style="margin-bottom:10px;"><strong>Día 5: Ngorongoro.</strong> Un volcán colapsado lleno de vida salvaje.</li>
    </ul>

    <div style="background-color:#E3F2FD;border-left:5px solid #0071BC;padding:20px;margin:30px 0;border-radius:8px;">
      <p style="color:#0071BC;font-weight:bold;margin:0;">💡 TIP NEW TRAVEL CLICK</p>
      <p style="margin-top:10px;">Colores neutros (caqui, verde). Evita azul oscuro y negro (atraen moscas). Lleva prismáticos.</p>
    </div>
  `,
  '7': `
    <h1 style="color:#0071BC;font-size:2.5rem;">NORTE DE ESPAÑA: GASTRONOMÍA</h1>
    <img src="https://images.unsplash.com/photo-1598453414998-333e6669865a?auto=format&fit=crop&w=1200&q=80" style="width:100%;height:400px;object-fit:cover;border-radius:12px;margin:20px 0;">
    <p class="intro" style="font-size:1.1rem;line-height:1.6;color:#444;">Paisajes que parecen Suiza pero con mar, y la mejor comida del mundo. Euskadi y Cantabria te esperan.</p>
    
    <h2 style="color:#0071BC;margin-top:30px;">🗺️ El Itinerario</h2>
    <ul style="list-style:none;padding:0;line-height:1.8;">
      <li style="margin-bottom:10px;"><strong>Día 1: San Sebastián.</strong> Playa de la Concha y ruta de Pintxos en lo Viejo.</li>
      <li style="margin-bottom:10px;"><strong>Día 2: Costa Vasca.</strong> Hondarribia y Zarautz (cuna de surfistas).</li>
      <li style="margin-bottom:10px;"><strong>Día 3: Bilbao.</strong> Museo Guggenheim y casco viejo.</li>
      <li style="margin-bottom:10px;"><strong>Día 4: Cantabria.</strong> Castro Urdiales y las anchoas de Santoña.</li>
      <li style="margin-bottom:10px;"><strong>Día 5: Santander.</strong> Palacio de la Magdalena y Santillana del Mar.</li>
    </ul>

    <div style="background-color:#E3F2FD;border-left:5px solid #0071BC;padding:20px;margin:30px 0;border-radius:8px;">
      <p style="color:#0071BC;font-weight:bold;margin:0;">💡 TIP NEW TRAVEL CLICK</p>
      <p style="margin-top:10px;">Prueba la tarta de queso en San Sebastián y las rabas en Santander. ¡Son religión!</p>
    </div>
  `,
  '8': `
    <h1 style="color:#0071BC;font-size:2.5rem;">LA TOSCANA: VIÑEDOS Y RENACIMIENTO</h1>
    <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80" style="width:100%;height:400px;object-fit:cover;border-radius:12px;margin:20px 0;">
    <p class="intro" style="font-size:1.1rem;line-height:1.6;color:#444;">La Dolce Vita. Colinas doradas, cipreses infinitos y ciudades que son museos al aire libre.</p>
    
    <h2 style="color:#0071BC;margin-top:30px;">🗺️ El Itinerario</h2>
    <ul style="list-style:none;padding:0;line-height:1.8;">
      <li style="margin-bottom:10px;"><strong>Día 1: Florencia.</strong> El Duomo, Ponte Vecchio y Galería Uffizi.</li>
      <li style="margin-bottom:10px;"><strong>Día 2: El David.</strong> Visita la Academia y atardecer en Piazzale Michelangelo.</li>
      <li style="margin-bottom:10px;"><strong>Día 3: Chianti.</strong> Ruta en coche por viñedos y pueblos como Greve.</li>
      <li style="margin-bottom:10px;"><strong>Día 4: Siena y San Gimignano.</strong> La plaza del Campo y las torres medievales.</li>
      <li style="margin-bottom:10px;"><strong>Día 5: Val d'Orcia.</strong> Pienza y Montalcino. Paisajes de postal.</li>
    </ul>

    <div style="background-color:#E3F2FD;border-left:5px solid #0071BC;padding:20px;margin:30px 0;border-radius:8px;">
      <p style="color:#0071BC;font-weight:bold;margin:0;">💡 TIP NEW TRAVEL CLICK</p>
      <p style="margin-top:10px;">Cuidado con las ZTL (Zonas de Tráfico Limitado) al conducir. Las multas son automáticas.</p>
    </div>
  `,
  '9': `
    <h1 style="color:#0071BC;font-size:2.5rem;">NUEVA YORK: LA CIUDAD QUE NUNCA DUERME</h1>
    <img src="https://images.unsplash.com/photo-1496442226666-8d4a0e62e6e9?auto=format&fit=crop&w=1200&q=80" style="width:100%;height:400px;object-fit:cover;border-radius:12px;margin:20px 0;">
    <p class="intro" style="font-size:1.1rem;line-height:1.6;color:#444;">El escenario de mil películas. Rascacielos, energía pura y una mezcla cultural infinita.</p>
    
    <h2 style="color:#0071BC;margin-top:30px;">🗺️ El Itinerario</h2>
    <ul style="list-style:none;padding:0;line-height:1.8;">
      <li style="margin-bottom:10px;"><strong>Día 1: Midtown.</strong> Times Square, Top of the Rock y Grand Central.</li>
      <li style="margin-bottom:10px;"><strong>Día 2: Libertad.</strong> Ferry a la Estatua y paseo por Wall Street (el toro).</li>
      <li style="margin-bottom:10px;"><strong>Día 3: Brooklyn.</strong> Cruza el puente andando y explora DUMBO.</li>
      <li style="margin-bottom:10px;"><strong>Día 4: Central Park.</strong> Alquila una bici. Tarde de museos (MET o MoMA).</li>
      <li style="margin-bottom:10px;"><strong>Día 5: High Line.</strong> Parque elevado, Chelsea Market y The Vessel.</li>
    </ul>

    <div style="background-color:#E3F2FD;border-left:5px solid #0071BC;padding:20px;margin:30px 0;border-radius:8px;">
      <p style="color:#0071BC;font-weight:bold;margin:0;">💡 TIP NEW TRAVEL CLICK</p>
      <p style="margin-top:10px;">Saca el ESTA con tiempo. La propina (18-20%) es obligatoria en restaurantes.</p>
    </div>
  `
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

// --- COMPONENTE LAYOUT (NAVBAR Y FOOTER) ---
const Layout = ({ children, onNavigate }: { children: React.ReactNode, onNavigate: (section: string) => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <nav className="fixed top-0 w-full z-50 bg-white shadow-md transition-all duration-300">
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
           <p className="text-gray-400 max-w-md mx-auto mb-8">Viajes diseñados a medida con la seguridad y experiencia que mereces.</p>
           <p className="text-gray-600 text-sm">© 2024 New Travel Click. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

// --- APP PRINCIPAL ---
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
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    const confirmSend = window.confirm("Se abrirá tu gestor de correo para enviar el mensaje. ¿Continuar?");
    
    if (confirmSend) {
        const body = `Hola, quiero solicitar información.\n\nMis datos son:\n- Nombre: ${name}\n- Teléfono: ${phone}\n- Email: ${email}\n\nMensaje:\n${message}`;
        window.location.href = `mailto:newtravelclick@newtravelclick.com?subject=Nueva Solicitud Web de ${encodeURIComponent(name)}&body=${encodeURIComponent(body)}`;
    }
  };
  
  const handleWhatsAppContact = () => {
    const text = "Hola New Travel Click, me gustaría información sobre un viaje.";
    window.open(`https://wa.me/34633543009?text=${encodeURIComponent(text)}`, '_blank');
  };

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

  if (activePost && BLOG_CONTENT[activePost]) {
    return (
      <Layout onNavigate={scrollToSection}>
        <div className="pt-28 pb-20 bg-[#FFF8F0] min-h-screen">
          <div className="container mx-auto px-4 max-w-4xl">
            <button onClick={() => setActivePost(null)} className="mb-8 flex items-center text-[#0071BC] font-bold hover:underline transition-all">
              <ArrowLeft className="mr-2" /> Volver a la Lista
            </button>
            <article className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100 prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: BLOG_CONTENT[activePost] }} />
              <div className="mt-10 text-center">
                 <button onClick={() => scrollToSection('contact')} className="bg-[#0071BC] text-white py-4 px-8 rounded-full font-bold shadow-lg hover:bg-[#0B3D91] transition-all">SOLICITAR PRESUPUESTO</button>
              </div>
            </article>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout onNavigate={scrollToSection}>
      <section id="home" className="relative h-[85vh] flex items-center justify-center overflow-hidden mt-16">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-black text-[#15803d] mb-6 tracking-wide leading-none shadow-sm drop-shadow-md">DESCUBRE EL MUNDO CON <br/> NEW TRAVEL CLICK</h1>
          <p className="text-xl md:text-2xl text-gray-700 font-bold mb-10 max-w-3xl mx-auto drop-shadow-sm font-sans">
            Viajes diseñados para ti con la seguridad y experiencia que mereces. Déjate inspirar y nosotros nos ocupamos del resto.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
             <a href="https://www.newtravelclick.com/" target="_blank" className="bg-[#0B3D91] text-white font-bold py-4 px-10 rounded-full shadow-2xl hover:bg-[#333333] transition-all transform hover:-translate-y-1 uppercase tracking-wider">VER OFERTAS EXCLUSIVAS</a>
             <button onClick={() => setIsAIModalOpen(true)} className="bg-white/40 backdrop-blur-md border border-white/60 text-[#333333] font-bold py-4 px-10 rounded-full shadow-lg hover:bg-white/60 transition-all transform hover:-translate-y-1 uppercase tracking-wider flex items-center justify-center"><Sparkles className="mr-2" /> Planificar con IA</button>
          </div>
        </div>
      </section>

      <section id="rutas-espana" className="py-24 bg-[#FFF8F0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16"><h2 className="text-5xl font-black text-[#333333] mb-4">Nuestras Colecciones</h2><div className="h-1 w-24 bg-[#0071BC] mx-auto rounded-full"></div></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
            <div className="group relative pt-10 h-full"><div className="absolute top-2 left-0 w-36 h-12 bg-[#0071BC] rounded-t-xl"><span className="absolute bottom-3 left-5 text-sm font-bold text-white uppercase tracking-wider">Nacional</span></div><div className="relative z-10 bg-white border-t-8 border-[#0071BC] rounded-tr-2xl rounded-b-2xl shadow-xl p-8 h-full transition-all hover:shadow-2xl hover:scale-[1.01]"><div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4"><h3 className="text-3xl font-black text-[#333333] tracking-wide">Rutas por España</h3><Folder className="text-[#0071BC] opacity-20" size={48} /></div><div className="space-y-4">{blogData.espana.map((item) => (<button key={item.id} onClick={() => handleOpenPost(item.id)} className="w-full flex items-center group/item cursor-pointer p-4 rounded-lg hover:bg-blue-50 transition-all text-left border-b border-gray-100 last:border-0"><div className="bg-blue-100 p-2 rounded-full mr-3 group-hover/item:bg-[#0071BC] group-hover/item:text-white transition-colors text-[#0071BC] flex-shrink-0"><MapPin size={20} /></div><span className="text-gray-800 font-extrabold group-hover/item:text-[#0071BC] transition-all text-xl tracking-tight group-hover/item:translate-x-2">{item.title}</span></button>))}</div></div></div>
            <div id="rutas-europa" className="group relative pt-10 h-full"><div className="absolute top-2 left-0 w-36 h-12 bg-[#29ABE2] rounded-t-xl"><span className="absolute bottom-3 left-5 text-sm font-bold text-white uppercase tracking-wider">Continental</span></div><div className="relative z-10 bg-white border-t-8 border-[#29ABE2] rounded-tr-2xl rounded-b-2xl shadow-xl p-8 h-full transition-all hover:shadow-2xl hover:scale-[1.01]"><div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4"><h3 className="text-3xl font-black text-[#333333] tracking-wide">Rutas por Europa</h3><Folder className="text-[#29ABE2] opacity-20" size={48} /></div><div className="space-y-4">{blogData.europa.map((item) => (<button key={item.id} onClick={() => handleOpenPost(item.id)} className="w-full flex items-center group/item cursor-pointer p-4 rounded-lg hover:bg-cyan-50 transition-all text-left border-b border-gray-100 last:border-0"><div className="bg-cyan-100 p-2 rounded-full mr-3 group-hover/item:bg-[#29ABE2] group-hover/item:text-white transition-colors text-[#29ABE2] flex-shrink-0"><MapPin size={20} /></div><span className="text-gray-800 font-extrabold group-hover/item:text-[#29ABE2] transition-all text-xl tracking-tight group-hover/item:translate-x-2">{item.title}</span></button>))}</div></div></div>
            <div id="larga-distancia" className="group relative pt-10 h-full"><div className="absolute top-2 left-0 w-36 h-12 bg-[#0B3D91] rounded-t-xl"><span className="absolute bottom-3 left-5 text-sm font-bold text-white uppercase tracking-wider">Mundo</span></div><div className="relative z-10 bg-white border-t-8 border-[#0B3D91] rounded-tr-2xl rounded-b-2xl shadow-xl p-8 h-full transition-all hover:shadow-2xl hover:scale-[1.01]"><div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4"><h3 className="text-3xl font-black text-[#333333] tracking-wide">Larga Distancia</h3><Folder className="text-[#0B3D91] opacity-20" size={48} /></div><div className="space-y-4">{blogData.larga.map((item) => (<button key={item.id} onClick={() => handleOpenPost(item.id)} className="w-full flex items-center group/item cursor-pointer p-4 rounded-lg hover:bg-orange-50 transition-all text-left border-b border-gray-100 last:border-0"><div className="bg-orange-100 p-2 rounded-full mr-3 group-hover/item:bg-[#0B3D91] group-hover/item:text-white transition-colors text-[#0B3D91] flex-shrink-0"><MapPin size={20} /></div><span className="text-gray-800 font-extrabold group-hover/item:text-[#0B3D91] transition-all text-xl tracking-tight group-hover/item:translate-x-2">{item.title}</span></button>))}</div></div></div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-[#333333] text-white relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2"><span className="text-[#29ABE2] font-bold tracking-widest uppercase text-sm mb-2 block">¿Dudas?</span><h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">Te ayudamos a diseñar <br/>el viaje perfecto</h2><p className="text-gray-400 text-lg mb-8 font-light leading-relaxed">Déjanos tus datos y uno de nuestros expertos se pondrá en contacto contigo.</p><div className="space-y-6"><div className="flex items-center p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"><PhoneIcon className="text-[#29ABE2] mr-4" size={24} /><div><p className="text-xs text-gray-500 uppercase font-bold">Llámanos</p><p className="font-bold text-xl">910 825 715</p></div></div><div className="flex items-center p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"><Mail className="text-[#29ABE2] mr-4" size={24} /><div><p className="text-xs text-gray-500 uppercase font-bold">Escríbenos</p><p className="font-bold text-lg text-xs md:text-lg break-all">newtravelclick@newtravelclick.com</p></div></div></div></div>
            <div className="md:w-1/2 w-full"><form id="contact-form" onSubmit={handleContactSubmit} className="bg-white text-gray-800 p-8 rounded-2xl shadow-2xl"><div className="mb-6"><label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Nombre Completo</label><input type="text" id="name" name="name" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0071BC] outline-none transition-all" placeholder="Tu nombre" /></div><div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"><div><label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Teléfono</label><input type="tel" id="phone" name="phone" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0071BC] outline-none transition-all" placeholder="+34 600..." /></div><div><label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Email</label><input type="email" id="email" name="email" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0071BC] outline-none transition-all" placeholder="tu@email.com" /></div></div><div className="mb-8"><label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">¿En qué podemos ayudarte?</label><textarea id="message" name="message" rows={4} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0071BC] outline-none transition-all resize-none" placeholder="Cuéntanos tu idea de viaje..."></textarea></div><div className="flex flex-col space-y-3"><button type="submit" className="w-full bg-[#0071BC] hover:bg-blue-700 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 uppercase tracking-wider text-sm flex items-center justify-center">Solicitar Información por Email</button><div className="relative flex py-2 items-center"><div className="flex-grow border-t border-gray-300"></div><span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase">O contáctanos al instante</span><div className="flex-grow border-t border-gray-300"></div></div><button type="button" onClick={handleWhatsAppContact} className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 uppercase tracking-wider text-sm flex items-center justify-center"><svg viewBox="0 0 24 24" className="w-5 h-5 mr-2 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>Enviar WhatsApp Directo</button></div></form></div></div></div></section>

      {/* AI Modal */}
      {isAIModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-white w-full max-w-4xl h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden relative animate-in zoom-in-95 duration-200">
              <div className="bg-[#333] p-4 flex justify-between items-center text-white">
                <div className="flex items-center gap-2"><Sparkles className="text-[#0071BC]" /><span className="font-bold font-display tracking-wider">ASISTENTE NEW TRAVEL CLICK</span></div>
                <button onClick={() => setIsAIModalOpen(false)} className="hover:text-red-400 transition-colors"><X size={24} /></button>
              </div>
              <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden relative">
                 <div className="absolute inset-0 z-0"><img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop" alt="Space view" className="w-full h-full object-cover opacity-10" /></div>
                 <div className="flex-1 overflow-y-auto p-6 z-10 relative custom-scrollbar">
                    {aiStatus === 'IDLE' && (<div className="h-full flex flex-col items-center justify-center text-center p-4"><div className="w-16 h-16 bg-[#0071BC]/10 rounded-full flex items-center justify-center mb-6 text-[#0071BC]"><Globe size={32} /></div><h3 className="text-2xl font-bold text-gray-800 mb-2">¿Qué quieres descubrir hoy?</h3><p className="text-gray-500 mb-8 max-w-sm">Pregúntame sobre itinerarios, comida local o mejores épocas para viajar.</p></div>)}
                    {aiStatus === 'LOADING' && (<div className="h-full flex flex-col items-center justify-center"><Loader2 size={40} className="animate-spin text-[#0071BC] mb-4" /><p className="text-gray-500 font-medium animate-pulse">Consultando el mapa mundial...</p></div>)}
                    {aiStatus === 'SUCCESS' && aiResponse && (<div className="prose prose-blue max-w-none"><ReactMarkdown>{aiResponse.text}</ReactMarkdown></div>)}
                 </div>
                 <div className="p-4 bg-white border-t border-gray-100 z-20"><form onSubmit={handleAskAI} className="relative"><input type="text" value={aiQuery} onChange={(e) => setAiQuery(e.target.value)} placeholder="Escribe tu destino o duda aquí..." className="w-full pl-5 pr-14 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0071BC] outline-none transition-all shadow-sm"/><button type="submit" disabled={aiStatus === 'LOADING' || !aiQuery.trim()} className="absolute right-2 top-2 p-2 bg-[#0071BC] text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><Send size={20} /></button></form></div>
              </div>
           </div>
        </div>
      )}
    </Layout>
  );
}

export default App;
