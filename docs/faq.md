# FAQ

###### How to start development server?
`yarn dev`

###### How to start server?
`yarn start`

###### Features
+ HMR and Time-travel
+ Server-side render
+ CSS-in-JS via `styled-components`

###### TODO
+ Cache bursting
+ Code split
+ Intl/i18n
+ TypeScript
+ Electron
+ ReactNative

###### Stack
+ ES6+
+ React
    + React-router
+ Redux
    + Redux-Form
    + React-router-redux
+ Apollo and GraphQL
+ Styled-components
+ Immutable.js
+ Server-side
    + Koa
    + GraphiQL (development)
    + Webpack dev server (development)

###### Structure
+ `babel.preset.js` - Universal `babel` preset
+ `server.babel.js` - Server entry point
+ `devServer.js` - webpack-dev-server with mounted app
`app/` - App root
+ `app/routes.jsx` - React-Router routes
+ `app/client.jsx` - Client-side entry point
+ `app/store/` - Redux related
+ `app/components` - React components
    + `pages/` - Pages
    + `ui/` - UI/Stateless components
    + `containers/` - Stateful components
+ `app/server/` - Server-side code
    + `index.js` - Setup Koa app
    + `config.js` - Server configuration
    + `passport.js` - Passport auth system
    + `renderer.jsx` - Universal React app render
    + `models/` - DB models
    + `data/` - GraphQL related
