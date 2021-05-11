'use strict'

const doOtherThing = (state, ...args) => {
  console.log('args', ...args)
  console.log('state', state)
}

const withState =
  (state) =>
  (fn) =>
  (...args) => {
    fn(state, ...args)
    return fn
  }

const fight = (state, ...args) => {
  state.stamina--
  console.log('state', state)
}

const createFighter = (name) => {
  const state = {
    name,
    health: 100,
    stamina: 100,
  }
  // just return functions, keep all properties private that is more safe
  return Object.freeze({
    doOtherThing: withState(state)(doOtherThing),
    fight: withState(state)(fight),
  })
}

const fighter = createFighter('Slasher')
const withoutStateFight1 = fighter.doOtherThing('muzaffer')
const fighter2 = createFighter('Slasher')
const withoutStateFight2 = fighter2.doOtherThing('süleyman')
console.log(fighter.doOtherThing === fighter2.doOtherThing)
console.log(withoutStateFight2 === withoutStateFight1)
