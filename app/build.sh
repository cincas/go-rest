#!/bin/bash

# Build base image
echo "Building api image"
docker image build -f api/Dockerfile.base -t app-api-base:latest .