import { ArrowRight, Truck, Camera, ShieldCheck, Wifi, Home, Zap, Leaf, Building2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "../i18n/LanguageContext";
import djiboutiPhoto from "@/imports/place-raimbo-e1538246481648.jpg";
import iotBg from "@/imports/images-2.jpg";
import carteIntl from "@/imports/image_10412576.png";
import carte2 from "@/imports/image_66102a99.png";

const SOLUTIONS = [
  { label: "GPS Fleet",   angle: 0,   iconKey: "truck" },
  { label: "Vidéo IA",    angle: 45,  iconKey: "camera" },
  { label: "Sécurité",    angle: 90,  iconKey: "shield" },
  { label: "Smart Home",  angle: 135, iconKey: "home" },
  { label: "SIM IoT",     angle: 180, iconKey: "wifi" },
  { label: "Smart Grid",  angle: 225, iconKey: "zap" },
  { label: "Smart Agri",  angle: 270, iconKey: "leaf" },
  { label: "Smart City",  angle: 315, iconKey: "building" },
];

function SolIcon({ k, size }: { k: string; size: number }) {
  const p = { size };
  if (k === "truck")    return <Truck {...p} />;
  if (k === "camera")   return <Camera {...p} />;
  if (k === "shield")   return <ShieldCheck {...p} />;
  if (k === "home")     return <Home {...p} />;
  if (k === "wifi")     return <Wifi {...p} />;
  if (k === "zap")      return <Zap {...p} />;
  if (k === "leaf")     return <Leaf {...p} />;
  return <Building2 {...p} />;
}

function IotOverlay() {
  const cx = 50, cy = 50, r = 28;
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
      <circle cx={cx} cy={cy} r={r + 8}  stroke="rgba(96,165,250,0.15)" strokeWidth="0.3" fill="none" strokeDasharray="1 2" />
      <circle cx={cx} cy={cy} r={r + 14} stroke="rgba(96,165,250,0.1)"  strokeWidth="0.3" fill="none" strokeDasharray="2 3" />
      {SOLUTIONS.map((s) => {
        const rad = (s.angle * Math.PI) / 180;
        return <line key={s.label} x1={cx} y1={cy} x2={cx + r * Math.cos(rad)} y2={cy + r * Math.sin(rad)} stroke="rgba(96,165,250,0.5)" strokeWidth="0.4" strokeDasharray="1 1" />;
      })}
      <circle cx={cx} cy={cy} r="8" fill="rgba(29,78,216,0.85)" stroke="rgba(96,165,250,0.8)" strokeWidth="0.6" />
      <circle cx={cx} cy={cy} r="6" fill="none" stroke="rgba(147,197,253,0.6)" strokeWidth="0.3" strokeDasharray="1 1" />
      <text x={cx} y={cy - 1} textAnchor="middle" fill="white" fontSize="2.8" fontWeight="bold">DTS</text>
      <text x={cx} y={cy + 3} textAnchor="middle" fill="rgba(147,197,253,0.9)" fontSize="1.8">IoT</text>
      {SOLUTIONS.map((s) => {
        const rad = (s.angle * Math.PI) / 180;
        const x = cx + r * Math.cos(rad), y = cy + r * Math.sin(rad);
        return (
          <g key={s.label}>
            <circle cx={x} cy={y} r="5" fill="rgba(29,78,216,0.8)" stroke="rgba(96,165,250,0.9)" strokeWidth="0.5" />
            <circle cx={x} cy={y} r="3.5" fill="none" stroke="rgba(147,197,253,0.4)" strokeWidth="0.3" strokeDasharray="0.5 0.5" />
          </g>
        );
      })}
    </svg>
  );
}

