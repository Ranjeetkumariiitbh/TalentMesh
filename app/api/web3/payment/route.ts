import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { transactionHash, walletAddress, amount } = await request.json()

    const payment = {
      id: Date.now().toString(),
      transactionHash,
      walletAddress,
      amount,
      status: "confirmed",
      timestamp: new Date().toISOString(),
      network: "ethereum",
      gasUsed: "21000",
    }

    return NextResponse.json({
      success: true,
      payment,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Payment verification failed" }, { status: 400 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const walletAddress = searchParams.get("wallet")

  const mockPayments = [
    {
      id: "1",
      transactionHash: "0x1234567890abcdef",
      walletAddress,
      amount: "0.001",
      status: "confirmed",
      timestamp: "2024-01-15T10:30:00Z",
      purpose: "Job Posting Fee",
    },
  ]

  return NextResponse.json({ payments: mockPayments })
}
