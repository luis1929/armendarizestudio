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

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const producto = productos.find((p) => p.id === id);
  if (!producto) {
    return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
  }
  return NextResponse.json(producto);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const index = productos.findIndex((p) => p.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
  }
  const updatedProducto: Producto = { ...productos[index], ...body };
  productos[index] = updatedProducto;
  return NextResponse.json(updatedProducto);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const index = productos.findIndex((p) => p.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
  }
  productos.splice(index, 1);
  return NextResponse.json({ success: true });
}
