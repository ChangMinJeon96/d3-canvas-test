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
    let dx = prevData.current * 20;
    const prevHeight = prevData.current * 20;

    const percent = data / 10;
    const width = percent * 200;

    const canvas = canvasRef.current as HTMLCanvasElement;
    const context = canvas?.getContext("2d") as CanvasRenderingContext2D;
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default DepthCanvas;
