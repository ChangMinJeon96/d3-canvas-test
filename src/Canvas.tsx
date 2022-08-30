import React from "react";
import { useRef, useEffect } from "react";

interface CanvasT {
  data: number;
}

const Canvas = ({ data }: CanvasT) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let reqAnim: any;
    let dx = 0;

    const percent = data / 10;
    const width = percent * 200;

    const canvas = canvasRef.current as HTMLCanvasElement;
    const context = canvas?.getContext("2d") as CanvasRenderingContext2D;

    const render = () => {
      if (dx >= width) {
        cancelAnimationFrame(reqAnim);
        return;
      }

      context.clearRect(0, 0, 200, 100);
      context.fillStyle = "#849fbd";
      context.strokeStyle = "white";
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(200, 0);
      context.lineTo(200, 100);
      context.bezierCurveTo(200, 100, 100, 30, 0, 100);
      context.lineTo(0, 0);
      context.stroke();
      context.fill();
      context.fillStyle = "white";
      context.fillRect(dx, 0, 200 - dx, 100);

      // context.clearRect(0, 0, 200, 100);
      // context.strokeRect(0, 0, 200, 100);
      // context.fillRect(0, 0, dx, 100);

      dx += width / 60;
      reqAnim = requestAnimationFrame(render);
    };

    requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(reqAnim);
    };
  }, [data]);

  return <canvas ref={canvasRef}></canvas>;
};

export default Canvas;
