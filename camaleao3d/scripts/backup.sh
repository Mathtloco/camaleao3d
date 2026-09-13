#!/usr/bin/env bash
# ---------------------------------------------------------------
# Camaleão3D — cópia local do banco
#
# Uso:
#   chmod +x scripts/backup.sh    (só na primeira vez)
#   ./scripts/backup.sh
#
# Precisa do pg_dump instalado:
#   Mac:     brew install postgresql
#   Ubuntu:  sudo apt install postgresql-client
#   Windows: use o WSL ou instale o PostgreSQL
# ---------------------------------------------------------------
set -euo pipefail

PASTA="backups"
ARQUIVO="$PASTA/camaleao3d_$(date +%Y-%m-%d_%H%M).sql"

if [ -z "${DATABASE_URL:-}" ]; then
  echo "Falta a DATABASE_URL."
  echo
  echo "Pegue em: Supabase > Settings > Database > Connection string > URI"
  echo "Depois rode:"
  echo '  export DATABASE_URL="postgresql://..."'
  echo '  ./scripts/backup.sh'
  exit 1
fi

mkdir -p "$PASTA"
echo "Salvando em $ARQUIVO ..."
pg_dump "$DATABASE_URL" > "$ARQUIVO"
gzip "$ARQUIVO"

echo "Pronto: ${ARQUIVO}.gz"
echo "Backups guardados:"
ls -lh "$PASTA" | tail -n +2
