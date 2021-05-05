const canCast = (state) => ({
  cast(spell) {
    const { publicState } = state
    console.log(`${publicState.name} casts ${spell}`)
    publicState.mana--
    console.log(publicState.mana)
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
  },
})

const privateMethod = Symbol('privateMethod')
const canPrivateThing = (state) => ({
  [privateMethod]() {
    const { privateState } = state
    console.log('I am private method')
    console.log('before ', privateState.privateProp)
    privateState.privateProp = 'changed in privateMethod method'
    console.log('after ', privateState.privateProp)
  },
})

const canFight = (state) => ({
  fight() {
    const { publicState } = state
    console.log(`${publicState.name} slashes at the foe`)
    publicState.stamina--
    const privateThingObj = canPrivateThing(state)
    privateThingObj[privateMethod]()
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
    {},
    publicState,
    canFight(state),
    canOtherThing(state),
    canPrivateThing(state)
  )
}

const fighter = createFighter('Muzaffer')
fighter.fight()
fighter.doOtherThing()
