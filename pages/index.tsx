import { useEffect, useRef, useState } from "react";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { io } from "socket.io-client";
import Canvas from "../src/Canvas";
import DepthDthree from "../src/DepthDthree";
import DepthCanvas from "../src/DepthCanvas";
import Rectangle from "../src/Rectangle";

const socket = io("http://localhost:8000", { transports: ["websocket"] });

interface DataT {
  value: number;
}

const Home = () => {
  const sampleData = Array(100).fill(0);
  const [data, setData] = useState(0);

  useEffect(() => {
    socket.emit("server");
    socket.on("server", (data) => {
      // queryClient.setQueryData(["data"], data);
      console.log(data);
      setData(data.value);
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

      <DepthCanvas data={data} />
    </div>
  );
};

export default Home;
