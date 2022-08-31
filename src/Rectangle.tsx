import React from "react";
import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface RectangleT {
  data: number;
  order: number;
}

const Rectangle = ({ data, order }: RectangleT) => {
  const ref = useRef(null);

  const RemovePrev = () => {
    d3.select(`#box${order}`).remove();
    d3.select(`#guage${order}`).remove();
  };

  const drawSome = () => {
    const percent = data / 10;
    const width = percent * 200;

    const currentElement = ref.current;

    RemovePrev();

    const svg = d3
      .select(currentElement)
      .append("svg")
      .attr("width", 0)
      .attr("height", 100)
      .attr("id", `box${order}`)
      // .style("outline", "1px solid blue")
      .style("position", "absolute")
      .transition()
      .ease(d3.easeLinear)
      .duration(600)
      .attr("width", `${width}`);
    // .attr("width", 200);

    const lg = d3
      .select(`#box${order}`)
      .append("defs")
      .append("linearGradient")
      .attr("id", "gradcolor")
      .attr("x1", "0%")
      .attr("x2", "100%")
      .attr("y1", "0%")
      .attr("y2", "0%");

    lg.append("stop")
      .attr("offset", "0%")
      .style("stop-color", "#8794a2")
      .style("stop-opacity", 1);

    lg.append("stop")
      .attr("offset", "50%")
      .style("stop-color", "#7fa9d8")
      .style("stop-opacity", 1);

    lg.append("stop")
      .attr("offset", "100%")
      .style("stop-color", "#2cadd1")
      .style("stop-opacity", 1);

    const path = d3.path();
    path.moveTo(0, 0);
    path.lineTo(200, 0);
    path.lineTo(200, 100);
    path.bezierCurveTo(200, 100, 100, 0, 0, 100);
    path.closePath();

    const example = d3
      .select(`#box${order}`)
      .append("path")
      .attr("d", path.toString())
      .attr("stroke", "none")
      .style("fill", "url(#gradcolor)");
  };

  useEffect(() => {
    drawSome();
  }, [data]);

  return (
    <div ref={ref} style={{ position: "relative", height: "105px" }}></div>
  );
};

export default Rectangle;
