# GeoPlaces NFT API Server

## Overview

This is a GeoPlaces application for building REST APIs in Node.js using TypeScript and Express.

### 3-Layer Architecture

![Alt text](/bin/images/3-layer.png?raw=true '3-Layer')

    1. Controllers receive incoming api requests, and they leverage services
    2. Services contain all business logic, and can also make calls to the data access layer
    3. The data access layer interacts with the database by performing queries
    4. Results are passed back up to the service layer.
    5. The service layer can then hand everything back to the controller
    6. The controller can then respond to the client!

##### Few do-nots:

-   API layer is only to handle the request and response, So do not put the business logic inside it.
-   All applications business logics should be only resides inside the service module.

##### Services should not:

    1.Be provided the req or res objects
    2.Handle responding to clients
    3.Provide anything related to HTTP Transport layer; status codes, headers, etc.
    4.Directly interact with the database

### Features

-   TypeScript : Typescript support and compilation is enabled
-   Code Linting: Uses the airbnb-base, prettier style guide with ESLint parsing modern ES8+ syntax and husky added with lint-staged.
-   Debugging: To enable debugging sequelize query logs & nodemailer emails by setting DEBUG env variable. If DEBUG env variable is not set, nothing is displayed to the console.
-   API parameter validation via JOI: Validate body, params, query of a request (via middleware) and return a response with errors; if any of the configured validation rules fail. You won't anymore need to make your route handler dirty with such validations.
-   Secure app via helmet: Helmet helps secure Express apps by setting various HTTP headers.
-   winston: To capture logs in a file and used with automated rotation of Express/Connect logs or anything else that writes to a file on a regular basis that needs to be rotated based on date, a size limit or combination and remove old log files based on count or elapsed days.
-   passport with JWT support | Authentication middleware for Nodejs
-   rate-limiter-flexible: To limit number of actions by key and protects from DDoS and brute force attacks at any scale.
-   sequelizejs / Mongoose: ORM for Node application and supports dialects MySQL / MongoDb
-   The interaction between API layer, Service layer and database layer will be done via DI, and the code structure follows the principle of 3s layer architecture.
-   Translation support added for the api response messages.

### Folder Structure

-   @types: Types folder which contains the custom typed definitons
-   bin
    -   database: contains database scripts for installation
    -   generator
    -   jest: setup files for jest testing
    -   postman-collection
    -   scripts: contains bash script and setup files
-   coverage
-   dist: Contains the build files which compiled from typescript
-   docs: Contains documentaion files for application routes.
    -   html
    -   swagger
-   logs: Contains log files which rotated on daily basis
-   src
    -   @core: Core files for bootstraping application with express, middleware. resuable libraries and helpers
    -   @factory
        -   cache-layer: Cache factory which contains caching services like redis.
        -   mail: mail factory which contains mailer services.
        -   models: database ORM models, ORM instance and interfaces.
            -   interfaces: contains interface files.
            -   sequelizes: contains sequelize models and connection instance.
        -   repo: database service layer which contains db crud services.
        -   service: service layer, i.e service factory which contains all the service files needed for the application.
    -   @interfaces: interfaces which are used for the typescript static typechecking across applications.
    -   @routes: Contains the application routes.
    -   api: presetaton/API layer which contain all the API controllers.
    -   constants: Site constants are maintained in this folder
    -   helpers: Comman resuable helper functions.
    -   lib: Common resuable library function are maintained in this folder.
    -   templates
        -   email: Contains the email template files(pug template)
    -   translator
    -   logger.ts - Logger entry file
    -   server.ts : Entry file to run
-   tests
-   .editorconfig - editor configurations\*
-   .env - app common Configurations\*
-   .env*development - development Configurations*
-   .env*production - production Configurations*
-   .env*test - test Configurations*
-   .eslintrc - code linter\*
-   .prettierrc - code linter used with eslint\*
-   package.json - project dependencies and dev dependencies
-   tsconfig.json - typescript compile configuration options are maintained.

### Pre-requisite

---

-   Node.js - version 16x
-   TypeScript - version 4x
-   NPM - version 8x
-   MySQL 8x / Mongo DB [setup on local or use via Docker by referring steps on the below line]

#### Docker for local development:

To run mongodb and redis server via docker, pls run the below command.[before that please ensure the .env files are configured correctly.]

To compose, build and run for local environment

```sh
docker-compose up -d --remove-orphans
```

To stop containers

```sh
docker-compose stop -d --remove-orphans
```

To remove containers

```sh
docker-compose down -d --remove-orphans
```

---

### Getting Started

---

To get start clone the repository:

###### Change directory and install npm dependencies

```sh
$ cd myproject
$ npm install
```

###### To start in local development mode with auto reload feature on code change.

```sh
# To run local server
$ cp .env.sample .env
$ npm run local
```

###### To start the integration test pls configure the file .env.testing and run the below code in terminal.

```sh
$ cp .env.sample .env.testing
$ npm run test:integration
or
$ npm run test:unit
```

###### To verify and fix the code linting

```sh
$ npm run lint
$ npm run lint:fix
```

### Environment specific compilation and build for server deployment.

---

### Deployment Steps

-   Production

    #### Step1: To build

    ```sh
    $ cd /var/www/{{project_folder}}
    $ git pull origin master
    $ npm install
    $ npm run build
    ```

    #### Step2: To Run Node server

    ```sh
    $ cd /var/www/{{target_folder}}
    $ mkdir logs     //Give necessary permissions to write
    $ mkdir uploads  //Give necessary permissions to write
    $ cp /var/www/{{project_folder}}/dist  .
    $ npm install
    $ npm run start
    ```

-   Other Environments. [Refer scripts section for additional info]

    #### Step1: To build

    ```sh
    $ cd /var/www/{{project_folder}}
    $ git pull origin {{branch}}
    $ npm install
    $ npm run build:{{environment}}
    ```

    #### Step2: To Run Node server

    ```sh
    $ cd /var/www/{{target_folder}}
    $ mkdir logs     //Give necessary permissions to write
    $ mkdir uploads  //Give necessary permissions to write
    $ cp /var/www/{{project_folder}}/dist  .
    $ npm install
    $ npm run start:{{environment}}
    ```

---

## Additional

---

### Scripts

Below is the collection of npm scripts used in this code base,

-   `start`: Run the application in production mode (prefer not to do that in development)
-   `build`: To Build the application for production server
-   `local`: Run the application for local development with hot reloading
-   `dev`: Run the application in development mode with hot reloading
-   `test`: Run the test suite for unit and integration
-   `test:unit`: Run only the unit tests
-   `test:integration`: Run only the integration tests
-   `compileTs`: Compile TypeScript files
-   `lint`: Lint the codebase
-   `lint:fix`: To fix Lint errors in codebase
-   `doc`: To generate api doc
-   `gt`: To generate code templates
-   `stop`: stop all pm2 process

---

### Lint your code before you commit!

In a collaborative project, it's always a pain when you have to work on files not correctly formatted. Now before each commit, yout typescript files are linted based on your tsconfig.json > .eslintrc > .prettierrc > .husky > lint-staged

---

##### Doc Links: [*Only for local and dev envrionment]

-   For Swagger documentation by visiting http://localhost:3000/api/swagger
-   For coverage report, visit http://localhost:3000/api/test/coverage
-   For unit test report, visit http://localhost:3000/api/test/unit
