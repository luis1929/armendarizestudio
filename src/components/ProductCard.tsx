'use client';

import Image from 'next/image';
import { MessageCircle, ShoppingBag } from 'lucide-react';
import { Button } from './ui/Button';
import { formatCOP } from '@/lib/utils';
import type { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product.id);
  };

  const whatsappMessage = encodeURIComponent(
    `Hola, me interesa el ${product.title} (${formatCOP(product.salePrice)})`
  );
  const whatsappUrl = `${product.whatsappUrl}?text=${whatsappMessage}`;

  return (
    <article className="group relative bg-white rounded-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-gray-200">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
        />
        <span className="absolute top-3 left-3 z-10 bg-wine text-white text-xs font-bold px-2 py-1 rounded">
          -{product.discount}%
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-playfair uppercase tracking-wider text-sm font-medium text-gray-900 line-clamp-2 mb-4">
          {product.title}
        </h3>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-wine font-semibold text-lg" aria-label={`Precio de oferta ${formatCOP(product.salePrice)}`}>
            {formatCOP(product.salePrice)}
          </span>
          <span className="text-gray-400 line-through text-sm" aria-label={`Precio original ${formatCOP(product.originalPrice)}`}>
            {formatCOP(product.originalPrice)}
          </span>
        </div>

        <div className="flex gap-2">
          <Button
            variant="primary"
            size="md"
            className="flex-1"
            onClick={handleAddToCart}
            aria-label={`Agregar ${product.title} al carrito`}
          >
            <ShoppingBag className="w-4 h-4" aria-hidden="true" />
            Agregar al carrito
          </Button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors flex items-center justify-center"
            aria-label={`Contactar por WhatsApp sobre ${product.title}`}
          >
            <MessageCircle className="w-5 h-5" aria-hidden="true" />
          </a>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org/',
              '@type': 'Product',
              name: product.title,
              image: product.image,
              description: `Bolso artesanal hecho a mano - ${product.title}`,
              brand: {
                '@type': 'Brand',
                name: 'Armendáriz Estudio',
              },
              offers: {
                '@type': 'Offer',
                url: product.whatsappUrl,
                priceCurrency: 'COP',
                price: product.salePrice,
                priceValidUntil: '2025-12-31',
                availability: 'https://schema.org/InStock',
                seller: {
                  '@type': 'Organization',
                  name: 'Armendáriz Estudio',
                },
              },
            }),
          }}
        />
      </div>
    </article>
  );
}
