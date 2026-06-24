import { Facebook, Twitter, Linkedin, Instagram, HeartPulse, Factory, ShoppingCart, Truck, GraduationCap, ShieldCheck, Landmark, HardHat, Flame } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "../i18n/LanguageContext";
import { LegalModal } from "./LegalModal";
import { SupportModal } from "./SupportModal";
import { AboutPage } from "./AboutPage";
import logoVeesion from "@/imports/logo_veesion.jpg";
import logoShiftmove from "@/imports/logo_shiftmove.jpg";
import logoFourData from "@/imports/LOGO_FOUR_DATA.jpg";
import logoUbi from "@/imports/LOGO_UBI_SOLUTIONS.jpg";
import logoDts from "@/imports/logo_dtsystems.jpg";
import logoAlerteGasoil from "@/imports/images__1_.png";
import logoDjiboutiTelecom from "@/imports/djiboutitelecom_logo.jpg";
import logoEthiocom from "@/imports/images.png";
import logoOrange from "@/imports/Orange_logo.svg.png";
import logoVerisure from "@/imports/blackfriday-verisure.png";
import logoSafaricom from "@/imports/Safaricom-Logo-New-PR.jpg";
import logoVodafone from "@/imports/unnamed.jpg";

const SECTORS = [
  { iconKey: "heart",   label: "Santé",                  color: "text-red-400",    bg: "bg-red-900/30" },
  { iconKey: "factory", label: "Industriel",             color: "text-orange-400", bg: "bg-orange-900/30" },
  { iconKey: "cart",    label: "Grande Distribution",    color: "text-yellow-400", bg: "bg-yellow-900/30" },
  { iconKey: "truck",   label: "Logistique & Transport", color: "text-green-400",  bg: "bg-green-900/30" },
  { iconKey: "grad",    label: "Éducation",              color: "text-blue-400",   bg: "bg-blue-900/30" },
  { iconKey: "shield",  label: "Sécurité",               color: "text-indigo-400", bg: "bg-indigo-900/30" },
  { iconKey: "bank",    label: "Banque",                 color: "text-purple-400", bg: "bg-purple-900/30" },
  { iconKey: "hard",    label: "Travaux Public & Privé", color: "text-cyan-400",   bg: "bg-cyan-900/30" },
  { iconKey: "flame",   label: "Oil & Gaz",              color: "text-amber-400",  bg: "bg-amber-900/30" },
];

const partners = [
  { name: "Alerte Gasoil", logo: logoAlerteGasoil },
  { name: "Djibouti Telecom", logo: logoDjiboutiTelecom },
  { name: "Djibouti Telematics Systems", logo: logoDts },
  { name: "Ethiocom", logo: logoEthiocom },
  { name: "Four Data", logo: logoFourData },
  { name: "Océan Shiftmove", logo: logoShiftmove },
  { name: "Orange", logo: logoOrange },
  { name: "Safaricom", logo: logoSafaricom },
  { name: "UBI Solutions", logo: logoUbi },
  { name: "Veesion", logo: logoVeesion },
  { name: "Verisure", logo: logoVerisure },
  { name: "Vodafone", logo: logoVodafone },
];

function SectorIcon({ k }: { k: string }) {
  const p = { size: 28 };
  if (k === "heart")   return <HeartPulse {...p} />;
  if (k === "factory") return <Factory {...p} />;
  if (k === "cart")    return <ShoppingCart {...p} />;
  if (k === "truck")   return <Truck {...p} />;
  if (k === "grad")    return <GraduationCap {...p} />;
  if (k === "shield")  return <ShieldCheck {...p} />;
  if (k === "bank")    return <Landmark {...p} />;
  if (k === "hard")    return <HardHat {...p} />;
  return <Flame {...p} />;
}

