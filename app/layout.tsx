'use client'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ConvexProvider, ConvexReactClient } from 'convex/react'

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <ConvexProvider client={convex}>
        <html lang='en'>
          <head>
            <meta charSet='utf-8' />
            <meta
              name='viewport'
              content='width=device-width, initial-scale=1'
            />
            <meta
              name='description'
              content='AI-Assisted Code Review Platform'
            />
            <title>AI-Assisted Code Review Platform</title>
          </head>
          <body>{children}</body>
        </html>
      </ConvexProvider>
    </ClerkProvider>
  )
}
