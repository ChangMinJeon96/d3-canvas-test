import React from "react";
import { useRef, useEffect } from "react";

interface CanvasT {
  data: number;
}

const Canvas = ({ data }: CanvasT) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevData = useRef(0);

  useEffect(() => {
    let reqAnim: any;
    let dx = prevData.current * 20;
    const prevWidth = prevData.current * 20;

    const percent = data / 10;
    const width = percent * 200;

    const canvas = canvasRef.current as HTMLCanvasElement;
    const context = canvas?.getContext("2d") as CanvasRenderingContext2D;

    const gradient = context.createLinearGradient(0, 0, 200, 200);
    gradient.addColorStop(0, "#8794a2");
    gradient.addColorStop(0.5, "#7fa9d8");
    gradient.addColorStop(1, "#2cadd1");

    const render = () => {
      if (dx === width) {
        cancelAnimationFrame(reqAnim);
        return;
      }

      if (width > prevWidth && dx < width) {
        context.clearRect(0, 0, 200, 100);
        context.fillStyle = gradient;
        context.strokeStyle = "white";
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(200, 0);
        context.lineTo(200, 100);
        context.bezierCurveTo(200, 100, 100, 30, 0, 100);
        context.lineTo(0, 0);
        context.stroke();
        context.fill();
        context.beginPath();
        context.fillStyle = "white";
        context.fillRect(dx, 0, 200 - dx, 100);
        dx = dx + (width - prevWidth) / 60;
      }
      if (prevWidth > width && dx > width) {
        context.clearRect(0, 0, 200, 100);
        context.fillStyle = gradient;
        context.strokeStyle = "white";
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(200, 0);
        context.lineTo(200, 100);
        context.bezierCurveTo(200, 100, 100, 30, 0, 100);
        context.lineTo(0, 0);
        context.stroke();
        context.fill();
        context.beginPath();
        context.fillStyle = "white";
        context.fillRect(dx, 0, 200 - dx, 100);
        dx = dx + (width - prevWidth) / 60;
      }

      reqAnim = requestAnimationFrame(render);
    };

    requestAnimationFrame(render);
    prevData.current = data;

    return () => {
      cancelAnimationFrame(reqAnim);
    };
  }, [data]);

  return <canvas ref={canvasRef}></canvas>;
};

export default Canvas;
