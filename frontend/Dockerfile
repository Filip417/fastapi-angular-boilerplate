# Build stage
FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Runtime stage
FROM nginx:1.25-alpine
RUN apk add --no-cache gettext
COPY nginx.conf /etc/nginx/conf.d/default.conf.template
COPY --from=build /app/dist/angular-boilerplate/browser /usr/share/nginx/html

EXPOSE 8080
CMD ["/bin/sh", "-c", "PORT=${PORT:-8080} API_URL=${API_URL:-http://localhost:8080} envsubst '$$PORT $$API_URL' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
