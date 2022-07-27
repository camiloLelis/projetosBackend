FROM node:17-alpine
WORKDIR /app
ADD node_modules.tar.gz ./
COPY . .
EXPOSE 3001
CMD ["npm", "start"]