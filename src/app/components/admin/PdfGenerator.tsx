import emailjs from "@emailjs/browser";
import { type Document, type Client, type CompanySettings, formatMontant, calcTotal } from "./AdminTypes";

const EMAILJS_SERVICE_ID = "service_5uqkzo7";
const EMAILJS_TEMPLATE_ID = "template_wpxtf9q";
const EMAILJS_PUBLIC_KEY  = "HdOknBy6C1NQ-mTbp";

const LABELS: Record<string, string> = { facture:"FACTURE", devis:"DEVIS", avoir:"AVOIR", recurrente:"FACTURE RÉCURRENTE" };

function buildHTML(doc: Document, client: Client | undefined, s: CompanySettings): string {
  const { ht, tva, ttc } = calcTotal(doc.lignes);
  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8"/>
<title>${LABELS[doc.type]||"DOCUMENT"} ${doc.numero}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:Arial,sans-serif;font-size:12px;color:#1a1a1a;padding:40px;}
.header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:40px;padding-bottom:20px;border-bottom:3px solid #1d4ed8;}
.logo{max-height:80px;max-width:200px;object-fit:contain;}
.company{text-align:right;}.company h1{font-size:18px;color:#1d4ed8;margin-bottom:4px;}.company p{color:#666;font-size:11px;line-height:1.6;}
.doc-title{background:#1d4ed8;color:white;text-align:center;padding:12px;font-size:20px;font-weight:bold;letter-spacing:2px;margin-bottom:30px;border-radius:4px;}
.meta{display:flex;justify-content:space-between;margin-bottom:30px;}
.meta-block{background:#f8fafc;padding:16px;border-radius:8px;width:48%;}
.meta-block h3{font-size:10px;text-transform:uppercase;color:#666;margin-bottom:8px;}
.meta-block strong{color:#1d4ed8;font-size:14px;display:block;margin-bottom:4px;}
.dates{display:flex;gap:20px;margin-bottom:30px;}
.date-item{background:#f0f4ff;padding:10px 16px;border-radius:6px;border-left:4px solid #1d4ed8;}
.date-item span{display:block;font-size:10px;color:#666;margin-bottom:2px;}
table{width:100%;border-collapse:collapse;margin-bottom:20px;}
thead th{background:#1d4ed8;color:white;padding:10px 12px;text-align:left;font-size:11px;}
tbody tr:nth-child(even){background:#f8fafc;}
tbody td{padding:10px 12px;border-bottom:1px solid #e5e7eb;}
.totaux{margin-left:auto;width:280px;}
.tot-line{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #e5e7eb;}
.tot-ttc{display:flex;justify-content:space-between;padding:10px 0;font-size:16px;font-weight:bold;color:#1d4ed8;border-top:2px solid #1d4ed8;}
.paiement{background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:16px;margin:20px 0;}
.footer{margin-top:40px;padding-top:16px;border-top:1px solid #e5e7eb;text-align:center;font-size:10px;color:#999;}
@media print{body{padding:20px;}}
</style></head><body>
<div class="header">
  ${s.logo?`<img src="${s.logo}" class="logo" alt="Logo"/>`:`<div style="font-size:22px;font-weight:bold;color:#1d4ed8;">${s.nom}</div>`}
  <div class="company"><h1>${s.nom}</h1><p>${s.adresse}<br/>Tél: ${s.telephone}<br/>Email: ${s.email}${s.siteWeb?`<br/>${s.siteWeb}`:""}</p></div>
</div>
<div class="doc-title">${LABELS[doc.type]||"DOCUMENT"} N° ${doc.numero}</div>
<div class="meta">
  <div class="meta-block"><h3>Émetteur</h3><strong>${s.nom}</strong><p>${s.adresse}<br/>${s.telephone}<br/>${s.email}</p></div>
  <div class="meta-block"><h3>Destinataire</h3><strong>${client?.nom||"—"}</strong><p>${client?.adresse||""}<br/>${client?.telephone||""}<br/>${client?.email||""}</p></div>
</div>
<div class="dates">
  <div class="date-item"><span>Date</span><strong>${doc.date}</strong></div>
  ${doc.dateEcheance?`<div class="date-item"><span>Échéance</span><strong>${doc.dateEcheance}</strong></div>`:""}
  ${doc.frequence?`<div class="date-item"><span>Fréquence</span><strong>${doc.frequence} — Le ${doc.jourEnvoi||"?"}</strong></div>`:""}
</div>
<table>
  <thead><tr>
    <th style="width:40%">Description</th>
    <th style="width:10%;text-align:center">Qté</th>
    <th style="width:15%;text-align:right">Prix HT</th>
    <th style="width:10%;text-align:center">Taxe</th>
    <th style="width:15%;text-align:right">Total HT</th>
    <th style="width:10%;text-align:right">TTC</th>
  </tr></thead>
  <tbody>
    ${doc.lignes.map(l=>`<tr>
      <td>${l.description}</td>
      <td style="text-align:center">${l.quantite}</td>
      <td style="text-align:right">${l.prixUnitaire.toLocaleString("fr-FR")}</td>
      <td style="text-align:center">${l.taxe}%</td>
      <td style="text-align:right">${(l.quantite*l.prixUnitaire).toLocaleString("fr-FR")}</td>
      <td style="text-align:right">${(l.quantite*l.prixUnitaire*(1+l.taxe/100)).toLocaleString("fr-FR")}</td>
    </tr>`).join("")}
  </tbody>
</table>
<div class="totaux">
  <div class="tot-line"><span>Sous-total HT</span><span>${formatMontant(ht,doc.devise)}</span></div>
  <div class="tot-line"><span>TVA</span><span>${formatMontant(tva,doc.devise)}</span></div>
  <div class="tot-ttc"><span>TOTAL TTC</span><span>${formatMontant(ttc,doc.devise)}</span></div>
</div>
${s.paymentMethods?.length?`<div class="paiement"><h3>💳 Modes de paiement</h3><p>${s.paymentMethods.join(" · ")}</p>${s.iban?`<p style="margin-top:6px;"><strong>IBAN :</strong> ${s.iban}</p>`:""}</div>`:""}
${doc.notes?`<div style="background:#fffbeb;border:1px solid #fcd34d;border-radius:8px;padding:16px;margin:20px 0;"><strong>Notes :</strong> ${doc.notes}</div>`:""}
<div class="footer">${s.mentionsLegales||""}<br/>${s.nom} — ${s.adresse} — ${s.email}</div>
</body></html>`;
}

/** Ouvre la fenêtre d'impression (aperçu + Enregistrer en PDF) */
export function generatePDF(doc: Document, client: Client | undefined, settings: CompanySettings) {
  const html = buildHTML(doc, client, settings);
  const win = window.open("", "_blank", "width=900,height=700");
  if (!win) return;
  win.document.write(html);
  win.document.close();
  win.onload = () => { win.focus(); win.print(); };
}

/** Télécharge le PDF via l'impression navigateur */
export function downloadPDF(doc: Document, client: Client | undefined, settings: CompanySettings) {
  const html = buildHTML(doc, client, settings);
  const iframe = document.createElement("iframe");
  Object.assign(iframe.style, { position:"fixed", right:"0", bottom:"0", width:"0", height:"0", border:"none" });
  document.body.appendChild(iframe);
  const idoc = iframe.contentWindow?.document;
  if (!idoc) { document.body.removeChild(iframe); return; }
  idoc.open(); idoc.write(html); idoc.close();
  setTimeout(() => {
    iframe.contentWindow?.print();
    setTimeout(() => { try { document.body.removeChild(iframe); } catch {} }, 2000);
  }, 600);
}

/** Télécharge le PDF puis ouvre WhatsApp */
export function sendViaWhatsApp(doc: Document, client: Client | undefined, settings: CompanySettings) {
  const { ttc } = calcTotal(doc.lignes);

  // 1. Déclencher le téléchargement PDF
  downloadPDF(doc, client, settings);

  // 2. Ouvrir WhatsApp avec message
  setTimeout(() => {
    if (!client?.telephone) {
      alert("Numéro de téléphone manquant pour ce client.");
      return;
    }
    const tel = client.telephone.replace(/\D/g, "");
    const typeDoc = LABELS[doc.type] || "Document";
    const msg = encodeURIComponent(
      `Bonjour ${client.nom},\n\n` +
      `Veuillez trouver en pièce jointe votre ${typeDoc} N° ${doc.numero} d'un montant de ${formatMontant(ttc, doc.devise)}.\n\n` +
      `📎 Le PDF a été téléchargé sur votre appareil. Vous pouvez l'envoyer directement depuis WhatsApp en cliquant sur le trombone 📎.\n\n` +
      `Cordialement,\n${settings.nom}\n${settings.telephone}`
    );
    window.open(`https://wa.me/${tel}?text=${msg}`, "_blank");
  }, 800);
}

/** Ouvre le client email (Gmail/Outlook) avec la facture pré-remplie */
export function sendByEmail(doc: Document, client: Client | undefined, settings: CompanySettings): boolean {
  if (!client?.email) {
    alert("Aucun email renseigné pour ce client.");
    return false;
  }

  const { ht, tva, ttc } = calcTotal(doc.lignes);
  const typeDoc = LABELS[doc.type] || "Document";

  const lignesText = doc.lignes.map(l =>
    `• ${l.description} × ${l.quantite} = ${formatMontant(l.quantite * l.prixUnitaire, doc.devise)} HT`
  ).join("\n");

  const sujet = encodeURIComponent(
    `${typeDoc} N° ${doc.numero} — ${formatMontant(ttc, doc.devise)} — ${settings.nom}`
  );

  const corps = encodeURIComponent(`Bonjour ${client.nom},

Veuillez trouver ci-dessous votre ${typeDoc} N° ${doc.numero} :

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${lignesText}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sous-total HT : ${formatMontant(ht, doc.devise)}
TVA           : ${formatMontant(tva, doc.devise)}
TOTAL TTC     : ${formatMontant(ttc, doc.devise)}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Date     : ${doc.date}${doc.dateEcheance ? `\nÉchéance : ${doc.dateEcheance}` : ""}${doc.frequence ? `\nFréquence : ${doc.frequence} — Le ${doc.jourEnvoi || "?"}` : ""}

${settings.paymentMethods?.length ? `Modes de paiement : ${settings.paymentMethods.join(", ")}` : ""}${settings.iban ? `\nIBAN : ${settings.iban}` : ""}

${doc.notes ? `Notes : ${doc.notes}\n` : ""}${settings.mentionsLegales ? `\n${settings.mentionsLegales}` : ""}

Cordialement,
${settings.nom}
${settings.adresse}
Tél : ${settings.telephone}
Email : ${settings.email}${settings.siteWeb ? `\n${settings.siteWeb}` : ""}`);

  // Ouvre le client email natif (Gmail, Outlook, Apple Mail...)
  window.location.href = `mailto:${client.email}?subject=${sujet}&body=${corps}`;

  // Notifier DTS via EmailJS (copie admin)
  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    subject: `[COPIE] ${typeDoc} N° ${doc.numero} envoyé à ${client.email}`,
    name: client.nom,
    email: settings.email,
    phone: client.telephone || "N/A",
    message: `Document envoyé à ${client.email} (${client.nom})\n\nMontant TTC : ${formatMontant(ttc, doc.devise)}\nDate : ${new Date().toLocaleString("fr-FR")}`,
    comment: `Envoi ${typeDoc} par email depuis Espace Admin`,
    date: new Date().toLocaleDateString("fr-FR"),
    time: new Date().toLocaleTimeString("fr-FR"),
    to_email: settings.email,
  }, EMAILJS_PUBLIC_KEY).catch(() => {});

  return true;
}
