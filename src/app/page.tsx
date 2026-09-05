import { Header } from '@/components/Header';
import { ProductGrid } from '@/components/ProductGrid';
import { WorkshopBanner } from '@/components/WorkshopBanner';
import { TrustBadges } from '@/components/TrustBadges';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { InstagramHeroCarousel } from '@/components/InstagramHeroCarousel';
import { InstagramFeed } from '@/components/InstagramFeed';
import productsData from '@/data/products.json';
import type { Product } from '@/types/product';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Armendáriz Estudio | Bolsos Artesanales Hechos a Mano en Colombia',
  description: 'Descubre bolsos artesanales únicos con diseños ilustrados y bordados. Envío gratis a toda Colombia. Pago seguro. 30 días de devolución.',
  openGraph: {
    title: 'Armendáriz Estudio | Bolsos Artesanales Hechos a Mano',
    description: 'Bolsos artesanales únicos con diseños ilustrados y bordados. Envío gratis Colombia. Pago seguro. 30 días devolución.',
    images: [{ url: '/images/og-banner.svg', width: 1200, height: 630, alt: 'Armendáriz Estudio' }],
  },
};

const products: Product[] = productsData as Product[];

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pt-20 pb-16 px-6 max-w-7xl mx-auto flex-1">
        <InstagramHeroCarousel autoPlay autoPlayInterval={5000} maxPosts={6} />
        <WorkshopBanner />
        <ProductGrid products={products} />
        <TrustBadges />
        <InstagramFeed />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
