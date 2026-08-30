import {Analytics} from '@vercel/analytics/next'
import {SpeedInsights} from '@vercel/speed-insights/next'
import type {Metadata} from 'next'
import {Archivo} from 'next/font/google'

import {CartDrawer} from '@/components/CartDrawer'
import {CartProvider} from '@/components/CartProvider'
import {SiteFooter} from '@/components/SiteFooter'
import {SiteNav} from '@/components/SiteNav'
import {getSettings} from '@/lib/content'
import {cartCopy} from '@/lib/fallbacks'

import './globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['200', '300', '400'],
  display: 'swap',
  variable: '--font-archivo',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://grangerie.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Grangerie — Comfort is the new sex.',
    template: '%s — Grangerie',
  },
  description:
    'Floor-length, heavyweight, fully-covering sleepwear. A pair of nap socks ships with every order. You did not ask for them. They are in the box.',
  openGraph: {
    siteName: 'Grangerie',
    type: 'website',
    url: siteUrl,
  },
}

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const settings = await getSettings()

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Grangerie',
    url: siteUrl,
    email: 'hello@grangerie.com',
    slogan: 'Comfort is the new sex.',
  }

  return (
    <html lang="en" className={archivo.variable}>
      <body>
        <CartProvider>
          {settings.announcementBar && (
            <p
              className="gr-label"
              style={{
                margin: 0,
                textAlign: 'center',
                padding: '10px 20px',
                background: '#201e1d',
                color: '#fff',
                letterSpacing: '0.2em',
              }}
            >
              {settings.announcementBar}
            </p>
          )}
          <SiteNav settings={settings} />
          <main>{children}</main>
          <SiteFooter settings={settings} />
          <CartDrawer socksNote={cartCopy.socksNote} />
        </CartProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(organizationJsonLd)}}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
