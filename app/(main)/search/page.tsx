'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CalendarIcon } from "lucide-react"
import { format, subYears } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"

// Mock function to fetch financial data
const fetchFinancialData = async (ticker: string, period: Date) => {
  // This would be replaced with an actual API call
  return {
    name: "Apple Inc.",
    ticker: ticker,
    currentPrice: 150.25,
    calculatedValue: 165.75,
    recommendation: "buy",
    news: [
      { title: "Apple Launches New iPhone", summary: "Apple unveils its latest smartphone with advanced AI capabilities.", sentiment: "positive" },
      { title: "Supply Chain Concerns", summary: "Potential disruptions in Apple's supply chain may affect production.", sentiment: "negative" },
      { title: "Q3 Earnings Report", summary: "Apple's Q3 earnings meet analyst expectations.", sentiment: "neutral" }
    ],
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

export default function SearchPage() {
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

  const sentimentStyle = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-500'
      case 'negative':
        return 'text-red-500'
      default:
        return 'text-yellow-500'
    }
  }

  const formatValue = (value: number) => {
    if (Math.abs(value) >= 1e9) {
      return (value / 1e9).toFixed(2) + 'B'
    } else if (Math.abs(value) >= 1e6) {
      return (value / 1e6).toFixed(2) + 'M'
    } else if (Math.abs(value) >= 1e3) {
      return (value / 1e3).toFixed(2) + 'K'
    } else {
      return value.toFixed(2)
    }
  }

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={20}>
        <div className="flex flex-col space-y-4 p-4 bg-muted">
          <div className="flex items-center space-x-4">
            <Input
              type="text"
              placeholder="Search stocks..."
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              className="flex-grow"
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Button onClick={handleSearch}>Search</Button>
          </div>
          {financialData && (
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{financialData.name} ({financialData.ticker})</h1>
                <p className="text-sm sm:text-base md:text-lg">
                  Period: {format(date, "PPP")} - {format(new Date(), "PPP")}
                </p>
                <div className="mt-1 sm:mt-2">
                  <p className="text-sm sm:text-base md:text-lg">Current Price: ${financialData.currentPrice}</p>
                  <p className="text-sm sm:text-base md:text-lg">Calculated Value: ${financialData.calculatedValue}</p>
                </div>
              </div>
              <Button
                className={cn("text-white text-xs sm:text-sm md:text-base", recommendationStyle(financialData.recommendation))}
              >
                {financialData.recommendation.toUpperCase()}
              </Button>
            </div>
          )}
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={80}>
        <ScrollArea className="h-full">
          {financialData ? (
            <div className="space-y-4 sm:space-y-6 p-4">
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-4">News</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {financialData.news.map((item: any, index: number) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-sm sm:text-base md:text-lg">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs sm:text-sm md:text-base">{item.summary}</p>
                        <p className={cn("mt-2 font-semibold text-xs sm:text-sm", sentimentStyle(item.sentiment))}>
                          Sentiment: {item.sentiment}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-4">Financial Ratios</h2>
                {Object.entries(financialData.ratios).map(([category, ratios]: [string, any]) => (
                  <Card key={category} className="mb-4">
                    <CardHeader>
                      <CardTitle className="capitalize text-base sm:text-lg md:text-xl">{category.replace(/([A-Z])/g, ' $1').trim()}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {Object.entries(ratios).map(([ratio, value]: [string, number]) => (
                          <div key={ratio} className="flex justify-between items-center py-1 border-b last:border-b-0">
                            <span className="font-medium capitalize text-xs sm:text-sm md:text-base">{ratio.replace(/([A-Z])/g, ' $1').trim()}:</span>
                            <span className="text-xs sm:text-sm md:text-base">{formatValue(value)}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg">Loading financial data...</p>
            </div>
          )}
        </ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
