"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { cn } from "@/lib/utils"

// Importação dinâmica do ApexCharts para evitar problemas de SSR
const ReactApexChart = dynamic(() => import("react-apexcharts").then((mod) => mod.default), {
  ssr: false,
  loading: () => <div style={{ height: "350px" }}>Loading chart...</div>,
  onError: (error) => {
    console.error("Failed to load ApexCharts", error)
    return () => <div>Error loading chart. Please check console.</div>
  },
})

export interface ChartData {
  name: string
  value: number
}

interface ApexChartProps {
  data: ChartData[]
  height?: number
  className?: string
  type?: "bar" | "line" | "area" | "donut" | "radialBar"
  title?: string
  color?: string | string[]
  stacked?: boolean
  animated?: boolean
  showValues?: boolean
  xAxisTitle?: string
  yAxisTitle?: string
  theme?: "light" | "dark"
  isCurrency?: boolean
}

export function ApexChart({
  data,
  height = 350,
  className,
  type = "bar",
  title,
  color = "#4361ee",
  stacked = false,
  animated = true,
  showValues = true,
  xAxisTitle,
  yAxisTitle,
  theme = "light",
  isCurrency = true,
}: ApexChartProps) {
  const [mounted, setMounted] = useState(false)
  const [chartOptions, setChartOptions] = useState<any>({})
  const [chartSeries, setChartSeries] = useState<any>([])

  // Função para formatar valores como moeda brasileira
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(value)
  }

  // Função para formatar números com separadores de milhar
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("pt-BR").format(value)
  }

  useEffect(() => {
    setMounted(true)

    // Verificar se os dados são válidos
    if (!data || data.length === 0) {
      return
    }

    // Preparar dados para o formato que o ApexCharts espera
    const categories = data.map((item) => item.name)
    const values = data.map((item) => item.value)
    const total = values.reduce((sum, value) => sum + value, 0)

    // Configurações simplificadas para evitar problemas com eventos
    const options = {
      chart: {
        id: `basic-chart-${Math.random().toString(36).substring(2, 9)}`,
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: false, // Desativar seleção para evitar problemas
            zoom: false, // Desativar zoom para evitar problemas
            zoomin: false, // Desativar zoom in para evitar problemas
            zoomout: false, // Desativar zoom out para evitar problemas
            pan: false, // Desativar pan para evitar problemas
            reset: true,
          },
        },
        animations: {
          enabled: animated,
          easing: "easeinout",
          speed: 800,
        },
        fontFamily: "inherit",
        foreColor: theme === "dark" ? "#f8fafc" : "#64748b",
        background: "transparent",
      },
      theme: {
        mode: theme,
      },
      colors: Array.isArray(color) ? color : [color],
      title: title
        ? {
            text: title,
            align: "left",
            style: {
              fontSize: "16px",
              fontWeight: 600,
            },
          }
        : undefined,
      grid: {
        borderColor: theme === "dark" ? "#334155" : "#e2e8f0",
        strokeDashArray: 4,
        padding: {
          top: 0,
          right: 10,
          bottom: 0,
          left: 10,
        },
      },
      tooltip: {
        enabled: true,
        theme: theme,
        style: {
          fontSize: "12px",
          fontFamily: "inherit",
        },
        // Configurações melhoradas para tooltips
        custom: ({ series, seriesIndex, dataPointIndex, w }) => {
          const value = series[seriesIndex]
          const name = w.globals.labels[seriesIndex]
          const percentage = ((value / total) * 100).toFixed(1)
          const color = w.globals.colors[seriesIndex]

          const formattedValue = isCurrency ? formatCurrency(value) : formatNumber(value)

          return `
            <div class="apexcharts-tooltip-custom" style="padding: 8px; background: ${theme === "dark" ? "#1e293b" : "white"}; color: ${theme === "dark" ? "white" : "#334155"}; border-radius: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
              <div style="display: flex; align-items: center; margin-bottom: 4px;">
                <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: ${color}; margin-right: 8px;"></span>
                <span style="font-weight: 600;">${name}</span>
              </div>
              <div style="font-size: 14px; font-weight: 700;">${formattedValue}</div>
              <div style="font-size: 12px; opacity: 0.7;">${percentage}% do total</div>
            </div>
          `
        },
        intersect: true,
        shared: false,
        fixed: {
          enabled: false,
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        fontSize: "14px",
        markers: {
          width: 12,
          height: 12,
          radius: 12,
        },
        formatter: (seriesName, opts) => {
          // Adicionar o valor ao nome da série na legenda para gráficos de pizza
          if (type === "donut" || type === "radialBar") {
            const value = opts.w.globals.series[opts.seriesIndex]
            const formattedValue = isCurrency ? formatCurrency(value) : formatNumber(value)
            return `${seriesName}: ${formattedValue}`
          }
          return seriesName
        },
      },
      dataLabels: {
        enabled: showValues,
        style: {
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 500,
        },
        formatter: (val, opts) => {
          // Formatar valores para gráficos de pizza
          if (type === "donut" || type === "radialBar") {
            return ((val / total) * 100).toFixed(1) + "%"
          }

          // Formatar valores para outros tipos de gráficos
          if (isCurrency) {
            if (val >= 1000000) return "R$ " + (val / 1000000).toFixed(1) + "M"
            if (val >= 1000) return "R$ " + (val / 1000).toFixed(1) + "K"
            return "R$ " + val
          } else {
            if (val >= 1000000) return (val / 1000000).toFixed(1) + "M"
            if (val >= 1000) return (val / 1000).toFixed(1) + "K"
            return val.toString()
          }
        },
        background: {
          enabled: false,
        },
      },
      stroke: {
        curve: "smooth",
        width: type === "bar" ? 0 : 3,
      },
      xaxis: {
        categories: categories,
        title: xAxisTitle
          ? {
              text: xAxisTitle,
              style: {
                fontSize: "12px",
                fontWeight: 500,
              },
            }
          : undefined,
        labels: {
          style: {
            fontSize: "12px",
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        title: yAxisTitle
          ? {
              text: yAxisTitle,
              style: {
                fontSize: "12px",
                fontWeight: 500,
              },
            }
          : undefined,
        labels: {
          style: {
            fontSize: "12px",
          },
          formatter: (value: number) => {
            // Formatar valores grandes com K, M, etc.
            if (isCurrency) {
              if (value >= 1000000) return "R$ " + (value / 1000000).toFixed(1) + "M"
              if (value >= 1000) return "R$ " + (value / 1000).toFixed(1) + "K"
              return "R$ " + value
            } else {
              if (value >= 1000000) return (value / 1000000).toFixed(1) + "M"
              if (value >= 1000) return (value / 1000).toFixed(1) + "K"
              return value.toString()
            }
          },
        },
      },
      responsive: [
        {
          breakpoint: 640,
          options: {
            chart: {
              height: 300,
            },
            legend: {
              position: "bottom",
              horizontalAlign: "center",
            },
          },
        },
      ],
    }

    // Configurações específicas por tipo de gráfico
    if (type === "donut" || type === "radialBar") {
      setChartSeries(values)
      setChartOptions({
        ...options,
        labels: categories,
        plotOptions: {
          pie: {
            donut: {
              size: "65%",
              labels: {
                show: true,
                name: {
                  show: true,
                  fontSize: "14px",
                  fontFamily: "inherit",
                  offsetY: 0,
                },
                value: {
                  show: true,
                  fontSize: "16px",
                  fontFamily: "inherit",
                  formatter: (val) => {
                    return isCurrency ? formatCurrency(val) : formatNumber(val)
                  },
                },
                total: {
                  show: true,
                  label: "Total",
                  fontSize: "14px",
                  fontFamily: "inherit",
                  formatter: (w) => {
                    if (!w || !w.globals || !w.globals.seriesTotals) return "0"
                    const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0)
                    return isCurrency ? formatCurrency(total) : formatNumber(total)
                  },
                },
              },
            },
          },
          radialBar: {
            hollow: {
              size: "65%",
            },
            dataLabels: {
              show: true,
              name: {
                show: true,
                fontSize: "14px",
                fontFamily: "inherit",
              },
              value: {
                show: true,
                fontSize: "16px",
                fontFamily: "inherit",
                formatter: (val) => {
                  return val.toString() + "%"
                },
              },
              total: {
                show: true,
                label: "Total",
                fontSize: "14px",
                fontFamily: "inherit",
                formatter: (w) => {
                  if (!w || !w.globals || !w.globals.seriesTotals) return "0"
                  const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0)
                  return isCurrency ? formatCurrency(total) : formatNumber(total)
                },
              },
            },
          },
        },
        legend: {
          position: "bottom",
          fontSize: "14px",
          fontFamily: "inherit",
          markers: {
            width: 12,
            height: 12,
            radius: 12,
          },
          formatter: (seriesName, opts) => seriesName,
        },
      })
    } else {
      setChartSeries([
        {
          name: title || "Valor",
          data: values,
        },
      ])

      if (type === "bar") {
        setChartOptions({
          ...options,
          plotOptions: {
            bar: {
              borderRadius: 4,
              columnWidth: "60%",
              distributed: false,
              dataLabels: {
                position: "top",
              },
            },
          },
        })
      } else if (type === "area") {
        setChartOptions({
          ...options,
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.3,
              stops: [0, 90, 100],
            },
          },
        })
      } else {
        setChartOptions(options)
      }
    }
  }, [data, height, type, title, color, stacked, animated, showValues, xAxisTitle, yAxisTitle, theme, isCurrency])

  // Não renderizar nada no servidor ou antes da montagem
  if (!mounted) return <div style={{ height: `${height}px` }} className={cn("w-full", className)} />

  // Verificar se temos dados válidos para renderizar
  if (!data || data.length === 0) {
    return (
      <div
        style={{ height: `${height}px` }}
        className={cn("w-full flex items-center justify-center text-muted-foreground", className)}
      >
        Sem dados para exibir
      </div>
    )
  }

  return (
    <div className={cn("w-full", className)}>
      {mounted && chartSeries.length > 0 && Object.keys(chartOptions).length > 0 && ReactApexChart ? (
        <ReactApexChart options={chartOptions} series={chartSeries} type={type} height={height} width="100%" />
      ) : (
        <div>Failed to load chart.</div>
      )}
    </div>
  )
}
