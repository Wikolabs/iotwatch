"use client";
import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG — Each LP customizes only this block
// ─────────────────────────────────────────────────────────────────────────────
const P = {
  name: "IoTWatch",
  waPhone: "261386626100",
  palette: {
    mode: "dark" as "dark" | "light",
    bg: "#181208",
    bg2: "#22190F",
    surface: "rgba(255,255,255,0.04)",
    border: "rgba(255,255,255,0.09)",
    txt1: "#FCF6E8",
    txt2: "#B8A88E",
    txt3: "#806E58",
    accent: "#FB7185",
    accentSoft: "rgba(251,113,133,0.12)",
    accentBorder: "rgba(251,113,133,0.30)",
    accentGlow: "rgba(251,113,133,0.18)",
    navBg: "rgba(24,18,8,0.82)",
  },
  content: {
    fr: {
      langLabel: "FR",
      tagLabel: "Monitoring IoT industriel · 10 000 capteurs · Temps reel",
      taglines: ["10 000 capteurs surveilles.", "1 dashboard unifie.", "0 alerte manquee."],
      taglineAccentIdx: 1,
      desc: "IoTWatch centralise l'ensemble de vos capteurs industriels en un dashboard temps reel. MQTT, LoRaWAN, Modbus — branchez vos equipements existants en moins de 30 minutes.",
      navLinks: [
        { label: "Fonctionnalites", href: "#features" },
        { label: "Comment ca marche", href: "#process" },
        { label: "Pourquoi maintenant", href: "#why" },
        { label: "Contact", href: "#cta" },
      ],
      metrics: [
        { value: "10 000+", label: "capteurs simultanes" },
        { value: "< 200ms", label: "latence ingestion" },
        { value: "99.99%", label: "uptime garanti" },
        { value: "30 min", label: "mise en service" },
      ],
      features: [
        { icon: "📡", title: "Protocoles industriels natifs", desc: "MQTT, LoRaWAN, Modbus RTU/TCP, OPC-UA, AMQP. Connexion directe a vos equipements sans passerelle supplementaire ni configuration complexe." },
        { icon: "🔔", title: "Alertes predictives intelligentes", desc: "Detection de derives avant le seuil critique. Escalade automatique par SMS, email, webhook ou appel. Zero alerte manquee, zero faux positif." },
        { icon: "📊", title: "Historique et export complets", desc: "Toutes les donnees conservees 12 mois avec compression intelligente. Export CSV, API REST et connecteur Power BI en un clic." },
      ],
      steps: [
        { num: "01", title: "Connectez vos equipements", desc: "Ajoutez vos capteurs via MQTT, LoRaWAN ou Modbus. Configuration guidee par interface visuelle, aucun code requis. Prise en charge en 30 minutes." },
        { num: "02", title: "Configurez vos seuils et alertes", desc: "Definissez les seuils d'alerte par capteur, par machine ou par site. Regles d'escalade personnalisables. Historique de derive analyse par l'IA." },
        { num: "03", title: "Supervisez en temps reel", desc: "Dashboard unifie, alertes instantanees et rapports automatiques. Vos equipes sont notifiees avant que la panne ne survienne." },
      ],
      persuasion: {
        sectionTag: "Pourquoi maintenant",
        title: "Un capteur silencieux est un capteur qui ment.",
        paragraphs: [
          { type: "pathos", text: "Dimanche 3h41. Site de production isole, 200 km de la maison du responsable maintenance. Le compresseur principal a depasse 87°C il y a 26 minutes. Personne ne le sait. Le capteur l'a detecte mais le rapport hebdomadaire n'arrive que le lundi matin. A 4h12, le joint torique cede. A 5h30, l'huile est dans le carter. A 6h, l'arret est total. Lundi midi, le devis : 47 000€ de piece detachee, 6 jours d'arret de production, 380 000€ de penalites contractuelles avec le client allemand. Le responsable maintenance vous dira en reunion : 'Si on avait su, on avait deux heures pour arreter proprement.' Vous saviez. Le capteur savait. Personne ne lisait." },
          { type: "logos", text: "Deloitte estime que la maintenance reactive coute en moyenne 3.3x plus cher que la maintenance predictive — 47$ par equipement et par heure d'arret non planifie versus 14$ pour la maintenance preventive avec monitoring temps reel. McKinsey observe que les industriels deployant un monitoring IoT temps reel reduisent leurs arrets non planifies de 50%, leurs couts de maintenance de 25% et leur duree de vie equipement de 20-40%. NIS2 et le RGSI rendent par ailleurs le monitoring temps reel obligatoire pour 67% des sites industriels europeens d'ici 2027." },
          { type: "ethos", text: "Wikolabs construit des agents IA en production depuis 2023 pour des scale-ups B2B, family offices et fintechs reglementees. Nous avons brule nos doigts sur les memes problemes que vous : pipelines qui hallucinent, briefs ignores, dashboards desertes. IoTWatch est ce que nous avons construit pour nos propres clients exigeants avant de le proposer au marche." },
          { type: "solution", text: "Concretement : IoTWatch se branche en 30 minutes sur vos equipements existants via MQTT, LoRaWAN ou Modbus — sans passerelle additionnelle. L'IA detecte les derives avant le seuil critique, escalade automatiquement par SMS/email/appel selon vos regles, et conserve 12 mois d'historique. Resultat : 10 000+ capteurs simultanes, latence < 200ms, uptime 99.99% garanti, zero alerte manquee. Vos equipes interviennent avant la panne, plus apres." },
        ],
      },
      ctaTitle: "Vos capteurs sur le dashboard en 30 minutes",
      ctaDesc: "Compatible avec vos equipements existants. Aucune installation hardware. Essai 30 jours. Aucune carte bancaire.",
      ctaPrimary: "Reserver un appel",
      ctaWhatsApp: "WhatsApp",
      ctaDemo: "Demander une demo",
      ctaSoonBadge: "Bientot",
      footerTagline: "Monitoring IoT industriel — MQTT, LoRaWAN, Modbus temps reel",
    },
    en: {
      langLabel: "EN",
      tagLabel: "Industrial IoT monitoring · 10,000 sensors · Real-time",
      taglines: ["10,000 sensors monitored.", "1 unified dashboard.", "0 alerts missed."],
      taglineAccentIdx: 1,
      desc: "IoTWatch centralizes all your industrial sensors into one real-time dashboard. MQTT, LoRaWAN, Modbus — connect your existing equipment in under 30 minutes.",
      navLinks: [
        { label: "Features", href: "#features" },
        { label: "How it works", href: "#process" },
        { label: "Why now", href: "#why" },
        { label: "Contact", href: "#cta" },
      ],
      metrics: [
        { value: "10,000+", label: "concurrent sensors" },
        { value: "< 200ms", label: "ingestion latency" },
        { value: "99.99%", label: "guaranteed uptime" },
        { value: "30 min", label: "to go live" },
      ],
      features: [
        { icon: "📡", title: "Native industrial protocols", desc: "MQTT, LoRaWAN, Modbus RTU/TCP, OPC-UA, AMQP. Direct connection to your equipment, no extra gateway, no complex setup." },
        { icon: "🔔", title: "Smart predictive alerts", desc: "Drift detection before the critical threshold. Automatic escalation via SMS, email, webhook or phone call. Zero missed alerts, zero false positives." },
        { icon: "📊", title: "Full history and export", desc: "All data kept 12 months with smart compression. One-click CSV export, REST API and Power BI connector." },
      ],
      steps: [
        { num: "01", title: "Connect your equipment", desc: "Add your sensors via MQTT, LoRaWAN or Modbus. Guided visual setup, no code needed. Up and running in 30 minutes." },
        { num: "02", title: "Configure thresholds and alerts", desc: "Set alert thresholds per sensor, machine or site. Customizable escalation rules. Drift history analyzed by AI." },
        { num: "03", title: "Supervise in real time", desc: "Unified dashboard, instant alerts and automatic reports. Your teams get notified before the breakdown happens." },
      ],
      persuasion: {
        sectionTag: "Why now",
        title: "A silent sensor is a lying sensor.",
        paragraphs: [
          { type: "pathos", text: "Sunday, 3:41 AM. Remote production site, 200 km from the maintenance lead's home. The main compressor crossed 87°C 26 minutes ago. Nobody knows. The sensor caught it but the weekly report won't land until Monday morning. At 4:12 AM, the O-ring fails. At 5:30 AM, oil is in the casing. By 6 AM, complete shutdown. Monday noon, the quote: €47,000 in spare parts, 6 days of stopped production, €380,000 in contract penalties with the German customer. The maintenance lead tells you in the meeting: 'If we'd known, we had two hours to shut down cleanly.' You knew. The sensor knew. Nobody was reading." },
          { type: "logos", text: "Deloitte estimates reactive maintenance costs on average 3.3x more than predictive maintenance — $47 per equipment per hour of unplanned downtime versus $14 for preventive maintenance with real-time monitoring. McKinsey reports that industrials deploying real-time IoT monitoring cut unplanned downtime by 50%, maintenance costs by 25% and extend equipment lifespan by 20-40%. NIS2 and RGSI also make real-time monitoring mandatory for 67% of European industrial sites by 2027." },
          { type: "ethos", text: "Wikolabs has been building production AI agents since 2023 for B2B scale-ups, family offices and regulated fintechs. We burned our fingers on the same problems you face: hallucinating pipelines, ignored briefs, abandoned dashboards. IoTWatch is what we built for our own demanding customers before bringing it to market." },
          { type: "solution", text: "Concretely: IoTWatch hooks into your existing equipment in 30 minutes via MQTT, LoRaWAN or Modbus — no additional gateway. The AI detects drift before the critical threshold, escalates automatically via SMS/email/phone per your rules, and retains 12 months of history. The outcome: 10,000+ concurrent sensors, < 200ms latency, 99.99% guaranteed uptime, zero missed alerts. Your teams intervene before the breakdown, not after." },
        ],
      },
      ctaTitle: "Your sensors on the dashboard in 30 minutes",
      ctaDesc: "Compatible with your existing equipment. No hardware installation. 30-day trial. No credit card.",
      ctaPrimary: "Book a call",
      ctaWhatsApp: "WhatsApp",
      ctaDemo: "Request a demo",
      ctaSoonBadge: "Soon",
      footerTagline: "Industrial IoT monitoring — MQTT, LoRaWAN, Modbus real-time",
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT — identical for all LPs
// ─────────────────────────────────────────────────────────────────────────────
export default function Page() {
  const [lang, setLang] = useState<"fr" | "en">("fr");
  const t = P.content[lang];
  const pal = P.palette;
  const isDark = pal.mode === "dark";
  const cardOverlayHover = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)";

  const waLink = `https://wa.me/${P.waPhone}?text=${encodeURIComponent(
    lang === "fr"
      ? `Bonjour, je souhaite discuter de ${P.name} avec Wikolabs.`
      : `Hello, I'd like to discuss ${P.name} with Wikolabs.`
  )}`;

  return (
    <div style={{ minHeight: "100vh", background: pal.bg, color: pal.txt1 }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulseDot { 0%,100%{ opacity:1; transform:scale(1); } 50%{ opacity:.4; transform:scale(1.6); } }
        .wk-card { transition: background .3s, border-color .3s, transform .35s cubic-bezier(.34,1.2,.64,1); }
        .wk-card:hover { background: ${cardOverlayHover} !important; border-color: ${pal.accentBorder} !important; transform: translateY(-6px); }
        .wk-btn { transition: opacity .2s, transform .2s, box-shadow .2s; }
        .wk-btn:hover { opacity:.92; transform:translateY(-2px); box-shadow:0 12px 32px ${pal.accentGlow}; }
        .wk-btn-wa { transition: opacity .2s, transform .2s; }
        .wk-btn-wa:hover { opacity:.92; transform:translateY(-2px); }
        .wk-btn-demo { cursor: not-allowed; opacity:.55; }
        .wk-btn-demo:hover { transform:none; box-shadow:none; }
        .wk-nav-link { color:${pal.txt2}; text-decoration:none; font-size:14px; font-weight:500; transition:color .2s; }
        .wk-nav-link:hover { color:${pal.txt1}; }
        .wk-lang { display:inline-flex; border:1px solid ${pal.border}; border-radius:100px; padding:2px; background:${pal.surface}; }
        .wk-lang button { background:transparent; border:none; padding:4px 12px; font-size:11px; font-weight:700; letter-spacing:.5px; cursor:pointer; border-radius:100px; color:${pal.txt2}; transition: background .2s, color .2s; font-family:inherit; }
        .wk-lang button.active { background:${pal.accent}; color:${isDark ? "#04080F" : "#FFFFFF"}; }
        @media(max-width:768px){
          .wk-hide-sm{ display:none!important; }
          .wk-hero-title{ font-size:2.4rem!important; }
          .wk-section{ padding-left:20px!important; padding-right:20px!important; }
          .wk-cards-grid{ grid-template-columns: 1fr !important; max-width:380px; margin-left:auto; margin-right:auto; }
          .wk-metrics-row{ justify-content:center; }
          .wk-cta-row{ flex-direction:column; align-items:stretch; max-width:340px; margin-left:auto; margin-right:auto; }
          .wk-cta-row > *{ width:100%; justify-content:center; }
          .wk-persuasion{ padding:60px 20px!important; }
          .wk-foot{ flex-direction:column; gap:12px; text-align:center; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="wk-section" style={{ position:"sticky", top:0, zIndex:100, background:pal.navBg, backdropFilter:"blur(20px)", borderBottom:`1px solid ${pal.border}`, padding:"0 40px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <span style={{ fontSize:18, fontWeight:800, letterSpacing:"-0.5px", color:pal.txt1 }}>
          {P.name}<span style={{ color:pal.accent }}>.</span>
        </span>
        <div style={{ display:"flex", gap:24, alignItems:"center" }}>
          <div className="wk-hide-sm" style={{ display:"flex", gap:22 }}>
            {t.navLinks.map(l => <a key={l.label} href={l.href} className="wk-nav-link">{l.label}</a>)}
          </div>
          <div className="wk-lang" role="group" aria-label="language">
            <button type="button" className={lang==="fr"?"active":""} onClick={()=>setLang("fr")}>FR</button>
            <button type="button" className={lang==="en"?"active":""} onClick={()=>setLang("en")}>EN</button>
          </div>
          <button data-cal-link="wikolabs-team/30min" data-cal-namespace="wk30min" data-cal-config='{"layout":"month_view"}' className="wk-btn"
            style={{ background:pal.accent, color:isDark?"#04080F":"#FFFFFF", border:"none", borderRadius:8, padding:"9px 18px", fontWeight:700, fontSize:13.5, cursor:"pointer", fontFamily:"inherit" }}>
            {t.ctaPrimary} →
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="wk-section" style={{ padding:"100px 40px 80px", maxWidth:1040, margin:"0 auto", textAlign:"center", position:"relative" }}>
        <div style={{ position:"absolute", top:-60, left:"50%", transform:"translateX(-50%)", width:720, height:600, background:`radial-gradient(ellipse at 50% 30%, ${pal.accentGlow} 0%, transparent 60%)`, pointerEvents:"none" }} />
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:24, background:pal.accentSoft, border:`1px solid ${pal.accentBorder}`, borderRadius:100, padding:"6px 18px", animation:"fadeUp .5s ease both" }}>
          <span style={{ width:7, height:7, borderRadius:"50%", background:pal.accent, display:"inline-block", animation:"pulseDot 2s ease-in-out infinite" }} />
          <span style={{ color:pal.accent, fontSize:11.5, fontWeight:700, letterSpacing:"2px", textTransform:"uppercase" }}>{t.tagLabel}</span>
        </div>
        <h1 className="wk-hero-title" style={{ fontSize:"clamp(2.6rem,6vw,5rem)", fontWeight:700, lineHeight:1.08, letterSpacing:"-0.03em", marginBottom:28, fontFamily:"'Instrument Serif',Georgia,serif", animation:"fadeUp .5s .08s ease both" }}>
          {t.taglines.map((line, i) => (
            <span key={i} style={{ display:"block", color:i===t.taglineAccentIdx?pal.accent:pal.txt1, fontStyle:i===t.taglineAccentIdx?"italic":"normal" }}>{line}</span>
          ))}
        </h1>
        <p style={{ fontSize:"1.1rem", color:pal.txt2, lineHeight:1.72, maxWidth:600, margin:"0 auto 44px", animation:"fadeUp .5s .16s ease both" }}>{t.desc}</p>
        <div className="wk-metrics-row" style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:14, marginBottom:44, animation:"fadeUp .5s .24s ease both" }}>
          {t.metrics.map(m => (
            <div key={m.label} style={{ background:pal.surface, border:`1px solid ${pal.border}`, borderRadius:18, padding:"14px 22px", textAlign:"center", minWidth:118 }}>
              <div style={{ fontSize:"1.7rem", fontWeight:800, color:pal.txt1, letterSpacing:"-1.5px", lineHeight:1 }}>{m.value}</div>
              <div style={{ fontSize:"0.62rem", color:pal.txt3, textTransform:"uppercase", letterSpacing:"1.5px", marginTop:5 }}>{m.label}</div>
            </div>
          ))}
        </div>
        <CtaRow t={t} pal={pal} isDark={isDark} waLink={waLink} />
      </section>

      {/* FEATURES */}
      <section id="features" className="wk-section" style={{ padding:"80px 40px", maxWidth:1100, margin:"0 auto" }}>
        <SectionHead pal={pal} tag={lang==="fr"?"Fonctionnalites":"Features"} title={lang==="fr"?"Tout automatise, <em>rien a gerer</em>":"Fully automated, <em>nothing to manage</em>"} />
        <div className="wk-cards-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:20 }}>
          {t.features.map((f, i) => (
            <div key={f.title} className="wk-card" style={{ background:pal.surface, border:`1px solid ${pal.border}`, borderRadius:20, padding:"28px 28px 26px", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${pal.accent},transparent)`, opacity:.55 }} />
              <div style={{ fontSize:"2rem", marginBottom:16 }}>{f.icon}</div>
              <h3 style={{ fontSize:"1.05rem", fontWeight:700, color:pal.txt1, marginBottom:10 }}>{f.title}</h3>
              <p style={{ fontSize:"0.88rem", color:pal.txt2, lineHeight:1.7, margin:0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="process" className="wk-section" style={{ padding:"80px 40px", background:pal.bg2 }}>
        <div style={{ maxWidth:860, margin:"0 auto" }}>
          <SectionHead pal={pal} tag={lang==="fr"?"Comment ca marche":"How it works"} title={lang==="fr"?"En place en <em>10 minutes</em>":"Live in <em>10 minutes</em>"} />
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {t.steps.map((s, i) => (
              <div key={s.num} style={{ display:"flex", alignItems:"flex-start", gap:22, background:pal.surface, border:`1px solid ${pal.border}`, borderRadius:18, padding:"22px 26px" }}>
                <div style={{ flexShrink:0, width:46, height:46, background:pal.accentSoft, border:`1px solid ${pal.accentBorder}`, borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", color:pal.accent, fontWeight:800, fontSize:15 }}>
                  {s.num}
                </div>
                <div>
                  <h3 style={{ fontSize:"1rem", fontWeight:700, color:pal.txt1, marginBottom:6, lineHeight:1.3 }}>{s.title}</h3>
                  <p style={{ fontSize:"0.87rem", color:pal.txt2, lineHeight:1.7, margin:0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PERSUASION — pathos / logos / ethos / solution */}
      <section id="why" className="wk-persuasion wk-section" style={{ padding:"100px 40px", maxWidth:860, margin:"0 auto" }}>
        <SectionHead pal={pal} tag={t.persuasion.sectionTag} title={t.persuasion.title} />
        <div style={{ display:"flex", flexDirection:"column", gap:22 }}>
          {t.persuasion.paragraphs.map((p, i) => {
            const labelMap: Record<string, { fr: string; en: string }> = {
              pathos:   { fr: "L'enjeu humain",  en: "What's at stake" },
              logos:    { fr: "Les faits",       en: "The facts" },
              ethos:    { fr: "Notre legitimite", en: "Our credibility" },
              solution: { fr: "Notre reponse",   en: "Our answer" },
            };
            const label = labelMap[p.type]?.[lang] ?? "";
            return (
              <div key={i} style={{ borderLeft:`2px solid ${pal.accentBorder}`, paddingLeft:22 }}>
                <div style={{ fontSize:"0.62rem", fontWeight:700, letterSpacing:"2.5px", textTransform:"uppercase", color:pal.accent, marginBottom:10 }}>{label}</div>
                <p style={{ fontSize:"1.02rem", color:pal.txt2, lineHeight:1.85, margin:0 }}>{p.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="wk-section" style={{ padding:"0 40px 100px", maxWidth:860, margin:"0 auto" }}>
        <div style={{ background:pal.surface, border:`1px solid ${pal.accentBorder}`, borderRadius:24, padding:"64px 48px", textAlign:"center", backgroundImage:`radial-gradient(ellipse at 50% 0%, ${pal.accentSoft} 0%, transparent 65%)` }}>
          <p style={{ fontSize:"0.68rem", color:pal.accent, letterSpacing:"3px", textTransform:"uppercase", fontWeight:700, marginBottom:16 }}>{lang==="fr"?"Demarrer":"Get started"}</p>
          <h2 style={{ fontSize:"clamp(1.8rem,3.5vw,2.8rem)", fontWeight:700, color:pal.txt1, marginBottom:14, letterSpacing:"-0.02em", fontFamily:"'Instrument Serif',Georgia,serif" }}>{t.ctaTitle}</h2>
          <p style={{ color:pal.txt2, fontSize:"1rem", marginBottom:36, lineHeight:1.7, maxWidth:540, margin:"0 auto 36px" }}>{t.ctaDesc}</p>
          <CtaRow t={t} pal={pal} isDark={isDark} waLink={waLink} />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="wk-section" style={{ borderTop:`1px solid ${pal.border}`, padding:"32px 40px" }}>
        <div className="wk-foot" style={{ maxWidth:1200, margin:"0 auto", display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center", gap:16 }}>
          <div>
            <span style={{ fontWeight:800, fontSize:16, color:pal.txt1 }}>{P.name}</span><span style={{ color:pal.accent }}>.</span>
            <span style={{ display:"block", fontSize:12, color:pal.txt3, marginTop:3 }}>{t.footerTagline}</span>
          </div>
          <p style={{ fontSize:13, color:pal.txt3, margin:0 }}>© 2026 {P.name} — {lang==="fr"?"Un produit":"A product by"} <a href="https://wikolabs.com" style={{ color:pal.txt2, textDecoration:"none" }}>Wikolabs</a></p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:16, fontSize:13, alignItems:"center" }}>
            <a href="mailto:team@wikolabs.com" style={{ color:pal.txt3, textDecoration:"none" }}>team@wikolabs.com</a>
            <span style={{ color:pal.txt3 }}>·</span>
            <button data-cal-link="wikolabs-team/30min" data-cal-namespace="wk30min" data-cal-config='{"layout":"month_view"}' style={{ background:"none", border:"none", color:pal.txt3, fontSize:13, cursor:"pointer", fontFamily:"inherit", padding:0 }}>{t.ctaPrimary}</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function SectionHead({ pal, tag, title }: { pal: typeof P.palette; tag: string; title: string }) {
  return (
    <div style={{ textAlign:"center", marginBottom:52 }}>
      <p style={{ fontSize:"0.68rem", color:pal.accent, letterSpacing:"3px", textTransform:"uppercase", fontWeight:700, marginBottom:14 }}>{tag}</p>
      <h2
        style={{ fontSize:"clamp(1.8rem,3.5vw,2.8rem)", fontWeight:700, color:pal.txt1, letterSpacing:"-0.02em", fontFamily:"'Instrument Serif',Georgia,serif", lineHeight:1.15, margin:0 }}
        dangerouslySetInnerHTML={{ __html: title.replace(/<em>/g, `<em style="font-style:italic;color:${pal.accent}">`) }}
      />
    </div>
  );
}

function CtaRow({ t, pal, isDark, waLink }: { t: typeof P.content.fr; pal: typeof P.palette; isDark: boolean; waLink: string }) {
  return (
    <div className="wk-cta-row" style={{ display:"flex", flexWrap:"wrap", gap:12, justifyContent:"center", animation:"fadeUp .5s .32s ease both" }}>
      <button data-cal-link="wikolabs-team/30min" data-cal-namespace="wk30min" data-cal-config='{"layout":"month_view"}' className="wk-btn"
        style={{ background:pal.accent, color:isDark?"#04080F":"#FFFFFF", border:"none", borderRadius:10, padding:"14px 28px", fontWeight:700, fontSize:15, cursor:"pointer", display:"inline-flex", alignItems:"center", gap:8, fontFamily:"inherit" }}>
        📅 {t.ctaPrimary}
      </button>
      <a href={waLink} target="_blank" rel="noopener noreferrer" className="wk-btn-wa"
        style={{ background:"#25d366", color:"#FFFFFF", borderRadius:10, padding:"14px 28px", fontWeight:700, fontSize:15, textDecoration:"none", display:"inline-flex", alignItems:"center", gap:8 }}>
        💬 {t.ctaWhatsApp}
      </a>
      <button type="button" disabled className="wk-btn-demo" aria-disabled="true"
        style={{ background:"transparent", color:pal.txt2, border:`1px solid ${pal.border}`, borderRadius:10, padding:"14px 28px", fontWeight:700, fontSize:15, display:"inline-flex", alignItems:"center", gap:10, fontFamily:"inherit", position:"relative" }}>
        ✨ {t.ctaDemo}
        <span style={{ fontSize:9, fontWeight:800, letterSpacing:1, padding:"2px 7px", borderRadius:100, border:`1px solid ${pal.accentBorder}`, color:pal.accent, background:pal.accentSoft, textTransform:"uppercase" }}>{t.ctaSoonBadge}</span>
      </button>
    </div>
  );
}
