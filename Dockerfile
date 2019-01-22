FROM nginx

RUN apt-get update
RUN apt-get install -y python build-essential libssl-dev openssh-server curl  mc
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs

RUN npm i -g gulp

RUN mkdir /home/ds-cms-pages
WORKDIR /home/ds-cms-pages
COPY ./ ./

COPY ./nginx_conf/default.conf /etc/nginx/conf.d/default.conf

RUN npm i

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}

ARG CMS_SERVER_URL
ENV CMS_SERVER_URL ${CMS_SERVER_URL}
RUN echo $CMS_SERVER_URL

ARG EXTERNAL_PORT
ENV EXTERNAL_PORT ${EXTERNAL_PORT}
RUN echo $EXTERNAL_PORT

EXPOSE 80 443 3001 3002 3003 3004

RUN gulp env
RUN npm run build
