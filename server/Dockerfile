FROM node:16-alpine3.14
WORKDIR /app
RUN mkdir react-express
RUN cd react-express
COPY ./ ./
RUN npm ci
CMD ["npm","start"]