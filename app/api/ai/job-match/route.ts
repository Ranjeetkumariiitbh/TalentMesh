import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { userSkills, jobSkills, jobDescription, userBio } = await request.json()

    const skillMatches = userSkills.filter((skill: string) =>
      jobSkills.some(
        (jobSkill: string) =>
          jobSkill.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(jobSkill.toLowerCase()),
      ),
    )

    const skillMatchScore = (skillMatches.length / Math.max(jobSkills.length, 1)) * 100

    const experienceKeywords = ["senior", "lead", "principal", "architect", "manager"]
    const userExperienceLevel = experienceKeywords.some((keyword) => userBio.toLowerCase().includes(keyword))
      ? 1.2
      : 1.0

    const jobExperienceLevel = experienceKeywords.some((keyword) => jobDescription.toLowerCase().includes(keyword))
      ? 0.9
      : 1.0

    const experienceMatchScore = userExperienceLevel * jobExperienceLevel * 100

    const finalScore = Math.min(Math.round(skillMatchScore * 0.7 + experienceMatchScore * 0.3), 100)

    return NextResponse.json({
      success: true,
      matchScore: finalScore,
      matchingSkills: skillMatches,
      recommendations: [
        "Consider highlighting your experience with " + skillMatches.join(", "),
        "Your profile shows strong alignment with this role",
        "This position matches your skill set well",
      ],
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to calculate match score" }, { status: 400 })
  }
}
