import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight, Calendar, MapPin, User, Mail, Phone as PhoneIcon, FolderOpen, Folder, 
  ArrowLeft, Sparkles, X, Send, Loader2, Globe, Utensils, Lightbulb, Clock, ShieldCheck, Heart, Headphones, Menu
} from 'lucide-react';
import { askTravelAssistant } from './geminiService';
import ReactMarkdown from 'react-markdown';

// --- 1. CONTENIDO DEL BLOG (COMPLETO) ---
const BLOG_CONTENT: Record<string, string> = {
  '1': `
    <h1 style="color:#0071BC;font-size:2.2rem;">1. RUTA POR LA COSTA BRAVA: CALAS SECRETAS</h1>
    <img src="https://images.unsplash.com/photo-1512413914633-b5043f4041ea?auto=format&fit=crop&w=1200&q=80" style="width:100%;height:400px;object-fit:cover;border-radius:12px;margin:20px 0;">
    <p class="intro" style="font-size:1.1rem;line-height:1.6;color:#444;">La Costa Brava no es solo un destino, es un estado de ánimo. Pinos que tocan el mar, aguas turquesas y una gastronomía que enamora. Aquí tienes tu hoja de ruta para 5 días inolvidables.</p>
    
    <h2 style="color:#0071BC;margin-top:30px;">🗺️ El Itinerario</h2>
    <ul style="list-style:none;padding:0;line-height:1.8;">
      <li style="margin-bottom:10px;"><strong>Día 1: Blanes y Lloret.</strong> Empieza en el Jardín Botánico Marimurtra de Blanes para unas fotos de infarto. Termina el día en Cala Boadella, un oasis entre el turismo.</li>
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

    <div style="background-color:#E3F2FD;border-left:5px solid #0071BC;padding:20px;margin:30px 0;border-radius:8px;">
      <p style="color:#0071BC;font-weight:bold;margin:0;">💡 TIP NEW TRAVEL CLICK</p>
      <p style="margin-top:10px;">En verano, los parkings de las calas famosas se llenan a las 09:00 AM. Si quieres aparcar y tener sitio para la toalla, madruga. Si vas fuera de temporada (junio o septiembre), tendrás el paraíso para ti solo.</p>
    </div>
  `,
  '2': `
    <h1 style="color:#0071BC;font-size:2.2rem;">ESCAPADA IMPERIAL: PRAGA Y BUDAPEST</h1>
    <img src="https://images.unsplash.com/photo-1541849546-2165492d06d6?auto=format&fit=crop&w=1200&q=80" style="width:100%;height:400px;object-fit:cover;border-radius:12px;margin:20px 0;">
    <p class="intro" style="font-size:1.1rem;line-height:1.6;color:#444;">Dos capitales, un pasado imperial y una belleza que corta la respiración. Este itinerario conecta el romanticismo gótico de Praga con la majestuosidad de Budapest. Un viaje de cuento de hadas en el corazón de Europa.</p>
    
    <h2 style="color:#0071BC;margin-top:30px;">🗺️ El Itinerario</h2>
    <ul style="list-style:none;padding:0;line-height:1.8;">
      <li style="margin-bottom:10px;"><strong>Día 1: Praga, la Ciudad Vieja.</strong> Aterrizaje y paseo por la Plaza de la Ciudad Vieja para ver el Reloj Astronómico. Cruza el Puente de Carlos al atardecer.</li>
      <li style="margin-bottom:10px;"><strong>Día 2: El Castillo y Malá Strana.</strong> Sube al Castillo de Praga (el más grande del mundo) y baja callejeando por el barrio bohemio de Malá Strana.</li>
      <li style="margin-bottom:10px;"><strong>Día 3: Rumbo a Budapest.</strong> Tren panorámico por la mañana. Llegada a Budapest y primera toma de contacto: crucero nocturno por el Danubio (imprescindible).</li>
      <li style="margin-bottom:10px;"><strong>Día 4: Buda, la histórica.</strong> Sube al Bastión de los Pescadores y la Iglesia de Matías. Las vistas del Parlamento desde aquí son la postal del viaje.</li>
      <li style="margin-bottom:10px;"><strong>Día 5: Pest y Relax Termal.</strong> Visita el Parlamento por dentro y termina el viaje relajándote en los Baños Széchenyi o Gellért.</li>
    </ul>

    <h2 style="color:#0071BC;margin-top:30px;">🍽️ Dónde comer</h2>
    <p>Prueba el <em>Goulash</em> en Hungría y el <em>Trdelník</em> (dulce de chimenea) en las calles de Praga.</p>

    <div style="background-color:#E3F2FD;border-left:5px solid #0071BC;padding:20px;margin:30px 0;border-radius:8px;">
      <p style="color:#0071BC;font-weight:bold;margin:0;">💡 TIP NEW TRAVEL CLICK</p>
      <p style="margin-top:10px;">Ojo con la moneda. Ninguna de las dos ciudades usa Euro (usan Coronas Checas y Florines Húngaros). Evita cambiar dinero en el aeropuerto; saca directamente de cajeros oficiales en la ciudad para mejor cambio.</p>
    </div>
  `,
  '3': `
    <h1 style="color:#0071BC;font-size:2.2rem;">JAPÓN MILENARIO: TEMPLOS Y NEONES</h1>
    <img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80" style="width:100%;height:400px;object-fit:cover;border-radius:12px;margin:20px 0;">
    <p class="intro" style="font-size:1.1rem;line-height:1.6;color:#444;">Japón es el país donde el futuro convive con el pasado. En un mismo día puedes viajar en un tren bala a 300 km/h y meditar en un jardín zen de hace cinco siglos. Un choque cultural fascinante que te cambiará para siempre.</p>
    
    <h2 style="color:#0071BC;margin-top:30px;">🗺️ El Itinerario</h2>
    <ul style="list-style:none;padding:0;line-height:1.8;">
      <li style="margin-bottom:10px;"><strong>Día 1: Tokio Eléctrico.</strong> Aterrizaje en la capital. Sumérgete en el caos organizado del cruce de Shibuya y las luces de neón infinitas de Shinjuku. Godzilla te espera.</li>
      <li style="margin-bottom:10px;"><strong>Día 2: El Tokio Antiguo.</strong> Visita el templo Senso-ji en Asakusa (el más antiguo de Tokio) y pasea por el parque Ueno. Termina el día en Akihabara, la meca del anime y la electrónica.</li>
      <li style="margin-bottom:10px;"><strong>Día 3: Kioto y las mil puertas.</strong> Tren bala (Shinkansen) hacia Kioto. Visita Fushimi Inari Taisha, el santuario de los miles de toriis rojos que suben la montaña.</li>
      <li style="margin-bottom:10px;"><strong>Día 4: Bambú y Oro.</strong> Madruga para ver el Bosque de Bambú de Arashiyama sin gente. Después, deslúmbrate con el Kinkaku-ji (Pabellón Dorado) reflejado en su estanque.</li>
      <li style="margin-bottom:10px;"><strong>Día 5: Nara y Osaka.</strong> Mañana en Nara dando de comer a los ciervos sagrados en libertad. Tarde-noche en Dotonbori (Osaka) para probar la mejor comida callejera bajo los neones.</li>
    </ul>

    <h2 style="color:#0071BC;margin-top:30px;">🚫 No te pierdas</h2>
    <p>El barrio de <strong>Gion en Kioto</strong> al atardecer. Si tienes suerte y eres respetuoso, podrás ver pasar a una Geisha o Maiko camino a una cita. Es como viajar 300 años atrás en el tiempo.</p>

    <div style="background-color:#E3F2FD;border-left:5px solid #0071BC;padding:20px;margin:30px 0;border-radius:8px;">
      <p style="color:#0071BC;font-weight:bold;margin:0;">💡 TIP NEW TRAVEL CLICK</p>
      <p style="margin-top:10px;">En Japón no se deja propina (se considera ofensivo) y no se habla por teléfono en los trenes. La etiqueta y el respeto al prójimo son sagrados. ¡Lleva calcetines limpios y sin agujeros, te descalzarás mucho!</p>
    </div>
  `,
  '4': `
    <h1 style="color:#0071BC;font-size:2.2rem;">ANDALUCÍA EN RUTA: SOL Y ARTE</h1>
    <img src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=1200&q=80" style="width:100%;height:400px;object-fit:cover;border-radius:12px;margin:20px 0;">
    <p class="intro" style="font-size:1.1rem;line-height:1.6;color:#444;">Un viaje que despierta los sentidos. Desde la grandiosidad de la Alhambra hasta el olor a azahar de Sevilla. Esta ruta del "Triángulo de Oro" es un clásico que nunca falla.</p>
    
    <h2 style="color:#0071BC;margin-top:30px;">🗺️ El Itinerario</h2>
    <ul style="list-style:none;padding:0;line-height:1.8;">
      <li style="margin-bottom:10px;"><strong>Día 1: Sevilla Clásica.</strong> Catedral, Giralda y Real Alcázar. Noche de tapas por el barrio de Santa Cruz.</li>
      <li style="margin-bottom:10px;"><strong>Día 2: Sevilla Moderna.</strong> Plaza de España (de cine) y atardecer en las "Setas" de la Encarnación.</li>
      <li style="margin-bottom:10px;"><strong>Día 3: Córdoba.</strong> Tren o coche temprano. Visita a la Mezquita-Catedral y los Patios de Córdoba llenos de flores.</li>
      <li style="margin-bottom:10px;"><strong>Día 4: Granada.</strong> La Alhambra (reserva con meses de antelación). Paseo por el Paseo de los Tristes a los pies de la fortaleza.</li>
      <li style="margin-bottom:10px;"><strong>Día 5: Málaga.</strong> Un final relajado frente al mar, visitando el teatro romano y el puerto.</li>
    </ul>

    <div style="background-color:#E3F2FD;border-left:5px solid #0071BC;padding:20px;margin:30px 0;border-radius:8px;">
      <p style="color:#0071BC;font-weight:bold;margin:0;">💡 TIP NEW TRAVEL CLICK</p>
      <p style="margin-top:10px;">Andalucía en julio y agosto puede superar los 40°C. Organiza tus visitas a monumentos a primera hora de la mañana (09:00h) y deja las tardes para museos con aire acondicionado o paseos nocturnos. ¡La siesta aquí es una necesidad, no un capricho!</p>
    </div>
  `,
  '5': `
    <h1 style="color:#0071BC;font-size:2.2rem;">FIORDOS NORUEGOS: NATURALEZA PURA</h1>
    <img src="https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?auto=format&fit=crop&w=1200&q=80" style="width:100%;height:400px;object-fit:cover;border-radius:12px;margin:20px 0;">
    <p class="intro" style="font-size:1.1rem;line-height:1.6;color:#444;">Cascadas que caen al mar, trenes que desafían la gravedad y un silencio que cura. Noruega ofrece uno de los paisajes más espectaculares del planeta. Prepárate para respirar el aire más puro de tu vida.</p>
    
    <h2 style="color:#0071BC;margin-top:30px;">🗺️ El Itinerario</h2>
    <ul style="list-style:none;padding:0;line-height:1.8;">
      <li style="margin-bottom:10px;"><strong>Día 1: Bergen.</strong> La puerta de los fiordos. Pasea por el muelle hanseático de Bryggen (casas de madera de colores) y sube en funicular al monte Fløyen.</li>
      <li style="margin-bottom:10px;"><strong>Día 2: El Tren de Flåm.</strong> Uno de los trayectos en tren más bonitos del mundo. De Myrdal a Flåm, pasando por cascadas y valles profundos.</li>
      <li style="margin-bottom:10px;"><strong>Día 3: Naeroyfjord.</strong> Navega por el fiordo más estrecho y espectacular, Patrimonio de la Humanidad. Las paredes de roca parecen tocar el barco.</li>
      <li style="margin-bottom:10px;"><strong>Día 4: Mirador Stegastein.</strong> Una plataforma de madera y cristal suspendida a 650 metros sobre el fiordo de Aurland. Vértigo y belleza.</li>
      <li style="margin-bottom:10px;"><strong>Día 5: Stavanger o Regreso.</strong> Si tienes tiempo, baja a Stavanger para subir al famoso "Púlpito" (Preikestolen), o disfruta de la tranquilidad escandinava antes de volver.</li>
    </ul>

    <div style="background-color:#E3F2FD;border-left:5px solid #0071BC;padding:20px;margin:30px 0;border-radius:8px;">
      <p style="color:#0071BC;font-weight:bold;margin:0;">💡 TIP NEW TRAVEL CLICK</p>
      <p style="margin-top:10px;">El clima noruego es impredecible incluso en verano. Viste siempre por capas ("teoría de la cebolla") y lleva un chubasquero de calidad. ¡No dejes que la lluvia te pare!</p>
    </div>
  `,
  '6': `
    <h1 style="color:#0071BC;font-size:2.2rem;">SAFARI KENIA Y TANZANIA</h1>
    <img src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80" style="width:100%;height:400px;object-fit:cover;border-radius:12px;margin:20px 0;">
    <p class="intro" style="font-size:1.1rem;line-height:1.6;color:#444;">No es un zoológico, es la vida real en su estado más puro. Recorrer la sabana infinita, ver amanecer bajo el Kilimanjaro y sentir la tierra vibrar con la Gran Migración es una experiencia que te cambia el alma. Bienvenidos al corazón de África.</p>
    
    <h2 style="color:#0071BC;margin-top:30px;">🗺️ El Itinerario</h2>
    <ul style="list-style:none;padding:0;line-height:1.8;">
      <li style="margin-bottom:10px;"><strong>Día 1: Nairobi y las Jirafas.</strong> Aterrizaje en Kenia. Visita el orfanato de elefantes David Sheldrick y alimenta a las jirafas en el Giraffe Centre. Una toma de contacto tierna antes de la acción.</li>
      <li style="margin-bottom:10px;"><strong>Día 2: Masai Mara (Kenia).</strong> Viaje a la reserva más famosa. Primer "Game Drive" (safari en 4x4) para buscar leones, guepardos y leopardos. Si es temporada, verás cruzar el río Mara a miles de ñus.</li>
      <li style="margin-bottom:10px;"><strong>Día 3: Rumbo al Serengeti (Tanzania).</strong> Cruzamos la frontera. El paisaje cambia a llanuras interminables ("Serengeti" significa "llanura sin fin"). Aquí la densidad de depredadores es asombrosa.</li>
      <li style="margin-bottom:10px;"><strong>Día 4: Amanecer en la Sabana.</strong> Día completo de rastreo. Busca a los "Cinco Grandes" (León, Leopardo, Elefante, Rinoceronte y Búfalo). Noche bajo un manto de estrellas que no existe en ningún otro lugar.</li>
      <li style="margin-bottom:10px;"><strong>Día 5: Cráter del Ngorongoro.</strong> El "Jardín del Edén". Un volcán colapsado que alberga un ecosistema único con miles de animales atrapados en sus paredes verdes. Es el mejor lugar para ver rinocerontes negros.</li>
    </ul>

    <div style="background-color:#E3F2FD;border-left:5px solid #0071BC;padding:20px;margin:30px 0;border-radius:8px;">
      <p style="color:#0071BC;font-weight:bold;margin:0;">💡 TIP NEW TRAVEL CLICK</p>
      <p style="margin-top:10px;">Viste con colores neutros (caqui, verde oliva, beige). Evita el azul oscuro y el negro, ya que atraen a la mosca tsetsé. Y no olvides unos buenos prismáticos; la diferencia entre ver una mancha y ver un leopardo está en la óptica.</p>
    </div>
  `,
  '7': `
    <h1 style="color:#0071BC;font-size:2.2rem;">NORTE DE ESPAÑA: GASTRONOMÍA</h1>
    <img src="https://images.unsplash.com/photo-1598453414998-333e6669865a?auto=format&fit=crop&w=1200&q=80" style="width:100%;height:400px;object-fit:cover;border-radius:12px;margin:20px 0;">
    <p class="intro" style="font-size:1.1rem;line-height:1.6;color:#444;">Si te gusta comer bien y los paisajes que parecen Suiza pero con mar, esta ruta por Euskadi y Cantabria es para ti. Prepara el apetito.</p>
    
    <h2 style="color:#0071BC;margin-top:30px;">🗺️ El Itinerario</h2>
    <ul style="list-style:none;padding:0;line-height:1.8;">
      <li style="margin-bottom:10px;"><strong>Día 1: San Sebastián (Donostia).</strong> Paseo por la playa de La Concha y subida al Monte Igueldo. Cena de Pintxos.</li>
      <li style="margin-bottom:10px;"><strong>Día 2: Costa Vasca.</strong> Hondarribia (pueblo pesquero colorido) y Zarautz (cuna de surfistas).</li>
      <li style="margin-bottom:10px;"><strong>Día 3: Getaria y Bilbao.</strong> Visita una bodega de Txakoli en Getaria. Tarde de arquitectura con el Guggenheim en Bilbao.</li>
      <li style="margin-bottom:10px;"><strong>Día 4: Santoña y Costa Cántabra.</strong> Cruza a Cantabria. Para en Santoña para comprar las mejores anchoas del mundo.</li>
      <li style="margin-bottom:10px;"><strong>Día 5: Santander y Santillana del Mar.</strong> La elegancia de la bahía de Santander y el viaje medieval en Santillana.</li>
    </ul>

    <div style="background-color:#E3F2FD;border-left:5px solid #0071BC;padding:20px;margin:30px 0;border-radius:8px;">
      <p style="color:#0071BC;font-weight:bold;margin:0;">💡 TIP NEW TRAVEL CLICK</p>
      <p style="margin-top:10px;">En el norte el clima cambia en minutos ("Orbayu" o "Sirimiri"). Lleva siempre un chubasquero ligero y calzado cómodo que no resbale. Y recuerda: las raciones de comida en el norte son muy generosas. ¡Cuidado al pedir!</p>
    </div>
  `,
  '8': `
    <h1 style="color:#0071BC;font-size:2.2rem;">LA TOSCANA: VIÑEDOS Y ARTE</h1>
    <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80" style="width:100%;height:400px;object-fit:cover;border-radius:12px;margin:20px 0;">
    <p class="intro" style="font-size:1.1rem;line-height:1.6;color:#444;">La "Dolce Vita" existe y está en la Toscana. Un viaje por carretera a través de colinas doradas, cipreses infinitos, el mejor vino del mundo y ciudades que son museos al aire libre.</p>
    
    <h2 style="color:#0071BC;margin-top:30px;">🗺️ El Itinerario</h2>
    <ul style="list-style:none;padding:0;line-height:1.8;">
      <li style="margin-bottom:10px;"><strong>Día 1: Florencia, la cuna del arte.</strong> El Duomo, el Ponte Vecchio y la Galería Uffizi. Florencia se camina y se admira en cada esquina.</li>
      <li style="margin-bottom:10px;"><strong>Día 2: El David y el Oltrarno.</strong> Visita la Galería de la Academia para ver al David de Miguel Ángel. Por la tarde, cruza el río hacia el barrio artesano del Oltrarno.</li>
      <li style="margin-bottom:10px;"><strong>Día 3: Ruta del Chianti.</strong> Alquila un coche y piérdete por la carretera SR222. Parada obligatoria en Greve in Chianti y visita a una bodega local.</li>
      <li style="margin-bottom:10px;"><strong>Día 4: Siena y San Gimignano.</strong> La Piazza del Campo en Siena (quizás la plaza más bonita de Italia) y las torres medievales de San Gimignano por la tarde.</li>
      <li style="margin-bottom:10px;"><strong>Día 5: Val d'Orcia.</strong> El paisaje de postal. Pienza, Montalcino y colinas que parecen pintadas a mano.</li>
    </ul>

    <div style="background-color:#E3F2FD;border-left:5px solid #0071BC;padding:20px;margin:30px 0;border-radius:8px;">
      <p style="color:#0071BC;font-weight:bold;margin:0;">💡 TIP NEW TRAVEL CLICK</p>
      <p style="margin-top:10px;">Si alquilas coche, ¡cuidado con las ZTL (Zonas de Tráfico Limitado)! Están en el centro de casi todos los pueblos y ciudades. Si entras sin permiso, la multa te llegará a casa meses después.</p>
    </div>
  `,
  '9': `
    <h1 style="color:#0071BC;font-size:2.2rem;">NUEVA YORK: LA CIUDAD QUE NUNCA DUERME</h1>
    <img src="https://images.unsplash.com/photo-1496442226666-8d4a0e62e6e9?auto=format&fit=crop&w=1200&q=80" style="width:100%;height:400px;object-fit:cover;border-radius:12px;margin:20px 0;">
    <p class="intro" style="font-size:1.1rem;line-height:1.6;color:#444;">Es el escenario de mil películas y el centro del mundo moderno. Nueva York es energía pura, rascacielos que tocan las nubes y una mezcla cultural infinita. Prepárate para caminar mucho, mirar hacia arriba y sentirte el protagonista de tu propia serie.</p>
    
    <h2 style="color:#0071BC;margin-top:30px;">🗺️ El Itinerario</h2>
    <ul style="list-style:none;padding:0;line-height:1.8;">
      <li style="margin-bottom:10px;"><strong>Día 1: Midtown y Luces.</strong> Empieza fuerte: Times Square, Bryant Park y la Grand Central Terminal. Sube al atardecer al <em>Top of the Rock</em> para ver el Empire State iluminado frente a ti.</li>
      <li style="margin-bottom:10px;"><strong>Día 2: Libertad y Finanzas.</strong> Ferry a la Estatua de la Libertad por la mañana. Pasea por Wall Street (toca el toro para la buena suerte) y reflexiona en el Memorial del 9/11.</li>
      <li style="margin-bottom:10px;"><strong>Día 3: Cruzando el Puente.</strong> Cruza el Puente de Brooklyn a pie (mejor temprano). Explora el barrio de DUMBO para la foto icónica y relájate en Williamsburg, la zona hipster.</li>
      <li style="margin-bottom:10px;"><strong>Día 4: El Pulmón Verde.</strong> Alquila una bici en Central Park. Es inmenso. Por la tarde, elige un museo de clase mundial: el MET (arte) o el Museo de Historia Natural (dinosaurios).</li>
      <li style="margin-bottom:10px;"><strong>Día 5: High Line y Hudson Yards.</strong> Camina por el High Line (un parque sobre antiguas vías de tren elevadas), come en Chelsea Market y termina viendo la arquitectura futurista de "The Vessel".</li>
    </ul>

    <div style="background-color:#E3F2FD;border-left:5px solid #0071BC;padding:20px;margin:30px 0;border-radius:8px;">
      <p style="color:#0071BC;font-weight:bold;margin:0;">💡 TIP NEW TRAVEL CLICK</p>
      <p style="margin-top:10px;">Recuerda sacar tu ESTA (visado) con tiempo. Y sobre todo: ¡La propina (Tip) es obligatoria! En restaurantes se espera entre un 18% y un 20%. Calcula este extra en tu presupuesto diario.</p>
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

// --- COMPONENTE LAYOUT (CON BARRA BLANCA SÓLIDA) ---
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
