import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hostedfield Example",
  description: "Basic example of hostedfields implementation in nextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://secure.blinkpayment.co.uk/assets/css/api.css"
        />
        <Script src="https://code.jquery.com/jquery-3.6.3.min.js"></Script>
        <Script src="https://gateway2.blinkpayment.co.uk/sdk/web/v1/js/hostedfields.min.js"></Script>
        <Script
          id="custom"
          src="https://secure.blinkpayment.co.uk/assets/js/api/custom.js"
        ></Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
