<template>
  <section class="section">
    <header class="catalog-intro">
      <h1>Каталог металлопроката</h1>
      <p>
        Онлайн-каталог ходовых позиций. Полный сортамент, актуальные цены и остатки по складам —
        <a :href="`tel:${brandContacts.phoneTel}`">уточняйте по телефону</a> или добавьте позиции в корзину — менеджер свяжется с вами.
        Консультация по марке и замене — в карточке товара или в заказе.
      </p>
    </header>

    <div class="controls controls--catalog">
      <input v-model="search" class="search" placeholder="Искать по каталогу" />
      <button
        type="button"
        class="filter-btn"
        :class="{ 'filter-btn--open': filtersOpen }"
        :aria-expanded="filtersOpen"
        aria-controls="catalog-filters"
        @click="filtersOpen = !filtersOpen"
      >
        Фильтры
        <span v-if="activeFilterCount > 0" class="filter-btn__badge">{{ activeFilterCount }}</span>
      </button>
    </div>

    <div
      id="catalog-filters"
      class="catalog-filters"
      :hidden="!filtersOpen"
    >
      <div class="catalog-filters__grid">
        <label class="catalog-filters__field">
          <span class="catalog-filters__label">Категория</span>
          <select v-model="categoryFilter" class="catalog-filters__select">
            <option value="">Все категории</option>
            <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
          </select>
        </label>
        <label class="catalog-filters__field">
          <span class="catalog-filters__label">Цена от, ₽</span>
          <input
            class="catalog-filters__input"
            type="number"
            inputmode="numeric"
            min="0"
            step="1"
            placeholder="нет"
            :value="priceMin ?? ''"
            @input="setPriceMin"
          />
        </label>
        <label class="catalog-filters__field">
          <span class="catalog-filters__label">Цена до, ₽</span>
          <input
            class="catalog-filters__input"
            type="number"
            inputmode="numeric"
            min="0"
            step="1"
            placeholder="нет"
            :value="priceMax ?? ''"
            @input="setPriceMax"
          />
        </label>
        <label class="catalog-filters__field">
          <span class="catalog-filters__label">Сортировка</span>
          <select v-model="sortBy" class="catalog-filters__select">
            <option value="default">Как на складе</option>
            <option value="price-asc">Цена: по возрастанию</option>
            <option value="price-desc">Цена: по убыванию</option>
            <option value="name">Название А—Я</option>
          </select>
        </label>
      </div>
      <div class="catalog-filters__foot">
        <button type="button" class="catalog-filters__reset" @click="resetCatalogFilters">
          Сбросить фильтры
        </button>
      </div>
    </div>

    <p v-if="!loading && !error" class="catalog-count">Показано: {{ filteredProducts.length }}</p>

    <p v-if="loading" class="state">Загрузка...</p>
    <p v-else-if="error" class="state error">{{ error }}</p>

    <p v-else-if="filteredProducts.length === 0" class="state catalog-empty">
      По заданным условиям ничего не найдено. Измените поиск или
      <button type="button" class="catalog-empty__link" @click="resetCatalogFilters">сбросьте фильтры</button>.
    </p>

    <div v-else class="catalog-grid">
      <article
        v-for="product in filteredProducts"
        :key="product.id"
        class="product-card"
        @click="openProduct(product)"
      >
        <img :src="product.image" :alt="product.name" />
        <h3>{{ product.name }}</h3>
        <p>{{ product.category }}</p>
      </article>
    </div>

    <Teleport to="body">
      <div
        v-if="selected"
        class="product-modal"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="modalTitleId"
      >
        <div class="product-modal__backdrop" @click="closeModal" />
        <div class="product-modal__dialog" @click.stop>
          <button type="button" class="product-modal__close" aria-label="Закрыть" @click="closeModal">
            ×
          </button>
          <div class="product-modal__grid">
            <div class="product-modal__media">
              <img :src="selected.image" :alt="selected.name" />
            </div>
            <div class="product-modal__body">
              <h2 :id="modalTitleId" class="product-modal__title">{{ selected.name }}</h2>
              <p class="product-modal__category">{{ selected.category }}</p>
              <p class="product-modal__desc">{{ selected.description }}</p>
              <div class="product-modal__chips">
                <span>Толщина: {{ selected.thickness }}</span>
                <span>Длина: {{ selected.length_mm }} мм</span>
                <span>Ширина: {{ selected.width_mm }} мм</span>
              </div>
              <p class="product-modal__price">
                {{ selected.price_rub }} ₽ <span v-if="modalQty > 1">× {{ modalQty }} = {{ selected.price_rub * modalQty }} ₽</span>
              </p>
              <div class="product-modal__cart-row">
                <div class="cart-row__qty" style="margin-right: 1rem;">
                  <button type="button" class="qty-btn" aria-label="Меньше" @click="decModalQty">−</button>
                  <span class="qty-val">{{ modalQty }}</span>
                  <button type="button" class="qty-btn" aria-label="Больше" @click="incModalQty">+</button>
                </div>
                <button type="button" class="accent-btn" @click="addSelectedToCart">В корзину</button>
              </div>
              <p v-if="addedHint" class="product-modal__hint" role="status">{{ addedHint }}</p>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import type { Product } from '@/composables/useProducts'
