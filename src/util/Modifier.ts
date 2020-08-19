import { Canvas, Image } from 'canvas'

import { CleanGuild } from '../interfaces/CleanGuild'
import { Images } from '../interfaces/Images'
import { RGBA } from '../interfaces/RGBA'

export class Modifier {
  async changeImageColor(img: Image, rgba: RGBA) {
    const rgbks = await this.generateRGBKs(img)

    return this.generateTintImage(img, rgbks, rgba)
  }

  async updateBaseImageColor(
    images: Images,
    guild: CleanGuild
  ): Promise<Images> {
    images.icon = await this.changeImageColor(images.icon, guild.emblem.color.rgba)
    images.border = await this.changeImageColor(images.border, guild.border.color.rgba)
    images.background = await this.changeImageColor(images.background, guild.background.color.rgba)

    return Promise.resolve(images)
  }

  hexToRGB(hex: string) {
    return {
      r: parseInt(hex.slice(2, 4), 16),
      g: parseInt(hex.slice(4, 6), 16),
      b: parseInt(hex.slice(6, 8), 16)
    }
  }

  async generateRGBKs(img: Image) {
    const w = img.width
    const h = img.height
    const rgbks = []

    const finalCanvas = new Canvas(w, h)

    const finalCtx = finalCanvas.getContext('2d')
    finalCtx.drawImage(img, 0, 0)

    const pixels = finalCtx.getImageData(0, 0, w, h).data

    for (let rgbI = 0; rgbI < 4; rgbI++) {
      const canvas = new Canvas(w, h)

      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      const to = ctx.getImageData(0, 0, w, h)
      let toData = to.data

      for (let i = 0, len = pixels.length; i < len; i += 4) {
        toData[i] = rgbI === 0 ? pixels[i] : 0
        toData[i + 1] = rgbI === 1 ? pixels[i + 1] : 0
        toData[i + 2] = rgbI === 2 ? pixels[i + 2] : 0
        toData[i + 3] = pixels[i + 3]
      }

      ctx.putImageData(to, 0, 0)

      // image is _slightly_ faster then canvas for this, so convert
      const imgComp = new Image()
      imgComp.src = canvas.toDataURL()

      rgbks.push(imgComp)
    }

    return Promise.resolve(rgbks)
  }

  async generateTintImage(img: Image, rgbks: any, rgba: RGBA) {
    const finalImage = new Image()
    const canvas = new Canvas(img.width, img.height)
    const ctx = canvas.getContext('2d')

    ctx.globalAlpha = 1
    ctx.globalCompositeOperation = 'copy'
    ctx.drawImage(rgbks[3], 0, 0)

    ctx.globalCompositeOperation = 'lighter'
    if (rgba.r > 0) {
      ctx.globalAlpha = rgba.r / 255.0
      ctx.drawImage(rgbks[0], 0, 0)
    }
    if (rgba.g > 0) {
      ctx.globalAlpha = rgba.g / 255.0
      ctx.drawImage(rgbks[1], 0, 0)
    }
    if (rgba.b > 0) {
      ctx.globalAlpha = rgba.b / 255.0
      ctx.drawImage(rgbks[2], 0, 0)
    }

    finalImage.src = canvas.toBuffer()

    return Promise.resolve(finalImage)
  }
}
