const canCast = (state) => ({
  cast(spell) {
    console.log(`${state.name} casts ${spell}`)
    state.mana--
    console.log(state.mana)
    console.log('state.privateProp', state.privateProp)
  },
})

const canOtherThing = (state) => ({
  doOtherThing() {
    console.log('I am doing other stuff')
    console.log('and this is state that I access', state)
    console.log('before ', state.privateProp)
    state.privateProp = 'changed in doOtherThing method'
    console.log('after ', state.privateProp)
  },
})

const privateMethod = Symbol('privateMethod')
const canPrivateThing = (state) => ({
  [privateMethod]() {
    console.log('I am private method')
    console.log('before ', state.privateProp)
    state.privateProp = 'changed in privateMethod method'
    console.log('after ', state.privateProp)
  },
})

const canFight = (state) => ({
  fight() {
    console.log(`${state.name} slashes at the foe`)
    state.stamina--
    const otherThing = canOtherThing(state)
    otherThing.doOtherThing()
    const privateThing = canPrivateThing(state)
    privateThing[privateMethod]()
  },
})

const createFighter = (name) => {
  const publicState = {
    name,
    health: 100,
    stamina: 100,
  }

  const privateState = {
    privateProp: 'I am private',
  }

  const state = Object.assign({}, publicState, privateState)

  return Object.assign(
    publicState,
    canFight(state),
    canOtherThing(state),
    canPrivateThing(state)
  )
}

const fighter = createFighter('Muzaffer')
fighter.fight()
console.log('fighter')
console.log(fighter)
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
