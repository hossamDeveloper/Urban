import { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function Carousel({ items, renderItem, className, autoplay = true }) {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' }, autoplay ? [Autoplay({ delay: 5000 })] : [])

  const handleRef = useCallback(
    (node) => {
      if (node) {
        emblaRef(node)
      }
    },
    [emblaRef],
  )

  return (
    <div className={cn('overflow-hidden', className)} ref={handleRef}>
      <div className="flex">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="min-w-0 flex-[0_0_80%] pr-4 md:flex-[0_0_33%]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            {renderItem(item)}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

