import { useState, useEffect } from "react";
import { Cookie, X, ChevronDown, ChevronUp, BarChart3, Target, Shield } from "lucide-react";

// ─── Remplacez par vos vrais IDs ──────────────────────────────────────────────
const GA_MEASUREMENT_ID = "G-E9DSGL91VT";
const FB_PIXEL_ID       = "XXXXXXXXXXXXXXXXX"; // ← Facebook Pixel ID
// ──────────────────────────────────────────────────────────────────────────────

function loadGoogleAnalytics() {
  if (document.getElementById("ga-script")) return;
  const script1 = document.createElement("script");
  script1.id = "ga-script";
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  const script2 = document.createElement("script");
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}');
  `;
  document.head.appendChild(script2);
}

function loadFacebookPixel() {
  if (!FB_PIXEL_ID || FB_PIXEL_ID === "XXXXXXXXXXXXXXXXX") return;
  if (document.getElementById("fb-pixel")) return;
  const script = document.createElement("script");
  script.id = "fb-pixel";
  script.innerHTML = `
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${FB_PIXEL_ID}');
    fbq('track', 'PageView');
  `;
  document.head.appendChild(script);
}

type Prefs = { analytics: boolean; marketing: boolean };

export function CookieBanner() {
  const [visible, setVisible]   = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [prefs, setPrefs]       = useState<Prefs>({ analytics: true, marketing: true });

  useEffect(() => {
    const saved = localStorage.getItem("dts_cookie_consent");
    if (!saved) {
      setTimeout(() => setVisible(true), 1500);
    } else {
      const p: Prefs = JSON.parse(saved);
      if (p.analytics) loadGoogleAnalytics();
      if (p.marketing) loadFacebookPixel();
    }
  }, []);

  function acceptAll() {
    const p = { analytics: true, marketing: true };
    localStorage.setItem("dts_cookie_consent", JSON.stringify(p));
    loadGoogleAnalytics();
    loadFacebookPixel();
    setVisible(false);
  }

  function refuseAll() {
    localStorage.setItem("dts_cookie_consent", JSON.stringify({ analytics: false, marketing: false }));
    setVisible(false);
  }

  function savePrefs() {
    localStorage.setItem("dts_cookie_consent", JSON.stringify(prefs));
    if (prefs.analytics) loadGoogleAnalytics();
    if (prefs.marketing) loadFacebookPixel();
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[999] p-4">
      <div className="max-w-3xl mx-auto bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl text-white overflow-hidden">

        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-start gap-4">
            <div className="bg-blue-600 p-3 rounded-xl shrink-0">
              <Cookie size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1">🍪 Nous utilisons des cookies</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Nous utilisons des cookies pour analyser le trafic de notre site, améliorer votre expérience
                et vous proposer des contenus pertinents. Vos données restent confidentielles.
              </p>
            </div>
            <button onClick={refuseAll} className="text-gray-500 hover:text-white transition shrink-0">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Détails expandable */}
        <div className="px-6 pb-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm transition"
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            {expanded ? "Masquer les détails" : "Personnaliser mes préférences"}
          </button>
        </div>

        {expanded && (
          <div className="px-6 pb-4 space-y-3">
            {/* Cookies essentiels */}
            <div className="flex items-center justify-between bg-gray-800 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Shield size={18} className="text-green-400" />
                <div>
                  <p className="text-sm font-medium">Cookies essentiels</p>
                  <p className="text-xs text-gray-400">Fonctionnement du site (toujours actifs)</p>
                </div>
              </div>
              <div className="bg-green-600 text-white text-xs px-3 py-1 rounded-full">Toujours actif</div>
            </div>

            {/* Analytiques */}
            <div className="flex items-center justify-between bg-gray-800 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <BarChart3 size={18} className="text-blue-400" />
                <div>
                  <p className="text-sm font-medium">Analytiques (Google Analytics)</p>
                  <p className="text-xs text-gray-400">Statistiques de visite — pays, pages vues, durée</p>
                </div>
              </div>
              <button
                onClick={() => setPrefs(p => ({ ...p, analytics: !p.analytics }))}
                className={`w-12 h-6 rounded-full transition-colors relative ${prefs.analytics ? "bg-blue-600" : "bg-gray-600"}`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${prefs.analytics ? "translate-x-7" : "translate-x-1"}`} />
              </button>
            </div>

            {/* Marketing */}
            <div className="flex items-center justify-between bg-gray-800 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Target size={18} className="text-purple-400" />
                <div>
                  <p className="text-sm font-medium">Marketing (Facebook Pixel)</p>
                  <p className="text-xs text-gray-400">Publicités ciblées & retargeting Facebook/Instagram</p>
                </div>
              </div>
              <button
                onClick={() => setPrefs(p => ({ ...p, marketing: !p.marketing }))}
                className={`w-12 h-6 rounded-full transition-colors relative ${prefs.marketing ? "bg-purple-600" : "bg-gray-600"}`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${prefs.marketing ? "translate-x-7" : "translate-x-1"}`} />
              </button>
            </div>

            <button onClick={savePrefs} className="w-full bg-blue-700 hover:bg-blue-600 text-white py-2.5 rounded-xl text-sm transition">
              Enregistrer mes préférences
            </button>
          </div>
        )}

        {/* Boutons principaux */}
        {!expanded && (
          <div className="px-6 pb-6 pt-2 flex flex-col sm:flex-row gap-3">
            <button onClick={acceptAll} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition">
              ✅ Tout accepter
            </button>
            <button onClick={refuseAll} className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-200 py-3 rounded-xl text-sm transition">
              Refuser
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
