'use client'

import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import SignUp from './(auth)/signup/page'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card style={{ padding: 24, width: 400 }}>
        <CardHeader>
          <CardTitle style={{ fontSize: 34 }}>Sign Up</CardTitle>
        </CardHeader>
        <SignUp />
      </Card>
    </main>
  )
}
