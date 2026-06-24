import { ArrowLeft, Globe, Truck, Building2, Leaf, HeartPulse, GraduationCap, ShoppingCart, Flame, HardHat, Phone } from "lucide-react";

interface Props { onClose: () => void; }

const SECTORS = [
  { icon: <Truck size={32} />,        label: "Transport & Logistique",   desc: "Suivi GPS, gestion de flotte, optimisation des itinéraires.",      color: "bg-blue-50 text-blue-700 border-blue-200" },
  { icon: <Building2 size={32} />,    label: "Smart Building",           desc: "Bâtiments connectés, énergie, accès et sécurité.",                 color: "bg-orange-50 text-orange-600 border-orange-200" },
  { icon: <Globe size={32} />,        label: "Smart City",               desc: "Infrastructures urbaines, éclairage, déchets, trafic.",             color: "bg-cyan-50 text-cyan-600 border-cyan-200" },
  { icon: <Flame size={32} />,        label: "Oil & Gaz / Énergie",      desc: "Surveillance des réservoirs, détection de vol carburant.",          color: "bg-blue-50 text-blue-700 border-blue-200" },
  { icon: <ShoppingCart size={32} />, label: "Grande Distribution",      desc: "Anti-vol IA, analyse des flux clients, sécurité périmétrique.",     color: "bg-orange-50 text-orange-600 border-orange-200" },
  { icon: <HeartPulse size={32} />,   label: "Santé",                    desc: "Suivi d'équipements médicaux, contrôle d'accès, alertes.",          color: "bg-cyan-50 text-cyan-600 border-cyan-200" },
  { icon: <GraduationCap size={32} />,label: "Éducation",                desc: "Sécurité des campus, gestion des accès, vidéosurveillance.",        color: "bg-blue-50 text-blue-700 border-blue-200" },
  { icon: <Leaf size={32} />,         label: "Agriculture",              desc: "GPS pour animaux, capteurs environnementaux, traçabilité.",          color: "bg-orange-50 text-orange-600 border-orange-200" },
  { icon: <HardHat size={32} />,      label: "Travaux Publics & Privés", desc: "Suivi d'engins, sécurité chantier, location de matériaux.",         color: "bg-cyan-50 text-cyan-600 border-cyan-200" },
];

const DIFFERENTIATORS = [
  { icon: "🚀", title: "Déploiement rapide",                   desc: "Installation et mise en service en moins de 48h. Nos techniciens interviennent directement sur site." },
  { icon: "🔧", title: "Installation & interventions gratuites", desc: "Toutes les installations et interventions sont incluses dans votre abonnement, sans frais cachés." },
  { icon: "📡", title: "Connectivité multi-opérateurs",         desc: "Boîtiers 2G/4G et cartes SIM M&M IoT pour une couverture maximale à Djibouti et dans la région." },
  { icon: "🧠", title: "Intelligence Artificielle embarquée",   desc: "Nos solutions IA analysent en temps réel les données de vos véhicules, équipements et espaces commerciaux." },
  { icon: "💳", title: "Sans avance de fonds",                  desc: "Consommez le mois et payez le mois suivant. Matériel offert pendant toute la durée de l'abonnement." },
  { icon: "🌍", title: "Présence régionale",                    desc: "Basés à Djibouti, nous couvrons toute la Corne de l'Afrique avec des partenaires locaux." },
];

const TESTIMONIALS = [
  { name: "Directeur Transport",     company: "Opérateur logistique, Djibouti",   text: "Depuis DTS, nous avons réduit notre consommation de carburant de 22% et nos chauffeurs sont beaucoup plus disciplinés.", avatar: "DT", color: "bg-blue-700" },
  { name: "Responsable Sécurité",    company: "Supermarché, Djibouti",             text: "Le serveur IA a détecté 3 tentatives de vol en moins d'une semaine. Installation en une journée, résultats immédiats.", avatar: "RS", color: "bg-orange-600" },
  { name: "Directeur Opérations",    company: "Société pétrolière, Djibouti",      text: "La détection de siphonage carburant nous a économisé des millions de francs en quelques mois. ROI immédiat.", avatar: "DO", color: "bg-cyan-600" },
  { name: "Gérant",                  company: "Entreprise BTP, Djibouti",          text: "Le suivi GPS de nos engins de chantier nous permet de savoir exactement où ils sont. Excellent service.", avatar: "GB", color: "bg-blue-700" },
];

