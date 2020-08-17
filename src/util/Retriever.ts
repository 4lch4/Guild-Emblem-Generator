import { readFile } from 'fs/promises'
import { join } from 'path'

/**
 * The helper class responsible for retrieving images from disk that are used to
 * build emblems.
 */
export class Retriever {
  /** The directory where all the images are stored. */
  imgPath = join(__dirname, '..', 'img')

  /**
   * Retrieves an icon image from storage based on the provided icon id. The
   * image retrieved will be img/icons/emblem_iconId.png.
   *
   * @param iconId The id of the icon to retrieve.
   */
  getIcon(iconId: number): Promise<Buffer> {
    const iconPath = join(this.imgPath, `icons/emblem_${iconId}.png`)
    return readFile(iconPath)
  }

  /**
   * Retrieves the background image for a guild emblem based on the provided
   * faction id.
   *
   * 0 = Alliance
   *
   * 1 = Horde
   *
   * @param factionId 0 = Alliance; 1 = Horde
   */
  getBackground(factionId: number): Promise<Buffer> {
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
  getFlag(): Promise<Buffer> {
    return readFile(join(this.imgPath, 'bg_00.png'))
  }

  /**
   * Retrieves the border image for a guild emblem based on the provided border
   * id. The returned image will be img/border/border_borderId.png.
   *
   * @param borderId Id of the border to retrieve.
   */
  getBorder(borderId: number): Promise<Buffer> {
    const borderPath = join(this.imgPath, 'borders', `border_0${borderId}.png`)
    return readFile(borderPath)
  }

  /**
   * Retrieves the hooks image for building a guild emblem and returns it
   * through a promise.
   */
  getHooks() {
    return readFile(join(this.imgPath, 'hooks.png'))
  }
}
