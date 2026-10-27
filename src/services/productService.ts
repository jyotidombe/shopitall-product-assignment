import type { Product } from '../types/product'

const PRODUCT_BASE_URL = import.meta.env.VITE_API_BASE_URL

async function fetchApi<T>(url: string, signal?:AbortSignal): Promise<T> {
  let response: Response

  try {
    response = await fetch(url,{ signal })
  } catch(error) {
    if (signal?.aborted){
      throw error
    }
    throw new Error(
      'Network error: Unable to connect to the server'
    )
  }
  
  if (!response.ok) {
    throw new Error(`HTTP error:: ${response.status}`)
  }

  return (await response.json()) as T
}

export function getProducts(signal?:AbortSignal): Promise<Product[]> {
  return fetchApi<Product[]>(`${PRODUCT_BASE_URL}/products`,signal)
}

export function getCategories(signal?:AbortSignal): Promise<string[]> {
  return fetchApi<string[]>(`${PRODUCT_BASE_URL}/products/categories`,signal);
}

export function getProductById(id: number,signal?:AbortSignal): Promise<Product> {
  return fetchApi<Product>(`${PRODUCT_BASE_URL}/products/${id}`,signal)
}