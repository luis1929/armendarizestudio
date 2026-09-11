import { NextResponse } from 'next/server';
import { db } from '@/prisma/db';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const producto = await db.orm.public.Producto.where((f: any) => f.id.eq(id)).first();
  if (!producto) {
    return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
  }
  return NextResponse.json(producto);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const existing = await db.orm.public.Producto.where((f: any) => f.id.eq(id)).first();
  if (!existing) {
    return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
  }
  return NextResponse.json(existing);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const existing = await db.orm.public.Producto.where((f: any) => f.id.eq(id)).first();
  if (!existing) {
    return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
  }
  await db.orm.public.Producto.where((f: any) => f.id.eq(id)).delete();
  return NextResponse.json({ success: true });
}
