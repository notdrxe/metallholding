<template>
  <section v-if="order" class="section order-flow">
    <p class="eyebrow">Завершение заказа</p>
    <h1 class="order-flow__title">Подтверждение оплаты</h1>
    <p class="order-flow__lead">
      Проверьте состав заказа и сумму. После нажатия кнопки заявка будет зафиксирована: <strong>ссылка на оплату</strong> и
      <strong>все детали заказа</strong> мы направим на указанный при оформлении e-mail.
    </p>

    <div class="order-summary-card">
      <h2 class="order-summary-card__h">Состав заказа</h2>
      <ul class="order-summary-list">
        <li v-for="row in order.items" :key="row.id" class="order-summary-row">
          <span class="order-summary-row__name">{{ row.name }}</span>
          <span class="order-summary-row__qty">{{ row.quantity }} × {{ row.price_rub }} ₽</span>
          <span class="order-summary-row__sum">{{ row.quantity * row.price_rub }} ₽</span>
        </li>
      </ul>
      <p class="order-summary-total">Итого: <strong>{{ order.total_rub }} ₽</strong></p>
      <div class="order-summary-meta">
        <p><span class="order-summary-meta__k">Заказчик:</span> {{ order.customer.name }}</p>
        <p><span class="order-summary-meta__k">Телефон:</span> {{ order.customer.phone }}</p>
        <p v-if="order.customer.email">
          <span class="order-summary-meta__k">Email:</span> {{ order.customer.email }}
        </p>
        <p v-if="order.customer.comment">
          <span class="order-summary-meta__k">Комментарий:</span> {{ order.customer.comment }}
        </p>
      </div>
    </div>

    <p class="order-flow__hint">
      После подтверждения менеджер обработает заявку: в письме вы получите ссылку на оплату и все реквизиты.
    </p>

    <div class="order-flow__actions">
      <button type="button" class="accent-btn" @click="confirm">Подтвердить и завершить оформление</button>
      <RouterLink class="accent-btn accent-btn--outline" :to="{ name: 'home' }">На главную</RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { PENDING_ORDER_STORAGE_KEY, type CheckoutOrderPayload } from '@/types/order'

const router = useRouter()
const order = ref<CheckoutOrderPayload | null>(null)

onMounted(() => {
  const raw = sessionStorage.getItem(PENDING_ORDER_STORAGE_KEY)
  if (!raw) {
    router.replace({ name: 'cart' })
    return
  }
  try {
    order.value = JSON.parse(raw) as CheckoutOrderPayload
  } catch {
    router.replace({ name: 'cart' })
  }
})

function confirm() {
  sessionStorage.removeItem(PENDING_ORDER_STORAGE_KEY)
  router.push({ name: 'order-complete' })
}
</script>
