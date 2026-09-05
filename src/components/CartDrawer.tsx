'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatCOP } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { Button } from './ui/Button';
import productsData from '@/data/products.json';
import type { Product } from '@/types/product';

const products: Product[] = productsData as Product[];

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, count, addItem, removeItem, clearCart } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + (product?.salePrice ?? 0) * item.quantity;
  }, 0);

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={cn(
          'fixed inset-y-0 right-0 z-[60] w-full max-w-md bg-white transform transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        aria-label="Carrito de compras"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="font-medium uppercase tracking-wide text-lg text-gray-900">
              Carrito ({count})
            </h2>
            <button
              type="button"
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              onClick={onClose}
              aria-label="Cerrar carrito"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Tu carrito está vacío</p>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-wine hover:underline font-medium"
                >
                  Seguir comprando
                </button>
              </div>
            ) : (
              <ul className="space-y-4" role="list">
                {items.map((cartItem) => {
                  const product = products.find(p => p.id === cartItem.id);
                  if (!product) return null;
                  return (
                    <li key={cartItem.id} className="flex gap-4">
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm text-gray-900 line-clamp-1">
                          {product.title}
                        </h3>
                        <p className="text-wine font-semibold text-sm mt-1">
                          {formatCOP(product.salePrice)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => addItem(product.id)}
                            className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded text-gray-700"
                            aria-label="Incrementar cantidad"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <span className="text-sm font-medium w-8 text-center">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => removeItem(product.id)}
                            className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded text-gray-700"
                            aria-label="Decrementar cantidad"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeItem(product.id)}
                            className="ml-auto p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                            aria-label="Eliminar producto"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 border-t border-gray-100 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold text-gray-900">{formatCOP(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Envío</span>
                <span className="font-medium text-green-600">GRATIS</span>
              </div>
              <div className="flex justify-between text-lg font-semibold border-t pt-4">
                <span>Total</span>
                <span>{formatCOP(subtotal)}</span>
              </div>

              <Button
                variant="primary"
                className="w-full"
                size="lg"
                onClick={() => {
                  onClose();
                  const message = encodeURIComponent(
                    `Hola, quiero finalizar mi pedido:\n${items.map(i => {
                      const p = products.find(x => x.id === i.id);
                      return `${p?.title} x${i.quantity} - ${formatCOP((p?.salePrice ?? 0) * i.quantity)}`;
                    }).join('\n')}\nTotal: ${formatCOP(subtotal)}`
                  );
                  window.open(`https://wa.link/6jgk9x?text=${message}`, '_blank');
                }}
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                Finalizar pedido por WhatsApp
              </Button>

              <button
                type="button"
                onClick={clearCart}
                className="w-full text-center text-sm text-gray-500 hover:text-wine transition-colors"
              >
                Vaciar carrito
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
