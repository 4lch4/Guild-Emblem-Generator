import { Background } from './Background'
import { CleanBorder } from './CleanBorder'
import { CleanEmblem } from './CleanEmblem'

export interface CleanGuild {
  /**
   * An integer that represents which faction the guild belongs to.
   * 
   * 0 = Alliance
   * 1 = Horde
   * 2 = Neutral
   */
  faction: number

  /**
   * The cleaned up object containing the Emblem image data.
   */
  emblem: CleanEmblem

  /**
   * The cleaned up object containing the Border image data.
   */
  border: CleanBorder

  /**
   * The object containing the Background image data.
   */
  background: Background
}
