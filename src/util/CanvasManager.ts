import { Canvas, Image } from 'canvas'

import { CleanGuild, CrestImages } from '../interfaces'
import { Coordinates } from './Constants'
import { Retriever } from './Retriever'

/**
 * Used to help keep all Canvas related methods in one class, with the exception
 * of the Modifier class.
 */
export class CanvasManager {
  retriever = new Retriever()

  async getBaseImages(cleanedGuild: CleanGuild): Promise<CrestImages> {
    const {
      background: backgroundBuffer,
      border: borderBuffer,
      flag: flagBuffer,
      hooks: hooksBuffer,
      icon: iconBuffer
    } = await this.retriever.getAllImages(cleanedGuild)

    const icon = new Image()
    icon.src = iconBuffer

    const hooks = new Image()
    hooks.src = hooksBuffer

    const border = new Image()
    border.src = borderBuffer

    const flag = new Image()
    flag.src = flagBuffer

    const background = new Image()
    background.src = backgroundBuffer

    return { icon, hooks, border, flag, background }
  }

  async generateCrest(images: CrestImages) {
    const canvas = new Canvas(250, 250)
    const ctx = canvas.getContext('2d')

    ctx.drawImage(
      images.background,
      Coordinates.background.x,
      Coordinates.background.y,
      images.background.width,
      images.background.height
    )

    ctx.drawImage(
      images.flag,
      Coordinates.flag.x,
      Coordinates.flag.y,
      images.flag.width,
      images.flag.height
    )

    ctx.drawImage(
      images.hooks,
      Coordinates.hooks.x,
      Coordinates.hooks.y,
      images.hooks.width,
      images.hooks.height
    )

    ctx.drawImage(
      images.border,
      Coordinates.border.x,
      Coordinates.border.y,
      images.border.width,
      images.border.height
    )

    ctx.drawImage(
      images.icon,
      Coordinates.icon.x,
      Coordinates.icon.y,
      images.icon.width,
      images.icon.height
    )
  }
}
