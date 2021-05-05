const getCast = (state) => (spell) => {
  const { publicState } = state
  console.log(`${publicState.name} casts ${spell}`)
  publicState.mana--
  console.log(publicState.mana)
}

const getDoOtherThing = (state) => () => {
  const { privateState } = state
  console.log('I am doing other stuff')
  console.log('and this is state that I access', state)
  console.log('before ', privateState.privateProp)
  privateState.privateProp = 'changed in doOtherThing method'
  console.log('after ', privateState.privateProp)
}

const getPrivateMethod = (state) => () => {
  const { privateState } = state
  console.log('I am private method')
  console.log('before ', privateState.privateProp)
  privateState.privateProp = 'changed in privateMethod method'
  console.log('after ', privateState.privateProp)
}

const getFight = (state) => () => {
  const { publicState } = state
  console.log(`${publicState.name} slashes at the foe`)
  publicState.stamina--
  const privateMethod = getPrivateMethod(state)
  privateMethod()
}

const createFighter = (name) => {
  const publicState = {
    name,
    health: 100,
    stamina: 100,
  }

  const privateState = {
    privateProp: 'I am privateProp',
  }

  const state = {
    publicState,
    privateState,
  }
  const privateMethod = Symbol('privateMethod')

  const behavior = {
    fight: getFight(state),
    doOtherThing: getDoOtherThing(state),
    cast: getCast(state),
    [privateMethod]: getPrivateMethod(state),
  }

  return Object.assign({}, publicState, behavior)
}

const fighter = createFighter('Muzaffer')
fighter.fight()
fighter.doOtherThing()
console.log(fighter)
