import type { Metadata } from 'next'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ConvexProvider, ConvexReactClient } from 'convex/react'

export const metadata: Metadata = {
  title: 'Code Sage AI',
  description: 'AI-Assisted Code Review Platform' || ''
}
metadata.description = metadata.description || ''

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
            <meta name='description' content={metadata.description ?? ''} />
            <title>{metadata.title as React.ReactNode}</title>
          </head>
          <body>{children}</body>
        </html>
      </ConvexProvider>
    </ClerkProvider>
  )
}
