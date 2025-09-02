"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface AnalyticsCardProps {
  title: string
  description?: string
  children: React.ReactNode
  tabs?: { value: string; label: string }[]
  defaultTab?: string
  allowDownload?: boolean
  helpText?: string
  className?: string
  footerContent?: React.ReactNode
}

export function AnalyticsCard({
  title,
  description,
  children,
  tabs,
  defaultTab,
  allowDownload = false,
  helpText,
  className,
  footerContent,
}: AnalyticsCardProps) {
  const [period, setPeriod] = useState("30d")

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CardTitle>{title}</CardTitle>
              {helpText && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{helpText}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          <div className="flex items-center gap-2">
            {tabs ? null : (
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="h-8 w-[120px]">
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">7 dias</SelectItem>
                  <SelectItem value="30d">30 dias</SelectItem>
                  <SelectItem value="90d">90 dias</SelectItem>
                  <SelectItem value="1y">1 ano</SelectItem>
                </SelectContent>
              </Select>
            )}
            {allowDownload && (
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Download className="h-4 w-4" />
                <span className="sr-only">Baixar dados</span>
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      {tabs ? (
        <Tabs defaultValue={defaultTab || tabs[0].value} className="px-4">
          <TabsList className="mb-4">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="space-y-4">
              {children}
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <CardContent>{children}</CardContent>
      )}
      {footerContent && <CardFooter>{footerContent}</CardFooter>}
    </Card>
  )
}
