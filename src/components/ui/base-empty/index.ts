import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as BaseEmpty } from './BaseEmpty.vue'
export { default as BaseEmptyContent } from './BaseEmptyContent.vue'
export { default as BaseEmptyDescription } from './BaseEmptyDescription.vue'
export { default as BaseEmptyHeader } from './BaseEmptyHeader.vue'
export { default as BaseEmptyMedia } from './BaseEmptyMedia.vue'
export { default as BaseEmptyTitle } from './BaseEmptyTitle.vue'

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
