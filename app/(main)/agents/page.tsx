'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { Plus, SendHorizontal } from "lucide-react"

type Message = {
  content: string
  sender: 'user' | 'agent'
  timestamp: Date
}

type ChatHistory = {
  [agentId: string]: Message[]
}

const agents = [
  { id: 'financial-advisor', name: 'Financial Advisor' },
  { id: 'market-analyst', name: 'Market Analyst' },
  { id: 'risk-manager', name: 'Risk Manager' },
]

export default function AgentsPage() {
  const [selectedAgent, setSelectedAgent] = useState<string>('')
  const [message, setMessage] = useState('')
  const [chatHistory, setChatHistory] = useState<ChatHistory>({})

  const handleSendMessage = () => {
    if (!message.trim() || !selectedAgent) return

    const newMessage: Message = {
      content: message,
      sender: 'user',
      timestamp: new Date()
    }

    setChatHistory(prev => ({
      ...prev,
      [selectedAgent]: [...(prev[selectedAgent] || []), newMessage]
    }))

    // Simulate agent response
    setTimeout(() => {
      const agentResponse: Message = {
        content: `Response from ${agents.find(a => a.id === selectedAgent)?.name}`,
        sender: 'agent',
        timestamp: new Date()
      }
      
      setChatHistory(prev => ({
        ...prev,
        [selectedAgent]: [...(prev[selectedAgent] || []), agentResponse]
      }))
    }, 1000)

    setMessage('')
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">AI Agents</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Chat
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select an Agent</DialogTitle>
            </DialogHeader>
            <Select onValueChange={setSelectedAgent}>
              <SelectTrigger>
                <SelectValue placeholder="Select an agent to chat with" />
              </SelectTrigger>
              <SelectContent>
                {agents.map(agent => (
                  <SelectItem key={agent.id} value={agent.id}>
                    {agent.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-[300px_1fr] gap-4">
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Conversations</h3>
          <ScrollArea className="h-[600px]">
            <div className="space-y-2">
              {agents.map(agent => (
                <Button
                  key={agent.id}
                  variant={selectedAgent === agent.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedAgent(agent.id)}
                >
                  {agent.name}
                  {chatHistory[agent.id]?.length > 0 && (
                    <span className="ml-2 text-xs">
                      ({chatHistory[agent.id].length} messages)
                    </span>
                  )}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {selectedAgent && (
          <Card className="p-4">
            <div className="flex flex-col h-[600px]">
              <div className="mb-4">
                <h3 className="font-semibold">
                  {agents.find(a => a.id === selectedAgent)?.name}
                </h3>
              </div>
              
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {chatHistory[selectedAgent]?.map((msg, i) => (
                    <div
                      key={`${selectedAgent}-${i}`}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          msg.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="flex gap-2 mt-4">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage()
                    }
                  }}
                />
                <Button onClick={handleSendMessage}>
                  <SendHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
