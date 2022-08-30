import React from "react";
import { useEffect, useRef, useState } from "react";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { io } from "socket.io-client";
import * as d3 from "d3";

interface RectangleT {
  data: number;
  order: number;
}

const Rectangle = ({ data, order }: RectangleT) => {
  const ref = useRef(null);
  // const guageRef = useRef(null);

  const drawSome = () => {
    d3.select(`#box${order}`).remove();
    d3.select(`#guage${order}`).remove();

    const percent = data / 10;
    const width = percent * 200;

    const currentElement = ref.current;

    const svg = d3
      .select(currentElement)
      .append("svg")
      .attr("width", 200)
      .attr("height", 100)
      .attr("id", `box${order}`)
      .style("outline", "1px solid red")
      .style("position", "absolute");

    const gauge = d3
      .select(currentElement)
      .append("svg")
      .attr("height", 100)
      .attr("width", 0)
      .transition()
      .ease(d3.easeLinear)
      .duration(600)
      .attr("width", `${width}`)
      .attr("id", `guage${order}`)
      .style("background-color", "blue")
      .style("position", "absolute");
  };

  useEffect(() => {
    drawSome();
  }, [data]);

  return (
    <div ref={ref} style={{ position: "relative", height: "105px" }}>
      {/* <svg ref={guageRef} /> */}
    </div>
  );
};

export default Rectangle;
