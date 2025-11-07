import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ShoppingBag, Menu, Search } from 'lucide-react'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useCartStore } from '@/stores/cartStore'
import { searchableRoutes } from '@/routes/routes'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export function Header() {
  const cartCount = useCartStore((state) => state.items.reduce((total, item) => total + item.quantity, 0))
  const [openCommand, setOpenCommand] = useState(false)
  const navigate = useNavigate()
  const { scrollY } = useScroll()
  const shadowOpacity = useTransform(scrollY, [0, 100], [0, 0.15])
  const [boxShadow, setBoxShadow] = useState('0 10px 30px rgba(0,0,0,0)')

  useEffect(() => {
    const unsubscribe = shadowOpacity.on('change', (value) => {
      setBoxShadow(`0 10px 30px rgba(0,0,0,${value})`)
    })
    return () => unsubscribe()
  }, [shadowOpacity])

  const pagesForCommand = searchableRoutes

  const handleSelect = (to) => {
    navigate(to)
    setOpenCommand(false)
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      style={{ boxShadow }}
      className="sticky top-0 z-40 w-full bg-transparent"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between rounded-full border border-amber-500/40 bg-gradient-to-r from-gray-200/85 to-amber-900/85 px-4 py-2 backdrop-blur-xl shadow-[0_12px_30px_rgba(148,89,16,0.25)]">
          <Link to="/" className="flex items-center gap-2 text-lg font-semibold uppercase tracking-widest text-slate-900">
            <img src="../src/assets/logoo.png" className="h-10 w-24 drop-shadow-md sm:h-16" alt="logo" />
          </Link>

        <nav className="hidden items-center gap-2 md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.to}>
                  <NavigationMenuLink asChild>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `rounded-full border px-4 py-2 text-sm font-medium transition ${
                          isActive
                            ? 'text-amber-900 border-amber-600/70 bg-amber-200/70 shadow-glow'
                            : 'text-slate-800 border-amber-500/40 hover:bg-white/60 hover:text-amber-900'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Search" onClick={() => setOpenCommand(true)} className="text-slate-700 hover:bg-white/60 hover:text-amber-900">
            <Search className="h-5 w-5" />
          </Button>
          <ThemeToggle />
          <Button asChild variant="ghost" size="icon" aria-label="Cart" className="relative text-slate-700 hover:bg-white/60 hover:text-amber-900">
            <NavLink to="/cart">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF6600] text-[10px] font-semibold text-white">
                  {cartCount}
                </span>
              )}
            </NavLink>
          </Button>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu" className="text-slate-700 hover:bg-white/60 hover:text-amber-900">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs border-l border-amber-500/40 bg-gradient-to-b from-gray-200/95 to-amber-900/90 text-slate-900 backdrop-blur-xl">
                <nav className="mt-8 flex flex-col gap-4">
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.to}>
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          `rounded-full border px-4 py-2 text-base font-medium transition ${
                            isActive
                              ? 'text-amber-900 border-amber-600/70 bg-amber-200/70'
                              : 'text-slate-700 border-amber-500/40 hover:bg-white/60 hover:text-amber-900'
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    </SheetClose>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        </div>
      </div>

      <CommandDialog open={openCommand} onOpenChange={setOpenCommand}>
        <CommandInput placeholder="Search pages..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            {pagesForCommand.map((item) => (
              <CommandItem key={item.to} value={item.label} onSelect={() => handleSelect(item.to)} className="cursor-pointer">
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </motion.header>
  )
}

