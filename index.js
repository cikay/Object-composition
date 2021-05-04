const canCast = (state) => ({
  cast(spell) {
    console.log(`${state.name} casts ${spell}`)
    state.mana--
    console.log(state.mana)
  },
})

const canOtherThing = (state) => ({
  doOtherThing() {
    console.log('I am doing other stuff')
    console.log('and this is state that I access', state)
  },
})

const privateMethod = Symbol('privateMethod')
const canPrivateThing = () => ({
  [privateMethod]() {
    console.log('I am private method')
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
  const state = {
    name,
    health: 100,
    stamina: 100,
  }

  return Object.assign(state, canFight(state))
}

const createMage = (name) => {
  const state = {
    name,
    health: 100,
    mana: 100,
  }

  return Object.assign(state, canCast(state))
}

scorcher = createMage('Scorcher')
scorcher.cast('fireball')
console.log(scorcher.mana)

const createPaladin = (name) => {
  const state = {
    name,
    health: 100,
    mana: 100,
    stamina: 100,
  }

  return Object.assign(state, canCast(state), canFight(state))
}

roland = createPaladin('Roland')
roland.fight()
roland.cast('something')
