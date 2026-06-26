import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const geist = Geist({ subsets: ["latin"] });

export const metadata = {
  title: "GameDB",
  description: "The gaming database — review, discover, and share games",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-black text-white min-h-screen`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
