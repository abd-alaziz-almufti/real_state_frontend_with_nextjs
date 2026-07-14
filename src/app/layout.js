import { Geist, Geist_Mono } from "next/font/google";
import "material-symbols";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";
import { AuthProvider } from "@/context/AuthContext";
import { BroadcastProvider } from "@/context/BroadcastContext";
import { AppToaster } from '@/components/FeedbackToaster';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EstateSync Pro",
  description: "Premium Real Estate Management Platform",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-surface text-on-surface selection:bg-primary-container selection:text-on-primary-container">
        <AuthProvider>
          <BroadcastProvider>
            {/* LayoutShell controls Navbar/Footer visibility per route */}
            <LayoutShell>
              {children}
            </LayoutShell>
            <AppToaster />
          </BroadcastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
