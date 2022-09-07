import React from "react";
import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface WindDthreeT {
  data: number;
  order: number;
}

const WindDthree = ({ data, order }: WindDthreeT) => {
  const ref = useRef(null);
  const prevData = useRef(0);

  const RemovePrev = () => {
    d3.select(`#windBox${order}`).remove();
  };

  useEffect(() => {
    const currentElement = ref.current;
    const degree = data * 30;

    const prevDegree = prevData.current * 30;

    const drawCircle = () => {
      const svg = d3
        .select(currentElement)
        .append("svg")
        .attr("width", 400)
        .attr("height", 300)
        .attr("id", `windBox${order}`)
        .style("background-color", "#23262b")
        .style("position", "absolute");

      const circle = d3
        .select(`#windBox${order}`)
        .append("circle")
        .attr("cx", 150)
        .attr("cy", 150)
        .attr("r", 80)
        .style("stroke", "white")
        .style("stroke-width", "2.5")
        .style("fill", "transparent");

      const northDirectionPath = d3.path();
      northDirectionPath.moveTo(146, 70);
      northDirectionPath.lineTo(150, 74);
      northDirectionPath.lineTo(154, 70);
      northDirectionPath.closePath();

      const northDirection = d3
        .select(`#windBox${order}`)
        .append("path")
        .attr("d", northDirectionPath.toString())
        .style("stroke", "white")
        .style("fill", "white");

      const westDirectionPath = d3.path();
      northDirectionPath.moveTo(70, 146);
      northDirectionPath.lineTo(74, 150);
      northDirectionPath.lineTo(70, 154);
      northDirectionPath.closePath();

      const westDirection = d3
        .select(`#windBox${order}`)
        .append("path")
        .attr("d", northDirectionPath.toString())
        .style("stroke", "white")
        .style("fill", "white");

      const southDirectionPath = d3.path();
      northDirectionPath.moveTo(146, 230);
      northDirectionPath.lineTo(150, 226);
      northDirectionPath.lineTo(154, 230);
      northDirectionPath.closePath();

      const southDirection = d3
        .select(`#windBox${order}`)
        .append("path")
        .attr("d", northDirectionPath.toString())
        .style("stroke", "white")
        .style("fill", "white");

      const eastDirectionPath = d3.path();
      northDirectionPath.moveTo(230, 146);
      northDirectionPath.lineTo(226, 150);
      northDirectionPath.lineTo(230, 154);
      northDirectionPath.closePath();

      const easthDirection = d3
        .select(`#windBox${order}`)
        .append("path")
        .attr("d", northDirectionPath.toString())
        .style("stroke", "white")
        .style("fill", "white");

      const vesselPath = d3.path();
      vesselPath.moveTo(130, 200);
      vesselPath.lineTo(130, 120);
      vesselPath.quadraticCurveTo(150, 70, 170, 120);
      vesselPath.lineTo(170, 200);
      vesselPath.closePath();

      const vessel = d3
        .select(`#windBox${order}`)
        .append("path")
        .attr("d", vesselPath.toString())
        .style("stroke", "white")
        .style("stroke-width", "1.5")
        .style("fill", "#4a4c50");

      const arrowPath = d3.path();
      arrowPath.moveTo(180, 210);
      arrowPath.quadraticCurveTo(150, 230, 120, 210);
      arrowPath.quadraticCurveTo(160, 150, 140, 90);
      arrowPath.lineTo(135, 90);
      arrowPath.lineTo(150, 80);
      arrowPath.lineTo(165, 90);
      arrowPath.lineTo(160, 90);
      arrowPath.quadraticCurveTo(140, 150, 180, 210);

      const arrow = d3
        .select(`#windBox${order}`)
        .append("path")
        .attr("d", arrowPath.toString())
        .style("stroke", "#8fbced")
        .style("stroke-width", "1.2")
        .style("fill", "#8fbced")
        .attr("fill-opacity", "20%")
        .attr("transform-origin", "150 150")
        // .attr("transform", `rotate(20)`);
        .attr("transform", `rotate(${prevDegree})`)
        .transition()
        .ease(d3.easeLinear)
        .duration(600)
        .attr("transform", `rotate(${degree})`);

      const linearArrowPath = d3.path();
      linearArrowPath.moveTo(150, 220);
      linearArrowPath.lineTo(150, 210);
      linearArrowPath.moveTo(150, 200);
      linearArrowPath.lineTo(150, 190);
      linearArrowPath.moveTo(150, 180);
      linearArrowPath.lineTo(150, 170);
      linearArrowPath.moveTo(150, 160);
      linearArrowPath.lineTo(150, 150);
      linearArrowPath.moveTo(150, 140);
      linearArrowPath.lineTo(150, 130);
      linearArrowPath.moveTo(150, 120);
      linearArrowPath.lineTo(150, 110);
      linearArrowPath.moveTo(150, 100);
      linearArrowPath.lineTo(150, 90);
      linearArrowPath.lineTo(145, 90);
      linearArrowPath.lineTo(150, 80);
      linearArrowPath.lineTo(155, 90);
      linearArrowPath.lineTo(150, 90);

      const linearArrow = d3
        .select(`#windBox${order}`)
        .append("path")
        .attr("d", linearArrowPath.toString())
        .style("stroke", "#f2cbb8")
        .style("fill", "#f2cbb8")
        .style("stroke-width", "2 ")
        .attr("transform-origin", "150 150")
        .attr("transform", `rotate(${degree - 450})`)
        .transition()
        .ease(d3.easeLinear)
        .duration(600)
        .attr("transform", `rotate(${prevDegree - 450})`);
    };

    const addText = () => {
      const lgText = d3
        .select(`#windBox${order}`)
        .append("defs")
        .append("linearGradient")
        .attr("id", "lgTextDegree")
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

      const lgTextTrue = d3
        .select(`#windBox${order}`)
        .append("defs")
        .append("linearGradient")
        .attr("id", "lgTextTrue")
        .attr("x1", "0%")
        .attr("x2", "100%")
        .attr("y1", "0%")
        .attr("y2", "0%");

      lgTextTrue
        .append("stop")
        .attr("offset", "30%")
        .style("stop-color", "#a7c3e4 ");

      lgTextTrue
        .append("stop")
        .attr("offset", "70%")
        .style("stop-color", "#869ebd");

      lgTextTrue
        .append("stop")
        .attr("offset", "100%")
        .style("stop-color", "#7b92ad");

      const meterText = d3
        .select(`#windBox${order}`)
        .append("text")
        .attr("x", 250)
        .attr("y", 80)
        .style("font", "bold 18px sans-serif")
        .style("fill", "url(#lgTextTrue)")
        .text("True");

      const degreeNum = d3
        .select(`#windBox${order}`)
        .append("text")
        .attr("x", 250)
        .attr("y", 130)
        .style("font", "bold 50px sans-serif")
        .style("fill", "url(#lgTextDegree)")
        .text(`${degree}`);
    };

    RemovePrev();
    drawCircle();
    addText();

    prevData.current = data;
  }, [data]);

  return (
    <div
      ref={ref}
      style={{ position: "relative", width: "400px", height: "300px" }}
    ></div>
  );
};

export default WindDthree;
