import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gravity Drop Simulator',
  description: 'Experience the fascinating physics of gravity across different celestial bodies in our solar system.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}