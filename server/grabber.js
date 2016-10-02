console.log('Grabber started')

import MongoStorage from './MongoStorage'
import superagent from 'superagent'

setInterval(() => {
  let storage = new MongoStorage()
  storage.init()
    .then(() => {
      superagent
        .get(`https://murmuring-ridge-22193.herokuapp.com/raw_data`)
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

setInterval(() => {
  let storage = new MongoStorage()
  storage.init()
    .then(() => {
      superagent
        .get(`https://testpokemong.herokuapp.com/raw_data`)
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
            console.log(`${Date()} Added ${newPokemons} new pokemon(s) FROM testpokemong`)
          }

          storage.close()
        })
    })
}, 60000)

setInterval(() => {
  let storage = new MongoStorage()
  storage.init()
    .then(() => {
      superagent
        .get(`http://pokemap.randomain.name/pokemons/${Date.now()}`)
        .auth('poke', 'mongo')
        .end(async (err, res) => {
          if (err) {
            console.log(err)
            return
          }

          let pokemons = res.body
          let newPokemons = 0

          for (let pokemon of pokemons) {
            if (!pokemon.encounter_id) return
            let found = await storage.findBy('pokemon_appears', 'encounter_id', pokemon.encounter_id)
            if (found.length === 0) {
              newPokemons++
              await storage.insert('pokemon_appears', pokemon)
            }
          }

          if (newPokemons > 0) {
            console.log(`${Date()} Added ${newPokemons} new pokemon(s) from POKEMAP.RANDOMAIN.NAME`)
          }

          storage.close()
        })
    })
}, 60000)
