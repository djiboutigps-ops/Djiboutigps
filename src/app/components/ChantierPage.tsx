import { useState, useEffect } from "react";
import {
  ArrowLeft, Phone, Mail, Search, ChevronRight, Star,
  Clock, Shield, Truck, HeartHandshake, Wrench,
  HardHat, Zap, Droplets, TreePine, Package,
  ArrowRight, MapPin, CheckCircle, X
} from "lucide-react";

interface Props { onClose: () => void; }

const STATS = [
  { value: "500+", label: "Matériels disponibles" },
  { value: "24h/24", label: "Service & assistance" },
  { value: "7j/7", label: "Livraison sur chantier" },
  { value: "100%", label: "Matériel assuré" },
];

const UNIVERSES_DATA = [
  { label: "Engins de terrassement",   count: 24, color: "bg-orange-50 text-orange-600 border-orange-200", iconName: "Truck" },
  { label: "Groupes électrogènes",     count: 18, color: "bg-yellow-50 text-yellow-600 border-yellow-200", iconName: "Zap" },
  { label: "Outillage & compresseurs", count: 45, color: "bg-blue-50 text-blue-600 border-blue-200",   iconName: "Wrench" },
  { label: "Échafaudages & nacelles",  count: 30, color: "bg-red-50 text-red-600 border-red-200",     iconName: "HardHat" },
  { label: "Pompes & assainissement",  count: 15, color: "bg-cyan-50 text-cyan-600 border-cyan-200",  iconName: "Droplets" },
  { label: "Matériaux de construction",count: 60, color: "bg-stone-50 text-stone-600 border-stone-200",iconName: "Package" },
  { label: "Matériels verts & éco",    count: 12, color: "bg-green-50 text-green-600 border-green-200",iconName: "TreePine" },
  { label: "Sécurité & signalisation", count: 28, color: "bg-purple-50 text-purple-600 border-purple-200",iconName: "Shield" },
];

const SERVICES_DATA = [
  { title: "Livraison sur chantier", desc: "Livraison et reprise de vos équipements directement sur site à Djibouti et région.", iconName: "Truck" },
  { title: "Maintenance incluse",    desc: "Tous nos matériels sont entretenus et vérifiés avant chaque location.", iconName: "Wrench" },
  { title: "Disponibilité 24h/24",   desc: "Notre équipe est joignable à toute heure pour les urgences chantier.", iconName: "Clock" },
  { title: "Conseil personnalisé",   desc: "Un expert vous aide à choisir le bon matériel pour votre projet.", iconName: "HeartHandshake" },
  { title: "Matériel assuré",        desc: "Tous les engins et équipements sont assurés pour votre tranquillité sur chantier.", iconName: "Shield" },
];

