import "./globals.css";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata = {
  title: "Edu Nitre — AI Automation for Small Business",
  description:
    "Edu Nitre replaces manual busywork with AI automation for small and service-based businesses — n8n workflows, AI agents, and the full-stack systems around them.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-bg text-ink antialiased">
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}