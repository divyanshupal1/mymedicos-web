import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import { Navbar } from "@/components/navigation/navbar";
import { cn } from "@/lib/utils";
import Doubt from "@/components/doubt/doubt";
import { GoogleAnalytics } from '@next/third-parties/google'
import { GoogleTagManager } from '@next/third-parties/google'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mymedicos",
  description: "India’s first Premier Medical Community app, connecting healthcare experts seamlessly",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-YMJPH29S40"></script>
      </head>
      <body className={cn(inter.className,"overflow-x-hidden min-h-screen")}>
        <GoogleTagManager gtmId="GTM-T8MN5ZTC" />
        <div className="w-full h-screen flex flex-col items-start justify-start">
            <Navbar/>
            <div id="main-data" className="w-full h-full overflow-y-scroll">
              {children}
            </div>
        </div>
        <Toaster />
        <GoogleAnalytics gaId="G-YMJPH29S40"/>
      </body>
    </html>
  );
}
