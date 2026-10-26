import { createRouter, createWebHistory } from 'vue-router'
import CatalogView from '../views/catalogView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'

const routes = [
    {
        path: '/',
        name: 'Catalog',
        component: CatalogView
    },
    {
        path: '/products/:id',
        name: 'ProductDetail',
        component: ProductDetailView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
