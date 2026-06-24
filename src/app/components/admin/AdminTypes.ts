export type Currency = "DJF" | "USD" | "EUR";
export type PaymentMethod = string;

export interface CompanySettings {
  nom: string;
  logo: string; // base64
  adresse: string;
  telephone: string;
  email: string;
  siteWeb: string;
  iban: string;
  siret: string;
  devise: Currency;
  paymentMethods: string[];
  mentionsLegales: string;
}
export type DocStatus = "brouillon" | "envoyé" | "payé" | "annulé" | "en retard";

export interface Article {
  id: string;
  nom: string;
  description: string;
  prix: number;
  unite: string;
  taxe: number; // %
}

export interface Client {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  type: "particulier" | "entreprise";
  devise: Currency;
  createdAt: string;
}

export interface Fournisseur {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  contact: string;
}

export interface LigneDoc {
  articleId: string;
  description: string;
  quantite: number;
  prixUnitaire: number;
  taxe: number;
}

export interface Document {
  id: string;
  numero: string;
  type: "devis" | "facture" | "avoir" | "recurrente";
  clientId: string;
  date: string;
  dateEcheance: string;
  lignes: LigneDoc[];
  devise: Currency;
  status: DocStatus;
  notes: string;
  paiements: Paiement[];
  // Pour récurrentes
  frequence?: "mensuelle" | "trimestrielle" | "annuelle";
  jourEnvoi?: number;       // jour du mois (1-31)
  prochainEnvoi?: string;   // date ISO du prochain envoi calculé
  dernierEnvoi?: string;    // date ISO du dernier envoi
}

export interface Paiement {
  id: string;
  date: string;
  montant: number;
  methode: PaymentMethod;
  reference: string;
}

export function genId() { return Date.now().toString(36) + Math.random().toString(36).slice(2); }

export function formatMontant(montant: number, devise: Currency) {
  const fmt = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });
  const symbols: Record<Currency, string> = { DJF: "DJF", USD: "$", EUR: "€" };
  if (devise === "USD") return `$${fmt.format(montant)}`;
  if (devise === "EUR") return `${fmt.format(montant)} €`;
  return `${fmt.format(montant)} DJF`;
}

export function calcTotal(lignes: LigneDoc[]) {
  const ht = lignes.reduce((s, l) => s + l.quantite * l.prixUnitaire, 0);
  const tva = lignes.reduce((s, l) => s + l.quantite * l.prixUnitaire * (l.taxe / 100), 0);
  return { ht, tva, ttc: ht + tva };
}

function load<T>(key: string, def: T): T {
  try { const v = localStorage.getItem("dts_admin_" + key); return v ? JSON.parse(v) : def; } catch { return def; }
}
function save(key: string, val: unknown) {
  localStorage.setItem("dts_admin_" + key, JSON.stringify(val));
}

const DEFAULT_SETTINGS: CompanySettings = {
  nom: "Djibouti Telematics Solutions",
  logo: "",
  adresse: "Regus - Djibouti, Salaam Tower, Bureau DTSYSTEMS",
  telephone: "+253 77 80 32 32",
  email: "dts@djiboutigps.com",
  siteWeb: "www.djiboutigps.com",
  iban: "",
  siret: "",
  devise: "DJF",
  paymentMethods: ["Espèces","Virement bancaire","Chèque","Mobile Money (Waafi/Kaah)","Carte bancaire","Autre"],
  mentionsLegales: "Paiement à réception de facture. Tout retard de paiement entraîne des pénalités.",
};

export const store = {
  clients: () => load<Client[]>("clients", []),
  saveClients: (v: Client[]) => save("clients", v),
  fournisseurs: () => load<Fournisseur[]>("fournisseurs", []),
  saveFournisseurs: (v: Fournisseur[]) => save("fournisseurs", v),
  articles: () => load<Article[]>("articles", []),
  saveArticles: (v: Article[]) => save("articles", v),
  documents: () => load<Document[]>("documents", []),
  saveDocuments: (v: Document[]) => save("documents", v),
  settings: () => load<CompanySettings>("settings", DEFAULT_SETTINGS),
  saveSettings: (v: CompanySettings) => save("settings", v),
};
