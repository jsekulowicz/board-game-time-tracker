<script setup lang="ts">
import { computed } from 'vue'
import '@jsekulowicz/ds-components/color-picker/define'
import type { ColorPickerOption } from '@jsekulowicz/ds-components/color-picker'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    defaultValue?: string
    colors?: ColorPickerOption[]
    label?: string
    placeholder?: string
    description?: string
    error?: string
    invalid?: boolean
    required?: boolean
    disabled?: boolean
    clearable?: boolean
    compact?: boolean
    name?: string
  }>(),
  {
    colors: () => [],
    label: '',
    placeholder: 'Select a color',
    description: '',
    error: '',
  },
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
  (event: 'input', value: string): void
  (event: 'change', value: string): void
}>()

const currentValue = computed(() => props.modelValue ?? props.defaultValue ?? '')

function detailValue(event: Event) {
  return (event as CustomEvent<{ value: string }>).detail.value
}

function onInput(event: Event) {
  const value = detailValue(event)
  emit('update:modelValue', value)
  emit('input', value)
}

function onChange(event: Event) {
  const value = detailValue(event)
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<template>
  <ds-color-picker
    :value.prop="currentValue"
    :colors.prop="colors"
    :label="label"
    :placeholder="placeholder"
    :description="description"
    :error="error"
    :invalid="invalid"
    :required="required"
    :disabled="disabled"
    :clearable="clearable"
    :compact="compact"
    :name="name"
    @ds-input="onInput"
    @ds-change="onChange"
  />
</template>
