import { computed, onMounted, reactive, ref } from 'vue'

export type Product = {
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

export type CatalogSort = 'default' | 'price-asc' | 'price-desc' | 'name'

type ProductPayload = Omit<Product, 'id'>

/** GET: список товаров из MySQL (PDO), простой JSON-массив. */
const CATALOG_URL =
  import.meta.env.VITE_CATALOG_URL ||
  (import.meta.env.DEV ? '/api/catalog.php' : 'http://localhost:8080/api/catalog.php')

/** POST/PUT/DELETE: админка. */
const ADMIN_API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? '/api/products.php' : 'http://localhost:8080/api/products.php')

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

let loadStarted = false

export function useProducts() {
  const categoryFilter = ref('')
  const priceMin = ref<number | null>(null)
  const priceMax = ref<number | null>(null)
  const sortBy = ref<CatalogSort>('default')

  const categories = computed(() => {
    const set = new Set<string>()
    for (const p of products.value) {
      if (p.category) set.add(p.category)
    }
    return [...set].sort((a, b) => a.localeCompare(b, 'ru'))
  })

  const filteredProducts = computed(() => {
    const text = search.value.trim().toLowerCase()

    const minP = priceMin.value
    const maxP = priceMax.value
    const lo = minP != null && maxP != null ? Math.min(minP, maxP) : minP
    const hi = minP != null && maxP != null ? Math.max(minP, maxP) : maxP

    let list = products.value.filter((item) => {
      if (categoryFilter.value && item.category !== categoryFilter.value) return false
      if (lo != null && item.price_rub < lo) return false
      if (hi != null && item.price_rub > hi) return false
      if (!text) return true
      return (
        item.name.toLowerCase().includes(text) ||
        item.description.toLowerCase().includes(text) ||
        item.category.toLowerCase().includes(text)
      )
    })

    const next = [...list]
    switch (sortBy.value) {
      case 'price-asc':
        next.sort((a, b) => a.price_rub - b.price_rub)
        break
      case 'price-desc':
        next.sort((a, b) => b.price_rub - a.price_rub)
        break
      case 'name':
        next.sort((a, b) => a.name.localeCompare(b.name, 'ru'))
        break
      default:
        break
    }
    return next
  })

  function resetCatalogFilters() {
    categoryFilter.value = ''
    priceMin.value = null
    priceMax.value = null
    sortBy.value = 'default'
  }

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
      const response = await fetch(CATALOG_URL)
      const data: unknown = await response.json().catch(() => null)
      if (!response.ok) {
        const body = data as { error?: string } | null
        throw new Error(body?.error || `Ошибка загрузки каталога (${response.status})`)
      }
      if (!Array.isArray(data)) {
        throw new Error('Сервер вернул не массив товаров — проверьте URL API.')
      }
      products.value = data as Product[]
      if (selected.value) {
        selected.value = products.value.find((item) => item.id === selected.value?.id) ?? null
      }
    } catch (err) {
      if (err instanceof TypeError && import.meta.env.DEV) {
        error.value =
          'Не удалось связаться с API. Запустите бэкенд: в папке holding/backend/public выполните php -S 127.0.0.1:8080 и перезапустите npm run dev.'
      } else {
        error.value = err instanceof Error ? err.message : 'Ошибка загрузки каталога.'
      }
    } finally {
      loading.value = false
    }
  }

  async function createProduct() {
    const response = await fetch(ADMIN_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (!response.ok) throw new Error('Не удалось добавить товар.')
  }

  async function updateProduct(id: number) {
    const response = await fetch(`${ADMIN_API_URL}?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (!response.ok) throw new Error('Не удалось обновить товар.')
  }

  async function removeProduct(id: number) {
    const response = await fetch(`${ADMIN_API_URL}?id=${id}`, { method: 'DELETE' })
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

  onMounted(() => {
    if (!loadStarted) {
      loadStarted = true
      void loadProducts()
    }
  })

  return {
    products,
    loading,
    error,
    search,
    categoryFilter,
    priceMin,
    priceMax,
    sortBy,
    categories,
    selected,
    isEditing,
    form,
    filteredProducts,
    resetCatalogFilters,
    loadProducts,
    submitForm,
    startCreate,
    startEdit,
    deleteSelected,
    fillForm,
  }
}
