<template>

  <section class="section cart-section">

    <h1 class="cart-title">Корзина</h1>



    <p v-if="lines.length === 0" class="state">Корзина пуста. Перейдите в <RouterLink to="/catalog" class="cart-link">каталог</RouterLink>.</p>



    <template v-else>

      <ul class="cart-list">

        <li v-for="line in lines" :key="line.product.id" class="cart-row">

          <img :src="line.product.image" :alt="line.product.name" class="cart-row__img" />

          <div class="cart-row__info">

            <h2>{{ line.product.name }}</h2>

            <p class="cart-row__meta">{{ line.product.category }}</p>

            <p class="cart-row__price">{{ line.product.price_rub }} ₽ × {{ line.quantity }} = {{ line.product.price_rub * line.quantity }} ₽</p>

          </div>

          <div class="cart-row__qty">

            <button type="button" class="qty-btn" aria-label="Меньше" @click="dec(line)">−</button>

            <span class="qty-val">{{ line.quantity }}</span>

            <button type="button" class="qty-btn" aria-label="Больше" @click="inc(line)">+</button>

          </div>

          <button type="button" class="cart-row__remove" @click="removeLine(line.product.id)">Удалить</button>

        </li>

      </ul>



      <div class="cart-summary">

        <p class="cart-total">Итого: <strong>{{ totalRub }} ₽</strong></p>

      </div>



      <form class="checkout-form" @submit.prevent="submitOrder">

        <h2 class="checkout-heading">Оформление заказа</h2>

        <label class="checkout-field">

          <span>Имя *</span>

          <input v-model.trim="form.name" name="name" required autocomplete="name" />

        </label>

        <label class="checkout-field">

          <span>Телефон *</span>

          <input v-model.trim="form.phone" name="phone" type="tel" required autocomplete="tel" placeholder="+7 …" />

        </label>

        <label class="checkout-field">

          <span>Email</span>

          <input v-model.trim="form.email" name="email" type="email" autocomplete="email" />

        </label>

        <label class="checkout-field checkout-field--full">

          <span>Адрес доставки / комментарий</span>

          <textarea v-model.trim="form.comment" name="comment" rows="3" placeholder="Город, удобное время…"></textarea>

        </label>

        <button type="submit" class="accent-btn checkout-submit" :disabled="submitting">

          {{ submitting ? 'Отправка…' : 'Оформить заказ' }}

        </button>

      </form>

    </template>

  </section>

</template>



<script setup lang="ts">

import { reactive, ref } from 'vue'

import { useRouter } from 'vue-router'

import type { CartLine } from '@/composables/useCart'

import { useCart } from '@/composables/useCart'

import { PENDING_ORDER_STORAGE_KEY, type CheckoutOrderPayload } from '@/types/order'



const router = useRouter()

const { lines, totalRub, setQuantity, removeLine, clear } = useCart()



const submitting = ref(false)



const form = reactive({

  name: '',

  phone: '',

  email: '',

  comment: '',

})



function inc(line: CartLine) {

  setQuantity(line.product.id, line.quantity + 1)

}



function dec(line: CartLine) {

  if (line.quantity <= 1) {

    removeLine(line.product.id)

  } else {

    setQuantity(line.product.id, line.quantity - 1)

  }

}



async function submitOrder() {

  submitting.value = true

  try {

    await new Promise((r) => setTimeout(r, 400))

    const payload: CheckoutOrderPayload = {

      customer: { ...form },

      items: lines.value.map((l) => ({

        id: l.product.id,

        name: l.product.name,

        quantity: l.quantity,

        price_rub: l.product.price_rub,

      })),

      total_rub: totalRub.value,

      at: new Date().toISOString(),

    }

    sessionStorage.setItem(PENDING_ORDER_STORAGE_KEY, JSON.stringify(payload))

    try {

      localStorage.setItem('metallholding-last-order', JSON.stringify(payload))

    } catch {

      /* ignore */

    }

    clear()

    await router.push({ name: 'order-payment' })

  } finally {

    submitting.value = false

  }

}

</script>

