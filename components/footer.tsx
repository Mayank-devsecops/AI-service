"use client"

import { Bot, Instagram, Facebook, MessageCircle, Linkedin, Mail, Phone, MapPin, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  const socialLinks = [
    {
      name: "Instagram",
      icon: <Instagram className="h-5 w-5" />,
      href: "https://instagram.com/your-company", // Replace with your Instagram URL
      color: "hover:text-pink-500",
    },
    {
      name: "Facebook",
      icon: <Facebook className="h-5 w-5" />,
      href: "https://facebook.com/your-company", // Replace with your Facebook URL
      color: "hover:text-blue-600",
    },
    {
      name: "WhatsApp",
      icon: <MessageCircle className="h-5 w-5" />,
      href: "https://wa.me/your-number", // Replace with your WhatsApp number
      color: "hover:text-green-500",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      href: "https://linkedin.com/company/your-company", // Replace with your LinkedIn URL
      color: "hover:text-blue-500",
    },
  ]

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ]

  const services = ["AI-Powered Websites", "Smart Chatbots", "AI Call Agents", "Lead Generation", "Custom AI Solutions"]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-muted/20 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                AI Solutions Pro
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Transforming businesses with cutting-edge AI solutions. We create intelligent websites, chatbots, call
              agents, and lead generation systems.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  variant="ghost"
                  size="icon"
                  className={`hover:bg-accent transition-colors ${social.color}`}
                  onClick={() => window.open(social.href, "_blank", "noopener,noreferrer")}
                  aria-label={`Visit our ${social.name} page`}
                >
                  {social.icon}
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-muted-foreground text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Apps */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Mobile Apps</h3>
            <p className="text-muted-foreground text-sm">
              Download our mobile app to manage your AI solutions on the go.
            </p>
            <div className="space-y-3">
              {/* Android App */}
              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-auto p-3 border-border hover:bg-accent bg-transparent"
                onClick={() =>
                  window.open(
                    "https://play.google.com/store/apps/details?id=your.app.id",
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <Smartphone className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-muted-foreground">Get it on</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </div>
              </Button>

              {/* iOS App */}
              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-auto p-3 border-border hover:bg-accent bg-transparent"
                onClick={() => window.open("https://apps.apple.com/app/your-app-id", "_blank", "noopener,noreferrer")}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                    <Smartphone className="h-4 w-4 text-white dark:text-black" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-muted-foreground">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </div>
              </Button>

              {/* QR Code placeholder */}
              <div className="mt-4 p-3 bg-muted/50 rounded-lg text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <div className="text-white text-xs font-bold">QR</div>
                </div>
                <div className="text-xs text-muted-foreground">Scan to download</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Get In Touch</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 text-primary" />
              <span>contact@aisolutionspro.com</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Phone className="h-4 w-4 text-primary" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span>San Francisco, CA</span>
            </div>
          </div>
          <Button
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            onClick={() => scrollToSection("#contact")}
          >
            Start Your Project
          </Button>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">© 2024 AI Solutions Pro. All rights reserved.</div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <button className="hover:text-foreground transition-colors">Privacy Policy</button>
              <button className="hover:text-foreground transition-colors">Terms of Service</button>
              <button className="hover:text-foreground transition-colors">Cookie Policy</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
