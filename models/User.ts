import mongoose, { type Document, Schema } from "mongoose"

export interface IUser extends Document {
  name: string
  email: string
  password: string
  bio?: string
  linkedinUrl?: string
  skills: string[]
  walletAddress?: string
  location?: string
  experience?: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    bio: {
      type: String,
      maxlength: [500, "Bio cannot exceed 500 characters"],
      default: "Professional developer passionate about technology",
    },
    linkedinUrl: {
      type: String,
      validate: {
        validator: (v: string) => !v || /^https:\/\/.*linkedin\.com\/.*/.test(v),
        message: "Please enter a valid LinkedIn URL",
      },
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    walletAddress: {
      type: String,
      validate: {
        validator: (v: string) => !v || /^0x[a-fA-F0-9]{40}$/.test(v),
        message: "Please enter a valid Ethereum address",
      },
      default: "",
    },
    location: {
      type: String,
      default: "Remote",
    },
    experience: {
      type: String,
      enum: ["Entry-level", "Mid-level", "Senior", "Lead", "Executive"],
      default: "Mid-level",
    },
    avatar: {
      type: String,
      default: function (this: IUser) {
        return `/placeholder.svg?height=40&width=40&query=${encodeURIComponent(this.name)}`
      },
    },
  },
  {
    timestamps: true,
  },
)

// Indexes for better performance
UserSchema.index({ email: 1 })
UserSchema.index({ skills: 1 })
UserSchema.index({ walletAddress: 1 })

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
