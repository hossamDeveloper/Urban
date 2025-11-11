import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent,  SheetTrigger } from '@/components/ui/sheet'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useCartStore } from '@/stores/cartStore'
import { searchableRoutes } from '@/routes/routes'
import logooImage from '@/assets/logoo.png'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export function Header() {
  const cartCount = useCartStore((state) => state.items.reduce((total, item) => total + item.quantity, 0))
  const [openCommand, setOpenCommand] = useState(false)
  const [openMobileMenu, setOpenMobileMenu] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { scrollY } = useScroll()
  const shadowOpacity = useTransform(scrollY, [0, 100], [0, 0.2])
  const headerOpacity = useTransform(scrollY, [0, 50], [0.85, 0.95])
  const [boxShadow, setBoxShadow] = useState('0 10px 30px rgba(0,0,0,0)')
  const [headerBg, setHeaderBg] = useState('rgba(255,255,255,0.85)')

  useEffect(() => {
    const unsubscribeShadow = shadowOpacity.on('change', (value) => {
      setBoxShadow(`0 12px 40px rgba(148,89,16,${value * 0.3})`)
    })
    const unsubscribeBg = headerOpacity.on('change', (value) => {
      setHeaderBg(`rgba(255,255,255,${value})`)
    })
    return () => {
      unsubscribeShadow()
      unsubscribeBg()
    }
  }, [shadowOpacity, headerOpacity])

  const pagesForCommand = searchableRoutes

  const handleSelect = (to) => {
    navigate(to)
    setOpenCommand(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.21, 1, 0.29, 1] }}
        style={{ boxShadow }}
        className="sticky top-0 z-50 w-full border-b border-amber-500/20 backdrop-blur-2xl bg-gradient-to-r from-gray-200  to-amber-900"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Link to="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <img src={logooImage} className="h-24 w-24 transition-all duration-300 sm:h-20 sm:w-32" alt="Urban Store logo" />
                  <div className="absolute inset-0 rounded-lg bg-amber-500/0 transition duration-300 group-hover:bg-amber-500/10 blur-xl" />
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-1 md:flex">
              {navItems.map((item, index) => {
                const isCurrentActive = location.pathname === item.to
                return (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
                  >
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `relative rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                          isActive || isCurrentActive
                            ? 'text-amber-900 bg-amber-200/80 shadow-[0_4px_12px_rgba(148,89,16,0.25)]'
                            : 'text-amber-900/80 hover:text-amber-900 hover:bg-white/60'
                        }`
                      }
                    >
                      {item.label}
                      {(location.pathname === item.to) && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute inset-0 rounded-full bg-amber-200/80 -z-10"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </NavLink>
                  </motion.div>
                )
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Search"
                  onClick={() => setOpenCommand(true)}
                  className="relative h-10 w-10 rounded-full border border-amber-400/30 bg-white/60 text-amber-900 transition hover:border-amber-500/50 hover:bg-white/80"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </motion.div>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Cart */}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  aria-label="Cart"
                  className="relative h-10 w-10 rounded-full border border-amber-400/30 bg-white/60 text-amber-900 transition hover:border-amber-500/50 hover:bg-white/80"
                >
                  <NavLink to="/cart">
                    <ShoppingBag className="h-4 w-4" />
                    <AnimatePresence>
                      {cartCount > 0 && (
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF6600] text-[10px] font-bold text-white shadow-[0_2px_8px_rgba(255,102,0,0.5)]"
                        >
                          {cartCount > 99 ? '99+' : cartCount}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </NavLink>
                </Button>
              </motion.div>

              {/* Mobile Menu */}
              <div className="md:hidden">
                <Sheet open={openMobileMenu} onOpenChange={setOpenMobileMenu}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Open menu"
                      className="h-10 w-10 rounded-full border border-amber-400/30 bg-white/60 text-amber-900 transition hover:border-amber-500/50 hover:bg-white/80"
                    >
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className="w-full max-w-xs border-l border-amber-500/30 bg-gradient-to-b from-gray-200/95 via-white/95 to-amber-900/95 backdrop-blur-2xl"
                  >
                   
                      <h2 className="text-left text-xl font-semibold text-amber-900 mb-0 pb-0">Menu</h2>
                   

                    <nav className=" flex items-start flex-col gap-14 mt-0 pt-0">
                      {navItems.map((item, index) => {
                        const isCurrentActive = location.pathname === item.to
                        return (
                          <motion.div
                            key={item.to}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                          >
                            <SheetClose asChild>
                              <NavLink
                                to={item.to}
                                onClick={() => setOpenMobileMenu(false)}
                                className={({ isActive }) =>
                                  `flex items-start rounded-xl w-40 border px-5 py-4 text-base font-medium transition ${
                                    isActive || isCurrentActive
                                      ? 'border-amber-600/60 bg-amber-200/70 text-amber-900 shadow-[0_4px_12px_rgba(148,89,16,0.2)]'
                                      : 'border-amber-400/30 bg-white/40 text-amber-900/80 hover:border-amber-500/50 hover:bg-white/60 hover:text-amber-900'
                                  }`
                                }
                              >
                                {item.label}
                              </NavLink>
                            </SheetClose>
                          </motion.div>
                        )
                      })}
                    </nav>

                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="rounded-xl border border-amber-500/30 bg-white/60 p-4">
                        <div className="flex items-center justify-between text-sm text-amber-900/80">
                          <span>Items in cart</span>
                          <span className="font-bold text-amber-900">{cartCount}</span>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Search Dialog */}
      <CommandDialog open={openCommand} onOpenChange={setOpenCommand}>
        <CommandInput placeholder="Search pages..." className="border-amber-400/40" />
        <CommandList>
          <CommandEmpty className="py-8 text-center text-sm text-amber-900/70">No results found.</CommandEmpty>
          <CommandGroup heading="Pages" className="text-amber-900">
            {pagesForCommand.map((item) => (
              <CommandItem
                key={item.to}
                value={item.label}
                onSelect={() => handleSelect(item.to)}
                className="cursor-pointer rounded-lg px-4 py-3 text-amber-900 transition hover:bg-amber-100/70 aria-selected:bg-amber-200/70"
              >
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

