// import './grabber'
import server from './server'

let PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log('Server started')
  console.log(process.env.NODE_ENV)
})
