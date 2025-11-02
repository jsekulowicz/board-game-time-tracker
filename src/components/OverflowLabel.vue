<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, nextTick, type HTMLAttributes } from 'vue'
import { BaseTooltipProvider, BaseTooltip, BaseTooltipTrigger, BaseTooltipContent } from '@/components/ui/base-tooltip'
import { cn } from '@/lib/utils'

const props = defineProps<{
  text: string
  class?: HTMLAttributes['class']
}>()

const labelRef = ref<HTMLElement | null>(null)
const isOverflowing = ref(false)
let resizeObserver: ResizeObserver | null = null
let debounceTimer: number | null = null

onMounted(() => {
  checkOverflow()

  const el = labelRef.value
  if (el && 'ResizeObserver' in window) {
    resizeObserver = new ResizeObserver(() => debouncedCheckOverflow())
    resizeObserver.observe(el)
  }
})

onBeforeUnmount(() => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }

  if (resizeObserver && labelRef.value) {
    resizeObserver.unobserve(labelRef.value)
    resizeObserver.disconnect()
  }
})

watch(
  () => props.text,
  async () => {
    await nextTick()
    checkOverflow()
  },
)

function debouncedCheckOverflow(delayInMs = 100) {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
  debounceTimer = window.setTimeout(() => {
    checkOverflow()
  }, delayInMs)
}

function checkOverflow() {
  const el = labelRef.value
  if (el) {
    isOverflowing.value = el.scrollWidth > el.clientWidth
  }
}
</script>

<template>
  <BaseTooltipProvider>
    <BaseTooltip>
      <BaseTooltipTrigger as-child>
        <span ref="labelRef" :class="cn(props.class, 'block whitespace-nowrap overflow-hidden truncate overflow-ellipsis')">
          {{ text }}
        </span>
      </BaseTooltipTrigger>

      <BaseTooltipContent v-if="isOverflowing">
        <span>{{ text }}</span>
      </BaseTooltipContent>
    </BaseTooltip>
  </BaseTooltipProvider>
</template>
