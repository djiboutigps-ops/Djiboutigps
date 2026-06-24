import { useState, useEffect, useRef } from "react";
import { LanguageProvider } from "./i18n/LanguageContext";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Solutions } from "./components/Solutions";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { PromoBanner, PromoSection } from "./components/Promo";
import { SimCard } from "./components/SimCard";
import { IotDashboard } from "./components/IotDashboard";
import { CookieBanner } from "./components/CookieBanner";
import { SurveyModal } from "./components/SurveyModal";
import { AdminPage } from "./components/AdminPage";
import { ChantierPage } from "./components/ChantierPage";
import backgroundAudio from "@/imports/WhatsApp_Video_2026-06-22_at_19.14.10.mp4";

export default function App() {
  const [showChantier, setShowChantier] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showSurvey, setShowSurvey] = useState(() => !sessionStorage.getItem("dts_unlocked"));
  const [unlocked, setUnlocked] = useState(() => !!sessionStorage.getItem("dts_unlocked"));
  const [audioOn, setAudioOn] = useState(false);
  const audioRef = useRef<HTMLVideoElement>(null);

  // Expose openAdmin pour le SurveyModal
  useEffect(() => { 
    (window as any).__openAdmin = () => { 
      setShowSurvey(false); 
      setUnlocked(true); 
      setShowAdmin(true); 
    }; 
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const tryPlay = () => {
      el.play().then(() => setAudioOn(true)).catch(() => setAudioOn(false));
    };
    tryPlay();
    document.addEventListener("click", () => {
      if (el.paused) { el.play().then(() => setAudioOn(true)).catch(() => {}); }
    }, { once: true });
  }, []);

  if (showAdmin) return <AdminPage onClose={() => setShowAdmin(false)} />;

  if (showChantier) {
    return (
      <ChantierPage onClose={() => setShowChantier(false)} />
    );
  }

  return (
    <LanguageProvider>
      <div className="size-full">
        {/* Audio de fond */}
        <video 
          ref={audioRef} 
          src={backgroundAudio} 
          autoPlay 
          loop
          playsInline 
          style={{ display: "none" }} 
        />
        {!audioOn && (
          <button
            onClick={() => { audioRef.current?.play().then(() => setAudioOn(true)); }}
            className="fixed bottom-20 right-4 z-[999] bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg text-xs flex items-center gap-2 hover:bg-blue-800 transition"
          >
            🔊 Activer le son
          </button>
        )}
        <PromoBanner />
        <Navbar onChantierClick={() => setShowChantier(true)} onAdminClick={() => setShowAdmin(true)} />
        <Hero />
        <PromoSection />
        <Services />
        <Solutions />
        <SimCard />
        <Contact />

        <section className="bg-gray-950 py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block bg-blue-900/50 text-blue-400 text-sm px-4 py-1 rounded-full border border-blue-700/50 mb-4">
                Live Demo
              </span>
              <h2 className="text-3xl text-white mb-3">FleetAI Live Monitor</h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Visualisez en temps réel la télématique de vos véhicules — position GPS, vitesse, carburant, température ambiante et alertes comportementales.
              </p>
            </div>
            <IotDashboard />
          </div>
        </section>

        <Footer />
        <CookieBanner />
        {showSurvey && !unlocked && <SurveyModal onUnlock={() => { setUnlocked(true); setShowSurvey(false); sessionStorage.setItem("dts_unlocked", "1"); }} />}
      </div>
    </LanguageProvider>
  );
}