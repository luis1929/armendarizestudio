'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className="flex items-center justify-center gap-1 mt-12"
      aria-label="Paginación de productos"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          'p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-wine'
        )}
        aria-label="Página anterior"
        aria-disabled={currentPage === 1}
      >
        <ChevronLeft className="w-5 h-5" aria-hidden="true" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={cn(
            'relative w-10 h-10 flex items-center justify-center text-sm font-medium rounded-lg transition-all duration-200',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-wine focus-visible:ring-offset-2',
            page === currentPage
              ? 'text-wine bg-wine-light'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          )}
          aria-label={`Página ${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
          {page === currentPage && (
            <span
              className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-black rounded-full"
              aria-hidden="true"
            />
          )}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          'p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-wine'
        )}
        aria-label="Página siguiente"
        aria-disabled={currentPage === totalPages}
      >
        <ChevronRight className="w-5 h-5" aria-hidden="true" />
      </button>
    </nav>
  );
}
