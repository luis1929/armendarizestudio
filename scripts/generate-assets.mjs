import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = path.join(process.cwd(), 'public');
const imagesDir = path.join(publicDir, 'images');

// Crear favicon.ico base desde el logo emblem
const faviconSvg = `
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="16" cy="16" r="15" stroke="#722f37" stroke-width="1.5"/>
  <circle cx="16" cy="16" r="8" stroke="#722f37" stroke-width="1.5" fill="none"/>
  <circle cx="16" cy="16" r="3" fill="#722f37"/>
</svg>
`;

async function generateAssets() {
  console.log('🎨 Generando assets gráficos...\n');

  // 1. og-banner.jpg (1200x630) desde og-banner.svg
  console.log('1. Generando og-banner.jpg (1200x630)...');
  await sharp(path.join(imagesDir, 'og-banner.svg'))
    .resize(1200, 630, { fit: 'cover' })
    .jpeg({ quality: 90 })
    .toFile(path.join(imagesDir, 'og-banner.jpg'));
  console.log('   ✅ og-banner.jpg creado\n');

  // 2. favicon.ico (32x32) desde SVG
  console.log('2. Generando favicon.ico (32x32)...');
  await sharp(Buffer.from(faviconSvg))
    .resize(32, 32)
    .toFile(path.join(publicDir, 'favicon.ico'));
  console.log('   ✅ favicon.ico creado\n');

  // 3. favicon-16x16.png desde favicon.ico
  console.log('3. Generando favicon-16x16.png...');
  await sharp(path.join(publicDir, 'favicon.ico'))
    .resize(16, 16)
    .png()
    .toFile(path.join(publicDir, 'favicon-16x16.png'));
  console.log('   ✅ favicon-16x16.png creado\n');

  // 4. apple-touch-icon.png (180x180) desde favicon.ico
  console.log('4. Generando apple-touch-icon.png (180x180)...');
  await sharp(path.join(publicDir, 'favicon.ico'))
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('   ✅ apple-touch-icon.png creado\n');

  // 5. site.webmanifest
  console.log('5. Generando site.webmanifest...');
  const manifest = {
    name: 'Armendáriz Estudio',
    short_name: 'Armendáriz',
    description: 'Bolsos artesanales hechos a mano en Colombia',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#722f37',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  };
  fs.writeFileSync(
    path.join(publicDir, 'site.webmanifest'),
    JSON.stringify(manifest, null, 2)
  );
  console.log('   ✅ site.webmanifest creado\n');

  console.log('🎉 Todos los assets generados exitosamente!');
}

generateAssets().catch(console.error);
