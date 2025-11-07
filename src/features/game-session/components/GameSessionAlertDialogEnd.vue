<script setup lang="ts">
import {
  UiAlertDialog,
  UiAlertDialogAction,
  UiAlertDialogCancel,
  UiAlertDialogContent,
  UiAlertDialogDescription,
  UiAlertDialogFooter,
  UiAlertDialogHeader,
  UiAlertDialogTitle,
  UiAlertDialogTrigger,
} from '@/components/ui/ui-alert-dialog'
</script>

<template>
  <UiAlertDialog>
    <UiAlertDialogTrigger as-child>
      <slot name="trigger" />
    </UiAlertDialogTrigger>
    <UiAlertDialogContent>
      <UiAlertDialogHeader>
        <UiAlertDialogTitle>Are you sure you want to end the game session?</UiAlertDialogTitle>
        <UiAlertDialogDescription>
          This action cannot be undone. You will not be able to track players within this session.
        </UiAlertDialogDescription>
      </UiAlertDialogHeader>
      <UiAlertDialogFooter>
        <UiAlertDialogCancel>Keep tracking</UiAlertDialogCancel>
        <UiAlertDialogAction class="bg-destructive" @click="$emit('continue')">End game session</UiAlertDialogAction>
      </UiAlertDialogFooter>
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>
