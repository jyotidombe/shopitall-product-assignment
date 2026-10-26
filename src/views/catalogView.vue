<script setup lang="ts">
import { onMounted } from 'vue'
import { useProductStore } from '../store/productStore'
import SearchBar from '../components/SearchBar.vue'
import CategorySection from '../components/CategorySection.vue'

const store = useProductStore()

onMounted(() => {
  void store.loadCatalog()
})
</script>

<template>
  <div class="main-layout">
    <main class="catalog">
      <section class="catalog-intro">
        <p class="eyebrow">BROWSE THE CATALOGUE</p>
        <h1>Find what you're looking for.</h1>
        <p class="intro-copy">
          Explore the items available in the catalogue.
        </p>
      </section>

      <SearchBar />
      <p>{{ store.filteredProducts.length }} products found</p>
      <p
        v-if="store.isLoading"
        role="status"
        class="status-message"
      >
        Loading products…
      </p>

      <section
        v-else-if="store.error"
        class="error-state"
        role="alert"
      >
        <p>{{ store.error }}</p>
        <button type="button" @click="store.loadCatalog">
          Try again
        </button>
      </section>

      <p
        v-else-if="store.filteredProducts.length === 0"
        class="status-message"
        role="status"
      >
        No products match your search. Try another name.
      </p>

      <div v-else class="category-list">
        <CategorySection
          v-for="group in store.groupedProducts"
          :key="group.category"
          :category="group.category"
          :products="group.products"
        />
      </div>
    </main>
  </div>
</template>