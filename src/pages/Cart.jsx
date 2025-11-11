import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useCartStore } from '@/stores/cartStore'
import { useToast } from '@/components/ui/use-toast'
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShoppingCart } from 'lucide-react'

export default function Cart() {
  const { items, removeItem, updateQuantity, clear, getSubtotal } = useCartStore()
  const { toast } = useToast()
  const subtotal = getSubtotal()
  const shipping = items.length ? 12 : 0
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-200 via-white to-amber-200" />
        <div className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center gap-8 px-6 py-20 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-amber-500/40 bg-white/80 backdrop-blur-xl">
              <ShoppingCart className="h-12 w-12 text-amber-900/60" />
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold text-amber-900">Your cart is empty</h2>
              <p className="text-sm text-amber-900/70">Start adding items to your bag to see them here.</p>
            </div>
            <Button asChild className="rounded-full bg-[#FF6600] px-8 text-white hover:bg-[#ff7a26]">
              <Link to="/shop">Explore Products</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-200 via-white to-amber-200" />
      <div className="mx-auto max-w-6xl space-y-8 px-6 py-20">
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-[32px] border border-amber-500/40 bg-white/80 p-10 backdrop-blur-xl shadow-[0_20px_60px_rgba(148,89,16,0.2)]"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.5em] text-amber-800/80">Your Selection</p>
              <h1 className="text-4xl font-semibold tracking-tight text-amber-900">Shopping Cart</h1>
              <p className="text-sm text-amber-900/80">Review your picks before heading to checkout.</p>
            </div>
            <Button
              variant="ghost"
              onClick={() => {
                clear()
                toast({
                  title: 'Cart cleared',
                  description: 'All items have been removed from your bag.',
                  duration: 4000,
                })
              }}
              className="rounded-full border border-amber-400/40 px-6 py-2 text-amber-900 hover:bg-white/70"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear cart
            </Button>
          </div>
        </motion.section>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-6"
          >
            <Card className="rounded-[28px] border border-amber-500/40 bg-white/90 p-8 backdrop-blur-xl shadow-[0_18px_50px_rgba(148,89,16,0.18)]">
              <CardHeader className="p-0 pb-6">
                <CardTitle className="flex items-center gap-2 text-2xl text-amber-900">
                  <ShoppingBag className="h-5 w-5" />
                  Items ({items.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-0">
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div
                      key={item.uid}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="group rounded-[24px] border border-amber-400/40 bg-white/70 p-6 backdrop-blur-lg transition hover:border-amber-500/60 hover:bg-white/90"
                    >
                      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                        <div className="relative overflow-hidden rounded-xl">
                          <img src={item.image} alt={item.name} className="h-28 w-28 object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                          <div className="absolute inset-0 rounded-xl border-2 border-amber-500/20 opacity-0 transition group-hover:opacity-100" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <h3 className="text-lg font-semibold text-amber-900">{item.name}</h3>
                          <p className="text-xs uppercase tracking-[0.3em] text-amber-900/60">{item.category}</p>
                          {item.size && item.size !== 'default' && (
                            <p className="text-xs text-amber-900/70">
                              Size: <span className="font-semibold">{item.size}</span>
                            </p>
                          )}
                          <p className="text-base font-semibold text-amber-900">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 rounded-full border border-amber-400/40 bg-white/80 p-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => updateQuantity(item.uid, Math.max(1, item.quantity - 1))}
                              className="h-8 w-8 rounded-full text-amber-900 hover:bg-amber-200/70"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Input
                              type="number"
                              min={1}
                              value={item.quantity}
                              onChange={(event) => {
                                const val = Number(event.target.value)
                                if (val >= 1) updateQuantity(item.uid, val)
                              }}
                              className="w-12 border-0 bg-transparent text-center text-sm font-semibold text-amber-900 focus-visible:ring-0"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => updateQuantity(item.uid, item.quantity + 1)}
                              className="h-8 w-8 rounded-full text-amber-900 hover:bg-amber-200/70"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              removeItem(item.uid)
                              toast({
                                title: 'Removed from cart',
                                description: `${item.name} was removed from your bag.`,
                                duration: 4000,
                              })
                            }}
                            className="h-10 w-10 rounded-full text-red-600 hover:bg-red-50 hover:text-red-700"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.section>

          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-6"
          >
            <Card className="sticky top-24 rounded-[28px] border border-amber-500/40 bg-white/90 p-8 backdrop-blur-xl shadow-[0_18px_50px_rgba(148,89,16,0.18)]">
              <CardHeader className="p-0 pb-6">
                <CardTitle className="text-2xl text-amber-900">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 p-0">
                <div className="space-y-3 border-b border-amber-400/40 pb-4">
                  <div className="flex items-center justify-between text-sm text-amber-900/80">
                    <span>Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-amber-900/80">
                    <span>Shipping</span>
                    <span className="font-semibold">{shipping ? `$${shipping.toFixed(2)}` : 'Free'}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-amber-400/40 pt-4">
                  <span className="text-lg font-semibold text-amber-900">Total</span>
                  <span className="text-2xl font-bold text-amber-900">${total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter className="p-0 pt-6">
                <Button asChild disabled={items.length === 0} className="w-full rounded-full bg-[#FF6600] py-6 text-lg font-semibold text-white shadow-[0_10px_40px_rgba(255,102,0,0.4)] hover:bg-[#ff7a26]">
                  <Link to="/checkout" className="flex items-center justify-center gap-2">
                    Proceed to Checkout
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="rounded-[28px] border border-amber-500/30 bg-amber-100/70 p-6 backdrop-blur-xl">
              <div className="space-y-3 text-sm text-amber-900/80">
                <p className="font-semibold">💡 Free shipping on orders over $100</p>
                <p className="text-xs">Add ${(100 - subtotal).toFixed(2)} more to qualify for free shipping.</p>
              </div>
            </Card>
          </motion.aside>
        </div>
      </div>
    </div>
  )
}

