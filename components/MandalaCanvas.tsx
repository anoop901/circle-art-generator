import * as React from "react";
import Mandala from "../model/Mandala";

interface P {
  mandala: Mandala;
}

export default function MandalaCanvas(props: P) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvasElem = canvasRef.current!;
    const canvasCtx = canvasElem.getContext("2d")!;
    drawMandala(props.mandala, canvasCtx);
  });

  return (
    <canvas
      ref={canvasRef}
      className="max-w-full"
      width={500}
      height={500}
    ></canvas>
  );
}

function drawMandala(mandala: Mandala, canvasCtx: CanvasRenderingContext2D) {
  canvasCtx.fillStyle = mandala.backgroundColor || "black";
  canvasCtx.fillRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);

  for (const layer of mandala.layers) {
    for (let i = 0; i < layer.numberOfCircles; i++) {
      const x =
        mandala.center.x +
        layer.distanceFromCenter *
          Math.sin(
            (2 * Math.PI * (i + (layer.phase || 0))) / layer.numberOfCircles
          );
      const y =
        mandala.center.y -
        layer.distanceFromCenter *
          Math.cos(
            (2 * Math.PI * (i + (layer.phase || 0))) / layer.numberOfCircles
          );
      canvasCtx.beginPath();
      canvasCtx.ellipse(x, y, layer.radius, layer.radius, 0, 0, 2 * Math.PI);
      canvasCtx.fillStyle = layer.color;
      canvasCtx.fill();
    }
  }
}
