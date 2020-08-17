import { Image } from 'canvas'

import { Crest } from '../interfaces/Guild'

export class CacheManager {
  /** TODO: COMPLETE THIS FUNCTION, IT'S NOT FUNCTIONAL */
  private isCached(crest: Crest) {
    return crest
  }

  /** TODO: COMPLETE THIS FUNCTION, IT'S NOT FUNCTIONAL */
  getImage(crest: Crest) {
    if (this.isCached(crest)) return crest
    else return undefined
  }

  /** TODO: COMPLETE THIS FUNCTION, IT'S NOT FUNCTIONAL */
  cacheImage(image: Image) {
    return image
  }
}
