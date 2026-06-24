import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { X, Fuel, TrendingDown, Mail, Phone, User, CheckCircle, Loader, ChevronRight, Search, Plus, Trash2 } from "lucide-react";

const EMAILJS_SERVICE_ID = "service_5uqkzo7";
const EMAILJS_TEMPLATE_ID = "template_wpxtf9q";
const EMAILJS_PUBLIC_KEY = "HdOknBy6C1NQ-mTbp";

const PRIX = { gasoil: 205, essence: 310 };

const PARAMS: Record<string, { label: string; icon: string; km: number; conso: number; pct: number }> = {
  lourd:      { label: "Camion lourd",       icon: "🚛", km: 250, conso: 32, pct: 18 },
  leger:      { label: "Véhicule léger",     icon: "🚗", km: 120, conso: 8,  pct: 15 },
  utilitaire: { label: "Utilitaire",          icon: "🚐", km: 150, conso: 12, pct: 20 },
  pickup:     { label: "Pick-up / 4x4",       icon: "🛻", km: 180, conso: 14, pct: 17 },
  moto:       { label: "Moto / scooter",      icon: "🏍️", km: 80,  conso: 4,  pct: 12 },
};

const BRANDS: Record<string, string[]> = {
  lourd: ["Autre","DAF","Iveco","MAN","Mercedes-Benz Trucks","Renault Trucks","Scania","Volvo Trucks","ERF","Leyland","Pegaso","AVIA","Isuzu","Mitsubishi Fuso","Hino","Nissan Diesel (UD Trucks)","Toyota Dyna","Mazda Titan","Sinotruk/Howo","Dongfeng","FAW","JAC","Beiben","Shacman","Camc","Foton Auman","Saic Hongyan","Sany","XCMG","Liugong","Dayun","North Benz","C&C Trucks","Hanma","Sitrak","Mack","Kenworth","Peterbilt","International","Western Star","Freightliner","TATA Motors","Ashok Leyland","Eicher","Mahindra","BharatBenz","Force Motors","Hyundai Trucks","Kia Trucks","Daewoo Trucks","MAZ","KAMAZ","ZIL","GAZ","Ural"],
  leger: ["Autre","Toyota","Honda","Nissan","Mazda","Mitsubishi","Subaru","Suzuki","Daihatsu","Lexus","Infiniti","Hyundai","Kia","Genesis","SsangYong","Daewoo","Renault","Peugeot","Citroën","DS","Alpine","Volkswagen","BMW","Mercedes-Benz","Audi","Porsche","Opel","Smart","MINI","Fiat","Alfa Romeo","Lancia","Maserati","Seat","Skoda","Volvo","Saab","Dacia","Lada","Bentley","Rolls-Royce","Jaguar","Land Rover","Aston Martin","Ford","Chevrolet","Dodge","Chrysler","Jeep","Cadillac","Lincoln","Buick","GMC","Tesla","Ram","BYD","Chery","Geely","MG","Haval","Great Wall","BAIC","SAIC","GAC","Changan","JAC","Roewe","Wuling","Baojun","Hongqi","NIO","Xpeng","Li Auto","AITO","Zeekr","Lynk & Co","Ora","Tank","Denza","AVATR","Mahindra","TATA Motors","Maruti Suzuki","Proton","Perodua"],
  utilitaire: ["Autre","Ford Transit","Ford Transit Connect","Renault Master","Renault Trafic","Renault Kangoo","Peugeot Boxer","Peugeot Expert","Peugeot Partner","Citroën Jumper","Citroën SpaceTourer","Citroën Berlingo","Fiat Ducato","Fiat Scudo","Fiat Doblo","Mercedes-Benz Sprinter","Mercedes-Benz Vito","Mercedes-Benz Citan","Volkswagen Crafter","Volkswagen Transporter","Volkswagen Caddy","Iveco Daily","Opel Movano","Opel Vivaro","Opel Combo","Toyota HiAce","Toyota Probox","Nissan NV200","Nissan Caravan","Mitsubishi L300","Mitsubishi Delica","Isuzu Elf","Honda N-Van","Mazda Bongo","Hyundai H350","Hyundai H1","Kia Bongo","Kia K2500","Foton","JAC","Dongfeng","FAW","Maxus","SAIC","DFSK","Jinbei","TATA Ace","Mahindra Supro","Ashok Leyland Dost","Force Traveller","Ford E-Series","Chevrolet Express","GMC Savana","Ram ProMaster"],
  pickup: ["Autre","Toyota Hilux","Toyota Land Cruiser Pickup","Toyota Tundra","Toyota Tacoma","Nissan Navara","Nissan Frontier","Nissan Titan","Mitsubishi L200","Isuzu D-Max","Mazda BT-50","Honda Ridgeline","Ssangyong Musso","Ford F-150","Ford F-250","Ford F-350","Ford Ranger","Chevrolet Colorado","Chevrolet Silverado","GMC Canyon","GMC Sierra","Dodge Ram 1500","Dodge Ram 2500","Jeep Gladiator","Ram 1500","Ram 2500","Volkswagen Amarok","Mercedes-Benz X-Class","Renault Alaskan","Fiat Fullback","Great Wall Wingle","Great Wall Poer","Foton Tunland","JAC T6","JMC Vigus","Dongfeng Rich","Changan Hunter","LDV T60","Maxus T60","BYD Shark","GWM Cannon","Mahindra Bolero Pikup","Tata Xenon","MG Extender"],
  moto: ["Autre","Honda","Honda CB","Honda CG","Honda PCX","Honda Vario","Yamaha","Yamaha R","Yamaha FZ","Yamaha NMAX","Yamaha Aerox","Yamaha Mio","Suzuki","Suzuki Gixxer","Kawasaki","Kawasaki Ninja","Kawasaki Z","TVS","Bajaj","Hero MotoCorp","Royal Enfield","Jawa","Yezdi","Mahindra Two Wheelers","Ola Electric","Ather Energy","KTM","Ducati","BMW Motorrad","Triumph","Piaggio","Aprilia","Moto Guzzi","Husqvarna","MV Agusta","Benelli","Vespa","Piaggio Liberty","Harley-Davidson","Indian Motorcycle","Zero Motorcycles","Lifan","Loncin","Zongshen","CFMoto","QJMotor","Voge","Haojue","Dayang","Jianshe","Longxi","Shineray","Wuyang-Honda","Sundiro Honda","Luyuan","Yadea","AIMA","Niu","Super Soco","Kymco","SYM","Hyosung","Daelim","GPX"],
};

