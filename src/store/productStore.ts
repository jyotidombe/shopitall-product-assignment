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
    if(isLoading.value  || hasLoaded.value) return
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
    if (!normalizedSearchQuery.value) {
      return products.value
    }

    return products.value.filter(product =>
      product.title.toLowerCase().includes(normalizedSearchQuery.value)
    )
  })

  const sortedProducts = computed(() => {
    return [...filteredProducts.value].sort((a, b) => {
      if(b.rating.rate === a.rating.rate) {
        return b.rating.count - a.rating.count;
      }
      return b.rating.rate - a.rating.rate;
    });
  });

  const groupedProducts = computed(() => {
    const productsByCategory = new Map<string, Product[]>();
    for(const product of sortedProducts.value) {
      const category = product.category
      if (!productsByCategory.has(category)) {
        productsByCategory.set(category, []);
      }
      productsByCategory.get(category)?.push(product);
    }

    return categories.value
      .map((category) => ({
        category,
        products: productsByCategory.get(category) || [],
      }))
      .filter((group) => group.products.length > 0)
  })

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