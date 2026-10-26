import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useProductStore } from '../store/productStore'
import type { Product } from '../types/product'

vi.mock('../services/productService', () => ({
  getProducts: vi.fn(),
  getCategories: vi.fn(),
}))

const sampleProducts: Product[] = [
  {
    id: 1,
    title: 'Wireless Headphones',
    price: 40,
    description: 'Comfortable headphones',
    category: 'electronics',
    image: '/headphones.png',
    rating: { rate: 3.8, count: 20 },
  },
  {
    id: 2,
    title: 'Premium Headphones',
    price: 70,
    description: 'Over-ear headphones',
    category: 'electronics',
    image: '/premium.png',
    rating: { rate: 4.7, count: 50 },
  },
  {
    id: 3,
    title: 'Silver Bracelet',
    price: 25,
    description: 'A simple bracelet',
    category: 'jewelery',
    image: '/bracelet.png',
    rating: { rate: 4.2, count: 12 },
  },
]

describe('product store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('sorts products by rating from highest to lowest', () => {
    const store = useProductStore()

    store.products = sampleProducts
    store.categories = ['electronics']

    expect(
      store.groupedProducts[0].products.map((product) => product.id),
    ).toEqual([2, 1])
  })

  it('searches product titles without case sensitivity', () => {
    const store = useProductStore()

    store.products = sampleProducts
    store.searchQuery = 'HEADPHONES'

    expect(
      store.filteredProducts.map((product) => product.id),
    ).toEqual([1, 2])
  })

  it('groups products under their categories', () => {
    const store = useProductStore()

    store.products = sampleProducts
    store.categories = ['electronics', 'jewelery']

    expect(store.groupedProducts).toHaveLength(2)
    expect(store.groupedProducts[0].products.map(
      (product) => product.id,
    )).toEqual([2, 1])
  })

  it('returns no matches for an unknown search term', () => {
    const store = useProductStore()

    store.products = sampleProducts
    store.searchQuery = 'nonexistent item'

    expect(store.filteredProducts).toEqual([])
  })
})