import './globals.css'
import Providers from './providers'

export const metadata = {
  metadataBase: new URL('https://myportfolio-chi-eosin.vercel.app'),
  title: 'Alwin Godly Mathew | MERN Stack & React Native Developer | Freelance',
  description:
    'Alwin Godly Mathew — Freelance MERN Stack Developer (MongoDB, Express, React, Node.js) and React Native developer. Available for hire. Building scalable web and mobile applications.',
  keywords: [
    'Alwin Godly Mathew',
    'MERN stack developer',
    'React developer',
    'React Native developer',
    'Node.js developer',
    'freelance developer',
    'JavaScript developer',
    'full stack developer',
  ],
  authors: [{ name: 'Alwin Godly Mathew' }],
  robots: 'index, follow',
  alternates: { canonical: 'https://myportfolio-chi-eosin.vercel.app/' },
  openGraph: {
    type: 'website',
    url: 'https://myportfolio-chi-eosin.vercel.app/',
    title: 'Alwin Godly Mathew | MERN Stack & React Native Developer',
    description:
      'Freelance MERN Stack and React Native developer available for hire. Building scalable, user-friendly web and mobile applications.',
    images: [{ url: '/og-preview.png' }],
    siteName: 'Alwin Godly Mathew — Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alwin Godly Mathew | MERN Stack & React Native Developer',
    description: 'Freelance MERN Stack and React Native developer available for hire.',
    images: ['/og-preview.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800&family=Geist+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Alwin Godly Mathew',
              url: 'https://myportfolio-chi-eosin.vercel.app/',
              email: 'alwingodlymathew@gmail.com',
              jobTitle: 'MERN Stack & React Native Developer',
              description:
                'Freelance full-stack developer specialising in React.js, React Native, Node.js, Express and MongoDB.',
              knowsAbout: [
                'React',
                'React Native',
                'Node.js',
                'Express',
                'MongoDB',
                'JavaScript',
                'MERN Stack',
              ],
              sameAs: [
                'https://github.com/alwingodly',
                'https://www.linkedin.com/in/alwin-godly-mathew-a42754217',
              ],
            }),
          }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
