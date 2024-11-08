'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"

export default function Settings() {
  const [apiKey, setApiKey] = useState("")
  const [refreshInterval, setRefreshInterval] = useState("5")

  const handleSave = () => {
    // Save settings logic would go here
    console.log("Saving settings:", { apiKey, refreshInterval })
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
                  <label className="text-sm font-medium">API Key</label>
                  <Input
                    type="password" 
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your API key"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Auto-refresh Interval (minutes)</label>
                  <Input
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
