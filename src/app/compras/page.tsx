'use client';

import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';

interface Pedido {
  nombre: string;
  telefono: string;
  email: string;
  total: number;
}

export default function ComprasPage() {
  const { items, count, addItem, removeItem, clearCart } = useCart();
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ordenExitosa, setOrdenExitosa] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + (item.salePrice || item.originalPrice || 0) * item.quantity, 0);

  if (count === 0) {
    return (
      <main className="pt-20 pb-16 px-6 max-w-7xl mx-auto flex-1">
        <h1 className="font-playfair uppercase tracking-wider text-3xl font-medium text-gray-900 mb-8">
          Carrito de Compras
        </h1>
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <img src="/images/empty-cart.svg" alt="Carrito vacío" className="mx-auto mb-4 h-24" />
          <p className="text-gray-600 text-lg">No hay productos ni servicios agregados</p>
          <p className="text-gray-500 mt-2">Explora nuestros proyectos y servicios para agregar al carrito</p>
          <a href="/proyectos" className="mt-4 inline-block text-wine underline">
            Ver Proyectos
          </a>
        </div>
      </main>
    );
  }

  const handleEnviarPedido = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const respuesta = await fetch(`${API_URL}/api/v1/contacto`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          email,
          telefono,
          mensaje: `Pedido de ${count} item(ns) por $${subtotal.toLocaleString()}`,
          tipo_servicio: 'pedido',
        }),
      });

      if (!respuesta.ok) {
        const errData = await respuesta.json();
        throw new Error(errData.detail || 'Error al procesar el pedido');
      }

      setOrdenExitosa(true);
      clearCart();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-20 pb-16 px-6 max-w-7xl mx-auto flex-1">
      <h1 className="font-playfair uppercase tracking-wider text-3xl font-medium text-gray-900 mb-8">
        Carrito de Compras
      </h1>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p className="font-medium">Error:</p>
          <p className="mt-1 text-sm">{error}</p>
        </div>
      )}

      {loading && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
          <p className="font-medium">Enviando pedido...</p>
        </div>
      )}

      {ordenExitosa && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6">
          <p className="font-medium">Pedido confirmado con éxito</p>
          <p className="mt-1">Tu pedido ha sido recibido y nos pondremos en contacto pronto.</p>
          <button
            onClick={() => setOrdenExitosa(false)}
            className="mt-2 inline-block text-wine underline"
          >
            Volver al inicio
          </button>
        </div>
      )}

      {/* Resumen del carrito */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="font-playfair uppercase tracking-wider text-xl font-medium text-gray-900 mb-4">
          Resumen del Pedido
        </h2>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <span className="font-medium text-gray-900">
                {item.title ?? item.name ?? 'Producto'}
              </span>
              <span className="text-sm text-gray-500">
                {item.quantity}x
              </span>
            </div>
          ))}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Subtotal</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-900">
              <span>Total</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Formulario de confirmación */}
      <form onSubmit={handleEnviarPedido} className="max-w-md">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre
            </label>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              type="text"
              name="nombre"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-wine transition-colors"
              aria-label="Nombre completo"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Teléfono
            </label>
            <input
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              type="tel"
              name="telefono"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-wine transition-colors"
              aria-label="Teléfono"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correo Electrónico
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-wine transition-colors"
              aria-label="Correo electrónico"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-6 font-playfair uppercase tracking-wider text-lg font-medium text-white bg-wine hover:bg-wine-hover transition-colors rounded mt-4"
        >
          {loading ? 'Enviando...' : 'Confirmar Pedido / Solicitar Cotización'}
        </button>
      </form>
    </main>
  );
}