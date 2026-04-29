<template>
  <section class="section admin">
    <div class="admin-top">
      <h2>Админ-панель каталога</h2>
      <button type="button" class="accent-btn" @click="startCreate">Новый товар</button>
    </div>

    <form class="admin-form" @submit.prevent="submitForm">
      <input v-model="form.name" required placeholder="Название" />
      <input v-model="form.category" required placeholder="Категория" />
      <input v-model="form.image" required placeholder="URL изображения" />
      <input v-model="form.thickness" required placeholder="Толщина (например 2 мм)" />
      <input v-model.number="form.length_mm" required type="number" min="1" placeholder="Длина, мм" />
      <input v-model.number="form.width_mm" required type="number" min="1" placeholder="Ширина, мм" />
      <input v-model.number="form.price_rub" required type="number" min="1" placeholder="Цена, руб" />
      <textarea v-model="form.description" required rows="4" placeholder="Описание"></textarea>
      <button class="accent-btn" type="submit">
        {{ isEditing ? 'Сохранить изменения' : 'Добавить товар' }}
      </button>
    </form>

    <p v-if="error" class="state error">{{ error }}</p>

    <div class="admin-list">
      <article v-for="product in products" :key="product.id" class="admin-item">
        <div>
          <h3>{{ product.name }}</h3>
          <p>{{ product.category }} • {{ product.price_rub }} руб</p>
        </div>
        <div class="admin-actions">
          <button type="button" @click="startEdit(product)">Редактировать</button>
          <button type="button" class="danger" @click="deleteSelected(product)">Удалить</button>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useProducts } from '@/composables/useProducts'

const { products, error, isEditing, form, submitForm, startCreate, startEdit, deleteSelected } =
  useProducts()
</script>
