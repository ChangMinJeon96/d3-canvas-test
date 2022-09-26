import { useEffect, useState } from "react";
import DepthDthree from "../../src/DepthDthree";

const DepthTwenty = () => {
  const [data, setData] = useState(0);

  const sampleData = Array(20).fill(0);

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

export default DepthTwenty;
