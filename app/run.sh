#!/bin/bash

echo "Starting debug containers"
docker-compose -f "docker-compose.debug.yml" up --build -d