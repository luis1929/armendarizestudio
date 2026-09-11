#!/usr/bin/env bash
# ==============================================================================
# SCAFFOLD GENERATOR - PLANTILLA BASE AUDITADA
# ==============================================================================
# Propósito: Clona la infraestructura técnica probada (FastAPI + Next.js + Prisma v8)
#            limpiando datos de negocio e inicializando un nuevo repositorio.
# Uso: ./scripts/scaffold.sh <nombre-del-nuevo-proyecto> [directorio-destino]
# ==============================================================================

set -euo pipefail

PROJECT_NAME="${1:-armendaris-estudio}"
TARGET_DIR="${2:-../$PROJECT_NAME}"
SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "========================================================"
echo "🚀 Iniciando Scaffold para: $PROJECT_NAME"
echo "📂 Directorio destino:      $TARGET_DIR"
echo "========================================================"

# 1. Validar que el directorio destino no exista previamente
if [ -d "$TARGET_DIR" ]; then
  echo "❌ Error: El directorio '$TARGET_DIR' ya existe. Cancela o usa otra ruta."
  exit 1
fi

mkdir -p "$TARGET_DIR"

# 2. Copiar archivos estructurales excluyendo dependencias y temporales
echo "📦 1/5 Copiando estructura base y configuraciones..."
rsync -av --progress "$SOURCE_DIR/" "$TARGET_DIR/" \
  --exclude ".git" \
  --exclude "node_modules" \
  --exclude ".next" \
  --exclude ".venv" \
  --exclude "_pycache_" \
  --exclude "*.pyc" \
  --exclude "dist" \
  --exclude ".turbo" \
  --exclude ".env" \
  --exclude "coverage" \
  --exclude "*.log"

cd "$TARGET_DIR"

# 3. Preparar variables de entorno limpias
echo "⚙️  2/5 Configurando variables de entorno base (.env)..."
if [ -f ".env.example" ]; then
  cp .env.example .env
  echo "✔️ .env creado a partir de .env.example"
fi

# 4. Parametrizar nombres de la nueva aplicación
echo "🏷️  3/5 Parametrizando identificadores del proyecto..."
# Reemplazar nombre en package.json si existe
if [ -f "package.json" ]; then
  sed -i "s/\"name\": \".*\"/\"name\": \"$PROJECT_NAME\"/" package.json 2>/dev/null || true
fi

# 5. Asegurar permisos de ejecución en scripts de auditoría
echo "🛡️  4/5 Asegurando scripts de auditoría y prueba de fuego..."
if [ -d "scripts" ]; then
  chmod +x scripts/*.sh 2>/dev/null || true
fi

# 6. Inicializar repositorio Git limpio
echo "🌱 5/5 Inicializando repositorio Git limpio..."
git init -b main
git add .
git commit -m "chore(scaffold): initial commit from audited baseline architecture"

echo "========================================================"
echo "✅ ¡Scaffold completado con éxito!"
echo "📁 Tu nuevo proyecto está listo en: $TARGET_DIR"
echo ""
echo "Pasos para empezar a tirar código en $PROJECT_NAME:"
echo "  1. cd $TARGET_DIR"
echo "  2. Revisar y ajustar variables en .env"
echo "  3. Instalar dependencias (npm install)"
echo "  4. Ejecutar ./scripts/test-fire.sh para certificar los cimientos"
echo "========================================================"
