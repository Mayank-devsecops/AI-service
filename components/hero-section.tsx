"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play } from "lucide-react"
import { ThemeAware3DScene } from "./theme-aware-3d-scene"

interface HeroSectionProps {
  onContactOpen: () => void
}

export function HeroSection({ onContactOpen }: HeroSectionProps) {
  const [showDemo, setShowDemo] = useState(false)

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Theme-aware 3D Background */}
      <div className="absolute inset-0 z-0">
        <ThemeAware3DScene />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/40 z-5" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        <Badge variant="outline" className="mb-6 border-primary text-primary animate-pulse">
          🚀 Next-Gen AI Solutions
        </Badge>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-gradient">
          Transform Your Business with AI
        </h1>

        <p className="text-xl md:text-2xl lg:text-3xl mb-10 text-muted-foreground max-w-4xl mx-auto leading-relaxed">
          We create intelligent websites, AI call agents, chatbots, and lead generation systems that revolutionize how
          you connect with customers and drive growth.
        </p>

        {/* Interactive Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 max-w-3xl mx-auto">
          <div className="bg-background/30 backdrop-blur-sm rounded-lg p-4 border border-border">
            <div className="text-2xl font-bold text-blue-400">500+</div>
            <div className="text-sm text-muted-foreground">Clients</div>
          </div>
          <div className="bg-background/30 backdrop-blur-sm rounded-lg p-4 border border-border">
            <div className="text-2xl font-bold text-purple-400">1000+</div>
            <div className="text-sm text-muted-foreground">AI Agents</div>
          </div>
          <div className="bg-background/30 backdrop-blur-sm rounded-lg p-4 border border-border">
            <div className="text-2xl font-bold text-cyan-400">300%</div>
            <div className="text-sm text-muted-foreground">ROI Increase</div>
          </div>
          <div className="bg-background/30 backdrop-blur-sm rounded-lg p-4 border border-border">
            <div className="text-2xl font-bold text-yellow-400">4.9/5</div>
            <div className="text-sm text-muted-foreground">Rating</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4 h-auto transform hover:scale-105 transition-all duration-200"
            onClick={onContactOpen}
          >
            Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-border hover:bg-accent bg-background/30 backdrop-blur-sm text-lg px-8 py-4 h-auto transform hover:scale-105 transition-all duration-200"
            onClick={() => setShowDemo(!showDemo)}
          >
            <Play className="mr-2 h-5 w-5" />
            Watch Demo
          </Button>
        </div>

        {/* Demo Video Placeholder */}
        {showDemo && (
          <div className="mt-10 max-w-4xl mx-auto">
            <div className="bg-background/50 backdrop-blur-sm rounded-lg p-8 border border-border">
              <div className="aspect-video bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Play className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Demo video coming soon...</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Hint */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
