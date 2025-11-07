import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/stores/cartStore'
import { fetchProductById, getRecommendedProducts } from '@/services/products'
import { Carousel } from '@/components/Carousel'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'

const sizes = ['XS', 'S', 'M', 'L', 'XL']

export default function Product() {
  const { id } = useParams()
  const addItem = useCartStore((state) => state.addItem)
  const [selectedSize, setSelectedSize] = useState('M')
  const { toast } = useToast()

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
  })

  const recommendations = useMemo(() => {
    if (!product) return []
    return getRecommendedProducts(product.category, product.id)
  }, [product])

  if (isLoading) {
    return <div className="flex h-[60vh] items-center justify-center text-sm text-muted-foreground">Loading product...</div>
  }

  if (!product) {
    return <div className="flex h-[60vh] items-center justify-center text-sm text-muted-foreground">Product not found.</div>
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-12 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <div className="overflow-hidden rounded-3xl border border-border">
            <img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-cover" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">{product.name}</h1>
            <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">{product.category}</p>
          </div>
          <p className="text-muted-foreground">{product.description}</p>
          <p className="text-2xl font-semibold">${product.price.toFixed(2)}</p>

          <div className="space-y-2">
            <span className="text-sm font-medium">Select Size</span>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {sizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-4">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => {
                addItem({ ...product, selectedSize })
                toast({
                  title: 'Added to cart',
                  description: `${product.name} (size ${selectedSize}) was added to your bag.`,
                  duration: 4000,
                })
              }}
            >
              Add to Cart
            </Button>
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {product.stock} in stock
            </span>
          </div>
        </motion.div>
      </div>

      {recommendations.length > 0 && (
        <section className="mt-20 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">You may also like</h2>
            <p className="text-sm text-muted-foreground">Discover more pieces curated for your style.</p>
          </div>
          <Carousel
            items={recommendations}
            renderItem={(item) => (
              <Card className="overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>${item.price.toFixed(2)}</span>
                  <Button asChild variant="link">
                    <Link to={`/product/${item.id}`}>View</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          />
        </section>
      )}
    </motion.div>
  )
}

