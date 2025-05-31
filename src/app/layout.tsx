import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YouFocus - YouTube Focus Timer",
  description: "Stay focused while watching YouTube videos with our productivity timer and focus tracking app.",
  keywords: ["YouTube", "Focus Timer", "Productivity", "Study Timer", "Work Timer"],
  authors: [{ name: "YouFocus Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <style>{`
          :root {
            --gradient-start: #1a1a1a;
            --gradient-mid: #2d2d2d;
            --gradient-end: #000000;
            --accent-purple: #a855f7;
            --accent-pink: #ec4899;
            --accent-red: #ef4444;
          }

          body {
            background: linear-gradient(to bottom right, var(--gradient-start), var(--gradient-mid), var(--gradient-end));
            color: #ffffff;
          }

          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }

          ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
          }

          ::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.3);
          }

          /* Selection color */
          ::selection {
            background: var(--accent-purple);
            color: white;
          }

          /* Focus outline */
          *:focus-visible {
            outline: 2px solid var(--accent-purple);
            outline-offset: 2px;
          }
        `}</style>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white`}
      >
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1F2937',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            },
            success: {
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
