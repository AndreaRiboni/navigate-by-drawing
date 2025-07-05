FROM caddy:2-alpine

# Copy the static site into the appropriate directory
COPY navigate-by-drawing/static /usr/share/caddy/

# Copy your custom Caddyfile
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 8001
