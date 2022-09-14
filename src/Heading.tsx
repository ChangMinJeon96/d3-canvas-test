import React from "react";
import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { routes } from "./constant";

interface HeadingT {
  data: number;
}

const Heading = ({ data }: HeadingT) => {
  const ref = useRef(null);
  const rulerRef = useRef(null);
  const cogRef = useRef(null);
  const prevData = useRef(0);

  useEffect(() => {
    const currentElement = ref.current;
    const rulerElement = rulerRef.current;
    const cogElemnet = cogRef.current;

    const prevRulerTranslateX = prevData.current * 292 * -1;
    const rulerTranslateX = 292 * data * -1;

    const RemovePrev = () => {
      d3.select(`#heading`).remove();
      d3.select(`#ruler`).remove();
      d3.select(`#third`).remove();
    };

    const drawHeadingBox = () => {
      const svg = d3
        .select(currentElement)
        .append("svg")
        .attr("width", 600)
        .attr("height", 150)
        .attr("id", `heading`);

      const path = d3.path();
      path.moveTo(0, 0);
      path.lineTo(50, 70);
      path.quadraticCurveTo(80, 100, 100, 100);
      path.lineTo(500, 100);
      path.quadraticCurveTo(520, 100, 550, 70);
      path.lineTo(600, 0);
      path.closePath();

      const example = d3
        .select("#heading")
        .append("path")
        .attr("d", path.toString())
        .style("stroke", "#383838")
        .style("stroke-width", "1.5")
        .style("fill", " #1e2020");
    };

    const drawRuler = () => {
      const svg = d3
        .select(rulerElement)
        .append("svg")
        .attr("width", 2920)
        .attr("height", 100)
        .attr("id", `ruler`)
        .attr("transform", `translate(${prevRulerTranslateX},0)`)
        .transition()
        .ease(d3.easeLinear)
        .duration(800)
        .attr("transform", `translate(${rulerTranslateX}, 0)`);

      const drawTicks = (routes: any) => {
        routes.forEach((route: any, order: number) => {
          const [moveX, moveY, lineX, lineY] = route;
          const path = d3.path();
          path.moveTo(moveX, moveY);
          path.lineTo(lineX, lineY);

          const strokeWidth = lineY === 16 ? "2px" : "1.6px";
          const strokeColor = lineY === 16 ? "gray" : "#615c5c";

          const example = d3
            .select("#ruler")
            .append("path")
            .attr("d", path.toString())
            .style("stroke", strokeColor)
            .style("stroke-width", `${strokeWidth}`);

          if (lineY === 16) {
            const addText = d3
              .select("#ruler")
              .append("text")
              .attr("x", `${moveX - 9}`)
              .attr("y", 42)
              .style("font", "bold 12px sans-serif")
              .style("fill", "#88807f")
              .text(String(order).padStart(3, "0"));
          }
        });
      };

      drawTicks(routes);
    };

    const drawThirdSvg = () => {
      const svg = d3
        .select(cogElemnet)
        .append("svg")
        .attr("width", 600)
        .attr("height", 150)
        .attr("id", `third`);

      const referencePointPath = d3.path();
      referencePointPath.moveTo(296, 12);
      referencePointPath.lineTo(299, 22);
      referencePointPath.lineTo(299, 42);
      referencePointPath.lineTo(301, 42);
      referencePointPath.lineTo(301, 22);
      referencePointPath.lineTo(304, 12);
      referencePointPath.closePath();

      const exampleSecond = d3
        .select("#third")
        .append("path")
        .attr("d", referencePointPath.toString())
        .style("fill", "#ffd7c3");
    };

    RemovePrev();
    drawRuler();
    drawHeadingBox();
    drawThirdSvg();

    prevData.current = data;
  }, [data]);
  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        width: "600px",
        height: "150px",
        left: "700px",
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        ref={rulerRef}
        style={{
          position: "absolute",
          width: "440px",
          height: "100px",
          overflow: "hidden",
          top: "20px",
        }}
      ></div>
      <div
        ref={cogRef}
        style={{
          position: "absolute",
          width: "600px",
          height: "150px",
          overflow: "hidden",
        }}
      ></div>
    </div>
  );
};

export default Heading;
