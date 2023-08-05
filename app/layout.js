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
        <div className="font-oswald h-screen">
          <Navbar />
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
