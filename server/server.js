import express from 'express'
import path from 'path'
import webpackDev from '../webpack.dev'

const app = express()

if (process.env.NODE_ENV !== 'production') {
  webpackDev(app);
}

app.use(express.static(process.cwd() + '/public'))

app.use((req, res) => {
  // const location = new Location(req.path, req.query)

  // Router.run(routes, location, (err, routeState) => {
  //   if (err) return console.error(err);
  //
  //   const InitialComponent = (
  //     <Router {...routeState} />
  //   );
  //
  //   const componentHTML = React.renderToString(InitialComponent)

  const HTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Pokebase</title>
      </head>
      <body>
        <div id="react-view"></div>
        <script type="application/javascript" src="/js/bundle.js"></script>
      </body>
    </html>
  `

  res.end(HTML)
  // })
})

export default app;
