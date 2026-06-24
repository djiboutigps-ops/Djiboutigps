import { Wifi, Globe, Bus, Anchor, Zap, Leaf, MapPin, Eye, Bell, Ship } from "lucide-react";

const sectors = [
  { iconKey: "wifi",   label: "Infrastructures" },
  { iconKey: "leaf",   label: "Environnement" },
  { iconKey: "bus",    label: "Transport" },
  { iconKey: "anchor", label: "Maritime" },
  { iconKey: "zap",    label: "Énergie" },
  { iconKey: "globe",  label: "Agriculture" },
];

const features = [
  { iconKey: "mappin", title: "Localiser",    desc: "Vos actifs partout dans le monde, en temps réel",              color: "from-pink-500 to-orange-400" },
  { iconKey: "eye",    title: "Surveiller",   desc: "Vos opérations 24h/24 et 7j/7 sans interruption",             color: "from-orange-400 to-yellow-400" },
  { iconKey: "bell",   title: "Être alerté",  desc: "En quelques minutes pour toute anomalie détectée",            color: "from-yellow-400 to-pink-400" },
  { iconKey: "ship",   title: "S-AIS",        desc: "Fiabilité des données maritimes inégalée sur toutes les mers", color: "from-pink-400 to-red-400" },
];

function SimIcon({ k, size }: { k: string; size: number }) {
  const p = { size };
  if (k === "wifi")   return <Wifi {...p} />;
  if (k === "leaf")   return <Leaf {...p} />;
  if (k === "bus")    return <Bus {...p} />;
  if (k === "anchor") return <Anchor {...p} />;
  if (k === "zap")    return <Zap {...p} />;
  if (k === "mappin") return <MapPin {...p} />;
  if (k === "eye")    return <Eye {...p} />;
  if (k === "bell")   return <Bell {...p} />;
  if (k === "ship")   return <Ship {...p} />;
  return <Globe {...p} />;
}

export function SimCard() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-950 via-blue-950 to-gray-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-600 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg shadow-pink-500/30">
            <Wifi size={16} />
            Distributeur Officiel — Cartes SIM M&amp;M IoT
          </div>
          <h2 className="text-4xl lg:text-5xl mb-4 text-white">
            Cartes SIM <span className="bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">M&amp;M IoT</span>
          </h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Nous vendons et activons les cartes SIM M&amp;M spécialement conçues pour l'IoT —
            connectivité mondiale multi-opérateurs pour tous vos équipements connectés.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 mb-14 backdrop-blur-sm">
          <h3 className="text-center text-2xl text-white mb-2">
            Une <span className="bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">Couverture Mondiale</span>, adaptée à tous vos besoins
          </h3>
          <p className="text-center text-blue-300 text-sm mb-10">Connectivité dans plus de 190 pays — réseau satellitaire et terrestre combinés</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition group">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <SimIcon k={f.iconKey} size={28} />
                </div>
                <h4 className="text-white mb-2">{f.title}</h4>
                <p className="text-blue-300 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 mb-14 backdrop-blur-sm">
          <h3 className="text-center text-2xl text-white mb-2">
            Une Constellation, des <span className="bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">Solutions pour chaque usage</span>
          </h3>
          <p className="text-center text-blue-300 text-sm mb-10">La SIM M&amp;M s'adapte à tous les secteurs d'activité</p>
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-6">
            {sectors.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-3 group">
                <div className="bg-gradient-to-br from-pink-600/30 to-orange-500/30 border border-pink-500/30 w-16 h-16 rounded-2xl flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform shadow-lg">
                  <SimIcon k={s.iconKey} size={32} />
                </div>
                <span className="text-blue-200 text-xs text-center">{s.label}</span>
                <div className="w-8 h-0.5 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center bg-gradient-to-r from-pink-600/20 to-orange-500/20 border border-pink-500/30 rounded-3xl p-10">
          <h3 className="text-2xl text-white mb-3">Équipez vos objets connectés avec la SIM M&amp;M IoT</h3>
          <p className="text-blue-200 mb-6 max-w-xl mx-auto">Compatible avec tous nos boîtiers GPS, dashcams et capteurs. Activation rapide, couverture immédiate.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-8 py-3 rounded-full hover:from-pink-600 hover:to-orange-600 transition shadow-lg shadow-pink-500/30">
              Commander mes SIM IoT →
            </a>
            <a href="#contact" className="border border-pink-400/50 text-pink-300 px-8 py-3 rounded-full hover:bg-pink-900/30 transition">
              Demander un devis
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
