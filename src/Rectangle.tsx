import React from "react";
import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface RectangleT {
  data: number;
  order: number;
}

const Rectangle = ({ data, order }: RectangleT) => {
  const ref = useRef(null);
  const prevData = useRef(0);

  const RemovePrev = () => {
    d3.select(`#box${order}`).remove();
    d3.select(`#box${order}second`).remove();
    d3.select(`#bar`).remove();
    d3.select(`#guage${order}`).remove();
  };

  useEffect(() => {
    const percent = data / 10;
    const width = percent * 200;

    const currentElement = ref.current;
    const prevWidth = prevData.current * 20;
    console.log("prevWidth: ", prevWidth);

    const drawFirstSvg = () => {
      const svg = d3
        .select(currentElement)
        .append("svg")
        .attr("width", 200)
        .attr("height", 100)
        .attr("id", `box${order}`)
        .style("position", "absolute");

      const lg = d3
        .select(`#box${order}`)
        .append("defs")
        .append("linearGradient")
        .attr("id", "gradcolor")
        .attr("x1", "0%")
        .attr("x2", "100%")
        .attr("y1", "0%")
        .attr("y2", "0%");

      lg.append("stop").attr("offset", "0%").style("stop-color", "#2cadd1");
      // .style("stop-opacity", 1);

      lg.append("stop").attr("offset", "20%").style("stop-color", "#7fa9d8");
      // .style("stop-opacity", 1);

      lg.append("stop").attr("offset", "50%").style("stop-color", "#8794a2");
      // .style("stop-opacity", 1);

      lg.append("stop").attr("offset", "50%").style("stop-color", "#535459");
      // .style("stop-opacity", 1);

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

    // 두번째 SVG
    const drawSecondSvg = () => {
      const svgSecond = d3
        .select(currentElement)
        .append("svg")
        .attr("width", prevWidth)
        .attr("height", 100)
        .attr("id", `box${order}second`)
        .style("position", "absolute")
        .transition()
        .ease(d3.easeLinear)
        .duration(600)
        .attr("width", `140`);
      // .attr("width", `${width}`);

      const lgSecond = d3
        .select(`#box${order}second`)
        .append("defs")
        .append("linearGradient")
        .attr("id", "gradcolorSecond")
        .attr("x1", "0%")
        .attr("x2", "100%")
        .attr("y1", "0%")
        .attr("y2", "0%");

      lgSecond
        .append("stop")
        .attr("offset", "50%")
        .style("stop-color", "#535459");

      lgSecond
        .append("stop")
        .attr("offset", "50%")
        .style("stop-color", "#8794a2");

      lgSecond
        .append("stop")
        .attr("offset", "70%")
        .style("stop-color", "#7fa9d8");

      lgSecond
        .append("stop")
        .attr("offset", "100%")
        .style("stop-color", "#2cadd1");

      const pathSecond = d3.path();
      pathSecond.moveTo(0, 0);
      pathSecond.lineTo(200, 0);
      pathSecond.lineTo(200, 100);
      pathSecond.bezierCurveTo(200, 100, 100, 0, 0, 100);
      pathSecond.closePath();

      const exampleSecond = d3
        .select(`#box${order}second`)
        .append("path")
        .attr("d", pathSecond.toString())
        .attr("stroke", "none")
        .style("fill", "url(#gradcolorSecond)");
    };

    const drawMiddleBar = () => {
      const svg = d3
        .select(currentElement)
        .append("svg")
        .attr("width", 200)
        .attr("height", 100)
        .attr("id", `bar`)
        .style("position", "absolute");
      const path = d3.path();
      path.moveTo(98, 0);
      path.lineTo(102, 0);
      path.lineTo(102, 70);
      path.lineTo(98, 70);
      path.closePath();

      const example = d3
        .select(`#bar`)
        .append("path")
        .attr("d", path.toString())
        .attr("stroke", "none")
        .style("fill", "white");
    };

    RemovePrev();
    drawFirstSvg();
    drawSecondSvg();
    drawMiddleBar();
    prevData.current = data;
  }, [data]);

  // useEffect(() => {
  //   const currentElement = ref.current;

  //   const svg = d3
  //     .select(currentElement)
  //     .append("svg")
  //     .attr("width", 200)
  //     .attr("height", 100)
  //     .attr("id", `box${order}`)
  //     .style("position", "absolute")
  //     .transition()
  //     .ease(d3.easeLinear)
  //     .duration(600)
  //     .attr("width", 200);

  //   const example = d3
  //     .select(`#box${order}`)
  //     .append("path")
  //     .attr("d", "M 0,0 L 200,0 L 200,100 Q 100,30,0,100 L0,0")
  //     .attr("stroke", "none")
  //     .style("fill", "red");
  // }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        height: "105px",
        // backgroundColor: "#23262d",
        width: "200px",
      }}
    >
      {/* <div
        style={{
          position: "absolute",
          top: "100px",
          backgroundColor: "#23262d",
          width: "200px",
          height: "100px",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "30px",
          fontWeight: 1000,
        }}
      >
        {data * 20}
        <span>&deg;</span>
      </div> */}
    </div>
  );
};

export default Rectangle;