import { useProducts } from '@/composables/useProducts'
import { useCart } from '@/composables/useCart'
import { brandContacts } from '@/constants/brand'

const {
  loading,
  error,
  search,
  selected,
  filteredProducts,
  categories,
  categoryFilter,
  priceMin,
  priceMax,
  sortBy,
  resetCatalogFilters,
} = useProducts()

const filtersOpen = ref(true)

const activeFilterCount = computed(() => {
  let n = 0
  if (categoryFilter.value) n++
  if (priceMin.value != null) n++
  if (priceMax.value != null) n++
  if (sortBy.value !== 'default') n++
  return n
})

function setPriceMin(e: Event) {
  const v = (e.target as HTMLInputElement).value
  priceMin.value = v === '' ? null : Math.max(0, Math.floor(Number(v)))
}

function setPriceMax(e: Event) {
  const v = (e.target as HTMLInputElement).value
  priceMax.value = v === '' ? null : Math.max(0, Math.floor(Number(v)))
}
const { add } = useCart()

const modalQty = ref(1)
const addedHint = ref('')
const modalTitleId = 'product-modal-title'
let hintTimer: ReturnType<typeof setTimeout> | null = null

function incModalQty() {
  modalQty.value++
}

function decModalQty() {
  if (modalQty.value > 1) {
    modalQty.value--
  }
}

function openProduct(product: Product) {
  addedHint.value = ''
  modalQty.value = 1
  selected.value = product
}

function closeModal() {
  selected.value = null
  addedHint.value = ''
  if (hintTimer) {
    clearTimeout(hintTimer)
    hintTimer = null
  }
}

function addSelectedToCart() {
  if (!selected.value) return
  const q = Math.max(1, Math.floor(Number(modalQty.value) || 1))
  add(selected.value, q)
  addedHint.value = q > 1 ? `Добавлено в корзину: ${q} шт.` : 'Товар добавлен в корзину'
  if (hintTimer) clearTimeout(hintTimer)
  hintTimer = setTimeout(() => {
    addedHint.value = ''
    hintTimer = null
  }, 2500)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && selected.value) {
    e.preventDefault()
    closeModal()
  }
}

watch(selected, async (p) => {
  if (p) {
    document.body.classList.add('modal-open')
    await nextTick()
    window.addEventListener('keydown', onKeydown)
  } else {
    document.body.classList.remove('modal-open')
    window.removeEventListener('keydown', onKeydown)
  }
})

onBeforeUnmount(() => {
  document.body.classList.remove('modal-open')
  window.removeEventListener('keydown', onKeydown)
  if (hintTimer) clearTimeout(hintTimer)
})
</script>
