import { Camera, Brain, ShoppingCart, Pill, Building2, Zap, Leaf, HeartPulse, Truck, ShieldCheck, Home, Globe, Fuel, Bell, BarChart3, Droplets, Server, Eye, UserX, Package } from "lucide-react";
import aiDetectionImg from "@/imports/images__1_.jpg";
import multiCamImg from "@/imports/Capture_d__cran_2026-06-18_194706.png";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "../i18n/LanguageContext";

export function Solutions() {
  const { T } = useLanguage();
  return (
    <section id="solutions" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4 text-gray-900">{T.solutions.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{T.solutions.subtitle}</p>
        </div>

        {/* Dashcam IA */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="p-12 flex flex-col justify-center">
              <div className="bg-blue-100 p-4 rounded-xl inline-block mb-6 w-fit">
                <Camera className="text-blue-600" size={48} />
              </div>
              <h3 className="text-3xl mb-4 text-gray-900">Dashcam avec IA</h3>
              <p className="text-lg text-gray-600 mb-6">
                Protégez votre flotte avec nos dashcams intelligentes. Détection automatique
                d'incidents, reconnaissance de comportements dangereux et enregistrement haute
                définition.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <span className="bg-green-500 text-white rounded-full p-1 mt-1">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.3334 4L6.00002 11.3333L2.66669 8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <strong className="text-gray-900">Détection d'incidents</strong>
                    <p className="text-gray-600">
                      Alertes automatiques en cas d'accident ou de freinage brusque
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-green-500 text-white rounded-full p-1 mt-1">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.3334 4L6.00002 11.3333L2.66669 8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <strong className="text-gray-900">Vision nocturne avancée</strong>
                    <p className="text-gray-600">
                      Enregistrement clair même dans des conditions de faible luminosité
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-green-500 text-white rounded-full p-1 mt-1">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.3334 4L6.00002 11.3333L2.66669 8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <strong className="text-gray-900">Stockage cloud sécurisé</strong>
                    <p className="text-gray-600">
                      Accès à vos enregistrements depuis n'importe où
                    </p>
                  </div>
                </li>
              </ul>
              <button className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition w-fit">
                Découvrir la dashcam IA
              </button>
            </div>
            <div className="relative h-full min-h-[400px]">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1643686978109-499f1e9d4bd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoY2FtJTIwQUklMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc4MTU2NjkzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Dashcam avec intelligence artificielle"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Surveillance Gasoil IA */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="p-12 flex flex-col justify-center">
              <div className="bg-orange-100 p-4 rounded-xl inline-block mb-6 w-fit">
                <Fuel className="text-orange-600" size={48} />
              </div>
              <h3 className="text-3xl mb-4 text-gray-900">Surveillance Intelligente des Réservoirs de Gasoil</h3>
              <p className="text-lg text-gray-600 mb-6">
                Contrôlez en temps réel le niveau de vos réservoirs de carburant mobiles et stationnaires.
                Notre système IA détecte les anomalies, les siphonages et les consommations anormales
                avant qu'ils n'impactent votre activité.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="bg-orange-100 p-2 rounded-lg mt-1 shrink-0">
                    <Droplets className="text-orange-600" size={20} />
                  </div>
                  <div>
                    <strong className="text-gray-900">Niveau en temps réel</strong>
                    <p className="text-gray-600">Capteurs haute précision pour cuves fixes et réservoirs mobiles — alertes de seuil automatiques</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-orange-100 p-2 rounded-lg mt-1 shrink-0">
                    <Bell className="text-orange-600" size={20} />
                  </div>
                  <div>
                    <strong className="text-gray-900">Détection de siphonage & fraude</strong>
                    <p className="text-gray-600">L'IA analyse les courbes de consommation et déclenche une alerte immédiate en cas de chute suspecte</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-orange-100 p-2 rounded-lg mt-1 shrink-0">
                    <BarChart3 className="text-orange-600" size={20} />
                  </div>
                  <div>
                    <strong className="text-gray-900">Rapports de consommation</strong>
                    <p className="text-gray-600">Tableaux de bord détaillés par véhicule, par site ou par période — réduisez vos coûts carburant jusqu'à 25 %</p>
                  </div>
                </li>
              </ul>
              <a href="#contact" className="bg-orange-600 text-white px-8 py-4 rounded-full hover:bg-orange-700 transition w-fit">
                Découvrir la solution gasoil
              </a>
            </div>
            {/* Photos capteurs à droite */}
            <div className="grid grid-cols-2 gap-0">
              {[
                { src: "https://images.unsplash.com/photo-1775349929942-3db0a6d64c2b?w=400&q=80", alt: "Capteur de pression sur canalisation" },
                { src: "https://images.unsplash.com/photo-1773517458559-c546a67c7a2b?w=400&q=80", alt: "Compteur de débit industriel" },
                { src: "https://images.unsplash.com/photo-1765211003392-7eeb5250d988?w=400&q=80", alt: "Jauge de carburant" },
                { src: "https://images.unsplash.com/photo-1703041555997-f51216e6a532?w=400&q=80", alt: "Manomètre sur tuyau industriel" },
              ].map((img, i) => (
                <div key={i} className="relative overflow-hidden">
                  <ImageWithFallback
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-orange-900/20" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Serveurs IA Anti-Vol */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Images à gauche */}
            <div className="flex flex-col order-2 lg:order-1">
              <div className="relative flex-1 min-h-[220px]">
                <ImageWithFallback
                  src={aiDetectionImg}
                  alt="Détection IA comportementale en supermarché"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full">
                  🤖 Analyse comportementale IA en temps réel
                </div>
              </div>
              <div className="relative flex-1 min-h-[220px]">
                <ImageWithFallback
                  src={multiCamImg}
                  alt="Vue multi-caméras supermarché"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full">
                  📹 Vue multi-caméras traitée par le serveur IA
                </div>
              </div>
            </div>

            <div className="p-10 flex flex-col justify-center order-1 lg:order-2">
              <div className="bg-purple-100 p-4 rounded-xl inline-block mb-4 w-fit">
                <Server className="text-purple-600" size={48} />
              </div>

              {/* Badge important */}
              <div className="bg-purple-50 border border-purple-200 rounded-2xl px-4 py-3 mb-5">
                <p className="text-purple-800 text-sm font-semibold">
                  ⚠️ Nous n'installons pas de caméras — nous installons uniquement des <strong>serveurs IA</strong> qui se connectent à vos caméras existantes.
                </p>
              </div>

              <h3 className="text-3xl mb-3 text-gray-900">Serveurs IA de Détection</h3>
              <p className="text-gray-600 mb-5">
                Notre serveur IA analyse en temps réel les flux vidéo de vos caméras déjà installées.
                Aucun remplacement de matériel — notre intelligence artificielle se greffe sur votre infrastructure existante.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg mt-0.5 shrink-0">
                    <UserX className="text-purple-600" size={18} />
                  </div>
                  <div>
                    <strong className="text-gray-900 text-sm">Détection de vol & dissimulation</strong>
                    <p className="text-gray-600 text-sm">Objet glissé dans une poche, sous un vêtement ou dans un sac — détecté automatiquement</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg mt-0.5 shrink-0">
                    <Eye className="text-purple-600" size={18} />
                  </div>
                  <div>
                    <strong className="text-gray-900 text-sm">Analyse comportementale</strong>
                    <p className="text-gray-600 text-sm">Détection des comportements suspects : hésitation, regard furtif, gestes anormaux, consommation sur place</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg mt-0.5 shrink-0">
                    <Package className="text-purple-600" size={18} />
                  </div>
                  <div>
                    <strong className="text-gray-900 text-sm">Comptage & flux clients</strong>
                    <p className="text-gray-600 text-sm">Analyse des flux, zones chaudes, temps de passage et comportement d'achat</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg mt-0.5 shrink-0">
                    <ShoppingCart className="text-purple-600" size={18} />
                  </div>
                  <div>
                    <strong className="text-gray-900 text-sm">Compatible tout commerce</strong>
                    <p className="text-gray-600 text-sm">Supermarchés, pharmacies, boutiques, entrepôts, stations-service</p>
                  </div>
                </li>
              </ul>
              <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-2.5 mb-5">
                <p className="text-green-700 text-sm">✅ <strong>Réduction des pertes jusqu'à 70 %</strong> — ROI prouvé dès les premiers mois</p>
              </div>
              <a href="#contact" className="bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition w-fit text-sm">
                Découvrir le serveur IA anti-vol
              </a>
            </div>
          </div>
        </div>


        {/* Smart Solutions Grid */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <h3 className="text-3xl text-gray-900 mb-3">Solutions Smart</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Des écosystèmes intelligents connectés pour transformer chaque secteur d'activité
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              {
                icon: <Globe size={28} />,
                title: "Smart City",
                desc: "Gestion intelligente des infrastructures urbaines : éclairage, déchets, trafic, eau et énergie connectés en temps réel.",
                color: "bg-blue-100 text-blue-600",
                border: "border-blue-200",
              },
              {
                icon: <Zap size={28} />,
                title: "Smart Grid",
                desc: "Réseau électrique intelligent avec surveillance de la consommation, détection des anomalies et optimisation énergétique.",
                color: "bg-yellow-100 text-yellow-600",
                border: "border-yellow-200",
              },
              {
                icon: <Leaf size={28} />,
                title: "Smart Agriculture",
                desc: "Capteurs de sol, météo et irrigation automatisée. Suivi des actifs agricoles et alertes en temps réel pour maximiser les rendements.",
                color: "bg-green-100 text-green-600",
                border: "border-green-200",
              },
              {
                icon: <HeartPulse size={28} />,
                title: "Smart Healthcare",
                desc: "Suivi des équipements médicaux, contrôle des accès, surveillance des environnements sensibles et alertes patients.",
                color: "bg-red-100 text-red-600",
                border: "border-red-200",
              },
              {
                icon: <Truck size={28} />,
                title: "Smart Logistics",
                desc: "Supply chain intelligente avec traçabilité complète, capteurs de température, GPS multi-modal et alertes de rupture.",
                color: "bg-orange-100 text-orange-600",
                border: "border-orange-200",
              },
              {
                icon: <ShieldCheck size={28} />,
                title: "Smart Retail Security",
                desc: "Protection des points de vente par IA : détection de vol, analyse des flux clients, alertes comportementales en temps réel.",
                color: "bg-purple-100 text-purple-600",
                border: "border-purple-200",
              },
              {
                icon: <Home size={28} />,
                title: "Smart Home (Domotique)",
                desc: "Automatisation résidentielle : contrôle d'accès, caméras IA, capteurs de mouvement, alertes intrusion et gestion à distance.",
                color: "bg-cyan-100 text-cyan-600",
                border: "border-cyan-200",
              },
              {
                icon: <Building2 size={28} />,
                title: "Smart Building",
                desc: "Bâtiment connecté avec gestion intelligente de l'énergie, contrôle d'accès biométrique, sécurité périmétrique et maintenance prédictive.",
                color: "bg-indigo-100 text-indigo-600",
                border: "border-indigo-200",
              },
            ].map((s) => (
              <div key={s.title} className={`bg-white rounded-2xl p-6 shadow-md border ${s.border} hover:shadow-xl transition group`}>
                <div className={`${s.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {s.icon}
                </div>
                <h4 className="text-gray-900 mb-2">{s.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
                <a href="#contact" className="inline-block mt-4 text-sm text-blue-600 hover:underline">
                  En savoir plus →
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-8 mt-16">
          <div className="bg-white p-8 rounded-2xl text-center shadow-lg">
            <div className="text-4xl mb-2 text-blue-600">500+</div>
            <div className="text-gray-600">Clients Satisfaits</div>
          </div>
          <div className="bg-white p-8 rounded-2xl text-center shadow-lg">
            <div className="text-4xl mb-2 text-blue-600">99.8%</div>
            <div className="text-gray-600">Précision de l'IA</div>
          </div>
          <div className="bg-white p-8 rounded-2xl text-center shadow-lg">
            <div className="text-4xl mb-2 text-blue-600">24/7</div>
            <div className="text-gray-600">Support Technique</div>
          </div>
          <div className="bg-white p-8 rounded-2xl text-center shadow-lg">
            <div className="text-4xl mb-2 text-blue-600">70%</div>
            <div className="text-gray-600">Réduction des Pertes</div>
          </div>
        </div>
      </div>
    </section>
  );
}
