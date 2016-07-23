import MongoStorage from './MongoStorage'
import superagent from 'superagent'

console.log('Grabber started')

setInterval(() => {
  let storage = new MongoStorage()
  storage.init()
    .then(() => {
      superagent
        .get(`http://limitless-dusk-20243.herokuapp.com/raw_data`)
        .end(async (err, res) => {
          if (err) {
            console.log(err)
            return
          }

          let { pokemons } = res.body
          let newPokemons = 0

          for (let pokemon of pokemons) {
            let found = await storage.findBy('pokemon_appears', 'encounter_id', pokemon.encounter_id)
            if (found.length === 0) {
              newPokemons++
              await storage.insert('pokemon_appears', pokemon)
            }
          }

          if (newPokemons > 0) {
            console.log(`${Date()} Added ${newPokemons} new pokemon(s)`)
          }

          storage.close()
        })
    })
}, 60000)
