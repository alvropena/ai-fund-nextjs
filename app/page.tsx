'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CalendarIcon } from "lucide-react"
import { format, subYears } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Mock function to fetch financial data
const fetchFinancialData = async (ticker: string, period: Date) => {
  // This would be replaced with an actual API call
  return {
    name: "Apple Inc.",
    ticker: ticker,
    currentPrice: 150.25,
    calculatedValue: 165.75,
    recommendation: "buy",
    ratios: {
      liquidity: {
        currentRatio: 1.5,
        acidTestRatio: 1.2,
        defensiveIntervalRatio: 0.8
      },
      ebitda: {
        ebitda: 100000000000,
        ebitdaMargin: 0.3
      },
      leverage: {
        debtRatio: 0.4,
        solvencyRatio: 0.6,
        leverage: 1.5
      },
      efficiency: {
        inventoryTurnover: 52.1,
        receivablesTurnover: 12.3,
        payablesTurnover: 8.7,
        assetTurnover: 0.8
      },
      profitability: {
        salesMargin: 0.21,
        returnOnAssets: 0.17,
        returnOnEquity: 0.74
      },
      dupontRatios: {
        salesMargin: 0.21,
        assetTurnover: 0.8,
        leverage: 1.5
      },
      economicValueRatios: {
        roe: 0.74,
        economicMargin: 0.15,
        eva: 50000000000
      },
      stockPerformance: {
        earningsPerShare: 5.61,
        dividendsPerShare: 0.88,
        marketValue: 2500000000000,
        marketValueAdded: 500000000000
      }
    }
  }
}

export default function FinancialDashboard() {
  const [open, setOpen] = useState(false)
  const [ticker, setTicker] = useState("AAPL")
  const [date, setDate] = useState<Date>(subYears(new Date(), 1))
  const [financialData, setFinancialData] = useState<any>(null)

  useEffect(() => {
    handleSearch()
  }, [])

  const handleSearch = async () => {
    if (ticker && date) {
      const data = await fetchFinancialData(ticker, date)
      setFinancialData(data)
      setOpen(false)
    }
  }

  const recommendationStyle = (recommendation: string) => {
    switch (recommendation) {
      case 'buy':
        return 'bg-green-500 hover:bg-green-600'
      case 'sell':
        return 'bg-red-500 hover:bg-red-600'
      case 'hold':
        return 'bg-yellow-500 hover:bg-yellow-600'
      default:
        return 'bg-gray-500 hover:bg-gray-600'
    }
  }

  const formatValue = (value: number) => {
    if (Math.abs(value) >= 1e9) {
      return `${(value / 1e9).toFixed(2)}B`
    }
    if (Math.abs(value) >= 1e6) {
      return `${(value / 1e6).toFixed(2)}M`
    }
    if (Math.abs(value) >= 1e3) {
      return `${(value / 1e3).toFixed(2)}K`
    }
    return value.toFixed(2)
  }

  return (
    <ResizablePanelGroup direction="vertical" className="min-h-screen">
      <ResizablePanel defaultSize={20}>
        <div className="flex flex-col items-center justify-center space-y-4 p-6 bg-muted">
          {financialData ? (
            <>
              <h1 className="text-3xl font-bold">{financialData.name} ({financialData.ticker})</h1>
              <p className="text-lg">
                Period: {format(date, "PPP")} - {format(new Date(), "PPP")}
              </p>
              <div className="flex space-x-4">
                <p className="text-lg">Current Price: ${financialData.currentPrice}</p>
                <p className="text-lg">Calculated Value: ${financialData.calculatedValue}</p>
              </div>
              <Button
                className={cn("text-white", recommendationStyle(financialData.recommendation))}
                onClick={() => setOpen(true)}
              >
                {financialData.recommendation.toUpperCase()}
              </Button>
            </>
          ) : (
            <p className="text-lg">Loading financial data...</p>
          )}
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={80}>
        <ScrollArea className="h-full">
          {financialData ? (
            <div className="space-y-6 p-6">
              <h2 className="text-2xl font-semibold mb-4">Financial Ratios</h2>
              {Object.entries(financialData.ratios).map(([category, ratios]: [string, any]) => (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="capitalize">{category.replace(/([A-Z])/g, ' $1').trim()}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(ratios).map(([ratio, value]: [string, any]) => (
                        <div key={ratio} className="flex justify-between">
                          <span className="font-medium capitalize">{ratio.replace(/([A-Z])/g, ' $1').trim()}:</span>
                          <span>{formatValue(value as number)}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-muted-foreground">Loading financial data...</p>
            </div>
          )}
        </ScrollArea>
      </ResizablePanel>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Enter stock ticker..." value={ticker} onValueChange={setTicker} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Select Date">
              <CommandItem>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date: Date | undefined) => date && setDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </CommandItem>
            </CommandGroup>
          </CommandList>
          <div className="p-2">
            <Button className="w-full" onClick={handleSearch} disabled={!ticker || !date}>
              Search
            </Button>
          </div>
        </Command>
      </CommandDialog>
    </ResizablePanelGroup>
  )
}