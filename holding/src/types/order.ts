export const PENDING_ORDER_STORAGE_KEY = 'metallholding-pending-order'

export type CheckoutOrderPayload = {
  customer: {
    name: string
    phone: string
    email: string
    comment: string
  }
  items: Array<{
    id: number
    name: string
    quantity: number
    price_rub: number
  }>
  total_rub: number
  at: string
}
