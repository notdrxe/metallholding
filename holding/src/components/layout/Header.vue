<template>
  <header class="header header--dark">
    <div class="header-top">
      <div class="brand">
        <div class="brand-mark" aria-hidden="true">
          <svg class="brand-crane" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8 38V18h6v20H8zm6-22V8l20 8v8H14zm20 0h6v22h-6V16zm-8 8v14h-4V24h4z"
              fill="currentColor"
              opacity="0.9"
            />
            <path d="M4 38h40v2H4v-2z" fill="currentColor" />
          </svg>
        </div>
        <div>
          <p class="company-name">Металл-холдинг</p>
          <p class="company-years">29 лет успешной работы</p>
        </div>
      </div>
      <a class="header-phone" :href="`tel:${phoneTel}`">
        <span class="header-phone__label">Владимир</span>
        <span class="header-phone__num">{{ phone }}</span>
      </a>
    </div>

    <nav class="main-nav" aria-label="Основное меню">
      <RouterLink
        v-for="item in menu"
        :key="item.name"
        v-slot="{ navigate, isExactActive }"
        :to="{ name: item.name }"
        custom
      >
        <button
          type="button"
          class="nav-button"
          :class="{ active: isExactActive }"
          @click="navigate"
        >
          {{ item.label }}
        </button>
      </RouterLink>
      <RouterLink v-slot="{ navigate, isActive }" :to="{ name: 'cart' }" custom>
        <button type="button" class="nav-button nav-button--cart" :class="{ active: isActive }" @click="navigate">
          Корзина
          <span v-if="itemCount > 0" class="cart-badge">{{ itemCount > 99 ? '99+' : itemCount }}</span>
        </button>
      </RouterLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useCart } from '@/composables/useCart'
import { brandContacts } from '@/constants/brand'

const { itemCount } = useCart()
const phone = brandContacts.phone
const phoneTel = brandContacts.phoneTel

const menu = [
  { name: 'about' as const, label: 'О компании' },
  { name: 'home' as const, label: 'Главная' },
  { name: 'catalog' as const, label: 'Каталог' },
]
</script>
