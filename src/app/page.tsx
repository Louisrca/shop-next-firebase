'use client'

import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import SignUp from './(auth)/signup/page'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="mb-2 scroll-m-20 text-xl font-extrabold tracking-tight lg:text-3xl">
        WINDOW SHOPPER
      </h1>
      <Card className="authForm">
        <CardHeader>
          <h2 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-3xl">
            Sign Up
          </h2>
        </CardHeader>
        <SignUp />
      </Card>
    </main>
  )
}
