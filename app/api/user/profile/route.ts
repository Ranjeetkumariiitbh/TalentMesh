import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"
import { verifyToken, getTokenFromRequest } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const token = getTokenFromRequest(request)
    if (!token) {
      return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 })
    }

    const user = await User.findById(decoded.userId)
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    }

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
      createdAt: user.createdAt,
    }

    return NextResponse.json({
      success: true,
      user: userResponse,
    })
  } catch (error) {
    console.error("Profile API Error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()

    const token = getTokenFromRequest(request)
    if (!token) {
      return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 })
    }

    const body = await request.json()
    const { name, bio, linkedinUrl, skills, location, experience, walletAddress } = body

    const updateData: any = {}
    if (name) updateData.name = name.trim()
    if (bio) updateData.bio = bio
    if (linkedinUrl) updateData.linkedinUrl = linkedinUrl
    if (skills) updateData.skills = Array.isArray(skills) ? skills : skills.split(",").map((s: string) => s.trim())
    if (location) updateData.location = location
    if (experience) updateData.experience = experience
    if (walletAddress !== undefined) updateData.walletAddress = walletAddress

    const updatedUser = await User.findByIdAndUpdate(decoded.userId, updateData, { new: true, runValidators: true })

    if (!updatedUser) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    }

    const userResponse = {
      id: updatedUser._id.toString(),
      name: updatedUser.name,
      email: updatedUser.email,
      bio: updatedUser.bio,
      linkedinUrl: updatedUser.linkedinUrl,
      skills: updatedUser.skills,
      walletAddress: updatedUser.walletAddress || "",
      avatar: updatedUser.avatar,
      location: updatedUser.location,
      experience: updatedUser.experience,
      createdAt: updatedUser.createdAt,
    }

    return NextResponse.json({
      success: true,
      user: userResponse,
      message: "Profile updated successfully!",
    })
  } catch (error: any) {
    console.error("Profile Update Error:", error)

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json({ success: false, error: messages.join(", ") }, { status: 400 })
    }

    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
