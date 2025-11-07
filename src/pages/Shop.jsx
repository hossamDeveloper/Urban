import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useInfiniteQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCartStore } from '@/stores/cartStore'
import { fetchProducts, getAllCategories } from '@/services/products'
import { useToast } from '@/components/ui/use-toast'

const perPage = 6

export default function Shop() {
  const categories = useMemo(() => ['All', ...getAllCategories()], [])
  const addItem = useCartStore((state) => state.addItem)
  const { toast } = useToast()
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: 1000 })
  const [sortOrder, setSortOrder] = useState('featured')

  useEffect(() => {
    const param = searchParams.get('category')
    if (param && categories.includes(param)) {
      setSelectedCategory(param)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const queryResult = useInfiniteQuery({
    queryKey: ['products', selectedCategory, priceFilter, sortOrder],
    queryFn: ({ pageParam = 0 }) => fetchProducts({ pageParam, perPage }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  })

  const products = useMemo(() => {
    const merged = queryResult.data?.pages.flatMap((page) => page.items) ?? []
    const filtered = merged.filter((product) => {
      const inCategory = selectedCategory === 'All' || product.category === selectedCategory
      const inPrice = product.price >= priceFilter.min && product.price <= priceFilter.max
      return inCategory && inPrice
    })

    if (sortOrder === 'price-asc') {
      return [...filtered].sort((a, b) => a.price - b.price)
    }
    if (sortOrder === 'price-desc') {
      return [...filtered].sort((a, b) => b.price - a.price)
    }

    return filtered
  }, [queryResult.data, selectedCategory, priceFilter, sortOrder])

  const canLoadMore = Boolean(queryResult.hasNextPage) && !queryResult.isFetchingNextPage

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
    const next = new URLSearchParams(searchParams)
    if (category === 'All') next.delete('category')
    else next.set('category', category)
    setSearchParams(next)
  }

  const handlePriceChange = (key) => (event) => {
    const value = Number(event.target.value)
    setPriceFilter((prev) => ({ ...prev, [key]: Number.isNaN(value) ? prev[key] : value }))
  }

  return (
    <div className="relative px-6 py-20">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-amber-200/40 via-transparent to-amber-900/30" />
      <div className="mx-auto max-w-6xl space-y-14">
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-[32px] border border-amber-500/40 bg-gradient-to-r from-gray-200/80 to-amber-900/70 p-10 text-slate-900 shadow-[0_20px_60px_rgba(148,89,16,0.25)]"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.5em] text-amber-800/80">The Collection</span>
              <h1 className="text-4xl font-semibold tracking-tight">Shop Urban Essentials</h1>
              <p className="max-w-xl text-sm text-amber-900/80">
                Dial in your rotation with modular layers, breathable tees, and utility pants engineered for the city. Curated for creators, commuters, and late-night movers.
              </p>
            </div>
            <div className="rounded-[24px] border border-amber-500/40 bg-white/60 px-6 py-4 text-right shadow-inner">
              <p className="text-xs uppercase tracking-[0.45em] text-amber-900/70">Available Now</p>
              <p className="text-3xl font-semibold text-amber-900">{products.length}</p>
              <p className="text-xs text-amber-900/70">pieces in this drop</p>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8 rounded-[28px] border border-amber-500/30 bg-white/70 p-6 backdrop-blur-xl shadow-[0_18px_50px_rgba(148,89,16,0.2)]"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-amber-500/40 bg-amber-100/80 px-3 py-1 text-xs uppercase tracking-[0.4em] text-amber-900">Filters</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const active = selectedCategory === category
                  return (
                    <button
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                        active
                          ? 'border-amber-600 bg-amber-200 text-amber-900 shadow-[0_8px_20px_rgba(148,89,16,0.25)]'
                          : 'border-amber-400/40 bg-white/40 text-amber-800 hover:bg-white/70 hover:text-amber-900'
                      }`}
                    >
                      {category}
                    </button>
                  )
                })}
              </div>
            </div>
            <Button
              variant="ghost"
              className="rounded-full border border-amber-400/40 px-4 py-2 text-amber-800 hover:bg-white/70 hover:text-amber-900"
              onClick={() => {
                handleCategoryClick('All')
                setPriceFilter({ min: 0, max: 1000 })
                setSortOrder('featured')
              }}
            >
              Reset Filters
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="col-span-3 border border-amber-400/40 bg-white/60 p-6 text-slate-900 shadow-none md:col-span-1">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-lg">Price Range</CardTitle>
                <CardDescription className="text-amber-900/70">Tune the drop to match your budget.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 p-0">
                <div className="flex gap-3">
                  <div className="flex-1 space-y-1">
                    <Label htmlFor="minPrice">Min</Label>
                    <Input
                      id="minPrice"
                      type="number"
                      value={priceFilter.min}
                      onChange={handlePriceChange('min')}
                      className="rounded-full border-amber-300/60 bg-white/80 text-amber-900"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <Label htmlFor="maxPrice">Max</Label>
                    <Input
                      id="maxPrice"
                      type="number"
                      value={priceFilter.max}
                      onChange={handlePriceChange('max')}
                      className="rounded-full border-amber-300/60 bg-white/80 text-amber-900"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3 border border-amber-400/40 bg-white/60 p-6 text-slate-900 shadow-none md:col-span-1">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-lg">Sort</CardTitle>
                <CardDescription className="text-amber-900/70">Shape the feed how you like it.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="rounded-full border-amber-300/60 bg-white/80 text-amber-900">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent className="border-amber-400/40 bg-white/90 text-amber-900">
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card className="col-span-3 border border-amber-400/40 bg-amber-200/60 p-6 text-amber-900 shadow-[inset_0_0_20px_rgba(148,89,16,0.15)] md:col-span-1">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-lg">Stylist&apos;s Picks</CardTitle>
                <CardDescription className="text-amber-900/70">
                  Highlighted fits curated for the season. Stay tuned for weekly drops.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-3 p-0">
                <span className="rounded-full border border-amber-600/60 bg-white/70 px-3 py-1 text-xs uppercase tracking-[0.35em]">New</span>
                <span className="text-sm text-amber-900/80">Updated every Friday</span>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-10"
        >
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
                <Card className="group h-full overflow-hidden rounded-[26px] border border-amber-400/40 bg-white/80 backdrop-blur-lg shadow-[0_14px_40px_rgba(148,89,16,0.18)]">
                  <div className="relative h-64 overflow-hidden">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-200/30 to-amber-900/40" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg text-amber-900">{product.name}</CardTitle>
                    <CardDescription className="text-amber-900/70">{product.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-amber-900/70">{product.description}</p>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <span className="text-base font-semibold text-amber-900">${product.price.toFixed(2)}</span>
                    <div className="flex gap-2">
                      <Button asChild variant="ghost" className="rounded-full border border-amber-400/40 px-3 py-1 text-amber-900 hover:bg-amber-200/70">
                        <Link to={`/product/${product.id}`}>View</Link>
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          addItem(product)
                          toast({
                            title: 'Added to cart',
                            description: `${product.name} joined your bag.`,
                            duration: 4000,
                          })
                        }}
                        className="rounded-full bg-[#FF6600] px-4 text-white hover:bg-[#ff7a26]"
                      >
                        Add
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center">
            {queryResult.isFetching && !queryResult.isFetchingNextPage ? (
              <span className="rounded-full border border-amber-400/60 bg-white/70 px-5 py-2 text-sm text-amber-800">Loading...</span>
            ) : canLoadMore ? (
              <Button
                onClick={() => queryResult.fetchNextPage()}
                disabled={queryResult.isFetchingNextPage}
                className="rounded-full border border-amber-500/60 bg-amber-300/80 px-6 py-2 text-amber-900 hover:bg-amber-400"
              >
                {queryResult.isFetchingNextPage ? 'Loading...' : 'Load More'}
              </Button>
            ) : (
              <span className="rounded-full border border-amber-400/60 bg-white/70 px-5 py-2 text-xs uppercase tracking-[0.35em] text-amber-800">
                No more products
              </span>
            )}
          </div>
        </motion.section>
      </div>
    </div>
  )
}

