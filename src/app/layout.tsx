import type { Metadata } from "next";
import { Russo_One, Titillium_Web } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const russoOne = Russo_One({ subsets: ["latin"], weight: ["400"], variable: "--font-display", display: "swap" });
const titilliumWeb = Titillium_Web({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: "IoTWatch — 10 000 capteurs surveillés. 1 dashboard. 0 alerte manquée.",
  description: "Collecte, analyse et alertes temps réel pour parcs IoT industriels — MQTT, LoRaWAN, Modbus.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${russoOne.variable} ${titilliumWeb.variable}`}>
      <body style={{ fontFamily: "var(--font-body)", background: "#ecfeff" }}>{children}<Script id="cal-embed" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: '(function(C,A,L){var p=function(a,ar){a.q.push(ar);};var d=C.document;C.Cal=C.Cal||function(){var cal=C.Cal;var ar=arguments;if(!cal.loaded){cal.ns={};cal.q=cal.q||[];d.head.appendChild(d.createElement("script")).src=A;cal.loaded=true;}if(ar[0]===L){const api=function(){p(api,arguments);};const namespace=ar[1];api.q=api.q||[];if(typeof namespace==="string"){cal.ns[namespace]=cal.ns[namespace]||api;p(cal.ns[namespace],ar);p(cal,["-",namespace,ar[2]]);}else p(cal,ar);return;}p(cal,ar);};})(window,"https://app.cal.com/embed/embed.js","init");Cal("init","wk30min",{origin:"https://app.cal.com"});Cal.ns["wk30min"]("ui",{"theme":"light","hideEventTypeDetails":false,"layout":"month_view"});' }} /></body>
    </html>
  );
}
