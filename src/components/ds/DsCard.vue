<script setup lang="ts">
import '@jsekulowicz/ds-components/card/define'

withDefaults(
  defineProps<{
    elevation?: 'none' | 'sm' | 'md'
    orientation?: 'vertical' | 'horizontal'
    interactive?: boolean
  }>(),
  {
    elevation: 'sm',
    orientation: 'vertical',
  },
)
</script>

<template>
  <ds-card :elevation="elevation" :orientation="orientation" :interactive="interactive">
    <span v-if="$slots.eyebrow" slot="eyebrow">
      <slot name="eyebrow" />
    </span>
    <span v-if="$slots.title" slot="title">
      <slot name="title" />
    </span>
    <slot />
    <div v-if="$slots.actions" slot="actions">
      <slot name="actions" />
    </div>
    <div v-if="$slots.footer" slot="footer">
      <slot name="footer" />
    </div>
  </ds-card>
</template>
