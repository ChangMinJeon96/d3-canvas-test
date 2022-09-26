import React from "react";
import { useEffect, useRef } from "react";
import * as d3 from "d3";

const SvgTest = () => {
  const ref = useRef(null);
  const prevData = useRef(0);

  useEffect(() => {
    const currentElement = ref.current;

    const drawSvg = () => {
      const svg = d3
        .select(currentElement)
        .append("svg")
        .attr("width", 100)
        .attr("height", 100)
        .attr("id", `svgTest`)
        .attr("viewBox", "20 20 30 30");

      const circle = d3
        .select("#svgTest")
        .append("circle")
        .attr("cx", 100)
        .attr("cy", 100)
        .attr("r", 100)
        .style("fill", "green");

      // const example = d3
      //   .select("#svgTest")
      //   .append("path")
      //   .attr("d", "M10 10 l70 70 h10 ");
    };

    d3.select(`#svgTest`).remove();
    drawSvg();
  }, []);
  return <div ref={ref} style={{ position: "relative" }}></div>;
};

export default SvgTest;
