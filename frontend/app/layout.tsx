import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VAHAN Companion",
  description:
    "A simpler way to understand vehicle services, application status and your next step.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}