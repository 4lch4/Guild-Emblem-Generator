import { Image } from 'canvas'

export interface ImageBuffers {
  icon: Buffer
  hooks: Buffer
  border: Buffer
  flag: Buffer
  background: Buffer
}

export interface Images {
  icon: Image
  hooks: Image
  border: Image
  flag: Image
  background: Image
}
