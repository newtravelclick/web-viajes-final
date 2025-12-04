import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight, Calendar, MapPin, User, Mail, Phone as PhoneIcon, FolderOpen, Folder, 
  ArrowLeft, Sparkles, X, Send, Loader2, Globe, Utensils, Lightbulb, Clock, ShieldCheck, Heart, Headphones, Menu
} from 'lucide-react';
import { askTravelAssistant } from './geminiService';
import ReactMarkdown from 'react-markdown';

// --- ESTE ES TU CONTENIDO ORIGINAL EXACTO (RECUPERADO DE TU ARCHIVO) ---
const BLOG_CONTENT: Record<string, string> = {
  '1': `
    <h1>1. RUTA POR LA COSTA BRAVA: CALAS SECRETAS Y PUEBLOS DE PESCADORES</h1>
    <img src="https://images.unsplash.com/photo-1512413914633-b5043f4041ea?auto=format&fit=crop&w=1200&q=80" alt="Vista panorámica de la Costa Brava con mar turquesa y pinos" style="width: 100%; height: 400px; object-fit: cover; border-radius: 12px; margin: 25px 0;">
    <p class="intro" style="font-size: 1.1em; line-height: 1.6; color: #555; margin-bottom: 30px;">La Costa Brava no es solo un destino, es un estado de ánimo. Pinos que tocan el mar, aguas turquesas y una gastronomía que enamora. Aquí tienes tu hoja de ruta para 5 días inolvidables.</p>

    <h2 style="color: #0d6efd; margin-top: 40px;">🗺️ El Itinerario</h2>
    <ul style="list-style: none; padding-left: 0; line-height: 1.8;">
      <li style="margin-bottom: 15px;"><strong>Día 1: Blanes y Lloret.</strong> Aterrizaje suave. Empieza en el Jardín Botánico Marimurtra de Blanes para unas fotos de infarto. Termina el día en Cala Boadella, un oasis entre el turismo.</li>
      <li style="margin-bottom: 15px;"><strong>Día 2: Tossa de Mar.</strong> Sube a la Vila Vella (el único recinto medieval fortificado de la costa catalana) y baja a darte un chapuzón en Cala Pola.</li>
      <li style="margin-bottom: 15px;"><strong>Día 3: Palafrugell y Llafranc.</strong> Recorre el "Camí de Ronda" al amanecer. Es la esencia de la Costa Brava.</li>
      <li style="margin-bottom: 15px;"><strong>Día 4: Begur.</strong> El día de las joyas: Aiguablava, Sa Tuna y Platja Fonda. Aguas cristalinas garantizadas.</li>
      <li style="margin-bottom: 15px;"><strong>Día 5: Cadaqués.</strong> El pueblo de Dalí. Blanco, bohemio y rodeado por la naturaleza salvaje del Cap de Creus.</li>
    </ul>

    <h2 style="color: #0d6efd; margin-top: 40px;">🎒 Qué hacer (Imprescindibles)</h2>
    <ol style="line-height: 1.8; margin-bottom: 30px;">
      <li style="margin-bottom: 10px;"><strong>Caminar por los Caminos de Ronda:</strong> Son senderos que bordean el mar y conectan las playas. El tramo de Calella de Palafrugell a Llafranc es sencillo y precioso.</li>
      <li style="margin-bottom: 10px;"><strong>Visitar la Casa-Museo Salvador Dalí:</strong> En Portlligat (Cadaqués). Necesitas reservar con antelación, pero ver su estudio tal cual lo dejó es mágico.</li>
      <li style="margin-bottom: 10px;"><strong>Snorkel en las Islas Medas:</strong> Desde L'Estartit salen barcos con fondo de cristal o para hacer inmersiones. Es una reserva marina llena de vida.</li>
    </ol>

    <img src="https://images.unsplash.com/photo-1596541675765-a0f1d07ec656?auto=format&fit=crop&w=1200&q=80" alt="Pueblo blanco de Cadaqués con barcas en la orilla" style="width: 100%; height: auto; border-radius: 12px; margin: 25px 0;">

    <h2 style="color: #0d6efd; margin-top: 40px;">🍽️ Dónde comer</h2>
    <ul style="list-style-type: disc; padding-left: 20px; line-height: 1.8;">
      <li style="margin-bottom: 10px;"><strong>La Blava (Calella de Palafrugell):</strong> Para comer un arroz o pescado fresco casi con los pies en la arena.</li>
      <li style="margin-bottom: 10px;"><strong>Compartir (Cadaqués):</strong> De los creadores del famoso "El Bulli". Alta cocina en formato informal para compartir. Imprescindible reservar.</li>
      <li style="margin-bottom: 10px;"><strong>Can Rafa (Cadaqués):</strong> Mariscos frescos del día capturados por la familia propietaria.</li>
    </ul>

    <h2 style="color: #0d6efd; margin-top: 40px;">🚫 Lo que no te puedes perder</h2>
    <p>Ver amanecer desde el Faro del Cap de Creus. Es el punto más oriental de la península ibérica; serás la primera persona en ver salir el sol en España ese día.</p>

    <div style="background-color: #f0f7ff; border-left: 5px solid #0d6efd; padding: 20px; margin: 40px 0; border-radius: 8px;">
      <p style="margin: 0; font-weight: bold; color: #0d6efd; font-size: 1.1em;">💡 Consejo New Travel Click</p>
      <p style="margin-top: 10px; color: #333;">En verano, los parkings de las calas famosas se llenan a las 09:00 AM. Si quieres aparcar y tener sitio para la toalla, madruga. Si vas fuera de temporada (junio o septiembre), tendrás el paraíso para ti solo.</p>
    </div>

    <div style="text-align: center; margin: 50px 0 30px 0;">
      <a href="https://www.newtravelclick.com/" target="_blank" style="background-color: #0d6efd; color: #ffffff; padding: 18px 35px; text-decoration: none; font-family: sans-serif; font-weight: bold; font-size: 20px; border-radius: 50px; box-shadow: 0 5px 15px rgba(13, 110, 253, 0.3); transition: transform 0.2s ease; display: inline-block;">
        ✈️ RESERVA TU VIAJE EN NEW TRAVEL CLICK
      </a>
    </div>
  `,
  '2': `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #333; line-height: 1.6; max-width: 800px; margin: 0 auto;">

      <h1 style="color: #0d6efd; font-size: 2.5rem; margin-bottom: 20px;">Escapada Imperial: Praga y Budapest, Dos Joyas del Danubio</h1>

      <img src="https://images.unsplash.com/photo-1541849546-2165492d06d6?auto=format&fit=crop&w=1200&q=80" alt="Fotografía panorámica al atardecer del Parlamento de Budapest iluminado reflejándose en el río Danubio, estilo travel photography alta calidad" style="width: 100%; height: auto; border-radius: 12px; margin-bottom: 25px;">

      <p class="intro" style="font-size: 1.1rem; margin-bottom: 30px;">
        Dos capitales, un pasado imperial y una belleza que corta la respiración. Este itinerario conecta el romanticismo gótico de Praga con la majestuosidad de Budapest. Un viaje de cuento de hadas en el corazón de Europa.
      </p>

      <h2 style="color: #0d6efd; border-bottom: 2px solid #0d6efd; padding-bottom: 10px; margin-top: 40px;">🗺️ El Itinerario</h2>
      <ul style="list-style-type: none; padding-left: 0;">
        <li style="margin-bottom: 15px;"><strong>Día 1: Praga, la Ciudad Vieja.</strong> Aterrizaje y paseo por la Plaza de la Ciudad Vieja para ver el Reloj Astronómico. Cruza el Puente de Carlos al atardecer.</li>
        <li style="margin-bottom: 15px;"><strong>Día 2: El Castillo y Malá Strana.</strong> Sube al Castillo de Praga (el más grande del mundo) y baja callejeando por el barrio bohemio de Malá Strana.</li>
        <li style="margin-bottom: 15px;"><strong>Día 3: Rumbo a Budapest.</strong> Tren panorámico por la mañana. Llegada a Budapest y primera toma de contacto: crucero nocturno por el Danubio (imprescindible).</li>
        <li style="margin-bottom: 15px;"><strong>Día 4: Buda, la histórica.</strong> Sube al Bastión de los Pescadores y la Iglesia de Matías. Las vistas del Parlamento desde aquí son la postal del viaje.</li>
        <li style="margin-bottom: 15px;"><strong>Día 5: Pest y Relax Termal.</strong> Visita el Parlamento por dentro y termina el viaje relajándote en los Baños Széchenyi o Gellért.</li>
      </ul>

      <h2 style="color: #0d6efd; border-bottom: 2px solid #0d6efd; padding-bottom: 10px; margin-top: 40px;">🎒 Qué hacer (Imprescindibles)</h2>
      
      <img src="https://images.unsplash.com/photo-1565426873118-a17ed65d7429?auto=format&fit=crop&w=1200&q=80" alt="Primer plano de una persona sosteniendo un dulce Trdelník en una calle empedrada de Praga con gente desenfocada al fondo" style="width: 100%; height: auto; border-radius: 12px; margin: 25px 0;">

      <ol style="padding-left: 20px;">
        <li style="margin-bottom: 10px;"><strong>Madrugar en el Puente de Carlos:</strong> Si vas a las 7:00 AM, tendrás el puente solo para ti y las estatuas. Magia pura.</li>
        <li style="margin-bottom: 10px;"><strong>Baños Termales en Budapest:</strong> Es parte de su cultura. Juega al ajedrez dentro del agua caliente en Széchenyi.</li>
        <li style="margin-bottom: 10px;"><strong>Ruin Bars:</strong> En Budapest, toma algo en el Szimpla Kert, un bar construido en un edificio en ruinas decorado de forma ecléctica.</li>
      </ol>

      <h2 style="color: #0d6efd; border-bottom: 2px solid #0d6efd; padding-bottom: 10px; margin-top: 40px;">🍽️ Dónde comer</h2>
      <ul style="list-style-type: circle; padding-left: 20px;">
        <li style="margin-bottom: 10px;"><strong>New York Café (Budapest):</strong> Dicen que es la cafetería más bonita del mundo. Lujo y dorados para un café inolvidable.</li>
        <li style="margin-bottom: 10px;"><strong>Puestos Callejeros (Praga):</strong> Prueba el <em>Trdelník</em> (ese dulce en forma de chimenea) y las salchichas locales.</li>
        <li style="margin-bottom: 10px;"><strong>Menza (Budapest):</strong> Para probar un Goulash húngaro auténtico con un toque moderno.</li>
      </ul>

      <h2 style="color: #0d6efd; border-bottom: 2px solid #0d6efd; padding-bottom: 10px; margin-top: 40px;">🚫 Lo que no te puedes perder</h2>
      <p>Ver los <strong>Zapatos en la orilla del Danubio</strong> en Budapest. Un monumento sencillo pero estremecedor que te conecta con la historia judía de la ciudad.</p>

      <div style="background-color: #f0f7ff; border-left: 5px solid #0d6efd; padding: 20px; margin: 30px 0; border-radius: 5px;">
        <p style="margin: 0; font-weight: bold; color: #0d6efd;">💡 Consejo New Travel Click</p>
        <p style="margin: 10px 0 0 0;">Ojo con la moneda. Ninguna de las dos ciudades usa Euro (usan Coronas Checas y Florines Húngaros). Evita cambiar dinero en el aeropuerto; saca directamente de cajeros oficiales en la ciudad para mejor cambio.</p>
      </div>

      <div style="text-align: center; margin: 50px 0 30px 0;">
        <a href="https://www.newtravelclick.com/" target="_blank" style="background-color: #0d6efd; color: #ffffff; padding: 18px 35px; text-decoration: none; font-family: sans-serif; font-weight: bold; font-size: 20px; border-radius: 50px; box-shadow: 0 5px 15px rgba(13, 110, 253, 0.3); transition: transform 0.2s ease;">
          ✈️ RESERVA TU VIAJE EN NEW TRAVEL CLICK
        </a>
      </div>

    </div>
  `,
  '3': `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #333; line-height: 1.6; max-width: 800px; margin: 0 auto;">

      <h1 style="color: #0d6efd; font-size: 2.5rem; margin-bottom: 20px;">Japón Milenario: Un Viaje entre Templos y Neones</h1>

      <img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80" alt="Icónica vista de la Pagoda Chureito con el Monte Fuji de fondo y ramas de cerezo en flor, contraste de rojo y azul" style="width: 100%; height: auto; border-radius: 12px; margin-bottom: 25px;">

      <p class="intro" style="font-size: 1.1rem; margin-bottom: 30px;">
        Japón es el país donde el futuro convive con el pasado. En un mismo día puedes viajar en un tren bala a 300 km/h y meditar en un jardín zen de hace cinco siglos. Un choque cultural fascinante que te cambiará para siempre.
      </p>

      <h2 style="color: #0d6efd; border-bottom: 2px solid #0d6efd; padding-bottom: 10px; margin-top: 40px;">🗺️ El Itinerario</h2>
      <ul style="list-style-type: none; padding-left: 0;">
        <li style="margin-bottom: 15px;"><strong>Día 1: Tokio Eléctrico.</strong> Aterrizaje en la capital. Sumérgete en el caos organizado del cruce de Shibuya y las luces de neón infinitas de Shinjuku. Godzilla te espera.</li>
        <li style="margin-bottom: 15px;"><strong>Día 2: El Tokio Antiguo.</strong> Visita el templo Senso-ji en Asakusa (el más antiguo de Tokio) y pasea por el parque Ueno. Termina el día en Akihabara, la meca del anime y la electrónica.</li>
        <li style="margin-bottom: 15px;"><strong>Día 3: Kioto y las mil puertas.</strong> Tren bala (Shinkansen) hacia Kioto. Visita Fushimi Inari Taisha, el santuario de los miles de toriis rojos que suben la montaña.</li>
        <li style="margin-bottom: 15px;"><strong>Día 4: Bambú y Oro.</strong> Madruga para ver el Bosque de Bambú de Arashiyama sin gente. Después, deslúmbrate con el Kinkaku-ji (Pabellón Dorado) reflejado en su estanque.</li>
        <li style="margin-bottom: 15px;"><strong>Día 5: Nara y Osaka.</strong> Mañana en Nara dando de comer a los ciervos sagrados en libertad. Tarde-noche en Dotonbori (Osaka) para probar la mejor comida callejera bajo los neones.</li>
      </ul>

      <h2 style="color: #0d6efd; border-bottom: 2px solid #0d6efd; padding-bottom: 10px; margin-top: 40px;">🎒 Qué hacer (Imprescindibles)</h2>
      
      <img src="https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80" alt="Callejón nocturno en Tokio iluminado por neones y farolillos rojos con gente comiendo en puestos callejeros (Izakaya)" style="width: 100%; height: auto; border-radius: 12px; margin: 25px 0;">

      <ol style="padding-left: 20px;">
        <li style="margin-bottom: 10px;"><strong>Baño en un Onsen:</strong> Supera la timidez y prueba los baños termales tradicionales (desnudos y separados por sexos). Es la relajación absoluta.</li>
        <li style="margin-bottom: 10px;"><strong>Noche de Karaoke:</strong> Alquila una sala privada en Tokio y canta hasta quedarte afónico. Es una institución nacional.</li>
        <li style="margin-bottom: 10px;"><strong>Dormir en un Ryokan:</strong> Pasa al menos una noche en un alojamiento tradicional con suelo de tatami y futón.</li>
      </ol>

      <h2 style="color: #0d6efd; border-bottom: 2px solid #0d6efd; padding-bottom: 10px; margin-top: 40px;">🍽️ Dónde comer</h2>
      <ul style="list-style-type: circle; padding-left: 20px;">
        <li style="margin-bottom: 10px;"><strong>Ichiran Ramen (Cualquier ciudad):</strong> Una experiencia única donde comes ramen en una cabina individual sin interactuar con nadie. El sabor es perfecto.</li>
        <li style="margin-bottom: 10px;"><strong>Mercado de Tsukiji (Tokio):</strong> Aunque la subasta se mudó, el mercado exterior sigue teniendo el sushi más fresco para desayunar.</li>
        <li style="margin-bottom: 10px;"><strong>Puestos de Takoyaki (Osaka):</strong> Bolitas de pulpo caliente con salsa. Cuidado, ¡queman mucho por dentro!</li>
      </ul>

      <h2 style="color: #0d6efd; border-bottom: 2px solid #0d6efd; padding-bottom: 10px; margin-top: 40px;">🚫 Lo que no te puedes perder</h2>
      <p>El barrio de <strong>Gion en Kioto</strong> al atardecer. Si tienes suerte y eres respetuoso, podrás ver pasar a una Geisha o Maiko camino a una cita. Es como viajar 300 años atrás en el tiempo.</p>

      <div style="background-color: #f0f7ff; border-left: 5px solid #0d6efd; padding: 20px; margin: 30px 0; border-radius: 5px;">
        <p style="margin: 0; font-weight: bold; color: #0d6efd;">💡 Consejo New Travel Click</p>
        <p style="margin: 10px 0 0 0;">En Japón no se deja propina (se considera ofensivo) y no se habla por teléfono en los trenes. La etiqueta y el respeto al prójimo son sagrados. ¡Lleva calcetines limpios y sin agujeros, te descalzarás mucho!</p>
      </div>

      <div style="text-align: center; margin: 50px 0 30px 0;">
        <a href="https://www.newtravelclick.com/" target="_blank" style="background-color: #0d6efd; color: #ffffff; padding: 18px 35px; text-decoration: none; font-family: sans-serif; font-weight: bold; font-size: 20px; border-radius: 50px; box-shadow: 0 5px 15px rgba(13, 110, 253, 0.3); transition: transform 0.2s ease;">
          ✈️ RESERVA TU VIAJE EN NEW TRAVEL CLICK
        </a>
      </div>

    </div>
  `,
  '4': `
    <h1>2. ANDALUCÍA EN RUTA: SOL, ARTE Y DUENDE</h1>
    <img src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=1200&q=80" alt="La Alhambra de Granada al atardecer con Sierra Nevada al fondo" style="width: 100%; height: 400px; object-fit: cover; border-radius: 12px; margin: 25px 0;">
    <p class="intro" style="font-size: 1.1em; line-height: 1.6; color: #555; margin-bottom: 30px;">Un viaje que despierta los sentidos. Desde la grandiosidad de la Alhambra hasta el olor a azahar de Sevilla. Esta ruta del "Triángulo de Oro" es un clásico que nunca falla.</p>

    <h2 style="color: #0d6efd; margin-top: 40px;">🗺️ El Itinerario</h2>
    <ul style="list-style: none; padding-left: 0; line-height: 1.8;">
      <li style="margin-bottom: 15px;"><strong>Día 1: Sevilla Clásica.</strong> Catedral, Giralda y Real Alcázar. Noche de tapas por el barrio de Santa Cruz.</li>
      <li style="margin-bottom: 15px;"><strong>Día 2: Sevilla Moderna.</strong> Plaza de España (de cine) y atardecer en las "Setas" de la Encarnación.</li>
      <li style="margin-bottom: 15px;"><strong>Día 3: Córdoba.</strong> Tren o coche temprano. Visita a la Mezquita-Catedral y los Patios de Córdoba llenos de flores.</li>
      <li style="margin-bottom: 15px;"><strong>Día 4: Granada.</strong> La Alhambra (reserva con meses de antelación). Paseo por el Paseo de los Tristes a los pies de la fortaleza.</li>
      <li style="margin-bottom: 15px;"><strong>Día 5: Málaga.</strong> Un final relajado frente al mar, visitando el teatro romano y el puerto.</li>
    </ul>

    <h2 style="color: #0d6efd; margin-top: 40px;">🎒 Qué hacer (Imprescindibles)</h2>
    <ol style="line-height: 1.8; margin-bottom: 30px;">
      <li style="margin-bottom: 10px;"><strong>Espectáculo de Flamenco:</strong> En el barrio de Triana (Sevilla) o en las cuevas del Sacromonte (Granada). Busca los locales pequeños y familiares ("tablaos"), huye de los grandes shows para turistas.</li>
      <li style="margin-bottom: 10px;"><strong>Baños Árabes (Hammam):</strong> En Córdoba o Granada. Una experiencia relajante de agua y masaje tras un día de caminata.</li>
      <li style="margin-bottom: 10px;"><strong>Museo Picasso en Málaga:</strong> Una colección íntima en la ciudad natal del pintor.</li>
    </ol>

    <img src="https://images.unsplash.com/photo-1549271509-54876b059346?auto=format&fit=crop&w=1200&q=80" alt="Patio andaluz en Córdoba lleno de flores coloridas" style="width: 100%; height: auto; border-radius: 12px; margin: 25px 0;">

    <h2 style="color: #0d6efd; margin-top: 40px;">🍽️ Dónde comer</h2>
    <ul style="list-style-type: disc; padding-left: 20px; line-height: 1.8;">
      <li style="margin-bottom: 10px;"><strong>El Pimpi (Málaga):</strong> Una bodega legendaria. Pide vino dulce y jamón.</li>
      <li style="margin-bottom: 10px;"><strong>Casa Pepe de la Judería (Córdoba):</strong> Prueba el "Salmorejo Cordobés" y las "Berenjenas con miel".</li>
      <li style="margin-bottom: 10px;"><strong>Calle Navas (Granada):</strong> Aquí se practica el arte del "tapeo" (con cada bebida, una tapa gratis).</li>
    </ul>

    <h2 style="color: #0d6efd; margin-top: 40px;">🚫 Lo que no te puedes perder</h2>
    <p>El atardecer en el Mirador de San Nicolás (Granada). Ver cómo el sol tiñe de rojo la Alhambra con Sierra Nevada de fondo es, posiblemente, la vista más bonita de España.</p>

    <div style="background-color: #f0f7ff; border-left: 5px solid #0d6efd; padding: 20px; margin: 40px 0; border-radius: 8px;">
      <p style="margin: 0; font-weight: bold; color: #0d6efd; font-size: 1.1em;">💡 Consejo New Travel Click</p>
      <p style="margin-top: 10px; color: #333;">Andalucía en julio y agosto puede superar los 40°C. Organiza tus visitas a monumentos a primera hora de la mañana (09:00h) y deja las tardes para museos con aire acondicionado o paseos nocturnos. ¡La siesta aquí es una necesidad, no un capricho!</p>
    </div>

    <div style="text-align: center; margin: 50px 0 30px 0;">
      <a href="https://www.newtravelclick.com/" target="_blank" style="background-color: #0d6efd; color: #ffffff; padding: 18px 35px; text-decoration: none; font-family: sans-serif; font-weight: bold; font-size: 20px; border-radius: 50px; box-shadow: 0 5px 15px rgba(13, 110, 253, 0.3); transition: transform 0.2s ease; display: inline-block;">
        ✈️ RESERVA TU VIAJE EN NEW TRAVEL CLICK
      </a>
    </div>
  `,
  '5': `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #333; line-height: 1.6; max-width: 800px; margin: 0 auto;">

  <h1 style="color: #0d6efd; font-size: 2.5rem; margin-bottom: 20px;">Fiordos Noruegos: Donde la Naturaleza Reina</h1>

  <img src="https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?auto=format&fit=crop&w=1200&q=80" alt="Paisaje épico de un fiordo noruego con aguas azules profundas, montañas verdes verticales y un pequeño ferry navegando, día soleado" style="width: 100%; height: auto; border-radius: 12px; margin-bottom: 25px;">

  <p class="intro" style="font-size: 1.1rem; margin-bottom: 30px;">
    Cascadas que caen al mar, trenes que desafían la gravedad y un silencio que cura. Noruega ofrece uno de los paisajes más espectaculares del planeta. Prepárate para respirar el aire más puro de tu vida.
  </p>

  <h2 style="color: #0d6efd; border-bottom: 2px solid #0d6efd; padding-bottom: 10px; margin-top: 40px;">🗺️ El Itinerario</h2>
  <ul style="list-style-type: none; padding-left: 0;">
    <li style="margin-bottom: 15px;"><strong>Día 1: Bergen.</strong> La puerta de los fiordos. Pasea por el muelle hanseático de Bryggen (casas de madera de colores) y sube en funicular al monte Fløyen.</li>
    <li style="margin-bottom: 15px;"><strong>Día 2: El Tren de Flåm.</strong> Uno de los trayectos en tren más bonitos del mundo. De Myrdal a Flåm, pasando por cascadas y valles profundos.</li>
    <li style="margin-bottom: 15px;"><strong>Día 3: Naeroyfjord.</strong> Navega por el fiordo más estrecho y espectacular, Patrimonio de la Humanidad. Las paredes de roca parecen tocar el barco.</li>
    <li style="margin-bottom: 15px;"><strong>Día 4: Mirador Stegastein.</strong> Una plataforma de madera y cristal suspendida a 650 metros sobre el fiordo de Aurland. Vértigo y belleza.</li>
    <li style="margin-bottom: 15px;"><strong>Día 5: Stavanger o Regreso.</strong> Si tienes tiempo, baja a Stavanger para subir al famoso "Púlpito" (Preikestolen), o disfruta de la tranquilidad escandinava antes de volver.</li>
  </ul>

  <h2 style="color: #0d6efd; border-bottom: 2px solid #0d6efd; padding-bottom: 10px; margin-top: 40px;">🎒 Qué hacer (Imprescindibles)</h2>
  
  <img src="https://images.unsplash.com/photo-1520633908316-6415e982d61d?auto=format&fit=crop&w=1200&q=80" alt="Vista desde la ventana del tren de Flam mostrando un valle verde frondoso y una cascada potente" style="width: 100%; height: auto; border-radius: 12px; margin: 25px 0;">

  <ol style="padding-left: 20px;">
    <li style="margin-bottom: 10px;"><strong>Mercado de Pescado de Bergen:</strong> Aunque es turístico, ver el producto fresco del Mar del Norte es un espectáculo.</li>
    <li style="margin-bottom: 10px;"><strong>Safari en Lancha Rápida (RIB):</strong> Para ver los fiordos desde el agua sintiendo la velocidad y acercándote a las cascadas.</li>
    <li style="margin-bottom: 10px;"><strong>Senderismo:</strong> No hace falta ser un experto. Hay rutas sencillas alrededor de cualquier pueblo con vistas de millón de dólares.</li>
  </ol>

  <h2 style="color: #0d6efd; border-bottom: 2px solid #0d6efd; padding-bottom: 10px; margin-top: 40px;">🍽️ Dónde comer</h2>
  <ul style="list-style-type: circle; padding-left: 20px;">
    <li style="margin-bottom: 10px;"><strong>Bryggeloftet & Stuene (Bergen):</strong> Platos tradicionales noruegos. Pide la sopa de pescado (Fiskesuppe) o carne de reno.</li>
    <li style="margin-bottom: 10px;"><strong>Ægir BrewPub (Flåm):</strong> Una cervecería vikinga espectacular con chimenea central. La comida es contundente y deliciosa.</li>
    <li style="margin-bottom: 10px;"><strong>Salmón en cualquier lugar:</strong> Estás en Noruega. El salmón ahumado o a la parrilla es superior aquí.</li>
  </ul>

  <h2 style="color: #0d6efd; border-bottom: 2px solid #0d6efd; padding-bottom: 10px; margin-top: 40px;">🚫 Lo que no te puedes perder</h2>
  <p>La sensación de pequeñez al navegar por el <strong>Sognefjord</strong> (el fiordo de los Sueños). Es el más largo y profundo de Noruega. Te cambiará la perspectiva.</p>

  <div style="background-color: #f0f7ff; border-left: 5px solid #0d6efd; padding: 20px; margin: 30px 0; border-radius: 5px;">
    <p style="margin: 0; font-weight: bold; color: #0d6efd;">💡 Consejo New Travel Click</p>
    <p style="margin: 10px 0 0 0;">El clima noruego es impredecible incluso en verano. Viste siempre por capas ("teoría de la cebolla") y lleva un chubasquero de calidad. ¡No dejes que la lluvia te pare!</p>
  </div>

  <div style="text-align: center; margin: 50px 0 30px 0;">
    <a href="https://www.newtravelclick.com/" target="_blank" style="background-color: #0d6efd; color: #ffffff; padding: 18px 35px; text-decoration: none; font-family: sans-serif; font-weight: bold; font-size: 20px; border-radius: 50px; box-shadow: 0 5px 15px rgba(13, 110, 253, 0.3); transition: transform 0.2s ease;">
      ✈️ RESERVA TU VIAJE EN NEW TRAVEL CLICK
    </a>
  </div>

</div>
  `,
  '6': `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #333; line-height: 1.6; max-width: 800px; margin: 0 auto;">

  <h1 style="color: #0d6efd; font-size: 2.5rem; margin-bottom: 20px;">Safari Kenia y Tanzania: En Busca de los Cinco Grandes</h1>

  <img src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80" alt="Paisaje de la sabana africana al atardecer con siluetas de acacias y un grupo de elefantes caminando en fila" style="width: 100%; height: auto; border-radius: 12px; margin-bottom: 25px;">

  <p class="intro" style="font-size: 1.1rem; margin-bottom: 30px;">
    No es un zoológico, es la vida real en su estado más puro. Recorrer la sabana infinita, ver amanecer bajo el Kilimanjaro y sentir la tierra vibrar con la Gran Migración es una experiencia que te cambia el alma. Bienvenidos al corazón de África.
  </p>

  <h2 style="color: #0d6efd; border-bottom: 2px solid #0d6efd; padding-bottom: 10px; margin-top: 40px;">🗺️ El Itinerario</h2>
  <ul style="list-style-type: none; padding-left: 0;">
    <li style="margin-bottom: 15px;"><strong>Día 1: Nairobi y las Jirafas.</strong> Aterrizaje en Kenia. Visita el orfanato de elefantes David Sheldrick y alimenta a las jirafas en el Giraffe Centre. Una toma de contacto tierna antes de la acción.</li>
    <li style="margin-bottom: 15px;"><strong>Día 2: Masai Mara (Kenia).</strong> Viaje a la reserva más famosa. Primer "Game Drive" (safari en 4x4) para buscar leones, guepardos y leopardos. Si es temporada, verás cruzar el río Mara a miles de ñus.</li>
    <li style="margin-bottom: 15px;"><strong>Día 3: Rumbo al Serengeti (Tanzania).</strong> Cruzamos la frontera. El paisaje cambia a llanuras interminables ("Serengeti" significa "llanura sin fin"). Aquí la densidad de depredadores es asombrosa.</li>
    <li style="margin-bottom: 15px;"><strong>Día 4: Amanecer en la Sabana.</strong> Día completo de rastreo. Busca a los "Cinco Grandes" (León, Leopardo, Elefante, Rinoceronte y Búfalo). Noche bajo un manto de estrellas que no existe en ningún otro lugar.</li>
    <li style="margin-bottom: 15px;"><strong>Día 5: Cráter del Ngorongoro.</strong> El "Jardín del Edén". Un volcán colapsado que alberga un ecosistema único con miles de animales atrapados en sus paredes verdes. Es el mejor lugar para ver rinocerontes negros.</li>
  </ul>

  <h2 style="color: #0d6efd; border-bottom: 2px solid #0d6efd; padding-bottom: 10px; margin-top: 40px;">🎒 Qué hacer (Imprescindibles)</h2>
  
  <img src="https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&w=1200&q=80" alt="Primer plano de un león macho descansando sobre una roca en el Serengeti mirando majestuosamente a la cámara" style="width: 100%; height: auto; border-radius: 12px; margin: 25px 0;">

  <ol style="padding-left: 20px;">
    <li style="margin-bottom: 10px;"><strong>Safari en Globo:</strong> Sobrevuela el Masai Mara al amanecer. Ver la fauna desde el aire en silencio total es una experiencia VIP inolvidable.</li>
    <li style="margin-bottom: 10px;"><strong>Visita a un poblado Masái:</strong> Conoce su cultura, sus bailes tradicionales (los saltos altos) y cómo conviven con la fauna salvaje.</li>
    <li style="margin-bottom: 10px;"><strong>Sundowner:</strong> La tradición del safari. Parar el 4x4 en medio de la nada al atardecer para tomar una copa ("gin tonic" o cerveza) mientras se pone el sol.</li>
  </ol>

  <h2 style="color: #0d6efd; border-bottom: 2px solid #0d6efd; padding-bottom: 10px; margin-top: 40px;">🍽️ Dónde comer</h2>
  <ul style="list-style-type: circle; padding-left: 20px;">
    <li style="margin-bottom: 10px;"><strong>The Carnivore (Nairobi):</strong> Un restaurante legendario para los amantes de la carne. Todo se hace a la brasa en espadas masái.</li>
    <li style="margin-bottom: 10px;"><strong>Bush Dinner (En los Lodges):</strong> Cena privada montada en mitad de la sabana, iluminada solo por fuego y velas. Romántico y salvaje.</li>
    <li style="margin-bottom: 10px;"><strong>Gibbs Farm (Cerca de Ngorongoro):</strong> Comida orgánica increíble, cultivada en su propia granja, para descansar de la comida de campamento.</li>
  </ul>

  <h2 style="color: #0d6efd; border-bottom: 2px solid #0d6efd; padding-bottom: 10px; margin-top: 40px;">🚫 Lo que no te puedes perder</h2>
  <p>La <strong>Gran Migración</strong> (entre julio y octubre). Ver a más de un millón de ñus y cebras moviéndose juntos, perseguidos por cocodrilos y felinos, es el mayor espectáculo natural de la Tierra.</p>

  <div style="background-color: #f0f7ff; border-left: 5px solid #0d6efd; padding: 20px; margin: 30px 0; border-radius: 5px;">
    <p style="margin: 0; font-weight: bold; color: #0d6efd;">💡 Consejo New Travel Click</p>
    <p style="margin: 10px 0 0 0;">Viste con colores neutros (caqui, verde oliva, beige). Evita el azul oscuro y el negro, ya que atraen a la mosca tsetsé. Y no olvides unos buenos prismáticos; la diferencia entre ver una mancha y ver un leopardo está en la óptica.</p>
  </div>

  <div style="text-align: center; margin: 50px 0 30px 0;">
    <a href="https://www.newtravelclick.com/" target="_blank" style="background-color: #0d6efd; color: #ffffff; padding: 18px 35px; text-decoration: none; font-family: sans-serif; font-weight: bold; font-size: 20px; border-radius: 50px; box-shadow: 0 5px 15px rgba(13, 110, 253, 0.3); transition: transform 0.2s ease;">
      ✈️ RESERVA TU VIAJE EN NEW TRAVEL CLICK
    </a>
  </div>

</div>
  `,
  '7': `
    <h1>3. NORTE DE ESPAÑA: GASTRONOMÍA Y PAISAJE VERDE</h1>
    <img src="https://images.unsplash.com/photo-1598453414998-333e6669865a?auto=format&fit=crop&w=1200&q=80" alt="Playa de la Concha en San Sebastián con vistas al monte Igueldo" style="width: 100%; height: 400px; object-fit: cover; border-radius: 12px; margin: 25px 0;">
    <p class="intro" style="font-size: 1.1em; line-height: 1.6; color: #555; margin-bottom: 30px;">Si te gusta comer bien y los paisajes que parecen Suiza pero con mar, esta ruta por Euskadi y Cantabria es para ti. Prepara el apetito.</p>

    <h2 style="color: #0d6efd; margin-top: 40px;">🗺️ El Itinerario</h2>
    <ul style="list-style: none; padding-left: 0; line-height: 1.8;">
      <li style="margin-bottom: 15px;"><strong>Día 1: San Sebastián (Donostia).</strong> Paseo por la playa de La Concha y subida al Monte Igueldo. Cena de Pintxos.</li>
      <li style="margin-bottom: 15px;"><strong>Día 2: Costa Vasca.</strong> Hondarribia (pueblo pesquero colorido) y Zarautz (cuna de surfistas).</li>
      <li style="margin-bottom: 15px;"><strong>Día 3: Getaria y Bilbao.</strong> Visita una bodega de Txakoli en Getaria. Tarde de arquitectura con el Guggenheim en Bilbao.</li>
      <li style="margin-bottom: 15px;"><strong>Día 4: Santoña y Costa Cántabra.</strong> Cruza a Cantabria. Para en Santoña para comprar las mejores anchoas del mundo.</li>
      <li style="margin-bottom: 15px;"><strong>Día 5: Santander y Santillana del Mar.</strong> La elegancia de la bahía de Santander y el viaje medieval en Santillana.</li>
    </ul>

    <h2 style="color: #0d6efd; margin-top: 40px;">🎒 Qué hacer (Imprescindibles)</h2>
    <ol style="line-height: 1.8; margin-bottom: 30px;">
      <li style="margin-bottom: 10px;"><strong>Ruta de Pintxos en la Parte Vieja (Donostia):</strong> No es comer, es un ritual. Entra, pide un vino (zurito o txakoli) y un pintxo, come y cambia de bar.</li>
      <li style="margin-bottom: 10px;"><strong>Visitar el Puente Colgante de Bizkaia:</strong> Patrimonio de la Humanidad, una estructura de hierro impresionante cerca de Bilbao.</li>
      <li style="margin-bottom: 10px;"><strong>Cueva de El Soplao (Cantabria):</strong> Una cavidad única en el mundo por sus formaciones geológicas excéntricas.</li>
    </ol>

    <img src="https://images.unsplash.com/photo-1560410757-5e6082470719?auto=format&fit=crop&w=1200&q=80" alt="Museo Guggenheim Bilbao arquitectura moderna titanio" style="width: 100%; height: auto; border-radius: 12px; margin: 25px 0;">

    <h2 style="color: #0d6efd; margin-top: 40px;">🍽️ Dónde comer</h2>
    <ul style="list-style-type: disc; padding-left: 20px; line-height: 1.8;">
      <li style="margin-bottom: 10px;"><strong>Asador Etxebarri o Elkano (Cerca de Bilbao/Getaria):</strong> Si tienes presupuesto alto, son templos mundiales de la parrilla.</li>
      <li style="margin-bottom: 10px;"><strong>Restaurante La Bombi (Santander):</strong> Pescado y marisco de calidad suprema en un ambiente tradicional.</li>
      <li style="margin-bottom: 10px;"><strong>Cualquier bar de la calle 31 de Agosto (Donostia):</strong> Prueba la tarta de queso de "La Viña". Es mundialmente famosa.</li>
    </ul>

    <h2 style="color: #0d6efd; margin-top: 40px;">🚫 Lo que no te puedes perder</h2>
    <p>Sentarte en un banco en los Jardines de Pereda en Santander mirando a la bahía con un helado de Regma, o ver el atardecer desde el Peine del Viento en San Sebastián escuchando el mar rugir bajo las esculturas.</p>

    <div style="background-color: #f0f7ff; border-left: 5px solid #0d6efd; padding: 20px; margin: 40px 0; border-radius: 8px;">
      <p style="margin: 0; font-weight: bold; color: #0d6efd; font-size: 1.1em;">💡 Consejo New Travel Click</p>
      <p style="margin-top: 10px; color: #333;">En el norte el clima cambia en minutos ("Orbayu" o "Sirimiri"). Lleva siempre un chubasquero ligero y calzado cómodo que no resbale. Y recuerda: las raciones de comida en el norte son muy generosas. ¡Cuidado al pedir!</p>
    </div>

    <div style="text-align: center; margin: 50px 0 30px 0;">
      <a href="https://www.newtravelclick.com/" target="_blank" style="background-color: #0d6efd; color: #ffffff; padding: 18px 35px; text-decoration: none; font-family: sans-serif; font-weight: bold; font-size: 20px; border-radius: 50px; box-shadow: 0 5px 15px rgba(13, 110, 253, 0.3); transition: transform 0.2s ease; display: inline-block;">
        ✈️ RESERVA TU VIAJE EN NEW TRAVEL CLICK
      </a>
    </div>
  `,
  '8': `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #333; line-height: 1.6; max-width: 800px; margin: 0 auto;">

  <h1 style="color: #0d6efd; font-size: 2.5rem; margin-bottom: 20px;">La Toscana: Ruta entre Viñedos y Renacimiento</h1>

  <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80" alt="Paisaje de la Toscana con colinas verdes suaves, caminos de cipreses y una villa de piedra antigua al fondo bajo una luz dorada" style="width: 100%; height: auto; border-radius: 12px; margin-bottom: 25px;">

  <p class="intro" style="font-size: 1.1rem; margin-bottom: 30px;">
    La "Dolce Vita" existe y está en la Toscana. Un viaje por carretera a través de colinas doradas, cipreses infinitos, el mejor vino del mundo y ciudades que son museos al aire libre.
  </p>

  <h2 style="color: #0d6efd; border-bottom: 2px solid #0d6efd; padding-bottom: 10px; margin-top: 40px;">🗺️ El Itinerario</h2>
  <ul style="list-style-type: none; padding-left: 0;">
    <li style="margin-bottom: 15px;"><strong>Día 1: Florencia, la cuna del arte.</strong> El Duomo, el Ponte Vecchio y la Galería Uffizi. Florencia se camina y se admira en cada esquina.</li>
    <li style="margin-bottom: 15px;"><strong>Día 2: El David y el Oltrarno.</strong> Visita la Galería de la Academia para ver al David de Miguel Ángel. Por la tarde, cruza el río hacia el barrio artesano del Oltrarno.</li>
    <li style="margin-bottom: 15px;"><strong>Día 3: Ruta del Chianti.</strong> Alquila un coche y piérdete por la carretera SR222. Parada obligatoria en Greve in Chianti y visita a una bodega local.</li>
    <li style="margin-bottom: 15px;"><strong>Día 4: Siena y San Gimignano.</strong> La Piazza del Campo en Siena (quizás la plaza más bonita de Italia) y las torres medievales de San Gimignano por la tarde.</li>
    <li style="margin-bottom: 15px;"><strong>Día 5: Val d'Orcia.</strong> El paisaje de postal. Pienza, Montalcino y colinas que parecen pintadas a mano.</li>
  </ul>

  <h2 style="color: #0d6efd; border-bottom: 2px solid #0d6efd; padding-bottom: 10px; margin-top: 40px;">🎒 Qué hacer (Imprescindibles)</h2>
  
  <img src="https://images.unsplash.com/photo-1596700877903-88849646c10e?auto=format&fit=crop&w=1200&q=80" alt="Dos copas de vino tinto Chianti sobre una mesa de madera con vistas a un viñedo al atardecer" style="width: 100%; height: auto; border-radius: 12px; margin: 25px 0;">

  <ol style="padding-left: 20px;">
    <li style="margin-bottom: 10px;"><strong>Cata de Vinos:</strong> No puedes irte sin probar un Chianti Classico o un Brunello di Montalcino en su lugar de origen.</li>
    <li style="margin-bottom: 10px;"><strong>Atardecer en Piazzale Michelangelo:</strong> Sube a este mirador en Florencia con música en directo y la mejor vista de la ciudad.</li>
    <li style="margin-bottom: 10px;"><strong>Comer un Gelato:</strong> En San Gimignano está la heladería Dondoli, campeona del mundo varias veces.</li>
  </ol>

  <h2 style="color: #0d6efd; border-bottom: 2px solid #0d6efd; padding-bottom: 10px; margin-top: 40px;">🍽️ Dónde comer</h2>
  <ul style="list-style-type: circle; padding-left: 20px;">
    <li style="margin-bottom: 10px;"><strong>Trattoria ZaZa (Florencia):</strong> Un clásico para probar la famosa <em>Bistecca alla Fiorentina</em> (chuletón gigante).</li>
    <li style="margin-bottom: 10px;"><strong>Osteria Le Logge (Siena):</strong> Comida toscana refinada a pocos pasos de la plaza principal.</li>
    <li style="margin-bottom: 10px;"><strong>All'Antico Vinaio (Florencia):</strong> Los bocadillos (schiacciata) más famosos de internet. Hay cola, pero merece la pena.</li>
  </ul>

  <h2 style="color: #0d6efd; border-bottom: 2px solid #0d6efd; padding-bottom: 10px; margin-top: 40px;">🚫 Lo que no te puedes perder</h2>
  <p>La atmósfera medieval de <strong>San Gimignano</strong> al caer la noche. Cuando los autobuses de turistas se van, el "Manhattan medieval" se vuelve silencioso y místico.</p>

  <div style="background-color: #f0f7ff; border-left: 5px solid #0d6efd; padding: 20px; margin: 30px 0; border-radius: 5px;">
    <p style="margin: 0; font-weight: bold; color: #0d6efd;">💡 Consejo New Travel Click</p>
    <p style="margin: 10px 0 0 0;">Si alquilas coche, ¡cuidado con las ZTL (Zonas de Tráfico Limitado)! Están en el centro de casi todos los pueblos y ciudades. Si entras sin permiso, la multa te llegará a casa meses después.</p>
  </div>

  <div style="text-align: center; margin: 50px 0 30px 0;">
    <a href="https://www.newtravelclick.com/" target="_blank" style="background-color: #0d6efd; color: #ffffff; padding: 18px 35px; text-decoration: none; font-family: sans-serif; font-weight: bold; font-size: 20px; border-radius: 50px; box-shadow: 0 5px 15px rgba(13, 110, 253, 0.3); transition: transform 0.2s ease;">
      ✈️ RESERVA TU VIAJE EN NEW TRAVEL CLICK
    </a>
  </div>

</div>
  `,
  '9': `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #333; line-height: 1.6; max-width: 800px; margin: 0 auto;">

  <h1 style="color: #0d6efd; font-size: 2.5rem; margin-bottom: 20px;">Nueva York: Guía de la Ciudad que Nunca Duerme</h1>

  <img src="https://images.unsplash.com/photo-1496442226666-8d4a0e62e6e9?auto=format&fit=crop&w=1200&q=80" alt="Skyline de Manhattan al atardecer visto desde Brooklyn, con los rascacielos iluminándose y el cielo en tonos naranjas y púrpuras" style="width: 100%; height: auto; border-radius: 12px; margin-bottom: 25px;">

  <p class="intro" style="font-size: 1.1rem; margin-bottom: 30px;">
    Es el escenario de mil películas y el centro del mundo moderno. Nueva York es energía pura, rascacielos que tocan las nubes y una mezcla cultural infinita. Prepárate para caminar mucho, mirar hacia arriba y sentirte el protagonista de tu propia serie.
  </p>

  <h2 style="color: #0d6efd; border-bottom: 2px solid #0d6efd; padding-bottom: 10px; margin-top: 40px;">🗺️ El Itinerario</h2>
  <ul style="list-style-type: none; padding-left: 0;">
    <li style="margin-bottom: 15px;"><strong>Día 1: Midtown y Luces.</strong> Empieza fuerte: Times Square, Bryant Park y la Grand Central Terminal. Sube al atardecer al <em>Top of the Rock</em> para ver el Empire State iluminado frente a ti.</li>
    <li style="margin-bottom: 15px;"><strong>Día 2: Libertad y Finanzas.</strong> Ferry a la Estatua de la Libertad por la mañana. Pasea por Wall Street (toca el toro para la buena suerte) y reflexiona en el Memorial del 9/11.</li>
    <li style="margin-bottom: 15px;"><strong>Día 3: Cruzando el Puente.</strong> Cruza el Puente de Brooklyn a pie (mejor temprano). Explora el barrio de DUMBO para la foto icónica y relájate en Williamsburg, la zona hipster.</li>
    <li style="margin-bottom: 15px;"><strong>Día 4: El Pulmón Verde.</strong> Alquila una bici en Central Park. Es inmenso. Por la tarde, elige un museo de clase mundial: el MET (arte) o el Museo de Historia Natural (dinosaurios).</li>
    <li style="margin-bottom: 15px;"><strong>Día 5: High Line y Hudson Yards.</strong> Camina por el High Line (un parque sobre antiguas vías de tren elevadas), come en Chelsea Market y termina viendo la arquitectura futurista de "The Vessel".</li>
  </ul>

  <h2 style="color: #0d6efd; border-bottom: 2px solid #0d6efd; padding-bottom: 10px; margin-top: 40px;">🎒 Qué hacer (Imprescindibles)</h2>
  
  <img src="https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?auto=format&fit=crop&w=1200&q=80" alt="Vista icónica del Puente de Brooklyn desde el barrio de DUMBO con edificios de ladrillo rojo a los lados" style="width: 100%; height: auto; border-radius: 12px; margin: 25px 0;">

  <ol style="padding-left: 20px;">
    <li style="margin-bottom: 10px;"><strong>Un Musical en Broadway:</strong> Aunque no sepas inglés perfecto, ver "El Rey León" o "Aladdin" en Nueva York es una experiencia visual de otro nivel.</li>
    <li style="margin-bottom: 10px;"><strong>Summit One Vanderbilt:</strong> Es el mirador de moda. Todo es de cristal y espejos. Las fotos aquí son espectaculares y la experiencia es muy inmersiva.</li>
    <li style="margin-bottom: 10px;"><strong>Misa Gospel en Harlem:</strong> Si estás un domingo, acércate a una iglesia en Harlem. La energía y la música te pondrán la piel de gallina (sé siempre respetuoso, es un acto religioso).</li>
  </ol>

  <h2 style="color: #0d6efd; border-bottom: 2px solid #0d6efd; padding-bottom: 10px; margin-top: 40px;">🍽️ Dónde comer</h2>
  <ul style="list-style-type: circle; padding-left: 20px;">
    <li style="margin-bottom: 10px;"><strong>Katz's Delicatessen:</strong> El lugar donde Harry conoció a Sally. Pide el sándwich de pastrami (es enorme, mejor compartir).</li>
    <li style="margin-bottom: 10px;"><strong>Joe's Pizza (Greenwich Village):</strong> La auténtica "New York Slice". Barata, fina, crujiente y deliciosa. Se come de pie.</li>
    <li style="margin-bottom: 10px;"><strong>Ellen's Stardust Diner:</strong> Una hamburguesería cerca de Broadway donde los camareros son cantantes aspirantes a estrellas. Muy turístico, pero muy divertido.</li>
  </ul>

  <h2 style="color: #0d6efd; border-bottom: 2px solid #0d6efd; padding-bottom: 10px; margin-top: 40px;">🚫 Lo que no te puedes perder</h2>
  <p>Ver el atardecer desde <strong>Brooklyn Bridge Park</strong> (Pebble Beach). Verás cómo se encienden las luces del skyline de Manhattan una a una mientras escuchas el río East River.</p>

  <div style="background-color: #f0f7ff; border-left: 5px solid #0d6efd; padding: 20px; margin: 30px 0; border-radius: 5px;">
    <p style="margin: 0; font-weight: bold; color: #0d6efd;">💡 Consejo New Travel Click</p>
    <p style="margin: 10px 0 0 0;">Recuerda sacar tu ESTA (visado) con tiempo. Y sobre todo: ¡La propina (Tip) es obligatoria! En restaurantes se espera entre un 18% y un 20%. Calcula este extra en tu presupuesto diario.</p>
  </div>

  <div style="text-align: center; margin: 50px 0 30px 0;">
    <a href="https://www.newtravelclick.com/" target="_blank" style="background-color: #0d6efd; color: #ffffff; padding: 18px 35px; text-decoration: none; font-family: sans-serif; font-weight: bold; font-size: 20px; border-radius: 50px; box-shadow: 0 5px 15px rgba(13, 110, 253, 0.3); transition: transform 0.2s ease;">
      ✈️ RESERVA TU VIAJE EN NEW TRAVEL CLICK
    </a>
  </div>

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

// --- COMPONENTE LAYOUT (CON LA BARRA DE NAVEGACIÓN FUNCIONAL) ---
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

  // --- ARREGLO DE LOS BOTONES DE NAVEGACIÓN ---
  const scrollToSection = (id: string) => {
    setActivePost(null); // 1. Cierra el artículo si está abierto
    // 2. Espera un poquito a que se cargue la portada y luego baja
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
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    const phone = formData.get('phone') as string;

    const body = `Hola, quiero solicitar información.\n\nMis datos son:\n- Nombre: ${name}\n- Teléfono: ${phone}\n- Email: ${email}\n\nMensaje:\n${message}`;
    // Usamos mailto para abrir el gestor de correo del usuario
    window.location.href = `mailto:newtravelclick@newtravelclick.com?subject=Nueva Solicitud Web de ${encodeURIComponent(name)}&body=${encodeURIComponent(body)}`;
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

  // --- VISTA DEL ARTÍCULO ---
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
            </article>
          </div>
        </div>
      </Layout>
    );
  }

  // --- VISTA PRINCIPAL (PORTADA) ---
  return (
    <Layout onNavigate={scrollToSection}>
      {/* Hero */}
      <section id="home" className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070" className="w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-black text-[#15803d] mb-6 tracking-wide leading-none shadow-sm drop-shadow-md">DESCUBRE EL MUNDO CON <br/> NEW TRAVEL CLICK</h1>
          <p className="text-xl md:text-2xl text-gray-700 font-bold mb-10 max-w-3xl mx-auto drop-shadow-sm">Viajes diseñados para ti con la seguridad y experiencia que mereces.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
             <a href="https://www.newtravelclick.com/" target="_blank" className="bg-[#0B3D91] text-white font-bold py-4 px-10 rounded-full shadow-2xl hover:bg-[#333333] transition-all">VER OFERTAS EXCLUSIVAS</a>
             <button onClick={() => setIsAIModalOpen(true)} className="bg-white/40 backdrop-blur-md border border-white/60 text-[#333333] font-bold py-4 px-10 rounded-full shadow-lg hover:bg-white/60 transition-all flex items-center justify-center"><Sparkles className="mr-2" /> Planificar con IA</button>
          </div>
        </div>
      </section>

      {/* Grid de Rutas */}
      <section id="rutas-espana" className="py-24 bg-[#FFF8F0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16"><h2 className="text-5xl font-black text-[#333333] mb-4">Nuestras Colecciones</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {/* España */}
            <div className="bg-white border-t-8 border-[#0071BC] rounded-2xl shadow-xl p-8 hover:shadow-2xl hover:scale-[1.01] transition-all group">
              <h3 className="text-3xl font-black text-[#333333] mb-6 flex items-center justify-between">Rutas España <Folder className="text-[#0071BC] opacity-20 group-hover:opacity-100 transition-opacity"/></h3>
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
            <div id="rutas-europa" className="bg-white border-t-8 border-[#29ABE2] rounded-2xl shadow-xl p-8 hover:shadow-2xl hover:scale-[1.01] transition-all group">
              <h3 className="text-3xl font-black text-[#333333] mb-6 flex items-center justify-between">Rutas Europa <Folder className="text-[#29ABE2] opacity-20 group-hover:opacity-100 transition-opacity"/></h3>
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
            <div id="larga-distancia" className="bg-white border-t-8 border-[#0B3D91] rounded-2xl shadow-xl p-8 hover:shadow-2xl hover:scale-[1.01] transition-all group">
              <h3 className="text-3xl font-black text-[#333333] mb-6 flex items-center justify-between">Larga Distancia <Folder className="text-[#0B3D91] opacity-20 group-hover:opacity-100 transition-opacity"/></h3>
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

      {/* Contacto con Email REAL (mailto) y WhatsApp */}
      <section id="contact" className="py-20 bg-gray-900 text-white relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-5xl font-black mb-6">¿Hablamos?</h2>
              <p className="text-gray-400 text-lg mb-8">Déjanos tus datos y diseñaremos tu viaje ideal.</p>
              
              <div className="space-y-6">
                <div className="flex items-center p-4 bg-white/5 rounded-lg border border-white/10">
                  <PhoneIcon className="text-[#29ABE2] mr-4" size={24} />
                  <div><p className="text-xs text-gray-500 uppercase font-bold">Llámanos</p><p className="font-bold text-xl">910 825 715</p></div>
                </div>
                <div className="flex items-center p-4 bg-white/5 rounded-lg border border-white/10">
                  <Mail className="text-[#29ABE2] mr-4" size={24} />
                  <div><p className="text-xs text-gray-500 uppercase font-bold">Escríbenos</p><p className="font-bold text-lg break-all">newtravelclick@newtravelclick.com</p></div>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 w-full">
              <form id="contact-form" onSubmit={handleContactSubmit} className="bg-white text-gray-800 p-8 rounded-2xl shadow-2xl">
                <div className="mb-6"><label className="block font-bold text-sm uppercase mb-2">Nombre</label><input name="name" className="w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Tu nombre" required /></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div><label className="block font-bold text-sm uppercase mb-2">Teléfono</label><input name="phone" className="w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="+34..." required /></div>
                  <div><label className="block font-bold text-sm uppercase mb-2">Email</label><input name="email" type="email" className="w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="tu@email.com" required /></div>
                </div>
                <div className="mb-6"><label className="block font-bold text-sm uppercase mb-2">Mensaje</label><textarea name="message" rows={4} className="w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Cuéntanos tu idea..." required></textarea></div>
                
                <div className="flex flex-col space-y-3">
                  <button type="submit" className="w-full bg-[#0071BC] text-white font-bold py-4 rounded-lg shadow-lg hover:bg-blue-800 transition-all">SOLICITAR INFORMACIÓN (EMAIL)</button>
                  <div className="relative flex py-2 items-center"><div className="flex-grow border-t border-gray-300"></div><span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase">O contáctanos al instante</span><div className="flex-grow border-t border-gray-300"></div></div>
                  <button type="button" onClick={handleWhatsAppContact} className="w-full bg-[#25D366] text-white font-bold py-4 rounded-lg shadow-lg hover:bg-[#128C7E] transition-all flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    WHATSAPP DIRECTO
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* AI Modal */}
      {isAIModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
           <div className="bg-white w-full max-w-4xl h-[90vh] rounded-3xl shadow-2xl flex flex-col relative overflow-hidden">
              <div className="bg-[#333] p-4 flex justify-between items-center text-white">
                <h3 className="font-bold flex items-center gap-2"><Sparkles className="text-[#0071BC]"/> ASISTENTE NEW TRAVEL CLICK</h3>
                <button onClick={() => setIsAIModalOpen(false)} className="hover:text-red-500"><X size={24}/></button>
              </div>
              <div className="p-6 flex-1 overflow-y-auto bg-gray-50">
                 {aiStatus === 'IDLE' && <div className="text-center mt-20"><Globe className="mx-auto text-[#0071BC] mb-4 opacity-50" size={80}/><h3 className="text-2xl font-bold text-gray-800">¿Cuál es tu próximo destino?</h3><p className="text-gray-500 mt-2">Pregúntame por itinerarios, comida o consejos.</p></div>}
                 {aiStatus === 'LOADING' && <div className="flex flex-col items-center justify-center mt-20"><Loader2 className="animate-spin text-[#0071BC] mb-4" size={48}/><p className="text-gray-500 font-medium">Consultando el mapa...</p></div>}
                 {aiResponse && <div className="prose prose-lg max-w-none"><ReactMarkdown>{aiResponse.text}</ReactMarkdown></div>}
              </div>
              <div className="p-4 border-t bg-white">
                 <form onSubmit={handleAskAI} className="flex gap-2">
                    <input value={aiQuery} onChange={e=>setAiQuery(e.target.value)} className="flex-1 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0071BC] outline-none" placeholder="Ej: Plan de 3 días en París..." />
                    <button type="submit" className="bg-[#0071BC] text-white p-4 rounded-xl hover:bg-blue-800 transition-colors"><Send size={24}/></button>
                 </form>
              </div>
           </div>
        </div>
      )}
    </Layout>
  );
}

export default App;
