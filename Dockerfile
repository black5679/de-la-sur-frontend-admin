# Dockerfile
FROM node:18-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar dependencias y código
COPY package*.json ./
RUN npm install -f

COPY . .

# Construir la aplicación
RUN NODE_OPTIONS="--max-old-space-size=2048" npm run build

# Servir la aplicación con un servidor estático
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000", "--single"]
