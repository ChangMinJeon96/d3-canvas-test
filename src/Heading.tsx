import React from "react";
import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { routes } from "./constant";

interface HeadingT {
  data: number;
  cog: number;
}

const Heading = ({ data, cog }: HeadingT) => {
  const ref = useRef(null);
  const rulerRef = useRef(null);
  const cogRef = useRef(null);
  const prevData = useRef(0);
  const prevCog = useRef(300);

  useEffect(() => {
    const rulerElement = rulerRef.current;

    const prevRulerTranslateX = prevData.current * -1;
    const rulerTranslateX = data * -1;

    const RemovePrev = () => {
      d3.select(`#ruler`).remove();
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
        .duration(100)
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
              .attr("y", 46)
              .style("font", "bold 12px sans-serif")
              .style("fill", "#88807f")
              .text(String(order).padStart(3, "0"));
          }
        });
      };

      drawTicks(routes);
    };

    RemovePrev();
    drawRuler();

    prevData.current = data;
  }, [data]);

  useEffect(() => {
    const currentElement = ref.current;
    const cogElemnet = cogRef.current;

    const prevCogValue = prevCog.current;
    const currentCogValue = cog;

    const RemovePrev = () => {
      d3.select(`#heading`).remove();
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

      const drawCogBar = () => {
        const leftCogLg = d3
          .select(`#heading`)
          .append("defs")
          .append("linearGradient")
          .attr("id", "leftCogGrad")
          .attr("x1", "0%")
          .attr("x2", "100%")
          .attr("y1", "0%")
          .attr("y2", "0%");

        leftCogLg
          .append("stop")
          .attr("offset", "20%")
          .style("stop-color", "#f3c4b4");

        leftCogLg
          .append("stop")
          .attr("offset", "50%")
          .style("stop-color", "#b38a7c");

        leftCogLg
          .append("stop")
          .attr("offset", "100%")
          .style("stop-color", "#6c4941");

        const rightCogLg = d3
          .select(`#heading`)
          .append("defs")
          .append("linearGradient")
          .attr("id", "rightCogGrad")
          .attr("x1", "0%")
          .attr("x2", "100%")
          .attr("y1", "0%")
          .attr("y2", "0%");

        rightCogLg
          .append("stop")
          .attr("offset", "20%")
          .style("stop-color", "#6c4941");

        rightCogLg
          .append("stop")
          .attr("offset", "50%")
          .style("stop-color", "#b38a7c");

        rightCogLg
          .append("stop")
          .attr("offset", "100%")
          .style("stop-color", "#f3c4b4 ");

        const previousCogPath = d3.path();
        previousCogPath.moveTo(304, 18);
        previousCogPath.lineTo(301, 26);
        previousCogPath.lineTo(301, 30);
        previousCogPath.lineTo(prevCogValue, 30);
        previousCogPath.lineTo(prevCogValue, 18);
        previousCogPath.lineTo(304, 18);
        previousCogPath.closePath();

        const cogArrowAxis =
          currentCogValue > 300 ? currentCogValue - 5 : currentCogValue + 5;

        const afterCogPath = d3.path();
        afterCogPath.moveTo(304, 18);
        afterCogPath.lineTo(301, 26);
        afterCogPath.lineTo(301, 30);
        afterCogPath.lineTo(cogArrowAxis, 30);
        afterCogPath.lineTo(currentCogValue, 35);
        afterCogPath.lineTo(currentCogValue, 18);
        afterCogPath.lineTo(304, 18);
        afterCogPath.closePath();

        const gradientValue =
          currentCogValue > 300 ? "rightCogGrad" : "leftCogGrad";

        const cog = d3
          .select("#heading")
          .append("path")
          .attr("d", previousCogPath.toString())
          .transition()
          .ease(d3.easeLinear)
          .duration(800)
          .attr("d", afterCogPath.toString())
          .style("fill", `url(#${gradientValue})`);
      };

      const cogTextLg = d3
        .select(`#heading`)
        .append("defs")
        .append("linearGradient")
        .attr("id", "cogTextLg")
        .attr("x1", "0%")
        .attr("x2", "100%")
        .attr("y1", "0%")
        .attr("y2", "0%");

      cogTextLg
        .append("stop")
        .attr("offset", "50%")
        .style("stop-color", "#f3c4b4");

      cogTextLg
        .append("stop")
        .attr("offset", "100%")
        .style("stop-color", "#b38a7c");

      const cogValueText = d3
        .select(`#heading`)
        .append("text")
        .attr("x", prevCogValue - 8)
        .attr("y", 50)
        .transition()
        .ease(d3.easeLinear)
        .duration(800)
        .attr("x", currentCogValue - 8)
        .attr("y", 50)
        .style("font", "bold 12px sans-serif")
        .style("fill", "url(#cogTextLg)")
        .text(`${currentCogValue}`);

      drawCogBar();
    };

    const drawThirdSvg = () => {
      const svg = d3
        .select(cogElemnet)
        .append("svg")
        .attr("width", 600)
        .attr("height", 150)
        .attr("id", `third`);

      const referencePointPath = d3.path();
      referencePointPath.moveTo(296, 18);
      referencePointPath.lineTo(299, 22);
      referencePointPath.lineTo(299, 40);
      referencePointPath.lineTo(301, 40);
      referencePointPath.lineTo(301, 22);
      referencePointPath.lineTo(304, 18);
      referencePointPath.closePath();

      const exampleSecond = d3
        .select("#third")
        .append("path")
        .attr("d", referencePointPath.toString())
        .style("stroke-width", "1.6")
        .style("stroke", "#ffd7c3")
        .style("fill", "#ffd7c3");
    };

    RemovePrev();
    drawHeadingBox();
    drawThirdSvg();

    prevCog.current = cog;
  }, [cog]);

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
