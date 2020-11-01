import React, { useEffect } from 'react'
import { Image } from 'antd';
import styles from '../style.less';

type Props = {
    templateData: any
} & any

const TemplateImage: React.FC<Props> = (props: Props) => {
    console.log(props.templateData);

    const { downloadUrl, defaultContent = '' } = props.templateData
    const canvasRef = React.createRef();
    let ctx: CanvasRenderingContext2D;

    const textInfo = {
        width: 300,
        height: 300,
        textArea: {
            x: 20,
            y: 210,
            w: 260,
            h: 70
        }
    }

    useEffect(() => {
    })

    useEffect(() => {
        console.log('hhahhah');

        ctx = canvasRef.current.getContext('2d');
        setTimeout(() => {
            const { defaultContent = '' } = props.templateData
            const text = defaultContent
            const lines = text.split('\n').filter(text => text).map(text => text.trim())
            ctx.clearRect(0, 0, 300, 300)
            drawRect()
            draw(lines)
        });
    }, ['templateData'])

    function drawRect() {
        ctx.beginPath();
        ctx.lineWidth = "1";
        ctx.strokeStyle = "red";
        const { x, y, w, h } = textInfo.textArea
        ctx.rect(x, y, w, h);
        ctx.stroke();

    }

    function draw(lines) {
        // const ctx = canvasRef.current.getContext('2d');
        ctx.textBaseline = "top"
        ctx.textAlign = "center"
        const { x, y, w, h } = textInfo.textArea

        let fontSize = 40
        ctx.font = `${fontSize}px serif`;

        const longestValue = lines.map(text => ctx.measureText(text).width).sort((a, b) => b - a)[0]
        const maxFontSize = h / lines.length / 1.2
        fontSize = Math.min(maxFontSize, w / longestValue * fontSize)
        ctx.font = `${fontSize}px serif`;

        const lineHeight = fontSize * 1.2
        for (const [index, text] of lines.entries()) {
            ctx.fillText(text, x + w / 2, y + lineHeight * index)
        }
    }

    return (
        <div className={styles.TemplateImage} style={{ backgroundImage: `url('${downloadUrl}')` }}>
            <canvas ref={canvasRef} id="canvas" width="300px" height="300px"></canvas>
        </div>
        // <Image src={downloadUrl}></Image>
    )
}

export default TemplateImage