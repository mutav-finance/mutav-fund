import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MUTAV Fund",
  description:
    "Web3 portal for the MUTAV fund — investor flows and fund management.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
