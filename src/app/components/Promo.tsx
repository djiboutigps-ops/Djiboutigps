import { Gift, Clock, CreditCard, Zap, Wifi } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

export function PromoBanner() {
  const { T } = useLanguage();
  return (
    <div className="bg-black text-white py-1.5 px-2 text-center fixed top-0 w-full z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs">
        <span className="flex items-center gap-1 animate-pulse">
          <Zap size={14} className="text-yellow-300" />
          <span>{T.banner.offer}</span>
        </span>
        <span className="flex items-center gap-1">
          <Gift size={14} className="text-yellow-300" />
          <strong>{T.banner.box}</strong>
        </span>
        <span className="hidden sm:block text-white/60">|</span>
        <span className="flex items-center gap-1">
          <Clock size={14} className="text-yellow-300" />
          <span>{T.banner.trial}</span>
        </span>
        <span className="hidden sm:block text-white/60">|</span>
        <span className="flex items-center gap-1">
          <CreditCard size={14} className="text-yellow-300" />
          <span>{T.banner.sub}</span>
        </span>
      </div>
    </div>
  );
}

export function PromoSection() {
  const { T } = useLanguage();
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm mb-4 border border-blue-200">
            {T.promo.badge}
          </span>
          <h2 className="text-4xl text-gray-900 mb-4">{T.promo.title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{T.promo.subtitle}</p>
        </div>

        {/* Rangée 1 - 4 cartes principales */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Card 1 - Essai gratuit */}
          <div className="bg-black rounded-2xl p-8 shadow-lg border border-gray-800 relative overflow-hidden hover:shadow-xl transition-shadow">
            <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs px-3 py-1 rounded-bl-xl">
              {T.promo.trial_tag}
            </div>
            <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <Clock className="text-orange-500" size={32} />
            </div>
            <h3 className="text-2xl text-white mb-3">{T.promo.trial_title}</h3>
            <p className="text-gray-400 mb-6">{T.promo.trial_desc}</p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> {T.promo.install}</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> {T.promo.support}</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> {T.promo.nocard}</li>
            </ul>
          </div>

          {/* Card 2 - Matériel offert */}
          <div className="bg-black rounded-2xl p-8 shadow-xl border-2 border-orange-500 relative overflow-hidden hover:shadow-2xl transition-shadow scale-105">
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-3 py-1 rounded-bl-xl">
              {T.promo.hardware_tag}
            </div>
            <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <Gift className="text-blue-600" size={32} />
            </div>
            <h3 className="text-2xl text-white mb-3">{T.promo.hardware_title}</h3>
            <p className="text-gray-400 mb-6">{T.promo.hardware_desc}</p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Boîtier 2G + 4G — <span className="text-green-600 font-semibold ml-1">{T.promo.free}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Jauge carburant — <span className="text-green-600 font-semibold ml-1">{T.promo.free}</span>
              </li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> {T.promo.install}</li>
              <li className="mt-3 text-xs text-gray-500 italic">{T.promo.note}</li>
            </ul>
          </div>

          {/* Card 3 - Abonnement */}
          <div className="bg-black rounded-2xl p-8 shadow-lg border border-gray-800 relative overflow-hidden hover:shadow-xl transition-shadow">
            <div className="absolute top-0 right-0 bg-cyan-600 text-white text-xs px-3 py-1 rounded-bl-xl">
              {T.promo.sub_tag}
            </div>
            <div className="bg-cyan-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <CreditCard className="text-cyan-600" size={32} />
            </div>
            <h3 className="text-2xl text-white mb-3 text-center">{T.promo.sub_title}</h3>
            <div className="flex items-baseline justify-center gap-1 mb-3">
              <span className="text-2xl text-cyan-600">1 500</span>
              <span className="text-gray-400">DJF / mois</span>
            </div>
            <p className="text-gray-400 mb-6 text-center">{T.promo.sub_desc}</p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> {T.promo.payment_end}</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> {T.promo.install}</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> {T.promo.no_commitment}</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> {T.promo.cancel}</li>
            </ul>
          </div>

          {/* Card 4 - SIM IoT M&M */}
          <div className="bg-black rounded-2xl p-8 shadow-lg border border-gray-800 relative overflow-hidden hover:shadow-xl transition-shadow">
            <div className="absolute top-0 right-0 bg-pink-600 text-white text-xs px-3 py-1 rounded-bl-xl">
              SIM IoT
            </div>
            <div className="bg-pink-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <Wifi className="text-pink-600" size={32} />
            </div>
            <h3 className="text-2xl text-gray-900 mb-3 text-center">Carte SIM M&amp;M IoT</h3>
            <div className="flex items-baseline justify-center gap-1 mb-3">
              <span className="text-4xl text-pink-600">300</span>
              <span className="text-gray-400">DJF / mois</span>
            </div>
            <p className="text-gray-600 mb-6 text-center">
              Connectivité mondiale multi-opérateurs pour tous vos équipements IoT. Compatible avec tous nos boîtiers GPS et capteurs.
            </p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Couverture 190+ pays</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Multi-opérateurs (2G / 4G)</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Activation immédiate</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Sans engagement</li>
            </ul>
          </div>

        </div>

        {/* Rangée 2 - 4 cartes suivi spécialisé */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">

          {/* Card - Suivi Animaux */}
          <div className="bg-black rounded-2xl p-6 shadow-lg border border-gray-800 relative overflow-hidden hover:shadow-xl transition-shadow">
            <div className="absolute top-0 right-0 bg-green-600 text-white text-xs px-3 py-1 rounded-bl-xl">GPS ANIMAUX</div>
            <div className="bg-green-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-4">
              <span className="text-3xl">🐄</span>
            </div>
            <h3 className="text-xl text-gray-900 mb-2 text-center">Suivi Animaux</h3>
            <div className="flex items-baseline justify-center gap-1 mb-3">
              <span className="text-2xl text-green-600">2 000</span>
              <span className="text-gray-600 text-sm">DJF / mois</span>
            </div>
            <ul className="space-y-1.5 text-sm text-gray-300">
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> GPS temps réel</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Carte SIM IoT incluse</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Historique de déplacement</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Alerte animal immobile</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Alertes de zone</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> 🔋 Batterie 5 ans</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Sans engagement</li>
            </ul>
          </div>

          {/* Card - Suivi Enfants */}
          <div className="bg-black rounded-2xl p-6 shadow-lg border border-gray-800 relative overflow-hidden hover:shadow-xl transition-shadow">
            <div className="absolute top-0 right-0 bg-pink-500 text-white text-xs px-3 py-1 rounded-bl-xl">SÉCURITÉ FAMILLE</div>
            <div className="flex gap-2 justify-center mb-4">
              <span className="text-3xl">👧</span>
              <span className="text-3xl">👴</span>
            </div>
            <h3 className="text-xl text-gray-900 mb-2 text-center">Suivi Enfants & Personnes Âgées</h3>
            <div className="flex items-baseline justify-center gap-1 mb-3">
              <span className="text-2xl text-pink-600">1 500</span>
              <span className="text-gray-600 text-sm">DJF / mois</span>
            </div>
            <ul className="space-y-1.5 text-sm text-gray-300">
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Localisation en temps réel</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Bouton SOS d'urgence</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Détection de chute (personnes âgées)</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Zone de sécurité (école, maison)</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Alerte sortie de zone</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Notification famille en temps réel</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Léger, discret et portable</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Sans engagement</li>
            </ul>
          </div>

          {/* Card - Suivi Vedette/Bateau */}
          <div className="bg-black rounded-2xl p-6 shadow-lg border border-gray-800 relative overflow-hidden hover:shadow-xl transition-shadow">
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-3 py-1 rounded-bl-xl">GPS MARITIME</div>
            <div className="bg-blue-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-4">
              <span className="text-3xl">🛥️</span>
            </div>
            <h3 className="text-xl text-gray-900 mb-2 text-center">Suivi Vedette & Bateau</h3>
            <div className="flex items-baseline justify-center gap-1 mb-3">
              <span className="text-2xl text-blue-600">2 500</span>
              <span className="text-gray-600 text-sm">DJF / mois</span>
            </div>
            <ul className="space-y-1.5 text-sm text-gray-300">
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> GPS maritime temps réel</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Historique de navigation</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Alerte zone interdite</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Alerte moteur coupé</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Détection tentative de vol</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Résistant à l'eau</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Sans engagement</li>
            </ul>
          </div>

          {/* Card - Suivi Conteneurs (proposition IA) */}
          <div className="bg-gray-50 rounded-2xl p-6 shadow-xl border-2 border-orange-400 relative overflow-hidden hover:shadow-2xl transition-shadow">
            <div className="absolute top-0 right-0 bg-orange-600 text-white text-xs px-3 py-1 rounded-bl-xl">💡 NOUVEAUTÉ IA</div>
            <div className="bg-orange-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-4">
              <span className="text-3xl">📦</span>
            </div>
            <h3 className="text-xl text-gray-900 mb-1 text-center">Suivi Conteneurs, Cargaisons & Bagages</h3>
            <p className="text-center text-xs text-orange-500 italic mb-3">✈️ Voyagez en toute sérénité</p>
            <div className="flex items-baseline justify-center gap-1 mb-3">
              <span className="text-2xl text-orange-600">3 000</span>
              <span className="text-gray-600 text-sm">DJF / mois</span>
            </div>
            <ul className="space-y-1.5 text-sm text-gray-300">
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Géolocalisation du conteneur</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Alerte ouverture non autorisée</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Suivi température & humidité</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Traçabilité de la chaîne logistique</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Rapport douanier automatique</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Compatible port de Djibouti</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Sans engagement</li>
            </ul>
          </div>

        </div>

        {/* Rangée 3 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">

          {/* Vélos & Trottinettes */}
          <div className="bg-black rounded-2xl p-6 shadow-lg border border-gray-800 relative overflow-hidden hover:shadow-xl transition-shadow">
            <div className="absolute top-0 right-0 bg-teal-600 text-white text-xs px-3 py-1 rounded-bl-xl">ANTI-VOL</div>
            <div className="bg-teal-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-4">
              <span className="text-3xl">🛴</span>
            </div>
            <h3 className="text-xl text-gray-900 mb-2 text-center">Suivi Vélos & Trottinettes</h3>
            <div className="flex items-baseline justify-center gap-1 mb-3">
              <span className="text-2xl text-teal-600">800</span>
              <span className="text-gray-600 text-sm">DJF / mois</span>
            </div>
            <ul className="space-y-1.5 text-sm text-gray-300">
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Localisation temps réel</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Alerte déplacement suspect</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Historique des trajets</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Traceur ultra discret</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> 🔋 Batterie longue durée</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Compatible vélos électriques</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Sans engagement</li>
            </ul>
          </div>

          {/* Générateurs & Équipements */}
          <div className="bg-black rounded-2xl p-6 shadow-lg border border-gray-800 relative overflow-hidden hover:shadow-xl transition-shadow">
            <div className="absolute top-0 right-0 bg-yellow-600 text-white text-xs px-3 py-1 rounded-bl-xl">INDUSTRIE</div>
            <div className="bg-yellow-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-4">
              <span className="text-3xl">⚡</span>
            </div>
            <h3 className="text-xl text-gray-900 mb-2 text-center">Suivi Générateurs & Équipements</h3>
            <div className="flex items-baseline justify-center gap-1 mb-3">
              <span className="text-2xl text-yellow-600">2 000</span>
              <span className="text-gray-600 text-sm">DJF / mois</span>
            </div>
            <ul className="space-y-1.5 text-sm text-gray-300">
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Géolocalisation de l'équipement</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Suivi heures de marche</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Consommation carburant</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Alerte déplacement non autorisé</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Maintenance prédictive</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Rapport mensuel automatique</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Sans engagement</li>
            </ul>
          </div>

          {/* Engins de Chantier */}
          <div className="bg-black rounded-2xl p-6 shadow-lg border border-gray-800 relative overflow-hidden hover:shadow-xl transition-shadow">
            <div className="absolute top-0 right-0 bg-amber-600 text-white text-xs px-3 py-1 rounded-bl-xl">BTP</div>
            <div className="bg-amber-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-4">
              <span className="text-3xl">🏗️</span>
            </div>
            <h3 className="text-xl text-gray-900 mb-2 text-center">Suivi Engins de Chantier</h3>
            <div className="flex items-baseline justify-center gap-1 mb-3">
              <span className="text-2xl text-amber-600">2 500</span>
              <span className="text-gray-600 text-sm">DJF / mois</span>
            </div>
            <ul className="space-y-1.5 text-sm text-gray-300">
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> GPS temps réel sur chantier</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Zone géographique (géofence)</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Heures d'utilisation</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Consommation gasoil</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Alerte sortie de chantier</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Rapport pour facturation client</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Sans engagement</li>
            </ul>
          </div>

        </div>

        <div className="text-center mt-12">
          <a href="#contact" className="inline-block bg-blue-600 text-white px-10 py-4 rounded-full text-lg hover:bg-blue-700 transition shadow-lg">
            {T.promo.cta}
          </a>
          <p className="text-sm text-gray-500 mt-4">{T.promo.cta_sub}</p>
        </div>
      </div>
    </section>
  );
}
