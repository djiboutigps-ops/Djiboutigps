import { useState, useEffect } from "react";
import { ArrowLeft, Lock, Users, Package, FileText, CreditCard, Truck, PlusCircle, Trash2, Edit3, Send, CheckCircle, X, Download, RefreshCw, Settings } from "lucide-react";
import { store, genId, formatMontant, calcTotal, type Client, type Fournisseur, type Article, type Document, type LigneDoc, type Currency, type PaymentMethod, type CompanySettings } from "./admin/AdminTypes";
import { SettingsTab } from "./admin/SettingsTab";
import { generatePDF, downloadPDF, sendViaWhatsApp, sendByEmail } from "./admin/PdfGenerator";

const ADMIN_EMAIL = "dts@djiboutigps.com";
const ADMIN_PASS  = "@Djibouti2027@";

interface Props { onClose: () => void; }

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [pass, setPass]   = useState("");
  const [err, setErr]     = useState(false);

  function submit() {
    if (email === ADMIN_EMAIL && pass === ADMIN_PASS) { onLogin(); }
    else { setErr(true); setTimeout(() => setErr(false), 2000); }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="bg-blue-700 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"><Lock size={28} className="text-white" /></div>
          <h1 className="text-2xl font-bold text-gray-900">Espace Admin</h1>
          <p className="text-gray-500 text-sm mt-1">Djibouti Telematics Solutions</p>
        </div>
        <div className="space-y-4">
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email administrateur"
            className={`w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none ${err ? "border-red-400" : "border-gray-200 focus:border-blue-600"}`} />
          <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="Mot de passe"
            onKeyDown={e => e.key === "Enter" && submit()}
            className={`w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none ${err ? "border-red-400" : "border-gray-200 focus:border-blue-600"}`} />
          {err && <p className="text-red-500 text-sm text-center">❌ Identifiants incorrects</p>}
          <button onClick={submit} className="w-full bg-blue-700 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition">
            Connexion →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN SHELL ──────────────────────────────────────────────────────────────
const TABS = [
  { id:"dashboard", label:"Tableau de bord", icon:<CreditCard size={16}/> },
  { id:"clients",   label:"Clients",         icon:<Users size={16}/> },
  { id:"fournisseurs",label:"Fournisseurs",  icon:<Truck size={16}/> },
  { id:"articles",  label:"Articles",        icon:<Package size={16}/> },
  { id:"devis",     label:"Devis",           icon:<FileText size={16}/> },
  { id:"factures",  label:"Factures",        icon:<FileText size={16}/> },
  { id:"recurrentes",label:"Récurrentes",    icon:<RefreshCw size={16}/> },
  { id:"avoirs",    label:"Avoirs",          icon:<FileText size={16}/> },
  { id:"settings",  label:"Paramètres",      icon:<Settings size={16}/> },
];

export function AdminPage({ onClose }: Props) {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab]       = useState("dashboard");
  const [clients, setClientsState]   = useState<Client[]>([]);
  const [fournisseurs, setFournState] = useState<Fournisseur[]>([]);
  const [articles, setArticlesState] = useState<Article[]>([]);
  const [documents, setDocsState]    = useState<Document[]>([]);
  const [settings, setSettingsState] = useState<CompanySettings>(store.settings());

  useEffect(() => {
    setClientsState(store.clients());
    setFournState(store.fournisseurs());
    setArticlesState(store.articles());
    setDocsState(store.documents());
    setSettingsState(store.settings());
  }, []);

  const saveClients = (v: Client[]) => { setClientsState(v); store.saveClients(v); };
  const saveFourn   = (v: Fournisseur[]) => { setFournState(v); store.saveFournisseurs(v); };
  const saveArticles= (v: Article[]) => { setArticlesState(v); store.saveArticles(v); };
  const saveDocs    = (v: Document[]) => { setDocsState(v); store.saveDocuments(v); };
  const saveSettings= (v: CompanySettings) => { setSettingsState(v); store.saveSettings(v); };

  if (!authed) return <Login onLogin={() => { setAuthed(true); localStorage.setItem("dts_admin_device", "1"); }} />;

  const factures  = documents.filter(d => d.type === "facture");
  const devis     = documents.filter(d => d.type === "devis");
  const avoirs    = documents.filter(d => d.type === "avoir");
  const recur     = documents.filter(d => d.type === "recurrente");

  const totalFacture = factures.reduce((s, d) => s + calcTotal(d.lignes).ttc, 0);
  const totalPayé    = factures.filter(d => d.status === "payé").reduce((s, d) => s + calcTotal(d.lignes).ttc, 0);
  const totalImpayé  = totalFacture - totalPayé;

  return (
    <div className="fixed inset-0 z-[400] bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-blue-700 text-white px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="bg-white hover:bg-gray-100 text-blue-700 font-semibold px-4 py-2 rounded-full text-sm flex items-center gap-2 transition shadow-sm">
            <ArrowLeft size={16} /> ← Retour au site DTS
          </button>
          <span className="font-bold">Espace Admin — DTS</span>
        </div>
        <span className="text-blue-200 text-xs hidden sm:block">{ADMIN_EMAIL}</span>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="bg-white w-48 shrink-0 border-r border-gray-200 overflow-y-auto">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`w-full flex items-center gap-2 px-4 py-3 text-sm text-left transition ${tab === t.id ? "bg-blue-50 text-blue-700 font-semibold border-r-2 border-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">

          {/* DASHBOARD */}
          {tab === "dashboard" && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Tableau de bord</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label:"Clients", val: clients.length, color:"bg-blue-600" },
                  { label:"Factures émises", val: factures.length, color:"bg-green-600" },
                  { label:"Total facturé (DJF)", val: formatMontant(totalFacture,"DJF"), color:"bg-orange-600" },
                  { label:"Impayé (DJF)", val: formatMontant(totalImpayé,"DJF"), color:"bg-red-600" },
                ].map(s => (
                  <div key={s.label} className={`${s.color} text-white rounded-2xl p-5`}>
                    <p className="text-white/70 text-xs mb-1">{s.label}</p>
                    <p className="text-2xl font-bold">{s.val}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-3">Dernières factures</h3>
                {factures.length === 0 ? <p className="text-gray-400 text-sm">Aucune facture</p> : (
                  <table className="w-full text-sm">
                    <thead><tr className="border-b text-gray-500 text-left"><th className="pb-2">N°</th><th>Client</th><th>Montant</th><th>Statut</th></tr></thead>
                    <tbody>
                      {factures.slice(-5).reverse().map(f => {
                        const client = clients.find(c => c.id === f.clientId);
                        return (
                          <tr key={f.id} className="border-b last:border-0">
                            <td className="py-2 font-mono text-xs">{f.numero}</td>
                            <td>{client?.nom || "—"}</td>
                            <td>{formatMontant(calcTotal(f.lignes).ttc, f.devise)}</td>
                            <td><span className={`px-2 py-0.5 rounded-full text-xs ${f.status==="payé"?"bg-green-100 text-green-700":f.status==="en retard"?"bg-red-100 text-red-700":"bg-orange-100 text-orange-700"}`}>{f.status}</span></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* CLIENTS */}
          {tab === "clients" && <ClientsTab clients={clients} saveClients={saveClients} />}
          {tab === "fournisseurs" && <FournisseursTab fournisseurs={fournisseurs} saveFourn={saveFourn} />}
          {tab === "articles" && <ArticlesTab articles={articles} saveArticles={saveArticles} />}
          {tab === "devis" && <DocsTab type="devis" docs={devis} allDocs={documents} saveDocs={saveDocs} clients={clients} articles={articles} title="Devis" prefix="DEV" settings={settings} />}
          {tab === "factures" && <DocsTab type="facture" docs={factures} allDocs={documents} saveDocs={saveDocs} clients={clients} articles={articles} title="Factures" prefix="FAC" settings={settings} />}
          {tab === "recurrentes" && <RecurrentesTab docs={recur} allDocs={documents} saveDocs={saveDocs} clients={clients} articles={articles} />}
          {tab === "avoirs" && <DocsTab type="avoir" docs={avoirs} allDocs={documents} saveDocs={saveDocs} clients={clients} articles={articles} title="Avoirs" prefix="AVO" settings={settings} />}
          {tab === "settings" && <SettingsTab settings={settings} saveSettings={saveSettings} />}
        </div>
      </div>
    </div>
  );
}

// ─── CLIENTS TAB ──────────────────────────────────────────────────────────────
function ClientsTab({ clients, saveClients }: { clients: Client[]; saveClients: (v: Client[]) => void }) {
  const [form, setForm] = useState<Partial<Client>>({});
  const [editing, setEditing] = useState<string|null>(null);
  const [showForm, setShowForm] = useState(false);

  function save() {
    if (!form.nom || !form.telephone) return;
    if (editing) {
      saveClients(clients.map(c => c.id === editing ? { ...c, ...form } as Client : c));
    } else {
      saveClients([...clients, { id: genId(), nom:"", email:"", telephone:"", adresse:"", type:"entreprise", devise:"DJF", createdAt: new Date().toLocaleDateString("fr-FR"), ...form } as Client]);
    }
    setForm({}); setEditing(null); setShowForm(false);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Clients ({clients.length})</h2>
        <button onClick={() => { setForm({}); setEditing(null); setShowForm(true); }}
          className="bg-blue-700 text-white px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:bg-blue-800 transition">
          <PlusCircle size={16} /> Nouveau client
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-4 border border-blue-200">
          <h3 className="font-bold text-gray-900 mb-4">{editing ? "Modifier" : "Nouveau"} client</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[{k:"nom",p:"Nom / Raison sociale *"},{k:"email",p:"Email"},{k:"telephone",p:"Téléphone *"},{k:"adresse",p:"Adresse"}].map(f => (
              <input key={f.k} placeholder={f.p} value={(form as any)[f.k]||""} onChange={e => setForm(x => ({...x,[f.k]:e.target.value}))}
                className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            ))}
            <select value={form.type||"entreprise"} onChange={e => setForm(x => ({...x,type:e.target.value as any}))}
              className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="entreprise">Entreprise</option>
              <option value="particulier">Particulier</option>
            </select>
            <select value={form.devise||"DJF"} onChange={e => setForm(x => ({...x,devise:e.target.value as Currency}))}
              className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="DJF">DJF</option><option value="USD">USD ($)</option><option value="EUR">EUR (€)</option>
            </select>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={save} className="bg-blue-700 text-white px-5 py-2 rounded-xl text-sm hover:bg-blue-800 transition">Enregistrer</button>
            <button onClick={() => { setShowForm(false); setForm({}); }} className="border border-gray-300 text-gray-600 px-5 py-2 rounded-xl text-sm hover:bg-gray-50 transition">Annuler</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {clients.length === 0 ? <p className="p-6 text-gray-400 text-sm">Aucun client</p> : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b"><tr>
              <th className="px-4 py-3 text-left text-gray-500 font-medium">Nom</th>
              <th className="px-4 py-3 text-left text-gray-500 font-medium">Téléphone</th>
              <th className="px-4 py-3 text-left text-gray-500 font-medium">Type</th>
              <th className="px-4 py-3 text-left text-gray-500 font-medium">Devise</th>
              <th className="px-4 py-3"></th>
            </tr></thead>
            <tbody>
              {clients.map(c => (
                <tr key={c.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{c.nom}</td>
                  <td className="px-4 py-3 text-gray-600">{c.telephone}</td>
                  <td className="px-4 py-3"><span className="bg-gray-100 px-2 py-0.5 rounded text-xs">{c.type}</span></td>
                  <td className="px-4 py-3 text-gray-600">{c.devise}</td>
                  <td className="px-4 py-3 flex gap-2 justify-end">
                    <button onClick={() => { setForm(c); setEditing(c.id); setShowForm(true); }} className="text-blue-600 hover:text-blue-800"><Edit3 size={15}/></button>
                    <button onClick={() => saveClients(clients.filter(x => x.id !== c.id))} className="text-red-500 hover:text-red-700"><Trash2 size={15}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ─── FOURNISSEURS TAB ─────────────────────────────────────────────────────────
function FournisseursTab({ fournisseurs, saveFourn }: { fournisseurs: Fournisseur[]; saveFourn: (v: Fournisseur[]) => void }) {
  const [form, setForm] = useState<Partial<Fournisseur>>({});
  const [showForm, setShowForm] = useState(false);

  function save() {
    if (!form.nom) return;
    saveFourn([...fournisseurs, { id: genId(), nom:"", email:"", telephone:"", adresse:"", contact:"", ...form } as Fournisseur]);
    setForm({}); setShowForm(false);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Fournisseurs ({fournisseurs.length})</h2>
        <button onClick={() => setShowForm(true)} className="bg-blue-700 text-white px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:bg-blue-800 transition">
          <PlusCircle size={16} /> Nouveau fournisseur
        </button>
      </div>
      {showForm && (
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-4 border border-blue-200">
          <div className="grid sm:grid-cols-2 gap-3">
            {[{k:"nom",p:"Nom *"},{k:"email",p:"Email"},{k:"telephone",p:"Téléphone"},{k:"contact",p:"Contact"},{k:"adresse",p:"Adresse"}].map(f => (
              <input key={f.k} placeholder={f.p} value={(form as any)[f.k]||""} onChange={e => setForm(x => ({...x,[f.k]:e.target.value}))}
                className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={save} className="bg-blue-700 text-white px-5 py-2 rounded-xl text-sm hover:bg-blue-800 transition">Enregistrer</button>
            <button onClick={() => setShowForm(false)} className="border border-gray-300 text-gray-600 px-5 py-2 rounded-xl text-sm hover:bg-gray-50 transition">Annuler</button>
          </div>
        </div>
      )}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {fournisseurs.length === 0 ? <p className="p-6 text-gray-400 text-sm">Aucun fournisseur</p> : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b"><tr>
              <th className="px-4 py-3 text-left text-gray-500 font-medium">Nom</th>
              <th className="px-4 py-3 text-left text-gray-500 font-medium">Contact</th>
              <th className="px-4 py-3 text-left text-gray-500 font-medium">Téléphone</th>
              <th className="px-4 py-3"></th>
            </tr></thead>
            <tbody>
              {fournisseurs.map(f => (
                <tr key={f.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{f.nom}</td>
                  <td className="px-4 py-3 text-gray-600">{f.contact}</td>
                  <td className="px-4 py-3 text-gray-600">{f.telephone}</td>
                  <td className="px-4 py-3 flex justify-end">
                    <button onClick={() => saveFourn(fournisseurs.filter(x => x.id !== f.id))} className="text-red-500 hover:text-red-700"><Trash2 size={15}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ─── ARTICLES TAB ─────────────────────────────────────────────────────────────
function ArticlesTab({ articles, saveArticles }: { articles: Article[]; saveArticles: (v: Article[]) => void }) {
  const [form, setForm] = useState<Partial<Article>>({});
  const [showForm, setShowForm] = useState(false);

  function save() {
    if (!form.nom || !form.prix) return;
    saveArticles([...articles, { id: genId(), nom:"", description:"", prix:0, unite:"unité", taxe:0, ...form } as Article]);
    setForm({}); setShowForm(false);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Articles & Services ({articles.length})</h2>
        <button onClick={() => setShowForm(true)} className="bg-blue-700 text-white px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:bg-blue-800 transition">
          <PlusCircle size={16} /> Nouvel article
        </button>
      </div>
      {showForm && (
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-4 border border-blue-200">
          <div className="grid sm:grid-cols-3 gap-3">
            <input placeholder="Nom *" value={form.nom||""} onChange={e => setForm(x=>({...x,nom:e.target.value}))} className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-2" />
            <input placeholder="Unité (ex: heure, mois)" value={form.unite||""} onChange={e => setForm(x=>({...x,unite:e.target.value}))} className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input placeholder="Description" value={form.description||""} onChange={e => setForm(x=>({...x,description:e.target.value}))} className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-2" />
            <input type="number" placeholder="Prix HT" value={form.prix||""} onChange={e => setForm(x=>({...x,prix:+e.target.value}))} className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="number" placeholder="Taxe %" value={form.taxe||""} onChange={e => setForm(x=>({...x,taxe:+e.target.value}))} className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={save} className="bg-blue-700 text-white px-5 py-2 rounded-xl text-sm hover:bg-blue-800 transition">Enregistrer</button>
            <button onClick={() => setShowForm(false)} className="border border-gray-300 text-gray-600 px-5 py-2 rounded-xl text-sm hover:bg-gray-50 transition">Annuler</button>
          </div>
        </div>
      )}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {articles.length === 0 ? <p className="p-6 text-gray-400 text-sm">Aucun article</p> : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b"><tr>
              <th className="px-4 py-3 text-left text-gray-500 font-medium">Nom</th>
              <th className="px-4 py-3 text-left text-gray-500 font-medium">Prix HT</th>
              <th className="px-4 py-3 text-left text-gray-500 font-medium">Taxe</th>
              <th className="px-4 py-3 text-left text-gray-500 font-medium">Unité</th>
              <th className="px-4 py-3"></th>
            </tr></thead>
            <tbody>
              {articles.map(a => (
                <tr key={a.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{a.nom}<br/><span className="text-gray-400 text-xs">{a.description}</span></td>
                  <td className="px-4 py-3">{a.prix.toLocaleString("fr-FR")}</td>
                  <td className="px-4 py-3">{a.taxe}%</td>
                  <td className="px-4 py-3 text-gray-600">{a.unite}</td>
                  <td className="px-4 py-3 flex justify-end">
                    <button onClick={() => saveArticles(articles.filter(x => x.id !== a.id))} className="text-red-500 hover:text-red-700"><Trash2 size={15}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ─── DOCUMENTS TAB ────────────────────────────────────────────────────────────
function DocsTab({ type, docs, allDocs, saveDocs, clients, articles, title, prefix, settings }: {
  type: Document["type"]; docs: Document[]; allDocs: Document[]; saveDocs: (v: Document[]) => void;
  clients: Client[]; articles: Article[]; title: string; prefix: string; settings?: CompanySettings;
}) {
  const [editing, setEditing] = useState<Document|null>(null);
  const [showPay, setShowPay] = useState<Document|null>(null);
  const [sendingEmail, setSendingEmail] = useState<string|null>(null);

  function newDoc(): Document {
    const num = `${prefix}-${new Date().getFullYear()}-${String(allDocs.filter(d=>d.type===type).length+1).padStart(3,"0")}`;
    return { id: genId(), numero: num, type, clientId:"", date: new Date().toISOString().slice(0,10), dateEcheance: new Date(Date.now()+30*864e5).toISOString().slice(0,10), lignes:[], devise:"DJF", status:"brouillon", notes:"", paiements:[], frequence: type==="recurrente"?"mensuelle":undefined };
  }

  function saveDoc(doc: Document) {
    const exists = allDocs.find(d => d.id === doc.id);
    if (exists) saveDocs(allDocs.map(d => d.id === doc.id ? doc : d));
    else saveDocs([...allDocs, doc]);
    setEditing(null);
  }

  function deleteDoc(id: string) { saveDocs(allDocs.filter(d => d.id !== id)); }

  function sendWhatsApp(doc: Document) {
    const client = clients.find(c => c.id === doc.clientId);
    sendViaWhatsApp(doc, client, settings || store.settings());
  }

  if (editing) return <DocEditor doc={editing} clients={clients} articles={articles} onSave={saveDoc} onCancel={() => setEditing(null)} />;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">{title} ({docs.length})</h2>
        <button onClick={() => setEditing(newDoc())} className="bg-blue-700 text-white px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:bg-blue-800 transition">
          <PlusCircle size={16} /> Nouveau
        </button>
      </div>

      {showPay && <PayModal doc={showPay} onSave={(d) => { saveDoc(d); setShowPay(null); }} onClose={() => setShowPay(null)} />}

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {docs.length === 0 ? <p className="p-6 text-gray-400 text-sm">Aucun document</p> : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b"><tr>
              <th className="px-4 py-3 text-left text-gray-500 font-medium">N°</th>
              <th className="px-4 py-3 text-left text-gray-500 font-medium">Client</th>
              <th className="px-4 py-3 text-left text-gray-500 font-medium">Date</th>
              <th className="px-4 py-3 text-left text-gray-500 font-medium">Montant TTC</th>
              <th className="px-4 py-3 text-left text-gray-500 font-medium">Statut</th>
              <th className="px-4 py-3"></th>
            </tr></thead>
            <tbody>
              {docs.map(d => {
                const client = clients.find(c => c.id === d.clientId);
                const { ttc } = calcTotal(d.lignes);
                const statusColors: Record<string,string> = { brouillon:"bg-gray-100 text-gray-700", envoyé:"bg-blue-100 text-blue-700", payé:"bg-green-100 text-green-700", annulé:"bg-red-100 text-red-700", "en retard":"bg-orange-100 text-orange-700" };
                return (
                  <tr key={d.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs">{d.numero}</td>
                    <td className="px-4 py-3">{client?.nom||"—"}</td>
                    <td className="px-4 py-3 text-gray-600">{d.date}</td>
                    <td className="px-4 py-3 font-semibold">{formatMontant(ttc, d.devise)}</td>
                    <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs ${statusColors[d.status]||""}`}>{d.status}</span></td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 justify-end">
                        <button onClick={() => setEditing(d)} className="text-blue-600 hover:text-blue-800 p-1"><Edit3 size={14}/></button>
                        {type==="facture" && d.status!=="payé" && <button onClick={() => setShowPay(d)} className="text-green-600 hover:text-green-800 p-1 text-xs bg-green-50 rounded px-2">💰 Payé</button>}
                        <button onClick={() => sendWhatsApp(d)} className="text-green-600 hover:text-green-800 p-1 bg-green-50 rounded px-1.5 text-xs" title="Télécharger PDF + ouvrir WhatsApp">📱+PDF</button>
                        <button
                          onClick={() => {
                            sendByEmail(d, clients.find(c=>c.id===d.clientId), settings||store.settings());
                          }}
                          className="text-blue-600 hover:text-blue-800 p-1 bg-blue-50 rounded px-1.5 text-xs disabled:opacity-50"
                          title="Envoyer par email">
                          {sendingEmail === d.id ? "⏳" : "✉️"} Email
                        </button>
                        <button onClick={() => downloadPDF(d, clients.find(c=>c.id===d.clientId), settings||store.settings())} className="text-purple-600 hover:text-purple-800 p-1" title="Télécharger PDF"><Download size={14}/></button>
                        <button onClick={() => generatePDF(d, clients.find(c=>c.id===d.clientId), settings||store.settings())} className="text-blue-600 hover:text-blue-800 p-1" title="Aperçu PDF"><FileText size={14}/></button>
                        <button onClick={() => deleteDoc(d.id)} className="text-red-500 hover:text-red-700 p-1"><Trash2 size={14}/></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ─── DOC EDITOR ───────────────────────────────────────────────────────────────
function DocEditor({ doc, clients, articles, onSave, onCancel, onNewClient }: { doc: Document; clients: Client[]; articles: Article[]; onSave: (d: Document) => void; onCancel: () => void; onNewClient?: (c: Client) => void }) {
  const [d, setD] = useState<Document>(doc);

  function addLigne() {
    const art = articles[0];
    setD(x => ({ ...x, lignes: [...x.lignes, { articleId: art?.id||"", description: art?.nom||"", quantite:1, prixUnitaire: art?.prix||0, taxe: art?.taxe||0 }] }));
  }

  function updateLigne(i: number, patch: Partial<LigneDoc>) {
    setD(x => { const l = [...x.lignes]; l[i] = {...l[i],...patch}; return {...x,lignes:l}; });
  }

  function removeLigne(i: number) {
    setD(x => ({ ...x, lignes: x.lignes.filter((_,j) => j !== i) }));
  }

  function selectArticle(i: number, artId: string) {
    const art = articles.find(a => a.id === artId);
    if (art) updateLigne(i, { articleId: artId, description: art.nom, prixUnitaire: art.prix, taxe: art.taxe });
  }

  const { ht, tva, ttc } = calcTotal(d.lignes);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">{d.id ? "Modifier" : "Créer"} — {d.numero}</h2>
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Client *</label>
          <div className="flex gap-2">
            <select value={d.clientId} onChange={e => setD(x=>({...x,clientId:e.target.value}))}
              className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">— Sélectionner —</option>
              {clients.map(c => <option key={c.id} value={c.id}>{c.nom}</option>)}
            </select>
            {onNewClient && (
              <button type="button" onClick={() => {
                const nom = prompt("Nom du nouveau client :");
                if (!nom) return;
                const tel = prompt("Téléphone :") || "";
                const email = prompt("Email :") || "";
                const nc: Client = { id: genId(), nom, email, telephone: tel, adresse:"", type:"entreprise", devise:"DJF", createdAt: new Date().toLocaleDateString("fr-FR") };
                onNewClient(nc);
                setD(x => ({...x, clientId: nc.id}));
              }} className="bg-green-600 text-white px-3 py-2 rounded-xl text-xs hover:bg-green-700 transition whitespace-nowrap">
                + Nouveau
              </button>
            )}
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Date</label>
          <input type="date" value={d.date} onChange={e => setD(x=>({...x,date:e.target.value}))}
            className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Échéance</label>
          <input type="date" value={d.dateEcheance} onChange={e => setD(x=>({...x,dateEcheance:e.target.value}))}
            className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Devise</label>
          <select value={d.devise} onChange={e => setD(x=>({...x,devise:e.target.value as Currency}))}
            className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="DJF">DJF</option><option value="USD">USD ($)</option><option value="EUR">EUR (€)</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Statut</label>
          <select value={d.status} onChange={e => setD(x=>({...x,status:e.target.value as any}))}
            className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            {["brouillon","envoyé","payé","annulé","en retard"].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        {d.type === "recurrente" && (
          <>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Fréquence</label>
              <select value={d.frequence} onChange={e => setD(x=>({...x,frequence:e.target.value as any}))}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="mensuelle">Mensuelle</option><option value="trimestrielle">Trimestrielle</option><option value="annuelle">Annuelle</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">📅 Jour d'envoi automatique (1–31)</label>
              <input type="number" min="1" max="31" value={d.jourEnvoi||1}
                onChange={e => setD(x=>({...x, jourEnvoi: Math.min(31, Math.max(1, +e.target.value))}))}
                placeholder="Ex: 1 = le 1er de chaque mois"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <p className="text-xs text-gray-400 mt-1">La facture sera surlignée automatiquement le jour choisi</p>
            </div>
          </>
        )}
      </div>

      {/* Lignes */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-gray-900">Articles / Services</h3>
          <button onClick={addLigne} disabled={articles.length===0} className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1 disabled:opacity-40">
            <PlusCircle size={14}/> Ajouter une ligne
          </button>
        </div>
        {articles.length===0 && <p className="text-orange-500 text-xs mb-2">⚠️ Ajoutez d'abord des articles dans l'onglet "Articles"</p>}
        <div className="space-y-2">
          {d.lignes.map((l, i) => (
            <div key={i} className="grid grid-cols-12 gap-2 items-center bg-gray-50 rounded-xl p-3">
              <div className="col-span-4">
                <select value={l.articleId} onChange={e => selectArticle(i, e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none">
                  {articles.map(a => <option key={a.id} value={a.id}>{a.nom}</option>)}
                </select>
              </div>
              <input placeholder="Description" value={l.description} onChange={e => updateLigne(i,{description:e.target.value})}
                className="col-span-3 border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none" />
              <input type="number" placeholder="Qté" value={l.quantite} onChange={e => updateLigne(i,{quantite:+e.target.value})}
                className="col-span-1 border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none" />
              <input type="number" placeholder="PU" value={l.prixUnitaire} onChange={e => updateLigne(i,{prixUnitaire:+e.target.value})}
                className="col-span-2 border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none" />
              <div className="col-span-1 text-xs text-right font-semibold text-gray-700">
                {(l.quantite*l.prixUnitaire).toLocaleString("fr-FR")}
              </div>
              <button onClick={() => removeLigne(i)} className="col-span-1 text-red-400 hover:text-red-600 flex justify-center"><Trash2 size={14}/></button>
            </div>
          ))}
        </div>
      </div>

      {/* Totaux */}
      <div className="bg-gray-50 rounded-xl p-4 mb-4 ml-auto max-w-xs">
        <div className="flex justify-between text-sm text-gray-600 mb-1"><span>Sous-total HT</span><span>{formatMontant(ht, d.devise)}</span></div>
        <div className="flex justify-between text-sm text-gray-600 mb-1"><span>TVA</span><span>{formatMontant(tva, d.devise)}</span></div>
        <div className="flex justify-between text-base font-bold text-gray-900 border-t pt-2"><span>Total TTC</span><span>{formatMontant(ttc, d.devise)}</span></div>
      </div>

      <textarea placeholder="Notes / conditions..." value={d.notes} onChange={e => setD(x=>({...x,notes:e.target.value}))} rows={2}
        className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-4" />

      <div className="flex gap-3">
        <button onClick={() => onSave(d)} className="bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-800 transition flex items-center gap-2">
          <CheckCircle size={16}/> Enregistrer
        </button>
        <button onClick={onCancel} className="border border-gray-300 text-gray-600 px-6 py-2.5 rounded-xl hover:bg-gray-50 transition">Annuler</button>
      </div>
    </div>
  );
}

// ─── PAY MODAL ────────────────────────────────────────────────────────────────
function PayModal({ doc, onSave, onClose }: { doc: Document; onSave: (d: Document) => void; onClose: () => void }) {
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [montant, setMontant] = useState(calcTotal(doc.lignes).ttc);
  const [methode, setMethode] = useState<PaymentMethod>("Virement");
  const [ref, setRef] = useState("");

  function confirm() {
    const updated: Document = {
      ...doc,
      status: "payé",
      paiements: [...doc.paiements, { id: genId(), date, montant, methode, reference: ref }],
    };
    onSave(updated);
  }

  const METHODES: PaymentMethod[] = ["Espèces","Virement","Chèque","Mobile Money","Carte bancaire","Autre"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900">Enregistrer un paiement</h3>
          <button onClick={onClose}><X size={20} className="text-gray-400"/></button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Date du paiement</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Montant reçu</label>
            <input type="number" value={montant} onChange={e => setMontant(+e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Mode de paiement</label>
            <select value={methode} onChange={e => setMethode(e.target.value as PaymentMethod)}
              className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              {METHODES.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Référence (optionnel)</label>
            <input value={ref} onChange={e => setRef(e.target.value)} placeholder="N° chèque, référence virement..."
              className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={confirm} className="flex-1 bg-green-600 text-white py-2.5 rounded-xl font-semibold hover:bg-green-700 transition">
            ✅ Confirmer le paiement
          </button>
          <button onClick={onClose} className="border border-gray-300 text-gray-600 px-5 py-2.5 rounded-xl hover:bg-gray-50 transition">Annuler</button>
        </div>
      </div>
    </div>
  );
}

// ─── RÉCURRENTES TAB ─────────────────────────────────────────────────────────
function RecurrentesTab({ docs, allDocs, saveDocs, clients, articles }: {
  docs: Document[]; allDocs: Document[]; saveDocs: (v: Document[]) => void;
  clients: Client[]; articles: Article[];
}) {
  const [editing, setEditing] = useState<Document|null>(null);
  const [filterClient, setFilterClient] = useState("");
  const [filterMois, setFilterMois] = useState("");

  function newDoc(): Document {
    const num = `REC-${new Date().getFullYear()}-${String(allDocs.filter(d=>d.type==="recurrente").length+1).padStart(3,"0")}`;
    return { id: genId(), numero: num, type:"recurrente", clientId:"", date: new Date().toISOString().slice(0,10), dateEcheance:"", lignes:[], devise:"DJF", status:"envoyé", notes:"", paiements:[], frequence:"mensuelle", jourEnvoi:1, prochainEnvoi: new Date().toISOString().slice(0,10) };
  }

  function saveDoc(doc: Document) {
    const exists = allDocs.find(d => d.id === doc.id);
    if (exists) saveDocs(allDocs.map(d => d.id === doc.id ? doc : d));
    else saveDocs([...allDocs, doc]);
    setEditing(null);
  }

  function sendWhatsApp(doc: Document) {
    const client = clients.find(c => c.id === doc.clientId);
    if (!client?.telephone) return alert("Numéro WhatsApp manquant");
    const tel = client.telephone.replace(/\D/g,"");
    const msg = encodeURIComponent(`Bonjour ${client.nom},\nVoici votre facture récurrente N° ${doc.numero} d'un montant de ${formatMontant(calcTotal(doc.lignes).ttc, doc.devise)}.\nMerci.\nDjibouti Telematics Solutions`);
    window.open(`https://wa.me/${tel}?text=${msg}`, "_blank");
    saveDocs(allDocs.map(d => d.id === doc.id ? {...d, dernierEnvoi: new Date().toISOString().slice(0,10)} : d));
  }

  function calcProchain(doc: Document): string {
    if (!doc.jourEnvoi) return "—";
    const now = new Date();
    const jour = doc.jourEnvoi;
    let next = new Date(now.getFullYear(), now.getMonth(), jour);
    if (next <= now) {
      if (doc.frequence === "mensuelle") next = new Date(now.getFullYear(), now.getMonth()+1, jour);
      else if (doc.frequence === "trimestrielle") next = new Date(now.getFullYear(), now.getMonth()+3, jour);
      else next = new Date(now.getFullYear()+1, now.getMonth(), jour);
    }
    return next.toLocaleDateString("fr-FR");
  }

  const MOIS = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];

  const filtered = docs.filter(d => {
    const matchClient = !filterClient || d.clientId === filterClient;
    const matchMois = !filterMois || (d.prochainEnvoi && new Date(d.prochainEnvoi).getMonth() === parseInt(filterMois));
    return matchClient && matchMois;
  });

  if (editing) return <DocEditor doc={editing} clients={clients} articles={articles}
    onSave={saveDoc} onCancel={() => setEditing(null)} />;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Factures Récurrentes ({docs.length})</h2>
        <button onClick={() => setEditing(newDoc())}
          className="bg-blue-700 text-white px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:bg-blue-800 transition">
          <PlusCircle size={16} /> Nouvelle récurrente
        </button>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-4 flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-500 whitespace-nowrap">Filtrer par client :</label>
          <select value={filterClient} onChange={e => setFilterClient(e.target.value)}
            className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Tous les clients</option>
            {clients.map(c => <option key={c.id} value={c.id}>{c.nom}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-500 whitespace-nowrap">Filtrer par mois :</label>
          <select value={filterMois} onChange={e => setFilterMois(e.target.value)}
            className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Tous les mois</option>
            {MOIS.map((m,i) => <option key={i} value={i}>{m}</option>)}
          </select>
        </div>
        {(filterClient||filterMois) && (
          <button onClick={() => { setFilterClient(""); setFilterMois(""); }}
            className="text-sm text-red-500 hover:text-red-700">✕ Réinitialiser</button>
        )}
        <span className="ml-auto text-sm text-gray-400">{filtered.length} résultat(s)</span>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {filtered.length === 0 ? <p className="p-6 text-gray-400 text-sm">Aucune facture récurrente</p> : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b"><tr>
              <th className="px-4 py-3 text-left text-gray-500 font-medium">N°</th>
              <th className="px-4 py-3 text-left text-gray-500 font-medium">Client</th>
              <th className="px-4 py-3 text-left text-gray-500 font-medium">Fréquence</th>
              <th className="px-4 py-3 text-left text-gray-500 font-medium">Jour d'envoi</th>
              <th className="px-4 py-3 text-left text-gray-500 font-medium">Prochain envoi</th>
              <th className="px-4 py-3 text-left text-gray-500 font-medium">Dernier envoi</th>
              <th className="px-4 py-3 text-left text-gray-500 font-medium">Montant TTC</th>
              <th className="px-4 py-3"></th>
            </tr></thead>
            <tbody>
              {filtered.map(d => {
                const client = clients.find(c => c.id === d.clientId);
                const { ttc } = calcTotal(d.lignes);
                const prochain = calcProchain(d);
                const isDue = d.jourEnvoi === new Date().getDate();
                return (
                  <tr key={d.id} className={`border-b last:border-0 hover:bg-gray-50 ${isDue ? "bg-orange-50" : ""}`}>
                    <td className="px-4 py-3 font-mono text-xs">{d.numero}</td>
                    <td className="px-4 py-3 font-medium">{client?.nom||"—"}</td>
                    <td className="px-4 py-3">
                      <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs">{d.frequence||"mensuelle"}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-blue-700">Le {d.jourEnvoi || "?"}</span>
                        {isDue && <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">Aujourd'hui !</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{prochain}</td>
                    <td className="px-4 py-3 text-gray-400 text-xs">{d.dernierEnvoi ? new Date(d.dernierEnvoi).toLocaleDateString("fr-FR") : "Jamais"}</td>
                    <td className="px-4 py-3 font-semibold">{formatMontant(ttc, d.devise)}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 justify-end">
                        <button onClick={() => setEditing(d)} className="text-blue-600 hover:text-blue-800 p-1"><Edit3 size={14}/></button>
                        <button onClick={() => sendWhatsApp(d)} className="text-green-600 hover:text-green-800 p-1 bg-green-50 rounded px-1.5 text-xs" title="WhatsApp + PDF">📱+PDF</button>
                        <button onClick={() => {
                            sendByEmail(d, clients.find(c=>c.id===d.clientId), store.settings());
                          }}
                          className="text-blue-600 hover:text-blue-800 p-1 bg-blue-50 rounded px-1.5 text-xs" title="Envoyer par email">
                          ✉️ Email
                        </button>
                        <button onClick={() => saveDocs(allDocs.filter(x => x.id !== d.id))} className="text-red-500 hover:text-red-700 p-1"><Trash2 size={14}/></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Rappel automatique */}
      <div className="mt-4 bg-blue-50 border border-blue-200 rounded-2xl p-4 text-sm text-blue-700">
        <strong>💡 Envoi automatique :</strong> Les factures dont le <strong>jour d'envoi</strong> correspond à la date du jour sont surlignées en orange.
        Cliquez sur 📱 WA pour envoyer directement par WhatsApp au client. L'envoi par email est déclenché depuis l'espace admin.
      </div>
    </div>
  );
}
