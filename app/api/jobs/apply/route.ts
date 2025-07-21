import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { jobId, userId, coverLetter } = await request.json()

    const application = {
      id: Date.now().toString(),
      jobId,
      userId,
      coverLetter,
      status: "pending",
      matchScore: Math.floor(Math.random() * 40) + 60,
      appliedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      application,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to submit application" }, { status: 400 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  const mockApplications = [
    {
      id: "1",
      jobId: "1",
      userId,
      status: "pending",
      appliedAt: "2024-01-15T10:30:00Z",
      jobTitle: "Senior Full Stack Developer",
      company: "TechCorp",
    },
  ]

  return NextResponse.json({ applications: mockApplications })
}
