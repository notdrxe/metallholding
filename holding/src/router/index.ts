import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import HomeView from '@/views/HomeView.vue'
import CatalogView from '@/views/CatalogView.vue'
import AboutView from '@/views/AboutView.vue'
import AdminView from '@/views/AdminView.vue'
import CartView from '@/views/CartView.vue'
import OrderPaymentView from '@/views/OrderPaymentView.vue'
import OrderCompleteView from '@/views/OrderCompleteView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        { path: '', name: 'home', component: HomeView },
        { path: 'catalog', name: 'catalog', component: CatalogView },
        { path: 'cart', name: 'cart', component: CartView },
        { path: 'order/payment', name: 'order-payment', component: OrderPaymentView },
        { path: 'order/complete', name: 'order-complete', component: OrderCompleteView },
        { path: 'about', name: 'about', component: AboutView },
        { path: 'admin', name: 'admin', component: AdminView },
      ],
    },
  ],
})

export default router
