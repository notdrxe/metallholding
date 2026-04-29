import { computed, ref, watch } from 'vue'
import type { Product } from '@/composables/useProducts'

export type CartLine = {
  product: Product
  quantity: number
}

const STORAGE_KEY = 'metallholding-cart'

const lines = ref<CartLine[]>([])

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return
    const parsed = JSON.parse(raw) as CartLine[]
    if (Array.isArray(parsed)) {
      lines.value = parsed.filter(
        (row) =>
          row &&
          typeof row.quantity === 'number' &&
          row.product &&
          typeof row.product.id === 'number'
      )
    }
  } catch {
    lines.value = []
  }
}

let storageReady = false
function ensureStorage() {
  if (storageReady) return
  storageReady = true
  if (typeof localStorage !== 'undefined') {
    loadFromStorage()
    watch(
      lines,
      () => {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(lines.value))
        } catch {
          /* ignore */
        }
      },
      { deep: true }
    )
  }
}

export function useCart() {
  ensureStorage()

  const itemCount = computed(() =>
    lines.value.reduce((sum, line) => sum + line.quantity, 0)
  )

  const totalRub = computed(() =>
    lines.value.reduce((sum, line) => sum + line.product.price_rub * line.quantity, 0)
  )

  function add(product: Product, quantity = 1) {
    const q = Math.max(1, Math.floor(Number(quantity) || 1))
    const snap: Product = { ...product }
    const existing = lines.value.find((l) => l.product.id === snap.id)
    if (existing) {
      existing.quantity += q
    } else {
      lines.value.push({ product: snap, quantity: q })
    }
  }

  function setQuantity(productId: number, quantity: number) {
    const q = Math.max(1, Math.floor(quantity))
    const line = lines.value.find((l) => l.product.id === productId)
    if (line) line.quantity = q
  }

  function removeLine(productId: number) {
    lines.value = lines.value.filter((l) => l.product.id !== productId)
  }

  function clear() {
    lines.value = []
  }

  return {
    lines,
    itemCount,
    totalRub,
    add,
    setQuantity,
    removeLine,
    clear,
  }
}
