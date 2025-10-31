<script setup lang="ts">
import {
  BaseAlertDialog,
  BaseAlertDialogAction,
  BaseAlertDialogCancel,
  BaseAlertDialogContent,
  BaseAlertDialogDescription,
  BaseAlertDialogFooter,
  BaseAlertDialogHeader,
  BaseAlertDialogTitle,
  BaseAlertDialogTrigger,
} from '@/components/ui/base-alert-dialog'
</script>

<template>
  <BaseAlertDialog>
    <BaseAlertDialogTrigger as-child>
      <slot name="trigger" />
    </BaseAlertDialogTrigger>
    <BaseAlertDialogContent>
      <BaseAlertDialogHeader>
        <BaseAlertDialogTitle>Are you sure you want to end the game session?</BaseAlertDialogTitle>
        <BaseAlertDialogDescription>
          This action cannot be undone. You will not be able to track players within this session.
        </BaseAlertDialogDescription>
      </BaseAlertDialogHeader>
      <BaseAlertDialogFooter>
        <BaseAlertDialogCancel>Keep tracking</BaseAlertDialogCancel>
        <BaseAlertDialogAction class="bg-destructive" @click="$emit('continue')">End game session</BaseAlertDialogAction>
      </BaseAlertDialogFooter>
    </BaseAlertDialogContent>
  </BaseAlertDialog>
</template>
