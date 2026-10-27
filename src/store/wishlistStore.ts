import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useWishlistStore = defineStore('wishlist', () => {
  const wishlistIds = ref<number[]>([]);

  const wishlistCount = computed(() => wishlistIds.value.length)

  function toggleWishlist(id: number) {
    const index = wishlistIds.value.indexOf(id)
    if (index === -1) {
      wishlistIds.value.push(id);
    } else {
      wishlistIds.value.splice(index, 1);
    }
  }

  function removeFromWishlist(id: number) {
      wishlistIds.value = wishlistIds.value.filter(wishlistId => wishlistId !== id);
  }

  function isWishlisted(id: number) {
    return wishlistIds.value.includes(id)
  }

  return {
    wishlistIds,
    isWishlisted,
    toggleWishlist,
    removeFromWishlist,
    wishlistCount
  };
});