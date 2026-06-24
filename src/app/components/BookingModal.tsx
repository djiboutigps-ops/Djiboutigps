import { useState } from "react";
import emailjs from "@emailjs/browser";
import { X, Calendar, Clock, User, Mail, Phone, ChevronLeft, ChevronRight, CheckCircle, Loader, ChevronDown } from "lucide-react";

// ─── Twilio SMS config ─────────────────────────────────────────────────────────
// 1. Créez un compte sur https://www.twilio.com (essai gratuit disponible)
// 2. Copiez Account SID et Auth Token depuis le dashboard
// 3. Achetez/obtenez un numéro Twilio pour l'envoi
const TWILIO_ACCOUNT_SID = "YOUR_ACCOUNT_SID";  // ← remplacez
const TWILIO_AUTH_TOKEN  = "YOUR_AUTH_TOKEN";    // ← remplacez
const TWILIO_FROM_NUMBER = "YOUR_TWILIO_NUMBER"; // ← remplacez ex: +12345678901
const SMS_TO_NUMBER      = "+25377803232";        // ✅ votre numéro
// ──────────────────────────────────────────────────────────────────────────────

const COUNTRY_CODES = [
  { flag: "🇩🇯", code: "+253", name: "Djibouti" },
  { flag: "🇪🇹", code: "+251", name: "Éthiopie" },
  { flag: "🇸🇴", code: "+252", name: "Somalie" },
  { flag: "🇪🇷", code: "+291", name: "Érythrée" },
  { flag: "🇾🇪", code: "+967", name: "Yémen" },
  { flag: "🇸🇦", code: "+966", name: "Arabie Saoudite" },
  { flag: "🇦🇪", code: "+971", name: "Émirats Arabes" },
  { flag: "🇫🇷", code: "+33",  name: "France" },
  { flag: "🇺🇸", code: "+1",   name: "États-Unis" },
  { flag: "🇬🇧", code: "+44",  name: "Royaume-Uni" },
  { flag: "🇲🇦", code: "+212", name: "Maroc" },
  { flag: "🇹🇳", code: "+216", name: "Tunisie" },
  { flag: "🇩🇿", code: "+213", name: "Algérie" },
  { flag: "🇨🇳", code: "+86",  name: "Chine" },
  { flag: "🇯🇵", code: "+81",  name: "Japon" },
  { flag: "🇩🇪", code: "+49",  name: "Allemagne" },
  { flag: "🇮🇳", code: "+91",  name: "Inde" },
  { flag: "🇰🇪", code: "+254", name: "Kenya" },
  { flag: "🇹🇿", code: "+255", name: "Tanzanie" },
  { flag: "🇸🇩", code: "+249", name: "Soudan" },
];

// ─── EmailJS config ────────────────────────────────────────────────────────────
// 1. Créez un compte gratuit sur https://www.emailjs.com
// 2. Ajoutez un service Email (Gmail, Outlook…) → copiez le Service ID
// 3. Créez un Template avec les variables : {{date}}, {{time}}, {{name}}, {{email}}, {{phone}}, {{message}}
//    Mettez "To Email" = dts@djiboutigps.com dans le template
// 4. Copiez votre Public Key depuis Account → API Keys
const EMAILJS_SERVICE_ID  = "service_5uqkzo7";
const EMAILJS_TEMPLATE_ID = "template_wpxtf9q";
const EMAILJS_PUBLIC_KEY  = "HdOknBy6C1NQ-mTbp";
// ──────────────────────────────────────────────────────────────────────────────

const TIME_SLOTS = [
  "07:00", "08:00", "09:00", "10:00", "11:00",
  "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00",
];

const MONTHS_FR = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
const DAYS_FR   = ["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"];

function isFriday(d: Date) { return d.getDay() === 5; }

function getSlotsForDay(_date: Date) {
  return TIME_SLOTS; // même créneaux tous les jours (sauf vendredi désactivé)
}

interface Props { onClose: () => void; }

