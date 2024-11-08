'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TrendingUp, TrendingDown } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const portfolioData = [
  { id: 1, ticker: "AAPL", name: "Apple Inc.", quantity: 100, avgBuyPrice: 140, currentPrice: 150.25, totalValue: 15025, returnPercentage: 7.32 },
  { id: 2, ticker: "GOOGL", name: "Alphabet Inc.", quantity: 50, avgBuyPrice: 2000, currentPrice: 2150.75, totalValue: 107537.50, returnPercentage: 7.54 },
  { id: 3, ticker: "MSFT", name: "Microsoft Corporation", quantity: 75, avgBuyPrice: 220, currentPrice: 235.50, totalValue: 17662.50, returnPercentage: 7.05 },
]

const performanceData = [
  { name: 'Jan', value: 100000 },
  { name: 'Feb', value: 105000 },
  { name: 'Mar', value: 110000 },
  { name: 'Apr', value: 108000 },
  { name: 'May', value: 115000 },
  { name: 'Jun', value: 120000 },
]

export default function Portfolio() {
  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-screen">
      <ResizablePanel defaultSize={100}>
        <ScrollArea className="h-full">
          <div className="space-y-6 p-6">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Holdings</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticker</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Avg Buy Price</TableHead>
                      <TableHead>Current Price</TableHead>
                      <TableHead>Total Value</TableHead>
                      <TableHead>Return %</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {portfolioData.map((stock) => (
                      <TableRow key={stock.id}>
                        <TableCell>{stock.ticker}</TableCell>
                        <TableCell>{stock.name}</TableCell>
                        <TableCell>{stock.quantity}</TableCell>
                        <TableCell>${stock.avgBuyPrice.toFixed(2)}</TableCell>
                        <TableCell>${stock.currentPrice.toFixed(2)}</TableCell>
                        <TableCell>${stock.totalValue.toFixed(2)}</TableCell>
                        <TableCell>
                          <span className={stock.returnPercentage >= 0 ? "text-green-500" : "text-red-500"}>
                            {stock.returnPercentage >= 0 ? <TrendingUp className="inline mr-1" /> : <TrendingDown className="inline mr-1" />}
                            {stock.returnPercentage.toFixed(2)}%
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className="mr-2">Buy</Button>
                          <Button variant="outline" size="sm">Sell</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
