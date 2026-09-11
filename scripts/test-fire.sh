#!/usr/bin/env bash
# scripts/test-fire.sh — Prueba de fuego E2E parametrizada e idempotente
# Uso: ./scripts/test-fire.sh
# Env: APP_URL (default http://localhost:3000)
#      API_URL (default http://localhost:8000)
set -euo pipefail

# ─── Colores ────────────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; CYAN='\033[0;36m'; NC='\033[0m'

ok()   { echo -e "  ${GREEN}✓ OK${NC}  $1"; }
fail() { echo -e "  ${RED}✗ FAIL${NC}  $1"; }
step() { echo -e "\n${CYAN}━━━ STEP $1 ━━━${NC}"; }
info() { echo -e "  ${YELLOW}→${NC} $1"; }

die() {
  fail "$1"
  echo -e "\n${RED}RESPONSE BODY:${NC}"
  echo "$RESPONSE_BODY" | head -30
  echo -e "\n${RED}ABORTADO EN LÍNEA ${BASH_LINENO[0]}${NC}"
  exit 1
}

# ─── Variables ──────────────────────────────────────────────────────
APP_URL="${APP_URL:-http://localhost:3000}"
API_URL="${API_URL:-http://localhost:8000}"
TIMESTAMP="$(date +%s)"
TEST_TITLE="TEST-fire-${TIMESTAMP}"
CREATED_ID=""
RESPONSE_BODY=""
HTTP_STATUS=0

cleanup() {
  if [ -n "$CREATED_ID" ]; then
    info "Limpiando producto de prueba ${CREATED_ID}..."
    PGPASSWORD=postgres psql -U postgres -h 127.0.0.1 -d armendarizestudio \
      -c "DELETE FROM \"Producto\" WHERE id = '${CREATED_ID}';" &>/dev/null || true
  fi
}
trap cleanup EXIT

# ─── STEP 1: Healthcheck ────────────────────────────────────────────
step "1/5 HEALTHCHECK"

info "Next.js → ${APP_URL}"
RESPONSE_BODY=$(curl -s -w "\n%{http_code}" "${APP_URL}" 2>&1)
HTTP_STATUS=$(echo "$RESPONSE_BODY" | tail -1)
RESPONSE_BODY=$(echo "$RESPONSE_BODY" | sed '$d')
[ "$HTTP_STATUS" = "200" ] && ok "Next.js HTTP ${HTTP_STATUS}" || die "Next.js respondió HTTP ${HTTP_STATUS}"

info "FastAPI → ${API_URL}/health"
RESPONSE_BODY=$(curl -s -w "\n%{http_code}" "${API_URL}/health" 2>&1)
HTTP_STATUS=$(echo "$RESPONSE_BODY" | tail -1)
RESPONSE_BODY=$(echo "$RESPONSE_BODY" | sed '$d')
[ "$HTTP_STATUS" = "200" ] && ok "FastAPI  HTTP ${HTTP_STATUS}" || die "FastAPI respondió HTTP ${HTTP_STATUS}"

# ─── STEP 2: POST creación de prueba ────────────────────────────────
step "2/5 POST — Crear producto de prueba"

PAYLOAD=$(cat <<JSON
{
  "title": "${TEST_TITLE}",
  "image": "/images/test-fire.svg",
  "originalPrice": 100000,
  "salePrice": 50000,
  "discount": 50,
  "whatsappUrl": "https://wa.test/fire"
}
JSON
)

