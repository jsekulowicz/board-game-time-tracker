<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import '@jsekulowicz/ds-components/button/define'
import '@jsekulowicz/ds-components/tooltip/define'

defineOptions({
  inheritAttrs: false,
})

type DsButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type DsButtonSize = 'sm' | 'md' | 'lg'
type DsButtonType = 'button' | 'submit' | 'reset'

const props = withDefaults(
  defineProps<{
    variant?: DsButtonVariant
    size?: DsButtonSize
    type?: DsButtonType
    disabled?: boolean
    loading?: boolean
    fullWidth?: boolean
    label?: string
    tooltip?: string | null
  }>(),
  {
    variant: 'primary',
    size: 'md',
    type: 'button',
    tooltip: null,
  },
)

const emit = defineEmits<{
  (event: 'click', value: MouseEvent | CustomEvent): void
}>()

const attrs = useAttrs()
const buttonRef = ref<HTMLElement | null>(null)

const layoutAttrs = computed(() => ({
  class: attrs.class,
  style: attrs.style,
}))

const buttonAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs
  return rest
})

function onClick(event: MouseEvent | CustomEvent) {
  emit('click', event)
}

function focus() {
  const innerButton = buttonRef.value?.shadowRoot?.querySelector<HTMLButtonElement>('button')
  ;(innerButton ?? buttonRef.value)?.focus()
}

defineExpose({
  focus,
})
</script>

<template>
  <ds-tooltip v-if="tooltip" v-bind="layoutAttrs" delay="150">
    <ds-button
      ref="buttonRef"
      v-bind="buttonAttrs"
      :class="attrs.class"
      :style="attrs.style"
      :variant="variant"
      :size="size"
      :type="type"
      :label="label"
      :disabled="disabled || null"
      :loading="loading || null"
      :full-width="fullWidth || null"
      @ds-click="onClick"
    >
      <slot />
    </ds-button>
    <span slot="tip">{{ tooltip }}</span>
  </ds-tooltip>

  <ds-button
    v-else
    ref="buttonRef"
    v-bind="attrs"
    :variant="variant"
    :size="size"
    :type="type"
    :label="label"
    :disabled="disabled || null"
    :loading="loading || null"
    :full-width="fullWidth || null"
    @ds-click="onClick"
  >
    <slot />
  </ds-button>
</template>
