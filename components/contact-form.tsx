"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Send, CheckCircle, AlertCircle, Calendar, Clock } from "lucide-react"

interface ContactFormProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactForm({ isOpen, onClose }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    callDate: "",
    callTime: "",
    message: "",
    newsletter: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          service: "",
          callDate: "",
          callTime: "",
          message: "",
          newsletter: false,
        })
        setTimeout(() => {
          onClose()
          setSubmitStatus("idle")
        }, 2000)
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Generate time slots for call scheduling
  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
  ]

  // Get today's date for minimum date selection
  const today = new Date().toISOString().split("T")[0]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-background border-border max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Schedule Your Free AI Consultation
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Tell us about your business needs and schedule a call to discuss your custom AI solution.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="bg-input border-border focus:border-primary"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="bg-input border-border focus:border-primary"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                className="bg-input border-border focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="bg-input border-border focus:border-primary"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="service">Service Interested In *</Label>
            <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
              <SelectTrigger className="bg-input border-border focus:border-primary">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="website">AI-Powered Website</SelectItem>
                <SelectItem value="chatbot">Smart Chatbot</SelectItem>
                <SelectItem value="call-agent">AI Call Agent</SelectItem>
                <SelectItem value="lead-generation">Lead Generation System</SelectItem>
                <SelectItem value="ios-app">Build iOS App</SelectItem>
                <SelectItem value="android-app">Build Android App</SelectItem>
                <SelectItem value="mobile-apps">Build iOS & Android Apps</SelectItem>
                <SelectItem value="custom">Custom AI Solution</SelectItem>
                <SelectItem value="consultation">Consultation Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Call Scheduling Section */}
          <div className="space-y-4 p-4 bg-muted/20 rounded-lg border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Schedule Your Call</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="callDate">Preferred Date *</Label>
                <Input
                  id="callDate"
                  type="date"
                  value={formData.callDate}
                  min={today}
                  onChange={(e) => handleInputChange("callDate", e.target.value)}
                  className="bg-input border-border focus:border-primary"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="callTime">Preferred Time *</Label>
                <Select value={formData.callTime} onValueChange={(value) => handleInputChange("callTime", value)}>
                  <SelectTrigger className="bg-input border-border focus:border-primary">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border max-h-48">
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {time}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Additional Information</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Tell us about your business goals, current challenges, or any specific requirements..."
              className="bg-input border-border focus:border-primary min-h-[100px]"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="newsletter"
              checked={formData.newsletter}
              onCheckedChange={(checked) => handleInputChange("newsletter", checked as boolean)}
              className="border-border"
            />
            <Label htmlFor="newsletter" className="text-sm text-muted-foreground">
              Subscribe to our newsletter for AI insights and updates
            </Label>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex-1"
            >
              {isSubmitting ? (
                "Scheduling..."
              ) : (
                <>
                  Schedule Call <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="border-border bg-transparent">
              Cancel
            </Button>
          </div>

          {submitStatus === "success" && (
            <div className="flex items-center gap-2 text-green-400 bg-green-400/10 p-3 rounded-lg">
              <CheckCircle className="h-5 w-5" />
              <span>Call scheduled successfully! We'll contact you at the specified time.</span>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-lg">
              <AlertCircle className="h-5 w-5" />
              <span>Failed to schedule call. Please try again or contact us directly.</span>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}
