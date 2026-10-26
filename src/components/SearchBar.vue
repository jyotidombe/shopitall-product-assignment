<script setup lang="ts">
import { useProductStore } from '../store/productStore'

const store = useProductStore()
</script>

<template>
  <div class="search-wrap">
    <label for="product-search">Search the catalogue</label>

    <div class="search-field">
      <span aria-hidden="true">⌕</span>

      <input
        id="product-search"
        v-model="store.searchQuery"
        type="search"
        placeholder="Try headphones, jacket, bracelet..."
        autocomplete="off"
      />

      <button
        v-if="store.searchQuery"
        type="button"
        class="clear-search"
        @click="store.searchQuery = ''"
      >
        Clear
      </button>
    </div>
  </div>
</template>