interface VehicleEntry { id: number; type: string; brand: string; fuel: "gasoil" | "essence"; nb: number; }

function BrandSelect({ type, value, onChange }: { type: string; value: string; onChange: (v: string) => void }) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const brands = BRANDS[type] || [];
  const filtered = brands.filter(b => b.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button type="button" onClick={() => setOpen(!open)}
        className="w-full text-left border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-gray-600 bg-white hover:border-blue-400 transition flex justify-between items-center gap-1">
        <span className={value ? "text-gray-900 truncate" : "text-gray-400"}>{value || "Choisir marque..."}</span>
        <Search size={11} className="text-gray-400 shrink-0" />
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-44 flex flex-col" style={{ minWidth: 200 }}>
          <div className="p-2 border-b border-gray-100">
            <input autoFocus type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher..."
              className="w-full text-xs px-2 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
          <div className="overflow-y-auto">
            {filtered.map(b => (
              <button key={b} type="button"
                onClick={() => { onChange(b); setSearch(""); setOpen(false); }}
                className={`w-full text-left px-3 py-1.5 text-xs hover:bg-blue-50 transition ${value === b ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-700"}`}>
                {b}
              </button>
            ))}
            {filtered.length === 0 && <p className="text-xs text-gray-400 px-3 py-2">Aucun résultat</p>}
          </div>
        </div>
      )}
    </div>
  );
}

let nextId = 1;

interface Props { onClose: () => void; }

