'use client'

import './globals.css'
import 'react-toastify/dist/ReactToastify.css'

import { useState } from 'react'
import { Inter } from 'next/font/google'

import { FilePicker } from '@/components/FilePicker'
import { TableContents } from '@/components/TableContents'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Loading state for the application, used to reload the list
  const [loading, setLoading] = useState<boolean>(false)
  const handleLoading = (state: boolean) => {
    setLoading(state)
  }

  return (
    <html lang="pt-BR">
      <head>
        <title>Aplicação Upload</title>
      </head>
      <body className={`${inter.className} bg-white-100 text-gray-700`}>
        <main className="grid min-h-screen grid-rows-[125px,_1fr]">
          {/* Top */}
          <FilePicker loading={loading} handleLoading={handleLoading} />

          {/* Bottom */}
          <div className="flex-1 items-center justify-center bg-white-100 px-10 py-10 text-center">
            <TableContents loading={loading} handleLoading={handleLoading} />
          </div>

          {/* Alertas */}
          {children}
        </main>
      </body>
    </html>
  )
}
