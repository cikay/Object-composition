'use strict'

const getCast = (state) => (spell) => {
  console.log(`${state.name} casts ${spell}`)
  state.mana--
  console.log(state.mana)
}

const getPrivateMethod = (state) => () => {
  console.log('I am privatePethod and that is state I access', state)
}

const getFight = (state) => () => {
  console.log(`${state.name} slashes at the foe`)
  state.stamina--
  const privateMethod = getPrivateMethod(state)
  privateMethod()
}

const createFighter = (name) => {
  const state = {
    name,
    health: 100,
    stamina: 100,
  }
  // just return functions, keep all properties private that is more safe
  return Object.freeze({
    fight: getFight(state),
    cast: getCast(state),
  })
}

const fighter = createFighter('Slasher')
fighter.fight()
