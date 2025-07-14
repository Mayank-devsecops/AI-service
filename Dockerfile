# Stage 1: Build the Next.js application
# Use a Node.js 20 Alpine image for a lightweight build environment
FROM node:20-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

RUN npm install -g pnpm

# Install pnpm globally in the builder stage
COPY package.json pnpm-lock.yaml* ./

# Install project dependencies using pnpm
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application for production
RUN pnpm run build

# Stage 2: Create the production-ready image
# Use a fresh, lightweight Node.js 20 Alpine image for the runner
FROM node:20-alpine AS runner

# Set the working directory
WORKDIR /app

# Set environment variables for Next.js production
ENV NODE_ENV=production

# Install pnpm globally in the runner stage
# This is crucial because our CMD relies on the 'pnpm' executable being in the runner's PATH.
RUN npm install -g pnpm

# Copy the necessary files from the builder stage:
# 1. The optimized Next.js build output (.next)
# 2. Node modules (needed for 'next' and other runtime dependencies)
# 3. Public assets
# 4. package.json (needed for 'pnpm start')
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Expose the default port for Next.js (3000)
EXPOSE 3000

# Command to run the application in production mode.
# We use 'exec pnpm start' (shell form) to correctly execute pnpm as a command 
# (resolving the "Cannot find module" error caused by Node's ENTRYPOINT) 
# and ensure 'pnpm start' runs as PID 1 (improving signal handling).
CMD ["/usr/local/bin/pnpm", "start"]
