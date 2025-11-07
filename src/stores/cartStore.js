import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1) => {
        set((state) => {
          const size = product.selectedSize || product.size || 'default'
          const uid = `${product.id}-${size}`
          const existing = state.items.find((item) => item.uid === uid)
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.uid === uid
                  ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock || item.stock || 99) }
                  : item,
              ),
            }
          }

          return {
            items: [...state.items, { ...product, size, uid, quantity }],
          }
        })
      },
      removeItem: (uid) => set((state) => ({ items: state.items.filter((item) => item.uid !== uid) })),
      updateQuantity: (uid, quantity) =>
        set((state) => ({
          items: state.items.map((item) => (item.uid === uid ? { ...item, quantity: Math.max(1, quantity) } : item)),
        })),
      clear: () => set({ items: [] }),
      getCount: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
      getSubtotal: () => get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
    {
      name: 'urban-store-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
)

