import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../../components/ui/chart"
import type { DataChartProps } from "../../types/dashboard.types"

const chartData = [
  { month: "January", desktop: 186, sales: 120, revenue: 5000 },
  { month: "February", desktop: 305, sales: 210, revenue: 6200 },
  { month: "March", desktop: 237, sales: 180, revenue: 5800 },
  { month: "April", desktop: 73, sales: 90, revenue: 4200 },
  { month: "May", desktop: 209, sales: 150, revenue: 6100 },
  { month: "June", desktop: 214, sales: 200, revenue: 7000 },
]

const DataChart = ({ title, description, dataKey, barColor }: DataChartProps) => {
  const chartConfig: ChartConfig = {
    [dataKey]: {
      label: title,
      color: barColor,
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="h-64"> {/* Ensure fixed height */}
        {/* Keep ChartContainer to provide context for ChartTooltipContent */}
        <ChartContainer config={chartConfig} className="w-full h-full">
          <BarChart data={chartData} width={500} height={250}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey={dataKey} fill={barColor} radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total {title.toLowerCase()} for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}

export default DataChart