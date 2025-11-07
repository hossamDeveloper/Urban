import products from '@/data/products.json'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function fetchProducts({ pageParam = 0, perPage = 6 }) {
  await delay(400)
  const start = pageParam * perPage
  const end = start + perPage
  const sliced = products.slice(start, end)
  const hasMore = end < products.length

  return {
    items: sliced,
    nextPage: hasMore ? pageParam + 1 : undefined,
    total: products.length,
  }
}

export async function fetchProductById(id) {
  await delay(200)
  return products.find((product) => product.id === Number(id))
}

export function getRecommendedProducts(category, excludeId, limit = 4) {
  return products
    .filter((product) => product.category === category && product.id !== excludeId)
    .slice(0, limit)
}

export function getAllCategories() {
  return Array.from(new Set(products.map((product) => product.category)))
}

