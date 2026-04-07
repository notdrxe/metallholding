<template>
  <header class="header">
    <div class="brand">
      <div>
        <p class="company-name">Металл-холдинг</p>
        <p class="company-years">29 лет успешной работы</p>
      </div>
    </div>

    <nav class="main-nav">
      <button
        v-for="item in menu"
        :key="item.key"
        class="nav-button"
        :class="{ active: currentPage === item.key }"
        @click="$emit('navigate', item.key)"
      >
        {{ item.label }}
      </button>
    </nav>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  currentPage: 'home' | 'catalog' | 'admin'
}>()

defineEmits<{
  navigate: [page: 'home' | 'catalog' | 'admin']
}>()

const menu = [
  { key: 'home', label: 'Главная' },
  { key: 'catalog', label: 'Каталог' },
  { key: 'admin', label: 'Админ' },
] as const
</script>
