<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Product } from '../types/product'

defineProps<{
  product: Product
}>()
</script>

<template>
  <RouterLink
    :to="`/products/${product.id}`"
    class="product-card"
    :aria-label="`View ${product.title}`"
  >
    <div class="product-image">
      <img
        :src="product.image"
        :alt="product.title"
        loading="lazy"
      />
    </div>

    <div class="product-info">
      <p class="product-category">{{ product.category }}</p>

      <h3>{{ product.title }}</h3>

      <div class="product-meta">
        <span class="rating">
          <span aria-hidden="true">&#9733;</span>
          {{ product.rating.rate.toFixed(1) }}
        </span>

        <span class="review-count">
          ({{ product.rating.count }})
        </span>

        <span class="product-price">
          {{ product.price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
          }) }}
        </span>
      </div>
    </div>
  </RouterLink>
</template>