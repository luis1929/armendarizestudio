import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('loads successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Armendáriz Estudio/);
  });

  test('displays header with logo', async ({ page }) => {
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('text=ARMENDARIZ ESTUDIO')).toBeVisible();
  });

  test('displays product grid with products', async ({ page }) => {
    await expect(page.locator('text=BOLSO ARTESANAL')).toBeVisible();
    await expect(page.locator('text=FELINO')).toBeVisible();
    await expect(page.locator('text=LIBÉLULA')).toBeVisible();
  });

  test('displays workshop banner', async ({ page }) => {
    await expect(page.locator('text=TALLERES Y BIENESTAR')).toBeVisible();
  });

  test('displays trust badges', async ({ page }) => {
    await expect(page.locator('text=ENVÍO GRATIS')).toBeVisible();
    await expect(page.locator('text=PAGO SEGURO')).toBeVisible();
    await expect(page.locator('text=30 DÍAS DEVOLUCIÓN')).toBeVisible();
  });

  test('displays footer', async ({ page }) => {
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('text=Armendáriz Estudio')).toBeVisible();
  });
});

test.describe('Cart functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('opens cart drawer when clicking cart icon', async ({ page }) => {
    await page.locator('button[aria-label*="Carrito"]').click();
    await expect(page.locator('text=Carrito')).toBeVisible();
  });

  test('adds product to cart', async ({ page }) => {
    await page.locator('button:has-text("Agregar al carrito")').first().click();
    await page.locator('button[aria-label*="Carrito"]').click();
    await expect(page.locator('text=1')).toBeVisible();
  });

  test('increments quantity when adding same product', async ({ page }) => {
    const addButton = page.locator('button:has-text("Agregar al carrito")').first();
    await addButton.click();
    await addButton.click();
    await page.locator('button[aria-label*="Carrito"]').click();
    await expect(page.locator('text=2')).toBeVisible();
  });

  test('removes product from cart', async ({ page }) => {
    await page.locator('button:has-text("Agregar al carrito")').first().click();
    await page.locator('button[aria-label*="Carrito"]').click();
    await page.locator('button[aria-label="Eliminar producto"]').click();
    await expect(page.locator('text=Tu carrito está vacío')).toBeVisible();
  });

  test('clears cart', async ({ page }) => {
    await page.locator('button:has-text("Agregar al carrito")').first().click();
    await page.locator('button[aria-label*="Carrito"]').click();
    await page.locator('button:has-text("Vaciar carrito")').click();
    await expect(page.locator('text=Tu carrito está vacío')).toBeVisible();
  });

  test('shows free shipping', async ({ page }) => {
    await page.locator('button:has-text("Agregar al carrito")').first().click();
    await page.locator('button[aria-label*="Carrito"]').click();
    await expect(page.locator('text=GRATIS')).toBeVisible();
  });
});

test.describe('WhatsApp integration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('WhatsApp float button is visible', async ({ page }) => {
    await expect(page.locator('a[href*="wa.link"]')).toBeVisible();
  });

  test('product WhatsApp button links correctly', async ({ page }) => {
    const whatsappLink = page.locator('a[aria-label*="WhatsApp"]').first();
    await expect(whatsappLink).toHaveAttribute('href', /wa\.link/);
    await expect(whatsappLink).toHaveAttribute('target', '_blank');
  });
});

test.describe('Mobile navigation', () => {
  test('opens mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.locator('button[aria-label="Abrir menú"]').click();
    await expect(page.locator('text=MÁS VENDIDOS')).toBeVisible();
    await expect(page.locator('text=BOLSOS ARTESANALES')).toBeVisible();
  });
});

test.describe('SEO and metadata', () => {
  test('has correct meta tags', async ({ page }) => {
    await page.goto('/');
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /bolsos artesanales/);
  });

  test('has Open Graph tags', async ({ page }) => {
    await page.goto('/');
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /Armendáriz Estudio/);
  });
});