export function Hero() {
  const { T } = useLanguage();
  return (
    <>
      <section id="accueil" className="pt-16 sm:pt-24 min-h-screen relative overflow-hidden bg-black">
        {/* Carte visible du bas vers le haut */}
        <div className="absolute inset-0 z-0 pointer-events-none" style={{
          backgroundImage: `url(${carte2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          maskImage: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)",
          animation: "fadeInMap 3s ease-in forwards",
          opacity: 0,
        }} />
        {/* Texte avec effet de descente */}
        <div className="absolute top-60 left-0 right-0 z-40 text-center px-4">
          <p className="text-gray-300 text-sm sm:text-base mb-2"
            style={{ animation: "slideDown 1s ease-out forwards", opacity: 0 }}>
            Première plateforme Djiboutienne de Gestion de Flotte à l'international
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg"
            style={{ animation: "slideDown 1s ease-out 0.2s forwards", opacity: 0 }}>
            Notre présence est <span className="text-cyan-400">internationale.</span>
          </h1>
          <p className="text-gray-300 text-sm sm:text-base mt-2"
            style={{ animation: "slideDown 1s ease-out 0.4s forwards", opacity: 0 }}>
            Et s'étend rapidement en Afrique et en Europe.
          </p>
        </div>
        <style>{`
          @keyframes fadeInMap {
            0%   { opacity: 0; }
            100% { opacity: 1; }
          }
          @keyframes slideDown {
            0%   { opacity: 0; transform: translateY(-40px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideUp {
            0%   { opacity: 0; transform: translateY(40px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes carDrive {
            0%   { left: -8%; opacity: 0; }
            8%   { opacity: 1; }
            92%  { opacity: 1; }
            100% { left: 108%; opacity: 0; }
          }
        `}</style>

        {/* Texte en bas avec véhicules animés */}
        <div className="absolute bottom-8 left-0 right-0 z-40 text-center px-4"
          style={{ animation: "slideUp 1s ease-out 0.6s forwards", opacity: 0 }}>
          <div className="relative inline-block overflow-hidden">
            <p className="text-white text-xl sm:text-2xl lg:text-3xl font-bold tracking-widest drop-shadow-lg">
              CONNECTER POUR MIEUX GÉRER.
            </p>
            {[
              { emoji: "🚗",  delay: "0s" },
              { emoji: "🏍️", delay: "8s" },
              { emoji: "🚛",  delay: "16s" },
              { emoji: "🛥️", delay: "24s" },
              { emoji: "🚁",  delay: "32s" },
              { emoji: "🛺",  delay: "40s" },
              { emoji: "🚐",  delay: "48s" },
              { emoji: "🚜",  delay: "56s" },
              { emoji: "🛸",  delay: "64s" },
            ].map((v, i) => (
              <div key={i}
                style={{ animation: `carDrive 7s linear ${v.delay} infinite` }}
                className="absolute top-1/2 -translate-y-1/2 text-2xl">
                {v.emoji}
              </div>
            ))}
          </div>
        </div>

        {/* Texte au milieu à droite */}
        <div className="absolute top-1/2 right-8 -translate-y-1/2 z-40 max-w-sm text-right"
          style={{ animation: "slideDown 1s ease-out 0.8s both" }}>
          <p className="text-white text-xs sm:text-sm lg:text-base font-medium leading-relaxed drop-shadow-xl">
            Géolocalisation live · Maintenance prédictive · Suivi carburant mobile &amp; stationnaire · Gestion des chauffeurs · Vidéosurveillance IA · Détection comportementale
          </p>
          <p className="text-cyan-400 text-xs sm:text-sm font-semibold mt-2">
            — Réduisez vos coûts opérationnels jusqu'à 30 % dès le premier mois.
          </p>
        </div>

        {/* Texte au milieu à gauche */}
        <div className="absolute top-1/2 left-8 -translate-y-1/2 z-40 max-w-sm text-left"
          style={{ animation: "slideDown 1s ease-out 0.5s both" }}>
          <p className="text-white text-lg sm:text-xl lg:text-2xl font-semibold leading-snug drop-shadow-xl">
            Pilotez votre flotte, protégez vos actifs, maîtrisez vos coûts —<br />
            <span className="text-cyan-400">en temps réel, depuis n'importe où.</span>
          </p>
        </div>

        <div className="relative z-40 flex flex-col items-center justify-center min-h-screen text-center px-4 py-20">
          <div className="max-w-2xl w-full"></div>
          <div className="flex flex-wrap justify-center gap-4 mt-8 sm:hidden">
            {SOLUTIONS.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1">
                <div className="bg-orange-600/80 border border-orange-400/60 text-white rounded-full p-2.5 backdrop-blur-sm">
                  <SolIcon k={s.iconKey} size={18} />
                </div>
                <span className="text-[10px] text-orange-200 whitespace-nowrap">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes fadeInOut {
            0%   { opacity: 0; }
            15%  { opacity: 1; }
            70%  { opacity: 1; }
            85%  { opacity: 0; }
            100% { opacity: 0; }
          }
        `}</style>
      </section>
      <div className="bg-white py-6 flex flex-col sm:flex-row gap-3 justify-center items-center px-4 shadow-md border-b border-gray-100">
        <a href="#contact" className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full hover:from-orange-600 hover:to-red-600 transition flex items-center justify-center gap-2 shadow-lg text-sm sm:text-base">
          {T.hero.cta_trial}<ArrowRight size={18} />
        </a>
        <a href="#services" className="w-full sm:w-auto border-2 border-orange-400 text-orange-400 px-8 py-3 rounded-full hover:bg-orange-50 transition flex items-center justify-center text-sm sm:text-base">
          {T.hero.cta_more}
        </a>
      </div>
    </>
  );
}
