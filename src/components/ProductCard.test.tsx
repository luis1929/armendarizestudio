import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { CartProvider, useCart } from '@/contexts/CartContext';
import { ProductCard } from './ProductCard';
import type { Product } from '@/types/product';

const mockProduct: Product = {
  id: 'bolso-test',
  title: 'BOLSO TEST',
  image: '/images/test.svg',
  originalPrice: 100000,
  salePrice: 50000,
  discount: 50,
  whatsappUrl: 'https://wa.link/test',
};

const CartCountDisplay = () => {
  const { count } = useCart();
  return <span data-testid="cart-count">{count}</span>;
};

const TestWrapper = ({ product }: { product: Product }) => {
  return (
    <CartProvider>
      <CartCountDisplay />
      <ProductCard product={product} />
    </CartProvider>
  );
};

describe('ProductCard', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders product title', () => {
    render(<TestWrapper product={mockProduct} />);
    act(() => {
      vi.runAllTimers();
    });
    expect(screen.getByText('BOLSO TEST')).toBeInTheDocument();
  });

  it('renders sale price', () => {
    render(<TestWrapper product={mockProduct} />);
    act(() => {
      vi.runAllTimers();
    });
    expect(screen.getByText((content) => content.includes('50.000'))).toBeInTheDocument();
  });

  it('renders original price with strikethrough', () => {
    render(<TestWrapper product={mockProduct} />);
    act(() => {
      vi.runAllTimers();
    });
    expect(screen.getByText((content) => content.includes('100.000'))).toBeInTheDocument();
  });

  it('renders discount badge', () => {
    render(<TestWrapper product={mockProduct} />);
    act(() => {
      vi.runAllTimers();
    });
    expect(screen.getByText('-50%')).toBeInTheDocument();
  });

  it('renders add to cart button', () => {
    render(<TestWrapper product={mockProduct} />);
    act(() => {
      vi.runAllTimers();
    });
    expect(screen.getByRole('button', { name: /Agregar BOLSO TEST al carrito/i })).toBeInTheDocument();
  });

  it('renders WhatsApp link', () => {
    render(<TestWrapper product={mockProduct} />);
    act(() => {
      vi.runAllTimers();
    });
    const link = screen.getByRole('link', { name: /Contactar por WhatsApp/i });
    expect(link).toHaveAttribute('href', expect.stringContaining('wa.link/test'));
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('adds item to cart when button clicked', () => {
    render(<TestWrapper product={mockProduct} />);
    act(() => {
      vi.runAllTimers();
    });
    fireEvent.click(screen.getByRole('button', { name: /Agregar BOLSO TEST al carrito/i }));
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
  });

  it('renders JSON-LD structured data', () => {
    render(<TestWrapper product={mockProduct} />);
    act(() => {
      vi.runAllTimers();
    });
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts.length).toBeGreaterThan(0);
    const jsonLd = JSON.parse(scripts[0].textContent || '{}');
    expect(jsonLd['@type']).toBe('Product');
    expect(jsonLd.name).toBe('BOLSO TEST');
    expect(jsonLd.offers.price).toBe(50000);
  });

  it('renders image with correct alt text', () => {
    render(<TestWrapper product={mockProduct} />);
    act(() => {
      vi.runAllTimers();
    });
    const img = screen.getByAltText('BOLSO TEST');
    expect(img).toHaveAttribute('src', '/images/test.svg');
  });
});