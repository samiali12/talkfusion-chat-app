'use client'

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AuthContext from './context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TalkFusion | Messageing app',
  description: 'Exchange messages, share images and videos, and even send voice notes effortlessly. Stay connected with friends and loved ones in a fun and interactive way',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext> { children}</AuthContext>
     
      </body>
    </html>
  )
}
