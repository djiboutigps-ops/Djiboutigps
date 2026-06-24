import { useState } from "react";
import { X, User, Mail, Phone, Send, Loader, CheckCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID  = "service_5uqkzo7";
const EMAILJS_TEMPLATE_ID = "template_wpxtf9q";
const EMAILJS_PUBLIC_KEY  = "HdOknBy6C1NQ-mTbp";

interface Props { onClose: () => void; }

export function SupportModal({ onClose }: Props) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSend() {
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        name: form.name,
        email: form.email,
        phone: form.phone || "Non renseigné",
        message: `[SUPPORT] ${form.subject}\n\n${form.message}`,
        comment: "",
        date: new Date().toLocaleDateString("fr-FR"),
        time: new Date().toLocaleTimeString("fr-FR"),
        to_email: "dts@djiboutigps.com",
      }, EMAILJS_PUBLIC_KEY);
      setDone(true);
    } catch {
      alert("Erreur d'envoi. Contactez-nous directement à dts@djiboutigps.com");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="sticky top-0 bg-blue-700 text-white px-6 py-4 flex justify-between items-center rounded-t-2xl">
          <div>
            <h2 className="text-lg font-bold">Support Technique</h2>
            <p className="text-blue-200 text-xs mt-0.5">Djibouti Telematics Solutions</p>
          </div>
          <button onClick={onClose} className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition">
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          {done ? (
            <div className="text-center py-8">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Message envoyé !</h3>
              <p className="text-gray-600 text-sm mb-6">Notre équipe vous répondra dans les plus brefs délais.</p>
              <button onClick={onClose} className="bg-blue-700 text-white px-8 py-2 rounded-full hover:bg-blue-800 transition">
                Fermer
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><User size={13} /> Nom complet *</label>
                <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Votre nom"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><Mail size={13} /> Email *</label>
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="votre@email.com"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><Phone size={13} /> Téléphone</label>
                <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="+253 77 ..."
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Sujet</label>
                <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Sélectionnez un sujet</option>
                  <option>Problème technique GPS</option>
                  <option>Problème de connexion</option>
                  <option>Question sur la facturation</option>
                  <option>Demande d'installation</option>
                  <option>Demande d'intervention</option>
                  <option>Autre</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Message *</label>
                <textarea rows={4} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Décrivez votre problème ou votre demande..."
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              </div>
              <button
                disabled={!form.name || !form.email || !form.message || sending}
                onClick={handleSend}
                className="w-full bg-blue-700 text-white py-3 rounded-xl hover:bg-blue-800 transition disabled:opacity-40 flex items-center justify-center gap-2 font-semibold">
                {sending ? <><Loader size={16} className="animate-spin" /> Envoi en cours...</> : <><Send size={16} /> Envoyer au support</>}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
