import { CleanGuild } from '../interfaces/CleanGuild'
import { Guild } from '../interfaces/Guild'

export class CacheManager {
  /** TODO: COMPLETE THIS FUNCTION, IT'S NOT FUNCTIONAL */
  private isCached(guild: Guild | CleanGuild) {
    return guild
  }

  /** TODO: COMPLETE THIS FUNCTION, IT'S NOT FUNCTIONAL */
  getImage(guild: Guild | CleanGuild) {
    if (this.isCached(guild)) return guild
    else return undefined
  }

  /** TODO: COMPLETE THIS FUNCTION, IT'S NOT FUNCTIONAL */
  cacheImage(guild: Guild | CleanGuild) {
    return guild
  }
}
