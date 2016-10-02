import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'

// import { Home } from './pages'
import Home from './pages/Home'
import pages from './pages'

console.log(pages)

export default (
  <Route name="home" path="/" component={Home} />
)
