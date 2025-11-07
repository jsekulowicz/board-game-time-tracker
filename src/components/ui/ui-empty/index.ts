import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as UiEmpty } from './UiEmpty.vue'
export { default as UiEmptyContent } from './UiEmptyContent.vue'
export { default as UiEmptyDescription } from './UiEmptyDescription.vue'
export { default as UiEmptyHeader } from './UiEmptyHeader.vue'
export { default as UiEmptyMedia } from './UiEmptyMedia.vue'
export { default as UiEmptyTitle } from './UiEmptyTitle.vue'

export const emptyMediaVariants = cva('mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0', {
  variants: {
    variant: {
      default: 'bg-transparent',
      icon: "bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6",
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export type EmptyMediaVariants = VariantProps<typeof emptyMediaVariants>
