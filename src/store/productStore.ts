import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Product } from '../types/product'
import {
  getCategories,
  getProducts,
} from '../services/productService'

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])
  const categories = ref<string[]>([])
  const searchQuery = ref('')
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const hasLoaded = ref(false)

  async function loadCatalog() {
    if(isLoading.value) return
    isLoading.value = true
    error.value = null

    try{
        const [productsData, categoriesData] = await Promise.all([
            getProducts(),
            getCategories()
        ])
        products.value = productsData
        categories.value = categoriesData
        hasLoaded.value = true
    } catch (err) {
        error.value = 'Failed to load products'
    } finally {
        isLoading.value = false
    }
  }

  const normalizedSearchQuery = computed(() => searchQuery.value.trim().toLowerCase())

  const filteredProducts = computed(() => {
    if (!searchQuery.value) {
      return products.value
    }

    return products.value.filter(product =>
      product.title.toLowerCase().includes(normalizedSearchQuery.value)
    )
  })

  const sortedProducts = computed(() => {
    return [...filteredProducts.value].sort((a, b) => b.rating.rate - a.rating.rate)
  })

  const groupedProducts = computed(() =>
    categories.value.map((category) => ({
      category,
      products: sortedProducts .value.filter(
        (product) => product.category === category,
      ),
    })),
  )

  return {
    products,
    categories,
    searchQuery,
    loadCatalog,
    filteredProducts,
    groupedProducts,
    isLoading,
    error,
    hasLoaded
  }
})