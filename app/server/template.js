import template from 'lodash/template'

const html = `
    <html>
        <head>
            <title>YouMusic</title>
            <meta charset="utf-8">
        </head>
        <body>
            <div id="app">
                <%= content %>
            </div>
            <script>
                window.__PRELOADED_STATE__ = <%= JSON.stringify(state) %>
            </script>
        </body>
    </html>
`

const tmpl = template(html)
export default compiled
