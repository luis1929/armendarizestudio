import { PrismaClient } from '@prisma/client';
import { contract } from './contract';

const prisma = new PrismaClient({ contract });

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@armendarizestudio.com' },
    update: {},
    create: {
      email: 'admin@armendarizestudio.com',
      password: 'admin123', // In production, hash this!
      role: 'ADMIN',
      name: 'Admin Test',
    },
  });
  console.log('✅ Admin user created:', adminUser.email);

  // Create system config
  await prisma.systemConfig.upsert({
    where: { key: 'app.name' },
    update: {},
    create: {
      key: 'app.name',
      value: 'Armendáriz Estudio',
    },
  });
  console.log('✅ System config created');

  // Create products
  const products = [
    {
      title: 'BOLSO ARTESANAL - FELINO',
      image: '/images/bolso-felino.svg',
      originalPrice: 650000,
      salePrice: 129990,
      discount: 80,
      whatsappUrl: 'https://wa.link/6jgk9x',
    },
    {
      title: 'BOLSA ARTESANAL - LIBÉLULA',
      image: '/images/bolsa-libélula.svg',
      originalPrice: 650000,
      salePrice: 129990,
      discount: 80,
      whatsappUrl: 'https://wa.link/6jgk9x',
    },
    {
      title: 'BOLSO ARTESANAL - GATO NEGRO',
      image: '/images/bolso-gato-negro.svg',
      originalPrice: 650000,
      salePrice: 129990,
      discount: 80,
      whatsappUrl: 'https://wa.link/6jgk9x',
    },
    {
      title: 'BOLSO ARTESANAL - LÍRIOS BLANCOS',
      image: '/images/bolso-lirios.svg',
      originalPrice: 650000,
      salePrice: 129990,
      discount: 80,
      whatsappUrl: 'https://wa.link/6jgk9x',
    },
    {
      title: 'BOLSO ARTESANAL - PERRO ENCANTADO',
      image: '/images/bolso-perro-encantado.svg',
      originalPrice: 650000,
      salePrice: 129990,
      discount: 80,
      whatsappUrl: 'https://wa.link/6jgk9x',
    },
    {
      title: 'BOLSA ARTESANAL - DRAGÓN LECTOR',
      image: '/images/bolsa-dragon.svg',
      originalPrice: 650000,
      salePrice: 129990,
      discount: 80,
      whatsappUrl: 'https://wa.link/6jgk9x',
    },
  ];

  for (const product of products) {
    await prisma.producto.create({
      data: product,
    });
  }
  console.log('✅ Products created:', products.length);

  // Create migration tracking
  await prisma.migrationTracking.create({
    data: {
      version: '2024.01.01',
    },
  });
  console.log('✅ Migration tracking created');

  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
