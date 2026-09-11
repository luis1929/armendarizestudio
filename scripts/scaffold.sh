#!/usr/bin/env bash
# scaffold.sh — Clona la plantilla base a un nuevo directorio
# Uso: ./scripts/scaffold.sh <nombre-proyecto>
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
TARGET="${1:?Uso: $0 <nombre-proyecto>}"
TARGET_DIR="$(dirname "$ROOT_DIR")/$TARGET"

if [ -d "$TARGET_DIR" ]; then
  echo "ERROR: $TARGET_DIR ya existe"
  exit 1
fi

echo "→ Clonando plantilla a $TARGET_DIR"

# ─── 1. Copiar estructura base ───────────────────────────────────────
mkdir -p "$TARGET_DIR"
cd "$ROOT_DIR"

# Archivos raíz (config)
for f in package.json tsconfig.json next.config.ts postcss.config.mjs eslint.config.mjs \
         vitest.config.ts vitest.setup.ts playwright.config.ts prisma.config.ts \
         .gitignore .env.example .env.production.example; do
  [ -f "$f" ] && cp "$f" "$TARGET_DIR/"
done

# Directorios estructurales
for d in src/app src/components/ui src/contexts src/lib src/types prisma contracts .agent .opencode/skills; do
  [ -d "$d" ] && mkdir -p "$TARGET_DIR/$d" && cp -r "$d"/* "$TARGET_DIR/$d/" 2>/dev/null || true
done

# Layout y estilos base
for f in src/app/layout.tsx src/app/globals.css src/logger.ts src/middleware.ts; do
  [ -f "$f" ] && cp "$f" "$TARGET_DIR/src/"
done

# Prisma
for f in src/prisma/db.ts src/prisma/contract.ts; do
  [ -f "$f" ] && cp "$f" "$TARGET_DIR/src/prisma/"
done

# Auth
cp src/app/api/auth/\[...nextauth\]/route.ts "$TARGET_DIR/src/app/api/auth/[...nextauth]/" 2>/dev/null || true
cp src/types/next-auth.d.ts "$TARGET_DIR/src/types/" 2>/dev/null || true

# FastAPI base
cp server.py "$TARGET_DIR/" 2>/dev/null || true
mkdir -p "$TARGET_DIR/api_backend/api/routers" "$TARGET_DIR/api_backend/schemas"
for f in api_backend/__init__.py api_backend/schemas/__init__.py api_backend/schemas/models.py; do
  [ -f "$f" ] && cp "$f" "$TARGET_DIR/$f"
done
# Router stubs vacíos
for r in proyectos servicios contacto citas; do
  cat > "$TARGET_DIR/api_backend/api/routers/${r}.py" << 'PYEOF'
from fastapi import APIRouter

router = APIRouter(
    prefix="/api/v1/REPLACE_DOMAIN",
    tags=["REPLACE_DOMAIN"],
)

@router.get("")
def list():
    return []
PYEOF
done
touch "$TARGET_DIR/api_backend/api/__init__.py" "$TARGET_DIR/api_backend/api/routers/__init__.py"

# ─── 2. Actualizar package.json ─────────────────────────────────────
cd "$TARGET_DIR"
if command -v node &>/dev/null; then
  node -e "
    const fs = require('fs');
    const pkg = JSON.parse(fs.readFileSync('package.json','utf8'));
    pkg.name = '$TARGET';
    pkg.description = 'Boilerplate basado en Armendáriz Estudio';
    fs.writeFileSync('package.json', JSON.stringify(pkg,null,2)+'\n');
  "
fi

# ─── 3. Actualizar prisma.config.ts ────────────────────────────────
# Mantener tal cual — el contract se regenera

# ─── 4. Crear .env local ────────────────────────────────────────────
cat > .env << 'ENVEOF'
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/REPLACE_DB_NAME"
NEXTAUTH_SECRET="CHANGE_ME_TO_RANDOM_SECRET"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:4011"
ENVEOF
sed -i "s/REPLACE_DB_NAME/$TARGET/g" .env

# ─── 5. Instrucciones ──────────────────────────────────────────────
cat << 'INSTR'

✅ Plantilla clonada. Siguientes pasos:

  1. cd <directorio-del-proyecto>
  2. npm install
  3. Crear base de datos:
       sudo -u postgres psql -c "CREATE DATABASE <nombre>;"
  4. Actualizar .env con tu DATABASE_URL
  5. Regenerar contratos Prisma:
       npx prisma db init
       npx prisma contract emit
  6. Regenerar openapi.json:
       python3 -c "from server import app; import json; print(json.dumps(app.openapi()))" > contracts/openapi.json
  7. Reemplazar archivos de dominio (rutas, componentes, schemas)
  8. npm run dev

INSTR
echo "→ Directorio: $TARGET_DIR"
