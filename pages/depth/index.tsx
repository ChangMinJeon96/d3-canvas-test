import { useEffect, useRef, useState } from "react";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import DepthDthree from "../../src/DepthDthree";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000", { transports: ["websocket"] });

interface DataT {
  value: number;
}

const Depth = () => {
  const [data, setData] = useState(0);

  const sampleData = Array(1).fill(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const value = Math.floor(Math.random() * 10) + 1;
      setData(value);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "20px",
      }}
    >
      {sampleData.map((_, index) => (
        <DepthDthree data={data} order={index} key={index} />
      ))}
    </div>
  );
};

export default Depth;
