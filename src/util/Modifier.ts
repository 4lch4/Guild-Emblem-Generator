import { Canvas, Image } from 'canvas'

export class Modifier {
  async changeImageColor(img: Image, red: number, green: number, blue: number) {
    const rgbks = await this.generateRGBKs(img)

    return this.generateTintImage(img, rgbks, red, green, blue)
  }

  async updateBaseImageColor(images: Image[], colors: Colors) {
    for (let key in images) {
      const colorKey = key + 'Color'
      //@ts-ignore
      if (colors[colorKey] !== undefined) {
        //@ts-ignore
        const rgb = await this.hexToRGB(colors[colorKey])
        images[key] = await this.changeImageColor(
          images[key],
          rgb.red,
          rgb.green,
          rgb.blue
        )
      }
    }

    return Promise.resolve(images)
  }

  hexToRGB(hex: string) {
    const r = parseInt(hex.slice(2, 4), 16)
    const g = parseInt(hex.slice(4, 6), 16)
    const b = parseInt(hex.slice(6, 8), 16)

    return Promise.resolve({
      red: r,
      green: g,
      blue: b
    })
  }

  async generateRGBKs(img: Image) {
    let w = img.width
    let h = img.height
    let rgbks = []

    const finalCanvas = new Canvas(w, h)

    let finalCtx = finalCanvas.getContext('2d')
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

  async generateTintImage(
    img: Image,
    rgbks: any,
    red: number,
    green: number,
    blue: number
  ) {
    const finalImg = new Image()
    const buff = new Canvas(img.width, img.height)
    const ctx = buff.getContext('2d')

    ctx.globalAlpha = 1
    ctx.globalCompositeOperation = 'copy'
    ctx.drawImage(rgbks[3], 0, 0)

    ctx.globalCompositeOperation = 'lighter'
    if (red > 0) {
      ctx.globalAlpha = red / 255.0
      ctx.drawImage(rgbks[0], 0, 0)
    }
    if (green > 0) {
      ctx.globalAlpha = green / 255.0
      ctx.drawImage(rgbks[1], 0, 0)
    }
    if (blue > 0) {
      ctx.globalAlpha = blue / 255.0
      ctx.drawImage(rgbks[2], 0, 0)
    }

    finalImg.src = buff.toBuffer()

    return Promise.resolve(finalImg)
  }
}

interface Colors {
  iconColor: number
  borderColor: number
  backgroundColor: number
}
