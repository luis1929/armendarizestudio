import { NextResponse } from 'next/server';
import type { Producto } from '@/types/database';

let productos: Producto[] = [
  {
    id: '4d677be4-7041-46c9-8e5a-b2c8b0fbe269',
    title: 'BOLSO ARTESANAL - FELINO',
    image: '/images/bolso-felino.svg',
    originalPrice: 650000,
    salePrice: 129990,
    discount: 80,
    whatsappUrl: 'https://wa.link/6jgk9x',
    createdAt: new Date().toISOString(),
  },
];

export async function GET() {
  return NextResponse.json(productos);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newProducto: Producto = {
    id: crypto.randomUUID().toString(),
    title: body.title,
    image: body.image,
    originalPrice: body.originalPrice,
    salePrice: body.salePrice,
    discount: body.discount,
    whatsappUrl: body.whatsappUrl,
    createdAt: new Date().toISOString(),
  };
  productos.push(newProducto);
  return NextResponse.json(newProducto, { status: 201 });
}
