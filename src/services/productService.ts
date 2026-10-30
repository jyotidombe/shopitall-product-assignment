
import type { Product } from '../types/product'

const PRODUCT_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function fetchApi<T>(
  url: string,
  signal?: AbortSignal
): Promise<T> {
  let response: Response;

  try {
    response = await fetch(url, { signal });
  } catch (error) {
    if (signal?.aborted) {
      throw error;
    }

    throw new Error('Network error: Unable to connect to the server');
  }

  // Handle product not found
  if (response.status === 404) {
    throw new Error('PRODUCT_NOT_FOUND');
  }

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  };

  // Handle empty response
  const text = await response.text();

  if (!text.trim()) {
    throw new Error('EMPTY_RESPONSE');
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error('Invalid JSON response from server');
  }
}

export function getProducts(signal?: AbortSignal): Promise<Product[]> {
  return fetchApi<Product[]>(`${PRODUCT_BASE_URL}/products`, signal);
}

export function getCategories(signal?: AbortSignal): Promise<string[]> {
  return fetchApi<string[]>(`${PRODUCT_BASE_URL}/products/categories`, signal);
}

export function getProductById(
  id: number,
  signal?: AbortSignal
): Promise<Product> {
  return fetchApi<Product>(`${PRODUCT_BASE_URL}/products/${id}`, signal);
}
