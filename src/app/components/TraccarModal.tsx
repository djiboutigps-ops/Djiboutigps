import { X, MapPin, Navigation } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import logoDts from "@/imports/t_l_chargement-removebg-preview-2.png";

interface Props {
  onClose: () => void;
}

export function TraccarModal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[95vw] h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-blue-700 text-white px-6 py-4 flex justify-between items-center rounded-t-2xl">
          <div className="flex items-center gap-3">
            <ImageWithFallback 
              src={logoDts} 
              alt="DTS GPS Logo" 
              className="w-10 h-10 object-contain bg-white rounded-lg p-1"
            />
            <div>
              <h2 className="text-lg font-bold">DTS GPS</h2>
              <p className="text-indigo-200 text-xs">Système de gestion de flotte en temps réel</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Info bar */}
        <div className="bg-blue-50 border-b border-blue-100 px-6 py-3 flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <Navigation size={14} className="text-blue-600" />
            <span className="text-gray-700">
              <strong>DTS GPS Demo:</strong> Utilisateur: <code className="bg-white px-2 py-0.5 rounded">admin</code> | 
              Mot de passe: <code className="bg-white px-2 py-0.5 rounded ml-1">admin</code>
            </span>
          </div>
        </div>

        {/* Iframe container */}
        <div className="flex-1 relative bg-gray-100">
          <iframe
            src="https://demo.traccar.org/"
            className="w-full h-full border-0"
            title="DTS GPS Platform"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
            loading="lazy"
          />
          {/* Overlay pour masquer le logo Traccar et afficher DTS GPS */}
          <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-r from-indigo-600 to-blue-700 flex items-center px-4 gap-3 pointer-events-none z-10">
            <ImageWithFallback
              src={logoDts}
              alt="DTS GPS"
              className="w-8 h-8 object-contain bg-white rounded-lg p-1"
            />
            <span className="text-white font-bold text-lg tracking-wide">DTS GPS</span>
            <span className="text-indigo-200 text-xs ml-2">— Plateforme de gestion de flotte</span>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-gray-600">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>Connecté à la plateforme DTS GPS</span>
          </div>
          <a
            href="https://djiboutigps.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline"
          >
            En savoir plus sur DTS GPS →
          </a>
        </div>

      </div>
    </div>
  );
}