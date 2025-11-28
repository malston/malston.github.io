# ABOUTME: Multi-stage build for Hugo static site
# ABOUTME: Builds site with Hugo Extended and serves via Caddy

# Stage 1: Build Hugo site
FROM hugomods/hugo:exts AS builder

WORKDIR /src
COPY . .
RUN hugo --minify

# Stage 2: Serve with Caddy
FROM caddy:2-alpine

COPY --from=builder /src/public /srv
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80 443
