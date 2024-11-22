import type { Metadata } from "next";
import "./globals.css";
import "./animation.css";
import PageUp from "@/app/componentes/PageUp";
import { LanguageProvider } from "./ContextLang/LanguageContext";

export const metadata: Metadata = {
  title: "Portfólio",
  description: "Portfólio de Heloysa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased mb-10 bg-gray-900 `}
        suppressHydrationWarning
      >
        <LanguageProvider>
          {children}
          <PageUp />
        </LanguageProvider>
      </body>
    </html>
  );
}