export function FuelSimulator({ onClose }: Props) {
  const [step, setStep] = useState<"form" | "result" | "email" | "done">("form");
  const [entries, setEntries] = useState<VehicleEntry[]>([
    { id: nextId++, type: "lourd", brand: "", fuel: "gasoil", nb: 1 },
  ]);
  const [contact, setContact] = useState({ name: "", phone: "", email: "" });
  const [sending, setSending] = useState(false);

  const addEntry = (type: string) => {
    setEntries(e => [...e, { id: nextId++, type, brand: "", fuel: "gasoil", nb: 1 }]);
  };

  const removeEntry = (id: number) => {
    setEntries(e => e.filter(x => x.id !== id));
  };

  const updateEntry = (id: number, patch: Partial<VehicleEntry>) => {
    setEntries(e => e.map(x => x.id === id ? { ...x, ...patch } : x));
  };

  const totalVehicles = entries.reduce((s, e) => s + e.nb, 0);

  const results = entries.filter(e => e.nb > 0).map(e => {
    const p = PARAMS[e.type];
    const prix = PRIX[e.fuel];
    const conso_jour = (p.km * p.conso) / 100;
    const cout_mois = conso_jour * prix * 26 * e.nb;
    const economie_mois = cout_mois * (p.pct / 100);
    return { ...e, economie_mois, economie_an: economie_mois * 12, pct: p.pct };
  });

  const total_mois = results.reduce((s, r) => s + r.economie_mois, 0);
  const total_an = results.reduce((s, r) => s + r.economie_an, 0);

  async function sendResult() {
    if (!contact.name || !contact.email) return;
    setSending(true);
    const detail = results.map(r =>
      `- ${PARAMS[r.type].icon} ${PARAMS[r.type].label}${r.brand ? ` [${r.brand}]` : ""} × ${r.nb} (${r.fuel === "gasoil" ? "Gasoil 205 DJF/L" : "Essence 310 DJF/L"}) → ${Math.round(r.economie_mois).toLocaleString()} DJF/mois (-${r.pct}%)`
    ).join("\n");

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        subject: "Nouvelle Simulation Carburant",
        name: contact.name,
        email: contact.email,
        phone: contact.phone || "Non renseigné",
        message: `SIMULATION CARBURANT DTS\n\nFlotte : ${totalVehicles} véhicule(s)\n\n${detail}\n\nTOTAL :\n→ /mois : ${Math.round(total_mois).toLocaleString()} DJF\n→ /an   : ${Math.round(total_an).toLocaleString()} DJF`,
        comment: `Simulation carburant envoyée à ${contact.email}`,
        date: new Date().toLocaleDateString("fr-FR"),
        time: new Date().toLocaleTimeString("fr-FR"),
        to_email: "dts@djiboutigps.com",
      }, EMAILJS_PUBLIC_KEY);
      setStep("done");
    } catch {
      alert("Erreur d'envoi. Réessayez.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>

        <div className="sticky top-0 bg-gradient-to-r from-green-600 to-blue-700 text-white px-6 py-4 flex justify-between items-center rounded-t-2xl">
          <div className="flex items-center gap-3">
            <Fuel size={22} />
            <div>
              <h2 className="text-lg font-bold">Simulateur d'économie de carburant</h2>
              <p className="text-green-200 text-xs">Gasoil : 205 DJF/L · Essence : 310 DJF/L</p>
            </div>
          </div>
          <button onClick={onClose} className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition"><X size={18} /></button>
        </div>

        <div className="p-5">

          {/* STEP 1 - Flotte */}
          {step === "form" && (
            <div className="space-y-4">
              <p className="text-sm text-gray-500 text-center">Ajoutez chaque véhicule avec sa marque et son carburant</p>

              {/* Lignes de véhicules */}
              <div className="space-y-2">
                {entries.map((entry) => (
                  <div key={entry.id} className="bg-gray-50 rounded-xl p-3 flex flex-wrap gap-2 items-center">
                    {/* Type */}
                    <select value={entry.type} onChange={e => updateEntry(entry.id, { type: e.target.value, brand: "" })}
                      className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
                      {Object.entries(PARAMS).map(([k, p]) => (
                        <option key={k} value={k}>{p.icon} {p.label}</option>
                      ))}
                    </select>

                    {/* Marque */}
                    <div className="flex-1 min-w-[140px]">
                      <BrandSelect type={entry.type} value={entry.brand}
                        onChange={v => updateEntry(entry.id, { brand: v })} />
                    </div>

                    {/* Carburant */}
                    <select value={entry.fuel} onChange={e => updateEntry(entry.id, { fuel: e.target.value as any })}
                      className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
                      <option value="gasoil">🟤 Gasoil</option>
                      <option value="essence">🟡 Essence</option>
                    </select>

                    {/* Nombre */}
                    <div className="flex items-center gap-1">
                      <button onClick={() => updateEntry(entry.id, { nb: Math.max(1, entry.nb - 1) })}
                        className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 font-bold text-gray-700 text-xs transition">−</button>
                      <span className="w-5 text-center font-bold text-sm">{entry.nb}</span>
                      <button onClick={() => updateEntry(entry.id, { nb: entry.nb + 1 })}
                        className="w-6 h-6 rounded-full bg-blue-600 hover:bg-blue-700 font-bold text-white text-xs transition">+</button>
                    </div>

                    {/* Supprimer */}
                    {entries.length > 1 && (
                      <button onClick={() => removeEntry(entry.id)}
                        className="text-red-400 hover:text-red-600 transition p-1">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Boutons Ajouter par type */}
              <div className="border border-dashed border-gray-300 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-2 text-center">Ajouter un véhicule</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {Object.entries(PARAMS).map(([k, p]) => (
                    <button key={k} onClick={() => addEntry(k)}
                      className="flex items-center gap-1 bg-white border border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-gray-700 px-3 py-1.5 rounded-full text-xs transition">
                      <Plus size={11} /> {p.icon} {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-center text-xs text-gray-400">
                {totalVehicles} véhicule(s) au total
              </div>

              <button onClick={() => setStep("result")}
                className="w-full bg-gradient-to-r from-green-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition flex items-center justify-center gap-2">
                Calculer mes économies <ChevronRight size={18} />
              </button>
            </div>
          )}

          {/* STEP 2 - Résultats */}
          {step === "result" && (
            <div className="space-y-4">
              <div className="text-center bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
                <TrendingDown size={40} className="text-green-600 mx-auto mb-3" />
                <p className="text-gray-500 text-sm mb-1">Économies annuelles estimées</p>
                <p className="text-4xl font-bold text-green-600">{Math.round(total_an).toLocaleString()} DJF</p>
                <p className="text-gray-500 text-sm mt-1">soit <strong>{Math.round(total_mois).toLocaleString()} DJF / mois</strong></p>
              </div>

              <div className="space-y-2 max-h-52 overflow-y-auto">
                {results.map((r, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-3 flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-900 text-xs">
                        {PARAMS[r.type].icon} {r.nb}× {PARAMS[r.type].label}{r.brand ? ` — ${r.brand}` : ""}
                      </p>
                      <p className="text-xs text-gray-400">{r.fuel === "gasoil" ? "🟤 Gasoil" : "🟡 Essence"} · -{r.pct}%</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600 text-sm">{Math.round(r.economie_mois).toLocaleString()} DJF/mois</p>
                      <p className="text-xs text-gray-400">{Math.round(r.economie_an).toLocaleString()} /an</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-700">
                📊 Basé sur études Geotab, Samsara et ALD Automotive (économies moyennes 12–20%).
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setStep("form")} className="border border-gray-300 text-gray-600 py-3 rounded-xl hover:bg-gray-50 transition text-sm">← Modifier</button>
                <button onClick={() => setStep("email")} className="bg-gradient-to-r from-green-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 text-sm">
                  <Mail size={16} /> Recevoir par email
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 - Email */}
          {step === "email" && (
            <div className="space-y-4">
              <p className="text-gray-600 text-sm text-center">Recevez votre simulation par email</p>
              {[
                { key: "name", label: "Nom complet *", icon: <User size={13} />, type: "text", ph: "Votre nom" },
                { key: "phone", label: "Téléphone", icon: <Phone size={13} />, type: "tel", ph: "+253 77 ..." },
                { key: "email", label: "Email *", icon: <Mail size={13} />, type: "email", ph: "votre@email.com" },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">{f.icon} {f.label}</label>
                  <input type={f.type} value={contact[f.key as keyof typeof contact]}
                    onChange={e => setContact(c => ({ ...c, [f.key]: e.target.value }))}
                    placeholder={f.ph}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              ))}
              <button disabled={!contact.name || !contact.email || sending} onClick={sendResult}
                className="w-full bg-gradient-to-r from-green-600 to-blue-700 text-white py-3 rounded-xl font-semibold disabled:opacity-40 flex items-center justify-center gap-2">
                {sending ? <><Loader size={16} className="animate-spin" /> Envoi...</> : <><Mail size={16} /> Envoyer ma simulation</>}
              </button>
            </div>
          )}

          {/* STEP 4 - Done */}
          {step === "done" && (
            <div className="text-center py-8">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Simulation envoyée !</h3>
              <p className="text-gray-500 text-sm mb-6">Résultats envoyés à <strong>{contact.email}</strong>.</p>
              <button onClick={onClose} className="bg-blue-700 text-white px-8 py-2 rounded-full hover:bg-blue-800 transition">Fermer</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
