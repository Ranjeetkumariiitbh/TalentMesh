"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import {
  Briefcase,
  Users,
  TrendingUp,
  Wallet,
  Brain,
  Search,
  Filter,
  Plus,
  Star,
  MapPin,
  DollarSign,
  Clock,
  Building,
  Target,
  Award,
  Globe,
  CheckCircle,
  ExternalLink,
  Copy,
  Shield,
} from "lucide-react"

export default function JobNetworkingPortal() {
  const [currentUser, setCurrentUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [jobs, setJobs] = useState([])
  const [posts, setPosts] = useState([])
  const [applications, setApplications] = useState([])
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [walletBalance, setWalletBalance] = useState("0.0000")
  const [networkName, setNetworkName] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [skillFilter, setSkillFilter] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [showJobDialog, setShowJobDialog] = useState(false)
  const [showProfileDialog, setShowProfileDialog] = useState(false)
  const [showWalletDialog, setShowWalletDialog] = useState(false)
  const [authMode, setAuthMode] = useState("login")
  const [isLoading, setIsLoading] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState("idle")
  const [transactionHash, setTransactionHash] = useState("")
  const { toast } = useToast()

  const [authForm, setAuthForm] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    linkedinUrl: "",
  })

  const [jobForm, setJobForm] = useState({
    title: "",
    company: "",
    description: "",
    skills: "",
    budget: "",
    location: "",
    type: "full-time",
  })

  const [profileForm, setProfileForm] = useState({
    name: "",
    bio: "",
    linkedinUrl: "",
    skills: "",
    location: "",
    experience: "",
  })

  useEffect(() => {
    loadInitialData()
    checkAuthStatus()
    checkWalletConnection()
  }, [])

  const loadInitialData = async () => {
    try {
      const jobsResponse = await fetch("/api/jobs")
      const jobsData = await jobsResponse.json()
      if (jobsData.jobs) {
        setJobs(jobsData.jobs)
      }
    } catch (error) {
      loadMockData()
    }
  }

  const loadMockData = () => {
    const mockJobs = [
      {
        id: "1",
        title: "Senior Full Stack Developer",
        company: "TechCorp",
        description:
          "We are looking for an experienced full stack developer to join our team. You will work on cutting-edge projects using React, Node.js, and cloud technologies.",
        skills: ["React", "Node.js", "TypeScript", "AWS"],
        budget: 120000,
        location: "San Francisco, CA",
        type: "full-time",
        postedBy: "user1",
        postedAt: "2024-01-15",
        matchScore: 92,
        applicants: 24,
      },
      {
        id: "2",
        title: "AI/ML Engineer",
        company: "DataFlow Inc",
        description:
          "Join our AI team to build next-generation machine learning models. Experience with Python, TensorFlow, and deep learning required.",
        skills: ["Python", "TensorFlow", "Machine Learning", "Deep Learning"],
        budget: 140000,
        location: "Remote",
        type: "full-time",
        postedBy: "user2",
        postedAt: "2024-01-14",
        matchScore: 78,
        applicants: 31,
      },
      {
        id: "3",
        title: "Blockchain Developer",
        company: "CryptoStart",
        description: "Build decentralized applications and smart contracts. Solidity and Web3 experience essential.",
        skills: ["Solidity", "Web3", "Ethereum", "Smart Contracts"],
        budget: 110000,
        location: "New York, NY",
        type: "contract",
        postedBy: "user3",
        postedAt: "2024-01-13",
        matchScore: 85,
        applicants: 18,
      },
    ]

    const mockPosts = [
      {
        id: "1",
        author: "Sarah Chen",
        content:
          "Just completed my first smart contract deployment on Ethereum! The learning curve was steep but incredibly rewarding. Happy to share resources with anyone getting started in Web3.",
        type: "update",
        timestamp: "2 hours ago",
        likes: 42,
        comments: 8,
      },
      {
        id: "2",
        author: "Mike Rodriguez",
        content:
          "Career advice: Always negotiate your salary. I increased my offer by 25% just by asking professionally and backing it up with market research.",
        type: "advice",
        timestamp: "4 hours ago",
        likes: 156,
        comments: 23,
      },
      {
        id: "3",
        author: "TechCorp",
        content:
          "We are hiring! Looking for passionate developers to join our growing team. Remote-friendly culture with excellent benefits.",
        type: "job",
        timestamp: "6 hours ago",
        likes: 89,
        comments: 15,
      },
    ]

    setJobs(mockJobs)
    setPosts(mockPosts)
  }

  const checkAuthStatus = () => {
    const token = localStorage.getItem("authToken")
    const userData = localStorage.getItem("userData")

    if (token && userData) {
      setIsAuthenticated(true)
      setCurrentUser(JSON.parse(userData))
    }
  }

  const checkWalletConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" })
        if (accounts.length > 0) {
          setWalletAddress(accounts[0])
          setWalletConnected(true)
          await getNetworkInfo()
          await getBalance(accounts[0])
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error)
      }
    }
  }

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      toast({
        title: "MetaMask Not Found",
        description: "Please install MetaMask to connect your wallet.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      setWalletAddress(accounts[0])
      setWalletConnected(true)
      await getNetworkInfo()
      await getBalance(accounts[0])

      if (currentUser) {
        const updatedUser = { ...currentUser, walletAddress: accounts[0] }
        localStorage.setItem("userData", JSON.stringify(updatedUser))
        setCurrentUser(updatedUser)
      }

      toast({
        title: "Wallet Connected",
        description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
      })
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getNetworkInfo = async () => {
    try {
      const chainId = await window.ethereum.request({ method: "eth_chainId" })
      const networks = {
        "0x1": "Ethereum Mainnet",
        "0x89": "Polygon",
        "0xa4b1": "Arbitrum",
        "0x5": "Goerli Testnet",
      }
      setNetworkName(networks[chainId] || "Unknown Network")
    } catch (error) {
      console.error("Error getting network info:", error)
    }
  }

  const getBalance = async (address) => {
    try {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      })
      const balanceInEth = Number.parseInt(balance, 16) / Math.pow(10, 18)
      setWalletBalance(balanceInEth.toFixed(4))
    } catch (error) {
      console.error("Error getting balance:", error)
    }
  }

  const processPayment = async () => {
    if (!walletConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first.",
        variant: "destructive",
      })
      return false
    }

    try {
      setIsLoading(true)
      setPaymentStatus("pending")

      const amountInWei = (0.001 * Math.pow(10, 18)).toString(16)

      const transactionParameters = {
        to: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
        from: walletAddress,
        value: "0x" + amountInWei,
        gas: "0x5208",
      }

      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      })

      setTransactionHash(txHash)
      setPaymentStatus("success")

      await fetch("/api/web3/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transactionHash: txHash,
          walletAddress,
          amount: "0.001",
          purpose: "job_posting",
        }),
      })

      toast({
        title: "Payment Successful",
        description: `Transaction confirmed: ${txHash.slice(0, 10)}...`,
      })

      return true
    } catch (error) {
      setPaymentStatus("failed")
      toast({
        title: "Payment Failed",
        description: error.message || "Transaction was cancelled or failed.",
        variant: "destructive",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const extractSkillsWithAI = async (text) => {
    try {
      const response = await fetch("/api/ai/extract-skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      })
      const data = await response.json()
      return data.skills || []
    } catch (error) {
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
      ]
      return commonSkills.filter((skill) => text.toLowerCase().includes(skill.toLowerCase())).slice(0, 8)
    }
  }

  const calculateJobMatch = (userSkills, jobSkills) => {
    const matchingSkills = userSkills.filter((skill) =>
      jobSkills.some(
        (jobSkill) =>
          jobSkill.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(jobSkill.toLowerCase()),
      ),
    )
    const matchPercentage = (matchingSkills.length / Math.max(jobSkills.length, 1)) * 100
    return Math.min(Math.round(matchPercentage), 100)
  }

  const handleAuth = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...authForm,
          mode: authMode,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned non-JSON response")
      }

      const data = await response.json()

      if (data.success) {
        localStorage.setItem("authToken", data.token)
        localStorage.setItem("userData", JSON.stringify(data.user))
        setCurrentUser(data.user)
        setIsAuthenticated(true)
        setShowAuthDialog(false)

        toast({
          title: authMode === "register" ? "Registration Successful" : "Login Successful",
          description: `Welcome ${data.user.name}!`,
        })
      } else {
        throw new Error(data.error || "Authentication failed")
      }

      setAuthForm({ name: "", email: "", password: "", bio: "", linkedinUrl: "" })
    } catch (error) {
      console.error("Authentication error:", error)
      toast({
        title: "Authentication Failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleJobPost = async (e) => {
    e.preventDefault()

    const paymentSuccess = await processPayment()
    if (!paymentSuccess) return

    setIsLoading(true)

    try {
      const extractedSkills = await extractSkillsWithAI(jobForm.description)

      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...jobForm,
          skills: extractedSkills,
          postedBy: currentUser?.id,
          transactionHash,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setJobs((prev) => [data.job, ...prev])
        setShowJobDialog(false)
        setJobForm({
          title: "",
          company: "",
          description: "",
          skills: "",
          budget: "",
          location: "",
          type: "full-time",
        })
        setPaymentStatus("idle")

        toast({
          title: "Job Posted Successfully",
          description: `Payment processed and job "${jobForm.title}" is now live!`,
        })
      }
    } catch (error) {
      toast({
        title: "Job Posting Failed",
        description: "Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleJobApplication = async (jobId) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please login to apply for jobs.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)

      const response = await fetch("/api/jobs/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId,
          userId: currentUser.id,
          coverLetter: "I am interested in this position and believe my skills align well with the requirements.",
        }),
      })

      const data = await response.json()

      if (data.success) {
        setApplications((prev) => [...prev, data.application])

        setJobs((prev) => prev.map((job) => (job.id === jobId ? { ...job, applicants: job.applicants + 1 } : job)))

        toast({
          title: "Application Submitted",
          description: "Your application has been sent successfully!",
        })
      }
    } catch (error) {
      toast({
        title: "Application Failed",
        description: "Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const extractedSkills = await extractSkillsWithAI(profileForm.bio + " " + profileForm.skills)

      const updatedUser = {
        ...currentUser,
        name: profileForm.name || currentUser.name,
        bio: profileForm.bio || currentUser.bio,
        linkedinUrl: profileForm.linkedinUrl || currentUser.linkedinUrl,
        skills: extractedSkills.length > 0 ? extractedSkills : currentUser.skills,
        location: profileForm.location || currentUser.location,
        experience: profileForm.experience || currentUser.experience,
      }

      localStorage.setItem("userData", JSON.stringify(updatedUser))
      setCurrentUser(updatedUser)
      setShowProfileDialog(false)

      toast({
        title: "Profile Updated",
        description: `AI updated your skills: ${extractedSkills.join(", ")}`,
      })
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userData")
    setIsAuthenticated(false)
    setCurrentUser(null)
    setWalletConnected(false)
    setWalletAddress("")
    setApplications([])

    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied",
      description: "Address copied to clipboard",
    })
  }

  const openEtherscan = () => {
    if (transactionHash) {
      window.open(`https://etherscan.io/tx/${transactionHash}`, "_blank")
    }
  }

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSkill =
      !skillFilter || job.skills.some((skill) => skill.toLowerCase().includes(skillFilter.toLowerCase()))

    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase())

    return matchesSearch && matchesSkill && matchesLocation
  })

  const jobsWithMatchScores = currentUser
    ? filteredJobs
        .map((job) => ({
          ...job,
          matchScore: calculateJobMatch(currentUser.skills, job.skills),
        }))
        .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
    : filteredJobs

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-blue-600 p-3 rounded-full mr-4">
                <Briefcase className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">Job and Networking Portal</h1>
            </div>
            <p className="text-xl text-gray-600 mb-8">
              The future of professional networking with AI-powered matching and Web3 payments
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="text-center">
                <CardHeader>
                  <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle>AI-Powered Matching</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Smart algorithms match you with perfect job opportunities based on your skills and experience.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Wallet className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <CardTitle>Web3 Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Secure blockchain-based payments for job postings and premium features.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <CardTitle>Professional Network</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Connect with industry professionals and grow your career network.</p>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-12 bg-gradient-to-r from-green-50 to-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center justify-center">
                  <Shield className="h-6 w-6 mr-2" />
                  Secure Web3 Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <Wallet className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">MetaMask Integration</h3>
                    <p className="text-sm text-gray-600">
                      Connect your MetaMask wallet for secure blockchain transactions
                    </p>
                  </div>
                  <div className="text-center">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Verified Payments</h3>
                    <p className="text-sm text-gray-600">
                      All payments are verified on the blockchain for maximum security
                    </p>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-white rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span>Supported Networks:</span>
                    <div className="flex gap-2">
                      <Badge variant="outline">Ethereum</Badge>
                      <Badge variant="outline">Polygon</Badge>
                      <Badge variant="outline">Arbitrum</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => {
                  setAuthMode("register")
                  setShowAuthDialog(true)
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Get Started Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  setAuthMode("login")
                  setShowAuthDialog(true)
                }}
              >
                Sign In
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Platform Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Active Jobs</span>
                  <span className="font-semibold">2,847</span>
                </div>
                <div className="flex justify-between">
                  <span>Registered Users</span>
                  <span className="font-semibold">15,632</span>
                </div>
                <div className="flex justify-between">
                  <span>Successful Matches</span>
                  <span className="font-semibold">8,291</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Match Score</span>
                  <span className="font-semibold">87%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Success Stories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <p className="text-sm text-gray-600">
                      "Found my dream job in just 2 weeks! The AI matching was incredibly accurate."
                    </p>
                    <p className="text-xs text-gray-500 mt-1">- Sarah K., Software Engineer</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <p className="text-sm text-gray-600">"Web3 payments made hiring so much easier and more secure."</p>
                    <p className="text-xs text-gray-500 mt-1">- Mike R., Startup Founder</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{authMode === "login" ? "Welcome Back" : "Join Job Portal"}</DialogTitle>
              <DialogDescription>
                {authMode === "login" ? "Sign in to access your account" : "Create your account and start connecting"}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleAuth} className="space-y-4">
              {authMode === "register" && (
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={authForm.name}
                    onChange={(e) => setAuthForm((prev) => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
              )}

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={authForm.email}
                  onChange={(e) => setAuthForm((prev) => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={authForm.password}
                  onChange={(e) => setAuthForm((prev) => ({ ...prev, password: e.target.value }))}
                  required
                />
              </div>

              {authMode === "register" && (
                <>
                  <div>
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea
                      id="bio"
                      value={authForm.bio}
                      onChange={(e) => setAuthForm((prev) => ({ ...prev, bio: e.target.value }))}
                      placeholder="Tell us about your experience and skills..."
                      rows={3}
                    />
                    <p className="text-xs text-gray-500 mt-1">AI will extract skills from your bio</p>
                  </div>

                  <div>
                    <Label htmlFor="linkedin">LinkedIn URL (Optional)</Label>
                    <Input
                      id="linkedin"
                      value={authForm.linkedinUrl}
                      onChange={(e) => setAuthForm((prev) => ({ ...prev, linkedinUrl: e.target.value }))}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                </>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Processing..." : authMode === "login" ? "Sign In" : "Create Account"}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setAuthMode(authMode === "login" ? "register" : "login")}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {authMode === "login" ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center cursor-default">
              <div className="bg-blue-600 p-2 rounded-lg mr-3">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Job and Networking Portal</h1>
            </div>

            <div className="flex items-center space-x-4">
              {!walletConnected ? (
                <Button onClick={connectWallet} variant="outline" size="sm" disabled={isLoading}>
                  <Wallet className="h-4 w-4 mr-2" />
                  {isLoading ? "Connecting..." : "Connect Wallet"}
                </Button>
              ) : (
                <Dialog open={showWalletDialog} onOpenChange={setShowWalletDialog}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <Wallet className="h-3 w-3 mr-1" />
                        {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                      </Badge>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Wallet Details</DialogTitle>
                      <DialogDescription>Your connected wallet information</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                          <div>
                            <p className="font-medium">Wallet Connected</p>
                            <p className="text-sm text-gray-600">
                              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(walletAddress)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600">Network</p>
                          <p className="font-medium">{networkName}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600">Balance</p>
                          <p className="font-medium">{walletBalance} ETH</p>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}

              <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={currentUser?.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{currentUser?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {currentUser?.name}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                    <DialogDescription>
                      Update your professional information. AI will extract skills automatically.
                    </DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div>
                      <Label htmlFor="profile-name">Name</Label>
                      <Input
                        id="profile-name"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder={currentUser?.name}
                      />
                    </div>

                    <div>
                      <Label htmlFor="profile-bio">Bio</Label>
                      <Textarea
                        id="profile-bio"
                        value={profileForm.bio}
                        onChange={(e) => setProfileForm((prev) => ({ ...prev, bio: e.target.value }))}
                        placeholder={currentUser?.bio}
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="profile-skills">Additional Skills</Label>
                      <Input
                        id="profile-skills"
                        value={profileForm.skills}
                        onChange={(e) => setProfileForm((prev) => ({ ...prev, skills: e.target.value }))}
                        placeholder="React, Node.js, Python..."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="profile-location">Location</Label>
                        <Input
                          id="profile-location"
                          value={profileForm.location}
                          onChange={(e) => setProfileForm((prev) => ({ ...prev, location: e.target.value }))}
                          placeholder={currentUser?.location}
                        />
                      </div>

                      <div>
                        <Label htmlFor="profile-experience">Experience Level</Label>
                        <Select
                          value={profileForm.experience}
                          onValueChange={(value) => setProfileForm((prev) => ({ ...prev, experience: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={currentUser?.experience} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Entry-level">Entry-level</SelectItem>
                            <SelectItem value="Mid-level">Mid-level</SelectItem>
                            <SelectItem value="Senior">Senior</SelectItem>
                            <SelectItem value="Lead">Lead</SelectItem>
                            <SelectItem value="Executive">Executive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="profile-linkedin">LinkedIn URL</Label>
                      <Input
                        id="profile-linkedin"
                        value={profileForm.linkedinUrl}
                        onChange={(e) => setProfileForm((prev) => ({ ...prev, linkedinUrl: e.target.value }))}
                        placeholder={currentUser?.linkedinUrl}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Updating..." : "Update Profile"}
                      </Button>
                      <Button type="button" variant="outline" onClick={logout}>
                        Logout
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={currentUser?.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-lg">{currentUser?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{currentUser?.name}</h3>
                    <p className="text-sm text-gray-600">{currentUser?.experience}</p>
                    <p className="text-xs text-gray-500 flex items-center mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      {currentUser?.location}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{currentUser?.bio}</p>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {currentUser?.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                {walletConnected && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-600">Wallet</p>
                        <p className="text-sm font-medium">
                          {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                        </p>
                      </div>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Profile Views</span>
                  <span className="font-semibold">127</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Job Matches</span>
                  <span className="font-semibold">23</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Applications</span>
                  <span className="font-semibold">{applications.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Match Rate</span>
                  <span className="font-semibold text-green-600">89%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Tabs defaultValue="jobs" className="w-full">
              <div className="flex items-center justify-between mb-6">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger value="jobs">Jobs</TabsTrigger>
                  <TabsTrigger value="feed">Feed</TabsTrigger>
                  <TabsTrigger value="network">Network</TabsTrigger>
                </TabsList>

                <Dialog open={showJobDialog} onOpenChange={setShowJobDialog}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Post Job
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Post a New Job</DialogTitle>
                      <DialogDescription>
                        Create a job posting. Payment of 0.001 ETH required to publish.
                      </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleJobPost} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="job-title">Job Title</Label>
                          <Input
                            id="job-title"
                            value={jobForm.title}
                            onChange={(e) => setJobForm((prev) => ({ ...prev, title: e.target.value }))}
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="job-company">Company</Label>
                          <Input
                            id="job-company"
                            value={jobForm.company}
                            onChange={(e) => setJobForm((prev) => ({ ...prev, company: e.target.value }))}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="job-description">Job Description</Label>
                        <Textarea
                          id="job-description"
                          value={jobForm.description}
                          onChange={(e) => setJobForm((prev) => ({ ...prev, description: e.target.value }))}
                          placeholder="Describe the role, requirements, and responsibilities..."
                          rows={4}
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">AI will extract required skills automatically</p>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="job-budget">Budget/Salary ($)</Label>
                          <Input
                            id="job-budget"
                            type="number"
                            value={jobForm.budget}
                            onChange={(e) => setJobForm((prev) => ({ ...prev, budget: e.target.value }))}
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="job-location">Location</Label>
                          <Input
                            id="job-location"
                            value={jobForm.location}
                            onChange={(e) => setJobForm((prev) => ({ ...prev, location: e.target.value }))}
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="job-type">Job Type</Label>
                          <Select
                            value={jobForm.type}
                            onValueChange={(value) => setJobForm((prev) => ({ ...prev, type: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="full-time">Full-time</SelectItem>
                              <SelectItem value="part-time">Part-time</SelectItem>
                              <SelectItem value="contract">Contract</SelectItem>
                              <SelectItem value="freelance">Freelance</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {paymentStatus === "idle" && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <div className="flex items-center">
                            <Wallet className="h-5 w-5 text-yellow-600 mr-2" />
                            <div>
                              <p className="text-sm font-medium text-yellow-800">Payment Required</p>
                              <p className="text-xs text-yellow-600">0.001 ETH will be charged to post this job</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {paymentStatus === "pending" && (
                        <div className="text-center py-4">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                          <p className="text-gray-600">Processing payment...</p>
                        </div>
                      )}

                      {paymentStatus === "success" && (
                        <div className="text-center py-4">
                          <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-green-600 mb-2">Payment Successful!</h3>
                          <p className="text-gray-600 mb-4">Your transaction has been confirmed</p>
                          <div className="flex gap-2 justify-center">
                            <Button variant="outline" size="sm" onClick={openEtherscan}>
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Transaction
                            </Button>
                          </div>
                        </div>
                      )}

                      {paymentStatus === "idle" && (
                        <Button type="submit" className="w-full" disabled={isLoading || !walletConnected}>
                          {isLoading ? "Processing Payment..." : "Pay & Post Job (0.001 ETH)"}
                        </Button>
                      )}

                      {!walletConnected && (
                        <p className="text-sm text-red-600 text-center">Please connect your wallet first</p>
                      )}
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <TabsContent value="jobs" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            placeholder="Search jobs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <div className="relative">
                          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            placeholder="Filter by skill..."
                            value={skillFilter}
                            onChange={(e) => setSkillFilter(e.target.value)}
                            className="pl-10 w-40"
                          />
                        </div>

                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            placeholder="Location..."
                            value={locationFilter}
                            onChange={(e) => setLocationFilter(e.target.value)}
                            className="pl-10 w-32"
                          />
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <div className="space-y-4">
                  {jobsWithMatchScores.map((job) => (
                    <Card key={job.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-semibold">{job.title}</h3>
                              {job.matchScore && (
                                <Badge
                                  variant={
                                    job.matchScore >= 80 ? "default" : job.matchScore >= 60 ? "secondary" : "outline"
                                  }
                                  className={
                                    job.matchScore >= 80 ? "bg-green-600" : job.matchScore >= 60 ? "bg-yellow-600" : ""
                                  }
                                >
                                  <Star className="h-3 w-3 mr-1" />
                                  {job.matchScore}% Match
                                </Badge>
                              )}
                            </div>

                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                              <div className="flex items-center">
                                <Building className="h-4 w-4 mr-1" />
                                {job.company}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {job.location}
                              </div>
                              <div className="flex items-center">
                                <DollarSign className="h-4 w-4 mr-1" />${job.budget.toLocaleString()}
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {job.postedAt}
                              </div>
                            </div>

                            <p className="text-gray-700 mb-4">{job.description}</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {job.skills.map((skill, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <Button
                                  size="sm"
                                  onClick={() => handleJobApplication(job.id)}
                                  disabled={isLoading || applications.some((app) => app.jobId === job.id)}
                                >
                                  {applications.some((app) => app.jobId === job.id) ? "Applied" : "Apply Now"}
                                </Button>
                                <Button size="sm" variant="outline">
                                  Save Job
                                </Button>
                              </div>

                              <div className="text-sm text-gray-500">{job.applicants} applicants</div>
                            </div>
                          </div>

                          {job.matchScore && (
                            <div className="ml-4">
                              <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">{job.matchScore}%</div>
                                <div className="text-xs text-gray-500">Match</div>
                                <Progress value={job.matchScore} className="w-16 mt-2" />
                              </div>
                            </div>
                          )}
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="feed" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Globe className="h-5 w-5 mr-2" />
                      Professional Feed
                    </CardTitle>
                    <CardDescription>
                      Stay updated with industry news, career advice, and networking opportunities
                    </CardDescription>
                  </CardHeader>
                </Card>

                <div className="space-y-4">
                  {posts.map((post) => (
                    <Card key={post.id}>
                      <CardHeader>
                        <div className="flex items-start space-x-4">
                          <Avatar>
                            <AvatarImage src={`/placeholder.svg?height=40&width=40&query=${post.author}`} />
                            <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{post.author}</h4>
                              <Badge
                                variant="outline"
                                className={
                                  post.type === "job"
                                    ? "border-blue-200 text-blue-700"
                                    : post.type === "advice"
                                      ? "border-green-200 text-green-700"
                                      : "border-gray-200 text-gray-700"
                                }
                              >
                                {post.type === "job" ? "Job Post" : post.type === "advice" ? "Career Advice" : "Update"}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500">{post.timestamp}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 mb-4">{post.content}</p>
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <button className="flex items-center gap-1 hover:text-blue-600">
                            <Star className="h-4 w-4" />
                            {post.likes} likes
                          </button>
                          <button className="flex items-center gap-1 hover:text-blue-600">
                            <Users className="h-4 w-4" />
                            {post.comments} comments
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="network" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      Your Professional Network
                    </CardTitle>
                    <CardDescription>Connect with industry professionals and expand your network</CardDescription>
                  </CardHeader>
                </Card>

                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { name: "Sarah Chen", role: "Senior Frontend Developer", company: "Google", mutual: 12 },
                    { name: "Mike Rodriguez", role: "Product Manager", company: "Microsoft", mutual: 8 },
                    { name: "Emily Johnson", role: "UX Designer", company: "Apple", mutual: 15 },
                    { name: "David Kim", role: "Data Scientist", company: "Netflix", mutual: 6 },
                  ].map((person, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={`/placeholder.svg?height=50&width=50&query=${person.name}`} />
                            <AvatarFallback>
                              {person.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-semibold">{person.name}</h4>
                            <p className="text-sm text-gray-600">{person.role}</p>
                            <p className="text-sm text-gray-500">{person.company}</p>
                            <p className="text-xs text-gray-400">{person.mutual} mutual connections</p>
                          </div>
                          <Button size="sm" variant="outline">
                            Connect
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
