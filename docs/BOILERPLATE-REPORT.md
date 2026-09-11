# Plantilla Base — Armendáriz Estudio
## Clasificación de Archivos para Reuso como Boilerplate

### ESTRUCTURALES (mantener intactos como plantilla)

#### Configuración del proyecto
| Archivo | Propósito | Acción al clonar |
|---|---|---|
| `package.json` | Dependencias + scripts | Cambiar `name`, `description` |
| `tsconfig.json` | Config TypeScript | Mantener |
| `next.config.ts` | Config Next.js | Mantener |
| `postcss.config.mjs` | Config Tailwind/PostCSS | Mantener |
| `eslint.config.mjs` | Config ESLint | Mantener |
| `vitest.config.ts` | Config testing | Mantener |
| `vitest.setup.ts` | Setup testing | Mantener |
| `playwright.config.ts` | Config E2E | Mantener |
| `.gitignore` | Reglas git | Mantener |

#### Infraestructura de autenticación
| Archivo | Propósito | Acción al clonar |
|---|---|---|
| `src/app/api/auth/[...nextauth]/route.ts` | NextAuth.js routes | Parametrizar providers |
| `src/types/next-auth.d.ts` | Tipos NextAuth | Mantener |
| `src/middleware.ts` | Middleware subdominios | Parametrizar subdominios |

#### Infraestructura ORM (Prisma v8)
| Archivo | Propósito | Acción al clonar |
|---|---|---|
| `src/prisma/db.ts` | Cliente Prisma v8 | Mantener (contract-agnostic) |
| `src/prisma/contract.ts` | Contrato Prisma | **Regenerar** con `prisma contract emit` |
| `src/prisma/contract.d.ts` | Tipos generados | **Regenerar** |
| `prisma/schema.prisma` | Schema DB | **Regenerar** desde nuevo dominio |
| `prisma.config.ts` | Config Prisma | Mantener |
| `contracts/openapi.yaml` | OpenAPI contract | **Regenerar** desde FastAPI |

#### Infraestructura Backend (FastAPI)
| Archivo | Propósito | Acción al clonar |
|---|---|---|
| `server.py` | App FastAPI principal | Mantener estructura, cambiar título |
| `api_backend/__init__.py` | Package marker | Mantener |
| `api_backend/schemas/__init__.py` | Package marker | Mantener |
| `api_backend/api/routers/*.py` | Routers FastAPI | **Reemplazar** con nuevos dominios |

#### Layout y UI base
| Archivo | Propósito | Acción al clonar |
|---|---|---|
| `src/app/layout.tsx` | Layout raíz Next.js | Mantener |
| `src/app/globals.css` | Estilos globales | Mantener |
| `src/components/Header.tsx` | Header base | Parametrizar logo/navegación |
| `src/components/Footer.tsx` | Footer base | Parametrizar links |
| `src/components/LogoEmblem.tsx` | Logo SVG | Reemplazar con marca propia |
| `src/lib/utils.ts` | Utilidades genéricas | Mantener |
| `src/logger.ts` | Config Winston | Mantener |

#### Configuración de entorno
| Archivo | Propósito | Acción al clonar |
|---|---|---|
| `.env.example` | Template env vars | Mantener |
| `.env.production.example` | Template prod env | Mantener |
| `.env.local` | Dev env local | **Regenerar** (no commitear) |

---

### ESPECÍFICOS DE DOMINIO (reemplazar al instanciar nueva app)

#### Lógica de negocio — Productos
| Archivo | Contenido | Reemplazar con |
|---|---|---|
| `src/app/api/productos/route.ts` | CRUD productos | Nuevo dominio |
| `src/app/api/productos/[id]/route.ts` | Detalle producto | Nuevo dominio |
| `src/components/ProductCard.tsx` | Card de producto | Nuevo componente |
| `src/components/ProductGrid.tsx` | Grid de productos | Nuevo componente |
| `src/components/ProductCard.test.tsx` | Tests producto | Nuevos tests |
| `src/types/product.ts` | Tipos producto | Nuevos tipos |
| `src/contexts/CartContext.tsx` | Context carrito | Eliminar o adaptar |
| `src/contexts/CartContext.test.tsx` | Tests carrito | Eliminar o adaptar |
| `src/app/compras/page.tsx` | Página compras | Nueva página |
| `src/components/CartDrawer.tsx` | Drawer carrito | Eliminar o adaptar |

#### Lógica de negocio — Frontend
| Archivo | Contenido | Reemplazar con |
|---|---|---|
| `src/app/page.tsx` | Landing page | Nueva landing |
| `src/app/admin/page.tsx` | Admin dashboard | Nuevo admin |
| `src/app/ventas/page.tsx` | Página ventas | Nueva página |
| `src/app/auth/signin/page.tsx` | SignIn page | Adaptar diseño |
| `src/components/InstagramCarousel.tsx` | Carrusel Instagram | Eliminar |
| `src/components/InstagramFeed.tsx` | Feed Instagram | Eliminar |
| `src/components/InstagramHeroCarousel.tsx` | Hero Instagram | Eliminar |
| `src/components/WorkshopBanner.tsx` | Banner talleres | Eliminar |
| `src/components/WhatsAppFloat.tsx` | Botón WhatsApp | Parametrizar número |
| `src/components/TrustBadges.tsx` | Badges confianza | Parametrizar |
| `src/components/Pagination.tsx` | Paginación | Mantener (genérico) |

#### Lógica de negocio — Backend FastAPI
| Archivo | Contenido | Reemplazar con |
|---|---|---|
| `api_backend/api/routers/proyectos.py` | Router proyectos | Nuevo dominio |
| `api_backend/api/routers/servicios.py` | Router servicios | Nuevo dominio |
| `api_backend/api/routers/contacto.py` | Router contacto | Nuevo dominio |
| `api_backend/api/routers/citas.py` | Router citas | Nuevo dominio |
| `api_backend/schemas/models.py` | Modelos Pydantic | Nuevos modelos |

#### Seed data
| Archivo | Contenido | Reemplazar con |
|---|---|---|
| `src/prisma/seed.ts` | Seed productos/users | Nuevos datos de seed |

#### Tipos de aplicación
| Archivo | Contenido | Reemplazar con |
|---|---|---|
| `src/types/database.ts` | Tipos DB (User, Product) | Nuevos tipos |
| `src/types/winston.d.ts` | Ambient winston | Mantener |

---

### RESUMEN PARA INSTANCIACIÓN

```bash
# Para clonar esta base a un nuevo proyecto:
# 1. Copiar solo la columna "Estructural"
# 2. Eliminar columna "Específico de dominio"
# 3. Regenerar contratos:
#    - prisma contract emit (contract.ts → contract.d.ts)
#    - prisma db init (schema.prisma → database)
#    - FastAPI auto-genera openapi.json
# 4. Crear nuevos archivos de dominio
```
