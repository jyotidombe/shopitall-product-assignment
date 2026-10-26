<script setup lang="ts">
import { computed } from 'vue'
import type { Product } from '../types/product'
import ProductCard from './ProductCard.vue'

const props = defineProps<{
  category: string
  products: Product[]
}>()

const displayName = computed(() =>
  props.category
    .split(' ')
    .map((word) =>
      word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(' '),
)
</script>

<template>
  <section
    v-if="products.length"
    class="category-section"
    :aria-label="`${displayName} products`"
  >
    <div class="section-heading">
      <div>
        <p class="eyebrow">EXPLORE THE COLLECTION</p>
        <h2>{{ displayName }}</h2>
      </div>

      <span class="item-count">
        {{ products.length }} items
      </span>
    </div>

    <div class="product-row">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </section>
</template>