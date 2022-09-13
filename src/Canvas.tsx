import React from "react";
import { useRef, useEffect } from "react";

interface CanvasT {
  data: number;
}

const Canvas = ({ data }: CanvasT) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const BackCanvasRef = useRef<HTMLCanvasElement>(null);
  const prevData = useRef(0);

  useEffect(() => {
    let reqAnim: any;
    let dx = prevData.current * 20;
    const prevWidth = prevData.current * 20;

    const percent = data / 10;
    const width = percent * 200;

    const canvas = canvasRef.current as HTMLCanvasElement;
    const context = canvas?.getContext("2d") as CanvasRenderingContext2D;

    canvas.style.width = "300px";
    canvas.style.height = "150px";

    const gradient = context.createLinearGradient(0, 0, 200, 0);
    gradient.addColorStop(0.2, "#2cadd1");
    // gradient.addColorStop(0.5, "#7fa9d8");
    gradient.addColorStop(0.5, "#8794a2");
    gradient.addColorStop(0.5, "#8794a2");
    gradient.addColorStop(0.7, "#7fa9d8");
    gradient.addColorStop(1, "#2cadd1");

    const drawLine = () => {
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
    };

    const render = () => {
      if (dx === width) {
        cancelAnimationFrame(reqAnim);
        return;
      }

      if (width > prevWidth && dx < width) {
        drawLine();
        dx = dx + (width - prevWidth) / 60;
      }

      if (prevWidth > width && dx > width) {
        drawLine();
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

  return (
    <div style={{ position: "relative" }}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Canvas;
