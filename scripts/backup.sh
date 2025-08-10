#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

# Load environment variables
if [ -f ".env.production" ]; then
    source .env.production
else
    echo -e "${RED}Error: .env.production file not found${NC}"
    exit 1
fi

# Create backup directory if not exists
mkdir -p backups

# Generate timestamp
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="backups/db_backup_${TIMESTAMP}.dump"

# Create backup
echo -e "${GREEN}Creating backup...${NC}"
docker-compose -f docker-compose.prod.yml exec -T postgres pg_dump \
    -U ${POSTGRES_USER} \
    -d ${POSTGRES_DB} \
    -F c \
    > "${BACKUP_FILE}"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Backup created successfully at ${BACKUP_FILE}${NC}"
    
    # Cleanup old backups if BACKUP_RETENTION_DAYS is set
    if [ ! -z "$BACKUP_RETENTION_DAYS" ]; then
        echo -e "${GREEN}Cleaning up old backups...${NC}"
        find backups/ -name "db_backup_*.dump" -type f -mtime +${BACKUP_RETENTION_DAYS} -delete
        echo -e "${GREEN}Old backups cleaned up${NC}"
    fi
else
    echo -e "${RED}Error creating backup${NC}"
    exit 1
fi 