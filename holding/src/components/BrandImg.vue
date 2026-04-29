<template>
  <img
    :src="currentSrc"
    :alt="alt"
    :class="imgClass"
    :loading="loading"
    decoding="async"
    @error="onError"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    candidates: readonly string[]
    alt: string
    imgClass?: string
    loading?: 'lazy' | 'eager'
  }>(),
  { imgClass: '', loading: 'lazy' },
)

const index = ref(0)
const currentSrc = ref(props.candidates[0] ?? '')

watch(
  () => props.candidates,
  (c) => {
    index.value = 0
    currentSrc.value = c[0] ?? ''
  },
  { deep: true },
)

function onError() {
  const next = index.value + 1
  if (next < props.candidates.length) {
    index.value = next
    currentSrc.value = props.candidates[next]!
  }
}
</script>
