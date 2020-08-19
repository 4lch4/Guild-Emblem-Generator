import { Canvas } from 'canvas'
import { outputFile, WriteFileOptions } from 'fs-extra'

import { Guild } from './interfaces'
import { CanvasManager, InputCleaner, IOManager, Modifier } from './util'

class Didier {
  canvasManager = new CanvasManager()
  ioManager = new IOManager()
  modifier = new Modifier()

  /**
   * Creates an image of the guild emblem using the data in the given Guild
   * object. The Guild object is generally returned via the Battle.net Guild API
   * endpoints (/data/wow/guild/{realmSlug}/{nameSlug}).
   *
   * The resulting emblem image is returned as a Buffer via a Promise.
   *
   * @param guild The Guild object returned by the Battle.net API.
   */
  async getEmblemBuffer(guild: Guild) {
    const canvas = await this.getEmblemCanvas(guild)
    return canvas.toBuffer()
  }

  /**
   * Creates an image of the guild emblem using the data in the given Guild
   * object. The Guild object is generally returned via the Battle.net Guild API
   * endpoints (/data/wow/guild/{realmSlug}/{nameSlug}).
   *
   * The resulting emblem image is returned as a Canvas via a Promise.
   *
   * @param guild
   */
  async getEmblemCanvas(guild: Guild): Promise<Canvas> {
    // TODO: Add CacheManager implementation
    const cleanedGuild = InputCleaner.cleanGuild(guild)

    const baseImages = await this.canvasManager.getBaseImages(cleanedGuild)

    const colorizedImages = await this.modifier.updateBaseImageColor(
      baseImages,
      cleanedGuild
    )

    return this.canvasManager.layerCrestImages(colorizedImages)
  }

  /**
   * Creates an image of the guild emblem using the data in the given Guild
   * object. The Guild object is generally returned via the Battle.net Guild API
   * endpoints (/data/wow/guild/{realmSlug}/{nameSlug}).
   *
   * The resulting emblem image is saved to the location specified in the
   * `filename` parameter.
   *
   * @param guild The Guild to generate an emblem for.
   * @param filename The full path for where to store the resulting image.
   * @param options Additional options to provide to fs-extra when saving.
   */
  async saveEmblemToFile(
    guild: Guild,
    filename: string,
    options?: WriteFileOptions
  ) {
    const emblemBuffer = await this.getEmblemBuffer(guild)
    return outputFile(filename, emblemBuffer, options)
  }
}

export { Didier as GuildEmblemGenerator }
