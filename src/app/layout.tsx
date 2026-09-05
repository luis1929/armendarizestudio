import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { CartProvider } from '@/contexts/CartContext';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadataBase = new URL('https://armendarizestudio.com');

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  title: {
    default: 'Armendáriz Estudio | Bolsos Artesanales Hechos a Mano en Colombia',
    template: '%s | Armendáriz Estudio',
  },
  description: 'Descubre bolsos artesanales únicos con diseños ilustrados y bordados. Envío gratis a toda Colombia. Pago seguro. 30 días de devolución.',
  keywords: ['bolsos artesanales', 'hechos a mano', 'Colombia', 'diseño artesanal', 'bolsos bordados', 'regalos únicos'],
  authors: [{ name: 'Armendáriz Estudio' }],
  creator: 'Armendáriz Estudio',
  publisher: 'Armendáriz Estudio',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://armendarizestudio.com',
    siteName: 'Armendáriz Estudio',
    title: 'Armendáriz Estudio | Bolsos Artesanales Hechos a Mano',
    description: 'Bolsos artesanales únicos con diseños ilustrados y bordados. Envío gratis Colombia. Pago seguro. 30 días devolución.',
    images: [
      {
        url: '/images/og-banner.svg',
        width: 1200,
        height: 630,
        alt: 'Armendáriz Estudio - Bolsos Artesanales',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Armendáriz Estudio | Bolsos Artesanales',
    description: 'Bolsos artesanales únicos hechos a mano en Colombia. Envío gratis.',
    images: ['/images/og-banner.svg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col font-inter">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
