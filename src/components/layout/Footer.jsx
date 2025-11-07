import { motion } from 'framer-motion'
import { Facebook, Instagram, Twitter } from 'lucide-react'
import { Link } from 'react-router-dom'

const socials = [
  { icon: Facebook, href: 'https://facebook.com' },
  { icon: Instagram, href: 'https://instagram.com' },
  { icon: Twitter, href: 'https://twitter.com' },
]

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-black text-white"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:justify-between">
        <div>
          <h3 className="text-2xl font-semibold uppercase tracking-wide">Urban Store</h3>
          <p className="mt-2 max-w-sm text-sm text-gray-300">
            Style that speaks. Discover elevated essentials crafted for the modern city explorer.
          </p>
        </div>
        <div className="grid gap-3 text-sm">
          <span className="text-xs uppercase tracking-[0.2em] text-gray-400">Quick Links</span>
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <Link to="/shop" className="hover:text-primary">
            Shop
          </Link>
          <Link to="/about" className="hover:text-primary">
            About
          </Link>
          <Link to="/contact" className="hover:text-primary">
            Contact
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-xs uppercase tracking-[0.2em] text-gray-400">Follow Us</span>
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href }) => (
              <a key={href} href={href} target="_blank" rel="noreferrer" className="rounded-full bg-white/10 p-2 transition hover:bg-white/20">
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-400">
        © 2025 Urban Store. All rights reserved.
      </div>
    </motion.footer>
  )
}

