<script setup lang="ts">
import FavoriteList from './FavoriteList.vue'
</script>

<template>
  <header class="app-header">
    <RouterLink to="/" class="brand" aria-label="ShopItAll Now">
     <div class="brand-logo">
        <div class="logo-icon">
          <span class="filter">⌘</span>
        </div>

        <div class="brand-text">
          <h2>Shop<span>It</span>All</h2>
          <p>SMART SHOPPING</p>
        </div>
      </div>
    </RouterLink>
    <FavoriteList />
  </header>
</template>