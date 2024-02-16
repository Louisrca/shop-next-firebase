'use client'

import Navbar from './component/Navbar'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ padding: '2%' }}>
      <Navbar />

      {children}
    </div>
  )
}
