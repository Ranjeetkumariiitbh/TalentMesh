"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { Wallet, CheckCircle, AlertCircle, ExternalLink, Copy, Shield, Zap } from "lucide-react"

interface Web3IntegrationProps {
  onPaymentSuccess: (transactionHash: string) => void
  amount?: string
  purpose?: string
}

export default function Web3Integration({
  onPaymentSuccess,
  amount = "0.001",
  purpose = "Job Posting Fee",
}: Web3IntegrationProps) {
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [network, setNetwork] = useState("")
  const [balance, setBalance] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [transactionHash, setTransactionHash] = useState("")
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "pending" | "success" | "failed">("idle")
  const { toast } = useToast()

  const supportedNetworks = [
    { id: "0x1", name: "Ethereum Mainnet", currency: "ETH" },
    { id: "0x89", name: "Polygon", currency: "MATIC" },
    { id: "0xa4b1", name: "Arbitrum", currency: "ETH" },
    { id: "0x5", name: "Goerli Testnet", currency: "ETH" },
  ]

  useEffect(() => {
    checkWalletConnection()
  }, [])

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

      toast({
        title: "Wallet Connected",
        description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
      })
    } catch (error: any) {
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
      const networkInfo = supportedNetworks.find((net) => net.id === chainId)
      setNetwork(networkInfo ? networkInfo.name : "Unknown Network")
    } catch (error) {
      console.error("Error getting network info:", error)
    }
  }

  const getBalance = async (address: string) => {
    try {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      })
      const balanceInEth = Number.parseInt(balance, 16) / Math.pow(10, 18)
      setBalance(balanceInEth.toFixed(4))
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
      return
    }

    try {
      setIsLoading(true)
      setPaymentStatus("pending")

      const amountInWei = (Number.parseFloat(amount) * Math.pow(10, 18)).toString(16)

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
          amount,
          purpose,
        }),
      })

      toast({
        title: "Payment Successful",
        description: `Transaction confirmed: ${txHash.slice(0, 10)}...`,
      })

      onPaymentSuccess(txHash)
    } catch (error: any) {
      setPaymentStatus("failed")
      toast({
        title: "Payment Failed",
        description: error.message || "Transaction was cancelled or failed.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Wallet className="h-5 w-5 mr-2" />
            Web3 Wallet Integration
          </CardTitle>
          <CardDescription>Connect your MetaMask wallet to make secure blockchain payments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!walletConnected ? (
            <div className="text-center py-8">
              <Wallet className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
              <p className="text-gray-600 mb-6">Connect your MetaMask wallet to enable secure payments</p>
              <Button onClick={connectWallet} disabled={isLoading} size="lg">
                {isLoading ? "Connecting..." : "Connect MetaMask"}
              </Button>
            </div>
          ) : (
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
                  <p className="font-medium">{network}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Balance</p>
                  <p className="font-medium">{balance} ETH</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {walletConnected && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Payment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium">{purpose}</p>
                <p className="text-sm text-gray-600">Secure blockchain payment</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{amount} ETH</p>
                <p className="text-sm text-gray-600">≈ ${(Number.parseFloat(amount) * 2000).toFixed(2)} USD</p>
              </div>
            </div>

            <Alert>
              <Zap className="h-4 w-4" />
              <AlertDescription>
                This payment will be processed on the Ethereum blockchain. Transaction fees (gas) will apply.
              </AlertDescription>
            </Alert>

            {paymentStatus === "idle" && (
              <Button onClick={processPayment} disabled={isLoading} className="w-full" size="lg">
                {isLoading ? "Processing..." : `Pay ${amount} ETH`}
              </Button>
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
                    View on Etherscan
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(transactionHash)}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Hash
                  </Button>
                </div>
              </div>
            )}

            {paymentStatus === "failed" && (
              <div className="text-center py-4">
                <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-red-600 mb-2">Payment Failed</h3>
                <p className="text-gray-600 mb-4">Please try again or contact support</p>
                <Button onClick={() => setPaymentStatus("idle")} variant="outline">
                  Try Again
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Supported Networks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {supportedNetworks.map((net) => (
              <div key={net.id} className="flex items-center justify-between p-3 border rounded-lg">
                <span className="font-medium">{net.name}</span>
                <Badge variant="secondary">{net.currency}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
