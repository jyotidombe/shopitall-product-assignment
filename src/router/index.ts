import { createRouter, createWebHistory } from 'vue-router'
import CatalogView from '../views/CatalogView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import FavoriteView from '../views/FavoriteView.vue'

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
    },
    {
        path: '/favorite',
        name: 'Favorite',
        component: FavoriteView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
