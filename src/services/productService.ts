import type { Product } from '../types/product'

const PRODUCT_BASE_URL = import.meta.env.VITE_API_BASE_URL

async function fetchApi<T>(url: string): Promise<T> {
  let response: Response

  try {
    response = await fetch(url)
  } catch {
    throw new Error(
      'Network error: Unable to connect to the server'
    )
  }
  
  if (!response.ok) {
    throw new Error(`HTTP error:: ${response.status}`)
  }

  return (await response.json()) as T
}

export function getProducts(): Promise<Product[]> {
  return fetchApi<Product[]>(`${PRODUCT_BASE_URL}/products`)
}

export function getCategories(): Promise<string[]> {
  return fetchApi<string[]>(`${PRODUCT_BASE_URL}/products/categories`);
}

export function getProductById(id: number): Promise<Product> {
  return fetchApi<Product>(`${PRODUCT_BASE_URL}/products/${id}`)
}