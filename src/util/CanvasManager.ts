import { Image } from 'canvas'

import { CleanGuild } from '../interfaces/CleanGuild'
import { Images } from '../interfaces/Images'
import { Retriever } from './Retriever'

/**
 * Used to help keep all Canvas related methods in one class, with the exception
 * of the Modifier class.
 */
export class CanvasManager {
  retriever = new Retriever()

  async getBaseImages(
    cleanedGuild: CleanGuild
  ): Promise<Images> {
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
}
