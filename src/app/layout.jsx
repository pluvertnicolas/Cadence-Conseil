export const metadata = {
  title: 'Cadence Conseil — Stratégie média & relation client',
  description: 'Nicolas Pluvert — Consultant indépendant. Stratégie média, performance et relation client. Bordeaux.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
