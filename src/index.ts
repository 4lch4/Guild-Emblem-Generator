import { Canvas } from 'canvas'

import { Guild } from './interfaces/Guild'
import { CanvasManager, InputCleaner, Modifier, Retriever } from './util'
import { Coordinates as coords } from './util/Constants'


class Didier {
  canvasManager = new CanvasManager()
  retriever = new Retriever()
  modifier = new Modifier()

  async getGuildCrestBuffer(guild: Guild) {
    const canvas = await this.getGuildCrestCanvas(guild)
    return canvas.toBuffer()
  }

  async getGuildCrestCanvas(guild: Guild): Promise<Canvas> {
    // TODO: Add CacheManager implementation
    const cleanedGuild = InputCleaner.cleanGuild(guild)

    const baseImages = await this.canvasManager.getBaseImages(cleanedGuild)

    const colorizedImages = await this.modifier.updateBaseImageColor(
      baseImages,
      cleanedGuild
    )

    const canvas = new Canvas(250, 250)
    const ctx = canvas.getContext('2d')

    ctx.drawImage(
      colorizedImages.background,
      coords.background.x,
      coords.background.y,
      colorizedImages.background.width,
      colorizedImages.background.height
    )
    
    ctx.drawImage(
      colorizedImages.flag,
      coords.flag.x,
      coords.flag.y,
      colorizedImages.flag.width,
      colorizedImages.flag.height
    )
    
    ctx.drawImage(
      colorizedImages.hooks,
      coords.hooks.x,
      coords.hooks.y,
      colorizedImages.hooks.width,
      colorizedImages.hooks.height
    )
    
    ctx.drawImage(
      colorizedImages.border,
      coords.border.x,
      coords.border.y,
      colorizedImages.border.width,
      colorizedImages.border.height
    )
    
    ctx.drawImage(
      colorizedImages.icon,
      coords.icon.x,
      coords.icon.y,
      colorizedImages.icon.width,
      colorizedImages.icon.height
    )


    return canvas
  }
}

export { Didier as GuildEmblemGenerator }
