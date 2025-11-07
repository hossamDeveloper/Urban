import { lazy } from 'react'
import { Layout } from '@/components/layout/Layout'

const HomePage = lazy(() => import('@/pages/Home'))
const ShopPage = lazy(() => import('@/pages/Shop'))
const ProductPage = lazy(() => import('@/pages/Product'))
const CartPage = lazy(() => import('@/pages/Cart'))
const CheckoutPage = lazy(() => import('@/pages/Checkout'))
const AboutPage = lazy(() => import('@/pages/About'))
const ContactPage = lazy(() => import('@/pages/Contact'))

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'shop',
        element: <ShopPage />,
      },
      {
        path: 'product/:id',
        element: <ProductPage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'checkout',
        element: <CheckoutPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
    ],
  },
]

export const searchableRoutes = [
  { path: '/', label: 'Home' },
  { path: '/shop', label: 'Shop' },
  { path: '/cart', label: 'Cart' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
]

export default routes

