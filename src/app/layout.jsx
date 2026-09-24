export const metadata = {
  title: 'Cadence Conseil — Stratégie média, supply CTV & opérations',
  description: 'Nicolas Pluvert, consultant indépendant. Stratégie média, supply CTV, process et automatisation IA pour agences, ad tech et annonceurs. Bordeaux et Paris.',
  openGraph: {
    title: 'Cadence Conseil — Nicolas Pluvert',
    description: 'Stratégie média, supply CTV, process et automatisation IA. 10 ans en agence digitale, consultant indépendant entre Bordeaux et Paris.',
    images: ['/nicolas-pluvert.jpg'],
    locale: 'fr_FR',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&family=Barlow:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
