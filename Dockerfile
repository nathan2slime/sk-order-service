FROM node:24-slim

WORKDIR /app

RUN corepack enable

ENV SCARF_ANALYTICS=false

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

CMD ["pnpm", "start"]