<script setup lang="ts">
import { useWishlistStore } from '../store/wishlistStore'

const wishlist = useWishlistStore();

</script>
<template>
    <router-link to="/favorite" class="favorite-link"
    aria-label="View your wishlist">
        <span class="heart-icon" aria-hidden="true">♡</span>
        <span
        v-if="wishlist.wishlistCount > 0"
        class="wishlist-count"
        aria-label="Items in wishlist"
        >
        {{ wishlist.wishlistCount }}
        </span>
    </router-link>
</template>