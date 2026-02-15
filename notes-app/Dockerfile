FROM node:22-alpine AS build

WORKDIR /notes-app

ARG VITE_NOTES_API_URL
ENV VITE_NOTES_API_URL=${VITE_NOTES_API_URL}

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

FROM nginx:1.27-alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /notes-app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
