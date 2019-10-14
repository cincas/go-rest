#!/bin/bash

# Build base image
docker image build -f Dockerfile.base -t go-rest-base:latest .