import * as React from 'react'
import * as ToastPrimitives from '@radix-ui/react-toast'
import { cva } from 'class-variance-authority'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn('fixed top-4 right-4 z-[100] flex max-h-screen w-full max-w-sm flex-col gap-3 p-0', className)}
    {...props}
  />
))

ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center space-x-4 overflow-hidden rounded-2xl border border-amber-500/50 bg-white/95 p-6 text-amber-900 shadow-[0_18px_50px_rgba(148,89,16,0.25)] backdrop-blur-xl transition-all data-[state=open]:animate-[toast-in-right_0.5s_cubic-bezier(0.21,1,0.29,1)_both] data-[state=closed]:animate-[toast-out-right_0.3s_ease-in] data-[state=swipe=end]:animate-[toast-out-right_0.3s_ease-in] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=swipe=cancel]:translate-x-0 data-[state=swipe=cancel]:transition-none',
  {
    variants: {
      variant: {
        default: '',
        destructive: 'bg-red-100/90 text-red-900 border-red-400/70',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return <ToastPrimitives.Root ref={ref} className={cn(toastVariants({ variant }), className)} {...props} />
})

Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Action ref={ref} className={cn('inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-input bg-transparent px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50', className)} {...props} />
))

ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Close ref={ref} className={cn('absolute right-2 top-2 rounded-md p-1 text-muted-foreground transition-opacity hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2', className)} {...props}>
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))

ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Title ref={ref} className={cn('text-sm font-semibold', className)} {...props} />
))

ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Description ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
))

ToastDescription.displayName = ToastPrimitives.Description.displayName

export { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose, ToastAction }

