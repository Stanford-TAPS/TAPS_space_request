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
        <div className="font-oswald h-screen">
          <div>
            <Navbar />
          </div>
          <div className="fixed flex w-full h-full">
            <div className="basis-1/3">
              <SpaceForm locations={spaces} />
            </div>
            <div className="basis-2/3 right-0">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
