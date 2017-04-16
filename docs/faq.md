# FAQ

###### How to start development server?
`yarn dev`

###### How to start server?
`yarn start`

###### Features
+ Dockerfile
+ HMR and Time-travel both on server and client
+ Server-side render
+ Critical CSS
+ TypeScript
+ CSS-in-JS via `styled-components`
+ Material-UI, TinyMCE, YouTube

###### TODO
+ Cache bursting
+ Code split
+ ServiceWorker and Offline-first
+ Intl/i18n
+ Electron
+ ReactNative

###### Stack
+ ES6+
+ React
    + React-router (synchronized to Redux)
+ Redux
    + Redux-Form
    + Redux-Thunk (async actions)
    + TinyMCE
    + Semantic-UI
    + YouTube API
+ Apollo and GraphQL
+ Styled-components
+ Immutable.js
+ Server-side
    + Koa
    + Passport
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
