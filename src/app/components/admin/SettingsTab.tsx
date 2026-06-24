import { useState, useRef } from "react";
import { Save, PlusCircle, Trash2, Upload } from "lucide-react";
import { type CompanySettings } from "./AdminTypes";

interface Props { settings: CompanySettings; saveSettings: (s: CompanySettings) => void; }

export function SettingsTab({ settings, saveSettings }: Props) {
  const [s, setS] = useState<CompanySettings>({ ...settings });
  const [newMethod, setNewMethod] = useState("");
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleLogo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setS(x => ({ ...x, logo: reader.result as string }));
    reader.readAsDataURL(file);
  }

  function save() {
    saveSettings(s);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function addMethod() {
    if (!newMethod.trim()) return;
    setS(x => ({ ...x, paymentMethods: [...x.paymentMethods, newMethod.trim()] }));
    setNewMethod("");
  }

  function removeMethod(i: number) {
    setS(x => ({ ...x, paymentMethods: x.paymentMethods.filter((_, j) => j !== i) }));
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Paramètres de l'entreprise</h2>
        <button onClick={save} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition text-sm ${saved ? "bg-green-600 text-white" : "bg-blue-700 text-white hover:bg-blue-800"}`}>
          <Save size={16} /> {saved ? "✅ Enregistré !" : "Enregistrer"}
        </button>
      </div>

      {/* Logo */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4">Logo de l'entreprise</h3>
        <div className="flex items-center gap-6">
          {s.logo ? (
            <img src={s.logo} alt="Logo" className="h-24 w-auto object-contain border rounded-xl p-2 bg-gray-50" />
          ) : (
            <div className="h-24 w-40 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-sm border">
              Aucun logo
            </div>
          )}
          <div className="space-y-2">
            <input type="file" ref={fileRef} accept="image/*" onChange={handleLogo} className="hidden" />
            <button onClick={() => fileRef.current?.click()}
              className="flex items-center gap-2 bg-blue-50 text-blue-700 border border-blue-200 px-4 py-2 rounded-xl text-sm hover:bg-blue-100 transition">
              <Upload size={16} /> Choisir un logo
            </button>
            {s.logo && <button onClick={() => setS(x => ({ ...x, logo: "" }))} className="text-red-500 text-sm hover:text-red-700">Supprimer</button>}
            <p className="text-xs text-gray-400">PNG, JPG — max 2 Mo</p>
          </div>
        </div>
      </div>

      {/* Infos entreprise */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4">Informations de l'entreprise</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { k:"nom", p:"Nom de l'entreprise *" },
            { k:"email", p:"Email" },
            { k:"telephone", p:"Téléphone" },
            { k:"siteWeb", p:"Site web" },
            { k:"siret", p:"SIRET / Numéro d'enregistrement" },
            { k:"iban", p:"IBAN / RIB" },
          ].map(f => (
            <div key={f.k}>
              <label className="text-xs text-gray-500 mb-1 block">{f.p}</label>
              <input value={(s as any)[f.k]||""} onChange={e => setS(x => ({...x, [f.k]: e.target.value}))}
                placeholder={f.p}
                className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          ))}
          <div className="sm:col-span-2">
            <label className="text-xs text-gray-500 mb-1 block">Adresse complète</label>
            <textarea value={s.adresse} onChange={e => setS(x=>({...x,adresse:e.target.value}))} rows={2}
              className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs text-gray-500 mb-1 block">Mentions légales (apparaît en bas des documents)</label>
            <textarea value={s.mentionsLegales} onChange={e => setS(x=>({...x,mentionsLegales:e.target.value}))} rows={2}
              className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          </div>
        </div>
      </div>

      {/* Modes de paiement */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4">Modes de paiement acceptés</h3>
        <div className="space-y-2 mb-4">
          {s.paymentMethods.map((m, i) => (
            <div key={i} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-2.5">
              <span className="text-sm text-gray-700">💳 {m}</span>
              <button onClick={() => removeMethod(i)} className="text-red-400 hover:text-red-600"><Trash2 size={14}/></button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input value={newMethod} onChange={e => setNewMethod(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addMethod()}
            placeholder="Ajouter un mode de paiement..."
            className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button onClick={addMethod} className="bg-blue-700 text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-800 transition flex items-center gap-1">
            <PlusCircle size={14}/> Ajouter
          </button>
        </div>
      </div>

      <button onClick={save} className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition ${saved ? "bg-green-600 text-white" : "bg-blue-700 text-white hover:bg-blue-800"}`}>
        <Save size={18} /> {saved ? "✅ Paramètres enregistrés !" : "Enregistrer tous les paramètres"}
      </button>
    </div>
  );
}
