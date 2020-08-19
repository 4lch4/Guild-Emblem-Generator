import { Factions } from '.'
import {
  Border,
  CleanBorder,
  CleanEmblem,
  CleanGuild,
  Emblem,
  Faction,
  Guild
} from '../interfaces'

/**
 * A utility class for cleaning/sanitizing inputs down to a usable and less
 * dense version of the incoming object.
 */
export class InputCleaner {
  /**
   * Cleans the Guild object returned by the Battle.net API by removing the
   * properties that we don't care for and leaving the only 4 we're concerned
   * with:
   *
   * - Crest Background
   * - Crest Border
   * - Crest Emblem
   * - Guild Faction
   *
   * @param guild The Guild object returned by the Battle.net API.
   */
  static cleanGuild(guild: Guild): CleanGuild {
    return {
      background: guild.crest.background,
      border: this.cleanBorder(guild.crest.border),
      emblem: this.cleanEmblem(guild.crest.emblem),
      faction: this.cleanFaction(guild.faction)
    }
  }

  /**
   * Cleans the given Border object by removing any properties other than those
   * we need:
   *
   * - ID
   * - Color
   *
   * @param border The Border object to clean.
   */
  static cleanBorder(border: Border): CleanBorder {
    return {
      color: border.color,
      id: border.id
    }
  }

  /**
   * Cleans the given Emblem object by removing any properties other than those
   * we need:
   *
   * - ID
   * - Color
   *
   * @param emblem The Emblem object to clean.
   */
  static cleanEmblem(emblem: Emblem): CleanEmblem {
    return {
      id: emblem.id,
      color: emblem.color
    }
  }

  /**
   * Takes the given Faction object and determines if it's Horde, Alliance, or
   * Neutral. Depending on the input, it will return the integer equivalent of
   * the faction (0 = Alliance; 1 = Horde; 2 = Neutral).
   *
   * This function does more of a conversion than a "clean", but for the sake of
   * continuity, it is named cleanFaction.
   *
   * @param faction The Faction to clean/convert.
   */
  static cleanFaction(faction: Faction): number {
    return Factions[faction.type].id
  }
}
