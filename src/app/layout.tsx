import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { AuthProvider } from '@/context/AuthUserProvider'
import ProtectedRoute from './utils/ProtectedRoute'
import { CartProvider } from '@/context/card/CardProvider'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Window Shopper',
  description: 'e-commerce app for school',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <ProtectedRoute>
              {children} <Toaster />{' '}
            </ProtectedRoute>{' '}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
