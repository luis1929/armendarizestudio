import { NextResponse } from 'next/server';
import { db } from '@/prisma/db';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const producto = await db.producto.findFirst({ where: { id } });
  if (!producto) {
    return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
  }
  return NextResponse.json(producto);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const updated = await db.producto.findFirst({ where: { id } });
  if (!updated) {
    return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
  }
  const result = await db.producto.findFirst({ where: { id } });
  return NextResponse.json(result);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const existing = await db.producto.findFirst({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
