<script setup lang="ts">
import { RouterView } from 'vue-router'

import BaseSonner from './components/ui/base-sonner/BaseSonner.vue'
import 'vue-sonner/style.css'
</script>

<template>
  <BaseSonner />
  <RouterView />
</template>
