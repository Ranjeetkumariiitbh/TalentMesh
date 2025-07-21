import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"

export async function GET() {
  try {
    await connectDB()

    const userCount = await User.countDocuments()
    const users = await User.find().limit(5).select("name email createdAt")

    return NextResponse.json({
      success: true,
      message: "✅ MongoDB Atlas connection successful!",
      cluster: "cluster0.vucagql.mongodb.net",
      database: "jobportal",
      stats: {
        totalUsers: userCount,
        recentUsers: users,
      },
    })
  } catch (error) {
    console.error("Database Test Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "❌ Database connection failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
