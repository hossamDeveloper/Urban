import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCartStore } from '@/stores/cartStore'
import { Link } from 'react-router-dom'
import { CheckCircle2, CreditCard, MapPin, User, Mail, Phone } from 'lucide-react'

const checkoutSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Please provide a valid email'),
  phone: z.string().min(8, 'Phone number is required'),
  address: z.string().min(5, 'Address is required'),
  paymentMethod: z.enum(['cash', 'card']),
})

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_1234567890placeholder')

export default function Checkout() {
  const [open, setOpen] = useState(false)
  const { items, getSubtotal } = useCartStore()
  const subtotal = getSubtotal()
  const shipping = items.length ? 12 : 0
  const total = subtotal + shipping

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(checkoutSchema), defaultValues: { paymentMethod: 'card' } })

  const onSubmit = async (data) => {
    console.info('Checkout submission', data)
    setOpen(true)
    reset()
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center gap-6 px-6 py-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <h2 className="text-3xl font-semibold text-amber-900">Your cart is empty</h2>
          <p className="text-sm text-amber-900/70">Add some items to your cart before checkout.</p>
          <Button asChild className="rounded-full bg-[#FF6600] text-white hover:bg-[#ff7a26]">
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <Elements stripe={stripePromise}>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-200 via-white to-amber-200" />
        <div className="mx-auto max-w-6xl space-y-8 px-6 py-20">
          <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="rounded-[32px] border border-amber-500/40 bg-white/80 p-10 text-center backdrop-blur-xl shadow-[0_20px_60px_rgba(148,89,16,0.2)]">
            <p className="text-xs uppercase tracking-[0.5em] text-amber-800/80">Secure Checkout</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-amber-900">Complete Your Order</h1>
            <p className="mt-6 text-sm text-amber-900/80">Enter your details to finalize your purchase securely.</p>
          </motion.section>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <motion.form
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <Card className="rounded-[28px] border border-amber-500/40 bg-white/90 p-8 backdrop-blur-xl shadow-[0_18px_50px_rgba(148,89,16,0.18)]">
                <CardHeader className="p-0 pb-6">
                  <CardTitle className="flex items-center gap-2 text-2xl text-amber-900">
                    <User className="h-5 w-5" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5 p-0">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-amber-900">Full Name</Label>
                      <Input
                        id="fullName"
                        placeholder="Jordan Fox"
                        className="rounded-full border-amber-300/60 bg-white text-amber-900"
                        {...register('fullName')}
                      />
                      {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2 text-amber-900">
                        <Mail className="h-4 w-4" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="rounded-full border-amber-300/60 bg-white text-amber-900"
                        {...register('email')}
                      />
                      {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2 text-amber-900">
                        <Phone className="h-4 w-4" />
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+20 010 66 39 8472"
                        className="rounded-full border-amber-300/60 bg-white text-amber-900"
                        {...register('phone')}
                      />
                      {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address" className="flex items-center gap-2 text-amber-900">
                        <MapPin className="h-4 w-4" />
                        Address
                      </Label>
                      <Input
                        id="address"
                        placeholder="123 Urban St, Suite 4"
                        className="rounded-full border-amber-300/60 bg-white text-amber-900"
                        {...register('address')}
                      />
                      {errors.address && <p className="text-xs text-red-500">{errors.address.message}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[28px] border border-amber-500/40 bg-white/90 p-8 backdrop-blur-xl shadow-[0_18px_50px_rgba(148,89,16,0.18)]">
                <CardHeader className="p-0 pb-6">
                  <CardTitle className="flex items-center gap-2 text-2xl text-amber-900">
                    <CreditCard className="h-5 w-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5 p-0">
                  <div className="space-y-3">
                    <Label className="text-amber-900">Choose Payment Method</Label>
                    <Controller
                      control={control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="rounded-full border-amber-300/60 bg-white text-amber-900">
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                          <SelectContent className="border-amber-400/40 bg-white/90 text-amber-900">
                            <SelectItem value="cash">Cash on Delivery</SelectItem>
                            <SelectItem value="card">Card Payment (Stripe)</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.paymentMethod && <p className="text-xs text-red-500">{errors.paymentMethod.message}</p>}
                  </div>
                  <div className="rounded-2xl border border-amber-400/40 bg-amber-50/70 p-5 text-sm text-amber-900/80">
                    <p className="font-semibold">💳 Test Mode</p>
                    <p className="mt-2">For card payments, use test card: <span className="font-mono font-semibold">4242 4242 4242 4242</span></p>
                    <p className="mt-1">Any future expiry date and CVC will work.</p>
                  </div>
                </CardContent>
              </Card>

              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full rounded-full bg-[#FF6600] py-6 text-lg font-semibold text-white shadow-[0_10px_40px_rgba(255,102,0,0.4)] hover:bg-[#ff7a26]">
                {isSubmitting ? 'Processing...' : `Confirm Order • $${total.toFixed(2)}`}
              </Button>
            </motion.form>

            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-6"
            >
              <Card className="rounded-[28px] border border-amber-500/40 bg-white/90 p-8 backdrop-blur-xl shadow-[0_18px_50px_rgba(148,89,16,0.18)]">
                <CardHeader className="p-0 pb-6">
                  <CardTitle className="text-2xl text-amber-900">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-0">
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.uid} className="flex items-center gap-4">
                        <img src={item.image} alt={item.name} className="h-16 w-16 rounded-xl object-cover" />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-amber-900">{item.name}</p>
                          <p className="text-xs text-amber-900/70">
                            {item.size && item.size !== 'default' && `Size: ${item.size} • `}Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-amber-900">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-amber-400/40 pt-4 space-y-3">
                    <div className="flex items-center justify-between text-sm text-amber-900/80">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-amber-900/80">
                      <span>Shipping</span>
                      <span>{shipping ? `$${shipping.toFixed(2)}` : 'Free'}</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-amber-400/40 pt-3 text-lg font-semibold text-amber-900">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[28px] border border-amber-500/30 bg-amber-100/70 p-6 backdrop-blur-xl">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-amber-200/80 p-2">
                    <CheckCircle2 className="h-5 w-5 text-amber-900" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <p className="text-sm font-semibold text-amber-900">Secure Checkout</p>
                    <p className="text-xs text-amber-900/70">Your payment information is encrypted and secure. We never store your card details.</p>
                  </div>
                </div>
              </Card>
            </motion.aside>
          </div>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="rounded-[32px] border border-amber-500/40 bg-white/95 backdrop-blur-xl">
            <DialogHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <DialogTitle className="text-2xl text-amber-900">Order Confirmed!</DialogTitle>
              <DialogDescription className="text-amber-900/80">
                We've received your order and will send a confirmation email shortly. Thank you for choosing Urban Store.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-center">
              <Button asChild onClick={() => setOpen(false)} className="rounded-full bg-[#FF6600] text-white hover:bg-[#ff7a26]">
                <Link to="/">Continue Shopping</Link>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Elements>
  )
}

