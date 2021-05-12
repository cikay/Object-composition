'use strict'

// pass State methods

// const getOtherThing =
//   (state) =>
//   (...args) => {
//     console.log('args', ...args)
//     console.log('state', state)
//   }

// const getFight =
//   (state) =>
//   (...args) => {
//     state.stamina--
//     console.log('state', state)
//   }

// const createFighter = (name) => {
//   const state = {
//     name,
//     health: 100,
//     stamina: 100,
//   }
//   // just return functions, keep all properties private that is more safe
//   return Object.freeze({
//     doOtherThing: getOtherThing(state),
//     fight: getFight(state),
//   })
// }

// Ovveride functions method 1
// const withState =
//   (state) =>
//   (fn) =>
//   (...args) => {
//     fn(state, ...args)
//   }
// const doOtherThing = (state, ...args) => {
//   // console.log('args', ...args)
//   // console.log('state', state)
// }

// const fight = (state, ...args) => {
//   state.stamina--
//   console.log('state', state)
// }

// const createFighter = (name) => {
//   const state = {
//     name,
//     health: 100,
//     stamina: 100,
//   }
//   // just return functions, keep all properties private that is more safe
//   return Object.freeze({
//     doOtherThing: withState(state)(doOtherThing),
//     fight: withState(state)(fight),
//   })
// }

const withState =
  (state, fn) =>
  (...args) => {
    fn(state, ...args)
  }
const doOtherThing = (state, ...args) => {
  // console.log('args', ...args)
  // console.log('state', state)
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
    doOtherThing: withState(state, doOtherThing),
    fight: withState(state, fight),
  })
}

const methodName = 'other method'
console.time(methodName)
const fighters = []
for (let i = 0; i < 100_000; i++) {
  fighters.push(createFighter('Slasher'))
}
console.timeEnd(methodName)

/*

METHOD 1


ovveride method: 83.166ms
ovveride method: 89.027ms
ovveride method: 84.426ms
ovveride method: 90.754ms
ovveride method: 95.801ms
ovveride method: 85.119ms
ovveride method: 94.13ms
ovveride method: 87.138ms
ovveride method: 94.408ms
ovveride method: 89.637ms
ovveride method: 84.285ms
ovveride method: 109.537ms
ovveride method: 111.465ms
ovveride method: 109.406ms
ovveride method: 85.276ms
ovveride method: 97.035ms
ovveride method: 95.789ms
ovveride method: 92.529ms
ovveride method: 93.052ms
ovveride method: 93.397ms
ovveride method: 90.299ms
ovveride method: 88.032ms
ovveride method: 93.065ms
ovveride method: 91.418ms
ovveride method: 91.18ms
ovveride method: 93.814ms








METHOD 2
pass state method: 57.036ms
pass state method: 58.255ms
pass state method: 59.658ms
pass state method: 61.681ms
pass state method: 58.717ms
pass state method: 55.456ms
pass state method: 58.675ms
pass state method: 57.321ms
pass state method: 82.315ms
pass state method: 64.653ms
pass state method: 63.325ms
pass state method: 60.152ms
pass state method: 60.123ms
pass state method: 58.052ms
pass state method: 63.495ms
pass state method: 59.587ms
pass state method: 56.372ms
pass state method: 62.59ms
pass state method: 57.046ms
pass state method: 72.618ms
pass state method: 61.279ms
pass state method: 59.283ms
pass state method: 59.4ms
pass state method: 59.232ms
pass state method: 60.38ms
pass state method: 58.958ms
pass state method: 58.747ms
pass state method: 60.598ms
pass state method: 57.132ms
pass state method: 57.499ms
pass state method: 58.273ms
pass state method: 57.743ms
pass state method: 55.792ms
pass state method: 63.44ms
pass state method: 57.408ms



other method: 58.224ms
other method: 57.364ms
other method: 57.593ms
other method: 58.102ms
other method: 59.285ms
other method: 58.785ms
other method: 60.243ms
other method: 60.48ms
other method: 61.695ms
other method: 61.05ms
other method: 56.831ms
other method: 61.354ms
other method: 64.04ms
other method: 59.347ms
other method: 58.99ms
other method: 64.857ms
other method: 57.72ms
other method: 64.177ms
other method: 61.949ms
other method: 60.586ms
other method: 58.828ms
other method: 59.595ms
other method: 65.071ms
other method: 61.203ms
other method: 58.704ms
other method: 62.784ms
other method: 61.22ms
other method: 55.977ms
other method: 55.81ms
other method: 60.275ms
other method: 57.673ms
other method: 62.75ms
other method: 58.92ms
other method: 57.669ms
other method: 58.702ms
other method: 57.375ms
other method: 61.177ms
other method: 59.502ms
other method: 61.644ms
other method: 61.327ms
other method: 78.026ms
other method: 63.328ms
other method: 60.812ms
other method: 60.701ms
other method: 60.729ms

*/
