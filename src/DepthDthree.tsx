import React from "react";
import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface DepthDthreeT {
  data: number;
  order: number;
}

const DepthDthree = ({ data, order }: DepthDthreeT) => {
  const ref = useRef(null);
  const prevData = useRef(0);

  const RemovePrev = () => {
    d3.select(`#box${order}`).remove();
    d3.select(`#box${order}second`).remove();
  };

  useEffect(() => {
    const percent = data / 10;
    const height = percent * 200;

    const currentElement = ref.current;
    const prevHeight = prevData.current * 20;

    const drawFirstSvg = () => {
      const svg = d3
        .select(currentElement)
        .append("svg")
        .attr("width", 250)
        .attr("height", 200)
        .attr("id", `box${order}`)
        .style("background-color", "#23262b")
        .style("position", "absolute");

      const path = d3.path();
      path.moveTo(0, 0);
      path.lineTo(0, 200);
      path.lineTo(150, 200);
      path.bezierCurveTo(150, 200, 70, 200, 70, 0);
      path.closePath();

      const example = d3
        .select(`#box${order}`)
        .append("path")
        .attr("d", path.toString())
        // .attr("stroke", "none")
        .style("fill", "#505356");
    };

    const drawSecondSvg = () => {
      const svgSecond = d3
        .select(currentElement)
        .append("svg")
        .attr("height", prevHeight)
        .attr("width", 150)
        .attr("id", `box${order}second`)
        .style("position", "absolute")
        .transition()
        .ease(d3.easeLinear)
        .duration(600)
        // .attr("height", `${150}`);
        .attr("height", `${height}`);

      const lgSecond = d3
        .select(`#box${order}second`)
        .append("defs")
        .append("linearGradient")
        .attr("id", "gradcolorSecond")
        .attr("x1", "0%")
        .attr("x2", "0%")
        .attr("y1", "0%")
        .attr("y2", "100%");

      lgSecond
        .append("stop")
        .attr("offset", "30%")
        .style("stop-color", "#9b9291");

      lgSecond
        .append("stop")
        .attr("offset", "70%")
        .style("stop-color", "#b1a29c");

      lgSecond
        .append("stop")
        .attr("offset", "100%")
        .style("stop-color", "#dec2b2 ");

      const pathSecond = d3.path();
      pathSecond.moveTo(0, 0);
      pathSecond.lineTo(0, 200);
      pathSecond.lineTo(150, 200);
      pathSecond.bezierCurveTo(150, 200, 70, 200, 70, 0);
      pathSecond.closePath();

      const exampleSecond = d3
        .select(`#box${order}second`)
        .append("path")
        .attr("d", pathSecond.toString())
        .attr("stroke", "none")
        .style("fill", "url(#gradcolorSecond)");
    };

    const addText = () => {
      const lgText = d3
        .select(`#box${order}`)
        .append("defs")
        .append("linearGradient")
        .attr("id", "lgText")
        .attr("x1", "0%")
        .attr("x2", "100%")
        .attr("y1", "0%")
        .attr("y2", "0%");

      lgText
        .append("stop")
        .attr("offset", "30%")
        .style("stop-color", "#f7f9fb");

      lgText
        .append("stop")
        .attr("offset", "70%")
        .style("stop-color", "#c7cdd4 ");

      lgText
        .append("stop")
        .attr("offset", "100%")
        .style("stop-color", "#c7cdd4  ");

      const meter = d3
        .select(`#box${order}`)
        .append("text")
        .attr("x", 120)
        .attr("y", 50)
        .style("font", "bold 60px sans-serif")
        .style("fill", "url(#lgText)")
        .text(`${height}`);

      const meterText = d3
        .select(`#box${order}`)
        .append("text")
        .attr("x", 130)
        .attr("y", 70)
        .style("font", "bold 20px sans-serif")
        .style("fill", "url(#lgText)")
        .text("meter");
    };

    RemovePrev();
    drawFirstSvg();
    drawSecondSvg();
    addText();
    prevData.current = data;
  }, [data]);

  return (
    <div
      ref={ref}
      style={{ position: "relative", width: "150px", height: "200px" }}
    ></div>
  );
};

export default DepthDthree;
