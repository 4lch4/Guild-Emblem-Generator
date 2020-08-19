interface Factions {
  [key: string]: {
    id: number
    name: string
  }
}

const Factions: Factions = {
  ALLIANCE: {
    id: 0,
    name: 'Alliance'
  },
  HORDE: {
    id: 1,
    name: 'Horde'
  },
  NEUTRAL: {
    id: 2,
    name: 'Neutral'
  }
}

interface Coordinates {
  [key: string]: {
    x: number
    y: number
  }
}

const Coordinates: Coordinates = {
  flag: {
    x: 37,
    y: 47
  },
  background: {
    x: 17,
    y: 17
  },
  hooks: {
    x: 37,
    y: 49
  },
  border: {
    x: 50,
    y: 60
  },
  icon: {
    x: 55,
    y: 75
  }
}

export { Factions, Coordinates }
