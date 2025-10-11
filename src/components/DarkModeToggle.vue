<script setup lang="ts">
import { BaseButton } from '@/components/ui/base-button'
import { Icon } from '@iconify/vue'
import { useColorMode } from '@vueuse/core'

const mode = useColorMode({ initialValue: 'system', disableTransition: false })

function toggleDarkMode() {
  mode.value = mode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <BaseButton variant="outline" @click="toggleDarkMode">
    <Icon icon="radix-icons:half-2" class="h-[1.2rem] w-[1.2rem]" />
    <span class="sr-only">Toggle dark mode</span>
  </BaseButton>
</template>
