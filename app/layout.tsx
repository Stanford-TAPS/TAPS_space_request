import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./navigation";
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
        <div className="flex flex-col w-screen h-screen justify-stretch font-oswald">
          <div className="top-0 left-0 right-0 z-40 flex-shrink-0">
            <Navbar className="navbar" />
          </div>
          <div className="relative flex-grow overflow-auto no-scrollbar">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
