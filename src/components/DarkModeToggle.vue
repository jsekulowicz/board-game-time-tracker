<script setup lang="ts">
import { computed } from 'vue'
import { useColorMode } from '@vueuse/core'
import { BaseButton } from '@/components/ui/base-button'
import { Icon } from '@iconify/vue'

const mode = useColorMode({ initialValue: 'system', disableTransition: false })

const toggleTooltip = computed(() => (mode.value === 'dark' ? 'Toggle light mode' : 'Toggle dark mode'))

function toggleDarkMode() {
  mode.value = mode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <BaseButton variant="outline" :tooltip="toggleTooltip" @click="toggleDarkMode">
    <Icon icon="radix-icons:half-2" />
    <span class="sr-only">Toggle dark mode</span>
  </BaseButton>
</template>
