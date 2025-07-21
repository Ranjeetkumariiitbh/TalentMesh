import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"

export async function POST(request: NextRequest) {
  try {
    // Connect to MongoDB
    await connectDB()

    const body = await request.json()
    const { email, password, name, bio, linkedinUrl, mode } = body

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email and password are required" }, { status: 400 })
    }

    if (mode === "register") {
      // Check if user already exists
      const existingUser = await User.findOne({ email: email.toLowerCase() })
      if (existingUser) {
        return NextResponse.json({ success: false, error: "User already exists with this email" }, { status: 400 })
      }

      if (!name) {
        return NextResponse.json({ success: false, error: "Name is required for registration" }, { status: 400 })
      }

      // Hash password
      const saltRounds = 12
      const hashedPassword = await bcrypt.hash(password, saltRounds)

      // AI Skill Extraction
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

      const extractedSkills = bio
        ? commonSkills.filter((skill) => bio.toLowerCase().includes(skill.toLowerCase())).slice(0, 8)
        : ["JavaScript", "React", "Node.js"]

      // Create new user in MongoDB
      const newUser = new User({
        name: name.trim(),
        email: email.toLowerCase(),
        password: hashedPassword,
        bio: bio || "Professional developer passionate about technology",
        linkedinUrl: linkedinUrl || "",
        skills: extractedSkills,
        location: "Remote",
        experience: "Mid-level",
      })

      // Save to database
      const savedUser = await newUser.save()

      // Generate JWT token
      const token = jwt.sign({ userId: savedUser._id, email: savedUser.email }, process.env.JWT_SECRET!, {
        expiresIn: "7d",
      })

      // Return user data (without password)
      const userResponse = {
        id: savedUser._id.toString(),
        name: savedUser.name,
        email: savedUser.email,
        bio: savedUser.bio,
        linkedinUrl: savedUser.linkedinUrl,
        skills: savedUser.skills,
        walletAddress: savedUser.walletAddress || "",
        avatar: savedUser.avatar,
        location: savedUser.location,
        experience: savedUser.experience,
        createdAt: savedUser.createdAt,
      }

      return NextResponse.json({
        success: true,
        token,
        user: userResponse,
        message: "Registration successful! Welcome to Job Portal!",
      })
    } else {
      // LOGIN MODE
      const user = await User.findOne({ email: email.toLowerCase() }).select("+password")

      if (!user) {
        return NextResponse.json({ success: false, error: "Invalid email or password" }, { status: 401 })
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password)

      if (!isPasswordValid) {
        return NextResponse.json({ success: false, error: "Invalid email or password" }, { status: 401 })
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: "7d" })

      // Return user data (without password)
      const userResponse = {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        bio: user.bio,
        linkedinUrl: user.linkedinUrl,
        skills: user.skills,
        walletAddress: user.walletAddress || "",
        avatar: user.avatar,
        location: user.location,
        experience: user.experience,
      }

      return NextResponse.json({
        success: true,
        token,
        user: userResponse,
        message: "Login successful! Welcome back!",
      })
    }
  } catch (error: any) {
    console.error("Auth API Error:", error)

    // Handle MongoDB validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json({ success: false, error: messages.join(", ") }, { status: 400 })
    }

    // Handle duplicate key error (email already exists)
    if (error.code === 11000) {
      return NextResponse.json({ success: false, error: "User already exists with this email" }, { status: 400 })
    }

    return NextResponse.json({ success: false, error: "Internal server error. Please try again." }, { status: 500 })
  }
}
