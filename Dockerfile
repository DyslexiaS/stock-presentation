# Zeabur auto-builds with `npm install -g bun@latest` then `bun install`.
# Bun 1.4 (2026-08-20) is a runtime rewrite; this app installs cleanly on 1.2.18.
FROM node:22-bookworm

ENV PORT=8080
ENV HOSTNAME=0.0.0.0
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /src

RUN npm install -g bun@1.2.18

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

EXPOSE 8080
CMD ["bun", "run", "start"]