const STATS = [
  { value: "500+",  label: "Clients actifs",  color: "border-orange-500" },
  { value: "18",    label: "Pays couverts",   color: "border-cyan-500" },
  { value: "99.8%", label: "Disponibilité",   color: "border-orange-500" },
  { value: "24h/24",label: "Support",         color: "border-cyan-500" },
];

export function AboutPage({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-[400] bg-white overflow-y-auto">

      {/* Header */}
      <div className="bg-blue-700 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={onClose} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition text-sm">
            <ArrowLeft size={16} /> Retour au site
          </button>
          <span className="font-bold text-lg hidden sm:block">Djibouti Telematics Solutions</span>
          <div className="w-32 hidden sm:block" />
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #ea580c 0%, transparent 60%), radial-gradient(circle at 80% 50%, #06b6d4 0%, transparent 60%)" }} />
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-block bg-orange-500 text-white text-sm px-4 py-1 rounded-full mb-6 font-semibold">
            🌍 Djibouti Telematics Solutions
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Nous connectons vos actifs<br />
            <span className="text-orange-400">pour mieux les gérer</span>
          </h2>
          <p className="text-blue-200 text-lg max-w-3xl mx-auto mb-10">
            DTS est le leader en solutions IoT et télématique à Djibouti. Nous aidons les entreprises à piloter leurs flottes, sécuriser leurs espaces et optimiser leurs ressources grâce à l'intelligence artificielle.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {STATS.map(s => (
              <div key={s.label} className={`bg-white/10 border-t-4 ${s.color} rounded-2xl p-4 text-center backdrop-blur-sm`}>
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-blue-200 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">

        {/* Mission */}
        <div className="text-center mb-16">
          <div className="inline-block bg-orange-100 text-orange-600 text-sm px-4 py-1 rounded-full mb-4 font-semibold">Notre mission</div>
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Pourquoi DTS ?</h3>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Rendre la technologie IoT accessible à toutes les entreprises de la Corne de l'Afrique — sans investissement initial, sans complexité technique, avec un support local disponible 24h/24.
          </p>
        </div>

        {/* Secteurs */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <div className="inline-block bg-blue-100 text-blue-700 text-sm px-4 py-1 rounded-full mb-4 font-semibold">Secteurs d'activité</div>
            <h3 className="text-2xl font-bold text-gray-900">Qui aidons-nous ?</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SECTORS.map(s => (
              <div key={s.label} className={`${s.color} border rounded-2xl p-6 flex items-start gap-4 hover:shadow-lg transition`}>
                <div className="shrink-0">{s.icon}</div>
                <div>
                  <h4 className="font-bold mb-1">{s.label}</h4>
                  <p className="text-sm opacity-80">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Différenciateurs */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-10 mb-16 border border-blue-100">
          <div className="text-center mb-10">
            <div className="inline-block bg-cyan-100 text-cyan-700 text-sm px-4 py-1 rounded-full mb-4 font-semibold">Nos engagements</div>
            <h3 className="text-2xl font-bold text-gray-900">Comment nous aidons ?</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DIFFERENTIATORS.map(d => (
              <div key={d.title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition border border-white">
                <div className="text-3xl mb-3">{d.icon}</div>
                <h4 className="font-bold text-gray-900 mb-2">{d.title}</h4>
                <p className="text-gray-600 text-sm">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Définition IoT */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <div className="inline-block bg-blue-100 text-blue-700 text-sm px-4 py-1 rounded-full mb-4 font-semibold">Comprendre l'IoT</div>
            <h3 className="text-2xl font-bold text-gray-900">Notre définition de l'IoT</h3>
            <p className="text-gray-600 mt-3 max-w-3xl mx-auto">
              L'IoT c'est l'ensemble des technologies permettant de connecter des objets grâce à Internet, pour les rendre <strong>«&nbsp;intelligents&nbsp;»</strong>. Par exemple, c'est le fait de connecter :
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
            {[
              { icon: "🚌", text: "Un bus pour afficher le temps d'attente aux usagers" },
              { icon: "🅿️", text: "Un parking pour connaître le taux d'occupation" },
              { icon: "🏫", text: "Une salle de classe pour vérifier la qualité de l'air" },
              { icon: "🚚", text: "Une flotte de véhicules pour optimiser les tournées de livraisons" },
              { icon: "📦", text: "Un camion pour connaître la localisation de sa marchandise" },
              { icon: "🏢", text: "Un bâtiment pour optimiser sa consommation énergétique" },
              { icon: "🌿", text: "Un espace vert pour gérer l'arrosage en fonction de la météo" },
              { icon: "🐄", text: "Des animaux pour suivre leur position et leur santé" },
            ].map(item => (
              <div key={item.text} className="bg-white border border-blue-100 rounded-2xl p-4 flex items-start gap-3 hover:shadow-md transition hover:border-blue-300">
                <span className="text-2xl shrink-0">{item.icon}</span>
                <p className="text-sm text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center max-w-3xl mx-auto">
            <p className="text-gray-700">
              Ces données permettent aux entreprises et aux collectivités de <strong>prendre les meilleures décisions</strong>, d'améliorer le quotidien de tous et de réduire l'impact de leurs actions sur l'environnement.
            </p>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white rounded-3xl p-8">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold mb-3">Notre vision singulière de l'IoT</h3>
            <p className="text-blue-200 leading-relaxed">
              L'IoT est l'Internet des objets au pluriel (<em>Internet of Things</em>). Celui où tout est possible, tourné vers l'infini et au-delà. Nous croyons en un avenir où chaque objet, chaque véhicule, chaque espace est connecté pour créer de la valeur.
            </p>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-700 text-white rounded-3xl p-8">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-3">Notre mission</h3>
            <p className="text-orange-100 leading-relaxed mb-4">
              Faciliter le métier de nos clients en imaginant des écosystèmes IoT à forte valeur ajoutée :
            </p>
            <ul className="space-y-2 text-orange-100 text-sm">
              <li className="flex items-center gap-2"><span className="text-white font-bold">→</span> Puissants et invisibles</li>
              <li className="flex items-center gap-2"><span className="text-white font-bold">→</span> Durables et responsables</li>
              <li className="flex items-center gap-2"><span className="text-white font-bold">→</span> Ajustés à leurs besoins, taillés pour leurs usages</li>
            </ul>
          </div>
        </div>

        {/* Engagement éthique */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <div className="inline-block bg-cyan-100 text-cyan-700 text-sm px-4 py-1 rounded-full mb-4 font-semibold">Responsabilité</div>
            <h3 className="text-2xl font-bold text-gray-900">Notre engagement éthique</h3>
            <p className="text-gray-500 mt-2 max-w-2xl mx-auto">DTS s'engage éthiquement et responsablement à travers plusieurs initiatives clés.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: "🔐", badge: "Smart & Secure IoT",     color: "border-blue-500 bg-blue-50",   text: "Atteste de notre expertise en sécurisation des données des objets connectés." },
              { icon: "😊", badge: "Happy at Work",           color: "border-orange-500 bg-orange-50", text: "Reflète une culture d'entreprise axée sur l'humain, l'agilité et la confiance." },
              { icon: "🌱", badge: "Planet Tech'Care",        color: "border-cyan-500 bg-cyan-50",    text: "Nous nous engageons à améliorer l'impact environnemental de la technologie et de l'IoT." },
              { icon: "♻️", badge: "Numérique Responsable",   color: "border-blue-500 bg-blue-50",   text: "Actions concrètes pour réduire notre empreinte environnementale et protéger les données." },
            ].map(e => (
              <div key={e.badge} className={`${e.color} border-t-4 rounded-2xl p-6 text-center hover:shadow-lg transition`}>
                <div className="text-4xl mb-3">{e.icon}</div>
                <h4 className="font-bold text-gray-900 text-sm mb-2">{e.badge}</h4>
                <p className="text-gray-600 text-xs leading-relaxed">{e.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Témoignages */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <div className="inline-block bg-orange-100 text-orange-600 text-sm px-4 py-1 rounded-full mb-4 font-semibold">Témoignages</div>
            <h3 className="text-2xl font-bold text-gray-900">Ce que disent nos clients</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <div className="flex mb-3">
                  {[1,2,3,4,5].map(i => <span key={i} className="text-orange-400 text-sm">★</span>)}
                </div>
                <p className="text-gray-700 italic mb-4 text-sm leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${t.color} text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-3xl p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <h3 className="text-2xl font-bold mb-3">Prêt à connecter vos actifs ?</h3>
            <p className="text-blue-200 mb-6 max-w-xl mx-auto">
              Essai gratuit 1 mois · Matériel offert · Installation gratuite · 1 500 DJF/mois
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact" onClick={onClose}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition shadow-lg shadow-orange-500/30">
                Demander une démonstration
              </a>
              <a href="tel:+25377803232"
                className="border border-white/50 text-white px-8 py-3 rounded-full hover:bg-white/10 transition flex items-center justify-center gap-2">
                <Phone size={16} /> +253 77 80 32 32
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
