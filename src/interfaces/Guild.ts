import { Crest } from './Crest'
import { Faction } from './Faction'
import { Link } from './Link'

export interface Guild {
  _links: _link
  id: number
  name: string
  faction: Faction
  achievement_points: number
  member_count: number
  realm: Realm
  crest: Crest
  roster: Link
  achievements: Link
  created_timestamp: number
  activity: Link
}

interface _link {
  self: Link
}

interface Realm {
  key: Link
  name: string
  id: number
  slug: string
}
