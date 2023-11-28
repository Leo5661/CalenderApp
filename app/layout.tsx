import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from '@/providers/providers'

import SideBar from '@/components/SideBar'
import { Divider } from '@nextui-org/react'
import Header from '@/components/Header'

const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'cal.ai',
  description: 'Manage your events and task smartly',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={jetBrainsMono.className}>
        <Providers>
          <div className="flex h-screen w-screen justify-between overflow-hidden bg-background p-2 text-foreground">
            <SideBar />
            <Divider orientation="vertical" />
            <div className="flex flex-grow flex-col">
              <Header />
              <Divider className="mt-2" />
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
