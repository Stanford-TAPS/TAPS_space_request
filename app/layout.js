import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./navigation.js";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Requestable Space Availability",
  description: "TAPS Requestable Spaces availability",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <div>
          <Navbar />
          {children}
        </div>
        
      </body>
    </html>
  );
}
