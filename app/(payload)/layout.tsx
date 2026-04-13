import React from 'react'

export const metadata = {
  title: 'JBG Architects — Admin',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
