<template>
  <footer class="footer">
    <div class="footer-grid">
      <div class="footer-col footer-col--brand">
        <p class="footer-title">ООО «ТК «Металл-Холдинг»</p>
        <p class="footer-tag">Поставки чёрного металлопроката · с 1996 года</p>
        <p class="footer-note">
          Каталог и заказ онлайн, консультации по сортаменту. Прайс-листы и детали по запросу — звоните или пишите из формы заказа.
        </p>
      </div>
      <div class="footer-col">
        <p class="footer-heading">Контакты</p>
        <p class="footer-line">
          <a :href="`tel:${brandContacts.phoneTel}`">{{ brandContacts.phone }}</a>
        </p>
        <p class="footer-line">{{ brandContacts.addressMain }}</p>
        <p class="footer-line muted">Склады: {{ brandContacts.addressWh2 }} · {{ brandContacts.addressWh3 }}</p>
      </div>
      <div class="footer-col">
        <p class="footer-heading">Навигация</p>
        <div class="footer-links">
          <RouterLink to="/about">О компании</RouterLink>
          <RouterLink to="/">Главная</RouterLink>
          <RouterLink to="/catalog">Каталог</RouterLink>
          <RouterLink to="/cart">Корзина</RouterLink>
          <RouterLink to="/about">Партнёры и сотрудничество</RouterLink>
        </div>
      </div>
    </div>
    <p class="copyright">© {{ year }} ООО «ТК «Металл-Холдинг» · г. {{ brandContacts.city }}</p>
  </footer>
</template>

<script setup lang="ts">
import { brandContacts } from '@/constants/brand'

const year = new Date().getFullYear()
</script>
