<script setup lang="ts">
import { RouterView } from 'vue-router'

import UiSonner from './components/ui/ui-sonner/UiSonner.vue'
import 'vue-sonner/style.css'
</script>

<template>
  <UiSonner />
  <RouterView />
</template>
