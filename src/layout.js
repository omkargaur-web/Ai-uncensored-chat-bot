export const metadata = {
  title: 'Uncensored AI Chat',
  description: 'My Private AI Tool',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: '#000' }}>{children}</body>
    </html>
  )
}
