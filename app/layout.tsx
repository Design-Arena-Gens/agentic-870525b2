import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Panic Button Dashboard',
  description: 'Emergency panic button system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
