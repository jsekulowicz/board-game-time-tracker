<script setup lang="ts">
import { computed } from 'vue'
import '@jsekulowicz/ds-components/text-field/define'

type TextFieldValue = string | number

const props = withDefaults(
  defineProps<{
    modelValue?: TextFieldValue
    defaultValue?: TextFieldValue
    type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number'
    size?: 'sm' | 'md' | 'lg'
    placeholder?: string
    inputLabel?: string
    label?: string
    description?: string
    error?: string
    invalid?: boolean
    required?: boolean
    disabled?: boolean
    name?: string
    autocomplete?: string
  }>(),
  {
    type: 'text',
    size: 'md',
    placeholder: '',
    inputLabel: '',
    label: '',
    description: '',
    error: '',
  },
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
  (event: 'input', value: string): void
  (event: 'change', value: string): void
}>()

const currentValue = computed(() => String(props.modelValue ?? props.defaultValue ?? ''))

function detailValue(event: Event) {
  return (event as CustomEvent<{ value: string }>).detail.value
}

function isOwnEvent(event: Event) {
  return (event.target as HTMLElement | null)?.tagName === 'DS-TEXT-FIELD'
}

function onInput(event: Event) {
  if (!isOwnEvent(event)) return
  const value = detailValue(event)
  emit('update:modelValue', value)
  emit('input', value)
}

function onChange(event: Event) {
  if (!isOwnEvent(event)) return
  const value = detailValue(event)
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<template>
  <ds-text-field
    :value.prop="currentValue"
    :type="type"
    :size="size"
    :placeholder="placeholder"
    :input-label="inputLabel"
    :label="label"
    :description="description"
    :error="error"
    :invalid="invalid"
    :required="required"
    :disabled="disabled"
    :name="name"
    :autocomplete="autocomplete"
    @ds-input="onInput"
    @ds-change="onChange"
  >
    <span v-if="$slots.leading" slot="leading">
      <slot name="leading" />
    </span>
    <span v-if="$slots.trailing" slot="trailing">
      <slot name="trailing" />
    </span>
  </ds-text-field>
</template>
