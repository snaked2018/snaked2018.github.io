import { Inter } from "next/font/google";
// import { sfProDisplay } from "./fonts";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
});

export const metadata = {
  title: "Remix Digital | Ron Reciproco",
  description: "Portfolio website for Remix Digital, showcasing creative work and services by Ron Reciproco",
  keywords: ["portfolio", "web development", "digital design", "Ron Reciproco", "Remix Digital"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased min-h-screen next-grid-animated`}
      >
        <div className="grid-depth-overlay"></div>
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
