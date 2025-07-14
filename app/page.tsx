"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Globe, Phone, Zap, Star, Users, TrendingUp, CheckCircle } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { ContactForm } from "@/components/contact-form"
import { HeroSection } from "@/components/hero-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  const [isContactOpen, setIsContactOpen] = useState(false)

  const services = [
    {
      icon: <Globe className="h-8 w-8" />,
      title: "AI-Powered Websites",
      description:
        "Custom websites with integrated AI features for enhanced user experience and conversion optimization.",
      features: ["Responsive Design", "AI Chatbots", "SEO Optimized", "Analytics Integration"],
    },
    {
      icon: <Phone className="h-8 w-8" />,
      title: "AI Call Agents",
      description: "Intelligent voice agents that handle customer inquiries, appointments, and sales calls 24/7.",
      features: ["Natural Voice", "Multi-language", "CRM Integration", "Call Analytics"],
    },
    {
      icon: <Bot className="h-8 w-8" />,
      title: "Smart Chatbots",
      description: "Advanced conversational AI that engages customers and qualifies leads automatically.",
      features: ["NLP Processing", "Lead Qualification", "Multi-platform", "Custom Training"],
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Lead Generation",
      description: "AI-driven lead generation systems that identify and nurture potential customers.",
      features: ["Predictive Analytics", "Automated Outreach", "Lead Scoring", "ROI Tracking"],
    },
  ]

  const stats = [
    { icon: <Users className="h-6 w-6" />, value: "500+", label: "Clients Served" },
    { icon: <Bot className="h-6 w-6" />, value: "1000+", label: "AI Agents Deployed" },
    { icon: <TrendingUp className="h-6 w-6" />, value: "300%", label: "Average ROI Increase" },
    { icon: <Star className="h-6 w-6" />, value: "4.9/5", label: "Client Satisfaction" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />

      {/* Hero Section with 3D Background */}
      <HeroSection onContactOpen={() => setIsContactOpen(true)} />

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4 text-primary">{stat.icon}</div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Our AI Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Cutting-edge AI solutions designed to automate, optimize, and accelerate your business growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="bg-card/50 border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              >
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-primary/20 rounded-lg text-primary">{service.icon}</div>
                    <CardTitle className="text-2xl">{service.title}</CardTitle>
                  </div>
                  <CardDescription className="text-muted-foreground text-lg">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <div id="testimonials">
        <TestimonialsCarousel />
      </div>

      {/* CTA Section */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join hundreds of businesses already using our AI solutions to increase efficiency and drive growth.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            onClick={() => setIsContactOpen(true)}
          >
            Start Your AI Journey <Zap className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer with Social Media Links */}
      <Footer />

      {/* Contact Form Modal */}
      <ContactForm isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  )
}
