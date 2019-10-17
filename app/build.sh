#!/bin/bash

# Build base image
echo "Building api image"
docker image build -f api/Dockerfile.base -t app-api-base:latest api

echo "Building webapp image"
docker image build -f webapp/Dockerfile.base -t app-webapp-base:latest webapp