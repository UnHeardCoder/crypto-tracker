"use client"

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card } from "~/components/ui/card"
import { formatCurrency } from "~/lib/utils"

interface PriceChartProps {
  data: Array<{ timestamp: number; price: number }>
  isPositive: boolean
}

export default function PriceChart({ data, isPositive }: PriceChartProps) {
  const gradientColor = isPositive ? "#10b981" : "#ef4444"

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <defs>
          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={gradientColor} stopOpacity={0.3} />
            <stop offset="95%" stopColor={gradientColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="timestamp"
          tickFormatter={(timestamp) => {
            const date = new Date(timestamp)
            return date.toLocaleDateString(undefined, { month: "short", day: "numeric" })
          }}
          stroke="#9ca3af"
          tickLine={false}
          axisLine={false}
          fontSize={12}
        />
        <YAxis
          domain={["auto", "auto"]}
          tickFormatter={(value) => formatCurrency(value, true)}
          stroke="#9ca3af"
          tickLine={false}
          axisLine={false}
          width={60}
          fontSize={12}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <Card className="bg-gray-900 border-gray-700 p-2 shadow-lg">
                  <div className="text-xs text-gray-300">{new Date(payload[0].payload.timestamp).toLocaleString()}</div>
                  <div className="font-medium text-white">{formatCurrency(payload[0].value as number)}</div>
                </Card>
              )
            }
            return null
          }}
        />
        <Area
          type="monotone"
          dataKey="price"
          stroke={gradientColor}
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorPrice)"
          dot={false}
          activeDot={{ r: 6, fill: gradientColor, strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
