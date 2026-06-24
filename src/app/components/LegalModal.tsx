import { X } from "lucide-react";

interface Props {
  type: "privacy" | "terms";
  onClose: () => void;
}

export function LegalModal({ type, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="sticky top-0 bg-blue-700 text-white px-8 py-5 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-xl font-bold">
            {type === "privacy" ? "Politique de confidentialité" : "Conditions d'utilisation"}
          </h2>
          <button onClick={onClose} className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition">
            <X size={20} />
          </button>
        </div>

        <div className="px-8 py-6 text-gray-700 text-sm leading-relaxed space-y-6">
          {type === "privacy" ? (
            <>
              <p className="text-gray-500 text-xs">Dernière mise à jour : Juin 2026</p>

              <section>
                <h3 className="text-base font-bold text-gray-900 mb-2">1. Qui sommes-nous ?</h3>
                <p>Djibouti Telematics Solutions (DTS), dont le siège social est situé à Regus - Djibouti, Salaam Tower, Bureau DTSYSTEMS, est responsable du traitement de vos données personnelles collectées via le site <strong>djiboutigps.com</strong>.</p>
              </section>

              <section>
                <h3 className="text-base font-bold text-gray-900 mb-2">2. Données collectées</h3>
                <p>Nous collectons les données suivantes lors de vos interactions avec notre site :</p>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  <li>Nom et prénom</li>
                  <li>Adresse e-mail professionnelle</li>
                  <li>Numéro de téléphone</li>
                  <li>Nom de votre entreprise</li>
                  <li>Messages et demandes envoyés via le formulaire de contact</li>
                  <li>Données de navigation (cookies analytiques, avec votre consentement)</li>
                </ul>
              </section>

              <section>
                <h3 className="text-base font-bold text-gray-900 mb-2">3. Finalités du traitement</h3>
                <p>Vos données sont utilisées pour :</p>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  <li>Répondre à vos demandes de démonstration ou de devis</li>
                  <li>Vous contacter dans le cadre d'une relation commerciale</li>
                  <li>Améliorer nos services et notre site web</li>
                  <li>Vous envoyer des informations sur nos offres (avec votre accord)</li>
                </ul>
              </section>

              <section>
                <h3 className="text-base font-bold text-gray-900 mb-2">4. Conservation des données</h3>
                <p>Vos données sont conservées pendant une durée maximale de <strong>3 ans</strong> à compter de votre dernier contact avec nos services.</p>
              </section>

              <section>
                <h3 className="text-base font-bold text-gray-900 mb-2">5. Vos droits</h3>
                <p>Conformément aux lois en vigueur, vous disposez des droits suivants :</p>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  <li>Droit d'accès à vos données</li>
                  <li>Droit de rectification</li>
                  <li>Droit à l'effacement ("droit à l'oubli")</li>
                  <li>Droit d'opposition au traitement</li>
                  <li>Droit à la portabilité</li>
                </ul>
                <p className="mt-2">Pour exercer ces droits, contactez-nous à : <a href="mailto:dts@djiboutigps.com" className="text-blue-600 underline">dts@djiboutigps.com</a></p>
              </section>

              <section>
                <h3 className="text-base font-bold text-gray-900 mb-2">6. Cookies</h3>
                <p>Nous utilisons des cookies analytiques (Google Analytics) et marketing (Facebook Pixel) uniquement avec votre consentement explicite, via la bannière de cookies affichée lors de votre première visite.</p>
              </section>

              <section>
                <h3 className="text-base font-bold text-gray-900 mb-2">7. Sécurité</h3>
                <p>Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte ou divulgation.</p>
              </section>

              <section>
                <h3 className="text-base font-bold text-gray-900 mb-2">8. Contact</h3>
                <p>Pour toute question relative à cette politique, contactez-nous :</p>
                <p className="mt-1"><strong>Email :</strong> <a href="mailto:dts@djiboutigps.com" className="text-blue-600 underline">dts@djiboutigps.com</a></p>
                <p><strong>Téléphone :</strong> +253 77 80 32 32</p>
                <p><strong>Adresse :</strong> Regus - Djibouti, Salaam Tower, Bureau DTSYSTEMS</p>
              </section>
            </>
          ) : (
            <>
              <p className="text-gray-500 text-xs">Dernière mise à jour : Juin 2026</p>

              <section>
                <h3 className="text-base font-bold text-gray-900 mb-2">1. Objet</h3>
                <p>Les présentes conditions d'utilisation régissent l'accès et l'utilisation du site <strong>djiboutigps.com</strong> exploité par Djibouti Telematics Solutions (DTS), Regus - Djibouti, Salaam Tower, Bureau DTSYSTEMS.</p>
              </section>

              <section>
                <h3 className="text-base font-bold text-gray-900 mb-2">2. Acceptation</h3>
                <p>En accédant à ce site, vous acceptez sans réserve les présentes conditions d'utilisation. Si vous ne les acceptez pas, veuillez ne pas utiliser ce site.</p>
              </section>

              <section>
                <h3 className="text-base font-bold text-gray-900 mb-2">3. Services proposés</h3>
                <p>DTS propose via ce site des informations sur ses solutions de :</p>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  <li>Gestion de flotte et géolocalisation GPS</li>
                  <li>Surveillance des réservoirs de carburant</li>
                  <li>Détection de vol par intelligence artificielle</li>
                  <li>Dashcam et vidéosurveillance</li>
                  <li>Cartes SIM IoT M&M</li>
                  <li>Location et vente de matériaux de chantier</li>
                </ul>
              </section>

              <section>
                <h3 className="text-base font-bold text-gray-900 mb-2">4. Propriété intellectuelle</h3>
                <p>L'ensemble des contenus présents sur ce site (textes, images, logos, icônes) est la propriété exclusive de DTS ou de ses partenaires. Toute reproduction, même partielle, est interdite sans autorisation écrite préalable.</p>
              </section>

              <section>
                <h3 className="text-base font-bold text-gray-900 mb-2">5. Responsabilité</h3>
                <p>DTS s'efforce d'assurer l'exactitude des informations publiées sur ce site, mais ne saurait être tenue responsable des erreurs ou omissions. DTS se réserve le droit de modifier le contenu à tout moment sans préavis.</p>
              </section>

              <section>
                <h3 className="text-base font-bold text-gray-900 mb-2">6. Tarifs et offres</h3>
                <p>Les tarifs mentionnés sur ce site (notamment l'abonnement à 1 500 DJF/mois) sont indicatifs et peuvent être modifiés sans préavis. Tout contrat de service est soumis à un devis validé par les deux parties.</p>
              </section>

              <section>
                <h3 className="text-base font-bold text-gray-900 mb-2">7. Matériel mis à disposition</h3>
                <p>Les équipements fournis gratuitement (boîtier 2G/4G, jauge carburant) restent la propriété de DTS pendant toute la durée de l'abonnement. En cas de résiliation, le client s'engage à restituer le matériel dans un état de bon fonctionnement.</p>
              </section>

              <section>
                <h3 className="text-base font-bold text-gray-900 mb-2">8. Droit applicable</h3>
                <p>Les présentes conditions sont soumises au droit de la République de Djibouti. Tout litige sera soumis aux tribunaux compétents de Djibouti.</p>
              </section>

              <section>
                <h3 className="text-base font-bold text-gray-900 mb-2">9. Contact</h3>
                <p><strong>Email :</strong> <a href="mailto:dts@djiboutigps.com" className="text-blue-600 underline">dts@djiboutigps.com</a></p>
                <p><strong>Téléphone :</strong> +253 77 80 32 32</p>
                <p><strong>Adresse :</strong> Regus - Djibouti, Salaam Tower, Bureau DTSYSTEMS</p>
              </section>
            </>
          )}
        </div>

        <div className="px-8 py-4 border-t border-gray-100 flex justify-end">
          <button onClick={onClose} className="bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition text-sm">
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
