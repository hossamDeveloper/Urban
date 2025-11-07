import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useCartStore } from '@/stores/cartStore'
import { useToast } from '@/components/ui/use-toast'

export default function Cart() {
  const { items, removeItem, updateQuantity, clear, getSubtotal } = useCartStore()
  const { toast } = useToast()
  const subtotal = getSubtotal()
  const shipping = items.length ? 12 : 0
  const total = subtotal + shipping

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Your Cart</h1>
          <p className="text-sm text-muted-foreground">Review your picks before heading to checkout.</p>
        </div>
        {items.length > 0 && (
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
            className="text-sm"
          >
            Clear cart
          </Button>
        )}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[2fr_1fr]">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg">Items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <AnimatePresence initial={false}>
              {items.length === 0 && <p className="text-sm text-muted-foreground">Your cart is currently empty.</p>}
              {items.map((item) => (
                <motion.div
                  key={item.uid}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-4 rounded-xl border border-border p-4 sm:flex-row sm:items-center"
                >
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="h-24 w-24 rounded-lg object-cover" loading="lazy" />
                    <div>
                      <h3 className="text-base font-semibold">{item.name}</h3>
                      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{item.category}</p>
                      {item.size && item.size !== 'default' && <p className="text-xs text-muted-foreground">Size: {item.size}</p>}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" onClick={() => updateQuantity(item.uid, item.quantity - 1)}>-</Button>
                      <Input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(event) => updateQuantity(item.uid, Number(event.target.value))}
                        className="w-16 text-center"
                      />
                      <Button variant="outline" size="icon" onClick={() => updateQuantity(item.uid, item.quantity + 1)}>+</Button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          removeItem(item.uid)
                          toast({
                            title: 'Removed from cart',
                            description: `${item.name} was removed from your bag.`,
                            duration: 4000,
                          })
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span>{shipping ? `$${shipping.toFixed(2)}` : 'Free'}</span>
            </div>
            <div className="flex items-center justify-between text-base font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild disabled={items.length === 0} className="w-full">
              <Link to="/checkout">Checkout</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

