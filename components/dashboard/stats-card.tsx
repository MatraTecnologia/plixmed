import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string | number
  change?: string
  icon?: React.ElementType
  trend?: "up" | "down" | "neutral"
  className?: string
  iconClassName?: string
}

export function StatsCard({ title, value, change, icon: Icon, trend, className, iconClassName }: StatsCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && (
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
            <Icon className={cn("h-4 w-4", iconClassName || "text-muted-foreground")} />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p
            className={cn(
              "text-xs",
              trend === "up" && "text-emerald-500",
              trend === "down" && "text-rose-500",
              !trend && "text-muted-foreground",
            )}
          >
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
