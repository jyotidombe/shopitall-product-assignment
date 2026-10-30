<script setup lang="ts">
import { watch, onMounted, ref } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { getProductById } from '../services/productService'
import type { Product } from '../types/product'
import { useProductStore } from '../store/productStore'

const productStore = useProductStore();

const route = useRoute();
const router = useRouter();

const product = ref<Product | null>(null);
const isLoading = ref(false);
const error = ref<string | null>(null);

async function loadProduct(){
  product.value = null;
  isLoading.value = true;
  error.value = null;

  try{
    const id = Number(route.params.id)

    if(!Number.isSafeInteger(id) || id < 0){
      await router.replace('/')
      return
    }

    const result = await getProductById(id);

    if (!result) {
      await router.replace('/')
      return
    }

    product.value = result
    productStore.markAsVisited(result.id)
  }
  
  catch (err) {
    console.error('Failed to load product:', err)

    if (err instanceof Error) {
      if (
        err.message === 'PRODUCT_NOT_FOUND' ||
        err.message === 'EMPTY_RESPONSE'
      ) {
        await router.replace('/')
        return
      }
    }

    error.value =
      'Unable to load this product. Please try again.'
  }
 finally {
    isLoading.value = false
  }
};

onMounted(loadProduct);

watch(() => route.params.id, loadProduct)
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