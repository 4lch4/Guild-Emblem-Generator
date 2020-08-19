type TYPE = 'HORDE' | 'ALLIANCE' | 'NEUTRAL'
type NAME = 'Horde' | 'Alliance' | 'Neutral'

export interface Faction {
  type: TYPE
  name: NAME
}
