<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Product } from '../types/product'
import { useWishlistStore } from '../store/wishlistStore'

const wishlistStore = useWishlistStore()

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

      <button type="button" class="favorite-btn" :aria-label="wishlistStore.isWishlisted(product.id) ? 'Remove from wishlist' : 'Add to wishlist'" @click.prevent.stop="wishlistStore.toggleWishlist(product.id)">
        <span aria-hidden="true">
          {{ wishlistStore.isWishlisted(product.id) ? '♥' : '♡' }}
        </span>
      </button>
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