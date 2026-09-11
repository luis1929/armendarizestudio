import { NextResponse } from 'next/server';
import { db } from '@/prisma/db';

export async function GET() {
  const productos = await db.producto.findMany();
  return NextResponse.json(productos);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newProducto = await db.producto.create({
    data: {
      title: body.title,
      image: body.image,
      originalPrice: body.originalPrice,
      salePrice: body.salePrice,
      discount: body.discount,
      whatsappUrl: body.whatsappUrl,
    },
  });
  return NextResponse.json(newProducto, { status: 201 });
}
