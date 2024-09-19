import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/header/Header";

export const metadata: Metadata = {
  title: "Turf Novo",
  description: "Turf Novo Frontend a Sports Ground Booking Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
