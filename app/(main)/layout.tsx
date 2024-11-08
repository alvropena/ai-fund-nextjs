'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Search, LayoutDashboard, Settings } from "lucide-react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-screen">
      <ResizablePanel defaultSize={15} minSize={10} maxSize={20}>
        <div className="flex flex-col h-full">
          <div className="p-4 font-semibold text-lg md:text-xl lg:text-2xl">AI Fund</div>
          <nav className="space-y-2 p-2">
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
              variant={isActive("/portfolio") ? "default" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href="/portfolio">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Portfolio
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
          </nav>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={85}>
        {children}
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
