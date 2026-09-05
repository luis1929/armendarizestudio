'use client';

import { Truck, ShieldCheck, RotateCcw } from 'lucide-react';

const badges = [
  {
    icon: Truck,
    title: 'ENVÍO GRATIS',
    description: 'Enviamos a toda Colombia por Servientrega e Inter Rapidísimo — entrega rápida y confiable.',
  },
  {
    icon: ShieldCheck,
    title: 'PAGO SEGURO',
    description: 'Pago protegido vía PSE, tarjetas de crédito/débito y pasarela segura en el carrito.',
  },
  {
    icon: RotateCcw,
    title: 'POLÍTICA DE DEVOLUCIÓN',
    description: '¿No quedó satisfecho? Garantía de cambio o devolución dentro de los 30 días.',
  },
] as const;

export function TrustBadges() {
  return (
    <section className="py-16 px-6 bg-gray-50 border-y border-gray-100" aria-labelledby="trust-heading">
      <h2 id="trust-heading" className="sr-only">
        Garantías de confianza
      </h2>
      <div className="max-w-7xl mx-auto">
        <dl className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {badges.map((badge, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-wine-light rounded-lg">
                <badge.icon className="w-6 h-6 text-wine" aria-hidden="true" />
              </div>
              <div>
                <dt className="font-medium uppercase tracking-wide text-sm text-gray-900 mb-1">
                  {badge.title}
                </dt>
                <dd className="text-sm text-gray-600 leading-relaxed">
                  {badge.description}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
