import { Canvas } from 'canvas'

import { Emblem } from './interfaces/Guild'


class Didier {
  async getEmblemBuffer(emblem: Emblem, factionId: number) { 
    const canvas = await this.getEmblemCanvas(emblem, factionId)
    return canvas.toBuffer()
  }
  
  async getEmblemCanvas(emblem: Emblem, factionId: number): Promise<Canvas> {


    return new Canvas(0, 0)
  }
}

export { Didier as GuildEmblemGenerator }
