import React from "react";
import { useRef, useEffect } from "react";

interface DepthCanvasT {
  data: number;
}

const DepthCanvas = ({ data }: DepthCanvasT) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevData = useRef(0);

  useEffect(() => {
    let reqAnim: any;
    let dy = prevData.current * 20;
    const prevHeight = prevData.current * 20;

    const percent = data / 10;
    const height = percent * 200;

    const canvas = canvasRef.current as HTMLCanvasElement;
    const context = canvas?.getContext("2d") as CanvasRenderingContext2D;

    canvas.style.width = "300px";
    canvas.style.height = "200px";

    const gradient = context.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0.3, "#9b9291");
    gradient.addColorStop(0.6, "#b1a29c");
    gradient.addColorStop(1, "#dec2b2");

    const drawLine = () => {
      context.clearRect(0, 0, 300, 300);
      context.fillStyle = gradient;
      context.strokeStyle = "white";
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(0, 200);
      context.lineTo(150, 200);
      context.bezierCurveTo(150, 200, 70, 200, 70, 0);
      context.lineTo(0, 0);
      context.stroke();
      context.fill();

      context.fillStyle = "#505356";
      context.fillRect(0, 0, 150, 80);
      context.fillRect(0, dy, 150, (200 - dy) * 0.75);

      context.beginPath();
      context.fillStyle = "white";
      context.moveTo(150, 200);
      context.bezierCurveTo(150, 200, 70, 200, 70, 0);
      context.lineTo(150, 0);
      context.lineTo(150, 200);
      context.stroke();
      context.fill();
    };

    const render = () => {
      if (dy === height) {
        cancelAnimationFrame(reqAnim);
        return;
      }

      if (height > prevHeight && dy < height) {
        drawLine();
        dy = dy + (height - prevHeight) / 60;
      }

      if (prevHeight > height && dy > height) {
        drawLine();
        dy = dy + (height - prevHeight) / 60;
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

export default DepthCanvas;