export function BookingModal({ onClose }: Props) {
  const today = new Date();
  const [viewYear,  setViewYear]  = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [step, setStep]   = useState<"calendar" | "form" | "done">("calendar");
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", comment: "" });
  const [countryCode, setCountryCode] = useState("+253");
  const [showCountryList, setShowCountryList] = useState(false);

  async function sendSMS(body: string) {
    if (TWILIO_ACCOUNT_SID === "YOUR_ACCOUNT_SID") return;
    try {
      await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`, {
        method: "POST",
        headers: {
          "Authorization": "Basic " + btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ From: TWILIO_FROM_NUMBER, To: SMS_TO_NUMBER, Body: body }),
      });
    } catch {}
  }

  // Build calendar grid
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: (Date | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(viewYear, viewMonth, d));

  const isPast = (d: Date) => {
    const t = new Date(); t.setHours(0,0,0,0);
    return d < t;
  };

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }

  async function handleSend() {
    if (!selectedDate || !selectedTime || !form.name || !form.email) return;
    setSending(true);
    const dateStr = selectedDate.toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          subject:  "Nouvelle démo DTS",
          date:     dateStr,
          time:     selectedTime,
          name:     form.name,
          email:    form.email,
          phone:    form.phone || "Non renseigné",
          message:  form.message || "Aucune solution sélectionnée",
          comment:  form.comment || "Aucun commentaire",
          to_email: "dts@djiboutigps.com",
        },
        EMAILJS_PUBLIC_KEY
      );
      const fullPhone = `${countryCode} ${form.phone}`;
      const smsBody = `🗓 Nouvelle démo DTS\nNom: ${form.name}\nTél: ${fullPhone}\nDate: ${dateStr} à ${selectedTime}\nSolutions: ${form.message}`;
      await sendSMS(smsBody);
      setStep("done");
    } catch {
      alert("Erreur d'envoi. Vérifiez la configuration EmailJS ou contactez-nous directement à dts@djiboutigps.com");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 rounded-t-3xl text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Planifier une démonstration</h2>
            <p className="text-blue-100 text-sm mt-0.5">Djibouti Telematics Solutions</p>
          </div>
          <button onClick={onClose} className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition">
            <X size={18} />
          </button>
        </div>

        <div className="p-6">

          {/* STEP 1 — Calendrier */}
          {step === "calendar" && (
            <>
              <div className="flex items-center justify-between mb-4">
                <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full transition">
                  <ChevronLeft size={18} />
                </button>
                <span className="font-semibold text-gray-800">
                  {MONTHS_FR[viewMonth]} {viewYear}
                </span>
                <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full transition">
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Jours de la semaine */}
              <div className="grid grid-cols-7 mb-2">
                {DAYS_FR.map(d => (
                  <div key={d} className="text-center text-xs text-gray-400 font-medium py-1">{d}</div>
                ))}
              </div>

              {/* Grille */}
              <div className="grid grid-cols-7 gap-1 mb-6">
                {cells.map((date, i) => {
                  if (!date) return <div key={i} />;
                  const disabled = isPast(date) || isFriday(date);
                  const selected = selectedDate?.toDateString() === date.toDateString();
                  return (
                    <button
                      key={i}
                      disabled={disabled}
                      onClick={() => { setSelectedDate(date); setSelectedTime(""); }}
                      className={`
                        aspect-square rounded-xl text-sm transition font-medium
                        ${disabled ? "text-gray-300 cursor-not-allowed" : "hover:bg-blue-50"}
                        ${selected ? "bg-blue-600 text-white hover:bg-blue-600" : ""}
                        ${!disabled && !selected ? "text-gray-700" : ""}
                        ${isFriday(date) ? "text-red-300 cursor-not-allowed" : ""}
                      `}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>

              <p className="text-xs text-gray-400 mb-4 flex gap-4">
                <span><span className="text-red-400 font-medium">Vendredi</span> — fermé</span>
                <span><span className="text-gray-500 font-medium">Tous les autres jours</span> — 7h–11h et 14h–00h</span>
              </p>

              {/* Créneaux horaires */}
              {selectedDate && (
                <>
                  <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Clock size={15} className="text-blue-600" />
                    Choisissez un créneau pour le {selectedDate.toLocaleDateString("fr-FR", { weekday:"long", day:"numeric", month:"long" })}
                  </p>
                  <div className="grid grid-cols-4 gap-2 mb-6">
                    {getSlotsForDay(selectedDate).map(t => (
                      <button
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className={`py-2 rounded-xl text-sm font-medium border transition
                          ${selectedTime === t
                            ? "bg-blue-600 text-white border-blue-600"
                            : "border-gray-200 text-gray-700 hover:border-blue-400 hover:text-blue-600"}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  <button
                    disabled={!selectedTime}
                    onClick={() => setStep("form")}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Continuer →
                  </button>
                </>
              )}
            </>
          )}

          {/* STEP 2 — Formulaire */}
          {step === "form" && (
            <>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-center gap-3">
                <Calendar size={18} className="text-blue-600 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-blue-800">
                    {selectedDate?.toLocaleDateString("fr-FR", { weekday:"long", day:"numeric", month:"long", year:"numeric" })}
                  </p>
                  <p className="text-sm text-blue-600">{selectedTime}</p>
                </div>
                <button onClick={() => setStep("calendar")} className="ml-auto text-xs text-blue-500 underline">Modifier</button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 mb-1 flex items-center gap-1"><User size={13} /> Nom complet *</label>
                  <input
                    type="text" required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Votre nom"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 flex items-center gap-1"><Mail size={13} /> Email *</label>
                  <input
                    type="email" required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="votre@email.com"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 flex items-center gap-1"><Phone size={13} /> Téléphone</label>
                  <div className="flex gap-2">
                    {/* Sélecteur indicatif */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowCountryList(!showCountryList)}
                        className="flex items-center gap-1.5 border border-gray-300 rounded-xl px-3 py-3 text-sm bg-white hover:bg-gray-50 transition whitespace-nowrap"
                      >
                        <span>{COUNTRY_CODES.find(c => c.code === countryCode)?.flag}</span>
                        <span className="font-medium">{countryCode}</span>
                        <ChevronDown size={13} className={`transition-transform ${showCountryList ? "rotate-180" : ""}`} />
                      </button>
                      {showCountryList && (
                        <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-52 overflow-y-auto">
                          {COUNTRY_CODES.map(c => (
                            <button
                              key={c.code}
                              type="button"
                              onClick={() => { setCountryCode(c.code); setShowCountryList(false); }}
                              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-blue-50 transition ${countryCode === c.code ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-700"}`}
                            >
                              <span className="text-lg">{c.flag}</span>
                              <span>{c.name}</span>
                              <span className="ml-auto text-gray-400">{c.code}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      placeholder="77 80 32 32"
                      className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-2 block">Solution(s) qui vous intéresse(nt) *</label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      "Autre",
                      "Détection de Vol dans les magasins",
                      "Détection de vol carburant",
                      "Gestion de GPS",
                      "Gestion des chauffeurs",
                      "Gestion de niveau de réservoir carburant",
                      "Gestion des sous-compteur électrique",
                      "GPS pour animaux",
                      "Système Anti-intrusion",
                      "Système de portail automation & barrière",
                    ].map((option) => (
                      <label key={option} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={form.message.split(", ").includes(option)}
                          onChange={(e) => {
                            const current = form.message ? form.message.split(", ").filter(Boolean) : [];
                            const updated = e.target.checked
                              ? [...current, option]
                              : current.filter(v => v !== option);
                            setForm(f => ({ ...f, message: updated.join(", ") }));
                          }}
                          className="w-4 h-4 accent-blue-600 rounded"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-blue-600 transition">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Commentaire (optionnel)</label>
                  <textarea
                    value={form.comment ?? ""}
                    onChange={e => setForm(f => ({ ...f, comment: e.target.value } as any))}
                    placeholder="Décrivez votre besoin en détail..."
                    rows={2}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
              </div>

              <button
                disabled={!form.name || !form.email || sending}
                onClick={handleSend}
                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-40 flex items-center justify-center gap-2"
              >
                {sending ? <><Loader size={16} className="animate-spin" /> Envoi en cours...</> : "Confirmer la réservation →"}
              </button>
            </>
          )}

          {/* STEP 3 — Confirmation */}
          {step === "done" && (
            <div className="text-center py-8">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Réservation confirmée !</h3>
              <p className="text-gray-600 mb-2">
                Votre démonstration est planifiée pour le{" "}
                <strong>{selectedDate?.toLocaleDateString("fr-FR", { weekday:"long", day:"numeric", month:"long" })}</strong> à{" "}
                <strong>{selectedTime}</strong>.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Un email de confirmation a été envoyé à notre équipe. Nous vous contacterons à <strong>{form.email}</strong> pour confirmer.
              </p>
              <button onClick={onClose} className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition">
                Fermer
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
