import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Carousel } from '@/components/Carousel'
import products from '@/data/products.json'
import { useToast } from '@/components/ui/use-toast'
import { useCartStore } from '@/stores/cartStore'

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

const categories = [
  {
    name: 'T-Shirts',
    description: 'Breathable essentials with a street-smart edge.',
    image:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Jackets',
    description: 'Layer up with technical fabrics built for the city.',
    image:
      'https://images.unsplash.com/photo-1525171254930-643fc658b64e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Pants',
    description: 'Versatile silhouettes engineered for motion.',
    image:
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=80',
  },
]

export default function Home() {
  const trendingProducts = useMemo(() => products.slice(0, 6), [])
  const addItem = useCartStore((state) => state.addItem)
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(newsletterSchema) })

  const onSubmit = (data) => {
    console.info('Newsletter sign-up', data)
    toast({ title: 'Subscribed', description: 'You will now receive exclusive deals and new arrivals.' })
    reset()
  }

  return (
    <div className="space-y-24 bg-gradient-to-b from-gray-200  to-amber-900 pb-24 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1600&q=80"
            alt="Urban streetwear"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/70 to-transparent" />
        </div>
        <div className="relative mx-auto flex min-h-[80vh] max-w-6xl flex-col justify-center gap-8 px-6 py-24">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="w-max rounded-full border border-white/20 bg-white/10 px-5 py-1 text-xs uppercase tracking-[0.5em] text-white/80">
            Urban Store
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="max-w-3xl text-5xl font-semibold tracking-tight sm:text-6xl"
          >
            Menswear engineered for movement, crafted for the city.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="max-w-2xl text-lg text-white/75"
          >
            From technical jackets to modular pants, Urban Store pieces blend comfort, bold silhouettes, and premium detailing for your everyday hustle.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="rounded-full bg-[#FF6600] px-8 text-lg font-semibold text-white shadow-[0_10px_40px_rgba(255,102,0,0.4)] hover:bg-[#ff7a26]">
              <Link to="/shop">Shop Now</Link>
            </Button>
            <Link to="/about" className="rounded-full border border-white/20 px-6 py-3 text-sm uppercase tracking-[0.35em] text-white/80 transition hover:bg-white/10 hover:text-white">
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About teaser */}
      <section className="mx-auto max-w-6xl px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid gap-10 rounded-[32px] border border-white/10 bg-white/5 p-10 backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.25)] md:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.5em] text-white/60">About Urban Store</span>
            <h2 className="text-4xl font-semibold tracking-tight">We blend comfort and street fashion to redefine men&apos;s style.</h2>
            <p className="text-sm text-white/70">
              Every drop is informed by city rhythms—high-grade fabrics, modular storage, and silhouettes that transition from studio sessions to night rides. Designed for creators who live without pause.
            </p>
            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.4em] text-white/60">
              <span className="rounded-full border border-white/15 px-3 py-1">Limited Drops</span>
              <span className="rounded-full border border-white/15 px-3 py-1">Eco Conscious</span>
              <span className="rounded-full border border-white/15 px-3 py-1">City Tested</span>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[28px] border border-white/15">
            <img
              src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80"
              alt="Urban fashion"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent" />
          </div>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.5em] text-white/50">Shop the edit</span>
            <h2 className="text-3xl font-semibold tracking-tight">Categories</h2>
          </div>
          <Button asChild variant="ghost" className="rounded-full border border-white/20 px-6 py-2 text-white hover:bg-white/10">
            <Link to="/shop">View All</Link>
          </Button>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-[28px] border border-white/15 bg-white/5 backdrop-blur-xl"
            >
              <Link to={`/shop?category=${encodeURIComponent(category.name)}`} className="block">
                <div className="relative h-72">
                  <img src={category.image} alt={category.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/90" />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end gap-4 p-6">
                  <div>
                    <h3 className="text-2xl font-semibold">{category.name}</h3>
                    <p className="text-sm text-white/70">{category.description}</p>
                  </div>
                  <Button size="sm" className="w-fit rounded-full bg-white text-black hover:bg-white/90">
                    Shop Now
                  </Button>
                </div>
                <div className="absolute inset-0 rounded-[28px] border border-white/30 opacity-0 transition group-hover:opacity-100" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="mx-auto max-w-6xl px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-10">
          <span className="text-xs uppercase tracking-[0.5em] text-white/50">In rotation</span>
          <h2 className="text-3xl font-semibold tracking-tight">Trending Now</h2>
        </motion.div>
        <Carousel
          items={trendingProducts}
          renderItem={(product) => (
            <Card className="h-full overflow-hidden rounded-[26px] border border-white/10 bg-white/5 backdrop-blur-xl">
              <div className="relative h-60 overflow-hidden">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-700 hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
              </div>
              <CardHeader className="space-y-1 text-white">
                <CardTitle className="text-xl font-semibold">{product.name}</CardTitle>
                <CardDescription className="text-white/70">{product.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-white/80">
                  <span className="text-lg font-semibold text-white">${product.price.toFixed(2)}</span>
                    <div className="flex gap-2">
                      <Button asChild variant="ghost" className="rounded-full border border-white/20 px-4 py-1 text-white hover:bg-white/10">
                      <Link to={`/product/${product.id}`}>View</Link>
                    </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          addItem(product)
                          toast({
                            title: 'Added to cart',
                            description: `${product.name} was added to your bag.`,
                            duration: 4000,
                          })
                        }}
                        className="rounded-full bg-[#FF6600] px-4 text-white hover:bg-[#ff7a26]"
                      >
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        />
      </section>

      {/* Newsletter */}
      <section className="relative px-6">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-slate-900 to-black" />
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-white/15 bg-white/10 px-6 py-16 backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.25)]">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.5em] text-white/60">Stay in the loop</span>
              <h3 className="text-3xl font-semibold tracking-tight">Access invite-only drops, styling notes, and private events.</h3>
              <p className="text-sm text-white/70">Subscribe to get exclusive deals and new arrivals.</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register('email')}
                  className="rounded-full border-white/20 bg-white/90 text-black placeholder:text-gray-500"
                />
                {errors.email && <p className="text-xs text-red-300">{errors.email.message}</p>}
              </div>
              <Button type="submit" className="w-full rounded-full bg-[#FF6600] text-white hover:bg-[#ff7a26]">
                Subscribe
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

