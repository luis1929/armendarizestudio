'use client';

import Image from 'next/image';

export function WorkshopBanner() {
  return (
    <section className="relative mt-16 mb-8" aria-labelledby="workshop-heading">
      <h2 id="workshop-heading" className="sr-only">
        Nuestro taller artesanal
      </h2>
      <div className="relative aspect-[2.5/1] w-full overflow-hidden rounded-2xl bg-gray-100">
        <Image
          src="/images/workshop-banner.svg"
          alt="Taller artesanal Armendáriz Estudio - Barranquilla, Colombia"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8 text-white">
          <p className="font-playfair uppercase tracking-widest text-xs font-medium mb-2 opacity-90">
            Artesanía y calidez en el hogar
          </p>
          <h3 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-medium leading-tight max-w-2xl">
            Cada bolso cuenta una historia hecha a mano
          </h3>
        </div>
      </div>
    </section>
  );
}
