import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { ChevronRight, CheckCircle, Loader, Lock } from "lucide-react";

const EMAILJS_SERVICE_ID = "service_5uqkzo7";
const EMAILJS_TEMPLATE_ID = "template_wpxtf9q";
const EMAILJS_PUBLIC_KEY  = "HdOknBy6C1NQ-mTbp";
const SITE_CODE = "AKRAM2027";

function getDevice() {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "Tablette";
  if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(ua)) return "Téléphone mobile";
  return "Ordinateur";
}

async function getLocation() {
  try {
    const r = await fetch("https://ipapi.co/json/");
    const d = await r.json();
    return { ip: d.ip||"?", pays: d.country_name||"?", region: d.region||"?", ville: d.city||"?", isp: d.org||"?" };
  } catch { return { ip:"?", pays:"?", region:"?", ville:"?", isp:"?" }; }
}

async function sendVisitor(label: string, extra = "") {
  const device = getDevice();
  const loc = await getLocation();
  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      subject: label,
      name: "Visiteur",
      email: "visiteur@auto.dts",
      phone: "N/A",
      message: `${label}\n\nAppareil : ${device}\nIP : ${loc.ip}\nPays : ${loc.pays}\nRégion : ${loc.region}\nVille : ${loc.ville}\nFAI : ${loc.isp}\nDate : ${new Date().toLocaleString("fr-FR")}${extra ? "\n\n" + extra : ""}`,
      comment: `${device} | ${loc.ip} | ${loc.pays}/${loc.ville}`,
      date: new Date().toLocaleDateString("fr-FR"),
      time: new Date().toLocaleTimeString("fr-FR"),
      to_email: "dts@djiboutigps.com",
    }, EMAILJS_PUBLIC_KEY);
  } catch {}
}

interface Props { onUnlock: () => void; }

