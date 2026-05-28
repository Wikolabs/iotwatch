export default function IoTWatch() {
  const sensors = [
    { id: "T-001", label: "Température — Salle serveurs", value: "72.3°C", status: "warning", unit: "°C", pct: 72 },
    { id: "P-042", label: "Pression — Circuit hydraulique", value: "4.2 bar", status: "normal", unit: "bar", pct: 42 },
    { id: "V-017", label: "Vibration — Moteur #3", value: "12.8 mm/s", status: "critical", unit: "mm/s", pct: 88 },
    { id: "H-008", label: "Humidité — Entrepôt B", value: "34%", status: "normal", unit: "%", pct: 34 },
    { id: "T-019", label: "Température — Four #1", value: "521°C", status: "normal", unit: "°C", pct: 52 },
    { id: "P-003", label: "Pression — Compresseur A", value: "8.9 bar", status: "warning", unit: "bar", pct: 65 },
  ];
  const statusColor = { normal: "bg-teal-500", warning: "bg-amber-400", critical: "bg-red-500" };
  const statusLabel = { normal: "Normal", warning: "Alerte", critical: "Critique" };
  const statusText = { normal: "text-teal-700", warning: "text-amber-700", critical: "text-red-700" };
  const statusBg = { normal: "bg-teal-50 border-teal-200", warning: "bg-amber-50 border-amber-200", critical: "bg-red-50 border-red-200 shadow-red-100 shadow-md" };

  return (
    <div className="min-h-screen" style={{ fontFamily: "var(--font-body)" }}>

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-cyan-900/95 backdrop-blur border-b border-cyan-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-400 flex items-center justify-center">
              <svg className="w-5 h-5 text-cyan-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" fill="currentColor" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            </div>
            <span className="font-bold text-white text-xl" style={{ fontFamily: "var(--font-display)" }}>IoTWatch</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-cyan-300">
            <a href="#dashboard" className="hover:text-white transition-colors">Dashboard</a>
            <a href="#features" className="hover:text-white transition-colors">Fonctionnalités</a>
            <a href="#protocols" className="hover:text-white transition-colors">Protocoles</a>
          </div>
          <a href="#cta" className="bg-teal-400 text-cyan-900 px-5 py-2 rounded-lg font-bold text-sm hover:bg-teal-300 transition-colors" style={{ fontFamily: "var(--font-display)" }}>
            Démo gratuite
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-cyan-900 via-cyan-800 to-teal-800 relative overflow-hidden">
        <div className="absolute top-20 right-0 w-80 h-80 bg-teal-500 rounded-full blur-3xl opacity-10 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 relative">
          <div className="inline-flex items-center gap-2 bg-teal-400/20 text-teal-300 border border-teal-400/40 px-4 py-2 rounded-full text-sm font-bold mb-8" style={{ fontFamily: "var(--font-display)" }}>
            <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
            10 847 capteurs actifs en ce moment
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6" style={{ fontFamily: "var(--font-display)" }}>
            10 000 capteurs.<br />
            <span className="text-teal-400">1 dashboard.</span><br />
            0 alerte manquée.
          </h1>
          <p className="text-cyan-200 text-xl max-w-2xl mb-10 leading-relaxed">
            Collecte, analyse et alertes temps réel pour parcs IoT industriels.
            MQTT, LoRaWAN, Modbus — branchez vos équipements existants en quelques minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#cta" className="bg-teal-400 text-cyan-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-teal-300 transition-colors" style={{ fontFamily: "var(--font-display)" }}>
              Connecter mon parc IoT →
            </a>
            <a href="#dashboard" className="border-2 border-cyan-600 text-white hover:border-teal-400 hover:text-teal-400 px-8 py-4 rounded-lg font-bold text-lg transition-colors" style={{ fontFamily: "var(--font-display)" }}>
              Voir le dashboard
            </a>
          </div>
        </div>
      </section>

      {/* LIVE DASHBOARD MOCKUP */}
      <section id="dashboard" className="py-20 bg-cyan-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-cyan-900 text-center mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Dashboard temps réel
          </h2>
          <p className="text-cyan-600 text-center mb-12">Toutes vos machines. Tous vos sites. Un seul écran.</p>

          {/* Status bar */}
          <div className="flex items-center justify-between bg-cyan-900 text-white rounded-t-xl px-6 py-3 text-sm font-bold" style={{ fontFamily: "var(--font-display)" }}>
            <span>IoTWatch — Tableau de bord industriel</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-teal-400"><span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />LIVE</span>
              <span className="text-cyan-400">10 847 capteurs</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 bg-slate-100 p-4 rounded-b-xl border border-t-0 border-slate-200 shadow-xl">
            {sensors.map((s) => (
              <div key={s.id} className={`${statusBg[s.status as keyof typeof statusBg]} border rounded-xl p-4`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-xs text-gray-500 font-mono">{s.id}</span>
                    <p className="text-xs text-gray-600 mt-0.5 leading-tight">{s.label}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${statusText[s.status as keyof typeof statusText]}`} style={{ fontFamily: "var(--font-display)" }}>
                    <span className={`w-1.5 h-1.5 rounded-full ${statusColor[s.status as keyof typeof statusColor]}`} />
                    {statusLabel[s.status as keyof typeof statusLabel]}
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>{s.value}</div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className={`h-1.5 rounded-full ${statusColor[s.status as keyof typeof statusColor]}`} style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-cyan-900 text-center mb-14" style={{ fontFamily: "var(--font-display)" }}>
            Conçu pour l'industrie
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "📡", title: "Protocoles industriels", desc: "MQTT, LoRaWAN, Modbus RTU/TCP, OPC-UA, AMQP. Connexion native à vos équipements sans passerelle supplémentaire.", color: "border-teal-200 bg-teal-50" },
              { icon: "🔔", title: "Alertes prédictives", desc: "Détection de dérives avant le seuil critique. Escalade automatique par SMS, email, webhook ou appel téléphonique.", color: "border-amber-200 bg-amber-50" },
              { icon: "📈", title: "Historique 1 an", desc: "Toutes les données conservées 12 mois avec compression intelligente. Export CSV, API REST, connecteur Power BI.", color: "border-cyan-200 bg-cyan-50" },
            ].map((f) => (
              <div key={f.title} className={`${f.color} border rounded-2xl p-7`}>
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-cyan-900 text-lg mb-3" style={{ fontFamily: "var(--font-display)" }}>{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section id="protocols" className="py-20 bg-cyan-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6 text-center mb-16">
            {[
              { value: "10 000+", label: "capteurs simultanés" },
              { value: "< 200ms", label: "latence d'ingestion" },
              { value: "99.99%", label: "uptime garanti" },
              { value: "0", label: "alerte manquée" },
            ].map((s) => (
              <div key={s.label} className="p-6 bg-cyan-800 rounded-2xl border border-cyan-700">
                <div className="text-3xl font-bold text-teal-400 mb-2" style={{ fontFamily: "var(--font-display)" }}>{s.value}</div>
                <div className="text-cyan-300 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-20 bg-teal-600">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Vos capteurs sur le dashboard en 30 min
          </h2>
          <p className="text-teal-100 text-xl mb-10">Compatible avec vos équipements existants. Aucune installation hardware.</p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <button data-cal-link="wikolabs-team/30min" data-cal-namespace="wk30min" data-cal-config='{"layout":"month_view"}' type="button" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-teal-700 hover:bg-teal-50 px-10 py-5 rounded-xl font-bold text-xl transition-all shadow-xl" style={{ fontFamily: "var(--font-display)" }}>
              📅 Réserver un créneau →
            </button>
            <a href="https://wa.me/261386626100?text=Bonjour%2C%20je%20souhaite%20discuter%20de%20IoTWatch%20avec%20Wikolabs." target="_blank" rel="noopener noreferrer" className="inline-block px-10 py-5 rounded-xl font-bold text-xl transition-all shadow-xl" style={{ background: "#25d366", borderColor: "#25d366", color: "#fff", fontFamily: "var(--font-display)" }}>
              💬 WhatsApp →
            </a>
          </div>
          <p className="text-teal-200 text-sm mt-5">Essai 30 jours gratuit. Jusqu'à 100 capteurs inclus.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-cyan-950 text-cyan-500 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-bold text-white text-xl" style={{ fontFamily: "var(--font-display)" }}>IoTWatch</span>
          <p className="text-sm">© 2025 IoTWatch — Un produit <a href="https://wikolabs.com" className="text-cyan-400 hover:text-teal-400 transition-colors">Wikolabs</a></p>
          <div className="flex flex-wrap gap-4 text-sm">
            <a href="mailto:team@wikolabs.com" className="hover:text-teal-400 transition-colors">team@wikolabs.com</a>
            <span>·</span>
            <a href="tel:+261386626100" className="hover:text-teal-400 transition-colors">+261 38 66 261 00</a>
            <span>·</span>
            <a href="https://calendly.com/wikolabs" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors">Prendre RDV</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
