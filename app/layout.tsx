import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MUTAV Invest",
  description:
    "Investor portal for MUTAV Finance — fund data, NAV view, deposit and redeem flows.",
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
