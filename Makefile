# ABOUTME: Makefile for Hugo portfolio site
# ABOUTME: Common commands for development, building, and deployment

.PHONY: dev build clean docker-build docker-run docker-stop help

# Default target
help:
	@echo "Usage: make [target]"
	@echo ""
	@echo "Development:"
	@echo "  dev          Start Hugo dev server with live reload"
	@echo "  build        Build static site to ./public"
	@echo "  clean        Remove build artifacts"
	@echo ""
	@echo "Docker:"
	@echo "  docker-build Build production Docker image"
	@echo "  docker-run   Run production container"
	@echo "  docker-stop  Stop production container"
	@echo "  docker-dev   Run Hugo dev server in Docker"
	@echo ""
	@echo "Content:"
	@echo "  new-post     Create new blog post (usage: make new-post NAME=my-post)"

# Development server with live reload
dev:
	hugo server --buildDrafts

# Build static site
build:
	hugo --minify

# Clean build artifacts
clean:
	rm -rf public/ resources/_gen/

# Build Docker image
docker-build:
	docker compose build website

# Run production container
docker-run:
	docker compose up -d website

# Stop production container
docker-stop:
	docker compose down

# Run dev server in Docker
docker-dev:
	docker compose up hugo

# Create new blog post
new-post:
	@if [ -z "$(NAME)" ]; then \
		echo "Usage: make new-post NAME=my-post-title"; \
		exit 1; \
	fi
	hugo new content blog/$(NAME).md
