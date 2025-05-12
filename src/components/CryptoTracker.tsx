"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, ChevronDown, Info } from "lucide-react"
import { Card, CardContent } from "~/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"
import PriceChart from "~/components/price-chart"
import { formatCurrency } from "~/lib/utils"
import { coinData, historicalData } from "~/lib/mock-data"

export default function CryptoTracker() {
  const [selectedCoin, setSelectedCoin] = useState("bitcoin")
  const [timeframe, setTimeframe] = useState("1w")

  const coin = coinData.find((c) => c.id === selectedCoin)!
  const priceChangeIsPositive = coin.priceChangePercentage24h > 0

  return (
    <Card className="w-full max-w-4xl bg-gray-800 border-gray-700 rounded-3xl overflow-hidden shadow-2xl p-0">
      <CardContent className="p-0">
        {/* Header Section */}
        <div className="bg-gray-900 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">Crypto Tracker</h1>
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 transition-colors px-4 py-2 rounded-lg text-white">
                  <img src={coin.image || "/placeholder.svg"} alt={coin.name} className="w-6 h-6 rounded-full" />
                  <span>{coin.name}</span>
                  <ChevronDown className="w-4 h-4 opacity-70" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-0 bg-gray-800 border-gray-700">
                <div className="py-2">
                  {coinData.map((c) => (
                    <button
                      key={c.id}
                      className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-700 transition-colors ${
                        c.id === selectedCoin ? "bg-gray-700" : ""
                      }`}
                      onClick={() => setSelectedCoin(c.id)}
                    >
                      <img src={c.image || "/placeholder.svg"} alt={c.name} className="w-6 h-6 bg-white rounded-full p-1" />
                      <span className="text-white">{c.name}</span>
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-white">{formatCurrency(coin.currentPrice)}</span>
                <span
                  className={`flex items-center text-lg ${priceChangeIsPositive ? "text-emerald-400" : "text-red-400"}`}
                >
                  {priceChangeIsPositive ? (
                    <ArrowUp className="w-5 h-5 mr-1" />
                  ) : (
                    <ArrowDown className="w-5 h-5 mr-1" />
                  )}
                  {Math.abs(coin.priceChangePercentage24h).toFixed(2)}%
                </span>
              </div>
              <div className="mt-2 text-gray-400">Market Cap: {formatCurrency(coin.marketCap)}</div>
            </div>

            <Tabs value={timeframe} onValueChange={setTimeframe} className="w-fit">
              <TabsList className="bg-gray-700">
                <TabsTrigger value="1d" className="text-sm">
                  1D
                </TabsTrigger>
                <TabsTrigger value="1w" className="text-sm">
                  1W
                </TabsTrigger>
                <TabsTrigger value="1m" className="text-sm">
                  1M
                </TabsTrigger>
                <TabsTrigger value="1y" className="text-sm">
                  1Y
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Chart Section */}
        <div className="h-[300px] w-full px-4 pt-4 pb-2">
        <PriceChart data={historicalData[selectedCoin][timeframe]} isPositive={priceChangeIsPositive} />
        </div>

        {/* Stats Section */}
        <div className="p-6 bg-gray-800">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-700 rounded-xl p-4">
              <div className="text-gray-400 text-sm mb-1">All Time High</div>
              <div className="text-white text-lg font-medium">{formatCurrency(coin.allTimeHigh)}</div>
            </div>
            <div className="bg-gray-700 rounded-xl p-4">
              <div className="text-gray-400 text-sm mb-1">All Time Low</div>
              <div className="text-white text-lg font-medium">{formatCurrency(coin.allTimeLow)}</div>
            </div>
            <div className="bg-gray-700 rounded-xl p-4">
              <div className="text-gray-400 text-sm mb-1">24h High</div>
              <div className="text-white text-lg font-medium">{formatCurrency(coin.high24h)}</div>
            </div>
            <div className="bg-gray-700 rounded-xl p-4">
              <div className="text-gray-400 text-sm mb-1">24h Low</div>
              <div className="text-white text-lg font-medium">{formatCurrency(coin.low24h)}</div>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-300 leading-relaxed">{coin.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}