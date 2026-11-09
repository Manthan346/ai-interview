
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

import Providers from "./provider";
import { ThemeProvider } from "@/components/themes/theme-provider";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "InterviewAI | AI interview practice",
  description:
    "Practice technical interviews through a live voice conversation and review structured AI feedback for your next step.",
  openGraph: {
    title: "InterviewAI | AI interview practice",
    description:
      "Practice technical interviews through a live voice conversation and review structured AI feedback for your next step.",
    images: [
      {
        url: "/step-2-interview.png",
        alt: "InterviewAI live interview practice screen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "InterviewAI | AI interview practice",
    description:
      "Practice technical interviews through a live voice conversation and review structured AI feedback for your next step.",
    images: ["/step-2-interview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.className} ${geist.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
