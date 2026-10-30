import { createRouter, createWebHistory } from 'vue-router';
import ProductDetailView from '../views/ProductDetailView.vue';
import FavoriteView from '../views/FavoriteView.vue';

const routes = [
    {
        path: '/',
        name: 'Catalog',
        component: () => import('../views/CatalogView.vue')
    },
    {
        path: '/products/:id',
        name: 'ProductDetail',
        component: ProductDetailView,
    },
    {
        path: '/favorite',
        name: 'Favorite',
        component: FavoriteView
    },
    {
        path:'/:pathMatch(.*)*',
        redirect: '/',
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