export function SurveyModal({ onUnlock }: Props) {
  const [phase, setPhase]   = useState<"survey"|"code">("survey");
  const [step, setStep]     = useState(0);
  const [sending, setSending] = useState(false);
  const [surveyDone, setSurveyDone] = useState(false);
  const [code, setCode]     = useState("");
  const [codeError, setCodeError] = useState(false);
  const [form, setForm]     = useState({ profil:"", source:"", sourceDetail:"", besoin:"", prenom:"", nom:"", telephone:"", age:"" });

  // Envoyer les données visiteur dès l'ouverture (sauf si c'est l'appareil admin)
  useEffect(() => {
    if (!localStorage.getItem("dts_admin_device")) {
      sendVisitor("Nouveau visiteur — djiboutigps.com");
    }
  }, []);

  async function handleSkip() {
    if (!localStorage.getItem("dts_admin_device")) {
      await sendVisitor("Visiteur a passé le sondage");
    }
    setPhase("code");
  }

  async function handleSubmit() {
    setSending(true);
    const extra = `PROFIL : ${form.profil}\nSOURCE : ${form.source}${form.sourceDetail ? ` → ${form.sourceDetail}` : ""}\nRECHERCHE : ${form.besoin||"Non renseigné"}\nPrénom : ${form.prenom}\nNom : ${form.nom}\nTél : ${form.telephone}\nÂge : ${form.age||"N/R"}`;
    if (!localStorage.getItem("dts_admin_device")) {
      await sendVisitor("Sondage complété — djiboutigps.com", extra);
    }
    setSending(false);
    setSurveyDone(true);
    setTimeout(() => setPhase("code"), 1500);
  }

  function handleCode() {
    if (code.trim().toUpperCase() === SITE_CODE) {
      onUnlock();
    } else {
      setCodeError(true);
      setTimeout(() => setCodeError(false), 2000);
    }
  }

  const canNext = [
    form.profil !== "",
    form.source !== "",
    true,
    form.prenom !== "" && form.nom !== "" && form.telephone !== "",
  ];

  // ── PHASE CODE ──────────────────────────────────────────────────────────────
  if (phase === "code") {
    return (
      <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-gray-950">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={28} className="text-blue-700" />
          </div>
          {surveyDone && (
            <div className="flex items-center justify-center gap-2 text-green-600 mb-4 text-sm">
              <CheckCircle size={16} /> Merci pour vos réponses !
            </div>
          )}
          <h2 className="text-xl font-bold text-gray-900 mb-2">Accès réservé</h2>
          <p className="text-gray-500 text-sm mb-6">Saisissez votre <strong>code client</strong> pour accéder au site</p>
          <input
            type="text"
            value={code}
            onChange={e => { setCode(e.target.value.toUpperCase()); setCodeError(false); }}
            onKeyDown={e => e.key === "Enter" && handleCode()}
            placeholder="CODE CLIENT"
            className={`w-full border-2 rounded-xl px-4 py-3 text-center text-lg font-bold tracking-widest focus:outline-none transition mb-3 ${codeError ? "border-red-400 bg-red-50 text-red-600" : "border-gray-300 focus:border-blue-600"}`}
          />
          {codeError && <p className="text-red-500 text-sm mb-3">❌ Code incorrect. Réessayez.</p>}
          <button onClick={handleCode}
            className="w-full bg-blue-700 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition">
            Accéder au site →
          </button>
          <p className="text-xs text-gray-400 mt-4">
            Pas de code ? <a href="tel:+25377803232" className="text-blue-600">+253 77 80 32 32</a>
          </p>
        </div>
      </div>
    );
  }

  // ── PHASE SONDAGE ──────────────────────────────────────────────────────────
  if (surveyDone) {
    return (
      <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-black/60">
        <div className="bg-white rounded-2xl p-10 max-w-sm w-full text-center shadow-2xl">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Merci !</h3>
          <p className="text-gray-500 text-sm">Vos réponses nous aident à mieux vous servir.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

        <div className="bg-blue-700 text-white px-6 py-4 rounded-t-2xl">
          <h2 className="text-lg font-bold">Aidez-nous à mieux vous servir</h2>
          <p className="text-blue-200 text-xs mt-0.5">Sondage rapide — 1 minute</p>
        </div>

        <div className="flex h-1.5 bg-gray-100">
          {[0,1,2,3].map(i => (
            <div key={i} className={`flex-1 transition-all ${i <= step ? "bg-blue-600" : ""}`} />
          ))}
        </div>

        <div className="p-6">

          {/* Étape 1 — Profil */}
          {step === 0 && (
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900">Bienvenue ! Comment souhaitez-vous continuer ?</h3>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { key:"Particulier", icon:"👤", desc:"Usage personnel ou familial" },
                  { key:"Professionnel / Entreprise", icon:"🏢", desc:"Société, PME, institution" },
                ].map(p => (
                  <button key={p.key} onClick={() => setForm(f=>({...f, profil:p.key}))}
                    className={`border-2 rounded-2xl p-4 text-left flex items-center gap-4 transition ${form.profil===p.key?"border-blue-600 bg-blue-50":"border-gray-200 hover:border-blue-300"}`}>
                    <div className="text-3xl shrink-0">{p.icon}</div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{p.key}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{p.desc}</p>
                    </div>
                  </button>
                ))}
                {/* Option 3 — Accès direct avec code */}
                <button onClick={() => setPhase("code")}
                  className="border-2 border-orange-400 bg-orange-50 rounded-2xl p-4 text-left flex items-center gap-4 hover:bg-orange-100 transition">
                  <div className="text-3xl shrink-0">🔑</div>
                  <div>
                    <p className="font-semibold text-orange-700 text-sm">J'ai un code d'accès</p>
                    <p className="text-xs text-orange-400 mt-0.5">Accéder directement au site avec mon code client</p>
                  </div>
                </button>

                {/* Option 4 — Espace Admin */}
                <button onClick={() => { sessionStorage.setItem("dts_unlocked","1"); window.__openAdmin?.(); }}
                  className="border-2 border-gray-700 bg-gray-900 rounded-2xl p-4 text-left flex items-center gap-4 hover:bg-gray-800 transition">
                  <div className="text-3xl shrink-0">⚙️</div>
                  <div>
                    <p className="font-semibold text-white text-sm">Espace Admin</p>
                    <p className="text-xs text-gray-400 mt-0.5">Accès réservé à l'administrateur du site</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Étape 2 — Source */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900">Comment avez-vous connu notre site ?</h3>
              <div className="space-y-2">
                {[{key:"Réseaux sociaux",icon:"📱"},{key:"À travers un client",icon:"🤝"},{key:"Google / Moteur de recherche",icon:"🔍"},{key:"Bouche à oreille",icon:"💬"},{key:"Publicité",icon:"📢"},{key:"Autre",icon:"🔗"}].map(s => (
                  <button key={s.key} onClick={() => setForm(f=>({...f, source:s.key, sourceDetail:""}))}
                    className={`w-full flex items-center gap-3 border-2 rounded-xl px-4 py-3 text-sm text-left transition ${form.source===s.key?"border-blue-600 bg-blue-50 text-blue-700 font-semibold":"border-gray-200 hover:border-blue-300 text-gray-700"}`}>
                    <span className="text-xl">{s.icon}</span>{s.key}
                  </button>
                ))}
              </div>
              {(form.source==="À travers un client"||form.source==="Autre") && (
                <input type="text" value={form.sourceDetail} onChange={e=>setForm(f=>({...f,sourceDetail:e.target.value}))}
                  placeholder={form.source==="À travers un client"?"Quel client vous a recommandé ?":"Précisez..."}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              )}
            </div>
          )}

          {/* Étape 3 — Besoin libre */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900">Qu'est-ce que vous recherchez ?</h3>
              <p className="text-gray-500 text-sm">Décrivez librement votre besoin.</p>
              <textarea rows={5} value={form.besoin} onChange={e=>setForm(f=>({...f,besoin:e.target.value}))}
                placeholder="Décrivez votre besoin en quelques mots..."
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
            </div>
          )}

          {/* Étape 4 — Identité */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900">Pour finir :</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Prénom *</label>
                  <input type="text" value={form.prenom} onChange={e=>setForm(f=>({...f,prenom:e.target.value}))} placeholder="Prénom"
                    className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Nom *</label>
                  <input type="text" value={form.nom} onChange={e=>setForm(f=>({...f,nom:e.target.value}))} placeholder="Nom"
                    className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Téléphone *</label>
                <input type="tel" value={form.telephone} onChange={e=>setForm(f=>({...f,telephone:e.target.value}))} placeholder="+253 77 ..."
                  className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Âge (optionnel)</label>
                <input type="number" min="10" max="100" value={form.age} onChange={e=>setForm(f=>({...f,age:e.target.value}))} placeholder="Votre âge"
                  className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <p className="text-xs text-gray-400">🔒 Vos données sont confidentielles.</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-6">
            {step > 0 && (
              <button onClick={() => setStep(s=>s-1)}
                className="border border-gray-300 text-gray-600 px-5 py-2.5 rounded-xl hover:bg-gray-50 transition text-sm">
                ← Retour
              </button>
            )}
            {step < 3 ? (
              <button disabled={!canNext[step]} onClick={() => setStep(s=>s+1)}
                className="flex-1 bg-blue-700 text-white py-2.5 rounded-xl font-semibold disabled:opacity-40 hover:bg-blue-800 transition flex items-center justify-center gap-2">
                Suivant <ChevronRight size={16} />
              </button>
            ) : (
              <button disabled={!canNext[3]||sending} onClick={handleSubmit}
                className="flex-1 bg-blue-700 text-white py-2.5 rounded-xl font-semibold disabled:opacity-40 hover:bg-blue-800 transition flex items-center justify-center gap-2">
                {sending ? <><Loader size={16} className="animate-spin"/>Envoi...</> : "Terminer ✓"}
              </button>
            )}
          </div>

          <button onClick={handleSkip} className="w-full mt-3 text-xs text-gray-400 hover:text-gray-600 transition">
            Passer le sondage
          </button>

        </div>
      </div>
    </div>
  );
}