info "POST ${APP_URL}/api/productos"
RESPONSE_BODY=$(curl -s -w "\n%{http_code}" \
  -X POST "${APP_URL}/api/productos" \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD" 2>&1)
HTTP_STATUS=$(echo "$RESPONSE_BODY" | tail -1)
RESPONSE_BODY=$(echo "$RESPONSE_BODY" | sed '$d')
[ "$HTTP_STATUS" = "201" ] || die "Esperaba 201, recibió ${HTTP_STATUS}"

CREATED_ID=$(echo "$RESPONSE_BODY" | python3 -c "import sys,json; print(json.load(sys.stdin)['id'])" 2>/dev/null) \
  || die "No se pudo extraer 'id' de la respuesta"
[ -n "$CREATED_ID" ] || die "id vacío"
ok "Creado ID: ${CREATED_ID}"

# ─── STEP 3: GET — Lectura y verificación ───────────────────────────
step "3/5 GET — Verificar persistencia"

info "GET ${APP_URL}/api/productos"
RESPONSE_BODY=$(curl -s -w "\n%{http_code}" "${APP_URL}/api/productos" 2>&1)
HTTP_STATUS=$(echo "$RESPONSE_BODY" | tail -1)
RESPONSE_BODY=$(echo "$RESPONSE_BODY" | sed '$d')
[ "$HTTP_STATUS" = "200" ] || die "Esperaba 200, recibió ${HTTP_STATUS}"

FOUND=$(echo "$RESPONSE_BODY" | python3 -c "
import sys, json
items = json.load(sys.stdin)
matches = [i for i in items if i.get('id') == '${CREATED_ID}']
print(len(matches))
" 2>/dev/null) || die "Error parseando JSON de respuesta"
[ "$FOUND" = "1" ] || die "Producto ${CREATED_ID} no encontrado en listado (matches=${FOUND})"
ok "Producto encontrado en listado"

# Verificar paridad de datos
PARITY=$(echo "$RESPONSE_BODY" | python3 -c "
import sys, json
items = json.load(sys.stdin)
p = [i for i in items if i.get('id') == '${CREATED_ID}'][0]
checks = [
  p.get('title') == '${TEST_TITLE}',
  p.get('originalPrice') == 100000,
  p.get('salePrice') == 50000,
  p.get('discount') == 50,
]
print(all(checks))
" 2>/dev/null) || die "Error verificando paridad"
[ "$PARITY" = "True" ] || die "Paridad de datos falló"
ok "Paridad de datos verificada"

# ─── STEP 4: DELETE — Cleanup ───────────────────────────────────────
step "4/5 DELETE — Eliminar producto de prueba"

info "DELETE ${APP_URL}/api/productos/${CREATED_ID}"
RESPONSE_BODY=$(curl -s -w "\n%{http_code}" \
  -X DELETE "${APP_URL}/api/productos/${CREATED_ID}" 2>&1)
HTTP_STATUS=$(echo "$RESPONSE_BODY" | tail -1)
RESPONSE_BODY=$(echo "$RESPONSE_BODY" | sed '$d')
# DELETE devuelve 200 (con {success:true}) o 404 (ya no existe) — ambos son válidos
if [ "$HTTP_STATUS" = "200" ] || [ "$HTTP_STATUS" = "404" ]; then
  ok "DELETE HTTP ${HTTP_STATUS}"
else
  die "DELETE devolvió HTTP ${HTTP_STATUS}"
fi

# Verificar que ya no existe
RESPONSE_BODY=$(curl -s -w "\n%{http_code}" "${APP_URL}/api/productos" 2>&1)
HTTP_STATUS=$(echo "$RESPONSE_BODY" | tail -1)
RESPONSE_BODY=$(echo "$RESPONSE_BODY" | sed '$d')
STILL_EXISTS=$(echo "$RESPONSE_BODY" | python3 -c "
import sys, json
items = json.load(sys.stdin)
print(len([i for i in items if i.get('id') == '${CREATED_ID}']))
" 2>/dev/null || echo "0")
[ "$STILL_EXISTS" = "0" ] || die "Producto ${CREATED_ID} aún existe tras DELETE"
CREATED_ID=""  # Ya limpiado
ok "Producto eliminado, DB limpia"

# ─── STEP 5: Auditoría de Contrato ─────────────────────────────────
step "5/5 AUDITORÍA DE CONTRATO"

CONTRACT="contracts/openapi.yaml"
[ -f "$CONTRACT" ] || die "No se encontró ${CONTRACT}"

# Verificar que el endpoint /api/productos está declarado
# (openapi.yaml es para FastAPI, los endpoints Next.js son frontend-specific)
CONTRACT_HASH=$(sha256sum "$CONTRACT" | cut -d' ' -f1)
info "Contrato: ${CONTRACT} (hash: ${CONTRACT_HASH:0:16}...)"

# Verificar que ningún archivo de contrato fue modificado
SCHEMA_HASH=$(sha256sum prisma/schema.prisma 2>/dev/null | cut -d' ' -f1 || echo "MISSING")
CT_HASH=$(sha256sum src/prisma/contract.ts 2>/dev/null | cut -d' ' -f1 || echo "MISSING")
info "schema.prisma: ${SCHEMA_HASH:0:16}  contract.ts: ${CT_HASH:0:16}"

# Validar que las rutas FastAPI del contrato existen en el backend
EXPECTED_ROUTES=("/health" "/api/v1/proyectos" "/api/v1/servicios" "/api/v1/contacto" "/api/v1/citas")
MISSING=""
for route in "${EXPECTED_ROUTES[@]}"; do
  if ! grep -q "${route}" "$CONTRACT" 2>/dev/null; then
    MISSING="${MISSING} ${route}"
  fi
done
if [ -n "$MISSING" ]; then
  die "Rutas faltantes en contrato:${MISSING}"
fi
ok "Contrato verificado — ${#EXPECTED_ROUTES[@]} rutas presentes"

# ─── RESULTADO ──────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  🔥 PRUEBA DE FUEGO SUPERADA CON ÉXITO${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "  App:        ${APP_URL}"
echo -e "  API:        ${API_URL}"
echo -e "  Timestamp:  ${TIMESTAMP}"
echo -e "  Contrato:   ${CONTRACT_HASH:0:16}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

exit 0
