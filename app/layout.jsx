import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import { Navbar } from "@/components/navigation/navbar";
import { cn } from "@/lib/utils";
import Doubt from "@/components/doubt/doubt";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mymedicos",
  description: "India’s first Premier Medical Community app, connecting healthcare experts seamlessly",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cn(inter.className,"overflow-x-hidden min-h-screen")}>
        <div className="w-full h-screen flex flex-col items-start justify-start">
            <Navbar/>
            <div id="main-data" className="w-full h-full overflow-y-scroll">
              {children}
            </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
