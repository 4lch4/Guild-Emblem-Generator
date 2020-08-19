import { outputFile, readFile, stat } from 'fs-extra'

import { CleanGuild, ICacheManager } from '../interfaces'

export class CacheManager implements ICacheManager {
  private isCached(filename: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        stat(filename, err => {
          if (err) resolve(false)
          else resolve(true)
        })
      } catch (err) {
        reject(err)
      }
    })
  }

  private getFilename(guild: CleanGuild): string {
    return `${guild.faction}.${guild.background.color.id}.${guild.border.id}.${guild.border.color.id}.${guild.emblem.id}.${guild.emblem.color.id}`
  }

  async getEmblemBuffer(guild: CleanGuild) {
    const filename = this.getFilename(guild)
    if (this.isCached(filename)) {
      return readFile(filename)
    } else return Promise.resolve(undefined)
  }

  async cacheEmblem(guild: CleanGuild, image: Buffer) {
    try {
      await outputFile(this.getFilename(guild), image)
      return undefined
    } catch (err) {
      return err
    }
  }
}
