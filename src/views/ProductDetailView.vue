<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { getProductById } from '../services/productService'
import type { Product } from '../types/product'

const route = useRoute()

const product = ref<Product | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

const productId = computed(() => Number(route.params.id))
//console.log('Current route:', route.fullPath)
//console.log('All params:', route.params)
//console.log('Product ID:', route.params.id)

onMounted(async () => {
  try {
    if (
      !Number.isInteger(productId.value) ||
      productId.value < 1
    ) {
      throw new Error('Invalid product ID')
    }

    product.value = await getProductById(productId.value)
    console.log('Fetched product:', product.value)
  } catch {
    error.value =
      'We could not find this product. Please return to the catalogue.'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <main class="detail-page">
    <RouterLink to="/" class="back-link">
      ← Back to catalogue
    </RouterLink>

    <p v-if="isLoading" role="status">
      Loading product details…
    </p>

    <section v-else-if="error" role="alert">
      <h1>Product unavailable</h1>
      <p>{{ error }}</p>
      <RouterLink to="/">Browse products</RouterLink>
    </section>

    <article v-else-if="product" class="detail-layout">
      <div class="detail-image">
        <img :src="product.image" :alt="product.title" />
      </div>

      <div class="detail-info">
        <p class="eyebrow">{{ product.category }}</p>

        <h1>{{ product.title }}</h1>

        <p class="detail-rating">
          <span aria-hidden="true">★</span>
          {{ product.rating.rate.toFixed(1) }} / 5
          <span>({{ product.rating.count }} ratings)</span>
        </p>

        <p class="detail-price">
          {{ product.price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
          }) }}
        </p>

        <h2>About this product</h2>
        <p class="detail-description">
          {{ product.description }}
        </p>

        <RouterLink to="/" class="back-to-catalog">
          Continue exploring
        </RouterLink>
      </div>
    </article>
  </main>
</template>