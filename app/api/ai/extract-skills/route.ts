import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()

    const commonSkills = [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "Python",
      "Java",
      "C++",
      "HTML",
      "CSS",
      "SQL",
      "MongoDB",
      "PostgreSQL",
      "AWS",
      "Docker",
      "Kubernetes",
      "Git",
      "Machine Learning",
      "AI",
      "Blockchain",
      "Solidity",
      "Web3",
      "Smart Contracts",
      "TensorFlow",
      "PyTorch",
      "Django",
      "Flask",
      "Express.js",
      "Vue.js",
      "Angular",
      "GraphQL",
      "REST API",
      "Microservices",
      "Redux",
      "Next.js",
      "Tailwind CSS",
      "Firebase",
      "Vercel",
      "Netlify",
    ]

    const extractedSkills = commonSkills.filter((skill) => text.toLowerCase().includes(skill.toLowerCase()))

    const uniqueSkills = [...new Set(extractedSkills)].slice(0, 10)

    return NextResponse.json({
      success: true,
      skills: uniqueSkills,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to extract skills" }, { status: 400 })
  }
}
