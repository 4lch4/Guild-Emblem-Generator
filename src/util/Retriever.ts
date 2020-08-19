import { readFile } from 'fs-extra'
import { join } from 'path'

import { CleanGuild } from '../interfaces/CleanGuild'
import { ImageBuffers } from '../interfaces/Images'

/**
 * The helper class responsible for retrieving images from disk that are used to
 * build emblems.
 */
export class Retriever {
  /** The directory where all the images are stored. */
  imgPath = join(__dirname, '..', 'img')

  async getAllImages(cleanGuild: CleanGuild): Promise<ImageBuffers> {
    return {
      icon: await this.getIcon(cleanGuild.emblem.id),
      hooks: await this.getHooks(),
      border: await this.getBorder(cleanGuild.border.id),
      flag: await this.getFlag(),
      background: await this.getBackground(cleanGuild.faction)
    }
  }

  /**
   * Retrieves an icon image from storage based on the provided icon id. The
   * image retrieved will be img/icons/emblem_iconId.png.
   *
   * @param iconId The id of the icon to retrieve.
   */
  async getIcon(iconId: number): Promise<Buffer> {
    const filePath = join(this.imgPath, 'icons', `emblem_${iconId}.png`)
    return readFile(filePath)
  }

  /**
   * Retrieves the background image for a guild emblem based on the provided
   * faction id. The "Neutral" faction does not have a background, so there is
   * no option for it.
   *
   * 0 = Alliance
   *
   * 1 = Horde
   *
   * @param factionId 0 = Alliance; 1 = Horde
   */
  async getBackground(factionId: number): Promise<Buffer> {

    switch (factionId) {
      case 0:
        return readFile(join(this.imgPath, 'ring-alliance.png'))

      case 1:
      default:
        return readFile(join(this.imgPath, 'ring-horde.png'))
    }
  }

  /**
   * Retrieves the flag background image used as the base background.
   */
  async getFlag(): Promise<Buffer> {
    return readFile(join(this.imgPath, 'bg_00.png'))
  }

  /**
   * Retrieves the border image for a guild emblem based on the provided border
   * id. The returned image will be img/border/border_borderId.png.
   *
   * @param borderId ID of the border to retrieve.
   */
  async getBorder(borderId: number): Promise<Buffer> {
    return readFile(join(this.imgPath, 'borders', `border_0${borderId}.png`))
  }

  /**
   * Retrieves the hooks image for building a guild emblem and returns it
   * through a promise.
   */
  async getHooks() {
    return readFile(join(this.imgPath, 'hooks.png'))
  }
}
