import React, { useEffect, useState } from 'react'
import styles from '../style.less';

type Props = {
  templateData: any
} & any

const TemplateImage: React.FC<Props> = (props: Props) => {
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 })
  let { downloadUrl, defaultContent = '', textStyle, textArea } = JSON.parse(JSON.stringify(props.templateData))
  const canvasRef = React.createRef<HTMLCanvasElement>();
  let ctx: CanvasRenderingContext2D;

  useEffect(() => {
    draw()
  }, [props.templateData])

  function drawRect() {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "red";
    const { x, y, w, h } = textArea
    ctx.rect(x, y, w, h);
    ctx.stroke();
  }


  function drawText() {
    const lines = (defaultContent as string).split('\n').filter(text => text).map(text => text.trim())

    if (!lines.length) return

    const textColor = textStyle?.color || 'black'
    let maxFontSize = textStyle?.maxFontSize || 50

    ctx.textBaseline = 'top'
    ctx.textAlign = 'center'
    ctx.fillStyle = textColor

    const { x, y, w, h } = textArea
    let fontSize = maxFontSize

    ctx.font = `${fontSize}px serif`;

    //计算出长度最长那行的值
    const longestValue = lines.map(text => ctx.measureText(text).width).sort((a, b) => b - a)[0]

    //文字行数 * 行高不能超过文本框高度，计算出最大字体大小
    maxFontSize = Math.min(maxFontSize, h / lines.length / 1.2)
    //根据比例，计算出最合适的字体大小
    fontSize = Math.min(maxFontSize, w / longestValue * fontSize)

    ctx.font = `${fontSize}px serif`;


    //逐行绘制
    const lineHeight = fontSize * 1.2
    /** 第一行与顶部的距离，用于垂直居中 */
    const offsetTop = (h - lines.length * lineHeight) / 2;

    for (const [index, text] of lines.entries()) {
      ctx.fillText(text, x + w / 2, offsetTop + y + lineHeight * index)
    }
  }

  async function draw() {
    ctx = canvasRef.current?.getContext('2d') as CanvasRenderingContext2D;
    await loadImg()
    ctx.clearRect(0, 0, imgSize.width, imgSize.height)
    drawRect()
    drawText()
  }

  function loadImg() {
    return new Promise(resolve => {
      const img = new Image()
      img.src = downloadUrl
      img.onload = () => {
        const { width, height } = img
        setImgSize({ height, width })
        resolve()
      }
    })

  }

  return (
    <div className={styles.TemplateImage} style={{ backgroundImage: `url('${downloadUrl}')` }}>
      <canvas
        ref={canvasRef}
        id="canvas"
        width={`${imgSize.width}px`}
        height={`${imgSize.height}px`} />
    </div>
  )
}

export default TemplateImage