export function Footer() {
  const { T } = useLanguage();
  const [legalModal, setLegalModal] = useState<"privacy" | "terms" | null>(null);
  const [showSupport, setShowSupport] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  return (
    <>
    <footer className="bg-black text-white pt-12">
      {/* Partners section */}
      <div className="border-b border-gray-800 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-gray-400 text-sm mb-8 tracking-widest uppercase">
            {T.footer.partners}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {partners.map((p) => (
              <div key={p.name} className="flex flex-col items-center gap-2 group">
                <div className="bg-white rounded-xl w-28 h-14 flex items-center justify-center overflow-hidden shadow-md group-hover:scale-110 transition-transform p-2">
                  <ImageWithFallback
                    src={p.logo}
                    alt={`Logo ${p.name}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <span className="text-gray-400 text-xs group-hover:text-white transition-colors text-center">
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sectors infinite scroll */}
      <div className="border-b border-gray-800 py-8 overflow-hidden">
        <p className="text-center text-gray-400 text-sm mb-6 tracking-widest uppercase px-4">
          Secteurs d'activité
        </p>
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          <div
            className="flex gap-6"
            style={{
              animation: "scroll-sectors 28s linear infinite",
              width: "max-content",
            }}
          >
            {/* Double the list for seamless loop */}
            {[...SECTORS, ...SECTORS].map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-2 min-w-[100px]">
                <div className={`${s.bg} w-16 h-16 rounded-2xl flex items-center justify-center ${s.color} border border-white/10 shadow-lg`}>
                  <SectorIcon k={s.iconKey} />
                </div>
                <span className="text-gray-400 text-xs text-center whitespace-nowrap">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes scroll-sectors {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl mb-4 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Djibouti Telematics Solutions
            </h3>
            <p className="text-gray-400 text-sm">
              Leader en solutions IA pour la gestion de flotte et la sécurité commerciale.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-orange-600 transition" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-orange-600 transition" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-orange-600 transition" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-orange-600 transition" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4">{T.footer.solutions}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#solutions" className="hover:text-white transition">Détection de Vol dans les magasins</a></li>
              <li><a href="#solutions" className="hover:text-white transition">Détection de vol carburant</a></li>
              <li><a href="#solutions" className="hover:text-white transition">Gestion de GPS</a></li>
              <li><a href="#solutions" className="hover:text-white transition">Gestion des chauffeurs</a></li>
              <li><a href="#solutions" className="hover:text-white transition">Gestion de niveau de réservoir</a></li>
              <li><a href="#solutions" className="hover:text-white transition">Gestion des sous-compteur électrique</a></li>
              <li><a href="#solutions" className="hover:text-white transition">GPS pour animaux</a></li>
              <li><a href="#solutions" className="hover:text-white transition">Système Anti-intrusion</a></li>
              <li><a href="#solutions" className="hover:text-white transition">Système portail & barrière</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">{T.footer.company}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><button onClick={() => setShowAbout(true)} className="hover:text-white transition text-left">{T.footer.about}</button></li>
              <li><a href="#" className="hover:text-white transition">{T.footer.careers}</a></li>
              <li><a href="#" className="hover:text-white transition">{T.footer.blog}</a></li>
              <li><a href="#" className="hover:text-white transition">{T.nav.contact}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">{T.footer.resources}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition">{T.footer.docs}</a></li>
              <li><button onClick={() => setShowSupport(true)} className="hover:text-white transition text-left">{T.footer.support}</button></li>
              <li><button onClick={() => setLegalModal("privacy")} className="hover:text-white transition text-left">{T.footer.privacy}</button></li>
              <li><button onClick={() => setLegalModal("terms")} className="hover:text-white transition text-left">{T.footer.terms}</button></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 Djibouti Telematics Solutions. {T.footer.rights}</p>
        </div>
      </div>
    </footer>
    {legalModal && <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />}
    {showSupport && <SupportModal onClose={() => setShowSupport(false)} />}
    {showAbout && <AboutPage onClose={() => setShowAbout(false)} />}
</>
  );
}
