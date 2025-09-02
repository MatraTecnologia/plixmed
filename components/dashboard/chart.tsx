"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface ChartProps {
  data: { name: string; value: number }[]
  height?: number
  className?: string
  animated?: boolean
  showValues?: boolean
  color?: string
  type?: "bar" | "line" | "area"
}

export function Chart({
  data,
  height = 300,
  className,
  animated = true,
  showValues = true,
  color = "hsl(var(--primary))",
  type = "bar",
}: ChartProps) {
  const [isVisible, setIsVisible] = useState(false)
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (chartRef.current) {
      observer.observe(chartRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  const maxValue = Math.max(...data.map((item) => item.value))

  if (type === "line" || type === "area") {
    // Criar pontos para o gráfico de linha
    const points = data
      .map((item, index) => {
        const x = (index / (data.length - 1)) * 100
        const y = 100 - (item.value / maxValue) * 100
        return `${x},${y}`
      })
      .join(" ")

    return (
      <div ref={chartRef} className={cn("w-full overflow-hidden", className)} style={{ height: `${height}px` }}>
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          {type === "area" && (
            <polygon
              points={`0,100 ${points} 100,100`}
              fill={color}
              fillOpacity="0.2"
              className={cn(animated && isVisible ? "animate-fill-opacity" : "")}
            />
          )}
          <polyline
            points={points}
            fill="none"
            stroke={color}
            strokeWidth="2"
            className={cn(animated && isVisible ? "animate-draw-line" : "")}
          />
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 100
            const y = 100 - (item.value / maxValue) * 100
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="2"
                fill={color}
                className={cn(animated && isVisible ? "animate-fade-in" : "")}
                style={{ animationDelay: `${index * 100}ms` }}
              />
            )
          })}
        </svg>
        <div className="flex justify-between mt-2 px-2">
          {data.map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-xs">{item.name}</div>
              {showValues && <div className="text-xs font-medium">{item.value}</div>}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div ref={chartRef} className={cn("flex h-full items-end gap-2", className)} style={{ height: `${height}px` }}>
      {data.map((item, index) => (
        <div key={index} className="relative flex flex-1 flex-col items-center">
          <div
            className={cn(
              "w-full rounded-t transition-all duration-1000",
              animated && isVisible ? "animate-grow-height" : "h-0",
            )}
            style={{
              height: isVisible ? `${(item.value / maxValue) * 80}%` : "0%",
              backgroundColor: color,
              animationDelay: `${index * 100}ms`,
            }}
          ></div>
          <span className="mt-2 text-xs">{item.name}</span>
          {showValues && (
            <span
              className={cn(
                "absolute text-xs font-medium transition-opacity",
                animated && isVisible ? "opacity-100" : "opacity-0",
              )}
              style={{
                bottom: `calc(${(item.value / maxValue) * 80}% + 4px)`,
                transitionDelay: `${index * 100 + 500}ms`,
              }}
            >
              {item.value}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
