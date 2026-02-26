import { TrendingUp, TrendingDown, BarChart2 } from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Cell,
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../ui/chart"
import type { DataChartProps } from "../../types/dashboard.types"

const chartData = [
  { month: "January", desktop: 186, sales: 120, revenue: 5000 },
  { month: "February", desktop: 305, sales: 210, revenue: 6200 },
  { month: "March", desktop: 237, sales: 180, revenue: 5800 },
  { month: "April", desktop: 73, sales: 90, revenue: 4200 },
  { month: "May", desktop: 209, sales: 150, revenue: 6100 },
  { month: "June", desktop: 214, sales: 200, revenue: 7000 },
]

function getTrend(dataKey: string) {
  const last = chartData[chartData.length - 1][dataKey as keyof typeof chartData[0]] as number
  const prev = chartData[chartData.length - 2][dataKey as keyof typeof chartData[0]] as number
  const pct = (((last - prev) / prev) * 100).toFixed(1)
  return { pct: Math.abs(Number(pct)), up: last >= prev }
}
interface RoundedBarProps {
  x?: number
  y?: number
  width?: number
  height?: number
  fill?: string
}
const RoundedBar = ({ x = 0, y = 0, width = 0, height = 0, fill }: RoundedBarProps) => {
  const radius = 6
  if (!height || height <= 0) return null
  return (
    <path
      d={`
        M${x},${y + height}
        L${x},${y + radius}
        Q${x},${y} ${x + radius},${y}
        L${x + width - radius},${y}
        Q${x + width},${y} ${x + width},${y + radius}
        L${x + width},${y + height}
        Z
      `}
      fill={fill}
    />
  )
}

const DataChart = ({ title, description, dataKey }: DataChartProps) => {
  const { pct, up } = getTrend(dataKey)

  const chartConfig: ChartConfig = {
    [dataKey]: {
      label: title,
      color: "#ea580c",
    },
  }

  const maxVal = Math.max(...chartData.map((d) => d[dataKey as keyof typeof d] as number))

  return (
    <Card
      className="relative overflow-hidden border-0 shadow-xl"
      style={{
        background: "linear-gradient(145deg, #ffffff 0%, #fff7ed 60%, #ffedd5 100%)",
        boxShadow:
          "0 20px 60px -10px rgba(234, 88, 12, 0.18), 0 4px 20px rgba(0,0,0,0.06)",
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-xl"
        style={{
          background: "linear-gradient(90deg, #ea580c, #f97316, #fb923c)",
        }}
      />

      <div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-5"
        style={{ background: "#ea580c" }}
      />
      <div
        className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full opacity-5"
        style={{ background: "#ea580c" }}
      />

      <CardHeader className="pb-2 pt-6 px-6">
        <div className="flex items-start justify-between">
          <div>
            <CardDescription
              className="text-xs font-semibold uppercase tracking-widest mb-1"
              style={{ color: "#ea580c" }}
            >
              Analytics
            </CardDescription>
            <CardTitle
              className="text-2xl font-bold tracking-tight"
              style={{ color: "#1c1917" }}
            >
              {title}
            </CardTitle>
          </div>
          {/* Icon badge */}
          <div
            className="flex items-center justify-center w-10 h-10 rounded-xl"
            style={{ background: "linear-gradient(135deg, #ea580c, #f97316)" }}
          >
            <BarChart2 className="w-5 h-5 text-white" />
          </div>
        </div>
        <CardDescription className="text-sm mt-1" style={{ color: "#78716c" }}>
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-6 pb-0">
        {/* Summary stat strip */}
        <div
          className="flex items-center gap-3 mb-4 px-4 py-2.5 rounded-xl"
          style={{ background: "rgba(234, 88, 12, 0.06)", border: "1px solid rgba(234,88,12,0.12)" }}
        >
          <span className="text-2xl font-black" style={{ color: "#ea580c" }}>
            {chartData[chartData.length - 1][dataKey as keyof typeof chartData[0]]}
          </span>
          <div className="flex flex-col">
            <span className="text-xs font-medium" style={{ color: "#78716c" }}>
              Latest month
            </span>
            <div className="flex items-center gap-1">
              {up ? (
                <TrendingUp className="w-3 h-3" style={{ color: "#16a34a" }} />
              ) : (
                <TrendingDown className="w-3 h-3" style={{ color: "#dc2626" }} />
              )}
              <span
                className="text-xs font-bold"
                style={{ color: up ? "#16a34a" : "#dc2626" }}
              >
                {up ? "+" : "-"}{pct}%
              </span>
              <span className="text-xs" style={{ color: "#a8a29e" }}>
                vs last month
              </span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <ChartContainer config={chartConfig} className="w-full" style={{ height: "200px" }}>
          <BarChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="orangeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f97316" stopOpacity={1} />
                <stop offset="100%" stopColor="#ea580c" stopOpacity={0.85} />
              </linearGradient>
              <linearGradient id="orangeGradDim" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fed7aa" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#fdba74" stopOpacity={0.7} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#f0e8e0" strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fill: "#a8a29e", fontSize: 11, fontWeight: 500 }}
              tickFormatter={(v) => v.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#a8a29e", fontSize: 10 }}
              tickCount={4}
            />
            <ChartTooltip
              cursor={{ fill: "rgba(234,88,12,0.06)", rx: 6 }}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey={dataKey} shape={<RoundedBar />} maxBarSize={48}>
              {chartData.map((entry, index) => {
                const val = entry[dataKey as keyof typeof entry] as number
                const isMax = val === maxVal
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={isMax ? "url(#orangeGrad)" : "url(#orangeGradDim)"}
                    style={{
                      filter: isMax
                        ? "drop-shadow(0 4px 12px rgba(234,88,12,0.45))"
                        : "none",
                      transition: "filter 0.2s",
                    }}
                  />
                )
              })}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex items-center justify-between px-6 pt-4 pb-5">
        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{
              background: up ? "rgba(22,163,74,0.1)" : "rgba(220,38,38,0.1)",
              color: up ? "#16a34a" : "#dc2626",
            }}
          >
            {up ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5" />
            )}
            {up ? "+" : "-"}{pct}% this month
          </div>
        </div>
        <div className="text-xs" style={{ color: "#a8a29e" }}>
          Last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}

export default DataChart