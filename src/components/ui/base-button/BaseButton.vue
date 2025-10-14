<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import { computed, ref, type HTMLAttributes } from 'vue'
import type { BaseButton, ButtonVariants } from '.'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { buttonVariants } from '.'
import {
  BaseTooltip,
  BaseTooltipProvider,
  BaseTooltipTrigger,
  BaseTooltipContent,
} from '@/components/ui/base-tooltip'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  disabled?: boolean
  tooltip?: string
}

defineEmits<{
  (e: 'click', event: MouseEvent): void
  (e: 'keydown', event: KeyboardEvent): void
}>()

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
})

const buttonRef = ref<InstanceType<typeof BaseButton> | null>(null)

const stateClasses = computed(() => {
  return props.disabled ? 'opacity-50 cursor-not-allowed' : ''
})

function ifEnabled(action: (...args: unknown[]) => unknown) {
  if (!props.disabled) {
    action()
  }
}

function focus() {
  buttonRef.value?.$el.focus()
}

defineExpose({
  focus,
})
</script>

<template>
  <BaseTooltipProvider>
    <BaseTooltip>
      <BaseTooltipTrigger as-child>
        <Primitive
          ref="buttonRef"
          data-slot="button"
          :as="as"
          :as-child="asChild"
          :class="cn(buttonVariants({ variant, size }), props.class, stateClasses)"
          @click.stop.prevent="ifEnabled(() => $emit('click', $event))"
          @keydown.enter.space.stop.prevent="ifEnabled(() => $emit('click', $event))"
        >
          <slot />
        </Primitive>
      </BaseTooltipTrigger>
      <BaseTooltipContent v-if="tooltip">
        <p>{{ tooltip }}</p>
      </BaseTooltipContent>
    </BaseTooltip>
  </BaseTooltipProvider>
</template>
