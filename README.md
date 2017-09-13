dollar-street-cms-api
=====================

[ ![Codeship Status for valor-software/dollar-street-pages](https://codeship.com/projects/1765f210-5c54-0132-3613-06a513245d06/status)](https://codeship.com/projects/50778)

A web-interface for browsing and managing a large collection of photos &amp; videos, by tags like income and location.

####Install

```
npm install
```

##Run

UI usage (API should be started separately):
```
# start webpack-dev-server listening on localhost:8080, hot reload
npm run dev

# build in development and server via nginx
npm run build

# production build
npm run deploy
```

API usage:
```
# install, run and build app
./server.sh install

# update nginx\haproxy configuration and restart
./server.sh configure
```

##How it works

 * server.sh - bash script for install\config\start server and start three main app files - ds.cms.app.js, ds.comparison.app.js, ds.consumer.app.js.

 * ds.models - schemes for whole project.

 * migrations - contains scripts for migrations.

 * scripts - platotest generate statistic, dump_upload - for dump database and send on amazon. Server contains haproxy and nginx configuration.

 * logs - server work logging.

 * uploads - temporary storage.


 - ds.consumer.config - configure consumer app

    *  env - consumer config in json format

    *  config.js - set config to consumer app

    *  express.js - config for express

    *  index.js - require config files

 * ds.consumer.public - frontend part of the application.

    *  assets - media files for app (CSS, fonts, images)

    *  consumer.components - content components

     * aboutPage - template and controller files

     * allCountriesPage - template and controller files

     * config - ui router config

     * constants - geo-constants (country, latitude, langtitude etc.)

     * familyPage - template and controller files

     * mapPage -  template and controller files

     * photographersPage

         * all - template and controller files

         * single - template and controller files

     * prototypeSlider - template and controller files

     * service - resource and map services

     * streetPage - service, directive, template and controller files

        * controller - controllers for street page

        * directive - directives for street page

        * service - services for street page

        * template - templates for street page

    * thingsMatrixPage - template and controller files

    *  libs - third-party libraries

 * ds.consumer.routes - backend part of the app

    *  about - about project route

    *  allCountriesPage - routes and handlers

    *  familyPage - routes and handlers

    *  mapPage - routes and handlers

    *  photographersPage - routes and handlers

    *  streetPage - routes and handlers

    *  thingsMatrixPage - routes and handlers
