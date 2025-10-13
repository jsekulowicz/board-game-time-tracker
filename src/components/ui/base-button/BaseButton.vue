<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'
import type { ButtonVariants } from '.'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { buttonVariants } from '.'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
})

const stateClasses = computed(() => {
  return props.disabled ? 'opacity-50 cursor-not-allowed' : ''
})
</script>

<template>
  <Primitive
    data-slot="button"
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class, stateClasses)"
  >
    <slot />
  </Primitive>
</template>
