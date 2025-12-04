import type { Component, Ref } from 'vue'
import { createContext } from 'reka-ui'

export { default as UiChartContainer } from './UiChartContainer.vue'
export { default as UiChartLegendContent } from './UiChartLegendContent.vue'
export { default as UiChartTooltipContent } from './UiChartTooltipContent.vue'
export { componentToString } from './utils'

// Format: { THEME_NAME: CSS_SELECTOR }
export const THEMES = { light: '', dark: '.dark' } as const

export type UiChartConfig = {
  [k in string]: {
    label?: string | Component
    icon?: string | Component
  } & ({ color?: string; theme?: never } | { color?: never; theme: Record<keyof typeof THEMES, string> })
}

interface ChartContextProps {
  id: string
  config: Ref<UiChartConfig>
}

export const [useChart, provideChartContext] = createContext<ChartContextProps>('Chart')

export { VisCrosshair as UiChartCrosshair, VisTooltip as UiChartTooltip } from '@unovis/vue'
