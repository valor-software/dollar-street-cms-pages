FROM nginx

RUN apt-get update
RUN apt-get install -y python build-essential libssl-dev openssh-server curl  mc
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs
RUN npm i -g gulp
ENV CMS_SERVER_URL http://prod-cms-api.dollarstreet.org
RUN echo $CMS_SERVER_URL
ENV CMS_SOCKETS_URL http://prod-cms-api.dollarstreet.org
RUN echo $CMS_SOCKETS_URL

RUN mkdir /home/ds-cms-pages
WORKDIR /home/ds-cms-pages
COPY ./ ./

COPY ./nginx_conf/default.conf /etc/nginx/conf.d/default.conf

RUN npm i

EXPOSE 80 443 3001 3002 3003 3004


RUN gulp env
RUN npm run build

