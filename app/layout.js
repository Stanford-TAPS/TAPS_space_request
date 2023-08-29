import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./navigation.js";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TAPS Space Request",
  description: "Information and form to request TAPS spaces for rehearsals",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen w-screen flex-col justify-stretch font-oswald">
          <div className="left-0 right-0 top-0 z-40 flex-shrink-0">
            <Navbar />
          </div>
          <div className="no-scrollbar relative flex-grow overflow-auto">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
