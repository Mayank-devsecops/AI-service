import { type NextRequest, NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase-server" //  <-- changed import

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { name, email, phone, service, callDate, callTime } = body
    if (!name || !email || !phone || !service || !callDate || !callTime) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Validate phone number (basic validation)
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
    if (!phoneRegex.test(phone.replace(/[\s\-$$$$]/g, ""))) {
      return NextResponse.json({ error: "Invalid phone number format" }, { status: 400 })
    }

    // Validate date is not in the past
    const selectedDate = new Date(callDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (selectedDate < today) {
      return NextResponse.json({ error: "Call date cannot be in the past" }, { status: 400 })
    }

    // Insert via service-role client (bypasses RLS)
    const supabase = supabaseServer()
    const { error } = await supabase.from("contact_submissions").insert({
      name,
      email,
      company: body.company || null,
      phone,
      service,
      call_date: callDate,
      call_time: callTime,
      message: body.message || null,
      newsletter: body.newsletter ?? false,
      status: "pending",
    })

    if (error) {
      console.error("Supabase insert error →", error)
      return NextResponse.json({ error: "Database error" }, { status: 500 })
    }

    return NextResponse.json(
      { success: true, message: "Call scheduled successfully! We’ll be in touch shortly." },
      { status: 200 },
    )
  } catch (err) {
    console.error("Handler error →", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}
