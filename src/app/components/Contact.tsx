import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Phone, MapPin, Send, Clock, Loader, CheckCircle } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const EMAILJS_SERVICE_ID = "service_5uqkzo7";
const EMAILJS_TEMPLATE_ID = "template_wpxtf9q";
const EMAILJS_PUBLIC_KEY = "HdOknBy6C1NQ-mTbp";

export function Contact() {
  const { T } = useLanguage();
  const [form, setForm] = useState({ name: "AKRAM HEMED", email: "dts@djiboutigps.com", company: "", phone: "+25377803232", service: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSending(true);
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        subject: "Nouvelle demande de contact",
        name: form.name,
        email: form.email,
        phone: form.phone || "Non renseigné",
        message: `Service : ${form.service || "Non précisé"}\nEntreprise : ${form.company || "Non précisée"}\n\n${form.message || "Aucun message"}`,
        comment: `Demande de contact depuis le site djiboutigps.com`,
        date: new Date().toLocaleDateString("fr-FR"),
        time: new Date().toLocaleTimeString("fr-FR"),
        to_email: "dts@djiboutigps.com",
      }, EMAILJS_PUBLIC_KEY);
      setSent(true);
    } catch {
      alert("Erreur d'envoi. Contactez-nous directement à dts@djiboutigps.com");
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4 text-gray-900">{T.contact.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{T.contact.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-gray-50 p-8 rounded-2xl">
            <h3 className="text-2xl mb-6 text-gray-900">{T.contact.form_title}</h3>

            {sent ? (
              <div className="text-center py-10">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Message envoyé !</h4>
                <p className="text-gray-600 text-sm mb-4">Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.</p>
                <button onClick={() => setSent(false)} className="bg-orange-600 text-white px-6 py-2 rounded-full hover:bg-orange-700 transition text-sm">
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm mb-2 text-gray-700">{T.contact.name}</label>
                  <input type="text" id="name" value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm mb-2 text-gray-700">{T.contact.email}</label>
                  <input type="email" id="email" value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm mb-2 text-gray-700">{T.contact.company}</label>
                  <input type="text" id="company" value={form.company}
                    onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                    placeholder={T.contact.company}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm mb-2 text-gray-700">{T.contact.phone}</label>
                  <input type="tel" id="phone" value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm mb-2 text-gray-700">{T.contact.service}</label>
                  <select id="service" value={form.service}
                    onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <option value="">Sélectionnez un service</option>
                    <option value="autre">Autre</option>
                    <option value="vol-magasin">Détection de Vol dans les magasins</option>
                    <option value="vol-carburant">Détection de vol carburant</option>
                    <option value="gps">Gestion de GPS</option>
                    <option value="chauffeurs">Gestion des chauffeurs</option>
                    <option value="reservoir">Gestion de niveau de réservoir carburant</option>
                    <option value="compteur">Gestion des sous-compteur électrique</option>
                    <option value="gps-animaux">GPS pour animaux</option>
                    <option value="anti-intrusion">Système Anti-intrusion</option>
                    <option value="portail">Système de portail automation &amp; barrière</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm mb-2 text-gray-700">{T.contact.message}</label>
                  <textarea id="message" rows={4} value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder={T.contact.message_placeholder}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"></textarea>
                </div>
                <button type="submit" disabled={sending}
                  className="w-full bg-orange-600 text-white px-8 py-4 rounded-full hover:bg-orange-700 transition flex items-center justify-center gap-2 disabled:opacity-60">
                  {sending ? <><Loader size={20} className="animate-spin" /> Envoi...</> : <>{T.contact.send}<Send size={20} /></>}
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div>
            <h3 className="text-2xl mb-6 text-gray-900">{T.contact.info_title}</h3>
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-3 rounded-lg"><Mail className="text-orange-600" size={24} /></div>
                <div>
                  <h4 className="text-gray-900 mb-1">Email</h4>
                  <a href="mailto:dts@djiboutigps.com" className="text-gray-600 hover:text-orange-600 transition">dts@djiboutigps.com</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-3 rounded-lg"><Phone className="text-orange-600" size={24} /></div>
                <div>
                  <h4 className="text-gray-900 mb-1">{T.contact.phone}</h4>
                  <a href="tel:+25377803232" className="text-gray-600 hover:text-orange-600 transition">+253 77 80 32 32</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-green-600">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.121.554 4.11 1.523 5.843L.057 23.571a.5.5 0 00.614.612l5.857-1.453A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.887 9.887 0 01-5.031-1.375l-.36-.214-3.733.927.96-3.635-.235-.374A9.866 9.866 0 012.106 12C2.106 6.58 6.58 2.106 12 2.106c5.42 0 9.894 4.474 9.894 9.894 0 5.42-4.474 9.894-9.894 9.894z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-gray-900 mb-1">Support Technique</h4>
                  <p className="text-gray-700 text-sm">M. Moustapha Hassan</p>
                  <a href="https://wa.me/25377648977" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 transition font-medium">
                    +253 77 64 89 77 (WhatsApp)
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-3 rounded-lg"><MapPin className="text-orange-600" size={24} /></div>
                <div>
                  <h4 className="text-gray-900 mb-1">{T.contact.address_title}</h4>
                  <p className="text-gray-600">Regus - Djibouti, Salaam Tower</p>
                  <p className="text-gray-600">Bureau DTSYSTEMS</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-600 to-orange-800 p-8 rounded-2xl text-white">
              <div className="flex items-center gap-3 mb-5">
                <Clock size={24} className="text-white/80" />
                <h4 className="text-2xl">{T.contact.hours_title}</h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-white/20">
                  <span className="font-medium">{T.contact.sun_thu}</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">7h00 – 00h00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/20">
                  <span className="font-medium">{T.contact.fri}</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">15h00 – 00h00</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium">{T.contact.sat}</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">8h00 – 00h00</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-sm text-white/80">Support technique disponible pour tous nos clients sous contrat</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
