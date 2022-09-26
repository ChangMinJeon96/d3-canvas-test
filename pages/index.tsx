import { useEffect, useRef, useState } from "react";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { io } from "socket.io-client";
import Canvas from "../src/Canvas";
import DepthDthree from "../src/DepthDthree";
import DepthCanvas from "../src/DepthCanvas";
import WindDthree from "../src/WindDthree";
import SvgTest from "../src/SvgTest";
import Heading from "../src/Heading";
import Rectangle from "../src/Rectangle";

const socket = io("http://localhost:8000", { transports: ["websocket"] });

interface DataT {
  value: number;
}

const Home = () => {
  const sampleData = Array(100).fill(0);
  const [data, setData] = useState(0);
  const [cog, setCog] = useState(300);

  useEffect(() => {
    socket.emit("server");
    socket.on("server", (data) => {
      // queryClient.setQueryData(["data"], data);
      // console.log(data);
      setData(data.value);
    });
  }, []);

  useEffect(() => {
    socket.emit("secondServer");
    socket.on("secondServer", (data) => {
      // queryClient.setQueryData(["data"], data);
      console.log(data);
      setCog(data.cogValue);
    });
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "20px",
      }}
    >
      {/* <Rectangle data={data} order={0} /> */}

      {/* {sampleData.map((_, index) => (
        <Rectangle data={data} order={index} key={index} />
      ))} */}

      {/* <Canvas data={data} /> */}

      {/* {sampleData.map((_, index) => (
        <Canvas data={data} key={index} />
      ))} */}

      {/* <DepthDthree order={0} data={data} /> */}

      {/* {sampleData.map((_, index) => (
        <DepthDthree data={data} order={index} key={index} />
      ))} */}

      {/* <DepthCanvas data={data} /> */}

      {/* <WindDthree order={0} data={data} /> */}

      {/* <SvgTest /> */}

      {/* <Heading data={data} cog={cog} /> */}
    </div>
  );
};

export default Home;
