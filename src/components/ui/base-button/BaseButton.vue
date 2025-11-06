<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import { computed, ref, type HTMLAttributes } from 'vue'
import type { BaseButton, ButtonVariants } from '.'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { buttonVariants } from '.'
import { BaseTooltip, BaseTooltipProvider, BaseTooltipTrigger, BaseTooltipContent } from '@/components/ui/base-tooltip'

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

const buttonRef = ref<InstanceType<typeof BaseButton> | null>(null)

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
  <BaseTooltipProvider>
    <BaseTooltip>
      <BaseTooltipTrigger as-child>
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
      </BaseTooltipTrigger>
      <BaseTooltipContent v-if="tooltip">
        <p>{{ tooltip }}</p>
      </BaseTooltipContent>
    </BaseTooltip>
  </BaseTooltipProvider>
</template>
