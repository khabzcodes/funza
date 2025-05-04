"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "An interactive area chart"

const chartData = [
  { date: "2024-04-01", passed: 222, failed: 150 },
  { date: "2024-04-02", passed: 97, failed: 180 },
  { date: "2024-04-03", passed: 167, failed: 120 },
  { date: "2024-04-04", passed: 242, failed: 260 },
  { date: "2024-04-05", passed: 373, failed: 290 },
  { date: "2024-04-06", passed: 301, failed: 340 },
  { date: "2024-04-07", passed: 245, failed: 180 },
  { date: "2024-04-08", passed: 409, failed: 320 },
  { date: "2024-04-09", passed: 59, failed: 110 },
  { date: "2024-04-10", passed: 261, failed: 190 },
  { date: "2024-04-11", passed: 327, failed: 350 },
  { date: "2024-04-12", passed: 292, failed: 210 },
  { date: "2024-04-13", passed: 342, failed: 380 },
  { date: "2024-04-14", passed: 137, failed: 220 },
  { date: "2024-04-15", passed: 120, failed: 170 },
  { date: "2024-04-16", passed: 138, failed: 190 },
  { date: "2024-04-17", passed: 446, failed: 360 },
  { date: "2024-04-18", passed: 364, failed: 410 },
  { date: "2024-04-19", passed: 243, failed: 180 },
  { date: "2024-04-20", passed: 89, failed: 150 },
  { date: "2024-04-21", passed: 137, failed: 200 },
  { date: "2024-04-22", passed: 224, failed: 170 },
  { date: "2024-04-23", passed: 138, failed: 230 },
  { date: "2024-04-24", passed: 387, failed: 290 },
  { date: "2024-04-25", passed: 215, failed: 250 },
  { date: "2024-04-26", passed: 75, failed: 130 },
  { date: "2024-04-27", passed: 383, failed: 420 },
  { date: "2024-04-28", passed: 122, failed: 180 },
  { date: "2024-04-29", passed: 315, failed: 240 },
  { date: "2024-04-30", passed: 454, failed: 380 },
  { date: "2024-05-01", passed: 165, failed: 220 },
  { date: "2024-05-02", passed: 293, failed: 310 },
  { date: "2024-05-03", passed: 247, failed: 190 },
  { date: "2024-05-04", passed: 385, failed: 420 },
  { date: "2024-05-05", passed: 481, failed: 390 },
  { date: "2024-05-06", passed: 498, failed: 520 },
  { date: "2024-05-07", passed: 388, failed: 300 },
  { date: "2024-05-08", passed: 149, failed: 210 },
  { date: "2024-05-09", passed: 227, failed: 180 },
  { date: "2024-05-10", passed: 293, failed: 330 },
  { date: "2024-05-11", passed: 335, failed: 270 },
  { date: "2024-05-12", passed: 197, failed: 240 },
  { date: "2024-05-13", passed: 197, failed: 160 },
  { date: "2024-05-14", passed: 448, failed: 490 },
  { date: "2024-05-15", passed: 473, failed: 380 },
  { date: "2024-05-16", passed: 338, failed: 400 },
  { date: "2024-05-17", passed: 499, failed: 420 },
  { date: "2024-05-18", passed: 315, failed: 350 },
  { date: "2024-05-19", passed: 235, failed: 180 },
  { date: "2024-05-20", passed: 177, failed: 230 },
  { date: "2024-05-21", passed: 82, failed: 140 },
  { date: "2024-05-22", passed: 81, failed: 120 },
  { date: "2024-05-23", passed: 252, failed: 290 },
  { date: "2024-05-24", passed: 294, failed: 220 },
  { date: "2024-05-25", passed: 201, failed: 250 },
  { date: "2024-05-26", passed: 213, failed: 170 },
  { date: "2024-05-27", passed: 420, failed: 460 },
  { date: "2024-05-28", passed: 233, failed: 190 },
  { date: "2024-05-29", passed: 78, failed: 130 },
  { date: "2024-05-30", passed: 340, failed: 280 },
  { date: "2024-05-31", passed: 178, failed: 230 },
  { date: "2024-06-01", passed: 178, failed: 200 },
  { date: "2024-06-02", passed: 470, failed: 410 },
  { date: "2024-06-03", passed: 103, failed: 160 },
  { date: "2024-06-04", passed: 439, failed: 380 },
  { date: "2024-06-05", passed: 88, failed: 140 },
  { date: "2024-06-06", passed: 294, failed: 250 },
  { date: "2024-06-07", passed: 323, failed: 370 },
  { date: "2024-06-08", passed: 385, failed: 320 },
  { date: "2024-06-09", passed: 438, failed: 480 },
  { date: "2024-06-10", passed: 155, failed: 200 },
  { date: "2024-06-11", passed: 92, failed: 150 },
  { date: "2024-06-12", passed: 492, failed: 420 },
  { date: "2024-06-13", passed: 81, failed: 130 },
  { date: "2024-06-14", passed: 426, failed: 380 },
  { date: "2024-06-15", passed: 307, failed: 350 },
  { date: "2024-06-16", passed: 371, failed: 310 },
  { date: "2024-06-17", passed: 475, failed: 520 },
  { date: "2024-06-18", passed: 107, failed: 170 },
  { date: "2024-06-19", passed: 341, failed: 290 },
  { date: "2024-06-20", passed: 408, failed: 450 },
  { date: "2024-06-21", passed: 169, failed: 210 },
  { date: "2024-06-22", passed: 317, failed: 270 },
  { date: "2024-06-23", passed: 480, failed: 530 },
  { date: "2024-06-24", passed: 132, failed: 180 },
  { date: "2024-06-25", passed: 141, failed: 190 },
  { date: "2024-06-26", passed: 434, failed: 380 },
  { date: "2024-06-27", passed: 448, failed: 490 },
  { date: "2024-06-28", passed: 149, failed: 200 },
  { date: "2024-06-29", passed: 103, failed: 160 },
  { date: "2024-06-30", passed: 446, failed: 400 },
]

const chartConfig = {
  visitors: {
    label: "Assessments",
  },
  passed: {
    label: "Passed",
    color: "var(--primary)",
  },
  failed: {
    label: "Failed",
    color: "var(--destructive)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Assessments</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total assessments for the last 3 months
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillPassed" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-passed)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-passed)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillFailed" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-failed)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-failed)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            {/* <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 10}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            /> */}
            <Area
              dataKey="failed"
              type="natural"
              fill="url(#fillFailed)"
              stroke="var(--color-failed)"
              stackId="a"
            />
            <Area
              dataKey="passed"
              type="natural"
              fill="url(#fillPassed)"
              stroke="var(--color-passed)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
