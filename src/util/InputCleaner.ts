import { Border } from '../interfaces/Border'
import { CleanBorder } from '../interfaces/CleanBorder'
import { CleanEmblem } from '../interfaces/CleanEmblem'
import { CleanGuild } from '../interfaces/CleanGuild'
import { Emblem } from '../interfaces/Emblem'
import { Faction } from '../interfaces/Faction'
import { Guild } from '../interfaces/Guild'
import { Factions } from './Constants'

export class InputCleaner {
  static cleanGuild(guild: Guild): CleanGuild {
    return {
      background: guild.crest.background,
      border: this.cleanBorder(guild.crest.border),
      emblem: this.cleanEmblem(guild.crest.emblem),
      faction: this.cleanFaction(guild.faction)
    }
  }

  static cleanBorder(border: Border): CleanBorder {
    return {
      color: border.color,
      id: border.id
    }
  }

  static cleanEmblem(emblem: Emblem): CleanEmblem {
    return {
      id: emblem.id,
      color: emblem.color
    }
  }

  static cleanFaction(faction: Faction): number {
    return Factions[faction.type].id
  }
}
