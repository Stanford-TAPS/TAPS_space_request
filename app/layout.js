import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./navigation.js";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Requestable Space Availability",
  description: "TAPS Requestable Spaces availability",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen w-screen flex-col justify-stretch font-oswald">
          <div className="left-0 right-0 top-0 z-40 flex-shrink-0">
            <Navbar />
          </div>
          <div className="relative flex-grow overflow-auto">{children}</div>
        </div>
      </body>
    </html>
  );
}
