'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"

export default function Settings() {
  const [openaiKey, setOpenaiKey] = useState("")
  const [exaKey, setExaKey] = useState("")
  const [financeKey, setFinanceKey] = useState("")
  const [refreshInterval, setRefreshInterval] = useState("5")
  const [showOpenai, setShowOpenai] = useState(false)
  const [showExa, setShowExa] = useState(false)
  const [showFinance, setShowFinance] = useState(false)

  const handleSave = () => {
    // Save settings logic would go here
    console.log("Saving settings:", { 
      openaiKey, 
      exaKey,
      financeKey,
      refreshInterval 
    })
  }

  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-screen">
      <ResizablePanel defaultSize={100}>
        <ScrollArea className="h-full">
          <div className="space-y-6 p-6">
            <Card>
              <CardHeader>
                <CardTitle>API Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="openaiKey">OpenAI API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id="openaiKey"
                      type={showOpenai ? "text" : "password"}
                      value={openaiKey}
                      onChange={(e) => setOpenaiKey(e.target.value)}
                      placeholder="Enter your OpenAI API key"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setShowOpenai(!showOpenai)}
                    >
                      {showOpenai ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="exaKey">Exa API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id="exaKey"
                      type={showExa ? "text" : "password"}
                      value={exaKey}
                      onChange={(e) => setExaKey(e.target.value)}
                      placeholder="Enter your Exa API key"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setShowExa(!showExa)}
                    >
                      {showExa ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="financeKey">Financial Datasets API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id="financeKey"
                      type={showFinance ? "text" : "password"}
                      value={financeKey}
                      onChange={(e) => setFinanceKey(e.target.value)}
                      placeholder="Enter your Financial Datasets API key"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setShowFinance(!showFinance)}
                    >
                      {showFinance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="refreshInterval">Auto-refresh Interval (minutes)</Label>
                  <Input
                    id="refreshInterval"
                    type="number"
                    min="1"
                    max="60"
                    value={refreshInterval}
                    onChange={(e) => setRefreshInterval(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSave}>Save Settings</Button>
            </div>
          </div>
        </ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
