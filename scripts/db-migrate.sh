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

# Backup from Docker container
echo -e "${GREEN}Creating backup from Docker container...${NC}"
docker-compose -f docker-compose.prod.yml exec -T postgres pg_dump \
    -U ${POSTGRES_USER} \
    -d ${POSTGRES_DB} \
    -F c \
    > backups/docker_db_backup.dump

echo -e "${GREEN}Backup created at backups/docker_db_backup.dump${NC}"

# Restore to remote host
echo -e "${GREEN}Restoring to remote host...${NC}"
echo "Please enter remote database details:"
read -p "Host: " REMOTE_HOST
read -p "Port [5432]: " REMOTE_PORT
REMOTE_PORT=${REMOTE_PORT:-5432}
read -p "Database name: " REMOTE_DB
read -p "Username: " REMOTE_USER
read -s -p "Password: " REMOTE_PASSWORD
echo

# Test connection
export PGPASSWORD=$REMOTE_PASSWORD
if ! pg_isready -h $REMOTE_HOST -p $REMOTE_PORT -U $REMOTE_USER; then
    echo -e "${RED}Could not connect to remote database${NC}"
    exit 1
fi

# Restore
pg_restore \
    -h $REMOTE_HOST \
    -p $REMOTE_PORT \
    -U $REMOTE_USER \
    -d $REMOTE_DB \
    -v \
    --clean \
    --if-exists \
    backups/docker_db_backup.dump

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Database migration completed successfully!${NC}"
else
    echo -e "${RED}Error during database migration${NC}"
    exit 1
fi 