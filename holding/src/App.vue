<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'

type Page = 'home' | 'catalog' | 'admin'

type Product = {
  id: number
  name: string
  category: string
  image: string
  description: string
  thickness: string
  length_mm: number
  width_mm: number
  price_rub: number
}

type ProductPayload = Omit<Product, 'id'>

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/products.php'

const page = ref<Page>('home')
const products = ref<Product[]>([])
const loading = ref(false)
const error = ref('')
const search = ref('')
const selected = ref<Product | null>(null)
const isEditing = ref(false)

const form = reactive<ProductPayload>({
  name: '',
  category: '',
  image: '',
  description: '',
  thickness: '',
  length_mm: 1000,
  width_mm: 1000,
  price_rub: 1000,
})

const filteredProducts = computed(() => {
  const text = search.value.trim().toLowerCase()
  if (!text) return products.value
  return products.value.filter(
    (item) =>
      item.name.toLowerCase().includes(text) ||
      item.description.toLowerCase().includes(text) ||
      item.category.toLowerCase().includes(text)
  )
})

function fillForm(product?: Product) {
  if (!product) {
    Object.assign(form, {
      name: '',
      category: '',
      image: '',
      description: '',
      thickness: '',
      length_mm: 1000,
      width_mm: 1000,
      price_rub: 1000,
    })
    return
  }

  Object.assign(form, {
    name: product.name,
    category: product.category,
    image: product.image,
    description: product.description,
    thickness: product.thickness,
    length_mm: product.length_mm,
    width_mm: product.width_mm,
    price_rub: product.price_rub,
  })
}

async function loadProducts() {
  loading.value = true
  error.value = ''
  try {
    const response = await fetch(API_URL)
    if (!response.ok) throw new Error('Не удалось загрузить товары.')
    products.value = await response.json()
    if (selected.value) {
      selected.value = products.value.find((item) => item.id === selected.value?.id) ?? null
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Ошибка загрузки каталога.'
  } finally {
    loading.value = false
  }
}

async function createProduct() {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  })
  if (!response.ok) throw new Error('Не удалось добавить товар.')
}

async function updateProduct(id: number) {
  const response = await fetch(`${API_URL}?id=${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  })
  if (!response.ok) throw new Error('Не удалось обновить товар.')
}

async function removeProduct(id: number) {
  const response = await fetch(`${API_URL}?id=${id}`, { method: 'DELETE' })
  if (!response.ok) throw new Error('Не удалось удалить товар.')
}

async function submitForm() {
  error.value = ''
  try {
    if (isEditing.value && selected.value) {
      await updateProduct(selected.value.id)
    } else {
      await createProduct()
    }
    fillForm()
    selected.value = null
    isEditing.value = false
    await loadProducts()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Ошибка сохранения.'
  }
}

function startCreate() {
  selected.value = null
  isEditing.value = false
  fillForm()
}

function startEdit(product: Product) {
  selected.value = product
  isEditing.value = true
  fillForm(product)
}

async function deleteSelected(product: Product) {
  if (!confirm(`Удалить "${product.name}"?`)) return
  error.value = ''
  try {
    await removeProduct(product.id)
    if (selected.value?.id === product.id) {
      selected.value = null
      isEditing.value = false
      fillForm()
    }
    await loadProducts()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Ошибка удаления.'
  }
}

onMounted(loadProducts)
</script>

<template>
  <main class="app-shell">
    <Header :current-page="page" @navigate="page = $event" />

    <section v-if="page === 'home'" class="section home">
      <div class="hero-grid">
        <article class="hero-card">
          <h2>Металл-холдинг</h2>
          <p>Поставки черного металлопроката со склада и напрямую от комбинатов-производителей.</p>
          <button class="accent-btn" @click="page = 'catalog'">Подробнее</button>
        </article>
        <article class="hero-card second">
          <h2>Мы держим в наличии</h2>
          <p>Широкий ассортимент продукции, который постоянно обновляется.</p>
          <button class="accent-btn" @click="page = 'catalog'">В каталог</button>
        </article>
      </div>
    </section>

    <section v-if="page === 'catalog'" class="section">
      <div class="controls">
        <input v-model="search" class="search" placeholder="Искать по каталогу" />
        <button class="filter-btn">Фильтры</button>
      </div>

      <p v-if="loading" class="state">Загрузка...</p>
      <p v-else-if="error" class="state error">{{ error }}</p>

      <div v-else class="catalog-grid">
        <article
          v-for="product in filteredProducts"
          :key="product.id"
          class="product-card"
          @click="selected = product"
        >
          <img :src="product.image" :alt="product.name" />
          <h3>{{ product.name }}</h3>
          <p>{{ product.category }}</p>
        </article>
      </div>

      <article v-if="selected" class="details-card">
        <div class="details-media">
          <img :src="selected.image" :alt="selected.name" />
        </div>
        <div class="details-text">
          <p>{{ selected.description }}</p>
        </div>
        <div class="details-meta">
          <h2>{{ selected.name }}</h2>
          <div class="chips">
            <span>Толщина: {{ selected.thickness }}</span>
            <span>Длина: {{ selected.length_mm }} мм</span>
            <span>Ширина: {{ selected.width_mm }} мм</span>
          </div>
          <p class="price">Итого: {{ selected.price_rub }} рубля</p>
        </div>
      </article>
    </section>

    <section v-if="page === 'admin'" class="section admin">
      <div class="admin-top">
        <h2>Админ-панель каталога</h2>
        <button class="accent-btn" @click="startCreate">Новый товар</button>
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

      <div class="admin-list">
        <article v-for="product in products" :key="product.id" class="admin-item">
          <div>
            <h3>{{ product.name }}</h3>
            <p>{{ product.category }} • {{ product.price_rub }} руб</p>
          </div>
          <div class="admin-actions">
            <button @click="startEdit(product)">Редактировать</button>
            <button class="danger" @click="deleteSelected(product)">Удалить</button>
          </div>
        </article>
      </div>
    </section>

    <Footer />
  </main>
</template>