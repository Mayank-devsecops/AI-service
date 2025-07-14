import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Solutions Pro - Transform Your Business with AI",
  description:
    "We create intelligent websites, AI call agents, chatbots, and lead generation systems that revolutionize how you connect with customers.",
  keywords: "AI solutions, chatbots, AI agents, lead generation, business automation, artificial intelligence",
  authors: [{ name: "AI Solutions Pro" }],
  openGraph: {
    title: "AI Solutions Pro - Transform Your Business with AI",
    description:
      "We create intelligent websites, AI call agents, chatbots, and lead generation systems that revolutionize how you connect with customers.",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="dark" storageKey="ai-solutions-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
