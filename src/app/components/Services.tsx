import { Truck, BarChart3, Bell, MapPin, Weight, Wrench } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

export function Services() {
  const { T } = useLanguage();

  const services = [
    {
      icon: <Truck size={32} />,
      title: T.services.fleet_title,
      description: T.services.fleet_desc,
      features: ["Suivi GPS en temps réel", "Gestion des maintenances", "Analyses de consommation", "Rapports automatisés"],
    },
    {
      icon: <BarChart3 size={32} />,
      title: T.services.assets_title,
      description: T.services.assets_desc,
      features: ["Inventaire centralisé", "Historique complet", "Alertes de maintenance", "Optimisation d'utilisation"],
    },
    {
      icon: <Bell size={32} />,
      title: T.services.alerts_title,
      description: T.services.alerts_desc,
      features: ["Détection d'anomalies", "Notifications personnalisées", "Analyses prédictives", "Réponse automatisée"],
    },
    {
      icon: <MapPin size={32} />,
      title: T.services.geo_title,
      description: T.services.geo_desc,
      features: ["Cartographie en temps réel", "Zones géographiques", "Historique de déplacements", "Optimisation de routes"],
    },
    {
      icon: <Weight size={32} />,
      title: T.services.weight_title,
      description: T.services.weight_desc,
      features: ["Pesée en temps réel", "Alertes de surcharge automatiques", "Historique des pesées", "Conformité réglementaire"],
    },
    {
      icon: <Wrench size={32} />,
      title: T.services.maintenance_title,
      description: T.services.maintenance_desc,
      features: ["Maintenance préventive planifiée", "Alertes kilométrage & échéances", "Historique des interventions", "Tableau de bord des coûts"],
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4 text-gray-900">{T.services.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{T.services.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-black p-8 rounded-2xl hover:shadow-xl hover:shadow-orange-900/20 transition border border-gray-800">
              <div className="bg-orange-600 text-white p-4 rounded-xl inline-block mb-4">{service.icon}</div>
              <h3 className="text-2xl mb-3 text-white">{service.title}</h3>
              <p className="text-gray-400 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-300">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
