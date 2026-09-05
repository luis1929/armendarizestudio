'use client';

import { useState, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { Pagination } from './Pagination';
import type { Product } from '@/types/product';

const ITEMS_PER_PAGE = 6;

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return products.slice(start, start + ITEMS_PER_PAGE);
  }, [products, currentPage]);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  return (
    <section aria-labelledby="catalog-heading">
      <h2 id="catalog-heading" className="sr-only">
        Catálogo de productos
      </h2>
      <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </section>
  );
}
