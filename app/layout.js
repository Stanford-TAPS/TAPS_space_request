import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./navigation.js";
import SpaceForm from "./form.js";
import { getRequestableSpaces } from "../lib/notion";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Requestable Space Availability",
  description: "TAPS Requestable Spaces availability",
};

export default async function RootLayout({ children }) {
  const spaces = await getRequestableSpaces();
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="font-oswald">
          <Navbar />
          <div className="flex">
            
            <SpaceForm locations={ spaces } className="basis-1/3"/>
            <div className="basis-2/3">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