const PRODUCTS = [
  { name: "Pelleteuse 20T",         cat: "Engins",       img: "https://images.unsplash.com/photo-1592890288564-76628a30a657?w=400&q=80", day: "45 000 DJF", week: "250 000 DJF", type: "location" },
  { name: "Groupe électrogène 20KVA", cat: "Électricité", img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&q=80", day: "25 000 DJF", week: "140 000 DJF", type: "both" },
  { name: "Bétonneuse 350L",        cat: "Outillage",    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80", day: "8 000 DJF",  week: "45 000 DJF",  type: "both" },
  { name: "Nacelle ciseaux 8m",     cat: "Nacelles",     img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80", day: "18 000 DJF", week: "100 000 DJF", type: "location" },
  { name: "Compresseur 7 bars",     cat: "Outillage",    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", day: "12 000 DJF", week: "65 000 DJF",  type: "both" },
  { name: "Ciment Portland 50kg",   cat: "Matériaux",    img: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=400&q=80", day: "—",          sell: "2 500 DJF/sac", type: "vente" },
  { name: "Chariot élévateur 3T",   cat: "Engins",       img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", day: "20 000 DJF", week: "110 000 DJF", type: "location" },
  { name: "Pompe à eau 4 pouces",   cat: "Pompes",       img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&q=80", day: "6 000 DJF",  week: "32 000 DJF",  type: "both" },
  { name: "Échafaudage (par m²)",   cat: "Échafaudages", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80", day: "500 DJF/m²", week: "—",           type: "location" },
];

const CLIENT_CODE = "AKRAM2027";

export function ChantierPage({ onClose }: Props) {
  const [step, setStep] = useState<"code" | "profil" | "statut" | "compte" | "main">("code");
  const [codeInput, setCodeInput] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [profil, setProfil] = useState<"particulier" | "professionnel" | null>(null);
  const [statut, setStatut] = useState<"locataire" | "proprietaire" | null>(null);
  const [search, setSearch] = useState("");
  const [activeUniverse, setActiveUniverse] = useState("Tous");
  const [showQuote, setShowQuote] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof PRODUCTS[0] | null>(null);

  // Changer le titre de l'onglet en DTSGPS
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "DTSGPS";
    return () => {
      document.title = originalTitle;
    };
  }, []);

  const getIcon = (name: string, size: number) => {
    const props = { size };
    switch(name) {
      case "Truck": return <Truck {...props} />;
      case "Zap": return <Zap {...props} />;
      case "Wrench": return <Wrench {...props} />;
      case "HardHat": return <HardHat {...props} />;
      case "Droplets": return <Droplets {...props} />;
      case "Package": return <Package {...props} />;
      case "TreePine": return <TreePine {...props} />;
      case "Shield": return <Shield {...props} />;
      case "Clock": return <Clock {...props} />;
      case "HeartHandshake": return <HeartHandshake {...props} />;
      default: return <Package {...props} />;
    }
  };

  // Étape 0 — Code client
  if (step === "code") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-orange-900 flex items-center justify-center p-4 relative">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">
          <button onClick={onClose} className="absolute top-6 left-6 text-gray-400 hover:text-gray-600 flex items-center gap-1 text-sm">
            <ArrowLeft size={16} /> Retour
          </button>
          <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">🔐</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Espace réservé</h2>
          <p className="text-gray-500 mb-8">Veuillez saisir votre code client pour accéder à la plateforme DTS Chantier.</p>
          <div className="space-y-4">
            <input
              type="text"
              value={codeInput}
              onChange={e => { setCodeInput(e.target.value.toUpperCase()); setCodeError(false); }}
              onKeyDown={e => { if (e.key === "Enter") { if (codeInput === CLIENT_CODE) setStep("profil"); else setCodeError(true); } }}
              placeholder="Entrez votre code client"
              className={`w-full border-2 rounded-xl px-4 py-3 text-center text-lg font-bold tracking-widest focus:outline-none transition ${codeError ? "border-red-400 bg-red-50 text-red-600" : "border-gray-300 focus:border-orange-500"}`}
            />
            {codeError && (
              <p className="text-red-500 text-sm">❌ Code incorrect. Veuillez réessayer.</p>
            )}
            <button
              onClick={() => { if (codeInput === CLIENT_CODE) setStep("profil"); else setCodeError(true); }}
              className="w-full bg-orange-600 text-white py-3 rounded-xl font-semibold hover:bg-orange-700 transition"
            >
              Accéder →
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-6">
            Vous n'avez pas de code ? Contactez-nous au <a href="tel:+25377803232" className="text-orange-600 hover:underline">+253 77 80 32 32</a>
          </p>
        </div>
      </div>
    );
  }

  // Étape 1 — Particulier ou Professionnel
  if (step === "profil") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-orange-900 flex items-center justify-center p-4 relative">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center">
          <button onClick={onClose} className="absolute top-6 left-6 text-gray-400 hover:text-gray-600 flex items-center gap-1 text-sm">
            <ArrowLeft size={16} /> Retour
          </button>
          <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HardHat size={32} className="text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Bienvenue sur DTS Chantier</h2>
          <p className="text-gray-500 mb-8">Pour mieux vous accompagner, dites-nous qui vous êtes :</p>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => { setProfil("particulier"); setStep("statut"); }}
              className="group border-2 border-gray-200 hover:border-orange-500 rounded-2xl p-6 text-center transition hover:bg-orange-50"
            >
              <div className="w-12 h-12 bg-blue-100 group-hover:bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition">
                <span className="text-2xl">👤</span>
              </div>
              <p className="font-bold text-gray-900">Particulier</p>
              <p className="text-xs text-gray-400 mt-1">Usage personnel ou familial</p>
            </button>
            <button
              onClick={() => { setProfil("professionnel"); setStep("statut"); }}
              className="group border-2 border-gray-200 hover:border-orange-500 rounded-2xl p-6 text-center transition hover:bg-orange-50"
            >
              <div className="w-12 h-12 bg-orange-100 group-hover:bg-orange-200 rounded-xl flex items-center justify-center mx-auto mb-3 transition">
                <span className="text-2xl">🏢</span>
              </div>
              <p className="font-bold text-gray-900">Professionnel</p>
              <p className="text-xs text-gray-400 mt-1">Entreprise, artisan, BTP</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Étape 3 — Connexion ou Inscription
  if (step === "compte") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-orange-900 flex items-center justify-center p-4 relative">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center">
          <button onClick={() => setStep("statut")} className="absolute top-6 left-6 text-gray-400 hover:text-gray-600 flex items-center gap-1 text-sm">
            <ArrowLeft size={16} /> Retour
          </button>
          <div className="flex justify-center gap-2 mb-6">
            <span className="bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full">
              {profil === "particulier" ? "👤 Particulier" : "🏢 Professionnel"}
            </span>
            <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">
              {statut === "locataire" ? "🔑 Locataire" : "🏗️ Propriétaire"}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Vous avez déjà un compte ?</h2>
          <p className="text-gray-500 mb-8">Connectez-vous pour accéder à vos commandes et bénéficier de tarifs personnalisés.</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => setStep("main")}
              className="group border-2 border-gray-200 hover:border-orange-500 rounded-2xl p-6 text-center transition hover:bg-orange-50"
            >
              <div className="w-12 h-12 bg-orange-100 group-hover:bg-orange-200 rounded-xl flex items-center justify-center mx-auto mb-3 transition">
                <span className="text-2xl">🔓</span>
              </div>
              <p className="font-bold text-gray-900">Se connecter</p>
              <p className="text-xs text-gray-400 mt-1">J'ai déjà un compte</p>
            </button>
            <button
              onClick={() => setStep("main")}
              className="group border-2 border-gray-200 hover:border-orange-500 rounded-2xl p-6 text-center transition hover:bg-orange-50"
            >
              <div className="w-12 h-12 bg-green-100 group-hover:bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition">
                <span className="text-2xl">✍️</span>
              </div>
              <p className="font-bold text-gray-900">S'inscrire</p>
              <p className="text-xs text-gray-400 mt-1">Créer un compte gratuit</p>
            </button>
          </div>

          <button onClick={() => setStep("main")} className="text-sm text-gray-400 hover:text-gray-600 transition underline">
            Continuer sans compte →
          </button>
        </div>
      </div>
    );
  }

  // Étape 2 — Locataire ou Propriétaire
  if (step === "statut") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-orange-900 flex items-center justify-center p-4 relative">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center">
          <button onClick={() => setStep("profil")} className="absolute top-6 left-6 text-gray-400 hover:text-gray-600 flex items-center gap-1 text-sm">
            <ArrowLeft size={16} /> Retour
          </button>
          <div className="inline-block bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full mb-6">
            {profil === "particulier" ? "👤 Particulier" : "🏢 Professionnel"}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Quelle est votre situation ?</h2>
          <p className="text-gray-500 mb-8">Cela nous permet de vous proposer les meilleures offres :</p>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => { setStatut("locataire"); setStep("compte"); }}
              className="group border-2 border-gray-200 hover:border-orange-500 rounded-2xl p-6 text-center transition hover:bg-orange-50"
            >
              <div className="w-12 h-12 bg-blue-100 group-hover:bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition">
                <span className="text-2xl">🔑</span>
              </div>
              <p className="font-bold text-gray-900">Locataire</p>
              <p className="text-xs text-gray-400 mt-1">Je loue du matériel</p>
            </button>
            <button
              onClick={() => { setStatut("proprietaire"); setStep("compte"); }}
              className="group border-2 border-gray-200 hover:border-orange-500 rounded-2xl p-6 text-center transition hover:bg-orange-50"
            >
              <div className="w-12 h-12 bg-green-100 group-hover:bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition">
                <span className="text-2xl">🏗️</span>
              </div>
              <p className="font-bold text-gray-900">Propriétaire</p>
              <p className="text-xs text-gray-400 mt-1">J'achète du matériel</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const filtered = PRODUCTS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeUniverse === "Tous" || p.cat === activeUniverse;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* Top bar */}
      <div className="bg-gray-900 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><MapPin size={12} /> Djibouti — Livraison sur chantier</span>
            <span className="flex items-center gap-1"><Clock size={12} /> 24h/24 · 7j/7</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+25377803232" className="flex items-center gap-1 hover:text-orange-400 transition"><Phone size={12} /> +253 77 80 32 32</a>
            <a href="mailto:dts@djiboutigps.com" className="flex items-center gap-1 hover:text-orange-400 transition"><Mail size={12} /> dts@djiboutigps.com</a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button onClick={onClose} className="flex items-center gap-2 text-gray-500 hover:text-orange-600 transition text-sm">
              <ArrowLeft size={16} /> Retour DTS
            </button>
            <div className="h-6 w-px bg-gray-200" />
            <div>
              <span className="text-xl font-bold text-orange-600">DTS</span>
              <span className="text-xl font-bold text-gray-800"> Chantier</span>
              <p className="text-xs text-gray-500 leading-none">Supply</p>
            </div>
            {profil && statut && (
              <div className="hidden sm:flex items-center gap-2 bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-full text-xs text-orange-700">
                {profil === "particulier" ? "👤" : "🏢"} {profil === "particulier" ? "Particulier" : "Professionnel"} ·
                {statut === "locataire" ? " 🔑 Locataire" : " 🏗️ Propriétaire"}
                <button onClick={() => setStep("profil")} className="ml-1 text-orange-400 hover:text-orange-600">✎</button>
              </div>
            )}
          </div>

          {/* Search */}
          <div className="flex-1 max-w-xl hidden sm:flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2.5">
            <Search size={16} className="text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher un matériel..."
              className="bg-transparent flex-1 text-sm focus:outline-none text-gray-700"
            />
          </div>

          <button
            onClick={() => setShowQuote(true)}
            className="bg-orange-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-orange-700 transition whitespace-nowrap">
            Demander un devis
          </button>
        </div>
      </header>

      {/* Hero */}
      <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white overflow-hidden">
        <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80" alt="Chantier" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">
            Supply<br />
            <span className="text-orange-400">Matériels de Chantier à Djibouti</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Plus de 500 matériels disponibles · Livraison sur chantier · Tarifs journaliers, hebdomadaires et mensuels
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => setShowQuote(true)} className="bg-orange-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-orange-700 transition text-lg">
              Demander un devis gratuit
            </button>
            <a href="tel:+25377803232" className="bg-white/10 border border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition text-lg">
              Nous appeler
            </a>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {STATS.map(s => (
            <div key={s.label}>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-orange-200 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Univers produits */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Nos univers produits</h2>
          <p className="text-gray-500 mb-6">Sélectionnez une catégorie pour affiner votre recherche</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {UNIVERSES_DATA.map(u => (
              <button
                key={u.label}
                onClick={() => setActiveUniverse(activeUniverse === u.label.split(" ")[0] ? "Tous" : u.label.split(" ")[0])}
                className={`${u.color} border rounded-2xl p-5 flex flex-col items-center gap-3 hover:shadow-md transition group text-left`}
              >
                {getIcon(u.iconName, 32)}
                <div>
                  <p className="text-sm font-semibold leading-tight">{u.label}</p>
                  <p className="text-xs opacity-60 mt-0.5">{u.count} matériels</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Catalogue */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Catalogue</h2>
            <div className="flex items-center gap-2 sm:hidden bg-gray-100 rounded-full px-3 py-2">
              <Search size={14} className="text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher..." className="bg-transparent text-sm focus:outline-none w-28" />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {["Tous", "Engins", "Outillage", "Nacelles", "Matériaux", "Pompes"].map(c => (
              <button key={c} onClick={() => setActiveUniverse(c)}
                className={`px-4 py-2 rounded-full text-sm border transition ${activeUniverse === c ? "bg-orange-600 text-white border-orange-600" : "bg-white text-gray-600 border-gray-200 hover:border-orange-400"}`}>
                {c}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(p => (
              <div key={p.name} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition group">
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    {p.type === "location" && <span className="bg-blue-600 text-white text-xs px-2.5 py-1 rounded-full">Location</span>}
                    {p.type === "vente" && <span className="bg-green-600 text-white text-xs px-2.5 py-1 rounded-full">Vente</span>}
                    {p.type === "both" && <span className="bg-purple-600 text-white text-xs px-2.5 py-1 rounded-full">Location & Vente</span>}
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs text-orange-600 font-medium mb-1">{p.cat}</p>
                  <h3 className="font-bold text-gray-900 mb-3">{p.name}</h3>
                  <div className="bg-gray-50 rounded-xl p-3 mb-4 space-y-1.5">
                    {p.day && p.day !== "—" && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Journée</span>
                        <span className="font-bold text-gray-900">{p.day}</span>
                      </div>
                    )}
                    {p.week && p.week !== "—" && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Semaine</span>
                        <span className="font-bold text-gray-900">{p.week}</span>
                      </div>
                    )}
                    {p.sell && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Achat</span>
                        <span className="font-bold text-green-600">{p.sell}</span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => { setSelectedProduct(p); setShowQuote(true); }}
                    className="w-full bg-orange-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-orange-700 transition flex items-center justify-center gap-2">
                    Demander un devis <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Pourquoi choisir DTS Chantier ?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {SERVICES_DATA.map(s => (
              <div key={s.title} className="text-center">
                <div className="bg-orange-100 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-orange-600">
                  {getIcon(s.iconName, 24)}
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-2">{s.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gray-900 text-white rounded-3xl p-10 text-center">
          <h3 className="text-2xl font-bold mb-3">Un projet de chantier à Djibouti ?</h3>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">Contactez notre équipe pour un devis personnalisé. Livraison rapide, matériel certifié, tarifs dégressifs pour longue durée.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setShowQuote(true)} className="bg-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-700 transition">
              Demander un devis gratuit
            </button>
            <a href="https://wa.me/25377803232" target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-600 transition">
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4 mt-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p>© 2026 DTS Chantier — Djibouti Telematics Solutions</p>
          <div className="flex gap-4">
            <a href="tel:+25377803232" className="hover:text-white transition flex items-center gap-1"><Phone size={13} /> +253 77 80 32 32</a>
            <a href="mailto:dts@djiboutigps.com" className="hover:text-white transition">dts@djiboutigps.com</a>
          </div>
        </div>
      </footer>

      {/* Modal devis */}
      {showQuote && (
        <div className="fixed inset-0 bg-black/60 z-[300] flex items-center justify-center p-4" onClick={() => setShowQuote(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Demande de devis</h3>
                {selectedProduct && <p className="text-sm text-orange-600 mt-0.5">{selectedProduct.name}</p>}
              </div>
              <button onClick={() => { setShowQuote(false); setSelectedProduct(null); }} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Nom complet *</label>
                <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Votre nom" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Téléphone / WhatsApp *</label>
                <input type="tel" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="+253 77 ..." />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Matériel souhaité</label>
                <input type="text" defaultValue={selectedProduct?.name || ""} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Nom du matériel" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Date début</label>
                  <input type="date" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Date fin</label>
                  <input type="date" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Adresse du chantier</label>
                <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Localisation du chantier" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Message</label>
                <textarea rows={3} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none" placeholder="Décrivez votre besoin..." />
              </div>
            </div>
            <button className="w-full mt-6 bg-orange-600 text-white py-3 rounded-xl font-semibold hover:bg-orange-700 transition flex items-center justify-center gap-2">
              Envoyer la demande <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}