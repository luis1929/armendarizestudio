'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import { LogoEmblem } from './LogoEmblem';
import { useCart } from '@/contexts/CartContext';
import { CartDrawer } from './CartDrawer';

const navLinks = [
  { href: '#mas-vendidos', label: 'MÁS VENDIDOS' },
  { href: '#bolsos', label: 'BOLSOS ARTESANALES' },
  { href: '#talleres', label: 'TALLERES Y BIENESTAR' },
  { href: '#regalos', label: 'REGALOS ARTÍSTICOS' },
  { href: '#contacto', label: 'CONTÁCTENOS' },
  { href: '/rastrear', label: 'RASTREAR MI PEDIDO' },
];

export function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { count } = useCart();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-18">
            <button
              type="button"
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={isDrawerOpen}
            >
              <Menu className="w-6 h-6" aria-hidden="true" />
            </button>

            <div className="flex items-center justify-center flex-1 lg:flex-none">
              <Link href="/" className="flex items-center gap-4" aria-label="Armendáriz Estudio - Inicio">
                <span className="font-playfair uppercase tracking-wider text-lg font-medium text-gray-900">
                  ARMENDARIZ
                </span>
                <LogoEmblem className="w-12 h-12 text-wine" />
                <span className="font-playfair uppercase tracking-wider text-lg font-medium text-gray-900">
                  ESTUDIO
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Buscar"
              >
                <Search className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
                aria-label={`Carrito de compras, ${count} artículos`}
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag className="w-5 h-5" aria-hidden="true" />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center bg-wine text-white text-xs font-bold rounded-full">
                    {count > 99 ? '99+' : count}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} navLinks={navLinks} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { href: string; label: string }[];
}

function MobileDrawer({ isOpen, onClose, navLinks }: MobileDrawerProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/50 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className="fixed inset-y-0 left-0 z-[60] w-[85%] max-w-sm bg-white lg:hidden transform transition-transform duration-300 ease-out"
        style={{ transform: isOpen ? 'translateX(0)' : 'translateX(-100%)' }}
        aria-label="Menú de navegación"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <Link href="/" className="flex items-center gap-3" aria-label="Armendáriz Estudio - Inicio">
              <span className="font-playfair uppercase tracking-wider text-lg font-medium text-gray-900">
                ARMENDARIZ
              </span>
              <LogoEmblem className="w-10 h-10 text-wine" />
              <span className="font-playfair uppercase tracking-wider text-lg font-medium text-gray-900">
                ESTUDIO
              </span>
            </Link>
            <button
              type="button"
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              onClick={onClose}
              aria-label="Cerrar menú"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 py-6">
            <ul className="space-y-1" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-4 px-2 border-b border-gray-100 font-medium uppercase tracking-wide text-sm text-gray-700 hover:text-wine transition-colors"
                    onClick={onClose}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-6 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center uppercase tracking-wider">
              © 2025 Armendáriz Estudio
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
