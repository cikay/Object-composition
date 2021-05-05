const canCast = (state) => ({
  cast(spell) {
    const { publicState, privateState } = state
    console.log(`${publicState.name} casts ${spell}`)
    publicState.mana--
    console.log(publicState.mana)
    console.log('publicState.privateProp', publicState.privateProp)
    return publicState
  },
})

const canOtherThing = (state) => ({
  doOtherThing() {
    const { publicState, privateState } = state
    console.log('I am doing other stuff')
    console.log('and this is state that I access', state)
    console.log('before ', privateState.privateProp)
    privateState.privateProp = 'changed in doOtherThing method'
    console.log('after ', privateState.privateProp)
    return publicState
  },
})

const privateMethod = Symbol('privateMethod')
const canPrivateThing = (state) => ({
  [privateMethod]() {
    const { publicState, privateState } = state
    console.log('I am private method')
    console.log('before ', state.privateProp)
    state.privateProp = 'changed in privateMethod method'
    console.log('after ', state.privateProp)
  },
})

const canFight = (state) => ({
  fight() {
    const { publicState, privateState } = state
    console.log(`${publicState.name} slashes at the foe`)
    publicState.stamina--
    const privateThing = canPrivateThing(privateState)
    privateThing[privateMethod]()
    return publicState
  },
})

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

  return Object.assign(
    publicState,
    canFight(state),
    canOtherThing(state),
    canPrivateThing(state)
  )
}

const fighter = createFighter('Muzaffer')
const chainingFighter = fighter.fight().doOtherThing()
console.log('chaining fighter')
console.log(chainingFighter)

const createMage = (name) => {
  const state = {
    name,
    health: 100,
    mana: 100,
  }

  return Object.assign(state, canCast(state))
}

// scorcher = createMage('Scorcher')
// scorcher.cast('fireball')
// console.log(scorcher.mana)

const createPaladin = (name) => {
  const state = {
    name,
    health: 100,
    mana: 100,
    stamina: 100,
  }

  return Object.assign(state, canCast(state), canFight(state))
}

// roland = createPaladin('Roland')
// roland.fight()
// roland.cast('something')
