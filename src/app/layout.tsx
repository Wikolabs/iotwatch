import type { Metadata } from "next";
import { Russo_One, Titillium_Web } from "next/font/google";
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
      <body style={{ fontFamily: "var(--font-body)", background: "#ecfeff" }}>{children}</body>
    </html>
  );
}
