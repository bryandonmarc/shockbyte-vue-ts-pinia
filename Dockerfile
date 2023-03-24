FROM node:lts

WORKDIR /app

# install pnpm
RUN apt-get install git
RUN npm install -g pnpm

# install dependencies
COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile
RUN npx playwright install-deps

COPY . .

CMD ["pnpm", "dev", "--", "--host", "0.0.0.0"]