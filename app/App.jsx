import React, { Component } from 'react'

class App extends Component {
  render () {
    let { children } = this.props
    console.log(111, children)

    return (
      <div>
        <h1>Hello world!!!</h1>
        {children}
      </div>
    )
  }
}

export default App
