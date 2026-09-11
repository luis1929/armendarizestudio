import postgres from '@prisma/orm-postgres/runtime';
import { contract } from './contract';

const db = postgres({ contract, url: process.env['DATABASE_URL']! });

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const existingAdmin = await db.orm.public.User.where((f) => f.email.eq('admin@armendarizestudio.com')).first();
  const adminUser = existingAdmin ?? await db.orm.public.User.create({
    email: 'admin@armendarizestudio.com',
    password: 'admin123', // In production, hash this!
    role: 'ADMIN',
    name: 'Admin Test',
  });
  console.log('✅ Admin user created:', adminUser.email);

  // Create system config
  const existingConfig = await db.orm.public.SystemConfig.where((f) => f.key.eq('app.name')).first();
  if (!existingConfig) {
    await db.orm.public.SystemConfig.create({
      key: 'app.name',
      value: 'Armendáriz Estudio',
    });
  }
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
    await db.orm.public.Producto.create(product);
  }
  console.log('✅ Products created:', products.length);

  // Create migration tracking
  await db.orm.public.MigrationTracking.create({
    version: '2024.01.01',
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
    await db.close();
  });
