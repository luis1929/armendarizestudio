'use client';

import { MessageCircle } from 'lucide-react';

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.link/6jgk9x"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-[bounce-subtle_2s_infinite]"
      aria-label="Contactar por WhatsApp"
      title="Contactar por WhatsApp"
    >
      <MessageCircle className="w-6 h-6" aria-hidden="true" />
    </a>
  );
}
