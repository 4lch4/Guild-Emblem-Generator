import { CleanGuild, Guild } from '.'

/**
 * The interface that defines the CacheManager. The CacheManager is responsible
 * for storing and retrieving previously created images to save on processing
 * time when creating an image more than once.
 */
export interface ICacheManager {
  /**
   * Attempt to retrieve the emblem image for the given Guild and return it as a
   * Buffer. If the image has not been cached, return undefined.
   *
   * @param guild The Guild object you wish to get the emblem image for.
   */
  getEmblemBuffer(guild: Guild | CleanGuild): Promise<Buffer | undefined>

  /**
   * Cache/store the given emblem image using the preferred method, such as disk
   * or Redis.
   *
   * @param guild The cleaned Guild object containing the emblem to cache.
   * @param image The image buffer for the Emblem that is to be cached.
   */
  cacheEmblem(guild: CleanGuild, image: Buffer): Promise<undefined>
}
