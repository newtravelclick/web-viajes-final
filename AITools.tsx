import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  Map as MapIcon, 
  Image as ImageIcon, 
  Camera, 
  Send, 
  Loader2, 
  Wand2,
  Globe 
} from 'lucide-react';
import { 
  askTravelAssistant, 
  generateDreamDestination, 
  editTravelPhoto, 
  fileToBase64 
} from '../services/geminiService';
import { AIStatus, ImageSize } from '../types';
import ReactMarkdown from 'react-markdown';

export const AITools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'assistant' | 'visualizer' | 'editor'>('assistant');

  return (
    <section id="ai-tools" className="py-20 bg-gradient-to-br from-brand-light to-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-secondary to-brand-accent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="bg-brand-primary/10 text-brand-primary font-bold py-1 px-3 rounded-full text-xs uppercase tracking-widest mb-4 inline-block">
            Gemini Powered
          </span>
          <h2 className="text-4xl font-bold font-display text-brand-dark mb-4">
            Laboratorio de Viajes Inteligente
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Utiliza nuestra tecnología avanzada de IA para planificar, visualizar y mejorar tus experiencias de viaje.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden max-w-5xl mx-auto flex flex-col md:flex-row min-h-[600px]">
          {/* Sidebar Tabs */}
          <div className="md:w-64 bg-gray-50 p-4 border-r border-gray-100 flex flex-row md:flex-col gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('assistant')}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all text-left min-w-max md:min-w-0 ${
                activeTab === 'assistant' ? 'bg-brand-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              <MapIcon size={20} />
              <span className="font-medium">Asistente de Rutas</span>
            </button>
            <button
              onClick={() => setActiveTab('visualizer')}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all text-left min-w-max md:min-w-0 ${
                activeTab === 'visualizer' ? 'bg-brand-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              <ImageIcon size={20} />
              <span className="font-medium">Visualizador 3 Pro</span>
            </button>
            <button
              onClick={() => setActiveTab('editor')}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all text-left min-w-max md:min-w-0 ${
                activeTab === 'editor' ? 'bg-brand-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Wand2 size={20} />
              <span className="font-medium">Editor Mágico</span>
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6 md:p-8 bg-white relative">
            {activeTab === 'assistant' && <TravelAssistant />}
            {activeTab === 'visualizer' && <DreamVisualizer />}
            {activeTab === 'editor' && <PhotoEditor />}
          </div>
        </div>
      </div>
    </section>
  );
};

// 1. Travel Assistant Component
const TravelAssistant = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<{ text: string; sources: any[] } | null>(null);
  const [status, setStatus] = useState<AIStatus>(AIStatus.IDLE);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setStatus(AIStatus.LOADING);
    try {
      // Get location for grounding
      let location;
      try {
        const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        location = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      } catch (err) {
        console.warn("Location denied, proceeding without it.");
      }

      const result = await askTravelAssistant(query, location);
      setResponse({ text: result.text || "No response generated.", sources: result.sources });
      setStatus(AIStatus.SUCCESS);
    } catch (error) {
      setStatus(AIStatus.ERROR);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-brand-dark flex items-center gap-2">
           <MapIcon className="text-brand-primary" size={24}/>
           Tu Asistente de Viaje Personal
        </h3>
        <p className="text-xs text-gray-500">Inteligencia artificial conectada a Google Maps y Search.</p>
      </div>
      
      <div className="flex-1 overflow-hidden relative rounded-xl shadow-inner border border-gray-200 min-h-[300px] flex flex-col bg-black">
         {/* Earth Background - Full Globe View */}
         <div className="absolute inset-0 z-0 bg-black flex items-center justify-center">
            <img 
               src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop" 
               alt="NASA Earth from space" 
               className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
         </div>

        <div className="relative z-10 flex-1 overflow-y-auto p-6 custom-scrollbar">
            {status === AIStatus.IDLE && (
              <div className="h-full flex flex-col items-center justify-center text-center">
                 <div className="w-20 h-20 rounded-full bg-blue-600/30 backdrop-blur-md flex items-center justify-center mb-6 border border-blue-400/50 shadow-[0_0_30px_rgba(37,99,235,0.5)]">
                    <Globe size={40} className="text-blue-200" />
                 </div>
                 <h4 className="text-2xl font-bold text-white mb-2 tracking-tight">Explora el Planeta</h4>
                 <p className="text-blue-100 max-w-sm text-sm">
                   Pregunta sobre cualquier rincón del mundo. Nosotros te llevamos.
                 </p>
              </div>
            )}

            {status === AIStatus.LOADING && (
              <div className="flex items-center justify-center h-full">
                 <div className="flex flex-col items-center">
                    <Loader2 className="animate-spin text-blue-400 mb-3" size={40} />
                    <span className="text-blue-200 text-sm font-medium tracking-wide">Analizando datos globales...</span>
                 </div>
              </div>
            )}

            {status === AIStatus.SUCCESS && response && (
              <div className="text-gray-100 space-y-4">
                 <div className="prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown>{response.text}</ReactMarkdown>
                 </div>
                
                {/* Display Grounding Sources */}
                {response.sources && response.sources.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-white/20">
                    <h4 className="text-xs font-bold uppercase text-blue-300 mb-3 flex items-center">
                       <Sparkles size={12} className="mr-1"/> Fuentes Verificadas
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {response.sources.map((chunk, idx) => {
                        if (chunk.web) {
                          return (
                            <a key={idx} href={chunk.web.uri} target="_blank" rel="noopener noreferrer" 
                               className="block p-3 bg-white/10 backdrop-blur border border-white/10 rounded-lg text-xs text-blue-200 hover:bg-white/20 transition-colors truncate">
                              🌐 {chunk.web.title}
                            </a>
                          );
                        }
                        if (chunk.maps) {
                          return (
                             <a key={idx} href={chunk.maps.uri} target="_blank" rel="noopener noreferrer"
                               className="block p-3 bg-white/10 backdrop-blur border border-white/10 rounded-lg text-xs text-green-300 hover:bg-white/20 transition-colors truncate">
                              📍 {chunk.maps.title}
                            </a>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
        </div>
      </div>

      <form onSubmit={handleAsk} className="relative mt-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ej: ¿Qué visitar en Japón en 7 días?"
          className="w-full pl-5 pr-12 py-3 bg-white border border-gray-200 rounded-full shadow-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none text-sm font-medium text-gray-800 placeholder-gray-400 transition-shadow hover:shadow-xl"
        />
        <button
          type="submit"
          disabled={status === AIStatus.LOADING}
          className="absolute right-2 top-1.5 p-2 bg-brand-primary text-white rounded-full hover:bg-blue-600 disabled:opacity-50 transition-all transform hover:scale-105 shadow-md"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

// 2. Image Generation Component
const DreamVisualizer = () => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<ImageSize>(ImageSize.SIZE_1K);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<AIStatus>(AIStatus.IDLE);

  const handleGenerate = async () => {
    if (!prompt) return;
    setStatus(AIStatus.LOADING);
    try {
      const url = await generateDreamDestination(prompt, size);
      setImageUrl(url);
      setStatus(AIStatus.SUCCESS);
    } catch (e) {
      console.error(e);
      setStatus(AIStatus.ERROR);
    }
  };

  return (
    <div className="h-full flex flex-col">
       <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2 text-brand-dark">Visualizador de Sueños (Pro)</h3>
        <p className="text-gray-500 text-sm">Describe tu destino ideal y deja que Gemini 3 Pro lo cree. Elige tu resolución.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        <div className="space-y-4">
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Tu idea de viaje</label>
             <textarea 
               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none h-32 resize-none"
               placeholder="Una cabaña futurista en los Alpes suizos al atardecer, estilo fotorealista..."
               value={prompt}
               onChange={(e) => setPrompt(e.target.value)}
             />
           </div>
           
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">Resolución</label>
             <div className="flex space-x-2">
               {[ImageSize.SIZE_1K, ImageSize.SIZE_2K, ImageSize.SIZE_4K].map((s) => (
                 <button 
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-4 py-2 rounded border text-sm font-medium ${size === s ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white text-gray-600 border-gray-200'}`}
                 >
                   {s}
                 </button>
               ))}
             </div>
           </div>

           <button 
              onClick={handleGenerate}
              disabled={status === AIStatus.LOADING}
              className="w-full bg-brand-accent hover:bg-brand-dark text-white font-bold py-3 rounded-lg shadow transition-colors flex justify-center items-center"
           >
              {status === AIStatus.LOADING ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2" size={18}/>}
              Generar Imagen
           </button>
        </div>

        <div className="bg-gray-100 rounded-lg border border-dashed border-gray-300 flex items-center justify-center relative overflow-hidden h-64 md:h-auto">
           {status === AIStatus.IDLE && <span className="text-gray-400 text-sm">La imagen aparecerá aquí</span>}
           {status === AIStatus.LOADING && <Loader2 className="animate-spin text-brand-primary" size={40} />}
           {status === AIStatus.SUCCESS && imageUrl && (
             <img src={imageUrl} alt="Generated dream" className="absolute inset-0 w-full h-full object-contain bg-black" />
           )}
           {status === AIStatus.ERROR && <span className="text-red-500 text-sm">Error al generar la imagen</span>}
        </div>
      </div>
    </div>
  );
};

// 3. Image Editing Component
const PhotoEditor = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [editPrompt, setEditPrompt] = useState('');
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [status, setStatus] = useState<AIStatus>(AIStatus.IDLE);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const base64 = await fileToBase64(file);
      setPreview(`data:${file.type};base64,${base64}`);
      setResultImage(null);
    }
  };

  const handleEdit = async () => {
    if (!selectedFile || !editPrompt) return;
    setStatus(AIStatus.LOADING);
    try {
      const base64 = await fileToBase64(selectedFile);
      const url = await editTravelPhoto(base64, selectedFile.type, editPrompt);
      setResultImage(url);
      setStatus(AIStatus.SUCCESS);
    } catch (e) {
      console.error(e);
      setStatus(AIStatus.ERROR);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2 text-brand-dark">Editor Mágico (Nano Banana)</h3>
        <p className="text-gray-500 text-sm">Sube una foto y dile a la IA qué cambiar. Ej: "Añade fuegos artificiales", "Quita la gente".</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors relative">
            <input type="file" onChange={handleFileChange} accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <div className="flex flex-col items-center">
              <Camera className="text-gray-400 mb-2" size={32} />
              <span className="text-sm text-gray-600 font-medium">Click para subir foto</span>
            </div>
          </div>
          
          {preview && (
            <div className="relative h-40 bg-gray-100 rounded-lg overflow-hidden">
              <img src={preview} alt="Original" className="w-full h-full object-cover" />
              <span className="absolute bottom-1 right-1 bg-black/50 text-white text-xs px-2 rounded">Original</span>
            </div>
          )}

          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Ej: Haz que sea de noche, añade un sombrero..." 
              className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-brand-primary outline-none"
              value={editPrompt}
              onChange={(e) => setEditPrompt(e.target.value)}
            />
          </div>
          
           <button 
              onClick={handleEdit}
              disabled={!selectedFile || !editPrompt || status === AIStatus.LOADING}
              className="w-full bg-brand-primary hover:bg-blue-600 text-white font-bold py-3 rounded-lg shadow transition-colors flex justify-center items-center disabled:opacity-50"
           >
              {status === AIStatus.LOADING ? <Loader2 className="animate-spin mr-2" /> : <Wand2 className="mr-2" size={18}/>}
              Editar Foto
           </button>
        </div>

        <div className="bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center relative overflow-hidden h-64 md:h-auto">
           {status === AIStatus.IDLE && <span className="text-gray-400 text-sm text-center px-4">El resultado aparecerá aquí</span>}
           {status === AIStatus.LOADING && <div className="text-center"><Loader2 className="animate-spin text-brand-primary mx-auto mb-2" size={40} /><span className="text-xs text-gray-500">Editando píxeles...</span></div>}
           {status === AIStatus.SUCCESS && resultImage && (
             <img src={resultImage} alt="Edited" className="absolute inset-0 w-full h-full object-contain bg-black" />
           )}
           {status === AIStatus.ERROR && <span className="text-red-500 text-sm">Error en la edición</span>}
        </div>
      </div>
    </div>
  );
};