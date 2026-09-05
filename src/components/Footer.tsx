'use client';

import Link from 'next/link';
import { MessageCircle, Mail, MapPin, Clock, Truck, ShieldCheck, RotateCcw } from 'lucide-react';

const footerLinks = {
  informacion: [
    { href: '#contacto', label: 'Contacto' },
    { href: '/privacidad', label: 'Política de privacidad' },
    { href: '/devoluciones', label: 'Política de devoluciones' },
    { href: '/envios', label: 'Política de envío' },
    { href: '/terminos', label: 'Términos de servicio' },
  ],
  contacto: [
    { icon: Mail, text: 'info@armendarizestudio.com' },
    { icon: MapPin, text: 'Barranquilla, Colombia' },
    { icon: Clock, text: 'Lun - Dom: 9:00 - 18:00' },
    { icon: MessageCircle, text: 'WhatsApp: +57 300 000 0000' },
  ],
};

const paymentMethods = [
  { name: 'American Express', icon: 'Amex' },
  { name: 'Apple Pay', icon: 'Apple' },
  { name: 'Google Pay', icon: 'GPay' },
  { name: 'Maestro', icon: 'Maestro' },
  { name: 'Mastercard', icon: 'MC' },
  { name: 'Shop Pay', icon: 'Shop' },
  { name: 'Visa', icon: 'Visa' },
];

function SocialIcon({ name, href }: { name: 'facebook' | 'instagram'; href: string }) {
  const icons = {
    facebook: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    instagram: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  };
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-wine transition-colors" aria-label={name.charAt(0).toUpperCase() + name.slice(1)}>
      {icons[name]}
    </a>
  );
}

function PaymentIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactElement> = {
    Amex: (
      <svg viewBox="0 0 100 60" fill="currentColor" aria-hidden="true"><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fontSize="20" fontWeight="bold" fontFamily="sans-serif">AMEX</text></svg>
    ),
    Apple: (
      <svg viewBox="0 0 100 60" fill="currentColor" aria-hidden="true"><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fontSize="18" fontWeight="bold" fontFamily="sans-serif"> Pay</text></svg>
    ),
    GPay: (
      <svg viewBox="0 0 100 60" fill="currentColor" aria-hidden="true"><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fontSize="16" fontWeight="bold" fontFamily="sans-serif">G Pay</text></svg>
    ),
    Maestro: (
      <svg viewBox="0 0 100 60" fill="currentColor" aria-hidden="true"><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fontSize="14" fontWeight="bold" fontFamily="sans-serif">Maestro</text></svg>
    ),
    MC: (
      <svg viewBox="0 0 100 60" fill="currentColor" aria-hidden="true"><circle cx="35" cy="30" r="20" fill="#EB001B"/><circle cx="65" cy="30" r="20" fill="#F79E1B"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fontSize="8" fill="white" fontFamily="sans-serif">Mastercard</text></svg>
    ),
    Shop: (
      <svg viewBox="0 0 100 60" fill="currentColor" aria-hidden="true"><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fontSize="16" fontWeight="bold" fontFamily="sans-serif">Shop Pay</text></svg>
    ),
    Visa: (
      <svg viewBox="0 0 100 60" fill="#1A1F71" aria-hidden="true"><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fontSize="20" fontWeight="bold" fontFamily="sans-serif" fill="white">VISA</text></svg>
    ),
  };
  return icons[name] || null;
}

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6" aria-label="Armendáriz Estudio - Inicio">
              <span className="font-playfair uppercase tracking-wider text-lg font-medium text-gray-900">
                ARMENDARIZ
              </span>
              <svg className="w-10 h-10 text-wine" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <circle cx="24" cy="24" r="2.5" fill="currentColor" />
              </svg>
              <span className="font-playfair uppercase tracking-wider text-lg font-medium text-gray-900">
                ESTUDIO
              </span>
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              Bolsos artesanales hechos a mano con diseños únicos ilustrados y bordados. Cada pieza cuenta una historia de tradición y creatividad colombiana.
            </p>
            <div className="flex gap-4">
              <SocialIcon name="facebook" href="https://facebook.com" />
              <SocialIcon name="instagram" href="https://instagram.com" />
            </div>
          </div>

          <div>
            <h3 className="font-medium uppercase tracking-wide text-sm text-gray-900 mb-4">INFORMACIÓN</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.informacion.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-600 hover:text-wine transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium uppercase tracking-wide text-sm text-gray-900 mb-4">CONTACTO</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.contacto.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <item.icon className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-sm text-gray-600">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium uppercase tracking-wide text-sm text-gray-900 mb-4">GARANTÍAS</h3>
            <dl className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-wine-light rounded-lg">
                  <Truck className="w-4 h-4 text-wine" aria-hidden="true" />
                </div>
                <div>
                  <dt className="font-medium text-sm text-gray-900">Envío gratis</dt>
                  <dd className="text-xs text-gray-500">Servientrega e Inter Rapidísimo</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-wine-light rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-wine" aria-hidden="true" />
                </div>
                <div>
                  <dt className="font-medium text-sm text-gray-900">Pago seguro</dt>
                  <dd className="text-xs text-gray-500">PSE, tarjetas, pasarela segura</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-wine-light rounded-lg">
                  <RotateCcw className="w-4 h-4 text-wine" aria-hidden="true" />
                </div>
                <div>
                  <dt className="font-medium text-sm text-gray-900">30 días devolución</dt>
                  <dd className="text-xs text-gray-500">Cambio o reembolso garantizado</dd>
                </div>
              </div>
            </dl>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm text-gray-500 text-center md:text-left">
              © 2025 Armendáriz Estudio. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-3 flex-wrap justify-center md:justify-end" role="list" aria-label="Métodos de pago aceptados">
              {paymentMethods.map((method) => (
                <span key={method.name} className="w-20 h-12 flex items-center justify-center" role="listitem">
                  <PaymentIcon name={method.icon} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
