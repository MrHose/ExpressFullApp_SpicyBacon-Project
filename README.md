# Spicy-Bacon Game and Social Media Platform

<hr>

Created using the ExpressJS backend boilerplate as a base, which includes:
- **Views Template**: Handlebars
- **CSS Engine**: SCSS - Node-sass-middleware
- **ODM**: Mongoose
- **UI Framework**: Bootstrap 


Express middlewares:
- **Logger**: morgan
- **HTTP POST Params**: body-parser
- **Cookies**: cookie-parser

Facilities:
- Gitignore file
- Seeds file
- Error handling

## Directory structure

````

express-generator/
├── app.js
├── package.json
├── .gitignoe
├── routes
│   │── index.js
│   └── base.routes.js
├── models
│   └── user.model.js
├── utils
│   └── index.js
├── middlewares
│   └── index.js
├── views
│   │── layout.hbs
│   │── errors
│   │   │── not-found.hbs
│   │   └── server-error.hbs
│   │── pages
│   │   └── index.hbs
│   └── partials
├── public
│   ├── img
│   ├── js
│   │   └── script.js
│   └── css
│       └── styles.sass
├── config
│   │── db.config.js
│   │── debug.config.js
│   │── hbs.config.js
│   │── locals.config.js
│   │── middleware.config.js
│   │── sass.config.js
│   └── views.config.js
└── bin
    ├── seeds.js
    └── www

````

## Install

- Run `npm i` on the root directory

## Run

- Create a `.env` file on the root directory to link the MongoDB URI (`MONGODB_URI`) and port (`PORT`)
- Run `npm run dev` command on the root directory
