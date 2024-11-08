'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Search, LayoutDashboard, Settings, HelpCircle, Bot, Bell, Sun, Moon } from "lucide-react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function MainLayout({
    children,
  }: Readonly<{
    children: React.ReactNode
  }>) {
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()
  
    const isActive = (path: string) => {
      return pathname === path
    }
  
    return (
      <div className="flex flex-col h-screen">
        <header className="border-b">
          <div className="flex h-16 items-center px-4 justify-end gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>No new notifications</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
        </header>
        
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          <ResizablePanel defaultSize={15} minSize={10} maxSize={20}>
            <div className="flex flex-col h-full">
              <div className="p-4 font-semibold text-lg md:text-xl lg:text-2xl">AI Fund</div>
              <nav className="flex flex-col h-full">
                <div className="space-y-2 p-2">
                  <Button
                    variant={isActive("/") || isActive("/portfolio") ? "default" : "ghost"}
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/portfolio">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Portfolio
                    </Link>
                  </Button>
                  <Button
                    variant={isActive("/search") ? "default" : "ghost"}
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/search">
                      <Search className="mr-2 h-4 w-4" />
                      Search
                    </Link>
                  </Button>
                  <Button
                    variant={isActive("/agents") ? "default" : "ghost"}
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/agents">
                      <Bot className="mr-2 h-4 w-4" />
                      Agents
                    </Link>
                  </Button>
                  <Button
                    variant={isActive("/settings") ? "default" : "ghost"}
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </Button>
                </div>
                <div className="mt-auto p-2">
                  <Button
                    variant={isActive("/support") ? "default" : "ghost"}
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/support">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Support
                    </Link>
                  </Button>
                </div>
              </nav>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={85}>
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    )
  }