<template>
  <section class="section order-flow order-flow--done">
    <div class="order-done-card" role="status">
      <span class="order-done-icon" aria-hidden="true">✓</span>
      <h1 class="order-flow__title">Ваш заказ оформлен</h1>
      <p class="order-flow__lead">
        Спасибо за обращение к «Металл-Холдинг». <strong>Ссылка на оплату</strong> и <strong>полная информация по заказу</strong> отправлены на указанный при оформлении адрес электронной почты
        (если вы его указали).
      </p>
      <p class="order-flow__text">
        Проверьте папку «Входящие» и при необходимости — «Спам». Если письма нет в течение нескольких минут, позвоните нам — продублируем реквизиты и статус по телефону.
      </p>
      <div class="order-flow__actions order-flow__actions--center">
        <RouterLink class="accent-btn" :to="{ name: 'catalog' }">В каталог</RouterLink>
        <RouterLink class="accent-btn accent-btn--outline" :to="{ name: 'home' }">На главную</RouterLink>
      </div>
      <p class="order-flow__footer-contact">
        Телефон:
        <a :href="`tel:${brandContacts.phoneTel}`">{{ brandContacts.phone }}</a>
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { brandContacts } from '@/constants/brand'
</script>
