"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Target,
  Users,
  TrendingUp,
  DollarSign,
  Calendar,
  Zap,
  Award,
  Brain,
  Wallet,
  Star,
  ArrowRight,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

export default function GTMStrategy() {
  const targetPersonas = [
    {
      name: "Tech Professionals",
      description: "Software developers, data scientists, and engineers looking for better job opportunities",
      size: "2.5M in India",
      painPoints: ["Generic job recommendations", "Time-consuming application process", "Lack of skill-based matching"],
      solutions: ["AI-powered job matching", "Skill extraction from profiles", "One-click applications"],
    },
    {
      name: "Growing Companies",
      description: "Startups and scale-ups needing to hire quality talent quickly",
      size: "50K+ companies",
      painPoints: ["High recruitment costs", "Poor candidate quality", "Long hiring cycles"],
      solutions: ["Blockchain-verified payments", "Pre-screened candidates", "Smart matching algorithms"],
    },
    {
      name: "Freelancers & Contractors",
      description: "Independent professionals seeking project-based work",
      size: "1.8M active freelancers",
      painPoints: ["Payment security", "Finding quality projects", "Building professional network"],
      solutions: ["Web3 secure payments", "Skill-based project matching", "Professional networking features"],
    },
  ]

  const marketingChannels = [
    {
      channel: "Content Marketing",
      budget: "₹1,500",
      strategy: "LinkedIn articles, tech blogs, career advice content",
      expectedReach: "10K+ professionals",
      roi: "High",
    },
    {
      channel: "Social Media",
      budget: "₹1,200",
      strategy: "Twitter/X engagement, LinkedIn posts, Instagram stories",
      expectedReach: "15K+ impressions",
      roi: "Medium",
    },
    {
      channel: "Community Building",
      budget: "₹800",
      strategy: "Discord server, Telegram groups, Reddit communities",
      expectedReach: "5K+ engaged users",
      roi: "High",
    },
    {
      channel: "Influencer Partnerships",
      budget: "₹1,000",
      strategy: "Tech YouTubers, LinkedIn influencers, podcast appearances",
      expectedReach: "20K+ targeted audience",
      roi: "Medium",
    },
    {
      channel: "Product Hunt Launch",
      budget: "₹500",
      strategy: "Launch campaign, maker community engagement",
      expectedReach: "8K+ tech enthusiasts",
      roi: "High",
    },
  ]

  const revenueStreams = [
    {
      name: "Job Posting Fees",
      model: "Pay-per-post",
      pricing: "₹150 per job posting",
      target: "Companies",
      projectedRevenue: "₹45,000/month",
      description: "Blockchain-verified payment for job postings with AI skill extraction",
    },
    {
      name: "Premium Subscriptions",
      model: "Monthly/Annual",
      pricing: "₹299/month or ₹2,999/year",
      target: "Job seekers",
      projectedRevenue: "₹89,700/month",
      description: "Advanced AI matching, priority applications, profile analytics",
    },
    {
      name: "Profile Boost",
      model: "One-time payment",
      pricing: "₹99 per boost",
      target: "Professionals",
      projectedRevenue: "₹19,800/month",
      description: "Increase profile visibility and job match priority",
    },
    {
      name: "Recruitment Services",
      model: "Commission-based",
      pricing: "15% of first month salary",
      target: "Companies",
      projectedRevenue: "₹75,000/month",
      description: "Full-service recruitment with AI-powered candidate screening",
    },
  ]

  const roadmapMilestones = [
    {
      month: "Month 1",
      users: 500,
      revenue: "₹7,500",
      activities: ["Product Hunt launch", "Initial content marketing", "Beta user onboarding"],
      kpis: ["50 job postings", "200 applications", "85% user satisfaction"],
    },
    {
      month: "Month 2",
      users: 2000,
      revenue: "₹35,000",
      activities: ["Influencer partnerships", "Community building", "Feature improvements"],
      kpis: ["150 job postings", "800 applications", "40% monthly retention"],
    },
    {
      month: "Month 3",
      users: 10000,
      revenue: "₹150,000",
      activities: ["Paid advertising", "Enterprise partnerships", "Mobile app launch"],
      kpis: ["500 job postings", "3000 applications", "60% monthly retention"],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-600 p-3 rounded-full mr-4">
              <Target className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Go-To-Market Strategy</h1>
          </div>
          <p className="text-xl text-gray-600 mb-8">
            Strategic roadmap to reach 10,000 users in 3 months with ₹5,000 marketing budget
          </p>
        </div>

        <Tabs defaultValue="personas" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personas">Target Users</TabsTrigger>
            <TabsTrigger value="marketing">Marketing Plan</TabsTrigger>
            <TabsTrigger value="revenue">Revenue Model</TabsTrigger>
            <TabsTrigger value="roadmap">3-Month Roadmap</TabsTrigger>
            <TabsTrigger value="metrics">Success Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="personas" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-6 w-6 mr-2" />
                  Target User Personas
                </CardTitle>
                <CardDescription>Detailed analysis of our primary target segments and their needs</CardDescription>
              </CardHeader>
            </Card>

            <div className="grid md:grid-cols-1 gap-6">
              {targetPersonas.map((persona, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{persona.name}</CardTitle>
                      <Badge variant="secondary">{persona.size}</Badge>
                    </div>
                    <CardDescription>{persona.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Pain Points
                        </h4>
                        <ul className="space-y-2">
                          {persona.painPoints.map((pain, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-start">
                              <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              {pain}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-green-600 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Our Solutions
                        </h4>
                        <ul className="space-y-2">
                          {persona.solutions.map((solution, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-start">
                              <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              {solution}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="marketing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-6 w-6 mr-2" />
                  Marketing Strategy - ₹5,000 Budget Allocation
                </CardTitle>
                <CardDescription>Cost-effective channels to maximize reach and user acquisition</CardDescription>
              </CardHeader>
            </Card>

            <div className="grid gap-4">
              {marketingChannels.map((channel, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">{channel.channel}</h3>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">{channel.budget}</Badge>
                        <Badge variant={channel.roi === "High" ? "default" : "secondary"}>{channel.roi} ROI</Badge>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-3">{channel.strategy}</p>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Expected Reach:</span>
                      <span className="font-medium">{channel.expectedReach}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Marketing Timeline & Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                    <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">Week 1-2</div>
                    <div>
                      <p className="font-medium">Foundation & Content Creation</p>
                      <p className="text-sm text-gray-600">
                        Set up social media, create initial content, prepare Product Hunt launch
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                    <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">Week 3-4</div>
                    <div>
                      <p className="font-medium">Launch & Community Building</p>
                      <p className="text-sm text-gray-600">
                        Product Hunt launch, influencer outreach, community engagement
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
                    <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">Week 5-8</div>
                    <div>
                      <p className="font-medium">Scale & Optimize</p>
                      <p className="text-sm text-gray-600">
                        Analyze performance, optimize channels, scale successful campaigns
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-6 w-6 mr-2" />
                  Revenue Streams & Monetization
                </CardTitle>
                <CardDescription>
                  Multiple revenue streams to ensure sustainable growth and profitability
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {revenueStreams.map((stream, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{stream.name}</CardTitle>
                      <Badge variant="outline">{stream.model}</Badge>
                    </div>
                    <CardDescription>{stream.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Pricing:</span>
                        <span className="font-semibold">{stream.pricing}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Target:</span>
                        <span className="font-medium">{stream.target}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Projected Revenue:</span>
                        <span className="font-bold text-green-600">{stream.projectedRevenue}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Projections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <h3 className="text-2xl font-bold text-blue-600">₹229,500</h3>
                    <p className="text-gray-600">Total Monthly Revenue (Month 3)</p>
                  </div>
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <h3 className="text-2xl font-bold text-green-600">₹2,754,000</h3>
                    <p className="text-gray-600">Annual Revenue Projection</p>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-lg">
                    <h3 className="text-2xl font-bold text-purple-600">40%</h3>
                    <p className="text-gray-600">Projected Profit Margin</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roadmap" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-6 w-6 mr-2" />
                  3-Month Growth Roadmap
                </CardTitle>
                <CardDescription>Detailed milestone-based approach to reach 10,000 users</CardDescription>
              </CardHeader>
            </Card>

            <div className="space-y-6">
              {roadmapMilestones.map((milestone, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{milestone.month}</CardTitle>
                      <div className="flex gap-4">
                        <Badge variant="secondary">{milestone.users.toLocaleString()} Users</Badge>
                        <Badge variant="outline">{milestone.revenue} Revenue</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center">
                          <Zap className="h-4 w-4 mr-2" />
                          Key Activities
                        </h4>
                        <ul className="space-y-2">
                          {milestone.activities.map((activity, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-center">
                              <ArrowRight className="h-3 w-3 mr-2 text-blue-500" />
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center">
                          <Target className="h-4 w-4 mr-2" />
                          Success KPIs
                        </h4>
                        <ul className="space-y-2">
                          {milestone.kpis.map((kpi, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-center">
                              <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                              {kpi}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Growth Trajectory</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Month 1 Progress</span>
                    <span className="text-sm text-gray-500">500 / 10,000 users</span>
                  </div>
                  <Progress value={5} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span>Month 2 Progress</span>
                    <span className="text-sm text-gray-500">2,000 / 10,000 users</span>
                  </div>
                  <Progress value={20} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span>Month 3 Target</span>
                    <span className="text-sm text-gray-500">10,000 / 10,000 users</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-6 w-6 mr-2" />
                  Success Metrics & KPIs
                </CardTitle>
                <CardDescription>Key performance indicators to track progress and optimize strategy</CardDescription>
              </CardHeader>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">User Acquisition Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Monthly Active Users</span>
                    <span className="font-semibold">10,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>User Acquisition Cost</span>
                    <span className="font-semibold">₹50</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Conversion Rate</span>
                    <span className="font-semibold">12%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Retention</span>
                    <span className="font-semibold">60%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Revenue Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Monthly Recurring Revenue</span>
                    <span className="font-semibold">₹229,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Revenue Per User</span>
                    <span className="font-semibold">₹23</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Customer Lifetime Value</span>
                    <span className="font-semibold">₹1,380</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gross Margin</span>
                    <span className="font-semibold">85%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Engagement Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Daily Active Users</span>
                    <span className="font-semibold">3,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Session Duration</span>
                    <span className="font-semibold">8.5 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Job Application Rate</span>
                    <span className="font-semibold">25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Profile Completion Rate</span>
                    <span className="font-semibold">78%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Platform Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Job Postings per Month</span>
                    <span className="font-semibold">500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Applications per Job</span>
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span>AI Match Accuracy</span>
                    <span className="font-semibold">87%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Success Rate</span>
                    <span className="font-semibold">98%</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Competitive Advantages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Brain className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">AI-Powered Matching</h3>
                    <p className="text-sm text-gray-600">
                      87% accuracy in job-candidate matching vs 45% industry average
                    </p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Wallet className="h-8 w-8 text-green-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Web3 Payments</h3>
                    <p className="text-sm text-gray-600">Secure blockchain payments with 98% success rate</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Star className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">User Experience</h3>
                    <p className="text-sm text-gray-600">Modern UI with 4.8/5 user satisfaction rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Ready to Transform Professional Networking?</h2>
              <p className="text-gray-600 mb-6">
                With our comprehensive GTM strategy, we are positioned to capture significant market share in the
                growing job networking space while delivering exceptional value to both job seekers and employers.
              </p>
              <div className="flex justify-center gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  View Live Demo
                </Button>
                <Button size="lg" variant="outline">
                  Download Business Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
