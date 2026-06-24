import { Menu, X, Globe, ChevronDown, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { BookingModal } from "./BookingModal";
import { FuelSimulator } from "./FuelSimulator";
import { TraccarModal } from "./TraccarModal";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import logoDts from "@/imports/t_l_chargement-removebg-preview-1.png";
import { useLanguage } from "../i18n/LanguageContext";
import { LANGUAGES, LangCode } from "../i18n/translations";

export function Navbar({ onChantierClick, onAdminClick }: { onChantierClick?: () => void; onAdminClick?: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [showFuel, setShowFuel] = useState(false);
  const [showTraccar, setShowTraccar] = useState(false);
  const [isSolOpen, setIsSolOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const solRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (solRef.current && !solRef.current.contains(e.target as Node)) setIsSolOpen(false);
      if (contactRef.current && !contactRef.current.contains(e.target as Node)) setIsContactOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const { lang, setLang, T } = useLanguage();
  const langRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === lang)!;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
    {showBooking && <BookingModal onClose={() => setShowBooking(false)} />}
    {showFuel && <FuelSimulator onClose={() => setShowFuel(false)} />}
    {showTraccar && <TraccarModal onClose={() => setShowTraccar(false)} />}
    <nav className="bg-black shadow-sm fixed w-full top-8 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Rangée 1 : Logo + liens nav */}
        <div className="flex justify-between items-center h-14 border-b border-gray-800">
          {/* Logo */}

          {/* Desktop nav liens */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#accueil" className="text-gray-300 hover:text-orange-500 transition text-sm">{T.nav.home}</a>
            <a href="#services" className="text-gray-300 hover:text-orange-500 transition text-sm">{T.nav.services}</a>
            {/* Solutions dropdown */}
            <div className="relative" ref={solRef}>
              <button
                onClick={() => setIsSolOpen(!isSolOpen)}
                className="flex items-center gap-1 text-gray-300 hover:text-orange-500 transition text-sm"
              >
                {T.nav.solutions}
                <ChevronDown size={13} className={`transition-transform duration-200 ${isSolOpen ? "rotate-180" : ""}`} />
              </button>
              {isSolOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl z-50 py-2 max-h-[80vh] overflow-y-auto">
                  {[
                    "Autre",
                    "Détection de Vol dans les magasins",
                    "Détection de vol carburant",
                    "Gestion de GPS",
                    "Gestion des chauffeurs",
                    "Gestion de niveau de réservoir carburant",
                    "Gestion des sous-compteur électrique",
                    "GPS pour animaux",
                    "Système Anti-intrusion",
                    "Système de portail automation & barrière",
                  ].map((item) => (
                    <a
                      key={item}
                      href="#solutions"
                      onClick={() => setIsSolOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-orange-900/30 hover:text-orange-500 transition"
                    >
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full shrink-0"></span>
                      {item}
                    </a>
                  ))}
                </div>
              )}
            </div>
            {/* Contact dropdown */}
            <div className="relative" ref={contactRef}>
              <button
                onClick={() => setIsContactOpen(!isContactOpen)}
                className="flex items-center gap-1 text-gray-300 hover:text-orange-500 transition text-sm"
              >
                {T.nav.contact}
                <ChevronDown size={13} className={`transition-transform duration-200 ${isContactOpen ? "rotate-180" : ""}`} />
              </button>
              {isContactOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl z-50 py-2">
                  {[
                    { label: "🛠️ Service Technique",           href: "#contact" },
                    { label: "🧾 Service Facturation",          href: "#contact" },
                    { label: "📈 Service Commercial & Marketing", href: "#contact" },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsContactOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:bg-orange-900/30 hover:text-orange-500 transition"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Devenir partenaire */}
            <a href="#contact" className="text-gray-300 hover:text-orange-500 transition text-sm whitespace-nowrap">
              🤝 Devenir partenaire
            </a>
            {/* Devenir installateur */}
            <a href="#contact" className="text-gray-300 hover:text-orange-500 transition text-sm whitespace-nowrap">
              🔧 Devenir installateur
            </a>
          </div>

          {/* Mobile burger */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-orange-500">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Rangée 2 : Boutons d'action */}
        <div className="hidden md:flex items-center justify-end gap-3 py-2">
            <button
              onClick={onChantierClick}
              className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700 transition text-xs border border-orange-500 shadow-md whitespace-nowrap"
            >
              🏗️ Supply
            </button>
            <button
              onClick={() => setTimeout(() => setShowTraccar(true), 10)}
              className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition text-xs border border-orange-400 shadow-md whitespace-nowrap"
            >
              🌍 DTS GPS
            </button>
            {/* Espace client */}
            <a
              href="https://www.itsworld.pro/#/login"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700 transition text-xs border border-orange-500 shadow-md whitespace-nowrap"
            >
              <User size={14} />
              Espace client
            </a>

            <button
              onClick={() => setTimeout(() => setShowFuel(true), 10)}
              className="flex items-center gap-1.5 bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition text-xs whitespace-nowrap shadow-md">
              ⛽ Simulateur économie carburant
            </button>
            <a href="#contact" className="bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700 transition text-xs shadow-md whitespace-nowrap">
              {T.hero.cta_trial}
            </a>
            <button
              onClick={() => setShowBooking(true)}
              className="bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700 transition text-xs whitespace-nowrap">
              {T.nav.demo}
            </button>

            {/* Espace Admin */}
            <button
              onClick={onAdminClick}
              className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300 transition text-xs border border-gray-300 shadow-sm whitespace-nowrap"
            >
              ⚙️ Espace Admin
            </button>

            {/* Language switcher */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 border border-gray-700 rounded-full px-3 py-1.5 text-sm text-gray-300 hover:bg-gray-800 transition"
              >
                <Globe size={14} />
                <span>{currentLang.flag}</span>
                <span className="hidden lg:block">{currentLang.label}</span>
                <ChevronDown size={12} className={`transition-transform ${isLangOpen ? "rotate-180" : ""}`} />
              </button>

              {isLangOpen && (
                <div className="absolute right-0 top-10 bg-gray-900 border border-gray-700 rounded-2xl shadow-xl py-2 z-50 w-48 max-h-80 overflow-y-auto">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code as LangCode); setIsLangOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-orange-900/30 transition ${lang === l.code ? "bg-orange-900/30 text-orange-500 font-semibold" : "text-gray-300"}`}
                    >
                      <span className="text-lg">{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 px-2">
            <div className="flex flex-col gap-4">
              <a href="#accueil" className="text-gray-300 hover:text-orange-500 transition" onClick={() => setIsMenuOpen(false)}>{T.nav.home}</a>
              <a href="#services" className="text-gray-300 hover:text-orange-500 transition" onClick={() => setIsMenuOpen(false)}>{T.nav.services}</a>
              <a href="#solutions" className="text-gray-300 hover:text-orange-500 transition" onClick={() => setIsMenuOpen(false)}>{T.nav.solutions}</a>
              <a href="#contact" className="text-gray-300 hover:text-orange-500 transition" onClick={() => setIsMenuOpen(false)}>{T.nav.contact}</a>
              <button onClick={() => { setShowTraccar(true); setIsMenuOpen(false); }} className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition text-left">🌍 DTSGPS</button>
              <button onClick={() => { setShowBooking(true); setIsMenuOpen(false); }} className="bg-orange-600 text-white px-6 py-2 rounded-full hover:bg-orange-700 transition text-left">{T.nav.demo}</button>
              <button onClick={() => { onChantierClick?.(); setIsMenuOpen(false); }} className="bg-orange-600 text-white px-6 py-2 rounded-full hover:bg-orange-700 transition text-left">🏗️ Supply</button>
            </div>
          </div>
        )}
    </nav>
    </>
  );
}