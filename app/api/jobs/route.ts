import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get("search") || ""
  const skill = searchParams.get("skill") || ""
  const location = searchParams.get("location") || ""

  const mockJobs = [
    {
      id: "1",
      title: "Senior Full Stack Developer",
      company: "TechCorp",
      description: "We are looking for an experienced full stack developer to join our team.",
      skills: ["React", "Node.js", "TypeScript", "AWS"],
      budget: 120000,
      location: "San Francisco, CA",
      type: "full-time",
      postedBy: "user1",
      postedAt: "2024-01-15",
      applicants: 24,
    },
    {
      id: "2",
      title: "AI/ML Engineer",
      company: "DataFlow Inc",
      description: "Join our AI team to build next-generation machine learning models.",
      skills: ["Python", "TensorFlow", "Machine Learning"],
      budget: 140000,
      location: "Remote",
      type: "full-time",
      postedBy: "user2",
      postedAt: "2024-01-14",
      applicants: 31,
    },
  ]

  let filteredJobs = mockJobs

  if (search) {
    filteredJobs = filteredJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()),
    )
  }

  if (skill) {
    filteredJobs = filteredJobs.filter((job) => job.skills.some((s) => s.toLowerCase().includes(skill.toLowerCase())))
  }

  if (location) {
    filteredJobs = filteredJobs.filter((job) => job.location.toLowerCase().includes(location.toLowerCase()))
  }

  return NextResponse.json({ jobs: filteredJobs })
}

export async function POST(request: NextRequest) {
  try {
    const jobData = await request.json()

    const newJob = {
      id: Date.now().toString(),
      ...jobData,
      postedAt: new Date().toISOString().split("T")[0],
      applicants: 0,
    }

    return NextResponse.json({
      success: true,
      job: newJob,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create job" }, { status: 400 })
  }
}
