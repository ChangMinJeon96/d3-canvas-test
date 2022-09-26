import { useEffect, useRef, useState } from "react";
import Heading from "../../src/Heading";

const Home = () => {
  const [data, setData] = useState(0);
  const [cog, setCog] = useState(300);

  useEffect(() => {
    const dataTimer = setInterval(() => {
      const value = Math.random() * (170 - 140) + 140;
      setData(value);
    }, 200);

    return () => clearInterval(dataTimer);
  }, []);

  useEffect(() => {
    const cogTimer = setInterval(() => {
      const cogValue = Math.floor(Math.random() * (500 - 100) + 100);
      setCog(cogValue);
    }, 1500);

    return () => clearInterval(cogTimer);
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "20px",
      }}
    >
      <Heading data={data} cog={cog} />
    </div>
  );
};

export default Home;
