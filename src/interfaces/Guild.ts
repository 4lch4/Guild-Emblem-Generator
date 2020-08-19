import { Crest } from './Crest'
import { Faction } from './Faction'
import { Href } from './Href'

export interface Guild {
  _links: _link
  id: number
  name: string
  faction: Faction
  achievement_points: number
  member_count: number
  realm: Realm
  crest: Crest
  roster: Href
  achievements: Href
  created_timestamp: number
  activity: Href
}

interface _link {
  self: Href
}

interface Realm {
  key: Href
  name: string
  id: number
  slug: string
}
