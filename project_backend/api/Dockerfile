FROM node:alpine
RUN npm install -g postgraphile
RUN npm install -g @graphile-contrib/pg-simplify-inflector
RUN npm install -g @graphile-contrib/pg-order-by-related
RUN npm install -g postgraphile-plugin-connection-filter
EXPOSE 5000
ENTRYPOINT ["postgraphile", "-n", "0.0.0.0"]