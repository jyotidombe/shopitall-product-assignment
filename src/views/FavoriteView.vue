<script setup lang="ts">
import { computed } from 'vue'
import { useWishlistStore } from '../store/wishlistStore.ts'
import { useProductStore } from '../store/productStore'

const wishlistStore = useWishlistStore()
const productStore = useProductStore()

const wishlistedProduct = computed(() => {
    return productStore.products.filter(product => wishlistStore.wishlistIds.includes(product.id))
})

</script>
<template>
    <main class="favorites-page">
      <header class="favorites-header">
        <div>
          <p class="eyebrow">YOUR COLLECTION</p>
          <h1>My Wishlist</h1>
          <p class="subtitle">
            Your favorite finds, all in one place.
          </p>
        </div>

        <span class="item-count">
          {{ wishlistedProduct.length }}
          {{ wishlistedProduct.length === 1 ? 'item' : 'items' }}
        </span>
      </header>

      <div v-if="wishlistedProduct.length === 0" class="empty-state">
        <div class="empty-heart">♡</div>
        <h2>Your wishlist is empty</h2>
        <p>Save products you love and find them here later.</p>
        <RouterLink to="/" class="shop-button">
          Explore products
        </RouterLink>
      </div>
          
      <section v-else class="wishlist-grid">
        <article
          v-for="product in wishlistedProduct"
          :key="product.id"
          class="wishlist-card"
        >
          <div class="product-image">
            <img :src="product.image" :alt="product.title" />

            <button
              class="remove-button"
              type="button"
              aria-label="Remove from wishlist"
              @click="wishlistStore.toggleWishlist(product.id)"
            >
              ♥
            </button>
          </div>

          <div class="product-details">
            <p class="product-category">{{ product.category }}</p>
            <h2>{{ product.title }}</h2>

            <div class="product-footer">
              <span class="product-price">
                ${{ product.price.toFixed(2) }}
              </span>

              <RouterLink
                :to="`/products/${product.id}`"
                class="view-link"
              >
                View item →
              </RouterLink>
            </div>
          </div>
        </article>
      </section>
    </main>
</template>