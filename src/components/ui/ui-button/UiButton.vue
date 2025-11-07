<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import { computed, ref, type HTMLAttributes } from 'vue'
import type { UiButton, ButtonVariants } from '.'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { buttonVariants } from '.'
import { UiTooltip, UiTooltipProvider, UiTooltipTrigger, UiTooltipContent } from '@/components/ui/ui-tooltip'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  disabled?: boolean
  tooltip?: string | null
  type?: string
}

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
  (e: 'keydown', event: KeyboardEvent): void
}>()

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  type: 'button',
})

const buttonRef = ref<InstanceType<typeof UiButton> | null>(null)

const stateClasses = computed(() => {
  return props.disabled ? 'opacity-50 cursor-not-allowed' : ''
})

function onClick(event: MouseEvent) {
  if (props.disabled) {
    return
  }

  if (props.type !== 'submit') {
    event.preventDefault()
    event.stopPropagation()
  }

  emit('click', event)
}

function focus() {
  buttonRef.value?.$el.focus()
}

defineExpose({
  focus,
})
</script>

<template>
  <UiTooltipProvider>
    <UiTooltip>
      <UiTooltipTrigger as-child>
        <Primitive
          ref="buttonRef"
          data-slot="button"
          :class="cn(buttonVariants({ variant, size }), props.class, stateClasses)"
          :as="as"
          :as-child="asChild"
          :type
          @click="onClick"
          @keydown.enter.space="onClick"
        >
          <slot />
        </Primitive>
      </UiTooltipTrigger>
      <UiTooltipContent v-if="tooltip">
        <p>{{ tooltip }}</p>
      </UiTooltipContent>
    </UiTooltip>
  </UiTooltipProvider>
</template>
