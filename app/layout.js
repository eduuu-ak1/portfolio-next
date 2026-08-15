import "./globals.css";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import StarField from "@/components/StarField";

export const metadata = {
  title: "Edu Demayo Nitre — Web Developer & Builder",
  description:
    "Edu Demayo Nitre — web developer building AI-powered automations, full-stack apps, and games.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&family=Playfair+Display:ital@1&family=Caveat:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-bg text-ink antialiased">
        <StarField />
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}